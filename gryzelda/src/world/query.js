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
      return !e.f.seal;
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
      return !(e.f.westKey && e.f.southKey);
  }
  return !1;
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
