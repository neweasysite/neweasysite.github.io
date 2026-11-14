// @ts-nocheck
/* Pozostałe funkcje silnika.
   Nazwy wewnętrzne zostały po minifikacji — logika jest ta sama co w oryginalnej paczce. */
import { api } from "../runtime/api.js";

api.bt = function bt(e, t) {
  return api.pn[t][api.Ia(e, t)];
};

api.jp = function jp(e) {
  return e.f.root || e.f.kozacki
    ? 4
    : e.f.lich || e.f.undead
      ? 3
      : e.f.act2 || e.f.won
        ? 2
        : e.f.seal || e.f.king
          ? 1
          : 0;
};

api.Dk = function Dk(e) {
  return api.Tk[api.jp(e)];
};

api.Rk = function Rk(e) {
  return api.Ek[api.jp(e)];
};

api.nh = function nh(e) {
  e.np = {};
  e.flock = [];
  for (let t of api.Cn(e).npcs)
    e.np[t.id] = {
      x: api.Y(t.tx),
      y: api.Y(t.ty),
      gx: api.Y(t.tx),
      gy: api.Y(t.ty),
      fx: 0,
      fy: 1,
      walk: 0,
      moving: !1,
      wait: 0.5 + Math.random() * 2,
    };
  for (let t of api.Cn(e).sheep || [])
    e.flock.push({
      x: api.Y(t.tx),
      y: api.Y(t.ty),
      gx: api.Y(t.tx),
      gy: api.Y(t.ty),
      fx: 0,
      fy: 1,
      walk: Math.random() * 4,
      moving: !1,
      wait: 0.4 + Math.random() * 1.6,
      dark: !!t.dark,
      face: 1,
      x0: t.x0,
      y0: t.y0,
      x1: t.x1,
      y1: t.y1,
      boop: -1,
    });
};

api.flockTick = function flockTick(e, dt) {
  if (!e.flock) return;
  for (let s of e.flock) {
    if (s.wait > 0) {
      ((s.wait -= dt), (s.moving = !1));
      if (s.wait > 0) continue;
      for (let k = 0; k < 6; k++) {
        let tx = s.x0 + Math.floor(Math.random() * (s.x1 - s.x0 + 1)),
          ty = s.y0 + Math.floor(Math.random() * (s.y1 - s.y0 + 1));
        if (!api.Qo(e, api.Pe(e, e.zone, tx, ty)) && !api.Ef(e, tx, ty)) {
          ((s.gx = api.Y(tx)), (s.gy = api.Y(ty)));
          break;
        }
      }
      continue;
    }
    let dx = s.x - e.px,
      dy = s.y - e.py;
    Math.hypot(dx, dy) < 18 &&
      !(e.god && e.god.veil) &&
      ((s.gx = s.x + Math.sign(dx || 1) * 16), (s.gy = s.y + Math.sign(dy) * 16));
    let cx = s.gx - s.x,
      cy = s.gy - s.y;
    if (Math.abs(cx) < 0.4 && Math.abs(cy) < 0.4) {
      ((s.wait = 0.8 + Math.random() * 2.2), (s.moving = !1));
      continue;
    }
    let sp = 12 * dt,
      mx = Math.abs(cx) >= 0.4 ? Math.sign(cx) * Math.min(sp, Math.abs(cx)) : 0,
      my = mx ? 0 : Math.sign(cy) * Math.min(sp, Math.abs(cy)),
      nx = s.x + mx,
      ny = s.y + my,
      tx = Math.floor(nx / api.T),
      ty = Math.floor(ny / api.T);
    if (
      tx < s.x0 ||
      tx > s.x1 ||
      ty < s.y0 ||
      ty > s.y1 ||
      api.Qo(e, api.Pe(e, e.zone, tx, ty))
    ) {
      ((s.wait = 0.4), (s.moving = !1), (s.gx = s.x), (s.gy = s.y));
      continue;
    }
    ((s.x = nx),
      (s.y = ny),
      (s.moving = !0),
      (s.walk += dt),
      mx
        ? ((s.fx = Math.sign(mx)), (s.fy = 0), (s.face = s.fx))
        : ((s.fx = 0), (s.fy = Math.sign(my) || 1)));
  }
};

api.ih = function ih(e, t, n, i, a) {
  for (let r = 0; r < 8; r++) {
    let s = n.tx + Math.round((Math.random() * 2 - 1) * a),
      u = n.ty + Math.round((Math.random() * 2 - 1) * a);
    if (api.Ap(e, t, api.Y(s), api.Y(u), n.id)) {
      ((i.gx = api.Y(s)), (i.gy = api.Y(u)));
      return;
    }
  }
  ((i.gx = i.x), (i.gy = i.y));
};

api.ah = function ah(e, t) {
  let n = api.Cn(e);
  for (let i of n.npcs) {
    let a = e.np[i.id];
    if (!a) continue;
    let r = i.id in api.ep,
      s = api.ep[i.id] || 0;
    if (!r) continue;
    let u = e.px - a.x,
      f = e.py - a.y;
    if (Math.hypot(u, f) < 36) {
      ((a.moving = !1),
        Math.abs(u) > Math.abs(f)
          ? ((a.fx = Math.sign(u)), (a.fy = 0))
          : ((a.fx = 0), (a.fy = f < 0 ? -1 : 1)));
      continue;
    }
    if (!s) {
      a.moving = !1;
      continue;
    }
    if (a.wait > 0) {
      ((a.wait -= t), (a.moving = !1), a.wait <= 0 && api.ih(e, n, i, a, s));
      continue;
    }
    let c = a.gx - a.x,
      y = a.gy - a.y;
    if (Math.abs(c) < 0.5 && Math.abs(y) < 0.5) {
      ((a.wait = 1.2 + Math.random() * 3), (a.moving = !1), (a.fx = 0), (a.fy = 1));
      continue;
    }
    let w = 16 * t,
      b = 0,
      x = 0;
    (Math.abs(c) >= 0.5
      ? (b = Math.sign(c) * Math.min(w, Math.abs(c)))
      : (x = Math.sign(y) * Math.min(w, Math.abs(y))),
      api.Ap(e, n, a.x + b, a.y + x, i.id)
        ? ((a.x += b),
          (a.y += x),
          (a.moving = !0),
          (a.walk += t),
          b ? ((a.fx = Math.sign(b)), (a.fy = 0)) : ((a.fx = 0), (a.fy = Math.sign(x))))
        : ((a.wait = 0.6 + Math.random()), (a.moving = !1), (a.gx = a.x), (a.gy = a.y)));
  }
  api.flockTick(e, t);
};

api.fp = function fp(e, t) {
  if (((t.dead = !0), t.kind === "ticket" && e.boss && !e.f.boss)) {
    let n = e.boss.x - t.x,
      i = e.boss.y - t.y,
      a = Math.hypot(n, i) || 1;
    (e.pshots.push({
      x: t.x,
      y: t.y,
      vx: (n / a) * 170,
      vy: (i / a) * 170,
      dmg: 5,
      kind: "ticket",
      life: 2,
      pierce: 0,
      dead: !1,
      hits: [],
    }),
      api.Ne(e, t.x, t.y - 8, "odes\u0142ane!", "#ffd84a"),
      api.G(e, "parry"));
  }
  api.se(e, t.x, t.y, "#ffd84a", 6, 50, 0.3);
};

api.mh = function mh(e, t) {
  let n = 3 + (e.spec === "burzowa" ? 1 : 0),
    i = e.px,
    a = e.py,
    r = [],
    s = [[e.px, e.py - 4]],
    u = api.Zi(e, 110);
  for (let f = 0; f < n; f++) {
    let c = null,
      y = f === 0 ? 110 : 70;
    for (let w of api.Uf(e)) {
      if ((w.e && r.indexOf(w.e.uid) >= 0) || (!w.e && r.indexOf(-1) >= 0)) continue;
      let b = Math.hypot(w.x - i, w.y - a);
      b < y &&
        (f > 0 || ((w.x - e.px) * u.x + (w.y - e.py) * u.y) / (b || 1) > 0.2) &&
        ((y = b), (c = w));
    }
    if (!c) break;
    (s.push([c.x, c.y]),
      c.e
        ? (r.push(c.e.uid), api.gi(e, c.e, t * (f ? 0.7 : 1), 0, 0))
        : (r.push(-1), api.Ps(e, t * (f ? 0.7 : 1))),
      (i = c.x),
      (a = c.y));
  }
  (s.length === 1 && s.push([e.px + u.x * 50, e.py + u.y * 50]),
    e.bolts.push({ pts: s, life: 0.18 }),
    api.G(e, "zap"));
};

api.jf = function jf(e, t) {
  return t - e > 90;
};
