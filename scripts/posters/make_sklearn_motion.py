"""Gives each Scikit-Learn poster (content/assets/images/sklearnN/posts-meta.svg) a motion version, posts-meta-motion.svg.

Each motion enacts the chapter's own idea. Every animation starts from an earlier state and ends on the finished static
picture, holds, fades, and loops every 7 seconds. Reduced motion shows the static picture. Absolute times, in seconds, are
baked into per-slot keyframes, so everything on a poster stays in step.
"""
import os, re

ROOT = os.path.expanduser('~/Documents/GitHub/haddley.github.io/content/assets/images')
T = 7.0
ELEM = re.compile(r'<(line|circle|rect|path|polygon|polyline)\b[^<>]*>')


class Motion:
    def __init__(self):
        self.css, self.names = [], {}

    def pct(self, t):
        return '%.2f%%' % (max(0, min(T, t)) / T * 100)

    def kf(self, key, pts, props):
        if key in self.names:
            return self.names[key]
        n = 'm%d' % len(self.names)
        self.names[key] = n
        pts = sorted(pts, key=lambda p: p[0])
        body = ''.join('%s{%s}' % (self.pct(t), d) for t, d in pts)
        self.css.append('@keyframes %s{%s}.%s{%s;animation:%s %.0fs ease-in-out infinite}' % (n, body, n, props, n, T))
        return n

    # ---- kinds: each returns a class name
    def _appear(self, key, t0, hidden, shown, props, over=None):
        t0 = round(t0, 2)
        over = over or (shown, shown)
        pts = [(0, hidden), (t0, hidden), (t0 + 0.35, over[0]), (t0 + 0.6, shown), (6.2, shown), (6.8, hidden), (7, hidden)]
        return self.kf((key, t0, shown), pts, props)

    def pop(self, t0, op=1):
        return self._appear('pop', t0, 'opacity:0;transform:scale(0)', 'opacity:%s;transform:scale(1)' % op,
                            'transform-box:fill-box;transform-origin:center', ('opacity:%s;transform:scale(1.3)' % op, None))

    def fade(self, t0, op=1):
        return self._appear('fade', t0, 'opacity:0', 'opacity:%s' % op, '')

    def rise(self, t0, op=1):
        return self._appear('rise', t0, 'opacity:0;transform:scaleY(0)', 'opacity:%s;transform:scaleY(1)' % op,
                            'transform-box:fill-box;transform-origin:50% 100%')

    def drop(self, t0, op=1):
        return self._appear('drop', t0, 'opacity:0;transform:scaleY(0)', 'opacity:%s;transform:scaleY(1)' % op,
                            'transform-box:fill-box;transform-origin:50% 0%')

    def growx(self, t0, op=1):
        return self._appear('growx', t0, 'opacity:0;transform:scaleX(0)', 'opacity:%s;transform:scaleX(1)' % op,
                            'transform-box:fill-box;transform-origin:0% 50%')

    def slide(self, t0, dx, dy, op=1):
        return self._appear('slide%s,%s' % (dx, dy), t0, 'opacity:0;transform:translate(%spx,%spx)' % (dx, dy),
                            'opacity:%s;transform:translate(0px,0px)' % op, '')

    def draw(self, t0, dur, op=1):
        t0 = round(t0, 2)
        hid = 'opacity:0;stroke-dashoffset:1'
        shown = 'opacity:%s;stroke-dashoffset:0' % op
        pts = [(0, hid), (t0, hid), (t0 + 0.01, 'opacity:%s;stroke-dashoffset:1' % op), (t0 + dur, shown), (6.2, shown), (6.8, hid), (7, hid)]
        return self.kf(('draw', t0, dur, op), pts, 'stroke-dasharray:1')

    def pulse(self, t0, s=1.5, again=None):
        base = 'transform:scale(1)'
        pts = [(0, base), (t0, base), (t0 + 0.3, 'transform:scale(%s)' % s), (t0 + 0.7, base)]
        if again is not None:
            pts += [(again, base), (again + 0.3, 'transform:scale(%s)' % s), (again + 0.7, base)]
        pts.append((7, base))
        return self.kf(('pulse', t0, s, again), pts, 'transform-box:fill-box;transform-origin:center')

    def color(self, t_in, t_col, grey, final, op=1):
        a = 'opacity:0;fill:%s' % grey
        g = 'opacity:%s;fill:%s' % (op, grey)
        f = 'opacity:%s;fill:%s' % (op, final)
        pts = [(0, a), (t_in, a), (t_in + 0.3, g), (t_col, g), (t_col + 0.4, f), (6.2, f), (6.8, 'opacity:0;fill:%s' % final), (7, a)]
        return self.kf(('color', t_in, t_col, grey, final, op), pts, '')

    def custom(self, key, pts, props=''):
        return self.kf(('custom', key), pts, props)

    def style(self):
        return ('<style>' + ''.join(self.css) +
                '@media (prefers-reduced-motion: reduce){*{animation:none!important}}</style>')


def opacity_of(el):
    m = re.search(r'\bopacity="([\d.]+)"', el)
    return float(m.group(1)) if m else 1


def A(el, cls, extra=''):
    return re.sub(r'^<(\w+)', lambda m: '<%s class="%s"%s' % (m.group(1), cls, (' ' + extra) if extra else ''), el, count=1)


def D(el, cls):
    """For a line, path or polyline that is drawn on: it needs pathLength so that a dash of 1 spans it whole."""
    return A(el, cls, 'pathLength="1"')


def edit(s, tag, fn):
    i = [0]
    def r(m):
        if m.group(1) != tag or 'width="120" height="120"' in m.group(0):      # the background tile is never edited
            return m.group(0)
        out = fn(i[0], m.group(0)); i[0] += 1
        return out
    return ELEM.sub(r, s)


def edit_all(s, fn):
    i = [0]
    def r(m):
        out = fn(m.group(1), i[0], m.group(0)); i[0] += 1
        return out
    return ELEM.sub(r, s)


def finish(s, mo, extra_title=None):
    m = re.search(r'<svg\b[^>]*>', s)
    return s[:m.end()] + mo.style() + s[m.end():]


def wrap(el, cls):
    return '<g class="%s">%s</g>' % (cls, el)


# ------------------------------------------------------------------ the posters
def sk1(s):   # nearest neighbours: points settle, a line is fitted, a query point finds its three nearest
    mo = Motion()
    s = edit(s, 'line', lambda i, el: D(el, mo.draw(0.3, 1.2, opacity_of(el))))
    def circ(i, el):
        if i < 10:
            c = mo.pop(0.5 + 0.12 * i)
            if 'fill="#7cc6f0"' in el:          # the three nearest neighbours pulse later, in a wrapper
                return wrap(A(el, c), mo.pulse(3.9, 1.7))
            return A(el, c)
        if i == 10: return A(el, mo.pop(3.0, 0.85))     # dashed ring
        if i == 11: return A(el, mo.pop(2.6, 0.22))
        return A(el, mo.pop(2.6))
    s = edit(s, 'circle', circ)
    return finish(s, mo)


def sk2(s):   # California house values: the state, then the districts, then the expensive coast lights up
    mo = Motion()
    s = edit(s, 'path', lambda i, el: A(el, mo.fade(0.2)))
    def circ(i, el):
        if i in (14, 15):                      # the glows behind the expensive coast
            return wrap(A(el, mo.pop(2.6, 0.2)), mo.pulse(3.6, 1.5, 4.8))
        if i >= 16:                            # the expensive coastal districts
            return A(el, mo.pop(2.2 + 0.1 * (i - 16)))
        return A(el, mo.pop(0.6 + 0.07 * i))
    s = edit(s, 'circle', circ)
    return finish(s, mo)


def sk3(s):   # a handwritten 5: the pixels light row by row, then the model says 5
    mo = Motion()
    def rect(i, el):
        if 'fill="#16304d"' in el: return el
        y = float(re.search(r'\by="([\d.]+)"', el).group(1)); row = round((y - 17.0) / 7.4)
        return A(el, mo.pop(0.3 + 0.3 * row))
    s = edit(s, 'rect', rect)
    s = edit(s, 'circle', lambda i, el: A(el, mo.pop(3.0, 0.22)))
    s = edit(s, 'path', lambda i, el: D(el, mo.draw(3.1, 0.6)))
    return finish(s, mo)


def sk4(s):   # gradient descent: steps walk down the curve to the bottom
    mo = Motion()
    s = edit(s, 'polyline', lambda i, el: D(el, mo.draw(0.2, 1.0)))
    s = edit(s, 'line', lambda i, el: A(el, mo.fade(1.2 + 0.55 * (i + 1) - 0.1)))
    def circ(i, el):
        if i <= 5: return A(el, mo.pop(1.2 + 0.55 * i))
        if i == 6: return wrap(A(el, mo.pop(1.2 + 0.55 * 6, 0.22)), mo.pulse(5.0, 1.6))
        return A(el, mo.pop(1.2 + 0.55 * 6))
    s = edit(s, 'circle', circ)
    return finish(s, mo)


def sk5(s):   # support vector machine: the street widens until it touches the nearest points
    mo = Motion()
    def line(i, el):
        if i == 0: return D(el, mo.draw(0.2, 0.7))
        d = 12 if i == 1 else -12
        c = mo.custom(('street', i), [(0, 'transform:translate(%dpx,%dpx)' % (d, d)), (1.6, 'transform:translate(%dpx,%dpx)' % (d, d)),
                                       (3.0, 'transform:translate(0px,0px)'), (7, 'transform:translate(0px,0px)')])
        return A(el, c)
    s = edit(s, 'line', line)
    def circ(i, el):
        if i < 6: return A(el, mo.pop(0.3 + 0.1 * i))
        return A(el, mo.pop(3.1 + 0.3 * (0 if i < 9 else 1), opacity_of(el) if 'opacity' in el else 1))
    s = edit(s, 'circle', circ)
    def rect(i, el):
        if i < 6: return A(el, mo.pop(0.9 + 0.1 * i))
        return A(el, mo.pop(3.4))
    s = edit(s, 'rect', rect)
    return finish(s, mo)


def sk6(s):   # decision tree: one question at a time, split by split
    mo = Motion()
    def line(i, el):
        return D(el, mo.draw(0.9 if i < 2 else 2.1, 0.5))
    s = edit(s, 'line', line)
    times = [0.3, 1.4, 1.5, 2.6, 2.8, 2.8]
    s = edit(s, 'rect', lambda i, el: A(el, mo.pop(times[i], opacity_of(el))))
    return finish(s, mo)


def sk7(s):   # random forest: trees grow, then each one votes
    mo = Motion()
    state = {'n': 0}
    def tree(m):
        k = state['n']; state['n'] += 1
        return wrap(m.group(0), mo.rise(0.3 + 0.35 * k))
    s = re.sub(r'(?:<path[^<>]*/>\s*){2}<rect[^<>]*/>', tree, s)
    s = edit(s, 'line', lambda i, el: D(el, mo.draw(1.9 + 0.2 * i, 0.6, opacity_of(el))))
    s = edit(s, 'circle', lambda i, el: A(el, mo.pop(3.0, opacity_of(el))) if i == 0 else wrap(A(el, mo.pop(3.0)), mo.pulse(4.0, 1.5)))
    return finish(s, mo)


def sk8(s):   # PCA: points drop onto a flat plane, and the main direction is drawn
    mo = Motion()
    s = edit(s, 'path', lambda i, el: A(el, mo.fade(0.2)) if i == 0 else A(el, mo.pop(3.6)))
    def line(i, el):
        if i < 6: return A(el, mo.drop(1.4 + 0.15 * i, opacity_of(el)))
        return D(el, mo.draw(3.0, 0.8, opacity_of(el)))
    s = edit(s, 'line', line)
    def circ(i, el):
        k = i // 2
        if i % 2 == 0: return A(el, mo.pop(2.0 + 0.15 * k))        # the projected point on the plane
        return A(el, mo.pop(0.3 + 0.2 * k))                          # the point in 3D
    s = edit(s, 'circle', circ)
    return finish(s, mo)


def sk9(s):   # K-Means: unlabelled points, then three groups appear, centres move in
    mo = Motion()
    finals = {'#3a9bdc': 1.6, '#7cc6f0': 2.0, '#2a6fae': 2.4}
    def circ(i, el):
        fill = re.search(r'fill="(#\w+)"', el)
        if fill is None or fill.group(1) == 'none':      # a dashed cluster ring
            k = [0, 10, 20].index(i) if i in (0, 10, 20) else 0
            return A(el, mo.pop(finals[['#3a9bdc', '#7cc6f0', '#2a6fae'][k]] + 0.6))
        f = fill.group(1)
        t = finals[f]
        return A(el, mo.color(0.2 + 0.02 * i, t, '#5f7f9f', f))
    s = edit(s, 'circle', circ)
    s = edit(s, 'path', lambda i, el: A(el, mo.pop(list(finals.values())[i] + 0.3)))
    return finish(s, mo)


def layers(s, tag='circle'):
    xs = sorted({float(re.search(r'\bcx="([\d.]+)"', c).group(1)) for c in re.findall(r'<circle[^<>]*>', s)})
    return xs


def sk10(s):   # a Keras network: the signal passes layer by layer, then the error comes back
    mo = Motion()
    xs = layers(s)
    def line(i, el):
        x1 = float(re.search(r'x1="([\d.]+)"', el).group(1)); k = xs.index(x1)
        return D(el, mo.draw(0.8 + 0.9 * k, 0.5, opacity_of(el)))
    s = edit(s, 'line', line)
    s = edit(s, 'circle', lambda i, el: A(el, mo.pop(0.3 + 0.9 * xs.index(float(re.search(r'\bcx="([\d.]+)"', el).group(1))))))
    s = edit(s, 'path', lambda i, el: D(el, mo.draw(3.2, 1.0)) if i == 0 else A(el, mo.pop(4.1)))
    return finish(s, mo)


def sk11(s):   # a deep network: the signal crosses many layers, and the loss curve falls
    mo = Motion()
    xs = layers(s)
    def line(i, el):
        x1 = float(re.search(r'x1="([\d.]+)"', el).group(1)); k = xs.index(x1)
        return D(el, mo.draw(0.4 + 0.45 * k, 0.4, opacity_of(el)))
    s = edit(s, 'line', line)
    s = edit(s, 'circle', lambda i, el: A(el, mo.pop(0.2 + 0.45 * xs.index(float(re.search(r'\bcx="([\d.]+)"', el).group(1))))))
    s = edit(s, 'path', lambda i, el: D(el, mo.draw(2.8, 1.6, opacity_of(el))))
    return finish(s, mo)


def sk12(s):   # custom training loop: forward, then the gradient loop closes
    mo = Motion()
    s = edit(s, 'line', lambda i, el: D(el, mo.draw(0.9, 0.5)))
    s = edit(s, 'rect', lambda i, el: A(el, mo.pop(0.3 + 0.15 * i)))
    s = edit(s, 'circle', lambda i, el: wrap(A(el, mo.pop(0.7)), mo.pulse(3.5, 1.4)))
    def path(i, el):
        if i < 2: return D(el, mo.draw(1.7, 1.6, opacity_of(el)))
        return A(el, mo.pop(3.2))
    s = edit(s, 'path', path)
    return finish(s, mo)


def sk13(s):   # tf.data: files stream in, the pipeline mixes them, batches come out
    mo = Motion()
    s = edit(s, 'line', lambda i, el: D(el, mo.draw(0.9 + 0.1 * i, 0.5)))
    def rect(i, el):
        if i < 3: return A(el, mo.slide(0.3 + 0.2 * i, -16, 0))
        return A(el, mo.pop(1.8 + 0.2 * (i - 3)))
    s = edit(s, 'rect', rect)
    s = edit(s, 'circle', lambda i, el: wrap(A(el, mo.pop(1.3)), mo.pulse(2.6, 1.3)))
    def path(i, el):
        return D(el, mo.draw(2.6, 1.0)) if i == 0 else A(el, mo.pop(3.5))
    s = edit(s, 'path', path)
    return finish(s, mo)


def sk14(s):   # a convolution: the filter slides over the grid, and the output lights each time
    mo = Motion()
    steps = [(-18, -18), (0, -18), (-18, 0), (0, 0)]
    cells = []
    def rect(i, el):
        if i < 9: return A(el, mo.pop(0.2 + 0.08 * i))
        pts = [(0, 'opacity:0;transform:translate(-18px,-18px)'), (0.9, 'opacity:0;transform:translate(-18px,-18px)'), (1.2, 'opacity:1;transform:translate(-18px,-18px)')]
        for k, (dx, dy) in enumerate(steps[1:], start=1):
            pts += [(1.2 + 0.8 * k - 0.4, 'opacity:1;transform:translate(%dpx,%dpx)' % steps[k - 1]), (1.2 + 0.8 * k, 'opacity:1;transform:translate(%dpx,%dpx)' % (dx, dy))]
        pts += [(6.2, 'opacity:1;transform:translate(0px,0px)'), (6.8, 'opacity:0;transform:translate(0px,0px)'), (7, 'opacity:0;transform:translate(-18px,-18px)')]
        return A(el, mo.custom('filter', pts))
    s = edit(s, 'rect', rect)
    s = edit(s, 'line', lambda i, el: D(el, mo.draw(1.2, 0.4)))
    def circ(i, el):
        pts = [(0, 'transform:scale(1)')]
        for t in (1.5, 2.3, 3.1, 3.9):
            pts += [(t, 'transform:scale(1)'), (t + 0.2, 'transform:scale(1.4)'), (t + 0.45, 'transform:scale(1)')]
        pts.append((7, 'transform:scale(1)'))
        return A(el, mo.custom('outpulse', pts, 'transform-box:fill-box;transform-origin:center'))
    s = edit(s, 'circle', circ)
    return finish(s, mo)


def sk15(s):   # a recurrent network: the state hops along the sequence, then loops back
    mo = Motion()
    s = edit(s, 'line', lambda i, el: A(el, mo.fade(0.8 + 0.3 * i)))
    s = edit(s, 'rect', lambda i, el: A(el, mo.pop(0.3 + 0.25 * i)))
    def path(i, el):
        if i < 2: return D(el, mo.draw(3.6, 1.0, opacity_of(el)))
        return A(el, mo.pop(4.5))
    s = edit(s, 'path', path)
    xs = [28, 54, 80, 105]
    pts = [(0, 'opacity:0;transform:translate(0px,0px)'), (1.1, 'opacity:0;transform:translate(0px,0px)'), (1.3, 'opacity:1;transform:translate(0px,0px)')]
    for k in range(1, 4):
        pts += [(1.3 + 0.65 * k - 0.3, 'opacity:1;transform:translate(%dpx,0px)' % (xs[k - 1] - 28)), (1.3 + 0.65 * k, 'opacity:1;transform:translate(%dpx,0px)' % (xs[k] - 28))]
    pts += [(3.5, 'opacity:1;transform:translate(77px,0px)'), (4.0, 'opacity:0;transform:translate(77px,0px)'), (7, 'opacity:0;transform:translate(0px,0px)')]
    dot = '<circle class="%s" cx="28" cy="78" r="3.6" fill="#f6c25b"/>' % mo.custom('hop', pts)
    s = s.replace('</svg>', dot + '</svg>')
    return finish(s, mo)


def sk16(s):   # attention: each word looks back; the strongest link is the thickest
    mo = Motion()
    s = edit(s, 'rect', lambda i, el: A(el, mo.pop(0.2 + 0.2 * i)))
    order = {0: (2.7, 0.7), 1: (2.0, 0.7), 2: (1.2, 0.9)}       # gold, light blue, then the long grey arc
    def path(i, el):
        t0, d = order[i]
        return D(el, mo.draw(t0, d, opacity_of(el)))
    s = edit(s, 'path', path)
    return finish(s, mo)


def sk17(s):   # an autoencoder: the bars squeeze to the bottleneck and expand again
    mo = Motion()
    def rect(i, el):
        if 'fill="#f6c25b"' in el:
            return wrap(A(el, mo.pop(1.4)), mo.pulse(2.6, 1.5, 4.4))
        return wrap(A(el, mo.rise(0.2 + 0.18 * i)), mo.custom(('wave', i), [(0, 'transform:scaleY(1)'), (2.4 + 0.22 * i, 'transform:scaleY(1)'), (2.7 + 0.22 * i, 'transform:scaleY(0.82)'), (3.1 + 0.22 * i, 'transform:scaleY(1)'), (7, 'transform:scaleY(1)')],
                                                   'transform-box:fill-box;transform-origin:50% 50%'))
    s = edit(s, 'rect', rect)
    return finish(s, mo)


def sk18(s):   # reinforcement learning: the pole starts to fall, the cart chases it, and it balances
    mo = Motion()
    pole = re.search(r'<line x1="60" y1="78"[^<>]*/>\s*<circle cx="68" cy="28"[^<>]*/>', s).group(0)
    cart = re.search(r'<rect x="44" y="78"[^<>]*/>\s*<circle cx="52"[^<>]*/>\s*<circle cx="68" cy="92"[^<>]*/>', s).group(0)
    angles = [(0, 24), (0.9, -15), (1.8, 10), (2.7, -6), (3.6, 3), (4.4, 0)]
    pp = [(t, 'transform:rotate(%ddeg)' % a) for t, a in angles] + [(6.5, 'transform:rotate(0deg)'), (7, 'transform:rotate(24deg)')]
    cp = [(0, 'transform:translate(-9px,0px)'), (0.9, 'transform:translate(7px,0px)'), (1.8, 'transform:translate(-5px,0px)'), (2.7, 'transform:translate(3px,0px)'),
          (3.6, 'transform:translate(-1px,0px)'), (4.4, 'transform:translate(0px,0px)'), (6.5, 'transform:translate(0px,0px)'), (7, 'transform:translate(-9px,0px)')]
    s = s.replace(pole, '<g class="%s" style="transform-origin:60px 78px">%s</g>' % (mo.custom('pole', pp), pole))
    s = s.replace(cart, '<g class="%s">%s</g>' % (mo.custom('cart', cp), cart))
    return finish(s, mo)


def sk19(s):   # serving: a request goes up the stack, and each server answers in turn
    mo = Motion()
    s = edit(s, 'rect', lambda i, el: A(el, mo.pop(0.2 + 0.15 * i)))
    def circ(i, el):
        k = 2 - i
        pts = [(0, 'transform:scale(1)')]
        for t in (1.3 + 0.5 * k, 3.9 + 0.5 * k):
            pts += [(t, 'transform:scale(1)'), (t + 0.2, 'transform:scale(1.9)'), (t + 0.5, 'transform:scale(1)')]
        pts.append((7, 'transform:scale(1)'))
        return A(el, mo.custom(('led', k), pts, 'transform-box:fill-box;transform-origin:center'))
    s = edit(s, 'circle', circ)
    s = edit(s, 'line', lambda i, el: A(el, mo.growx(1.3 + 0.5 * (2 - i))))
    def path(i, el):
        pts = [(0, 'opacity:0;transform:translate(0px,10px)'), (0.4, 'opacity:0;transform:translate(0px,10px)'), (0.8, 'opacity:1;transform:translate(0px,0px)'),
               (3.4, 'opacity:1;transform:translate(0px,0px)'), (3.8, 'opacity:0;transform:translate(0px,-8px)'), (7, 'opacity:0;transform:translate(0px,10px)')]
        return A(el, mo.custom('request%d' % i, pts))
    s = edit(s, 'path', path)
    return finish(s, mo)


def sk20(s):   # looking back: the bars climb, and the arrow of progress is drawn
    mo = Motion()
    s = edit(s, 'rect', lambda i, el: A(el, mo.rise(0.2 + 0.3 * i)))
    s = edit(s, 'path', lambda i, el: D(el, mo.draw(1.8, 1.0)) if i == 0 else A(el, mo.pop(2.8)))
    return finish(s, mo)


MAKERS = {1: sk1, 2: sk2, 3: sk3, 4: sk4, 5: sk5, 6: sk6, 7: sk7, 8: sk8, 9: sk9, 10: sk10, 11: sk11, 12: sk12, 13: sk13, 14: sk14,
          15: sk15, 16: sk16, 17: sk17, 18: sk18, 19: sk19, 20: sk20}

if __name__ == '__main__':
    import sys
    only = [int(a) for a in sys.argv[1:]] or list(MAKERS)
    for n in only:
        src = open(os.path.join(ROOT, 'sklearn%d' % n, 'posts-meta.svg')).read()
        out = MAKERS[n](src)
        open(os.path.join(ROOT, 'sklearn%d' % n, 'posts-meta-motion.svg'), 'w').write(out)
        print('sklearn%d' % n, len(src), '->', len(out))
