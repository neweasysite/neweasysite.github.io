// @ts-nocheck
/* Odczyt kafelków, przejść i flag świata.
   Nazwy wewnętrzne zostały po minifikacji — logika jest ta sama co w oryginalnej paczce. */
import { api } from "../runtime/api.js";

api.Pe = function Pe(e, t, n, i) {
  let a = api.qe[t];
  if (i < 0 || i >= a.h || n < 0 || n >= a.w) return "#";
  let r = a.t[i][n];
  return (r === "b" || r === "f" || r === "x" || r === "X" || r === "B" || r === "j" || r === "J") &&
    e.cut[t + ":" + n + ":" + i]
    ? "."
    : r;
};

api.Gk = function Gk(e, t, n, i) {
  var a;
  return ((a = t.t[i]) == null ? void 0 : a[n]) !== "d"
    ? !0
    : e.mvy < -0.35 && Math.abs(e.mvx) <= Math.abs(e.mvy) + 0.05;
};

api.Ef = function Ef(e, t, n) {
  return e.blocks.some((i) => i.tx === t && i.ty === n);
};

api.sp = function sp(e, t, n, i) {
  let a = [
    [t - i, n - i],
    [t + i, n - i],
    [t - i, n + i],
    [t + i, n + i],
  ];
  for (let r of a) {
    let s = Math.floor(r[0] / api.T),
      u = Math.floor(r[1] / api.T);
    if (api.Qo(e, api.Pe(e, e.zone, s, u)) || api.Ef(e, s, u)) return !0;
  }
  return !1;
};

api.Ye = function Ye(e, t, n, i, a) {
  let r = !1;
  return (
    n !== 0 && (api.sp(e, t.x + n, t.y, a) ? (r = !0) : (t.x += n)),
    i !== 0 && (api.sp(e, t.x, t.y + i, a) ? (r = !0) : (t.y += i)),
    r
  );
};

api.Zk = function Zk(e, t) {
  return Math.max(1, (api.Df[e] || 1) + (api.Uk[t] || 0));
};

api.Qo = function Qo(e, t) {
  switch (t) {
    case "#":
    case "t":
    case "w":
    case "r":
    case "h":
    case "b":
    case "f":
    case "x":
    case "X":
    case "L":
    case "M":
    case "T":
    case "B":
    case "C":
    case "F":
    case "K":
    case "A":
    case "O":
    case "j":
    case "J":
      return !0;
    case "E": {
      let z = api.qe[e.zone];
      return !(z && z.gateFlag && e.f[z.gateFlag]);
    }
    case "Y":
      return !e.f.cellarQ;
    case "P":
      return !api.northOpen(e);
    case "g":
      return e.zone === 10 ? !e.f.depotDoor : !e.f.lever1;
    case "k":
      return !e.f.lever2;
    case "q":
      return !e.f.plate;
    case "G":
      return !e.f.gate;
    case "D":
      return !e.f.door;
    case "V":
      return !api.portalOpen(e);
  }
  return !1;
};

/* Północna brama otwiera się dopiero, gdy dotkniesz jej z Pieczęcią Lasu.
   Stare zapisy: kto już był w Ruinach, ma bramę otwartą. */
api.northOpen = function northOpen(e) {
  return !!(e && e.f && (e.f.northOpen || (e.f.seal && e.f["vz:4"])));
};

/* Portal V: dopiero gdy Manifest jest u Piotra, a Odznaka u Basi. */
api.portalOpen = function portalOpen(e) {
  return !!(e && e.f && ((e.f.westDone && e.f.southDone) || e.f.undead));
};

api.tryNorthGate = function tryNorthGate(e, u, mx, my) {
  if (!e || e.zone !== 0 || api.northOpen(e)) return;
  let tx = Math.floor((u.x + Math.sign(mx) * 8) / api.T),
    ty = Math.floor((u.y + Math.sign(my) * 8) / api.T);
  if (api.Pe(e, 0, tx, ty) !== "P") return;
  if (!e.f.seal) {
    if ((e.gateHintT || 0) > e.time) return;
    e.gateHintT = e.time + 6;
    return api.ne(e, "Brama zamknięta na głucho. W zamku jest okrągłe wgłębienie, jak na pieczęć.", 3);
  }
  e.f.northOpen = !0;
  e.dirty = !0;
  e.layerDirty = !0;
  api.se && api.se(e, api.Y(24.5), api.Y(1), "#7ff7ff", 30, 80, 0.8);
  api.Bt(e, 4);
  api.G(e, "chest");
  api.ne(e, "Pieczęć Lasu wchodzi w zamek jak pieczątka we wniosek. Brama puszcza, a pieczęć zostaje w zamku.", 4);
};

/* Wyjście jest otwarte, jeśli nie zasłania go zamknięta krata, brama albo portal. */
api.exitOpen = function exitOpen(e, zid, ex) {
  if (!e || !e.f) return !0;
  let z = api.qe[zid];
  if (!z) return !0;
  let st = { zone: zid, f: e.f };
  for (let y = ex.y0 - 1; y <= ex.y1 + 1; y++)
    for (let x = ex.x0 - 1; x <= ex.x1 + 1; x++) {
      let c = z.t[y] && z.t[y][x];
      if ((c === "E" || c === "P" || c === "V") && api.Qo(st, c)) return !1;
    }
  return !0;
};

api.plateLit = function plateLit(e, zone, x, y) {
  if (!zone) return !1;
  if (zone.id === 4) return !!e.f.plate;
  let p = (zone.plates || []).find((q) => q.tx === x && q.ty === y);
  return !!(p && p.flag && e.f[p.flag]);
};

api.Mf = function Mf(e, t) {
  return e.weapons.indexOf(t) >= 0
    ? ""
    : t === "luk" && e.f.nestQ && !e.f.nestDone
      ? "My\u015Bliwy Zenek obieca\u0142 \u0142uk za zniszczenie trzech gniazd spamu na \u0141\u0105ce."
      : t === "burza" && e.f.mushQ && !e.f.mushDone
        ? "Wied\u017Ama Halina obieca\u0142a Kostur Burzy za pi\u0119\u0107 \u015Bwiec\u0105cych grzyb\xF3w z Lasu."
        : "";
};
