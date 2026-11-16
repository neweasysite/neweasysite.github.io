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
      hp: t.dark ? 10 : 6,
      dead: !1,
      fall: 0,
      flee: 0,
    });
};

api.flockTick = function flockTick(e, dt) {
  if (!e.flock) return;
  for (let s of e.flock) {
    if (s.dead) {
      s.fall > 0 && (s.fall -= dt);
      continue;
    }
    if (s.flee > 0) s.flee -= dt;
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
    if (Math.hypot(dx, dy) < 22 && !(e.god && e.god.veil) && s.flee <= 0) {
      s.flee = 0.8;
      s.wait = 0;
      if (Math.abs(dx) >= Math.abs(dy)) {
        ((s.gx = s.x + Math.sign(dx || 1) * 24), (s.gy = s.y), (s.fx = Math.sign(dx || 1)), (s.fy = 0), (s.face = s.fx));
      } else {
        ((s.gx = s.x), (s.gy = s.y + Math.sign(dy || 1) * 24), (s.fx = 0), (s.fy = Math.sign(dy || 1)));
      }
    }
    let cx = s.gx - s.x,
      cy = s.gy - s.y;
    if (Math.abs(cx) < 0.4 && Math.abs(cy) < 0.4) {
      ((s.wait = 0.8 + Math.random() * 2.2), (s.moving = !1));
      continue;
    }
    let sp = (s.flee > 0 ? 46 : 12) * dt,
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
      (s.walk += dt * 0.55),
      s.flee > 0
        ? 0
        : mx
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
    if (a.inv > 0) a.inv -= t;
    if (a.duel) {
      api.duelStep(e, i.id, a, t);
      continue;
    }
    if (a.shy > 0) {
      api.slideNpc(e, n, i.id, a, t);
      continue;
    }
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

const NPC_FIGHT = {
  bogdan: 14,
  wanda: 11,
  zdzich: 9,
  darek: 8,
  hela: 8,
  henio: 7,
  staszek: 7,
};

const NPC_LINE = {
  bogdan: "Na treningu, nie na mnie.",
  wanda: "Młot nie jest na pokaz.",
  zdzich: "Łopata też jest narzędziem.",
  darek: "Paczka nie. Ja tak.",
  hela: "Owce nie. Ja owszem.",
  henio: "Kufel w dół.",
  staszek: "Strach na wróble gryzie.",
  kamila: "Protokół z napaści, już piszę.",
  grazyna: "Ja to puszczę dalej.",
  filip: "Au! Ja jestem prawie dorosły!",
  ola: "Zostaw stado.",
  rysiek: "Ryby nie, ja też nie.",
  czeslaw: "Termin minął, ale wiosło zostało.",
  wladek: "Zgłoszę to.",
  edek: "Grzyby są grzeczniejsze.",
  mirek: "Cisza. I krok w tył.",
  jadzia: "Babci się nie macha.",
  piotr: "To nie jest wniosek.",
  basia: "Eskaluję to na ciebie.",
  horacy: "Cofnij się od zegara.",
  iga: "To nie recepta na miecz.",
  genowefa: "Garnek jest gorący. Ja też.",
  wicek: "Owce liczę, nie zęby.",
  franek: "Ej.",
  zenek: "Myśliwy nie jest zwierzyną.",
  halina: "Jeszcze raz, a zioła same cię zjedzą.",
  zbyszek: "Fałsz. I nie w muzyce.",
  kuba: "Raport z napaści, już piszę.",
  mietek: "Gluty w piwnicy, nie ja.",
  roma: "Cisza w archiwum.",
  ghost: "Nieumarły też się odsuwa.",
  kot: "Miau!",
};
api.NPC_LINE = NPC_LINE;

const NPC_LOSS = {
  bogdan: "Dobra. Jesteś silniejsza, niż wyglądasz. I tyle.",
  wanda: "Młot odkładam. Masz rękę. Nic więcej nie było.",
  zdzich: "Łopata w ziemię. Szacunek. I po sprawie.",
  darek: "Dostawa przyjęta. Ty wygrałaś. Ja idę dalej.",
  hela: "Owce by się wstydziły. Ja też. Koniec.",
  henio: "Kufel na stole. Ty na nogach. Dobra.",
  staszek: "Strach na wróble padł. Nie mów owcom.",
};

api.slideNpc = function slideNpc(e, zone, id, a, dt) {
  if (!a.axed) {
    let cx0 = a.gx - a.x,
      cy0 = a.gy - a.y;
    Math.abs(cx0) >= Math.abs(cy0)
      ? ((a.gy = a.y), (a.fx = Math.sign(cx0) || a.fx || 1), (a.fy = 0))
      : ((a.gx = a.x), (a.fx = 0), (a.fy = Math.sign(cy0) || 1));
    a.axed = 1;
  }
  a.shy -= dt;
  let cx = a.gx - a.x,
    cy = a.gy - a.y;
  if (Math.hypot(cx, cy) < 0.5 || a.shy <= 0) {
    ((a.shy = 0), (a.axed = 0), (a.moving = !1), (a.wait = 0.8));
    return;
  }
  let sp = 28 * dt,
    mx = a.fx ? Math.sign(a.fx) * Math.min(sp, Math.abs(cx)) : 0,
    my = a.fy ? Math.sign(a.fy) * Math.min(sp, Math.abs(cy)) : 0;
  api.Ap(e, zone, a.x + mx, a.y + my, id)
    ? ((a.x += mx), (a.y += my), (a.moving = !0), (a.walk += dt * 0.45))
    : ((a.shy = 0), (a.axed = 0), (a.moving = !1));
};

api.npcYield = function npcYield(e, id, n) {
  ((n.duel = !1),
    (n.lost = !0),
    (n.swing = 0),
    (n.hp = n.maxHp),
    (e.f["beat:" + id] = !0),
    (e.dirty = !0),
    (n.shy = 0.5),
    (n.gx = n.homeX == null ? n.x : n.homeX),
    (n.gy = n.homeY == null ? n.y : n.homeY));
  api.Ne && api.Ne(e, n.x, n.y - 18, NPC_LOSS[id] || "Dobra. Jesteś silniejsza.", "#ffd84a");
  api.G && api.G(e, "chime");
};

api.duelStep = function duelStep(e, id, a, dt) {
  if (!a.duel) return;
  if (e.dead) {
    ((a.duel = !1), (a.swing = 0));
    return;
  }
  ((a.swing = Math.max(0, (a.swing || 0) - dt)), (a.atk = (a.atk || 0) - dt));
  let dx = e.px - a.x,
    dy = e.py - a.y,
    dist = Math.hypot(dx, dy) || 1;
  if ((a.faceT || 0) > 0) a.faceT -= dt;
  else if (!a.fx && !a.fy) {
    Math.abs(dx) >= Math.abs(dy)
      ? ((a.fx = Math.sign(dx) || 1), (a.fy = 0))
      : ((a.fx = 0), (a.fy = Math.sign(dy) || 1));
    a.faceT = 0.35;
  } else if (Math.abs(Math.abs(dx) - Math.abs(dy)) > 10) {
    let wantX = Math.abs(dx) >= Math.abs(dy);
    wantX
      ? ((a.fx = Math.sign(dx) || 1), (a.fy = 0))
      : ((a.fx = 0), (a.fy = Math.sign(dy) || 1));
    a.faceT = 0.45;
  }
  if (dist > 20) {
    let sp = 26 * dt,
      mx = a.fx ? Math.sign(a.fx) * sp : 0,
      my = a.fy ? Math.sign(a.fy) * sp : 0,
      zone = api.Cn(e);
    api.Ap(e, zone, a.x + mx, a.y + my, id)
      ? ((a.x += mx), (a.y += my), (a.moving = !0), (a.walk += dt * 0.45))
      : (a.moving = !1);
    return;
  }
  a.moving = !1;
  if (a.atk <= 0 && a.swing <= 0) {
    a.swing = 0.28;
    a.atk = 0.9;
    let dmg = Math.max(
      1,
      Math.round(1.5 + a.lvl * 0.7 + Math.max(0, a.lvl - (e.lvl || 1)) * 0.35),
    );
    api.Oa && api.Oa(e, dmg, a.x, a.y);
    api.G && api.G(e, "swing");
  }
};

api.duelLine = function duelLine(e, id) {
  if (!e || !e.f || !e.f["beat:" + id] || e.f["beatSaid:" + id]) return "";
  ((e.f["beatSaid:" + id] = !0), (e.dirty = !0));
  return NPC_LOSS[id] || "Dobra. Jesteś silniejsza.";
};

api.pokeWorld = function pokeWorld(e, x, y, rad, dmg, token, fx, fy) {
  if (!e) return !1;
  let hit = !1;
  for (let s of e.flock || []) {
    if (s.dead || s.boop === token) continue;
    if (Math.abs(s.x - x) >= rad + 6 || Math.abs(s.y - y) >= rad + 6) continue;
    s.boop = token;
    hit = !0;
    s.hp = (s.hp == null ? (s.dark ? 10 : 6) : s.hp) - Math.max(1, Math.round(dmg || 1));
    s.flee = 1.6;
    s.wait = 0;
    let ax = Math.sign(s.x - e.px) || -fx || 1,
      ay = Math.sign(s.y - e.py) || -fy || 0;
    if (Math.abs(ax) >= Math.abs(ay)) {
      s.gx = api.Y(Math.max(s.x0, Math.min(s.x1, Math.floor(s.x / api.T) + ax * 3)));
      s.gy = s.y;
      s.fx = ax;
      s.fy = 0;
      s.face = ax;
    } else {
      s.gx = s.x;
      s.gy = api.Y(Math.max(s.y0, Math.min(s.y1, Math.floor(s.y / api.T) + ay * 2)));
      s.fx = 0;
      s.fy = ay || 1;
    }
    if (s.hp <= 0) {
      ((s.dead = !0), (s.fall = 0.45));
      e.coins = (e.coins || 0) + (s.dark ? 3 : 1);
      api.Es && api.Es(e, s.dark ? 8 : 3);
      api.Ne && api.Ne(e, s.x, s.y - 14, "bee...", "#f4f0e4");
      api.G && api.G(e, "kill");
    } else api.Ne && api.Ne(e, s.x, s.y - 14, String(Math.round(dmg || 1)), "#ffffff");
  }
  if (!e.np) return hit;
  let zone = api.Cn ? api.Cn(e) : null;
  for (let id in e.np) {
    let n = e.np[id];
    if (!n || n.hitId === token) continue;
    if (Math.abs(n.x - x) >= rad + 8 || Math.abs(n.y - y) >= rad + 8) continue;
    if (n.duel && (n.inv || 0) > 0) continue;
    n.hitId = token;
    hit = !0;
    let dx = Math.sign(n.x - e.px) || -fx || 1,
      dy = Math.sign(n.y - e.py) || -fy || 0,
      lvl = NPC_FIGHT[id];
    if (lvl && !n.lost && !e.f["beat:" + id]) {
      if (!n.duel) {
        ((n.duel = !0),
          (n.lvl = lvl),
          (n.maxHp = 12 + lvl * 4),
          (n.hp = n.maxHp),
          (n.atk = 0.55),
          (n.swing = 0.28),
          (n.homeX = n.x),
          (n.homeY = n.y));
        api.Ne && api.Ne(e, n.x, n.y - 28, "lvl " + lvl, "#ffd84a");
        api.Ne && api.Ne(e, n.x, n.y - 18, NPC_LINE[id] || "Broń w dłoń.", "#f4ead8");
      }
      ((n.hp -= Math.max(1, Math.round(dmg || 1))), (n.inv = 0.25));
      api.Ne && api.Ne(e, n.x, n.y - 12, String(Math.round(dmg || 1)), "#ffffff");
      n.hp <= 0 && api.npcYield(e, id, n);
    } else {
      ((n.shy = 0.9), (n.gx = n.x + dx * 14), (n.gy = n.y + dy * 10), (n.wait = 0));
      zone &&
        api.Ap &&
        !api.Ap(e, zone, n.gx, n.gy, id) &&
        ((n.gx = n.x + dx * 8), (n.gy = n.y + dy * 6));
      api.Ne && api.Ne(e, n.x, n.y - 18, n.lost ? NPC_LOSS[id] || "Ej." : NPC_LINE[id] || "Ej.", "#f4ead8");
    }
    api.G && api.G(e, "thud");
  }
  return hit;
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
