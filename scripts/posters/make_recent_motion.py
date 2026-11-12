"""Motion versions of the posters of posts dated after 1 September 2026 that had only a static poster.
Each motion enacts the post's own idea, starts from an earlier state, ends on the finished static picture, holds, fades and
loops every 7 seconds; reduced motion shows the static picture. Reuses the Motion class from make_sklearn_motion.py.
"""
import os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from make_sklearn_motion import Motion, ROOT

TAG = re.compile(r'<(?:g|rect|circle|line|path|polygon|polyline|ellipse|text|use)\b[^<>]*>')


def opacity_of(tag):
    m = re.search(r'\bopacity="([\d.]+)"', tag) or re.search(r'\bopacity=\.(\d+)', tag)
    return float(m.group(1)) if m and '.' in m.group(1) else (float('0.' + m.group(1)) if m else 1)


def T(s, pat, f, extra='', nth=0):
    """Give the nth tag that matches pat a class made by f(opacity)."""
    hits = [m for m in TAG.finditer(s) if re.search(pat, m.group(0))]
    assert len(hits) > nth, ('no tag for', pat, nth, len(hits))
    m = hits[nth]; tag = m.group(0)
    cls = f(opacity_of(tag)) if callable(f) else f
    new = re.sub(r'^<(\w+)', lambda x: '<%s class="%s"%s' % (x.group(1), cls, (' ' + extra) if extra else ''), tag, 1)
    return s[:m.start()] + new + s[m.end():]


def TD(s, pat, mo, t0, dur, nth=0):
    return T(s, pat, lambda op: mo.draw(t0, dur, op), 'pathLength="1"', nth)


def TA(s, pat, f, extra='', start=0, stop=None):
    """Apply to every matching tag (in order); f(index, opacity) gives the class."""
    hits = [m for m in TAG.finditer(s) if re.search(pat, m.group(0))][start:stop]
    out, last = [], 0
    for i, m in enumerate(hits):
        tag = m.group(0); cls = f(i, opacity_of(tag))
        new = re.sub(r'^<(\w+)', lambda x: '<%s class="%s"%s' % (x.group(1), cls, (' ' + extra) if extra else ''), tag, 1)
        out.append(s[last:m.start()]); out.append(new); last = m.end()
    out.append(s[last:])
    return ''.join(out)


def W(s, start_pat, end_pat, cls, extra='', end_last=False, nth=0):
    """Wrap everything from the tag matching start_pat to the end of the tag matching end_pat in a group."""
    tags = list(TAG.finditer(s))
    starts = [m for m in tags if re.search(start_pat, m.group(0))]
    a = starts[nth]
    ends = [m for m in tags if m.start() >= a.start() and re.search(end_pat, m.group(0))]
    b = ends[-1] if end_last else ends[0]
    return s[:a.start()] + '<g class="%s"%s>' % (cls, (' ' + extra) if extra else '') + s[a.start():b.end()] + '</g>' + s[b.end():]


def WG(s, pat, cls, extra='', nth=0):
    """Wrap a whole <g>...</g> (no nested groups) that opens with a tag matching pat."""
    hits = [m for m in re.finditer(r'<g\b[^<>]*>', s) if re.search(pat, m.group(0))]
    a = hits[nth]; close = s.index('</g>', a.end()) + 4
    return s[:a.start()] + '<g class="%s"%s>' % (cls, (' ' + extra) if extra else '') + s[a.start():close] + '</g>' + s[close:]


def finish(s, mo, raw=''):
    m = re.search(r'<svg\b[^>]*>', s)
    st = mo.style().replace('</style>', raw + '</style>')
    return s[:m.end()] + st + s[m.end():]


MARCH = '@keyframes march6{to{stroke-dashoffset:-42}}.march6{animation:march6 7s linear infinite}@keyframes march7{to{stroke-dashoffset:-49}}.march7{animation:march7 7s linear infinite}'


def seqpts(items, tail=True):
    """items: [(time, css)] -> add the fade-out tail so that the element loops cleanly."""
    return items


# ------------------------------------------------------------------ the posters
def p_3dprinting3(s):     # a printer's nozzle checks itself, the cable draws, a pencil sketches
    mo = Motion()
    s = T(s, r'x="14" y="44"', 'march7')
    s = T(s, r'x="17" y="47"', lambda op: mo.pop(0.3))
    s = T(s, r'cx="36" cy="59"', lambda op: mo.pop(0.7)); s = T(s, r'cx="84" cy="59"', lambda op: mo.pop(0.9))
    beat = mo.custom('beat', [(0, 'transform:scale(1)'), (1.4, 'transform:scale(1)'), (1.7, 'transform:scale(1.3)'), (2.0, 'transform:scale(1)'),
                              (3.2, 'transform:scale(1)'), (3.5, 'transform:scale(1.3)'), (3.8, 'transform:scale(1)'), (5.0, 'transform:scale(1)'),
                              (5.3, 'transform:scale(1.3)'), (5.6, 'transform:scale(1)'), (7, 'transform:scale(1)')], 'transform-box:fill-box;transform-origin:center')
    s = T(s, r'cx="60" cy="59" r="7"', beat); s = T(s, r'cx="60" cy="59" r="3.5"', beat)
    s = TD(s, r'd="M60,74 C60,86', mo, 1.0, 0.9)
    write = mo.custom('write', [(0, 'transform:translate(7px,-7px)'), (1.0, 'transform:translate(7px,-7px)'), (1.6, 'transform:translate(0px,0px)'), (2.0, 'transform:translate(-2px,2px)'),
                                (2.4, 'transform:translate(0px,0px)'), (2.8, 'transform:translate(-2px,2px)'), (3.2, 'transform:translate(0px,0px)'), (7, 'transform:translate(0px,0px)')])
    s = T(s, r'd="M88,24 L98,34"', write); s = T(s, r'd="M98,34 L101,37"', write)
    return finish(s, mo, MARCH)


def p_attiny1(s):         # a signal runs down the wire and the LED blinks
    mo = Motion()
    s = TA(s, r'width="7" height="5"', lambda i, op: mo.pop(0.2 + 0.08 * i))
    s = T(s, r'x="24" y="32"', lambda op: mo.pop(0.1))
    on = [(1.1, 1.9), (2.9, 3.7), (4.7, 6.4)]
    def led(level):
        pts = [(0, 'opacity:0')]
        for a, b in on:
            pts += [(a - 0.05, 'opacity:0'), (a + 0.05, 'opacity:%s' % level), (b, 'opacity:%s' % level), (b + 0.1, 'opacity:0')]
        pts[-1] = (6.4, 'opacity:%s' % level); pts += [(6.8, 'opacity:%s' % level), (6.95, 'opacity:0'), (7, 'opacity:0')]
        return mo.custom(('led', level), pts)
    s = T(s, r'r="19"', led(0.18)); s = T(s, r'r="13"', led(0.3))
    s = TD(s, r'd="M82,61 V81 H61', mo, 0.3, 0.5)
    pulse_pts = [(0, 'opacity:0;stroke-dashoffset:0.12')]
    for t in (0.6, 2.4, 4.2):
        pulse_pts += [(t, 'opacity:1;stroke-dashoffset:0.12'), (t + 0.5, 'opacity:1;stroke-dashoffset:-1'), (t + 0.51, 'opacity:0;stroke-dashoffset:-1')]
    pulse_pts.append((7, 'opacity:0'))
    spark = '<path class="%s" d="M82,61 V81 H61 M90,61 V88" stroke="#ffe9b8" stroke-width="2.4" fill="none" pathLength="1" stroke-linecap="round" opacity="0"/>' % mo.custom('spark', pulse_pts, 'stroke-dasharray:0.12 2')
    s = s.replace('</svg>', spark + '</svg>')
    return finish(s, mo)


def p_azurefoundryagent2(s):   # a document goes in, an answer with its source comes out
    mo = Motion()
    s = T(s, r'x="36" y="10"', lambda op: mo.pop(0.2, op)); s = T(s, r'x="32" y="14"', lambda op: mo.pop(0.35, op))
    s = T(s, r'd="M28,22 a4', lambda op: mo.pop(0.6)); s = T(s, r'd="M60,18 v8 h8', lambda op: mo.pop(0.8, op))
    s = T(s, r'fill="#0f1b2d" opacity="\.65"', lambda op: mo.fade(1.0, op))
    s = T(s, r'<g stroke-linecap="round">', lambda op: mo.fade(1.2))
    s = TD(s, r'd="M48,63 v8', mo, 1.6, 0.5)
    s = T(s, r'd="M14,76 h92', lambda op: mo.pop(2.2))
    s = T(s, r'<g>$', lambda op: mo.growx(2.7))
    return finish(s, mo)


def p_azurefoundryagent3(s):   # the pipeline: read, split, search, answer
    mo = Motion()
    s = T(s, r'x="9" y="18"', lambda op: mo.pop(0.2)); s = T(s, r'fill="#0f1b2d" opacity="\.55"', lambda op: mo.fade(0.5, op))
    s = TD(s, r'd="M38,35 h7', mo, 0.7, 0.4)
    s = T(s, r'x="48" y="16"', lambda op: mo.pop(1.0)); s = T(s, r'cx="79" cy="22"', lambda op: mo.pop(1.3))
    s = T(s, r'd="M56,27 a2\.5', lambda op: mo.pop(1.2)); s = T(s, r'fill="#0f1b2d" opacity="\.65"', lambda op: mo.fade(1.5, op))
    s = T(s, r'fill="#1c2a3d" stroke="#5bb4ea" stroke-width="1\.2"', lambda op: mo.pop(1.8)); s = T(s, r'fill="#c9d3dd" opacity="\.6"', lambda op: mo.fade(2.0, op), nth=0)
    s = TD(s, r'd="M86,37 h4', mo, 2.1, 0.3)
    sweep = mo.custom('search', [(0, 'opacity:0;transform:translate(0px,0px)'), (2.2, 'opacity:0;transform:translate(0px,0px)'), (2.5, 'opacity:1;transform:translate(0px,0px)'), (2.9, 'opacity:1;transform:translate(-5px,3px)'),
                                 (3.3, 'opacity:1;transform:translate(2px,-1px)'), (3.7, 'opacity:1;transform:translate(0px,0px)'), (6.2, 'opacity:1;transform:translate(0px,0px)'), (6.8, 'opacity:0;transform:translate(0px,0px)'), (7, 'opacity:0')])
    s = T(s, r'cx="98" cy="51"', sweep); s = T(s, r'd="M102\.6,55\.6', sweep)
    s = TD(s, r'd="M66,59 v8', mo, 3.3, 0.3)
    s = T(s, r'x="44" y="72"', lambda op: mo.pop(3.6)); s = T(s, r'<g>$', lambda op: mo.growx(3.9))
    s = T(s, r'cx="24" cy="82"', lambda op: mo.pop(4.3)); s = T(s, r'd="M14,102 a10', lambda op: mo.pop(4.4))
    return finish(s, mo)


def p_azurefoundryagent4(s):   # speak, the voice agent hears, the checklist fills in, one item still unchecked
    mo = Motion()
    s = T(s, r'x="14" y="26"', lambda op: mo.pop(0.2)); s = TD(s, r'd="M10,42 a10,10', mo, 0.4, 0.4); s = TD(s, r'd="M20,52 v6"', mo, 0.7, 0.2)
    waves = mo.custom('speech', [(0, 'opacity:0'), (0.9, 'opacity:0'), (1.0, 'opacity:1'), (1.3, 'opacity:.25'), (1.6, 'opacity:1'), (1.9, 'opacity:.25'), (2.2, 'opacity:1'), (6.2, 'opacity:1'), (6.8, 'opacity:0'), (7, 'opacity:0')])
    s = T(s, r'<g fill="none" stroke="#5bb4ea" stroke-width="2" stroke-linecap="round">', waves)
    s = W(s, r'cx="82" cy="37" r="22" fill="#7b4fd6"', r'd="M79,50 q1,-3', mo.pop(1.4))
    s = T(s, r'x="22" y="70"', lambda op: mo.pop(2.2)); s = T(s, r'fill="#2f9e4a"', lambda op: mo.pop(2.7))
    s = T(s, r'<g fill="none" stroke="#0f1b2d" stroke-width="1.4"', lambda op: mo.fade(3.0))
    s = T(s, r'fill="#c9d3dd" opacity="\.6"', lambda op: mo.growx(2.5, op))
    s = T(s, r'x="29" y="96"', mo.custom('redbox', [(0, 'opacity:0;transform:scale(0)'), (3.3, 'opacity:0;transform:scale(0)'), (3.6, 'opacity:1;transform:scale(1.3)'), (3.9, 'opacity:1;transform:scale(1)'),
                                                    (4.6, 'opacity:1;transform:scale(1.25)'), (4.9, 'opacity:1;transform:scale(1)'), (6.2, 'opacity:1;transform:scale(1)'), (6.8, 'opacity:0;transform:scale(1)'), (7, 'opacity:0;transform:scale(0)')],
                                                   'transform-box:fill-box;transform-origin:center'))
    return finish(s, mo)


def p_azurefoundryagent5(s):   # a judge weighs six answers
    mo = Motion()
    s = T(s, r'cx="60" cy="34" r="16" fill="#7b4fd6"', lambda op: mo.pop(0.2)); s = T(s, r'cx="60" cy="34" r="16" fill="none"', lambda op: mo.pop(0.2, op))
    tilt = mo.custom('tilt', [(0, 'transform:rotate(0deg)'), (3.2, 'transform:rotate(0deg)'), (3.5, 'transform:rotate(-9deg)'), (3.9, 'transform:rotate(7deg)'), (4.3, 'transform:rotate(-4deg)'), (4.7, 'transform:rotate(0deg)'), (7, 'transform:rotate(0deg)')])
    s = T(s, r'<g stroke="#e8eef5" stroke-width="2"', tilt, 'style="transform-origin:60px 34px"')
    paths = ['M60,44 L22,84', 'M60,44 L60,84', 'M60,44 L98,84', 'M60,44 L22,106', 'M60,44 L60,106', 'M60,44 L98,106']
    for i, d in enumerate(paths):
        s = TD(s, r'd="%s"' % d, mo, 0.7 + 0.15 * i if i < 3 else 1.6 + 0.15 * (i - 3), 0.5)
    cs = [(22, 84), (60, 84), (98, 84), (22, 106), (60, 106), (98, 106)]
    for i, (x, y) in enumerate(cs):
        t = 1.1 + 0.15 * i if i < 3 else 2.0 + 0.15 * (i - 3)
        s = T(s, r'cx="%d" cy="%d" r="8"' % (x, y), lambda op, t=t: mo.pop(t))
        s = T(s, r'x="%d" y="%d" width="10" height="3"' % (x - 5, y - 2), lambda op, t=t: mo.pop(t + 0.15))
    return finish(s, mo)


def p_claudecode16(s):    # Claude plugs into a database and writes to it
    mo = Motion()
    s = W(s, r'<line x1="31\.2"', r'<line x1="31\.2" y1="58\.7"', mo.custom('spin16', [(0, 'transform:rotate(-360deg)'), (0.2, 'transform:rotate(-360deg)'), (1.4, 'transform:rotate(0deg)'), (7, 'transform:rotate(0deg)')], 'transform-origin:28px 60px'), end_last=False) if False else s
    star = mo.custom('spin16', [(0, 'opacity:0;transform:rotate(-300deg)'), (0.2, 'opacity:0;transform:rotate(-300deg)'), (0.4, 'opacity:1;transform:rotate(-300deg)'), (1.5, 'opacity:1;transform:rotate(0deg)'), (6.2, 'opacity:1;transform:rotate(0deg)'), (6.8, 'opacity:0;transform:rotate(0deg)'), (7, 'opacity:0;transform:rotate(-300deg)')], 'transform-origin:28px 60px')
    lines = [m for m in TAG.finditer(s) if m.group(0).startswith('<line') and 'stroke="#e07a52"' in m.group(0)]
    a, b = lines[0], lines[-1]
    s = s[:a.start()] + '<g class="%s">' % star + s[a.start():b.end()] + '</g>' + s[b.end():]
    plug = mo.custom('plug16', [(0, 'opacity:0;transform:translate(-14px,0px)'), (1.4, 'opacity:0;transform:translate(-14px,0px)'), (1.6, 'opacity:1;transform:translate(-14px,0px)'), (2.3, 'opacity:1;transform:translate(0px,0px)'), (6.2, 'opacity:1;transform:translate(0px,0px)'), (6.8, 'opacity:0;transform:translate(0px,0px)'), (7, 'opacity:0')])
    s = W(s, r'd="M43,60 H52"', r'd="M61,56\.5 H66', plug)
    s = W(s, r'd="M70,32 V88', r'<ellipse cx="87"', mo.rise(0.3))
    band = mo.custom('bands', [(0, 'stroke:#3fc1c9'), (2.6, 'stroke:#3fc1c9'), (2.9, 'stroke:#d9fbfd'), (3.3, 'stroke:#3fc1c9'), (4.0, 'stroke:#3fc1c9'), (4.3, 'stroke:#d9fbfd'), (4.7, 'stroke:#3fc1c9'), (7, 'stroke:#3fc1c9')])
    s = T(s, r'd="M70,51 A17,6', band)
    spark = '<circle class="%s" cx="68" cy="60" r="5" fill="#fff" opacity="0"/>' % mo.custom('spark16', [(0, 'opacity:0;transform:scale(.4)'), (2.2, 'opacity:0;transform:scale(.4)'), (2.35, 'opacity:.9;transform:scale(1.4)'), (2.8, 'opacity:0;transform:scale(2)'), (7, 'opacity:0')], 'transform-box:fill-box;transform-origin:center')
    s = s.replace('</svg>', spark + '</svg>')
    return finish(s, mo)


def p_codingagentsroles(s):   # four roles around a hub, with work flowing between them
    mo = Motion()
    s = TA(s, r'stroke-dasharray="3 3"', lambda i, op: 'march6')
    for i, (cx, cy, px) in enumerate([(26, 24, 16), (94, 24, 84), (26, 84, 16), (94, 84, 84)]):
        s = W(s, r'cx="%d" cy="%d" r="5\.5"' % (cx, cy), r'd="M%d,\d+ C' % px, mo.pop(0.3 + 0.3 * i))
    s = T(s, r'cx="60" cy="60" r="17"', lambda op: mo.pop(1.6))
    lines = [m for m in TAG.finditer(s) if m.group(0).startswith('<line') and 'stroke="#e07a52"' in m.group(0)]
    star = mo.custom('spinroles', [(0, 'opacity:0;transform:rotate(-360deg)'), (1.7, 'opacity:0;transform:rotate(-360deg)'), (1.9, 'opacity:1;transform:rotate(-360deg)'), (3.4, 'opacity:1;transform:rotate(0deg)'), (6.2, 'opacity:1;transform:rotate(0deg)'), (6.8, 'opacity:0'), (7, 'opacity:0')], 'transform-origin:60px 60px')
    a, b = lines[0], lines[-1]
    s = s[:a.start()] + '<g class="%s">' % star + s[a.start():b.end()] + '</g>' + s[b.end():]
    return finish(s, mo, MARCH)


def p_codingagentsthatstay(s):   # memory behind a shield, with tasks that come back to it
    mo = Motion()
    s = T(s, r'd="M60,20 L88,30', lambda op: mo.pop(0.2))
    s = W(s, r'd="M48,46 V70', r'<ellipse cx="60" cy="46"', mo.rise(0.7))
    for i, (x, y) in enumerate([(11, 24), (97, 40), (13, 74), (95, 82), (98, 16)]):
        dx, dy = round((60 - x) * 0.55), round((60 - y) * 0.55)
        s = T(s, r'x="%d" y="%d" width="\d+" height="\d+" rx="2"' % (x, y), lambda op, dx=dx, dy=dy, i=i: mo.slide(1.3 + 0.4 * i, dx, dy))
    return finish(s, mo)


def p_minigpt(s):         # the wheel spins and slows to a stop, and the pointer settles
    mo = Motion()
    spin = mo.custom('wheel', [(0, 'transform:rotate(-720deg)'), (0.2, 'transform:rotate(-720deg);animation-timing-function:cubic-bezier(.12,.7,.2,1)'), (3.6, 'transform:rotate(0deg)'), (7, 'transform:rotate(0deg)')], 'transform-origin:60px 66px')
    paths = [m for m in TAG.finditer(s) if m.group(0).startswith('<path') and 'd="M60,66' in m.group(0)]
    a, b = paths[0], paths[-1]
    s = s[:a.start()] + '<g class="%s">' % spin + s[a.start():b.end()] + '</g>' + s[b.end():]
    s = T(s, r'd="M53,16 L67,16', mo.custom('pointer', [(0, 'transform:translateY(0px)'), (0.2, 'transform:translateY(0px)'), (0.5, 'transform:translateY(2px)'), (0.8, 'transform:translateY(0px)'), (1.1, 'transform:translateY(2px)'), (1.4, 'transform:translateY(0px)'), (1.7, 'transform:translateY(2px)'), (2.0, 'transform:translateY(0px)'),
                                                         (2.5, 'transform:translateY(2px)'), (3.0, 'transform:translateY(0px)'), (3.6, 'transform:translateY(2px)'), (3.9, 'transform:translateY(0px)'), (7, 'transform:translateY(0px)')]))
    return finish(s, mo)


def p_minigpt_grown(s):   # training: the loss curve falls as the model learns
    mo = Motion()
    s = T(s, r'<polygon points', lambda op: mo.fade(0.8))
    s = TD(s, r'<polyline points', mo, 0.2, 1.8)
    s = TA(s, r'r="3\.2"', lambda i, op: mo.pop(0.2 + 0.4 * i))
    return finish(s, mo)


def p_minigpt2(s):        # tokenisers: letters merge into tokens
    mo = Motion()
    s = TA(s, r'width="5\.2" height="18"', lambda i, op: mo.pop(0.2 + 0.1 * i))
    s = TA(s, r'y="66" width="\d+" height="20"', lambda i, op: mo.pop(2.4 + 0.25 * i))
    s = T(s, r'd="M60 56 L60 62"', lambda op: mo.fade(1.9)); s = T(s, r'd="M56 60 L60 64', lambda op: mo.fade(1.9))
    return finish(s, mo)


def p_minigpt3(s):        # lazy: the work is planned first, the lightning computes it all at once
    mo = Motion()
    s = T(s, r'x="18" y="38"', lambda op: mo.pop(0.3))
    s = T(s, r'x="18" y="66"', lambda op: mo.growx(2.2))
    flash = mo.custom('bolt', [(0, 'opacity:0'), (1.4, 'opacity:0'), (1.5, 'opacity:1'), (1.7, 'opacity:.2'), (1.9, 'opacity:1'), (2.4, 'opacity:1'), (2.6, 'opacity:.2'), (2.8, 'opacity:1'), (6.2, 'opacity:1'), (6.8, 'opacity:0'), (7, 'opacity:0')])
    s = T(s, r'd="M86 40 L82 47', flash)
    return finish(s, mo)


def p_minigpt4(s):        # rotary positions: the rays swing into their angles
    mo = Motion()
    pairs = [('60.0" y2="30.0', '60.0" cy="30.0'), ('75.0" y2="34.0', '75.0" cy="34.0'), ('86.0" y2="45.0', '86.0" cy="45.0'), ('90.0" y2="60.0', '90.0" cy="60.0'), ('86.0" y2="75.0', '86.0" cy="75.0')]
    for k, (l, c) in enumerate(pairs):
        swing = mo.custom(('swing', k), [(0, 'opacity:0;transform:rotate(-70deg)'), (0.3 + 0.25 * k, 'opacity:0;transform:rotate(-70deg)'), (0.45 + 0.25 * k, 'opacity:1;transform:rotate(-70deg)'), (1.6 + 0.25 * k, 'opacity:1;transform:rotate(0deg)'),
                                         (6.2, 'opacity:1;transform:rotate(0deg)'), (6.8, 'opacity:0'), (7, 'opacity:0')], 'transform-origin:60px 60px')
        s = W(s, r'x2="%s"' % l, r'cx="%s"' % c, swing)
    s = TD(s, r'd="M 84\.2 84\.2 A 34 34', mo, 2.2, 1.0); s = T(s, r'd="M35\.8 84\.2 L37 77', lambda op: mo.pop(3.1))
    s = T(s, r'cx="60" cy="60" r="3\.5"', lambda op: mo.pop(0.1))
    return finish(s, mo)


def p_minigpt5(s):        # distillation: the big model's slices teach the small one
    mo = Motion()
    s = W(s, r'd="M40,52 L40\.00,26', r'd="M40,52 L27\.47', mo.pop(0.3))
    s = TD(s, r'd="M62 64 Q72 70', mo, 1.4, 0.5); s = TD(s, r'd="M68 74 L74 74\.5', mo, 1.8, 0.4)
    s = W(s, r'd="M88,78 L88\.00,63', r'd="M88,78 L80\.77', mo.pop(2.4))
    return finish(s, mo)


def p_minigpt6(s):        # sliding window: the allowed cells appear row by row
    mo = Motion()
    def f(i, op):
        return mo.pop(0.3 + 0.3 * round((0 + 0) * 0))
    cells = [m for m in TAG.finditer(s) if m.group(0).startswith('<rect') and 'fill="#3a9bdc"' in m.group(0)]
    s = TA(s, r'<rect\b(?!.*width="120")[^<>]*fill="#3a9bdc"', lambda i, op: mo.pop(0.3 + 0.28 * round((float(re.search(r'\by="([\d.]+)"', cells[i].group(0)).group(1)) - 22.0) / 9.5)))
    return finish(s, mo)


def p_minigpt7(s):        # the residual stream: each block adds to the same hidden state
    mo = Motion()
    for i, y in enumerate([40, 56, 72]):
        s = T(s, r'<text x="14" y="%d"' % y, lambda op, i=i: mo.slide(0.3 + 0.6 * i, -10, 0))
    s = TD(s, r'd="M14 78 L66 78"', mo, 2.2, 0.5); s = TD(s, r'd="M100 92 C 92 104', mo, 2.9, 0.9); s = T(s, r'd="M70 84 L68\.2', lambda op: mo.pop(3.8))
    return finish(s, mo)


def p_minigpt8(s):        # training in practice: surprise gives slopes, a nudge, repeated thousands of times
    mo = Motion()
    for i, y in enumerate([36, 56, 76]):
        s = T(s, r'<text x="14" y="%d"' % y, lambda op, i=i: mo.slide(0.3 + 0.6 * i, -10, 0))
    s = TD(s, r'd="M56 72 C 104 72', mo, 2.2, 1.2); s = T(s, r'd="M74 32 L82 27\.5', lambda op: mo.pop(3.5))
    s = T(s, r'>$' if False else r'y="100"', mo.custom('times', [(0, 'opacity:0;transform:scale(.4)'), (3.8, 'opacity:0;transform:scale(.4)'), (4.2, 'opacity:1;transform:scale(1.25)'), (4.5, 'opacity:1;transform:scale(1)'),
                                                                 (5.0, 'opacity:1;transform:scale(1.15)'), (5.3, 'opacity:1;transform:scale(1)'), (6.2, 'opacity:1;transform:scale(1)'), (6.8, 'opacity:0'), (7, 'opacity:0')], 'transform-box:fill-box;transform-origin:left center'))
    return finish(s, mo)


def p_odata(s):           # three query options typed in, then the line under them
    mo = Motion()
    for i, y in enumerate([38, 64, 90]):
        s = T(s, r'<text x="60" y="%d"' % y, lambda op, i=i: mo.slide(0.3 + 0.7 * i, -14, 0))
    s = TD(s, r'd="M26,100 H94"', mo, 2.7, 0.6)
    return finish(s, mo)


def p_singsaber(s):       # two fists meet, the blocks light, and it works
    mo = Motion()
    s = T(s, r'<g fill="none" stroke-width="0\.8">', lambda op: mo.fade(0.2))
    # each colour appears twice: first the block, then the fist; an edited tag no longer matches, so the next one is always first
    s = T(s, r'^<g color="#ff3b4e"', lambda op: mo.pop(0.5)); s = T(s, r'^<g color="#2f6bff"', lambda op: mo.pop(0.8))
    s = T(s, r'^<g color="#ff3b4e"', lambda op: mo.slide(1.3, -26, 0)); s = T(s, r'^<g color="#2f6bff"', lambda op: mo.slide(1.3, 26, 0))
    s = T(s, r'<text x="60" y="104"', lambda op: mo.pop(3.0))
    s = T(s, r'd="M60,12 v-6', lambda op: mo.pop(3.5)); s = T(s, r'<ellipse cx="57\.5"', lambda op: mo.pop(3.5))
    return finish(s, mo)


def p_deepseekharnesshybrid(s):   # cards of work go down from the hosted model, the local model builds the game and checks it
    mo = Motion()
    s = W(s, r'<g fill="#7cc6f0">', r'<text x="58" y="28"', mo.pop(0.2)) if False else s
    s = T(s, r'<g fill="#7cc6f0">', lambda op: mo.pop(0.2)); s = T(s, r'<text x="58" y="28"', lambda op: mo.fade(0.5))
    cards = [m for m in re.finditer(r'<g transform="translate\(\d+,\d+\)">', s)]
    n = 0
    for m in list(cards):
        pass
    s = TA(s, r'<g transform="translate\(\d+,\d+\)">', lambda i, op: mo.custom(('card', i), [(0, 'opacity:0;translate:0px -14px'), (0.9 + 0.5 * i, 'opacity:0;translate:0px -14px'), (1.0 + 0.5 * i, 'opacity:1;translate:0px -14px'), (1.9 + 0.5 * i, 'opacity:1;translate:0px 0px'),
                                                                                (6.2, 'opacity:1;translate:0px 0px'), (6.8, 'opacity:0;translate:0px 0px'), (7, 'opacity:0')]))
    s = T(s, r'x="28" y="70" width="64"', lambda op: mo.pop(3.0)); s = T(s, r'x="32" y="74" width="56"', lambda op: mo.pop(3.2))
    s = T(s, r'<g fill="#6fdc8c">', mo.custom('invader', [(0, 'opacity:0'), (3.4, 'opacity:0'), (3.5, 'opacity:1'), (3.9, 'opacity:.3'), (4.3, 'opacity:1'), (6.2, 'opacity:1'), (6.8, 'opacity:0'), (7, 'opacity:0')]))
    s = TD(s, r'd="M96 56 L99\.5 60', mo, 4.6, 0.5)
    return finish(s, mo)


def p_distillation(s):    # the teacher tips and pours, the student fills
    mo = Motion()
    tip = mo.custom('tip', [(0, 'transform:rotate(-55deg)'), (0.3, 'transform:rotate(-55deg);animation-timing-function:ease-in-out'), (1.6, 'transform:rotate(0deg)'), (7, 'transform:rotate(0deg)')], 'transform-origin:50px 62px')
    s = WG(s, r'transform="rotate\(55 50 62\)"', tip)
    drop = lambda t: mo.custom(('drop', t), [(0, 'opacity:0;transform:translateY(-6px)'), (t, 'opacity:0;transform:translateY(-6px)'), (t + 0.15, 'opacity:1;transform:translateY(-6px)'), (t + 0.6, 'opacity:1;transform:translateY(8px)'), (t + 0.8, 'opacity:0;transform:translateY(8px)'),
                                               (t + 0.81, 'opacity:0;transform:translateY(-6px)'), (t + 1.5, 'opacity:0;transform:translateY(-6px)'), (t + 1.65, 'opacity:1;transform:translateY(-6px)'), (t + 2.1, 'opacity:1;transform:translateY(8px)'), (t + 2.3, 'opacity:0;transform:translateY(8px)'), (7, 'opacity:0')])
    s = T(s, r'd="M89 54 c2\.4', drop(1.6)); s = T(s, r'd="M89 66 c1\.8', drop(1.9))
    s = T(s, r'd="M84 80 h10 v8', mo.custom('student', [(0, 'opacity:.9;transform:scaleY(0.25)'), (1.8, 'opacity:.9;transform:scaleY(0.25)'), (5.0, 'opacity:.9;transform:scaleY(1)'), (6.4, 'opacity:.9;transform:scaleY(1)'), (6.8, 'opacity:0;transform:scaleY(1)'), (7, 'opacity:.9;transform:scaleY(0.25)')], 'transform-box:fill-box;transform-origin:50% 100%'))
    return finish(s, mo)


def p_distillation2(s):   # two teachers pour into one student
    mo = Motion()
    s = WG(s, r'transform="translate\(2 6\)', mo.pop(0.3), nth=0); s = WG(s, r'transform="translate\(57 6\)', mo.pop(0.6), nth=0)
    drop = lambda t: mo.custom(('drop2', t), [(0, 'opacity:0;transform:translateY(-8px)'), (t, 'opacity:0;transform:translateY(-8px)'), (t + 0.15, 'opacity:1;transform:translateY(-8px)'), (t + 0.7, 'opacity:1;transform:translateY(6px)'), (t + 0.9, 'opacity:0;transform:translateY(6px)'),
                                              (t + 1.6, 'opacity:0;transform:translateY(-8px)'), (t + 1.75, 'opacity:1;transform:translateY(-8px)'), (t + 2.3, 'opacity:1;transform:translateY(6px)'), (t + 2.5, 'opacity:0;transform:translateY(6px)'), (7, 'opacity:0')])
    s = T(s, r'd="M46 60 c2\.4', drop(1.4)); s = T(s, r'd="M74 60 c2\.4', drop(1.7))
    s = T(s, r'd="M55 76 h10 v8', mo.custom('student2', [(0, 'opacity:.95;transform:scaleY(0.2)'), (1.6, 'opacity:.95;transform:scaleY(0.2)'), (5.0, 'opacity:.95;transform:scaleY(1)'), (6.4, 'opacity:.95;transform:scaleY(1)'), (6.8, 'opacity:0;transform:scaleY(1)'), (7, 'opacity:.95;transform:scaleY(0.2)')], 'transform-box:fill-box;transform-origin:50% 100%'))
    return finish(s, mo)


def p_hero_bc_mcp(s):     # Business Central's API tiles, an MCP link, and Claude Code's prompt
    mo = Motion()
    s = TA(s, r'width="18" height="18"', lambda i, op: mo.pop(0.2 + 0.2 * i, op))
    s = T(s, r'x1="62" y1="63" x2="76" y2="63"', lambda op: mo.growx(1.2)); s = T(s, r'cx="62" cy="63"', lambda op: mo.pop(1.1)); s = T(s, r'cx="76" cy="63"', lambda op: mo.pop(1.5))
    s = T(s, r'x="76" y="46" width="24"', lambda op: mo.pop(1.8)); s = TD(s, r'd="M 81 54 L 87 58 L 81 62"', mo, 2.4, 0.4)
    s = T(s, r'x1="90" y1="62" x2="96" y2="62"', mo.custom('cursor', [(0, 'opacity:0'), (2.8, 'opacity:0'), (2.9, 'opacity:1'), (3.4, 'opacity:0'), (3.9, 'opacity:1'), (4.4, 'opacity:0'), (4.9, 'opacity:1'), (6.2, 'opacity:1'), (6.8, 'opacity:0'), (7, 'opacity:0')]))
    packet = '<circle class="%s" cx="62" cy="63" r="2" fill="#2ec4c6" opacity="0"/>' % mo.custom('packet', [(0, 'opacity:0;transform:translateX(0px)'), (3.0, 'opacity:0;transform:translateX(0px)'), (3.05, 'opacity:1;transform:translateX(0px)'), (3.6, 'opacity:1;transform:translateX(14px)'), (3.65, 'opacity:0;transform:translateX(14px)'), (7, 'opacity:0')])
    s = s.replace('</svg>', packet + '</svg>')
    return finish(s, mo)


def p_hero_ollama(s):     # the invader steps in, the model plugs into the local machine
    mo = Motion()
    sprite = mo.custom('stepper', [(0, 'transform:translateX(-9px)'), (0.3, 'transform:translateX(-9px)'), (0.7, 'transform:translateX(-6px)'), (1.1, 'transform:translateX(-6px)'), (1.4, 'transform:translateX(-3px)'), (1.8, 'transform:translateX(-3px)'), (2.1, 'transform:translateX(0px)'), (7, 'transform:translateX(0px)')])
    s = T(s, r'<g fill="#ffffff" opacity="0\.92">', sprite)
    s = T(s, r'x1="60" y1="50" x2="60" y2="58"', lambda op: mo.drop(2.2, op)); s = T(s, r'x="53" y="58" width="14"', lambda op: mo.rise(2.5, op))
    s = T(s, r'x1="57" y1="66"', lambda op: mo.drop(3.0, op)); s = T(s, r'x1="63" y1="66"', lambda op: mo.drop(3.1, op))
    s = T(s, r'x="38" y="74" width="44"', lambda op: mo.pop(3.4, op)); s = T(s, r'x1="44" y1="89" x2="62" y2="89"', lambda op: mo.growx(3.8, op))
    s = T(s, r'cx="74" cy="89" r="2"', mo.custom('led', [(0, 'opacity:.9'), (4.2, 'opacity:.9'), (4.4, 'opacity:.1'), (4.7, 'opacity:.9'), (5.0, 'opacity:.1'), (5.3, 'opacity:.9'), (7, 'opacity:.9')]))
    return finish(s, mo)


def p_orch1(s):           # the router picks one of six specialists, each holding one document
    mo = Motion()
    s = T(s, r'cx="60" cy="30" r="12"', lambda op: mo.pop(0.2, op))
    s = TA(s, r'y="78" width="1\d" height="22"', lambda i, op: mo.pop(0.6 + 0.15 * i, op))
    docs = [m for m in TAG.finditer(s) if m.group(0).startswith('<line') and 'stroke="#1a2b4b"' in m.group(0)]
    s = TA(s, r'<line[^<>]*stroke="#1a2b4b"', lambda i, op: mo.fade(0.9 + 0.15 * (i // 2), op))
    s = TA(s, r'<line[^<>]*stroke="#80deea"', lambda i, op: mo.custom('best', [(0, 'opacity:0;stroke-dashoffset:1'), (1.9, 'opacity:0'), (2.0, 'opacity:.95;stroke-dashoffset:1'), (2.7, 'opacity:.95;stroke-dashoffset:0'), (6.2, 'opacity:.95'), (6.8, 'opacity:0'), (7, 'opacity:0')], 'stroke-dasharray:1') if i == 2 else mo.draw(1.5 + 0.1 * i, 0.5, op), 'pathLength="1"')
    return finish(s, mo)


def p_orch2(s):           # two agents exchange messages, and the agent card says what each can do
    mo = Motion()
    s = T(s, r'cx="34" cy="46"', lambda op: mo.pop(0.2, op)); s = T(s, r'cx="86" cy="46"', lambda op: mo.pop(0.5, op))
    s = T(s, r'x1="46" y1="46" x2="74" y2="46"', lambda op: mo.growx(1.0, op))
    s = T(s, r'd="M50 41 L44 46', lambda op: mo.pop(1.6, op)); s = T(s, r'd="M70 41 L76 46', lambda op: mo.pop(1.9, op))
    msg = lambda a, b: mo.custom(('msg', a, b), [(0, 'opacity:0;transform:translateX(0px)'), (2.4, 'opacity:0;transform:translateX(0px)'), (2.45, 'opacity:1;transform:translateX(0px)'), (3.1, 'opacity:1;transform:translateX(24px)'), (3.15, 'opacity:0'), (3.4, 'opacity:0;transform:translateX(24px)'),
                                                 (3.45, 'opacity:1;transform:translateX(24px)'), (4.1, 'opacity:1;transform:translateX(0px)'), (4.15, 'opacity:0'), (7, 'opacity:0')])
    s = s.replace('</svg>', '<circle class="%s" cx="50" cy="46" r="2.4" fill="#ffffff" opacity="0"/>' % msg(0, 1) + '</svg>')
    s = T(s, r'x="30" y="78"', lambda op: mo.pop(4.4, op)); s = TA(s, r'<line[^<>]*stroke="#1a2b4b"', lambda i, op: mo.growx(4.8 + 0.2 * i, op))
    return finish(s, mo)


def p_orch3(s):           # the orchestrating agent reaches the document, and the answer is verified
    mo = Motion()
    s = T(s, r'cx="34" cy="60"', lambda op: mo.pop(0.2, op)); s = T(s, r'x1="47" y1="60"', lambda op: mo.growx(0.9, op))
    s = T(s, r'x="64" y="34"', lambda op: mo.pop(1.5, op)); s = TA(s, r'<line[^<>]*stroke="#1a2b4b"', lambda i, op: mo.growx(2.0 + 0.2 * i, op))
    s = T(s, r'cx="90" cy="82" r="13"', lambda op: mo.pop(3.0, op)); s = TD(s, r'd="M83 82 L88 87', mo, 3.5, 0.5)
    return finish(s, mo)


def p_rag1(s):            # a toy RAG stack builds from the database up
    mo = Motion()
    s = T(s, r'x="26" y="78"', lambda op: mo.rise(0.3, op)); s = T(s, r'x="30" y="56"', lambda op: mo.rise(0.9, op)); s = T(s, r'x="34" y="34"', lambda op: mo.rise(1.5, op))
    s = T(s, r'x1="60" y1="72"', lambda op: mo.fade(1.2, op)); s = T(s, r'x1="60" y1="50"', lambda op: mo.fade(1.8, op))
    s = TA(s, r'r="2\.5"', lambda i, op: mo.pop(1.0 + 0.12 * i, op))
    return finish(s, mo)


def p_spec1(s):           # a calculator proposal becomes a spec with additions marked
    mo = Motion()
    s = T(s, r'x="10" y="26" width="34"', lambda op: mo.pop(0.2, op)); s = T(s, r'x="15" y="32" width="24"', lambda op: mo.fade(0.5, op))
    s = TA(s, r'width="5" height="5"', lambda i, op: mo.pop(0.7 + 0.07 * i, op)); s = T(s, r'x="15" y="80" width="21"', lambda op: mo.growx(1.5, op))
    s = T(s, r'x1="50" y1="60" x2="68" y2="60"', lambda op: mo.growx(2.0, op)); s = T(s, r'points="68,55 76,60 68,65"', lambda op: mo.pop(2.5, op))
    s = T(s, r'd="M82 26 H100', lambda op: mo.pop(2.7, op)); s = T(s, r'd="M100 26 V34', lambda op: mo.pop(2.9, op))
    s = T(s, r'<text x="87" y="50"', lambda op: mo.slide(3.2, 0, 6, op)); s = T(s, r'<text x="87" y="66"', lambda op: mo.slide(3.7, 0, 6, op))
    s = T(s, r'x1="87" y1="52"', lambda op: mo.growx(3.4, op)); s = T(s, r'x1="87" y1="68"', lambda op: mo.growx(3.9, op))
    s = TA(s, r'stroke="#1a2b4b" stroke-width="1\.4"', lambda i, op: mo.fade(4.3 + 0.2 * i, op))
    return finish(s, mo)


def p_spec2(s):           # a constitution governs the specs below it
    mo = Motion()
    s = T(s, r'd="M42 12 H70', lambda op: mo.pop(0.2, op)); s = T(s, r'd="M70 12 V20', lambda op: mo.pop(0.5, op))
    s = TA(s, r'y1="(28|34|40)" x2="(73|65)"', lambda i, op: mo.growx(0.7 + 0.15 * i, op))
    s = T(s, r'x1="52" y1="46"', lambda op: mo.growx(1.6, op)); s = T(s, r'x1="68" y1="46"', lambda op: mo.growx(1.7, op))
    s = T(s, r'x="16" y="70"', lambda op: mo.pop(2.2, op)); s = T(s, r'x="21" y="76"', lambda op: mo.fade(2.5, op)); s = T(s, r'x="76" y="70"', lambda op: mo.pop(2.5, op)); s = T(s, r'x="81" y="76"', lambda op: mo.fade(2.8, op))
    s = TA(s, r'stroke="#1a2b4b" stroke-width="1\.4"', lambda i, op: mo.growx(2.9 + 0.1 * i, op))
    return finish(s, mo)


def p_spec3(s):           # five personas hand work round a ring to a shared document
    mo = Motion()
    for i, (cx, cy) in enumerate([(60, 22), (94, 46), (82, 86), (38, 86), (26, 46)]):
        s = T(s, r'cx="%d" cy="%d" r="9"' % (cx, cy), lambda op, i=i: mo.pop(0.3 + 0.35 * i, op))
    s = TD(s, r'd="M60 22 L94 46 L82 86', mo, 0.5, 1.9)
    s = T(s, r'x="48" y="50" width="24"', lambda op: mo.pop(2.6, op)); s = TA(s, r'stroke="#1a2b4b" stroke-width="1\.6"', lambda i, op: mo.growx(3.0 + 0.2 * i, op))
    return finish(s, mo)


def p_spec4(s):           # three tools converge on a verdict
    mo = Motion()
    for i, x in enumerate([14, 49, 84]):
        s = T(s, r'x="%d" y="\d+" width="22"' % x, lambda op, i=i: mo.pop(0.3 + 0.3 * i, op))
    s = T(s, r'x1="25" y1="42"', lambda op: mo.draw(1.4, 0.6, op), 'pathLength="1"'); s = T(s, r'x1="60" y1="36"', lambda op: mo.draw(1.7, 0.6, op), 'pathLength="1"'); s = T(s, r'x1="95" y1="42"', lambda op: mo.draw(2.0, 0.6, op), 'pathLength="1"')
    s = T(s, r'cx="60" cy="86" r="20"', lambda op: mo.pop(2.8, op)); s = TD(s, r'd="M50 86 L58 94', mo, 3.4, 0.6)
    return finish(s, mo)


def p_claude_symbol(s):   # the Claude mark turns into place
    mo = Motion()
    turn = mo.custom('claudespin', [(0, 'opacity:0;transform:rotate(-180deg) scale(.5)'), (0.2, 'opacity:0;transform:rotate(-180deg) scale(.5)'), (0.5, 'opacity:1;transform:rotate(-180deg) scale(.5)'),
                                    (2.0, 'opacity:1;transform:rotate(0deg) scale(1)'), (6.2, 'opacity:1;transform:rotate(0deg) scale(1)'), (6.8, 'opacity:0;transform:rotate(0deg) scale(1)'), (7, 'opacity:0;transform:rotate(-180deg) scale(.5)')], 'transform-origin:600px 600px')
    s = T(s, r'<g id="g314"', turn)
    return finish(s, mo)


MAKERS = {
    '3dprinting3': p_3dprinting3, 'attiny1': p_attiny1, 'azurefoundryagent2': p_azurefoundryagent2, 'azurefoundryagent3': p_azurefoundryagent3,
    'azurefoundryagent4': p_azurefoundryagent4, 'azurefoundryagent5': p_azurefoundryagent5, 'claudecode16': p_claudecode16,
    'codingagentsroles': p_codingagentsroles, 'codingagentsthatstay': p_codingagentsthatstay, 'minigpt': p_minigpt, 'minigpt-grown': p_minigpt_grown,
    'minigpt2': p_minigpt2, 'minigpt3': p_minigpt3, 'minigpt4': p_minigpt4, 'minigpt5': p_minigpt5, 'minigpt6': p_minigpt6, 'minigpt7': p_minigpt7,
    'minigpt8': p_minigpt8, 'odata': p_odata, 'singsaber': p_singsaber, 'deepseekharnesshybrid': p_deepseekharnesshybrid,
    'distillation': p_distillation, 'distillation2': p_distillation2, 'businesscentralmcpclaudecode': p_hero_bc_mcp, 'deepseekharnessollama': p_hero_ollama,
    'orchestration1': p_orch1, 'orchestration2': p_orch2, 'orchestration3': p_orch3, 'rag1': p_rag1, 'specdriven1': p_spec1, 'specdriven2': p_spec2,
    'specdriven3': p_spec3, 'specdriven4': p_spec4, 'claudecode': p_claude_symbol,
}
STATIC = {'deepseekharnesshybrid': 'hero-deepseek-harness-hybrid.svg', 'businesscentralmcpclaudecode': 'hero-bc-mcp-claude-code.svg', 'deepseekharnessollama': 'hero-deepseek-harness-ollama.svg',
          'orchestration1': 'hero-orchestration-routing.svg', 'orchestration2': 'hero-a2a-agents.svg', 'orchestration3': 'hero-a2a-regulatory-watch.svg', 'rag1': 'hero-rag-toy-stack.svg',
          'specdriven1': 'hero-specdriven-openspec.svg', 'specdriven2': 'hero-specdriven-speckit.svg', 'specdriven3': 'hero-specdriven-bmad.svg', 'specdriven4': 'hero-specdriven-verdict.svg',
          'claudecode': 'Claude_AI_symbol.svg'}

if __name__ == '__main__':
    only = sys.argv[1:] or list(MAKERS)
    for slug in only:
        name = STATIC.get(slug, 'posts-meta.svg')
        src = os.path.join(ROOT, slug, name)
        out = os.path.join(ROOT, slug, name[:-4] + '-motion.svg')
        try:
            res = MAKERS[slug](open(src).read())
        except Exception as e:
            print('FAILED', slug, repr(e)[:200]); continue
        open(out, 'w').write(res)
        print('ok', slug, len(res))
