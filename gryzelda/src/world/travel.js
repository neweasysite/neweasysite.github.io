// @ts-nocheck
/* Zmiana strefy, cięcia mapy i przejścia.
   Nazwy wewnętrzne zostały po minifikacji — logika jest ta sama co w oryginalnej paczce. */
import { api } from "../runtime/api.js";

api.Ks = function Ks(e, t, n, i) {
  let a = e.zone;
  ((e.zone = t),
    (e.px = n),
    (e.py = i),
    (e.pshots = []),
    (e.eshots = []),
    (e.parts = []),
    (e.texts = []),
    (e.bolts = []),
    (e.shrineLock = !0),
    (e.dashT = 0),
    (e.kamila = !1),
    t === 13 && !e.f.undead && ((e.f.undead = !0), (e.dirty = !0)),
    t === 26 && e.f.lich && !e.f.cem && ((e.f.cem = !0), (e.dirty = !0)),
    t === 28 && e.f.cem && !e.f.maze && ((e.f.maze = !0), (e.dirty = !0)),
    t === 29 && e.f.maze && !e.f.ante && ((e.f.ante = !0), (e.dirty = !0)),
    e.f["vz:" + t] || ((e.f["vz:" + t] = !0), (e.dirty = !0)));
  api.paintBridges && api.paintBridges(e);
  let r = api.qe[t];
  ((e.camX = n), (e.camY = i), (e.layerDirty = !0), (e.sw = [0, 0, 0]), (e.enemies = []));
  for (let s of r.spawns) {
    let u =
      s[0] === "nest" ? "nest:" + t + ":" + s[1] + ":" + s[2] : "sp:" + t + ":" + s[1] + ":" + s[2];
    if (
      (s[0] === "king" && e.f.king) ||
      (s[0] === "golem" && e.f.golem) ||
      (s[0] === "phantom" && e.f.phantom && t !== 29) ||
      (s[0] === "lich" && t === 15 && e.f.lich) ||
      (s[0] === "lich" && t === 25 && (e.f.kozacki || e.f.rootTok)) ||
      (s[0] === "audit" && (!e.f.root || e.f.audit))
    )
      continue;
    if (e.cut[u]) {
      if (!(
        api.Ip.has(u) &&
        !api.Wp(t) &&
        typeof e.f["rt:" + u] == "number" &&
        e.time >= e.f["rt:" + u]
      ))
        continue;
      delete e.cut[u];
    }
    let f = s[0] === "slime" && Math.random() < 0.06 ? "gold" : s[0],
      c = api.Pi(e, f, api.Y(s[1]), api.Y(s[2]), u),
      y = e.f["rk:" + u] || 0;
    ((c.farm = y > 0), e.enemies.push(c));
  }
  (api.lh(e), (e.items = []));
  for (let s of r.items)
    (s.id && e.cut["item:" + s.id]) ||
      (s.kind === "klucz" && e.f.key) ||
      (s.kind === "lutnia" && (!e.f.luteQ || e.f.luteFound)) ||
      (s.kind === "zebatka" && (!e.f.gearQ || e.f.gearFound)) ||
      (s.kind === "manifest" && e.f.westKey) ||
      (s.kind === "badge" && e.f.southKey) ||
      (s.kind === "root" && e.f.rootTok) ||
      (s.kind === "qi" && !api.Bp(e, s.id)) ||
      e.items.push({ kind: s.kind, x: api.Y(s.tx), y: api.Y(s.ty), v: 0, id: s.id, taken: !1 });
  if (
    (t === 2 &&
      e.f.king &&
      !e.f.seal &&
      e.items.push({ kind: "seal", x: api.Y(31), y: api.Y(30), v: 0, id: "seal", taken: !1 }),
    t === 10 &&
      e.f.golem &&
      !e.f.westKey &&
      e.items.push({
        kind: "manifest",
        x: api.Y(14),
        y: api.Y(4),
        v: 0,
        id: "manifest",
        taken: !1,
      }),
    t === 12 &&
      e.f.phantom &&
      !e.f.southKey &&
      e.items.push({ kind: "badge", x: api.Y(18), y: api.Y(10), v: 0, id: "badge", taken: !1 }),
    t === 25 &&
      e.f.kozacki &&
      !e.f.rootTok &&
      e.items.push({ kind: "root", x: api.Y(14), y: api.Y(8), v: 0, id: "root", taken: !1 }),
    t === 5 &&
      e.f.rootTok &&
      e.f.won &&
      !e.f.root &&
      e.items.push({
        kind: "crystal",
        x: api.Y(api.Pn.x),
        y: api.Y(api.Pn.y),
        v: 0,
        id: "crystal2",
        taken: !1,
      }),
    (e.blocks = r.blocks.map((s) => {
      let flag = s.flag || (r.id === 4 ? "plate" : ""),
        tx = s.tx,
        ty = s.ty;
      r.id === 4 && e.f.plate && r.plates[0]
        ? ((tx = r.plates[0].tx), (ty = r.plates[0].ty))
        : flag && e.f[flag] && s.goal && ((tx = s.goal[0]), (ty = s.goal[1]));
      return { tx, ty, x: tx * api.T, y: ty * api.T, hx: s.tx, hy: s.ty, flag };
    })),
    (e.boss = null),
    t === 5 && !e.f.boss)
  ) {
    let s = api.Xk(e);
    ((e.bossHp = s),
      (e.boss = {
        x: api.Y(api._a.x),
        y: api.Y(api._a.y),
        hp: s,
        maxHp: 60,
        t: 0,
        inv: 0,
        cd: 2,
        ring: 4,
        summoned: s <= 30,
        hitId: -1,
        awake: !1,
      }));
  }
  (t === 5 &&
    e.f.boss &&
    !e.f.won &&
    e.items.push({
      kind: "crystal",
      x: api.Y(api.Pn.x),
      y: api.Y(api.Pn.y),
      v: 0,
      id: "",
      taken: !1,
    }),
    t === 13 &&
      !e.cut["hint:undead"] &&
      ((e.cut["hint:undead"] = !0),
      api.ne(
        e,
        "Kraina Nieumar\u0142ego: po\u0142udnie-zach\xF3d \u2192 Call Center, wsch\xF3d \u2192 Sala Eskalacji, p\xF3\u0142noc \u2192 Krypta, zach\xF3d \u2192 lab Igi.",
        4.2,
      )),
    t === 5 &&
      e.f.root &&
      !e.f.audit &&
      !e.cut["hint:arch"] &&
      ((e.cut["hint:arch"] = !0),
      api.ne(
        e,
        "Wschodnia \u015Bciana serwerowni pu\u015Bci\u0142a. Archiwum Milczenia czeka na audyt.",
        3.6,
      )),
    t === 44 &&
      !e.cut["hint:kam"] &&
      ((e.cut["hint:kam"] = !0),
      api.ne(
        e,
        "Dwa kamienie, dwie płyty. Pchasz na boki i do góry. Jak utkną: Dziennik → Przywróć. Za kratą skrzynia.",
        4.2,
      )),
    t === 45 &&
      !e.cut["hint:waga"] &&
      ((e.cut["hint:waga"] = !0),
      api.ne(
        e,
        "Belka: lewa beczy (w dół), środkowa śpi (zostaw), prawa pilnuje (w dół). Potem Użyj. Za kratą skrzynia.",
        4.6,
      )),
    t === 47 &&
      !e.cut["hint:crypt"] &&
      ((e.cut["hint:crypt"] = !0),
      api.ne(
        e,
        "Katakumby pod lasem. Im niżej, tym wyższy poziom: od 4 aż do 28. Schody prowadzą dalej.",
        4.4,
      )),
    t === 49 &&
      !e.cut["hint:zap1"] &&
      ((e.cut["hint:zap1"] = !0),
      api.ne(e, "Zapadnia to krata w podłodze. Użyj dźwigni na południe od niej.", 3.8)),
    t === 51 &&
      !e.cut["hint:popiol"] &&
      ((e.cut["hint:popiol"] = !0),
      api.ne(
        e,
        "Waga popiołu: lewa w dół, środkowa zostaw, prawa w dół. Potem Użyj.",
        4.2,
      )),
    t === 54 &&
      !e.cut["hint:kreg"] &&
      ((e.cut["hint:kreg"] = !0),
      api.ne(
        e,
        "Dwa kamienie, dwie płyty. Pchasz na boki i do góry. Jak utkną: Dziennik → Przywróć.",
        4.2,
      )),
    t === 55 &&
      !e.cut["hint:zap2"] &&
      ((e.cut["hint:zap2"] = !0),
      api.ne(e, "Dwie dźwignie, obie w dół. Potem podłoga puszcza.", 3.6)),
    t === 59 &&
      !e.cut["hint:morok"] &&
      ((e.cut["hint:morok"] = !0),
      api.ne(e, "Morok, Archiwariusz Otchłani. Nie prowadzi akt. On je zamyka.", 4)),
    (a !== t || e.time < 0.5) && ((e.banner = r.name), (e.bannerT = 2.4)),
    api.G(e, "zone:" + r.theme),
    api.nh(e));
};

api._p = function _p(e, t) {
  return t.every((n) => !!e.f[n]);
};

api.th = function th(e, t, n) {
  let i = api.eh.find((a) => a.npc === t && a.topic === n);
  return i ? api._p(e, i.needs) : !0;
};

api.Af = function Af(e, t) {
  let n = e.np[t.id];
  return n ? { x: n.x, y: n.y } : { x: api.Y(t.tx), y: api.Y(t.ty) };
};

api.Ap = function Ap(e, t, n, i, a) {
  for (let [s, u] of [
    [n - 5, i - 5],
    [n + 5, i - 5],
    [n - 5, i + 5],
    [n + 5, i + 5],
  ]) {
    let f = Math.floor(s / api.T),
      c = Math.floor(u / api.T),
      y = api.Pe(e, t.id, f, c);
    if (api.Qo(e, y) || y === "d" || y === "H" || y === "_" || y === "U") return !1;
    for (let w of t.exits)
      if (f >= w.x0 - 1 && f <= w.x1 + 1 && c >= w.y0 - 1 && c <= w.y1 + 1) return !1;
  }
  if (Math.hypot(n - e.px, i - e.py) < 14) return !1;
  for (let s in e.np)
    if (s !== a) {
      let u = e.np[s];
      if (Math.hypot(u.x - n, u.y - i) < 12) return !1;
    }
  return !0;
};

api.Ds = function Ds(e) {
  return api.qe[1].spawns.filter((t) => t[0] === "nest" && e.cut["nest:1:" + t[1] + ":" + t[2]])
    .length;
};

api.Rs = function Rs(e) {
  return api.qe[8].spawns.filter((t) => t[0] === "nest" && e.cut["nest:8:" + t[1] + ":" + t[2]])
    .length;
};

api.Ns = function Ns(e) {
  return api.qe[2].items.filter((t) => t.kind === "grzyb" && e.cut["item:" + t.id]).length;
};
