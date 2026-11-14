// @ts-nocheck
/* Dźwignie, bloki, używanie obiektów.
   Nazwy wewnętrzne zostały po minifikacji — logika jest ta sama co w oryginalnej paczce. */
import { api } from "../runtime/api.js";

api.smashNeed = { B: 3, j: 2, J: 4 };

api.Qp = function Qp(e, t, n, i) {
  let a = api.Pe(e, e.zone, t, n);
  if (a === "L") return (api.Vp(e, t, n), !0);
  let need = api.smashNeed[a];
  if (need) {
    let key = e.zone + ":" + t + ":" + n;
    e._smash || (e._smash = {});
    if (e.swing > 0 && e._smash[key] === e.swingId) return !1;
    e.swing > 0 && (e._smash[key] = e.swingId);
    let got = (e.f["brk:" + key] || 0) + 1;
    ((e.f["brk:" + key] = got), (e.dirty = !0), (e.layerDirty = !0));
    let r = api.Y(t),
      s = api.Y(n);
    if (got < need)
      return (
        api.Ne(e, r, s - 10, got + "/" + need, "#ffffff"),
        api.se(e, r, s, "#c9a676", 8, 40, 0.35),
        api.G(e, "thud"),
        got === 1 &&
          !e.cut["hint:smash"] &&
          ((e.cut["hint:smash"] = !0),
          api.ne(
            e,
            a === "B"
              ? "Beczka stęka. Trzeba uderzyć kilka razy."
              : a === "J"
                ? "Skrzynia zbita gwoździami. To chwilę potrwa."
                : "Garnek dzwoni. Jeszcze raz.",
            2.2,
          )),
        !0
      );
    ((e.cut[key] = !0), (e.layerDirty = !0));
    api.se(e, r, s, a === "j" ? "#c46a4a" : "#a8743c", 16, 70, 0.55);
    api.G(e, "boom");
    api.Bt(e, a === "J" ? 2 : 1);
    a === "J"
      ? (Math.random() < 0.5
          ? e.items.push({ kind: "heart", x: r, y: s, v: 4, id: "", taken: !1 })
          : e.items.push({ kind: "coin", x: r, y: s, v: 3, id: "", taken: !1 }),
        api.ne(e, "Skrzynia poszła w drzazgi.", 1.8))
      : a === "B"
        ? (e.items.push({ kind: "coin", x: r, y: s, v: 2, id: "", taken: !1 }),
          Math.random() < 0.35 && api.Rf(e, r, s),
          api.ne(e, "Beczka pękła.", 1.6))
        : (Math.random() < 0.4
            ? e.items.push({ kind: "coin", x: r, y: s, v: 1, id: "", taken: !1 })
            : api.Rf(e, r, s),
          api.ne(e, "Garnek w skorupach.", 1.4));
    return !0;
  }
  if (!(a === "b" || a === "x" || a === "X" || (a === "f" && i))) return !1;
  ((e.cut[e.zone + ":" + t + ":" + n] = !0), (e.layerDirty = !0));
  let r = api.Y(t),
    s = api.Y(n);
  return (
    api.se(
      e,
      r,
      s,
      a === "f" ? "#ff9a3c" : a === "x" ? "#a0703a" : a === "X" ? "#9a9a8a" : "#5ea24c",
      16,
      70,
      0.55,
    ),
    api.G(e, a === "X" ? "boom" : "cut"),
    a === "f"
      ? (api.ne(
          e,
          "Zaro\u015Bla sp\u0142on\u0119\u0142y! \u015Acie\u017Cka na p\xF3\u0142noc wolna.",
          3,
        ),
        (e.dirty = !0))
      : a === "X"
        ? (api.ne(
            e,
            "P\u0119kni\u0119ta \u015Bciana run\u0119\u0142a! Sekretne przej\u015Bcie.",
            3,
          ),
          api.Bt(e, 4),
          (e.dirty = !0))
        : a === "x"
          ? Math.random() < 0.45
            ? api.Rf(e, r, s)
            : e.items.push({ kind: "coin", x: r, y: s, v: 1, id: "", taken: !1 })
          : Math.random() < 0.3 && api.Rf(e, r, s),
    !0
  );
};

api.lp = function lp(e, t, n, i, a) {
  for (let r = Math.floor((n - i) / api.T); r <= Math.floor((n + i) / api.T); r++)
    for (let s = Math.floor((t - i) / api.T); s <= Math.floor((t + i) / api.T); s++)
      api.Qp(e, s, r, a);
};

api.up = function up(e) {
  let t = Math.floor(e.px / api.T),
    n = Math.floor(e.py / api.T);
  return e.zone === 4 && t >= 3 && t <= 15 && n >= 15 && n <= 25;
};

api.$p = function $p(e) {
  let z = api.qe[e.zone];
  if (!z || !e.blocks || !e.blocks.length) return !1;
  let flag = e.blocks[0].flag || (e.zone === 4 ? "plate" : "");
  if (flag && e.f[flag]) return !1;
  let px = Math.floor(e.px / api.T),
    py = Math.floor(e.py / api.T);
  if (e.blocks.some((b) => b.hx === px && b.hy === py))
    return (api.ne(e, "Odsuń się z miejsca startowego kamienia i spróbuj ponownie.", 2.5), !1);
  for (let b of e.blocks)
    ((b.tx = b.hx), (b.ty = b.hy), (b.x = b.hx * api.T), (b.y = b.hy * api.T), api.se(e, b.x + 8, b.y + 8, "#c49bff", 10, 40, 0.4));
  return (
    api.ne(e, e.zone === 4 ? "Blok wrócił na miejsce startowe." : "Kamienie wróciły na start.", 2.5),
    api.G(e, "push"),
    !0
  );
};

api.plateCheck = function plateCheck(e, zone, tx, ty) {
  let plates = zone.plates || [],
    here = plates.find((p) => p.tx === tx && p.ty === ty);
  if (!here && e.zone !== 4) return;
  let flag = (here && here.flag) || (e.zone === 4 ? "plate" : "");
  if (!flag || e.f[flag]) return;
  let group = plates.filter((p) => (p.flag || (e.zone === 4 ? "plate" : "")) === flag);
  if (!group.length || !group.every((p) => e.blocks.some((b) => b.tx === p.tx && b.ty === p.ty))) return;
  ((e.f[flag] = !0), (e.dirty = !0), (e.layerDirty = !0));
  flag === "plate"
    ? (api.ne(e, "Płyta wciśnięta! Krata do Sali Kryształów się otwiera.", 3.2),
      api.Ct(e, 1.35, 1.3, 28 * api.T, 15 * api.T))
    : (api.ne(e, "Kamienie siadły na płytach. Krata puszcza.", 3.2),
      api.Ct(e, 1.25, 1.1, tx * api.T, ty * api.T));
  (api.Bt(e, 3), api.G(e, "lever"));
};

api.flipToggle = function flipToggle(e, id) {
  let z = api.Cn(e);
  if (!z || !z.toggles) return;
  if (z.gateFlag && e.f[z.gateFlag])
    return api.ne(
      e,
      z.gateFlag === "waga" ? "Waga już się zgodziła. Nie rusza się." : "Już otwarte. Nie rusza się.",
      2,
    );
  let [tx, ty] = id.split(":").map(Number),
    key = "tog:" + e.zone + ":" + tx + ":" + ty;
  ((e.f[key] = !e.f[key]), (e.dirty = !0), (e.layerDirty = !0), api.G(e, "lever"));
  let ok = z.toggles.every(
    (t, i) => !!e.f["tog:" + e.zone + ":" + t.tx + ":" + t.ty] === !!z.solve[i],
  );
  ok
    ? ((e.f[z.gateFlag] = !0),
      (e.layerDirty = !0),
      api.ne(
        e,
        z.gateFlag === "waga"
          ? "Waga się zgadza. Krata siana puszcza."
          : "Zapadnia puszcza. Można iść dalej.",
        3.2,
      ),
      api.Ct(e, 1.2, 1, api.Y(tx), api.Y(ty)),
      api.G(e, "chime"))
    : api.ne(e, e.f[key] ? "Dźwignia w dół." : "Dźwignia w górze.", 1.3);
};

api.Vp = function Vp(e, t, n) {
  let i = api.Cn(e).levers.find((a) => a.tx === t && a.ty === n);
  !i ||
    e.f[i.flag] ||
    ((e.f[i.flag] = !0),
    (e.dirty = !0),
    (e.layerDirty = !0),
    api.G(e, "lever"),
    api.Bt(e, 3),
    i.flag === "lever1"
      ? (api.ne(e, "Zgrzyt! Krata zachodniego skrzyd\u0142a podniesiona.", 3),
        api.Ct(e, 1.35, 1.3, 17 * api.T, 20 * api.T))
      : (api.ne(e, "Skr\xF3t otwarty! Brama prowadzi prosto do sali wej\u015Bciowej.", 3),
        api.Ct(e, 1.3, 1.1, 34 * api.T, 32 * api.T)));
};

api.Rf = function Rf(e, t, n) {
  let i = Math.random();
  i < 0.06
    ? e.items.push({
        kind: ["kawa", "ekspres", "magnes", "banka"][Math.floor(Math.random() * 4)],
        x: t,
        y: n,
        v: 0,
        id: "",
        taken: !1,
      })
    : i < 0.22
      ? e.items.push({ kind: "heart", x: t, y: n, v: 3, id: "", taken: !1 })
      : i < 0.7 && e.items.push({ kind: "coin", x: t, y: n, v: 1, id: "", taken: !1 });
};
