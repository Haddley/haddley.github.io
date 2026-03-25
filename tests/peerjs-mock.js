/**
 * BroadcastChannel-based PeerJS mock for Playwright E2E tests.
 *
 * Injected by intercepting the CDN request:
 *   page.route('**\/peerjs.min.js', route =>
 *     route.fulfill({ contentType: 'application/javascript', body: MOCK_SCRIPT })
 *   );
 *
 * All pages in the same BrowserContext share BroadcastChannel messages, which
 * simulates the PeerJS signalling server and per-connection data channels.
 */
(function () {
    var SIGNAL = '__pjs_signal__';
    var _cnt   = 0;

    // Minimal EventEmitter
    function Emitter() { this._h = {}; }
    Emitter.prototype.on = function (evt, fn) {
        (this._h[evt] = this._h[evt] || []).push(fn);
        return this;
    };
    Emitter.prototype._fire = function (evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        (this._h[evt] || []).forEach(function (fn) { fn.apply(null, args); });
    };

    /**
     * DataConn — models one end of a bidirectional data channel.
     *
     * Channel naming (per unique connection key `k`):
     *   outgoing: `k:localId`   — remote's incoming channel listens here
     *   incoming: `k:remoteId`  — remote's outgoing channel posts here
     *
     * This means localId's sends arrive on remoteId's incoming, and vice versa. ✓
     */
    function DataConn(localId, remoteId, k) {
        Emitter.call(this);
        this.peer = remoteId;   // matches real PeerJS DataConnection.peer
        this._out = new BroadcastChannel(k + ':' + localId);
        this._in  = new BroadcastChannel(k + ':' + remoteId);
        var self = this;
        this._in.onmessage = function (e) {
            var m = e.data;
            if      (m._ === 'open')  { self._fire('open'); }
            else if (m._ === 'close') { self._fire('close'); }
            else if (m._ === 'data')  { self._fire('data', m.v); }
        };
    }
    DataConn.prototype = Object.create(Emitter.prototype);

    /** Send a data message to the remote end. */
    DataConn.prototype.send = function (v) {
        this._out.postMessage({ _: 'data', v: v });
    };

    /** Close the connection. Notifies the remote end. */
    DataConn.prototype.close = function () {
        this._out.postMessage({ _: 'close' });
        this._fire('close');
    };

    /**
     * Called by the accepting side to signal the initiator that the
     * connection is open (sends on _out so initiator's _in receives it).
     */
    DataConn.prototype._signalOpen = function () {
        this._out.postMessage({ _: 'open' });
    };

    /**
     * Peer — mock replacement for `window.Peer` (PeerJS).
     *
     * Constructor accepts an optional `id` string, exactly like the real Peer.
     * Fires 'open' asynchronously (t=10ms), matching PeerJS behaviour.
     */
    function Peer(id) {
        Emitter.call(this);
        this.id  = id || ('p' + (++_cnt) + '_' + Math.random().toString(36).slice(2, 7));
        var self = this;

        // Listen for incoming connection requests addressed to this peer
        this._sig = new BroadcastChannel(SIGNAL);
        this._sig.onmessage = function (e) {
            var m = e.data;
            if (m._ !== 'connect' || m.to !== self.id) return;

            // Acceptor side: create DataConn and fire 'connection'
            var conn = new DataConn(self.id, m.from, m.key);
            self._fire('connection', conn);

            // After short delay: fire open on both ends
            setTimeout(function () {
                conn._fire('open');   // acceptor's own open
                conn._signalOpen();   // initiator receives 'open' on their _in
            }, 20);
        };

        // Simulate async 'open' (PeerJS connects to signalling server first)
        setTimeout(function () { self._fire('open', self.id); }, 10);
    }
    Peer.prototype = Object.create(Emitter.prototype);

    /**
     * Initiate a connection to `targetId`.
     * Returns a DataConn immediately (like real PeerJS); 'open' fires async.
     */
    Peer.prototype.connect = function (targetId /*, opts */) {
        var key  = 'c_' + this.id + '_' + targetId + '_' + (++_cnt);
        var conn = new DataConn(this.id, targetId, key);
        var self = this;
        // Reuse _sig so the channel stays open; closing a freshly created
        // channel immediately after postMessage can drop the message on some
        // Chromium versions before it is delivered to other pages.
        setTimeout(function () {
            self._sig.postMessage({ _: 'connect', to: targetId, from: self.id, key: key });
        }, 15);
        return conn;
    };

    Peer.prototype.destroy = function () {
        if (this._sig) { this._sig.close(); this._sig = null; }
    };

    window.Peer = Peer;
}());
