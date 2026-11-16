// @ts-nocheck
/* Mądrzejsi wrogowie (v1.5.0):
   - alarm w grupie: kto zobaczy gracza, budzi sąsiadów (żółty „!”),
   - oskrzydlanie: kilku goniących rozkłada się wokół gracza zamiast iść gęsiego,
   - zamach przed ciosem: wróg w zasięgu staje na 0,38 s z pomarańczowym „!”, potem doskakuje,
   - strzelcy trzymają dystans, ranni czasem uciekają, nikt nie klinuje się w ścianie,
   - bossowie lochu: fala z pieczątki (Pieczątkarz) i deszcz pieczątek z sufitu (Reklamator).
   Koszt: jedna pętla O(n²) dla n ≤ ~15 wrogów w strefie, reszta O(1) na wroga. */
import { api } from "../runtime/api.js";

export const CHASE = {
  zombie: { sp: 24, see: 130, r: 5, wob: 0 },
  spider: { sp: 36, see: 140, r: 5, wob: 18 },
  rat: { sp: 42, see: 90, r: 4, wob: 0 },
  snake: { sp: 28, see: 120, r: 5, wob: 14, keep: 58 },
  shield: { sp: 28, see: 120, r: 6, wob: 0 },
};
export const RANGED = { ticket: 1, spam: 1, phone: 1 };
const ALERT_R = 72;

api.aiPre = function aiPre(e, n) {
  let list = e.enemies,
    chasers = [];
  for (let l of list) {
    if (!l.alive) continue;
    let g = Math.hypot(e.px - l.x, e.py - l.y),
      c = CHASE[l.kind];
    l.aggroT = Math.max(0, (l.aggroT || 0) - n);
    let see = c ? c.see : RANGED[l.kind] ? 140 : 0;
    see && g < see && (l.aggroT = Math.max(l.aggroT, 3), (l.seen = !0));
    c && g < 150 && l.aggroT > 0 && chasers.push(l);
  }
  // alarm w grupie: widzący budzi sąsiadów
  for (let a of list)
    if (a.alive && a.seen && a.aggroT > 2.5)
      for (let b of list)
        if (b !== a && b.alive && (CHASE[b.kind] || RANGED[b.kind]) && !(b.aggroT > 0)) {
          if (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) > ALERT_R) continue;
          b.aggroT = 2.6;
          b.seen = !0;
          api.Ne && api.Ne(e, b.x, b.y - 18, "!", "#ffd84a");
        }
  // oskrzydlanie: równe kąty wokół gracza
  chasers.sort((a, b) => a.uid - b.uid);
  let base = chasers.length ? Math.atan2(chasers[0].y - e.py, chasers[0].x - e.px) : 0;
  chasers.forEach((l, i) => (l.slot = chasers.length > 1 ? base + (i / chasers.length) * Math.PI * 2 : null));
  api.tickMarks(e, n);
};

function step(e, l, vx, vy, n, r) {
  let ox = l.x,
    oy = l.y,
    hit = api.Ye(e, l, vx * n, vy * n, r);
  // utknięcie: ruch dużo mniejszy niż zamierzony
  let want = Math.hypot(vx, vy) * n,
    got = Math.hypot(l.x - ox, l.y - oy);
  if (want > 0.05 && got < want * 0.25) l.stuck = (l.stuck || 0) + n;
  else l.stuck = Math.max(0, (l.stuck || 0) - n * 2);
  if (l.stuck > 0.3 && !(l.slideT > 0)) {
    // ślizg wzdłuż ściany: prostopadle do kierunku ruchu, strona zależna od tego, gdzie jest luz
    let px = -vy,
      py = vx,
      m = Math.hypot(px, py) || 1;
    ((px /= m), (py /= m));
    let side = api.sp(e, l.x + px * 8, l.y + py * 8, r) ? -1 : 1;
    ((l.slideX = px * side), (l.slideY = py * side), (l.slideT = 0.45), (l.stuck = 0));
  }
  return hit;
}

/* Ruch goniącego. Zwraca true, gdy obsłużony. */
api.aiChase = function aiChase(e, l, n) {
  let c = CHASE[l.kind];
  if (!c) return !1;
  let d = e.px - l.x,
    v = e.py - l.y,
    g = Math.hypot(d, v) || 1;
  // ucieczka rannego (co trzeci wróg, raz na życie)
  if (!l.fled && l.hp < l.maxHp * 0.28 && l.uid % 3 === 0 && l.kind !== "shield") {
    ((l.fled = !0), (l.fleeT = 1.5), api.Ne && api.Ne(e, l.x, l.y - 16, "ała!", "#ffb0b0"));
  }
  if (l.fleeT > 0) {
    l.fleeT -= n;
    step(e, l, (-d / g) * c.sp * 1.2, (-v / g) * c.sp * 1.2, n, c.r);
    return !0;
  }
  if (l.slideT > 0) {
    l.slideT -= n;
    step(e, l, l.slideX * c.sp + (d / g) * c.sp * 0.3, l.slideY * c.sp + (v / g) * c.sp * 0.3, n, c.r);
    return !0;
  }
  // zamach i doskok
  l.lcd = Math.max(0, (l.lcd || 0) - n);
  if (l.windT > 0) {
    l.windT -= n;
    if (l.windT <= 0) ((l.lungeT = 0.2), (l.lvx = (d / g) * c.sp * 3.4), (l.lvy = (v / g) * c.sp * 3.4));
    return !0;
  }
  if (l.lungeT > 0) {
    l.lungeT -= n;
    step(e, l, l.lvx, l.lvy, n, c.r);
    return !0;
  }
  let active = l.aggroT > 0 || g < c.see;
  if (!active) {
    step(e, l, Math.cos(l.t * 1.3 + l.uid) * 10, Math.sin(l.t * 1.1 + l.uid) * 10, n, c.r);
    return !0;
  }
  if (!c.keep && g < 26 && l.lcd <= 0) {
    ((l.windT = 0.38), (l.lcd = 1.5));
    return !0;
  }
  let tx = e.px,
    ty = e.py;
  if (l.slot !== null && l.slot !== void 0 && g > 34) ((tx += Math.cos(l.slot) * 22), (ty += Math.sin(l.slot) * 22));
  let dx = tx - l.x,
    dy = ty - l.y,
    m = Math.hypot(dx, dy) || 1,
    s = c.sp;
  if (c.keep) {
    // strzelec z bliska: trzyma dystans, krąży
    let k = g < c.keep - 10 ? -1 : g > c.keep + 12 ? 1 : 0;
    ((dx = (d / g) * k - (v / g) * 0.6), (dy = (v / g) * k + (d / g) * 0.6), (m = Math.hypot(dx, dy) || 1));
  }
  let wx = c.wob ? Math.cos(l.t * 4 + l.uid) * c.wob : 0,
    wy = c.wob ? Math.sin(l.t * 5 + l.uid) * c.wob : 0;
  ((l.vx = (dx / m) * s + wx), (l.vy = (dy / m) * s + wy));
  step(e, l, l.vx, l.vy, n, c.r);
  return !0;
};

/* Strzelcy: odsuwają się, gdy gracz jest za blisko, i podchodzą, gdy zaalarmowani są za daleko. */
api.aiRanged = function aiRanged(e, l, n) {
  let d = e.px - l.x,
    v = e.py - l.y,
    g = Math.hypot(d, v) || 1;
  if (g < 56) step(e, l, (-d / g) * 26, (-v / g) * 26, n, 5);
  else if (l.aggroT > 0 && g > 150) step(e, l, (d / g) * 16, (v / g) * 16, n, 5);
};

/* ---------- znaki na podłodze (telegrafowane ataki obszarowe) ---------- */

api.addMark = function addMark(e, x, y, t, r, lvl, mult) {
  (e.marks || (e.marks = [])).push({ x, y, t, max: t, r, lvl, mult });
};
api.tickMarks = function tickMarks(e, n) {
  if (!e.marks || !e.marks.length) return;
  for (let m of e.marks) {
    m.t -= n;
    if (m.t <= 0 && !m.done) {
      m.done = !0;
      api.se(e, m.x, m.y, "#ff4d6d", 14, 70, 0.45);
      api.G(e, "thud");
      api.Bt(e, 2);
      if (Math.hypot(e.px - m.x, e.py - m.y) < m.r) {
        let dmg = api.Ka(e, m.lvl, m.mult);
        dmg > 0 && api.Oa(e, Math.max(1, Math.round(dmg)), m.x, m.y);
      }
    }
  }
  e.marks = e.marks.filter((m) => m.t > -0.25);
};
api.drawMark = function drawMark(c, m, time) {
  let k = Math.max(0, m.t / m.max),
    r = Math.round(m.r * (m.t > 0 ? 1 : 1.2));
  c.globalAlpha = m.t > 0 ? 0.25 + (1 - k) * 0.5 + Math.sin(time * 20) * 0.08 : 0.6;
  api.o(c, "#ff4d6d", Math.round(m.x - r), Math.round(m.y - 1), r * 2, 2);
  api.o(c, "#ff4d6d", Math.round(m.x - 1), Math.round(m.y - r * 0.6), 2, Math.round(r * 1.2));
  api.o(c, "#ffd84a", Math.round(m.x - r * (1 - k)), Math.round(m.y - 4), Math.round(r * 2 * (1 - k)), 1);
  if (m.t > 0) {
    // spadająca pieczątka
    let h = Math.round(k * 60);
    api.o(c, "#1b1424", Math.round(m.x - 5), Math.round(m.y - 12 - h), 10, 9);
    api.o(c, "#b8243a", Math.round(m.x - 4), Math.round(m.y - 7 - h), 8, 3);
    api.o(c, "#8a5a32", Math.round(m.x - 2), Math.round(m.y - 12 - h), 4, 5);
  }
  c.globalAlpha = 1;
};

/* ---------- bossowie lochu ---------- */

api.bossExtra = function bossExtra(e, l, n, g) {
  if (g > 220) return;
  if (l.kind === "stamper") {
    // lądowanie po skoku = fala czterech (w furii ośmiu) pocisków
    if (l.z > 0) l.air = !0;
    else if (l.air) {
      l.air = !1;
      let rage = l.hp < l.maxHp * 0.5,
        cnt = rage ? 8 : 4;
      for (let i = 0; i < cnt; i++) {
        let a = (i / cnt) * Math.PI * 2 + (rage ? 0 : Math.PI / 4);
        e.eshots.push({ x: l.x, y: l.y, vx: Math.cos(a) * 62, vy: Math.sin(a) * 62, kind: "ticket", dead: !1 });
      }
      api.Ne(e, l.x, l.y - 24, "PAC!", "#ff4d6d");
    }
    return;
  }
  if (l.kind === "reklamator" && l.split) {
    l.rain = (l.rain === void 0 ? 1.2 : l.rain) - n;
    if (l.rain <= 0) {
      let p3 = l.hitId === -99;
      l.rain = p3 ? 2.3 : 3.4;
      api.addMark(e, e.px, e.py, 1.05, 13, l.lvl, 2);
      for (let i = 0; i < (p3 ? 3 : 2); i++) {
        let a = Math.random() * Math.PI * 2;
        api.addMark(e, e.px + Math.cos(a) * 30, e.py + Math.sin(a) * 30, 1.05 + i * 0.15, 13, l.lvl, 2);
      }
      api.Ne(e, l.x, l.y - 30, "ODRZUCONO!", "#ff4d6d");
    }
  }
};
