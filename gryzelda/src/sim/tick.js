// @ts-nocheck
/* Krok symulacji: ruch, pociski, cząsteczki, buffy.
   Nazwy wewnętrzne zostały po minifikacji — logika jest ta sama co w oryginalnej paczce. */
import { api } from "../runtime/api.js";

api.yh = function yh(e, t, n) {
  e.time += n;
  api.clipTick && api.clipTick(e, n);
  for (let l of e.parts)
    ((l.x += l.vx * n),
      (l.y += l.vy * n),
      (l.vy += l.g * n),
      (l.vx *= 0.94),
      (l.vy *= 0.94),
      (l.life -= n));
  e.parts = e.parts.filter((l) => l.life > 0);
  for (let l of e.texts) ((l.y -= 18 * n), (l.life -= n));
  e.texts = e.texts.filter((l) => l.life > 0);
  for (let l of e.bolts) l.life -= n;
  if (
    ((e.bolts = e.bolts.filter((l) => l.life > 0)),
    e.zT > 0 ? (e.zT -= n) : ((e.zt = 1), (e.zfx = -1)),
    (e.zoom += (e.zt - e.zoom) * Math.min(1, n * 5)),
    (e.shake = Math.max(0, e.shake - n * 18)),
    (e.bannerT = Math.max(0, e.bannerT - n)),
    e.hitstop > 0)
  ) {
    e.hitstop -= n;
    return;
  }
  let i = api.Cn(e);
  ((e._qspawn = (e._qspawn || 0) - n), e._qspawn <= 0 && ((e._qspawn = 1.25), api.lh(e)));
  ((e.inv = Math.max(0, e.inv - n)),
    (e.atkCd = Math.max(0, e.atkCd - n)),
    (e.swing = Math.max(0, e.swing - n)),
    (e.dashCd = Math.max(0, e.dashCd - n)),
    (e.skillCd = Math.max(0, e.skillCd - n)),
    (e.msgT = Math.max(0, e.msgT - n)),
    (e.spinT = Math.max(0, e.spinT - n)),
    (e.castT = Math.max(0, e.castT - n)),
    (e.atkT = Math.max(0, e.atkT - n)),
    (e.buf.kawa = Math.max(0, e.buf.kawa - n)),
    (e.buf.ekspres = Math.max(0, e.buf.ekspres - n)),
    (e.buf.magnes = Math.max(0, e.buf.magnes - n)),
    (e.mp = Math.min(
      api.ut(e),
      e.mp + (0.6 + e.st.mnd * 0.25) * (e.spec === "burzowa" ? 1.3 : 1) * n,
    )),
    e.spec === "straz" &&
      e.ward === 0 &&
      ((e.wardT += n),
      e.wardT > 20 &&
        ((e.wardT = 0), (e.ward = 1), api.Ne(e, e.px, e.py - 16, "tarcza", "#9fd8ff"))));
  let a = 0,
    r = 0;
  Math.hypot(t.jx, t.jy) > 0.22
    ? ((a = t.jx), (r = t.jy))
    : ((a = (t.r ? 1 : 0) - (t.l ? 1 : 0)), (r = (t.d ? 1 : 0) - (t.u ? 1 : 0)));
  let s = Math.hypot(a, r);
  (s > 1 && ((a /= s), (r /= s)),
    (e.mvx = a),
    (e.mvy = r),
    s > 0.01 &&
      e.swing <= 0 &&
      e.dashT <= 0 &&
      (Math.abs(a) > Math.abs(r)
        ? ((e.fx = Math.sign(a)), (e.fy = 0))
        : ((e.fx = 0), (e.fy = Math.sign(r)))));
  let u = { x: e.px, y: e.py };
  if (e.dashT > 0)
    ((e.dashT -= n),
      api.Ye(e, u, e.dvx * n, e.dvy * n, 5),
      e.parts.push({
        x: e.px,
        y: e.py,
        vx: 0,
        vy: 0,
        life: 0.2,
        max: 0.2,
        col: "rgba(255,255,255,0.6)",
        s: 3,
        g: 0,
      }));
  else if (s > 0.01) {
    let l = api.Rp(e) * (e.swing > 0 ? 0.55 : 1) * n,
      d = api.Ye(e, u, a * l, r * l, 5);
    d && e.zone === 0 && api.tryNorthGate && api.tryNorthGate(e, u, a, r);
    d && e.zone !== 0 && api.tryGateHint && api.tryGateHint(e, u, a, r);
    if (((e.walk += n * Math.min(1, s)), d && Math.abs(r) > 0.35 && Math.abs(r) >= Math.abs(a))) {
      let v = Math.floor(u.x / api.T),
        g = Math.floor((u.y + (r < 0 ? -6 : 6)) / api.T),
        C = r < 0 ? "d" : "_";
      for (let S of [0, -1, 1])
        if (api.Pe(e, e.zone, v + S, g) === C) {
          let P = (v + S) * api.T + 8 - u.x;
          Math.abs(P) > 0.5 && api.Ye(e, u, Math.sign(P) * Math.min(Math.abs(P), l), 0, 5);
          break;
        }
    }
    if (d) {
      let vert = Math.abs(r) >= Math.abs(a) && Math.abs(r) > 0.35,
        horiz = Math.abs(a) > Math.abs(r) && Math.abs(a) > 0.35,
        v = Math.floor(u.x / api.T),
        gy = Math.floor(u.y / api.T),
        gap = (tx, ty) => {
          let tile = api.Pe(e, e.zone, tx, ty);
          return !api.Qo(e, tile) && !api.Ef(e, tx, ty);
        };
      if (vert) {
        let g = gy + (r < 0 ? -1 : 1);
        for (let S of [0, -1, 1]) {
          let tx = v + S;
          if (!gap(tx, g) || gap(tx - 1, g) || gap(tx + 1, g)) continue;
          let P = tx * api.T + 8 - u.x;
          Math.abs(P) > 0.5 && api.Ye(e, u, Math.sign(P) * Math.min(Math.abs(P), l), 0, 5);
          break;
        }
      } else if (horiz) {
        let gx = v + (a < 0 ? -1 : 1);
        for (let S of [0, -1, 1]) {
          let ty = gy + S;
          if (!gap(gx, ty) || gap(gx, ty - 1) || gap(gx, ty + 1)) continue;
          let P = ty * api.T + 8 - u.y;
          Math.abs(P) > 0.5 && api.Ye(e, u, 0, Math.sign(P) * Math.min(Math.abs(P), l), 5);
          break;
        }
      }
    }
    if (
      (Math.random() < 0.07 &&
        e.parts.push({
          x: e.px + (Math.random() - 0.5) * 6,
          y: e.py + 7,
          vx: 0,
          vy: -6,
          life: 0.35,
          max: 0.35,
          col: "rgba(230,220,190,0.7)",
          s: 1,
          g: 0,
        }),
      d && e.blocks.length)
    ) {
      let v = Math.floor(e.px / api.T),
        g = Math.floor(e.py / api.T),
        C = v + e.fx,
        S = g + e.fy,
        P = e.blocks.find((N) => N.tx === C && N.ty === S);
      if (P) {
        if (((e.pushT += n), e.pushT > (e.f.rekawica ? 0.14 : 0.28))) {
          e.pushT = 0;
          let N = C + e.fx,
            Q = S + e.fy,
            W = api.Pe(e, e.zone, N, Q);
          !api.Qo(e, W) &&
          W !== "S" &&
          W !== "_" &&
          W !== "U" &&
          W !== "d" &&
          !api.Ef(e, N, Q) &&
          !(N === Math.floor(e.px / api.T) && Q === Math.floor(e.py / api.T))
            ? ((P.tx = N),
              (P.ty = Q),
              api.G(e, "push"),
              api.se(e, N * api.T + 8, Q * api.T + 14, "#c9b98a", 8, 30, 0.4),
              api.plateCheck(e, i, N, Q))
            : api.Ne(e, e.px, e.py - 16, "ani drgnie", "#ffffff");
        }
      } else e.pushT = 0;
    } else e.pushT = 0;
  }
  ((e.px = u.x), (e.py = u.y));
  api.noteRiver && api.noteRiver(e);
  let f = Math.floor(e.px / api.T),
    c = Math.floor(e.py / api.T);
  for (let l = -1; l <= 1; l++)
    for (let d = -1; d <= 1; d++)
      e.seen[e.zone + ":" + (Math.floor(f / 8) + d) + ":" + (Math.floor(c / 8) + l)] = !0;
  for (let l of i.exits)
    if (f >= l.x0 && f <= l.x1 && c >= l.y0 && c <= l.y1) {
      if (!api.Gk(e, i, f, c)) continue;
      api.Ks(e, l.to, api.Y(l.tx), api.Y(l.ty));
      return;
    }
  e.shrineCd = Math.max(0, (e.shrineCd || 0) - n);
  let y = api.Pe(e, e.zone, f, c);
  if (
    (y === "H"
      ? e.shrineLock ||
        ((e.shrineLock = !0),
        e.shrineCd > 0
          ? api.ne(
              e,
              "Kapliczka zbiera siły. Jeszcze " + Math.ceil(e.shrineCd) + " s.",
              1.8,
            )
          : ((e.shrineCd = 30),
            (e.cp = { zone: e.zone, x: api.Y(f), y: api.Y(c + 1) }),
            (e.hp = api.Ze(e)),
            (e.mp = api.ut(e)),
            (e.scarfUsed = !1),
            api.se(e, e.px, e.py, "#7ff7ff", 26, 60, 0.9, -40),
            api.ne(e, "Kapliczka: zdrowie i mana odnowione, postęp zapisany.", 2.6),
            (e.dirty = !0),
            api.G(e, "shrine")))
      : (e.shrineLock = !1),
    e.zone === 4 && y === "S" && !e.f.gate)
  ) {
    let l = i.switches.findIndex((d) => d[0] === f && d[1] === c);
    l >= 0 &&
      (e.sw[l] <= 0 &&
        (api.ne(
          e,
          "Kryszta\u0142 " + (e.sw.filter((d) => d > 0).length + 1) + "/3 \u015Bwieci! Szybko!",
          1.6,
        ),
        api.se(e, e.px, e.py, "#7ff7ff", 12, 50, 0.4),
        api.G(e, "chime")),
      (e.sw[l] = 12));
  }
  ((e.sw = e.sw.map((l) => Math.max(0, l - n))),
    e.zone === 4 &&
      !e.f.gate &&
      e.sw.every((l) => l > 0) &&
      ((e.f.gate = !0),
      (e.dirty = !0),
      (e.layerDirty = !0),
      api.ne(e, "Krata si\u0119 otwiera! Zg\u0142oszenie przyj\u0119te do realizacji.", 3),
      api.Ct(e, 1.4, 1.3, 28 * api.T, 2 * api.T),
      api.Bt(e, 3),
      api.G(e, "lever")),
    e.zone === 4 &&
      !e.f.door &&
      f >= 36 &&
      f <= 37 &&
      (c === 19 || c === 20) &&
      (e.f.key
        ? ((e.f.door = !0),
          (e.dirty = !0),
          (e.layerDirty = !0),
          api.ne(e, "Klik! Klucz Eskalacji otworzy\u0142 drzwi.", 2.5),
          api.se(e, 38 * api.T + 8, 20 * api.T, "#ffd84a", 20, 60, 0.6),
          api.G(e, "lever"))
        : e.msgT <= 0 && api.ne(e, "Zamkni\u0119te na Klucz Eskalacji.", 2.2)),
    e.zone === 0 &&
      !e.f.seal &&
      c <= 3 &&
      f >= 22 &&
      f <= 27 &&
      e.msgT <= 0 &&
      api.ne(
        e,
        "Brama z odciskiem piecz\u0119ci. Potrzebna Piecz\u0119\u0107 z Lasu Szept\xF3w.",
        2.5,
      ),
    e.zone === 2 &&
      c <= 7 &&
      f >= 25 &&
      f <= 30 &&
      !e.cut["2:27:4"] &&
      e.msgT <= 0 &&
      api.ne(
        e,
        e.skills.fire
          ? "Kolczaste zaro\u015Bla. Spr\xF3buj Kuli Ognia (umiej\u0119tno\u015B\u0107)."
          : api.Tp(e, "halina")
            ? "Kolczaste zaro\u015Bla. Zwyk\u0142y atak nie da rady... Halina wspomina\u0142a o ogniu."
            : "Kolczaste zaro\u015Bla. Zwyk\u0142y atak nie da rady. Mo\u017Ce kto\u015B w tym lesie zna na nie spos\xF3b?",
        2.6,
      ),
    api.ah(e, n),
    (e.near = null));
  let w = 30;
  for (let l of i.npcs) {
    if (l.id === "kot" && e.f.cat) continue;
    let d = api.Af(e, l),
      v = Math.hypot(d.x - e.px, d.y - e.py);
    v < w && ((w = v), (e.near = { kind: "npc", id: l.id }));
  }
  for (let l of i.levers) {
    if (e.f[l.flag]) continue;
    let d = Math.hypot(api.Y(l.tx) - e.px, api.Y(l.ty) - e.py);
    d < w && ((w = d), (e.near = { kind: "lever", id: l.flag }));
  }
  for (let l of i.toggles || []) {
    let d = Math.hypot(api.Y(l.tx) - e.px, api.Y(l.ty) - e.py);
    d < w && ((w = d), (e.near = { kind: "toggle", id: l.tx + ":" + l.ty }));
  }
  if (t.talk)
    if (((t.talk = !1), e.near && e.near.kind === "npc"))
      if (e.near.id === "kot")
        ((e.f.cat = !0),
          (e.dirty = !0),
          api.ne(e, "Mruczek: Miau! (pobieg\u0142 prosto do Babci Jadzi)", 3),
          api.se(e, e.px, e.py, "#ffb0d0", 14, 40, 0.6),
          api.G(e, "chime"));
      else {
        e.req = e.near.id;
        return;
      }
    else if (e.near && e.near.kind === "lever") {
      let l = i.levers.find((d) => d.flag === (e.near ? e.near.id : ""));
      l && api.Vp(e, l.tx, l.ty);
    } else if (e.near && e.near.kind === "toggle") api.flipToggle(e, e.near.id);
    else if (!e.near) {
      let puzzle = api.clipBlockedByPuzzle ? api.clipBlockedByPuzzle(e) : e.blocks.length > 0;
      puzzle && api.$p(e);
    }
  if (
    (e.zone === 4 &&
      !e.f.plate &&
      !e.cut["hint:block"] &&
      api.up(e) &&
      ((e.cut["hint:block"] = !0),
      api.ne(
        e,
        "Blok utkn\u0105\u0142? Naci\u015Bnij E (M\xF3w) w tej sali albo u\u017Cyj \u201EPrzywr\xF3\u0107 blok\u201D w menu Dziennik.",
        4,
      )),
    t.swap)
  ) {
    t.swap = !1;
    let l = e.weapons.indexOf(e.weapon);
    ((e.weapon = e.weapons[(l + 1) % e.weapons.length]),
      api.Ne(e, e.px, e.py - 18, api.jn[e.weapon].name, "#ffffff"),
      api.G(e, "swap"));
  }
  (t.potHp && ((t.potHp = !1), api.Pp(e)), t.potMp && ((t.potMp = !1), api.Cp(e)));
  {
    let l = e.weapon,
      d =
        l === "miecz" || l === "eskalacja" || l === "zaglada"
          ? e.skills.fury > 0
          : l === "luk" || l === "kusza" || l === "iskry" || l === "burza"
            ? e.skills.seria > 0
            : !1;
    if ((t.atk || (t.atkHeld && d)) && e.atkCd <= 0) {
      let g = api._k(e);
      (t.atkHeld &&
        d &&
        e.skills.seria >= 2 &&
        (l === "luk" || l === "kusza" || l === "iskry" || l === "burza") &&
        (g *= 0.9),
        (e.atkCd = g));
      let C = e.weapon;
      if (
        ((e.atkMax = e.atkT =
          C === "miecz" || C === "eskalacja" ? 0.22 : C === "zaglada" ? 0.3 : C === "kusza" ? 0.3 : 0.26),
        C === "miecz" || C === "eskalacja" || C === "zaglada")
      )
        ((e.swing = C === "zaglada" ? 0.3 : 0.22), e.swingId++, api.G(e, "swing"));
      else if (C === "spinacz")
        ((e.swing = 0.18), e.swingId++, api.clipUse && api.clipUse(e));
      else if (C === "luk") {
        let S = api.Zi(e, 140);
        ((e.castT = 0.15),
          e.pshots.push({
            x: e.px + S.x * 6,
            y: e.py - 2 + S.y * 6,
            vx: S.x * 220,
            vy: S.y * 220,
            dmg: api.Mi(e, C),
            kind: "arrow",
            life: 0.75,
            pierce: e.st.dex >= 6 ? 1 : 0,
            dead: !1,
            hits: [],
          }),
          api.G(e, "bow"));
      } else if (C === "kusza") {
        let S = api.Zi(e, 160);
        ((e.castT = 0.2),
          e.pshots.push({
            x: e.px + S.x * 6,
            y: e.py - 2 + S.y * 6,
            vx: S.x * 280,
            vy: S.y * 280,
            dmg: api.Mi(e, C),
            kind: "quarrel",
            life: 0.8,
            pierce: 2,
            dead: !1,
            hits: [],
          }),
          api.G(e, "xbow"),
          api.Bt(e, 1));
      } else if (C === "iskry") {
        let S = api.Zi(e, 130);
        ((e.castT = 0.15),
          e.mp >= 1.5
            ? ((e.mp -= 1.5),
              e.pshots.push({
                x: e.px + S.x * 6,
                y: e.py - 2 + S.y * 6,
                vx: S.x * 150,
                vy: S.y * 150,
                dmg: api.Mi(e, C),
                kind: "bolt",
                life: 1.1,
                pierce: e.spec === "burzowa" ? 1 : 0,
                dead: !1,
                hits: [],
              }),
              api.G(e, "magic"))
            : (e.pshots.push({
                x: e.px + S.x * 6,
                y: e.py - 2 + S.y * 6,
                vx: S.x * 120,
                vy: S.y * 120,
                dmg: 1,
                kind: "spark",
                life: 0.35,
                pierce: 0,
                dead: !1,
                hits: [],
              }),
              api.G(e, "spark")));
      } else
        e.mp >= 3
          ? ((e.mp -= 3), (e.castT = 0.2), api.mh(e, api.Mi(e, C)))
          : (api.Ne(e, e.px, e.py - 16, "brak many", "#7fa8ff"), (e.atkCd = 0.3));
    }
  }
  if (((t.atk = !1), t.dash))
    if (((t.dash = !1), e.skills.dash > 0 && e.dashCd <= 0)) {
      let l = a,
        d = r;
      Math.hypot(l, d) < 0.2 && ((l = e.fx), (d = e.fy));
      let v = Math.hypot(l, d) || 1;
      ((e.dvx = (l / v) * 250),
        (e.dvy = (d / v) * 250),
        (e.dashT = 0.17),
        (e.dashCd = (e.skills.dash >= 2 ? 0.6 : 1) * (e.spec === "trop" ? 0.6 : 1)),
        api.se(e, e.px, e.py, "#ffffff", 8, 40, 0.3),
        api.G(e, "dash"));
    } else e.skills.dash || api.Ne(e, e.px, e.py - 16, "Doskok: Bogdan", "#ffffff");
  if (t.skill) {
    t.skill = !1;
    let l = e.active;
    if (l && e.skills[l] > 0 && e.skillCd <= 0) {
      let d = api.Tf(e, l);
      if (e.mp < d) api.Ne(e, e.px, e.py - 16, "brak many", "#7fa8ff");
      else {
        ((e.mp -= d), (e.skillCd = 0.6));
        let v = e.skills[l],
          g = api.Nk(e, l);
        if (l === "spin") {
          ((e.spinT = 0.3), e.swingId++, api.G(e, "spin"));
          let C =
            (2 + e.st.str * 0.6 + (e.look.cls === "war" ? 1 : 0)) *
            (1 + 0.4 * (v - 1)) *
            (e.buf.ekspres > 0 ? 2 : 1);
          for (let S of e.enemies)
            if (S.alive && Math.hypot(S.x - e.px, S.y - e.py) < 34) {
              let P = Math.hypot(S.x - e.px, S.y - e.py) || 1;
              api.gi(e, S, C, (S.x - e.px) / P, (S.y - e.py) / P);
            }
          e.boss && !e.f.boss && Math.hypot(e.boss.x - e.px, e.boss.y - e.py) < 42 && api.Ps(e, C);
          for (let S of e.eshots) Math.hypot(S.x - e.px, S.y - e.py) < 36 && api.fp(e, S);
          (api.lp(e, e.px, e.py, 22, !1),
            api.se(e, e.px, e.py, "#e8e8f4", 20, 90, 0.35),
            api.Bt(e, 2));
        } else if (l === "fire") {
          let C = api.Zi(e, 150);
          ((e.castT = 0.2),
            api.G(e, "fire"),
            e.pshots.push({
              x: e.px + C.x * 6,
              y: e.py - 2 + C.y * 6,
              vx: C.x * 150,
              vy: C.y * 150,
              dmg:
                (3 + e.st.mnd * 0.8) *
                (1 + 0.35 * (v - 1)) *
                (e.spec === "piro" ? 1.5 : 1) *
                (e.buf.ekspres > 0 ? 2 : 1),
              kind: "fire",
              life: 1.2,
              pierce: 0,
              dead: !1,
              hits: [],
            }));
        } else if (l === "ward")
          ((e.ward = Math.max(e.ward, v)),
            api.se(e, e.px, e.py, "#9fd8ff", 20, 50, 0.5),
            api.ne(e, "Tarcza Cierpliwo\u015Bci aktywna.", 1.5),
            api.G(e, "block"));
        else if (l === "bash") {
          ((e.swing = 0.25), e.swingId++, api.G(e, "thud"), api.Bt(e, 3));
          let C = (2.5 + e.st.str * 0.7) * (1 + 0.35 * (v - 1)) * g;
          for (let S of e.enemies)
            if (S.alive && Math.hypot(S.x - e.px, S.y - e.py) < 28) {
              let P = Math.hypot(S.x - e.px, S.y - e.py) || 1;
              (api.gi(e, S, C, (S.x - e.px) / P, (S.y - e.py) / P),
                (S.poise = g < 1 ? S.poise * 0.5 : 0),
                (S.vx = ((S.x - e.px) / P) * (50 + v * 10) * g),
                (S.vy = ((S.y - e.py) / P) * (50 + v * 10) * g),
                api.Ne(e, S.x, S.y - 18, "og\u0142uszenie", "#ffd84a"));
            }
        } else if (l === "taunt") {
          ((e.ward = Math.max(e.ward, 1)),
            (e.inv = Math.max(e.inv, 0.4)),
            (e.buf.kawa = Math.max(e.buf.kawa, 0.01)));
          for (let C of e.enemies)
            C.alive &&
              Math.hypot(C.x - e.px, C.y - e.py) < 70 &&
              ((C.cd = Math.min(C.cd, 0.2)),
              (C.vx = (e.px - C.x) * 0.4),
              (C.vy = (e.py - C.y) * 0.4));
          (api.ne(e, "Prowokacja! Wrogowie na Ciebie patrz\u0105.", 1.6),
            api.se(e, e.px, e.py, "#ff9a3c", 18, 60, 0.4),
            api.G(e, "boss"),
            (e.inv = Math.max(e.inv, (0.8 + v * 0.3) * g)));
        } else if (l === "trap")
          (e.items.push({
            kind: "trap",
            x: e.px + e.fx * 18,
            y: e.py + e.fy * 18,
            v: (3 + v * 2) * g,
            id: "trap" + e.time,
            taken: !1,
          }),
            api.ne(e, "Pu\u0142apka ticketowa uzbrojona.", 1.4),
            api.G(e, "lever"));
        else if (l === "multi") {
          let C = v >= 2 ? 5 : 3,
            S = api.Zi(e, 150);
          ((e.castT = 0.2), api.G(e, "bow"));
          for (let P = 0; P < C; P++) {
            let N = (P - (C - 1) / 2) * 0.18,
              Q = Math.cos(N),
              W = Math.sin(N),
              _ = S.x * Q - S.y * W,
              ie = S.x * W + S.y * Q;
            e.pshots.push({
              x: e.px + _ * 6,
              y: e.py - 2 + ie * 6,
              vx: _ * 210,
              vy: ie * 210,
              dmg: api.Mi(e, "luk") * 0.7 * g,
              kind: "arrow",
              life: 0.7,
              pierce: 0,
              dead: !1,
              hits: [],
            });
          }
        } else if (l === "roll") {
          let C = e.fx,
            S = e.fy,
            P = Math.hypot(C, S) || 1;
          ((e.dvx = (C / P) * 220),
            (e.dvy = (S / P) * 220),
            (e.dashT = 0.12 * g),
            (e.dashCd = Math.max(e.dashCd, 0.5)),
            api.se(e, e.px, e.py, "#ffffff", 6, 30, 0.25),
            api.G(e, "dash"));
        } else if (l === "blink") {
          let C = (48 + v * 16) * g,
            S = { x: e.px, y: e.py },
            P = 4,
            N = Math.max(1, Math.round(C / P));
          for (let _ = 0; _ < N && !api.Ye(e, S, e.fx * P, e.fy * P, 5); _++);
          let Q = Math.floor(S.x / api.T),
            W = Math.floor(S.y / api.T);
          if (api.Cn(e).exits.some((_) => Q >= _.x0 && Q <= _.x1 && W >= _.y0 && W <= _.y1)) {
            ((S.x = e.px), (S.y = e.py));
            for (let _ = 0; _ < N; _++) {
              let ie = S.x + e.fx * P,
                ze = S.y + e.fy * P,
                ke = Math.floor(ie / api.T),
                le = Math.floor(ze / api.T);
              if (
                api
                  .Cn(e)
                  .exits.some((ve) => ke >= ve.x0 && ke <= ve.x1 && le >= ve.y0 && le <= ve.y1) ||
                api.Ye(e, S, e.fx * P, e.fy * P, 5)
              )
                break;
            }
          }
          ((e.px = S.x),
            (e.py = S.y),
            (e.inv = Math.max(e.inv, 0.35)),
            api.se(e, e.px, e.py, "#c49bff", 20, 70, 0.5),
            api.G(e, "magic"));
        } else if (l === "frost") {
          let C = api.Zi(e, 120);
          (api.G(e, "magic"), (e.castT = 0.2));
          for (let S of e.enemies)
            if (S.alive) {
              let P = S.x - e.px,
                N = S.y - e.py,
                Q = Math.hypot(P, N) || 1,
                W = (P * C.x + N * C.y) / Q;
              Q < 70 &&
                W > 0.4 &&
                (api.gi(e, S, (2 + e.st.mnd * 0.5) * (1 + 0.3 * (v - 1)) * g, 0, 0),
                (S.vx *= g < 1 ? 0.65 : 0.3),
                (S.vy *= g < 1 ? 0.65 : 0.3),
                (S.cd = Math.max(S.cd, 0.8 * g)),
                api.Ne(e, S.x, S.y - 16, "mr\xF3z", "#7ff7ff"));
            }
          api.se(e, e.px + C.x * 20, e.py + C.y * 20, "#7ff7ff", 24, 80, 0.45);
        } else
          l === "barrier" &&
            ((e.ward = Math.max(e.ward, g < 1 ? 1 : 1 + (v >= 2 ? 1 : 0))),
            (e.mp = Math.min(api.ut(e), e.mp + 2 * g)),
            api.se(e, e.px, e.py, "#9fd8ff", 28, 60, 0.6),
            api.ne(e, "Bariera kolejkowa!", 1.4),
            api.G(e, "block"));
      }
    } else l || api.Ne(e, e.px, e.py - 16, "brak umiej\u0119tno\u015Bci", "#ffffff");
  }
  let b = e.swing > 0.07,
    x = e.px + e.fx * (e.weapon === "zaglada" ? 16 : 13),
    M = e.py - 2 + e.fy * (e.weapon === "zaglada" ? 16 : 13),
    j = e.weapon === "zaglada" ? 15 : 11;
  if (b) {
    let l = api.Mi(e, e.weapon === "zaglada" || e.weapon === "eskalacja" ? e.weapon : "miecz");
    for (let d of e.enemies)
      d.alive &&
        d.hitId !== e.swingId &&
        Math.abs(d.x - x) < j + 6 &&
        Math.abs(d.y - M) < j + 6 &&
        ((d.hitId = e.swingId), api.gi(e, d, l, e.fx, e.fy));
    e.boss &&
      !e.f.boss &&
      e.boss.hitId !== e.swingId &&
      Math.abs(e.boss.x - x) < j + 14 &&
      Math.abs(e.boss.y - M) < j + 14 &&
      ((e.boss.hitId = e.swingId), api.Ps(e, l));
    for (let d of e.eshots)
      !d.dead && Math.abs(d.x - x) < j + 4 && Math.abs(d.y - M) < j + 4 && api.fp(e, d);
    e.swing > 0.2 && api.lp(e, x, M, 5, !1);
    api.pokeWorld && api.pokeWorld(e, x, M, j, l, e.swingId, e.fx, e.fy);
  }
  for (let l of e.items)
    if (!(l.kind !== "trap" || l.taken)) {
      l.v -= n;
      for (let d of e.enemies)
        if (d.alive && Math.hypot(d.x - l.x, d.y - l.y) < 14) {
          (api.gi(e, d, 2 + e.st.dex * 0.3, 0, 0),
            (d.vx *= 0.2),
            (d.vy *= 0.2),
            (l.taken = !0),
            api.se(e, l.x, l.y, "#ffd84a", 12, 50, 0.35),
            api.G(e, "boom"));
          break;
        }
      l.v <= 0 && (l.taken = !0);
    }
  for (let l of e.items) {
    if (l.taken || (l.kind === "klucz" && !e.f.gate)) continue;
    let d = l.kind === "coin" ? (e.buf.magnes > 0 ? 130 : 28) : 0,
      v = e.px - l.x,
      g = e.py - l.y,
      C = Math.hypot(v, g);
    if (
      (d && C < d && C > 1 && ((l.x += (v / C) * 150 * n), (l.y += (g / C) * 150 * n)),
      l.kind !== "trap" && !(C >= 12))
    ) {
      if (l.kind === "crystal") {
        (e.f.rootTok && e.f.won && !e.f.root
          ? ((e.f.root = !0),
            (e.win = !0),
            (e.dirty = !0),
            (e.coins += 100),
            api.ne(e, "Kryszta\u0142 Odpowiedzi: ROOT OK. Kolejka rozwi\u0105zana. Na zawsze. Premia za zamkni\u0119cie zg\u0142oszenia: +100 groszy.", 4),
            api.G(e, "win"),
            api.se(e, l.x, l.y, "#6adf6a", 50, 120, 1))
          : e.f.won || ((e.f.won = !0), (e.win = !0), (e.dirty = !0), api.G(e, "win")),
          (l.taken = !0));
        continue;
      }
      switch (((l.taken = !0), l.id && (e.cut["item:" + l.id] = !0), l.kind)) {
        case "coin":
          ((e.coins += l.v || 1), api.se(e, l.x, l.y, "#ffd84a", 4, 30, 0.3), api.G(e, "coin"));
          break;
        case "heart":
          ((e.hp = Math.min(api.Ze(e), e.hp + (l.v || 3))),
            api.Ne(e, e.px, e.py - 16, "+" + (l.v || 3), "#ff8fa3"),
            api.G(e, "heal"));
          break;
        case "klucz":
          ((e.f.key = !0),
            (e.dirty = !0),
            api.ne(e, "Klucz Eskalacji! Drzwi na wschodzie holu czekaj\u0105.", 3),
            api.Ct(e, 1.25, 0.7),
            api.G(e, "item"));
          break;
        case "seal":
          ((e.f.seal = !0),
            (e.dirty = !0),
            api.ne(e, "Piecz\u0119\u0107 Lasu! Przy\u0142\xF3\u017C j\u0105 do p\xF3\u0142nocnej bramy Wioski.", 3.5),
            api.se(e, l.x, l.y, "#7ff7ff", 30, 80, 0.8),
            api.Ct(e, 1.3, 1),
            api.G(e, "item"));
          break;
        case "manifest":
          ((e.f.westKey = !0),
            (e.dirty = !0),
            api.ne(
              e,
              e.f.westQ
                ? "Manifest Paczek! Piotr w Wiosce b\u0119dzie wniebowzi\u0119ty."
                : "Manifest Paczek! Kto\u015B na poczcie w Wiosce na pewno go szuka.",
              3.5,
            ),
            api.se(e, l.x, l.y, "#ffd84a", 30, 80, 0.8),
            api.G(e, "item"));
          break;
        case "badge":
          ((e.f.southKey = !0),
            (e.dirty = !0),
            api.ne(
              e,
              e.f.southQ
                ? "Odznaka Eskalacji! Basia czeka na po\u0142udniu Wioski."
                : "Odznaka Eskalacji. Ci\u0119\u017Cka od cudzych zg\u0142osze\u0144. Kto\u015B w Wiosce pewnie za ni\u0105 t\u0119skni.",
              3.5,
            ),
            api.se(e, l.x, l.y, "#c49bff", 30, 80, 0.8),
            api.G(e, "item"));
          break;
        case "root":
          ((e.f.rootTok = !0),
            (e.dirty = !0),
            e.weapons.indexOf("eskalacja") < 0 && e.weapons.push("eskalacja"),
            api.ne(
              e,
              "Token Root Access + Ostrze Eskalacji! Wr\xF3\u0107 do Kryszta\u0142u w Serwerowni.",
              3.8,
            ),
            api.se(e, l.x, l.y, "#6adf6a", 36, 90, 0.9),
            api.G(e, "item"));
          break;
        case "grzyb":
          ((e.dirty = !0),
            api.ne(e, "\u015Awiec\u0105cy grzyb (" + api.Ns(e) + "/6). Halina potrzebuje 5.", 2),
            api.G(e, "coin"));
          break;
        case "kawa": {
          let S = api.bt(e, "kawa");
          ((e.buf.kawa = S),
            api.ne(e, "Kawa! Szybko\u015B\u0107 +40% przez " + S + " s.", 2),
            api.G(e, "power"));
          break;
        }
        case "ekspres": {
          let S = api.bt(e, "ekspres");
          ((e.buf.ekspres = S),
            api.ne(e, "Ekspres Priorytetowy! Podw\xF3jne obra\u017Cenia przez " + S + " s.", 2.2),
            api.G(e, "power"));
          break;
        }
        case "magnes": {
          let S = api.bt(e, "magnes");
          ((e.buf.magnes = S),
            api.ne(e, "Magnes na grosze przez " + S + " s.", 2),
            api.G(e, "power"));
          break;
        }
        case "lutnia":
          ((e.f.luteFound = !0),
            (e.dirty = !0),
            api.ne(e, "Lutnia Zbyszka! Lekko rozstrojona. Odnie\u015B j\u0105 do karczmy.", 3.2),
            api.G(e, "item"));
          break;
        case "qi": {
          api.rh(e, l.id);
          break;
        }
        case "zebatka":
          ((e.f.gearFound = !0),
            (e.dirty = !0),
            api.ne(
              e,
              "Zębatka z wiatraka! Horacy w wieży na nią czeka.",
              3.2,
            ),
            api.G(e, "item"));
          break;
        case "banka":
          ((e.ward = Math.min(3, e.ward + 1)),
            api.ne(e, "Ba\u0144ka ochronna: poch\u0142onie jedno trafienie.", 2),
            api.G(e, "power"));
          break;
        default:
          api.pickExtra && api.pickExtra(e, l);
      }
      api.se(e, l.x, l.y, "#ffffff", 6, 40, 0.4);
    }
  }
  e.items = e.items.filter((l) => !l.taken);
  for (let l of i.chests) {
    let d = "chest:" + l.id;
    e.cut[d] ||
      (Math.hypot(api.Y(l.tx) - e.px, api.Y(l.ty) - e.py) < 14 &&
        ((e.cut[d] = !0),
        (e.dirty = !0),
        api.G(e, "chest"),
        api.se(e, api.Y(l.tx), api.Y(l.ty), "#ffd84a", 40, 90, 0.9),
        api.Ct(e, 1.3, 1, api.Y(l.tx), api.Y(l.ty)),
        l.id === "cache" &&
          ((e.coins += 12),
          (e.buf.ekspres = api.bt(e, "ekspres")),
          api.ne(
            e,
            "Sekret! Babcine oszcz\u0119dno\u015Bci: 12 groszy i Ekspres Priorytetowy.",
            3.5,
          )),
        l.id === "mana" &&
          ((e.bonusMp += 4),
          (e.mp = api.ut(e)),
          (e.coins += 10),
          api.ne(e, "Kryszta\u0142 Many: +4 maks. many na sta\u0142e, 10 groszy!", 3.5)),
        l.id === "serce" &&
          ((e.bonusHp += 4),
          (e.pts += 2),
          (e.coins += 20),
          (e.hp = api.Ze(e)),
          api.ne(
            e,
            "Serce Wytrwa\u0142o\u015Bci: +4 zdrowia na sta\u0142e, +2 punkty, 20 groszy!",
            4,
          )),
        l.id === "kusza" &&
          (e.weapons.indexOf("kusza") < 0 && e.weapons.push("kusza"),
          (e.coins += 15),
          api.ne(e, "Kusza! Zmie\u0144 bro\u0144 przyciskiem Bro\u0144 (Q). +15 groszy.", 4)),
          l.id === "arch1" &&
            ((e.bonusHp += 4),
            (e.hp = api.Ze(e)),
            (e.coins += 40),
            (e.pts += 2),
            api.ne(e, "Akta ostateczne: +4 zdrowia, +2 punkty, 40 groszy.", 3.6)),
          l.id === "nowe_przystan" &&
            ((e.bonusHp += 3),
            (e.hp = api.Ze(e)),
            (e.coins += 30),
            api.ne(e, "Skrzynia przewo\u017Anika: kamizelka ratunkowa z napisem \u201ENIE DOTYCZY\u201D. +3 zdrowia na sta\u0142e, 30 groszy.", 4)),
          l.id === "nowe_wladek" &&
            ((e.pts += 2),
            (e.coins += 20),
            api.ne(e, "Skrzynia W\u0142adka: zg\u0142oszenie nr 1, oprawione w ramk\u0119. Status: w analizie. +2 punkty rozwoju, 20 groszy.", 4)),
          l.id === "nowe_owczarnia" &&
            ((e.coins += 35),
            api.ne(e, "Skrzynia w owczarni: no\u017Cyce, we\u0142na i 35 groszy. Owce udaj\u0105, \u017Ce nic nie widzia\u0142y.", 3.5)),
          (api.openChest(e, l) || 1) ||
          (l.id === "westcache" ||
          l.id === "depot" ||
          l.id === "swamp" ||
          l.id === "undead1" ||
          l.id === "crypt" ||
          l.id === "home1" ||
          l.id === "home2" ||
          l.id === "home3" ||
          l.id === "mill1" ||
          l.id === "hut1" ||
          l.id.indexOf("oak") === 0 ||
          l.id === "act3cache" ||
          l.id === "grave1" ||
          l.id === "spamf" ||
          l.id === "firew" ||
          l.id === "ante" ||
          l.id === "clock1" ||
          l.id === "aptek" ||
          l.id === "labiga" ||
          l.id === "jadziacell" ||
          l.id === "piotratt" ||
          l.id === "millloft" ||
          l.id === "hutroot" ||
          l.id === "hamcache" ||
          l.id === "wicek1" ||
          l.id === "genhome" ||
          l.id === "past1" ||
          l.id === "wagac" ||
          l.id === "basloft" ||
          l.id === "milltop" ||
          l.id === "easloft" ||
          l.id.indexOf("crypt") === 0) &&
          ((e.coins += 25),
          (e.pts += 1),
          api.ne(e, "Skrzynia! +25 groszy i 1 punkt rozwoju.", 3))));
  }
  let D = e.boss;
  api.aiPre && api.aiPre(e, n);
  for (let l of e.enemies) {
    if (!l.alive) continue;
    if (l.pinT > 0) {
      l.pinT -= n;
      l.vx = 0;
      l.vy = 0;
      continue;
    }
    if (e.god && e.god.veil) {
      l.inv = Math.max(0, l.inv - n);
      continue;
    }
    let d = e.px - l.x,
      v = e.py - l.y,
      g = Math.hypot(d, v) || 1;
    if (
      g > 230 &&
      l.kind !== "king" &&
      l.kind !== "golem" &&
      l.kind !== "phantom" &&
      l.kind !== "lich" &&
      l.kind !== "audit" &&
      l.kind !== "morok" &&
      l.kind !== "stamper" &&
      l.kind !== "reklamator"
    )
      continue;
    if (
      ((l.inv = Math.max(0, l.inv - n)),
      (l.t += n),
      l.poise < l.poiseMax && (l.poise = Math.min(l.poiseMax, l.poise + n * 4)),
      l.kind !== "king" &&
        l.kind !== "golem" &&
        l.kind !== "phantom" &&
        l.kind !== "lich" &&
        l.kind !== "audit" &&
        l.kind !== "morok" &&
        l.kind !== "stamper" &&
        l.kind !== "reklamator" &&
        l.kind !== "nest" &&
        l.kind !== "charger" &&
        l.inv > 0.08)
    )
      (api.Ye(e, l, l.vx * n, l.vy * n, 5), (l.vx *= 0.85), (l.vy *= 0.85));
    else if (l.kind === "slime" || l.kind === "gold") {
      if (l.t > 1.2) {
        l.t = 0;
        let P = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
            [0, 0],
          ][Math.floor(Math.random() * 5)],
          N = l.kind === "gold" ? 50 : 26;
        ((l.vx = P[0] * N),
          (l.vy = P[1] * N),
          l.kind === "slime" &&
            g < 80 &&
            Math.random() < 0.6 &&
            ((l.vx = (d / g) * 32), (l.vy = (v / g) * 32)),
          l.kind === "gold" && g < 80 && ((l.vx = -(d / g) * 55), (l.vy = -(v / g) * 55)));
      }
      api.Ye(e, l, l.vx * n, l.vy * n, 5) && ((l.vx = -l.vx), (l.vy = -l.vy));
    } else if (l.kind === "bat")
      (g < 110
        ? ((l.vx = (d / g) * 38 + Math.cos(l.t * 5) * 26),
          (l.vy = (v / g) * 38 + Math.sin(l.t * 6) * 26))
        : ((l.vx = Math.cos(l.t) * 15), (l.vy = Math.sin(l.t * 1.3) * 15)),
        api.Ye(e, l, l.vx * n, l.vy * n, 4));
    else if (l.kind === "spam") {
      if (l.t > 1.6) {
        l.t = 0;
        let P = Math.random() * Math.PI * 2;
        ((l.vx = Math.cos(P) * 14), (l.vy = Math.sin(P) * 14));
      }
      if ((api.Ye(e, l, l.vx * n, l.vy * n, 5), api.aiRanged(e, l, n), (l.cd -= n), l.cd <= 0 && g < 140)) {
        let P = e.zone === 4 || e.zone === 5;
        l.cd = P ? 2.7 : 2.3;
        let N = Math.atan2(v, d);
        for (let Q of P ? [-0.28, 0, 0.28] : [0])
          e.eshots.push({
            x: l.x,
            y: l.y,
            vx: Math.cos(N + Q) * 72,
            vy: Math.sin(N + Q) * 72,
            kind: "spam",
            dead: !1,
          });
        api.G(e, "eshot");
      }
    } else if (l.kind === "nest")
      ((l.cd -= n),
        l.cd <= 0 &&
          g < 150 &&
          e.enemies.filter((P) => P.alive).length < 14 &&
          ((l.cd = 5),
          e.enemies.push(api.Pi(e, "slime", l.x + (Math.random() - 0.5) * 20, l.y + 14)),
          api.se(e, l.x, l.y, "#ffffff", 8, 40, 0.4)));
    else if (
      l.kind === "king" ||
      l.kind === "golem" ||
      l.kind === "phantom" ||
      l.kind === "lich" ||
      l.kind === "audit" ||
      l.kind === "stamper" ||
      l.kind === "reklamator"
    ) {
      (l.kind === "reklamator" || l.kind === "stamper") && api.bossExtra && api.bossExtra(e, l, n, g);
      if (!l.intro && g < 160)
        ((l.intro = !0), api.Ct(e, 1.5, 1.8, l.x, l.y), api.G(e, "boss"));
      if (g > 220) continue;
      l.cd -= n;
      let P = l.kind === "lich" || l.kind === "audit" || l.kind === "reklamator",
        N = l.kind === "phantom",
        Q = l.kind !== "king";
      if (P && !l.split && l.hp <= l.maxHp * 0.66) {
        ((l.split = !0),
          api.ne(
            e,
            l.kind === "audit"
              ? "AUDYT-BOT: FAZA 2 \u2014 niezgodno\u015B\u0107 w aktach!"
              : l.kind === "reklamator"
                ? "Kierownik Reklamacji: FAZA 2 \u2014 wzywam rzeczoznawc\xF3w! Uwaga na pieczątki z sufitu!"
                : e.zone === 25
                ? "Kozacki Root: FAZA 2!"
                : "Lichwa Lidia: FAZA 2!",
            2.6,
          ));
        for (let _ = 0; _ < (e.zone === 25 ? 3 : 2); _++)
          e.enemies.push(api.Pi(e, l.kind === "reklamator" ? "ticket" : "zombie", l.x + (_ - 1) * 18, l.y + 12));
        (api.se(e, l.x, l.y, "#6adf6a", 28, 90, 0.7), api.Bt(e, 6), api.G(e, "boom"));
      }
      if (P && l.split && l.hp <= l.maxHp * 0.33 && l.hitId !== -99) {
        ((l.hitId = -99),
          api.ne(
            e,
            l.kind === "audit"
              ? "AUDYT-BOT: FAZA 3 \u2014 paragrafy ostateczne!"
              : l.kind === "reklamator"
                ? "Kierownik Reklamacji: FAZA 3 \u2014 REKLAMACJA ODRZUCONA W CA\u0141O\u015ACI!"
                : e.zone === 25
                ? "Kozacki Root: FAZA 3 \u2014 ROOT RAGE!"
                : "Lichwa: ostatnia eskalacja!",
            2.6,
          ));
        for (let _ = 0; _ < (e.zone === 25 ? 2 : 1); _++)
          e.enemies.push(api.Pi(e, "phone", l.x + (_ ? 16 : -16), l.y));
        ((l.poise = l.poiseMax),
          (l.inv = 0.6),
          api.se(e, l.x, l.y, "#ff4d6d", 36, 110, 0.8),
          api.Bt(e, 8),
          api.G(e, "boom"));
      }
      let W = P && l.hitId === -99;
      if (l.z > 0 || l.vx !== 0 || l.vy !== 0) {
        let _ = N ? 0.5 : W ? 0.4 : 0.6,
          ie = 1 - l.cd / _;
        if (
          ((l.z = Math.sin(api.vt(ie, 0, 1) * Math.PI) * (N ? 28 : 20)),
          api.Ye(e, l, l.vx * n, l.vy * n, Q ? 11 : 9),
          l.cd <= 0 &&
            ((l.vx = 0),
            (l.vy = 0),
            (l.z = 0),
            (l.cd = P ? (W ? 0.7 : 1.1) : 1.3),
            api.Bt(e, Q ? 5 : 4),
            api.G(e, "thud"),
            api.se(
              e,
              l.x,
              l.y + 8,
              P ? "#6adf6a" : N ? "#9b6bd1" : l.kind === "golem" ? "#c9a676" : "#5fe08a",
              22,
              90,
              0.5,
            ),
            Math.hypot(e.px - l.x, e.py - l.y) < (Q ? 34 : 30)))
        ) {
          let ze = api.Ka(e, l.lvl, P ? (W ? 4 : 3) : 2);
          ze > 0 && api.Oa(e, Math.max(1, Math.round(ze)), l.x, l.y);
        }
      } else if (l.cd <= 0 && g < 180)
        if (P && Math.random() < (W ? 0.7 : 0.45)) {
          l.cd = W ? 0.9 : 1.6;
          let _ = Math.atan2(v, d),
            ie = W ? [-0.6, -0.2, 0.2, 0.6] : [-0.4, 0, 0.4];
          for (let ze of ie)
            e.eshots.push({
              x: l.x,
              y: l.y,
              vx: Math.cos(_ + ze) * (W ? 95 : 70),
              vy: Math.sin(_ + ze) * (W ? 95 : 70),
              kind: "ticket",
              dead: !1,
            });
          api.G(e, "eshot");
        } else {
          let _ = N ? 0.5 : 0.6;
          ((l.cd = _), (l.vx = api.vt(d / _, -120, 120)), (l.vy = api.vt(v / _, -120, 120)));
        }
    } else if (l.kind === "ticket") {
      if ((e.falszT || 0) > 0) {
        ((l.vx = (-d / g) * 40), (l.vy = (-v / g) * 40), api.Ye(e, l, l.vx * n, l.vy * n, 5));
      } else {
      if (l.t > 1.4) {
        l.t = 0;
        let P = Math.random() * Math.PI * 2;
        ((l.vx = Math.cos(P) * 18), (l.vy = Math.sin(P) * 18));
      }
      if ((api.Ye(e, l, l.vx * n, l.vy * n, 5), api.aiRanged(e, l, n), (l.cd -= n), l.cd <= 0 && g < 150)) {
        l.cd = 2;
        let P = Math.atan2(v, d);
        (e.eshots.push({
          x: l.x,
          y: l.y,
          vx: Math.cos(P) * 85,
          vy: Math.sin(P) * 85,
          kind: "ticket",
          dead: !1,
        }),
          api.G(e, "eshot"));
      }
      }
    } else if (l.kind === "charger")
      if (((l.cd -= n), l.z > 0)) {
        if ((api.Ye(e, l, l.vx * n, l.vy * n, 6), l.cd <= 0))
          ((l.z = 0), (l.vx = 0), (l.vy = 0), (l.cd = 1.8));
        else if (Math.abs(l.x - e.px) < 10 && Math.abs(l.y - e.py) < 10) {
          let P = api.Ka(e, l.lvl, 2);
          P > 0 && api.Oa(e, Math.max(1, Math.round(P)), l.x, l.y);
        }
      } else
        l.cd <= 0 && g < 130
          ? l.cd > -0.55
            ? ((l.cd = -0.55), (l.z = -1))
            : ((l.z = 1),
              (l.cd = 0.45),
              (l.vx = (d / g) * 210),
              (l.vy = (v / g) * 210),
              api.G(e, "dash"))
          : l.z < 0
            ? ((l.cd += n),
              l.cd >= 0 &&
                ((l.z = 1),
                (l.cd = 0.45),
                (l.vx = (d / g) * 210),
                (l.vy = (v / g) * 210),
                api.G(e, "dash")))
            : api.Ye(e, l, (d / g) * 22 * n, (v / g) * 22 * n, 5);
    else if ((l.kind === "shield" || l.kind === "zombie" || l.kind === "spider" || l.kind === "rat") && api.aiChase(e, l, n));
    else if (l.kind === "shield")
      (g < 120 ? ((l.vx = (d / g) * 28), (l.vy = (v / g) * 28)) : ((l.vx *= 0.9), (l.vy *= 0.9)),
        api.Ye(e, l, l.vx * n, l.vy * n, 6));
    else if (l.kind === "phone") {
      if (l.t > 1.5) {
        l.t = 0;
        let P = Math.random() * Math.PI * 2;
        ((l.vx = Math.cos(P) * 12), (l.vy = Math.sin(P) * 12));
      }
      (api.Ye(e, l, l.vx * n, l.vy * n, 5),
        api.aiRanged(e, l, n),
        (l.cd -= n),
        l.cd <= 0 &&
          g < 160 &&
          e.enemies.filter((P) => P.alive && P.kind === "zombie").length < 4 &&
          ((l.cd = 6.5),
          e.enemies.push(api.Pi(e, "zombie", l.x + (Math.random() - 0.5) * 18, l.y + 12)),
          api.se(e, l.x, l.y, "#6adf6a", 10, 40, 0.4),
          api.G(e, "eshot")));
    } else if (l.kind === "zombie")
      (g < 130
        ? ((l.vx = (d / g) * 24), (l.vy = (v / g) * 24))
        : ((l.vx = Math.cos(l.t) * 8), (l.vy = Math.sin(l.t) * 8)),
        api.Ye(e, l, l.vx * n, l.vy * n, 5));
    else if (l.kind === "spider")
      (g < 140
        ? ((l.vx = (d / g) * 36 + Math.cos(l.t * 4) * 18),
          (l.vy = (v / g) * 36 + Math.sin(l.t * 5) * 18))
        : ((l.vx = Math.cos(l.t * 2) * 20), (l.vy = Math.sin(l.t * 2.2) * 20)),
        api.Ye(e, l, l.vx * n, l.vy * n, 5));
    else if (l.kind === "rat")
      (g < 90
        ? ((l.vx = (d / g) * 42), (l.vy = (v / g) * 42))
        : ((l.vx = Math.cos(l.t * 3.1) * 22), (l.vy = Math.sin(l.t * 2.7) * 22)),
        api.Ye(e, l, l.vx * n, l.vy * n, 4));
    else if (
      l.kind === "snake" &&
      (api.aiChase(e, l, n),
      (l.cd -= n),
      l.cd <= 0 && g < 100)
    ) {
      l.cd = 2.4;
      let P = Math.atan2(v, d);
      (e.eshots.push({
        x: l.x,
        y: l.y,
        vx: Math.cos(P) * 70,
        vy: Math.sin(P) * 70,
        kind: "ticket",
        dead: !1,
      }),
        api.G(e, "eshot"));
    } else if (l.kind === "morok") {
      (g < 220
        ? ((l.vx = (d / g) * 20), (l.vy = (v / g) * 20))
        : ((l.vx = Math.cos(l.t * 0.6) * 10), (l.vy = Math.sin(l.t * 0.5) * 10)),
        api.Ye(e, l, l.vx * n, l.vy * n, 8),
        (l.cd -= n),
        l.cd <= 0 &&
          g < 200 &&
          ((l.cd = 2.2),
          [ -0.35, 0, 0.35 ].forEach((P) => {
            let N = Math.atan2(v, d) + P;
            e.eshots.push({
              x: l.x,
              y: l.y,
              vx: Math.cos(N) * 78,
              vy: Math.sin(N) * 78,
              kind: "ticket",
              dead: !1,
            });
          }),
          api.G(e, "eshot")));
    }
    let C =
        l.kind === "king" ||
        l.kind === "golem" ||
        l.kind === "lich" ||
        l.kind === "audit" ||
        l.kind === "morok" ||
        l.kind === "stamper" ||
        l.kind === "reklamator"
          ? 15
          : l.kind === "phantom"
            ? 14
            : l.kind === "nest"
              ? 0
              : l.kind === "shield"
                ? 11
                : 9,
      S =
        l.kind === "king" ||
        l.kind === "golem" ||
        l.kind === "phantom" ||
        l.kind === "lich" ||
        l.kind === "audit" ||
        l.kind === "morok" ||
        l.kind === "stamper" ||
        l.kind === "reklamator" ||
        l.kind === "charger" ||
        l.kind === "zombie" ||
        l.kind === "spider" ||
        (e.zone >= 4 && l.kind !== "bat" && l.kind !== "ticket")
          ? 2
          : 1;
    if (
      l.alive &&
      C &&
      l.z < 6 &&
      l.z >= 0 &&
      Math.abs(l.x - e.px) < C &&
      Math.abs(l.y - e.py) < C
    ) {
      let P = api.Ka(e, l.lvl, S);
      P > 0
        ? api.Oa(e, Math.max(1, Math.round(P)), l.x, l.y)
        : Math.random() < 0.15 &&
          (api.Ne(e, e.px, e.py - 14, "0", "#9aa0b0"), (e.inv = Math.max(e.inv, 0.25)));
    }
  }
  if (
    ((e.enemies = e.enemies.filter((l) => l.alive)),
    D &&
      !e.f.boss &&
      !(e.god && e.god.veil) &&
      (!D.awake &&
        e.px > 20 * api.T &&
        ((D.awake = !0),
        api.ne(
          e,
          "SUPPORT-BOT 3000: Twoje zg\u0142oszenie jest dla nas wa\u017Cne. Prosz\u0119 czeka\u0107...",
          3.5,
        ),
        api.Ct(e, 1.5, 1.8, D.x, D.y),
        api.G(e, "boss")),
      D.awake && e.zT <= 0.2))
  ) {
    ((D.t += n), (D.inv = Math.max(0, D.inv - n)));
    let l = D.hp / D.maxHp;
    if (
      ((D.x = api.Y(api._a.x) + Math.sin(D.t * (l < 0.5 ? 1.25 : 0.8)) * 150),
      (D.y = api.Y(api._a.y) + Math.sin(D.t * 1.7) * (l < 0.5 ? 34 : 12)),
      (D.cd -= n),
      D.cd <= 0)
    ) {
      D.cd = l < 0.5 ? 1 : 1.5;
      let d = e.px - D.x,
        v = e.py - D.y,
        g = Math.atan2(v, d),
        C = l < 0.5 ? 80 : 66,
        S = l < 0.5 ? [g - 0.35, g, g + 0.35] : [g];
      for (let P of S)
        e.eshots.push({
          x: D.x,
          y: D.y + 10,
          vx: Math.cos(P) * C,
          vy: Math.sin(P) * C,
          kind: "ticket",
          dead: !1,
        });
      (api.G(e, "eshot"),
        Math.random() < 0.3 &&
          api.ne(
            e,
            [
              "Prosimy o cierpliwo\u015B\u0107.",
              "Zg\u0142oszenie nr 4815162342.",
              "Czy pr\xF3bowa\u0142a\u015B wy\u0142\u0105czy\u0107 i w\u0142\u0105czy\u0107?",
              "Adres zablokowany. Mi\u0142ego dnia!",
              "Przekazano do w\u0142a\u015Bciwego dzia\u0142u.",
            ][Math.floor(Math.random() * 5)],
            2,
          ));
    }
    if (l <= 0.5 && !D.summoned) {
      D.summoned = !0;
      for (let [d, v] of [
        [24, 12],
        [42, 12],
        [33, 22],
      ])
        e.enemies.push(api.Pi(e, "bat", api.Y(d), api.Y(v)));
      api.ne(e, "SUPPORT-BOT 3000: Eskaluj\u0119 do nietoperzy!", 2.5);
    }
    if (l < 0.25 && ((D.ring -= n), D.ring <= 0)) {
      D.ring = 3.2;
      for (let d = 0; d < 10; d++) {
        let v = (d / 10) * Math.PI * 2 + D.t;
        e.eshots.push({
          x: D.x,
          y: D.y,
          vx: Math.cos(v) * 58,
          vy: Math.sin(v) * 58,
          kind: "ticket",
          dead: !1,
        });
      }
    }
    if (Math.abs(D.x - e.px) < 18 && Math.abs(D.y - e.py) < 18) {
      let d = api.Ka(e, (api.Df[e.zone] || 1) + 6, 2);
      d > 0 && api.Oa(e, Math.max(1, Math.round(d)), D.x, D.y);
    }
  }
  for (let l of e.pshots) {
    if (l.dead) continue;
    if (l.kind === "bolt") {
      let C = null,
        S = 70;
      for (let P of api.Uf(e)) {
        if (P.e && l.hits.indexOf(P.e.uid) >= 0) continue;
        let N = Math.hypot(P.x - l.x, P.y - l.y);
        N < S && ((S = N), (C = P));
      }
      if (C) {
        let P = C.x - l.x,
          N = C.y - l.y,
          Q = Math.hypot(P, N) || 1;
        ((l.vx += (P / Q) * 450 * n), (l.vy += (N / Q) * 450 * n));
        let W = Math.hypot(l.vx, l.vy);
        ((l.vx = (l.vx / W) * 150), (l.vy = (l.vy / W) * 150));
      }
      Math.random() < 0.6 &&
        e.parts.push({
          x: l.x,
          y: l.y,
          vx: 0,
          vy: 0,
          life: 0.25,
          max: 0.25,
          col: "#c49bff",
          s: 1,
          g: 0,
        });
    }
    if (
      (l.kind === "fire" &&
        Math.random() < 0.8 &&
        e.parts.push({
          x: l.x,
          y: l.y,
          vx: (Math.random() - 0.5) * 20,
          vy: -12,
          life: 0.3,
          max: 0.3,
          col: Math.random() < 0.5 ? "#ff9a3c" : "#ffd84a",
          s: 2,
          g: 0,
        }),
      (l.x += l.vx * n),
      (l.y += l.vy * n),
      (l.life -= n),
      l.life <= 0)
    ) {
      l.dead = !0;
      continue;
    }
    let d = Math.floor(l.x / api.T),
      v = Math.floor(l.y / api.T),
      g = api.Pe(e, e.zone, d, v);
    if (api.Qo(e, g) || api.Ef(e, d, v)) {
      (l.kind !== "ticket" && api.Qp(e, d, v, l.kind === "fire"),
        l.kind === "fire" && (api.se(e, l.x, l.y, "#ff9a3c", 14, 70, 0.4), api.G(e, "boom")),
        (l.dead = !0));
      continue;
    }
    for (let C of e.enemies) {
      if (!C.alive || l.dead || l.hits.indexOf(C.uid) >= 0) continue;
      let S = C.kind === "king" ? 15 : 8;
      if (Math.abs(C.x - l.x) < S && Math.abs(C.y - l.y) < S) {
        l.hits.push(C.uid);
        let P = Math.hypot(l.vx, l.vy) || 1;
        if ((api.gi(e, C, l.dmg, l.vx / P, l.vy / P), l.kind === "fire")) {
          for (let N of e.enemies)
            N !== C &&
              N.alive &&
              Math.hypot(N.x - l.x, N.y - l.y) < 24 &&
              api.gi(e, N, l.dmg * 0.5, 0, 0);
          (api.se(e, l.x, l.y, "#ff9a3c", 20, 80, 0.4), api.G(e, "boom"));
        }
        l.pierce > 0 ? l.pierce-- : (l.dead = !0);
      }
    }
    if (!l.dead && api.pokeWorld && api.pokeWorld(e, l.x, l.y, 8, l.dmg, l, l.vx, l.vy))
      l.pierce > 0 ? l.pierce-- : (l.dead = !0);
    if (
      (!l.dead &&
        D &&
        !e.f.boss &&
        D.awake &&
        l.hits.indexOf(-1) < 0 &&
        Math.abs(D.x - l.x) < 16 &&
        Math.abs(D.y - l.y) < 15 &&
        (l.hits.push(-1), api.Ps(e, l.dmg), l.pierce > 0 ? l.pierce-- : (l.dead = !0)),
      !l.dead && l.kind !== "ticket")
    )
      for (let C of e.eshots)
        !C.dead &&
          Math.abs(C.x - l.x) < 7 &&
          Math.abs(C.y - l.y) < 7 &&
          ((C.dead = !0),
          api.se(e, C.x, C.y, "#ffffff", 5, 40, 0.3),
          l.kind !== "fire" && l.kind !== "quarrel" && (l.dead = !0));
  }
  e.pshots = e.pshots.filter((l) => !l.dead);
  for (let l of e.eshots)
    if (!l.dead) {
      if (
        ((l.x += l.vx * n),
        (l.y += l.vy * n),
        api.Qo(e, api.Pe(e, e.zone, Math.floor(l.x / api.T), Math.floor(l.y / api.T))))
      ) {
        l.dead = !0;
        continue;
      }
      if (!(e.god && e.god.veil) && Math.abs(l.x - e.px) < 7 && Math.abs(l.y - e.py) < 8) {
        l.dead = !0;
        let d = api.Ka(e, (api.Df[e.zone] || 1) + 1, 1);
        d > 0 && api.Oa(e, Math.max(1, Math.round(d)), l.x, l.y);
      }
    }
  e.eshots = e.eshots.filter((l) => !l.dead);
};
