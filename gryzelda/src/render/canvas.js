// @ts-nocheck
/* Płótno, piksele i pomocnicze rysowanie.
   Nazwy wewnętrzne zostały po minifikacji — logika jest ta sama co w oryginalnej paczce. */
import { api } from "../runtime/api.js";

api.o = function o(e, t, n, i, a, r) {
  ((e.fillStyle = t), e.fillRect(Math.round(n), Math.round(i), a, r));
};

api.ot = function ot(e, t) {
  let n = parseInt(e.slice(1), 16),
    i = (n >> 16) & 255,
    a = (n >> 8) & 255,
    r = n & 255,
    s = (u) => api.vt(Math.round(t < 0 ? u * (1 + t) : u + (255 - u) * t), 0, 255);
  return "rgb(" + s(i) + "," + s(a) + "," + s(r) + ")";
};

api.Ue = function Ue(e, t, n, i, a = "#1b1424") {
  let r = api.Wa.get(e);
  if (r) return r;
  api.Wa.size > 700 && api.Wa.clear();
  let s = api.$n(t + 2, n + 2),
    u = api.Vn(s);
  (u.translate(1, 1), i(u));
  let f = api.$n(t + 2, n + 2),
    c = api.Vn(f);
  for (let [y, w] of [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ])
    c.drawImage(s, y, w);
  return (
    (c.globalCompositeOperation = "source-in"),
    (c.fillStyle = a),
    c.fillRect(0, 0, t + 2, n + 2),
    (c.globalCompositeOperation = "source-over"),
    c.drawImage(s, 0, 0),
    api.Wa.set(e, f),
    f
  );
};

api.dp = function dp(e, t) {
  let n = e + "#f",
    i = api.Wa.get(n);
  if (i) return i;
  let a = api.$n(t.width, t.height),
    r = api.Vn(a);
  return (
    r.drawImage(t, 0, 0),
    (r.globalCompositeOperation = "source-in"),
    (r.fillStyle = "#ffffff"),
    r.fillRect(0, 0, a.width, a.height),
    api.Wa.set(n, a),
    a
  );
};

api.$n = function $n(e, t) {
  let n = document.createElement("canvas");
  return ((n.width = e), (n.height = t), n);
};

api.Vn = function Vn(e) {
  let t = e.getContext("2d");
  return ((t.imageSmoothingEnabled = !1), t);
};

api.Eh = function Eh(e, t, n, i, a) {
  return { x0: n - 8 / a, x1: e - n + 8 / a, y0: i - api.zp / a, y1: t - i + api.wp / a };
};

api.cn = function cn(e, t, n, i, a) {
  (api.o(e, "#1b1424", t - 1, n - 1, i + 2, a + 2),
    api.o(e, "rgba(28,22,44,0.88)", t, n, i, a),
    api.o(e, "#5a4a7a", t, n, i, 1),
    api.o(e, "#3a2e52", t, n + a - 1, i, 1));
};
