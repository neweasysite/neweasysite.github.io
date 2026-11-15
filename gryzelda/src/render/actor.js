// @ts-nocheck
/* Gryzelda, NPC i papierowe sprite'y.
   Nazwy wewnętrzne zostały po minifikacji — logika jest ta sama co w oryginalnej paczce. */
import { api } from "../runtime/api.js";

api.kh = function kh(e, t, n, i, a, r, s, u, f = api.qp(t), c = 0) {
  let y = api.Of[t.hairColor],
    w = api.ot(y, -0.3),
    b = api.ot(y, 0.3),
    x = api.If[t.outfitColor],
    M = api.ot(x, -0.35),
    j = api.ot(x, 0.3),
    D = api.Ts[t.skin || 0] || api.Ts[0],
    l = api.ot(D, -0.14),
    d = s % 2 === 1 ? -1 : 0,
    v = s,
    g = r < 0 && a === 0,
    C = a !== 0;
  g && c === 3 && (c = 2);
  let S = a > 0 ? 1 : -1,
    P = "#7d6a55",
    N = "#55473a",
    Q = "#a08a70",
    W = "#4a3a2c",
    _ = () => {
      (api.o(e, N, n - 4, i - 3 + d, 8, 8),
        api.o(e, P, n - 4, i - 3 + d, 8, 7),
        api.o(e, Q, n - 4, i - 3 + d, 8, 2),
        api.o(e, N, n - 3, i + 1 + d, 6, 1),
        api.o(e, "#c9a227", n - 1, i - 1 + d, 2, 1),
        api.o(e, W, n - 5, i - 3 + d, 1, 3),
        api.o(e, W, n + 4, i - 3 + d, 1, 3));
    },
    ie = () => {
      let F = S > 0 ? n - 8 : n + 4;
      (api.o(e, N, F, i - 3 + d, 4, 8),
        api.o(e, P, F + (S > 0 ? 0 : 1), i - 3 + d, 3, 7),
        api.o(e, Q, F, i - 3 + d, 4, 1));
    },
    ze = () => {
      (api.o(e, W, n - 3, i - 3 + d, 1, 4), api.o(e, W, n + 2, i - 3 + d, 1, 4));
    },
    ke = () => {
      api.o(e, W, n - S * 2, i - 3 + d, 1, 5);
    },
    le = (F, k) => api.Jp(e, f, F, k, a, r, c, u),
    ve = v === 1 ? 1 : v === 3 ? -1 : 0,
    Te = () =>
      c === 1
        ? { hx: n + S * 4 - (S < 0 ? 1 : 0), hy: i - 10 + d }
        : c === 2
          ? { hx: n + S * 9 - (S < 0 ? 1 : 0), hy: i - 1 + d }
          : c === 3
            ? { hx: n + S * 7 - (S < 0 ? 1 : 0), hy: i + 3 + d }
            : { hx: n + S * 5 - (S < 0 ? 1 : 0), hy: i + 2 + d + ve },
    ft = () =>
      c === 1
        ? { hx: n, hy: i - 14 + d }
        : c === 2
          ? { hx: n + 1, hy: i - 2 + d }
          : c === 3
            ? { hx: n + 2, hy: i + 6 + d }
            : { hx: n + 6, hy: i + 3 + d + ve },
    tt = () => {
      t.cls === "ran" &&
        (api.o(e, "#7a4a22", n - 5, i - 8 + d, 3, 8),
        api.o(e, "#e8e8e8", n - 5, i - 10 + d, 1, 2),
        api.o(e, "#e8e8e8", n - 3, i - 10 + d, 1, 2));
    };
  (api.o(e, "rgba(0,0,0,0.28)", n - 6, i + 6, 12, 3),
    C && ie(),
    t.outfit === 1 && api.o(e, M, n - 6, i - 4 + d, 12, g ? 11 : 9));
  let ue = v === 1 ? -1 : v === 3 ? 1 : 0,
    z = t.outfit === 4 ? M : t.outfit === 3 ? "#5a5e6a" : "#3b2a20";
  if (
    (api.o(e, z, n - 4, i + 3 + ue, 3, 4 - ue),
    api.o(e, z, n + 1, i + 3 - ue, 3, 4 + ue),
    api.o(e, "#5b3a22", n - 4, i + 6, 3, 1),
    api.o(e, "#5b3a22", n + 1, i + 6, 3, 1),
    t.outfit === 2)
  )
    (api.o(e, x, n - 5, i - 3 + d, 10, 5),
      api.o(e, x, n - 6, i + 1 + d, 12, 4),
      api.o(e, M, n - 6, i + 4 + d, 12, 1),
      api.o(e, j, n - 4, i - 3 + d, 8, 1));
  else if (t.outfit === 3) {
    let F = "#9aa0ac",
      k = "#5a5e6a",
      L = "#d4d8e0";
    (api.o(e, F, n - 5, i - 3 + d, 10, 7),
      api.o(e, k, n - 5, i + 3 + d, 10, 1),
      api.o(e, L, n - 4, i - 3 + d, 8, 1),
      api.o(e, x, n - 2, i - 2 + d, 4, 6),
      api.o(e, j, n - 2, i - 2 + d, 4, 1),
      api.o(e, "#5a3a1e", n - 5, i + 1 + d, 10, 1),
      api.o(e, "#e0b84a", n - 1, i + 1 + d, 2, 1),
      C
        ? api.o(e, L, n + S * 2 - 1, i - 4 + d, 3, 2)
        : (api.o(e, L, n - 7, i - 4 + d, 3, 2),
          api.o(e, L, n + 4, i - 4 + d, 3, 2),
          api.o(e, k, n - 7, i - 2 + d, 3, 1),
          api.o(e, k, n + 4, i - 2 + d, 3, 1)));
  } else if (t.outfit === 4)
    (api.o(e, "#ece4d0", n - 5, i - 3 + d, 10, 7),
      api.o(e, "#cfc4aa", n - 5, i + 3 + d, 10, 1),
      C
        ? (api.o(e, x, n - 4, i - 1 + d, 8, 5), api.o(e, M, n + S * 2, i - 3 + d, 1, 3))
        : (api.o(e, x, n - 3, i - 1 + d, 6, 5),
          api.o(e, x, n - 4, i - 3 + d, 1, 3),
          api.o(e, x, n + 3, i - 3 + d, 1, 3),
          api.o(e, M, n - 3, i + 3 + d, 6, 1),
          g
            ? (api.o(e, M, n - 2, i - 2 + d, 1, 1), api.o(e, M, n + 1, i - 2 + d, 1, 1))
            : (api.o(e, "#ffd84a", n - 3, i - 1 + d, 1, 1),
              api.o(e, "#ffd84a", n + 2, i - 1 + d, 1, 1),
              api.o(e, M, n - 1, i + d, 2, 2))));
  else if (t.outfit === 5)
    (api.o(e, x, n - 5, i - 3 + d, 10, 7),
      api.o(e, M, n - 5, i + 3 + d, 10, 1),
      api.o(e, M, n - 5, i + 1 + d, 10, 1),
      g
        ? (api.o(e, j, n - 4, i - 3 + d, 8, 1), api.o(e, M, n, i - 2 + d, 1, 5))
        : C
          ? (api.o(e, "#ece4d0", n + S * 3 - (S > 0 ? 1 : 0), i - 3 + d, 2, 4),
            api.o(e, j, n + S, i - 3 + d, 2, 1))
          : (api.o(e, "#ece4d0", n - 1, i - 3 + d, 3, 6),
            api.o(e, j, n - 3, i - 3 + d, 2, 2),
            api.o(e, j, n + 2, i - 3 + d, 2, 2),
            api.o(e, "#c8c8d0", n - 2, i - 1 + d, 1, 4),
            api.o(e, "#c8c8d0", n + 2, i - 1 + d, 1, 4)));
  else if (t.outfit === 6)
    if (
      (api.o(e, x, n - 5, i - 3 + d, 10, 8),
      api.o(e, M, n - 5, i + 4 + d, 10, 1),
      api.o(e, "#f2e6c8", n - 5, i + d, 10, 2),
      api.o(e, "#c8b890", n - 5, i + 1 + d, 10, 1),
      g)
    )
      (api.o(e, "#f2e6c8", n - 2, i - 1 + d, 4, 3), api.o(e, j, n - 4, i - 3 + d, 8, 1));
    else if (C) api.o(e, j, n + S * 2 - (S > 0 ? 1 : 0), i - 3 + d, 2, 3);
    else {
      for (let F = 0; F < 3; F++) api.o(e, j, n - 3 + F, i - 3 + d + F, 1, 1);
      for (let F = 0; F < 3; F++) api.o(e, j, n + 2 - F, i - 3 + d + F, 1, 1);
      api.o(e, D, n - 1, i - 3 + d, 2, 1);
    }
  else
    (api.o(e, x, n - 5, i - 3 + d, 10, 7),
      api.o(e, M, n - 5, i + 3 + d, 10, 1),
      api.o(e, "#e0b84a", n - 5, i + 1 + d, 10, 1),
      api.o(e, j, n - 4, i - 3 + d, 8, 1));
  g ? (_(), tt()) : C ? ke() : ze();
  let R = () => {
      let F = Te();
      (api.o(e, x, n - S * 5, i - 2 + d, 2, 5), le(F.hx, F.hy));
      let k = n + S * 2,
        L = i - 2 + d;
      (api.o(e, M, n - 1, L, 3, 3),
        api.o(e, x, k, Math.min(L, F.hy), 2, Math.abs(F.hy - L) + 2),
        api.o(e, x, Math.min(k, F.hx), F.hy, Math.abs(F.hx - k) + 2, 2),
        api.o(e, D, F.hx, F.hy, 2, 2));
    },
    O = () => {
      let F = ft();
      if (c === 1) {
        (api.o(e, x, n - 5, i - 10 + d, 2, 10),
          api.o(e, x, n + 3, i - 10 + d, 2, 10),
          api.o(e, x, n - 3, F.hy, 6, 2),
          le(F.hx, F.hy),
          api.o(e, D, F.hx - 2, F.hy, 2, 2),
          api.o(e, D, F.hx + 1, F.hy, 2, 2));
        return;
      }
      if (c === 2) {
        (api.o(e, x, n - 5, i - 3 + d, 2, 4),
          api.o(e, x, n + 3, i - 3 + d, 2, 4),
          api.o(e, x, n - 2, i - 2 + d, 5, 2),
          le(F.hx, F.hy),
          api.o(e, D, F.hx, F.hy, 2, 2));
        return;
      }
      if (c === 3) {
        (api.o(e, x, n - 5, i + d, 2, 4),
          api.o(e, x, n + 3, i + d, 2, 4),
          le(F.hx, F.hy),
          api.o(e, D, F.hx, F.hy, 2, 2));
        return;
      }
      (le(F.hx, F.hy),
        api.o(e, x, n + 5, i - 2 + d + ve, 2, 5),
        api.o(e, D, n + 5, i + 3 + d + ve, 2, 1));
    },
    q = null;
  if (!C && !g) {
    let F = c > 0;
    if (F && (f === "iskry" || f === "burza")) {
      let L = f === "burza" ? "#7ff7ff" : "#c49bff",
        ce = f === "burza" ? "#e0ffff" : "#e0ccff",
        je = c === 1 ? -2 : c === 3 ? 1 : 0,
        Be = i + 1 + d + je,
        rt = i - 25 + d + je,
        $i = u || c === 1 || c === 2;
      (api.o(e, x, n - 6, i - 2 + d, 2, 3),
        api.o(e, x, n + 4, i - 2 + d, 2, 3),
        api.o(e, x, n - 5, Be - 1, 3, 2),
        api.o(e, x, n + 2, Be - 1, 3, 2),
        (q = () => {
          (api.o(e, "#6b4423", n - 1, rt + 3, 2, Be - rt - 1),
            api.o(e, $i ? "#ffffff" : L, n - 2, rt, 4, 4),
            api.o(e, ce, n - 1, rt + 1, 1, 1),
            $i &&
              (api.o(e, L, n - 3, rt + 2, 1, 1),
              api.o(e, L, n + 2, rt + 1, 1, 1),
              api.o(e, L, n, rt - 2, 1, 1)),
            c === 2 &&
              (api.o(e, L, n - 4, rt + 1, 1, 1),
              api.o(e, L, n + 3, rt + 3, 1, 1),
              api.o(e, L, n - 1, rt - 3, 1, 1)),
            api.o(e, D, n - 3, Be - 1, 2, 2),
            api.o(e, D, n + 1, Be - 1, 2, 2));
        }));
    } else if (F) {
      let ce = c === 1 ? -3 : 0;
      (api.o(e, x, n - 6, i - 2 + d + ce, 2, 4),
        api.o(e, x, n + 4, i - 2 + d + ce, 2, 4),
        api.o(e, x, n - 5, i + 1 + d + ce + 1, 10, 2),
        api.o(e, D, n - 2, i + 2 + d + ce, 2, 2),
        api.o(e, D, n + 1, i + 2 + d + ce, 2, 2),
        le(n, i + 3 + d + (c === 1 ? -3 : 0)));
    } else
      (api.o(e, x, n - 7, i - 2 + d + ve, 2, 5),
        api.o(e, x, n + 5, i - 2 + d - ve, 2, 5),
        api.o(e, D, n - 7, i + 3 + d + ve, 2, 1),
        api.o(e, D, n + 5, i + 3 + d - ve, 2, 1),
        le(n - 8, i + 3 + d + ve));
  } else
    C
      ? api.o(e, x, n - S * 5, i - 2 + d, 2, 5)
      : c === 0 && api.o(e, x, n - 7, i - 2 + d - ve, 2, 5);
  (api.o(e, D, n - 4, i - 10 + d, 8, 7),
    api.o(e, l, n - 4, i - 4 + d, 8, 1),
    api.o(e, y, n - 5, i - 12 + d, 10, 3),
    api.o(e, b, n - 3, i - 12 + d, 4, 1),
    t.hair === 0 && (api.o(e, y, n - 2, i - 15 + d, 5, 3), api.o(e, b, n - 1, i - 15 + d, 2, 1)),
    t.hair === 1 &&
      (C
        ? (api.o(e, y, n - S * 6 - 1, i - 10 + d, 3, 7),
          api.o(e, w, n - S * 6 - 1, i - 4 + d, 3, 1),
          api.o(e, "#ff4d6d", n - S * 6 - 1, i - 10 + d, 2, 1))
        : (api.o(e, y, n - 8, i - 10 + d, 3, 7),
          api.o(e, y, n + 5, i - 10 + d, 3, 7),
          api.o(e, w, n - 8, i - 4 + d, 3, 1),
          api.o(e, w, n + 5, i - 4 + d, 3, 1),
          api.o(e, "#ff4d6d", n - 7, i - 10 + d, 2, 1),
          api.o(e, "#ff4d6d", n + 5, i - 10 + d, 2, 1))),
    t.hair === 2 && api.o(e, w, n - 5, i - 10 + d, 10, 1),
    t.hair === 3 &&
      (api.o(e, y, n - 1, i - 17 + d, 3, 6),
      api.o(e, b, n, i - 17 + d, 1, 4),
      api.o(e, w, n - 5, i - 11 + d, 3, 2),
      api.o(e, w, n + 3, i - 11 + d, 2, 2)),
    t.cls === "mag" &&
      (api.o(e, M, n - 7, i - 13 + d, 14, 2),
      api.o(e, M, n - 5, i - 16 + d, 10, 3),
      api.o(e, M, n - 3, i - 19 + d, 6, 3),
      api.o(e, M, n - 1, i - 21 + d, 3, 2),
      g || api.o(e, "#ffd84a", C ? n + S * 2 : n - 1, i - 15 + d, 2, 1)),
    g
      ? (api.o(e, y, n - 4, i - 10 + d, 8, 6),
        t.hair !== 2 && t.hair !== 3 && api.o(e, w, n - 4, i - 5 + d, 8, 1))
      : C
        ? (api.o(e, "#2a1a1a", n + S * 2, i - 7 + d, 1, 2),
          api.o(e, "#e88", n + S * 2, i - 5 + d, 1, 1),
          t.hair !== 3 && api.o(e, y, S > 0 ? n - 5 : n + 2, i - 10 + d, 3, t.hair === 2 ? 4 : 7))
        : (api.o(e, "#2a1a1a", n - 2, i - 7 + d, 1, 2),
          api.o(e, "#2a1a1a", n + 2, i - 7 + d, 1, 2),
          api.o(e, "#ffffff", n - 2, i - 7 + d, 1, 1),
          api.o(e, "#ffffff", n + 2, i - 7 + d, 1, 1),
          api.o(e, "#e88", n - 3, i - 5 + d, 1, 1),
          api.o(e, "#e88", n + 3, i - 5 + d, 1, 1),
          t.hair !== 3 &&
            (api.o(e, y, n - 5, i - 10 + d, 1, t.hair === 2 ? 3 : 6),
            api.o(e, y, n + 4, i - 10 + d, 1, t.hair === 2 ? 3 : 6))));
  let ye = t.cls === "mag";
  if (t.hair === 4) {
    let F = (k, L, ce) => {
      for (let je = 0; je < ce; je++)
        (api.o(e, y, k, L + je * 2, 2, 2), api.o(e, w, k + (je % 2), L + je * 2 + 1, 1, 1));
      (api.o(e, "#ff4d6d", k - 1, L + ce * 2, 4, 1), api.o(e, w, k, L + ce * 2 + 1, 2, 1));
    };
    g
      ? F(n - 1, i - 5 + d, 5)
      : C
        ? F(n - S * 5 - (S > 0 ? 1 : 0), i - 7 + d, 4)
        : (api.o(e, y, n + 4, i - 9 + d, 2, 4), F(n + 5, i - 5 + d, 3));
  } else if (t.hair === 5)
    g
      ? (api.o(e, y, n - 5, i - 11 + d, 10, 8), api.o(e, w, n - 5, i - 4 + d, 10, 1))
      : C
        ? (api.o(e, y, S > 0 ? n - 6 : n + 2, i - 11 + d, 4, 8),
          api.o(e, w, S > 0 ? n - 6 : n + 2, i - 4 + d, 4, 1),
          api.o(e, y, (S > 0, n - 2), i - 11 + d, 5, 2))
        : (api.o(e, y, n - 6, i - 11 + d, 2, 8),
          api.o(e, y, n + 4, i - 11 + d, 2, 8),
          api.o(e, w, n - 6, i - 4 + d, 2, 1),
          api.o(e, w, n + 4, i - 4 + d, 2, 1),
          api.o(e, y, n - 4, i - 10 + d, 8, 2),
          api.o(e, b, n - 3, i - 10 + d, 3, 1));
  else if (t.hair === 6) {
    let F = (k, L) => {
      (api.o(e, y, k, L, 3, 3), api.o(e, b, k, L, 1, 1), api.o(e, w, k + 2, L + 2, 1, 1));
    };
    if (!ye) for (let k of [-6, -3, 0, 3]) F(n + k, i - 15 + d);
    if (g) {
      api.o(e, y, n - 6, i - 12 + d, 12, 8);
      for (let [k, L] of [
        [-6, -6],
        [-3, -5],
        [0, -6],
        [3, -5],
      ])
        F(n + k, i + L + d);
    } else
      C
        ? (api.o(e, y, S > 0 ? n - 7 : n + 3, i - 12 + d, 4, 9),
          F(S > 0 ? n - 7 : n + 4, i - 5 + d),
          api.o(e, y, n - 3, i - 12 + d, 6, 2))
        : (api.o(e, y, n - 7, i - 12 + d, 3, 8),
          api.o(e, y, n + 4, i - 12 + d, 3, 8),
          F(n - 8, i - 6 + d),
          F(n + 5, i - 6 + d),
          api.o(e, y, n - 4, i - 11 + d, 8, 1));
  } else if (t.hair === 7)
    if (g) {
      (api.o(e, y, n - 5, i - 11 + d, 10, 9),
        api.o(e, y, n - 6, i - 3 + d, 2, 5),
        api.o(e, y, n + 4, i - 3 + d, 2, 5),
        api.o(e, w, n - 6, i + 2 + d, 2, 1),
        api.o(e, w, n + 4, i + 2 + d, 2, 1));
      for (let F of [-3, 0, 2]) api.o(e, w, n + F, i - 9 + d, 1, 6);
      api.o(e, b, n - 2, i - 10 + d, 1, 5);
    } else
      C
        ? (api.o(e, y, S > 0 ? n - 6 : n + 3, i - 11 + d, 3, 13),
          api.o(e, w, S > 0 ? n - 6 : n + 3, i + 1 + d, 3, 1))
        : (api.o(e, y, n - 6, i - 11 + d, 2, 12),
          api.o(e, y, n + 4, i - 11 + d, 2, 12),
          api.o(e, w, n - 6, i + d, 2, 1),
          api.o(e, w, n + 4, i + d, 2, 1),
          api.o(e, b, n - 6, i - 9 + d, 1, 4));
  (q && q(), C ? R() : g && O());
};

api.Zf = function Zf(e, t, n, i, a, r = api.qp(e), s = 0) {
  let u =
    "h" +
    [
      e.hair,
      e.hairColor,
      e.outfit,
      e.outfitColor,
      e.skin || 0,
      e.cls,
      t,
      n,
      i,
      a ? 1 : 0,
      r,
      s,
    ].join("_");
  return api.Ue(u, 44, 50, (f) => api.kh(f, e, 22, 30, t, n, i, a, r, s));
};

api.qp = function qp(e) {
  return api.et[e.cls].start;
};

api.hh = function hh(e) {
  if (e.atkT <= 0 || e.atkMax <= 0) return 0;
  let t = 1 - e.atkT / e.atkMax;
  return t < 0.3 ? 1 : t < 0.65 ? 2 : 3;
};

api.Jp = function Jp(e, t, n, i, a, r, s, u) {
  let f = a !== 0,
    c = a > 0 ? 1 : -1,
    y = r < 0 && !f,
    w = r < 0 ? -1 : 1,
    b = "#6b4423",
    x = "#8b5a2b",
    M = "#e8dcc0",
    j = "#c9ced8";
  if (t === "spinacz") {
    (api.o(e, "#c4845a", n, i - 10, 1, 3),
      api.o(e, "#d8dce2", n - 1, i - 8, 3, 2),
      api.o(e, "#8a9098", n, i - 7, 1, 6),
      api.o(e, "#d8dce2", n, i - 2, 2, 2));
    return;
  }
  if (t === "zaglada") {
    (Jp(e, "miecz", n, i, a, r, s, u),
      api.o(e, "#6a1020", n - 1, i - 12, 4, 3),
      api.o(e, "#e0b060", n, i - 14, 2, 2),
      api.o(e, "#ffb0c0", n, i - 10, 1, 6));
    return;
  }
  if (t === "eskalacja") {
    (Jp(e, "miecz", n, i, a, r, s, !0),
      api.o(
        e,
        "#7ff7ff",
        n,
        i +
          (y
            ? s === 1
              ? -11
              : s === 3
                ? 6
                : s === 2
                  ? 0
                  : -8
            : s === 0 || s === 1 || (f && (s === 0 || s === 1))
              ? -8
              : 2),
        1,
        1,
      ));
    return;
  }
  if (t === "miecz") {
    if (y) {
      if (s === 1) {
        (api.o(e, j, n, i - 12, 2, 11),
          api.o(e, "#ffffff", n, i - 12, 1, 9),
          api.o(e, "#c9a227", n - 1, i - 1, 4, 1),
          api.o(e, b, n, i, 2, 2));
        return;
      }
      if (s === 2) {
        (api.o(e, b, n, i, 2, 2),
          api.o(e, "#c9a227", n - 1, i - 1, 4, 1),
          api.o(e, j, n + 3, i, 3, 2),
          api.o(e, "#ffffff", n + 4, i, 2, 1));
        return;
      }
      if (s === 3) {
        (api.o(e, b, n, i, 2, 2),
          api.o(e, "#c9a227", n - 1, i + 2, 4, 1),
          api.o(e, j, n, i + 3, 2, 8),
          api.o(e, "#ffffff", n, i + 3, 1, 7));
        return;
      }
      (api.o(e, j, n, i - 9, 2, 8),
        api.o(e, "#ffffff", n, i - 9, 1, 6),
        api.o(e, "#c9a227", n - 1, i - 1, 4, 1),
        api.o(e, b, n, i, 2, 2));
      return;
    }
    if (s === 0 || s === 1) {
      (api.o(e, j, n, i - 9, 2, 8),
        api.o(e, "#ffffff", n, i - 9, 1, 6),
        api.o(e, "#c9a227", n - 1, i - 1, 4, 1),
        api.o(e, b, n, i, 2, 2));
      return;
    }
    let g = s === 2 ? 10 : 7,
      C = s === 3 ? 2 : 0;
    if (f) {
      (api.o(e, b, n, i, 2, 2), api.o(e, "#c9a227", n + (c > 0 ? 2 : -1), i - 1, 1, 4));
      let S = c > 0 ? n + 3 : n - 1 - g;
      (api.o(e, j, S, i + C, g, 2), api.o(e, "#ffffff", S, i + C, g, 1));
      return;
    }
    (api.o(e, b, n, i, 2, 2),
      api.o(e, "#c9a227", n - 1, i + 2, 4, 1),
      api.o(e, j, n, i + 3, 2, g),
      api.o(e, "#ffffff", n, i + 3, 1, g));
    return;
  }
  if (t === "luk") {
    let g = s === 1 ? 2 : s === 2 ? 3 : 0,
      C = s === 1 || s === 2;
    if (f) {
      let N = n;
      (api.o(e, x, N, i - 5, 2, 10),
        api.o(e, x, N - c, i - 7, 2, 2),
        api.o(e, x, N - c, i + 5, 2, 2));
      let Q = N - c * (1 + g);
      if ((api.o(e, M, Q, i - 6, 1, 12), C)) {
        let W = N + c * 4,
          _ = Math.min(Q, W),
          ie = Math.abs(W - Q) + 1;
        (api.o(e, M, _, i, ie, 1), api.o(e, "#9aa0b0", W, i - 1, 1, 3));
      }
      s === 3 && api.o(e, "rgba(255,255,255,0.6)", Q - c, i - 3, 1, 6);
      return;
    }
    if (y) {
      if (s === 2) {
        (api.o(e, x, n + 2, i - 2, 2, 5), api.o(e, M, n + 4, i - 2, 1, 5));
        return;
      }
      if (s === 3) {
        (api.o(e, x, n, i - 2, 2, 6),
          api.o(e, x, n - 1, i - 3, 2, 2),
          api.o(e, M, n + 1, i - 2, 1, 6));
        return;
      }
      let N = s === 1 ? 2 : 0;
      (api.o(e, x, n, i - 5 - N, 2, 10 + N),
        api.o(e, x, n - 1, i - 7 - N, 2, 2),
        api.o(e, x, n - 1, i + 5, 2, 2),
        api.o(e, M, n + 1 + g, i - 6 - N, 1, 12 + N),
        C && (api.o(e, M, n + 1, i, 3 + g, 1), api.o(e, "#9aa0b0", n + 4 + g, i - 1, 1, 3)));
      return;
    }
    if (s === 0) {
      (api.o(e, x, n, i - 5, 2, 10),
        api.o(e, x, n - 1, i - 7, 2, 2),
        api.o(e, x, n - 1, i + 5, 2, 2),
        api.o(e, M, n + 1, i - 6, 1, 12));
      return;
    }
    let S = i + w;
    (api.o(e, x, n - 5, S, 10, 2),
      api.o(e, x, n - 7, S - w, 2, 2),
      api.o(e, x, n + 5, S - w, 2, 2));
    let P = S - w * (1 + g);
    if ((api.o(e, M, n - 6, P, 12, 1), C)) {
      let N = Math.min(P, S + w * 4),
        Q = Math.abs(S + w * 4 - P) + 1;
      (api.o(e, M, n, N, 1, Q), api.o(e, "#9aa0b0", n - 1, S + w * 4, 3, 1));
    }
    return;
  }
  if (t === "kusza") {
    let g = s === 1 ? 2 : s === 2 ? 1 : 0,
      C = s === 1 ? 1 : 0;
    if (f) {
      let Q = n - c * g,
        W = c > 0 ? Q - 2 : Q - 6;
      (api.o(e, b, W, i - C, 9, 2), api.o(e, x, W, i - C, 9, 1));
      let _ = c > 0 ? W + 8 : W;
      (api.o(e, "#55473a", _, i - 3 - C, 1, 8),
        api.o(e, M, _ - c, i - 3 - C, 1, 8),
        s === 1 &&
          (api.o(e, "#fff4b0", _ + c, i - C, 1, 2), api.o(e, "#fff4b0", _ + c * 2, i - C, 1, 1)));
      return;
    }
    if (y) {
      if (s === 2) {
        (api.o(e, b, n + 2, i - 1, 2, 4), api.o(e, "#55473a", n + 1, i - 3, 5, 1));
        return;
      }
      if (s === 3) {
        (api.o(e, b, n, i - 1, 2, 5), api.o(e, "#55473a", n - 2, i - 1, 6, 1));
        return;
      }
      let Q = s === 1 ? 3 : 0;
      (api.o(e, b, n, i - 4 - C - Q, 2, 9 + Q),
        api.o(e, x, n, i - 4 - C - Q, 1, 9 + Q),
        api.o(e, "#55473a", n - 3, i - 4 - C - g - Q, 8, 1),
        api.o(e, M, n - 3, i - 3 - C - g - Q, 8, 1),
        s === 1 && api.o(e, "#fff4b0", n + 2, i - 4 - C - Q, 2, 1));
      return;
    }
    if (s === 0) {
      (api.o(e, b, n, i - 6, 2, 9),
        api.o(e, x, n, i - 6, 1, 9),
        api.o(e, "#55473a", n - 3, i - 6, 8, 1),
        api.o(e, M, n - 3, i - 5, 8, 1));
      return;
    }
    let S = i - w * g,
      P = w > 0 ? S - 2 : S - 6;
    api.o(e, b, n, P + C * -w, 2, 9);
    let N = w > 0 ? P + 8 : P;
    (api.o(e, "#55473a", n - 3, N, 8, 1),
      api.o(e, M, n - 3, N - w, 8, 1),
      s === 1 && api.o(e, "#fff4b0", n, N + w * 2, 2, 1));
    return;
  }
  let D = t === "burza" ? "#7ff7ff" : "#c49bff",
    l = u || s === 1 || s === 2;
  if (y) {
    if (s === 2) {
      (api.o(e, b, n + 2, i, 2, 3), api.o(e, l ? "#ffffff" : D, n + 3, i - 3, 3, 3));
      return;
    }
    if (s === 3) {
      (api.o(e, b, n, i, 2, 8), api.o(e, l ? "#ffffff" : D, n - 1, i + 7, 4, 3));
      return;
    }
    let g = s === 1 ? -10 : -12;
    (api.o(e, b, n, i + g, 2, 14),
      api.o(e, l ? "#ffffff" : D, n - 1, i + g - 3, 4, 4),
      api.o(e, t === "burza" ? "#e0ffff" : "#e0ccff", n, i + g - 2, 1, 1),
      l &&
        (api.o(e, D, n - 2, i + g - 1, 1, 1),
        api.o(e, D, n + 3, i + g - 2, 1, 1),
        api.o(e, D, n + 1, i + g - 5, 1, 1)));
    return;
  }
  let d = -12,
    v = f && s === 2 ? c * 1 : 0;
  (api.o(e, b, n + v, i + d, 2, 14),
    api.o(e, l ? "#ffffff" : D, n - 1 + v, i + d - 3, 4, 4),
    api.o(e, t === "burza" ? "#e0ffff" : "#e0ccff", n + v, i + d - 2, 1, 1),
    l &&
      (api.o(e, D, n - 2 + v, i + d - 1, 1, 1),
      api.o(e, D, n + 3 + v, i + d - 2, 1, 1),
      api.o(e, D, n + 1 + v, i + d - 5, 1, 1)),
    s === 2 && api.o(e, D, n + v + (f ? c * 4 : 0), i + d - 1 + (f ? 0 : w * 3), 1, 1));
};

api.Xp = function Xp(e, t) {
  return api.Ue("n" + e + t, 20, 28, (n) => {
    let r = t ? -1 : 0;
    if ((api.o(n, "rgba(0,0,0,0.28)", 4, 26, 12, 3), e === "kot")) {
      (api.o(n, "#e08a3a", 4, 20 + r, 12, 6),
        api.o(n, "#e08a3a", 13, 16 + r, 6, 5),
        api.o(n, "#e08a3a", 13, 14 + r, 2, 2),
        api.o(n, "#e08a3a", 17, 14 + r, 2, 2),
        api.o(n, "#b0602a", 6, 21 + r, 2, 4),
        api.o(n, "#b0602a", 10, 21 + r, 2, 4),
        api.o(n, "#e08a3a", 1, 17 + (t ? 0 : 1), 2, 5),
        api.o(n, "#2a1a1a", 15, 17 + r, 1, 1),
        api.o(n, "#2a1a1a", 17, 17 + r, 1, 1));
      return;
    }
    let s = {
        bogdan: { body: "#7a5230", head: "#f1c7a0", hair: "#d8d8e0", extra: "beard" },
        jadzia: { body: "#8a3a5a", head: "#f1c7a0", hair: "#e8e8f0", extra: "shawl" },
        kamila: { body: "#2b4a7a", head: "#f1c7a0", hair: "#1e1a1a", extra: "mug" },
        zenek: { body: "#4a6a2a", head: "#e8b890", hair: "#5a3a20", extra: "hat" },
        halina: { body: "#3b2b5b", head: "#a8d890", hair: "#2b1b3b", extra: "witch" },
        mietek: { body: "#8a2a2a", head: "#f1c7a0", hair: "#3a2418", extra: "apron" },
        zbyszek: { body: "#2a6a6a", head: "#f1c7a0", hair: "#d9a03a", extra: "bard" },
        wanda: { body: "#4a3a32", head: "#e8b890", hair: "#c0392b", extra: "smith" },
        piotr: { body: "#3a5a7a", head: "#f1c7a0", hair: "#2b2b33", extra: "beard" },
        basia: { body: "#5a3a7a", head: "#f1c7a0", hair: "#f2d16b", extra: "shawl" },
        ghost: { body: "#6a8a9a", head: "#d0e0e8", hair: "#e8e8f0", extra: "shawl" },
        lidia: { body: "#1a3a1a", head: "#6adf6a", hair: "#c49bff", extra: "beard" },
        horacy: { body: "#5a4a32", head: "#e8b890", hair: "#c8c8d0", extra: "clock" },
        iga: { body: "#2a6a5a", head: "#f1c7a0", hair: "#3adf9a", extra: "alch" },
        gienia: { body: "#1f4a55", head: "#f1c7a0", hair: "#2a2418", extra: "alch" },
        wicek: { body: "#6a8a3a", head: "#e8b890", hair: "#5a3a20", extra: "hat" },
        genowefa: { body: "#a85a78", head: "#f1c7a0", hair: "#c8c8d0", extra: "shawl" },
        franek: { body: "#8a5a32", head: "#e8b890", hair: "#6a5a4a", extra: "beard" },
        roma: { body: "#243044", head: "#f1c7a0", hair: "#e8e8f0", extra: "shawl" },
      },
      u = s[e === "zbyszek0" ? "zbyszek" : e] || s.bogdan;
    (api.o(n, "#3b2a20", 6, 23, 3, 4),
      api.o(n, "#3b2a20", 11, 23, 3, 4),
      api.o(n, u.body, 4, 16 + r, 12, 9),
      api.o(n, api.ot(u.body, 0.25), 5, 16 + r, 10, 1),
      api.o(n, api.ot(u.body, -0.3), 4, 24 + r, 12, 1),
      api.o(n, u.head, 6, 9 + r, 8, 7),
      api.o(n, u.hair, 5, 7 + r, 10, 3),
      api.o(n, "#2a1a1a", 8, 12 + r, 1, 1),
      api.o(n, "#2a1a1a", 12, 12 + r, 1, 1),
      u.extra === "beard" &&
        (api.o(n, "#e8e8f0", 6, 14 + r, 8, 5),
        api.o(n, "#c8c8d0", 7, 18 + r, 6, 1),
        api.o(n, "#9aa0b0", 17, 10 + r, 2, 16),
        api.o(n, "#c0c0d0", 16, 9 + r, 4, 2)),
      u.extra === "shawl" &&
        (api.o(n, "#c84a6a", 4, 16 + r, 12, 3),
        api.o(n, "#e8e8f0", 7, 5 + r, 6, 3),
        api.o(n, "#6b4423", 1, 18 + r, 2, 10)),
      u.extra === "mug" &&
        (api.o(n, "#ffffff", 15, 19 + r, 4, 4),
        api.o(n, "#6b3a1a", 16, 19 + r, 2, 1),
        api.o(n, "#e8e8e8", 6, 16 + r, 8, 2),
        api.o(n, u.hair, 4, 8 + r, 2, 7),
        api.o(n, u.hair, 14, 8 + r, 2, 7)),
      u.extra === "hat" &&
        (api.o(n, "#3a5a1a", 3, 6 + r, 14, 2),
        api.o(n, "#3a5a1a", 6, 3 + r, 8, 3),
        api.o(n, "#d23", 12, 3 + r, 1, 3),
        api.o(n, "#8b5a2b", 16, 11 + r, 2, 13)),
      u.extra === "apron" &&
        (api.o(n, "#f4ecd8", 6, 17 + r, 8, 8),
        api.o(n, "#d8ccb0", 6, 24 + r, 8, 1),
        api.o(n, "#3a2418", 7, 14 + r, 6, 1),
        api.o(n, "#c8c8d0", 16, 18 + r, 3, 4),
        api.o(n, "#ffffff", 16, 18 + r, 3, 1)),
      u.extra === "bard" &&
        (api.o(n, "#7b4fd1", 4, 5 + r, 12, 3),
        api.o(n, "#ffd84a", 14, 1 + r, 1, 5),
        api.o(n, "#ff4d6d", 15, 0 + r, 2, 2),
        e === "zbyszek"
          ? (api.o(n, "#a0703a", 1, 18 + r, 6, 7),
            api.o(n, "#6b4423", 3, 11 + r, 2, 8),
            api.o(n, "#2a1a10", 3, 20 + r, 2, 2))
          : (api.o(n, "#c8c8d0", 2, 19 + r, 1, 4),
            api.o(n, "#c8c8d0", 4, 19 + r, 1, 4),
            api.o(n, "#e8e8f0", 2, 18 + r, 1, 1),
            api.o(n, "#e8e8f0", 4, 18 + r, 1, 1))),
      u.extra === "smith" &&
        (api.o(n, "#6b4423", 5, 17 + r, 10, 8),
        api.o(n, "#4a2e18", 5, 24 + r, 10, 1),
        api.o(n, "#8a8fa0", 16, 12 + r, 4, 3),
        api.o(n, "#6b4423", 17, 15 + r, 2, 9),
        api.o(n, u.hair, 4, 8 + r, 2, 5)),
      u.extra === "witch" &&
        (api.o(n, u.hair, 2, 7 + r, 16, 2),
        api.o(n, u.hair, 6, 2 + r, 8, 5),
        api.o(n, u.hair, 9, -2 + r, 4, 4),
        api.o(n, "#ff9a3c", 16, 13 + r, 3, 3),
        api.o(n, "#7a2a8a", 6, 6 + r, 8, 1)),
      u.extra === "clock" &&
        (api.o(n, "#c9a227", 4, 4 + r, 12, 3),
        api.o(n, "#fff4d8", 7, 6 + r, 6, 6),
        api.o(n, "#1b1424", 9, 8 + r, 1, 3),
        api.o(n, "#1b1424", 9, 8 + r, 3, 1),
        api.o(n, "#8a8fa0", 15, 18 + r, 4, 4)),
      u.extra === "alch" &&
        (api.o(n, "#5cf28a", 5, 4 + r, 10, 3),
        api.o(n, "#1a3a2a", 6, 6 + r, 8, 8),
        api.o(n, "#7ff7ff", 8, 8 + r, 2, 4),
        api.o(n, "#ff8fa3", 11, 9 + r, 2, 3),
        api.o(n, "#c49bff", 16, 16 + r, 3, 5)));
  });
};

api.zh = function zh(e, t, n, i, a, r, s) {
  let u = r < 0 && a === 0,
    f = a !== 0,
    c = a > 0 ? 1 : -1,
    y = s % 2 === 1 ? -1 : 0,
    w = s === 1 ? -1 : s === 3 ? 1 : 0,
    b = t.kid ? 3 : 0,
    x = i - 4 + b + y,
    M = 8 - b,
    j = x - 7,
    D = api.ot(t.body, -0.3),
    l = api.ot(t.body, 0.25),
    d = api.ot(t.hair, -0.3),
    v = api.ot(t.legs, -0.3);
  api.o(e, "rgba(0,0,0,0.28)", n - 6, i + 6, 12, 3);
  let g = f && c > 0 && t.extra === "folder",
    C = g ? n - 5 - w : f ? n + c * 2 + w * c : u ? n - 6 : n + 5,
    S = x + 5 + (f ? 0 : -w),
    P = () => {
      let W = t.extra,
        _ = C,
        ie = S;
      W === "folder"
        ? (api.o(e, "#c0392b", _ - 1, ie - 3, 5, 6), api.o(e, "#e8d8b0", _, ie - 2, 3, 1))
        : W === "shovel"
          ? (api.o(e, "#6b4423", _, ie - 11, 1, 15), api.o(e, "#8a8fa0", _ - 1, ie + 3, 3, 3))
          : W === "pie"
            ? (api.o(e, "#c89050", _ - 2, ie - 1, 6, 3), api.o(e, "#e8c060", _ - 1, ie - 1, 4, 1))
            : W === "box"
              ? (api.o(e, "#b08850", _ - 2, ie - 4, 6, 5), api.o(e, "#e8d070", _, ie - 4, 1, 5))
              : W === "crook"
                ? (api.o(e, "#8b5a2b", _, ie - 13, 1, 16),
                  api.o(e, "#8b5a2b", _ - 2, ie - 14, 3, 1),
                  api.o(e, "#8b5a2b", _ - 2, ie - 13, 1, 2))
                : W === "rod"
                  ? (api.o(e, "#6b4423", _, ie - 14, 1, 17),
                    api.o(e, "#d8d8e0", _ + 1, ie - 14, 1, 1))
                  : W === "mug" &&
                    (api.o(e, "#f4ecd8", _ - 1, ie - 2, 3, 3),
                    api.o(e, "#c89050", _ - 1, ie - 2, 3, 1));
    };
  (f
    ? (api.o(e, v, n - 1 - w * c, i + 3, 3, 4), api.o(e, t.legs, n - 2 + w * c, i + 3, 3, 4))
    : (api.o(e, t.legs, n - 4, i + 3 + w, 3, 4 - w), api.o(e, t.legs, n + 1, i + 3 - w, 3, 4 + w)),
    (u || g) && P(),
    f && api.o(e, D, n - c * 3 - (c > 0 ? 1 : 0), x + 1 - w, 2, 5),
    f
      ? (api.o(e, t.body, n - 4, x, 8, M),
        api.o(e, l, n - 3, x, 6, 1),
        api.o(e, D, n - 4, x + M - 1, 8, 1))
      : (api.o(e, t.body, n - 5, x, 10, M),
        api.o(e, l, n - 4, x, 8, 1),
        api.o(e, D, n - 5, x + M - 1, 10, 1)),
    t.extra === "shovel" &&
      (f ? api.o(e, "#f4f4a0", n - 4, x + 3, 8, 1) : api.o(e, "#f4f4a0", n - 5, x + 3, 10, 1)),
    f
      ? (api.o(e, D, n + c * 1 + w * c - (c < 0 ? 1 : 0), x + 1, 2, 5),
        api.o(e, t.head, n + c * 1 + w * c - (c < 0 ? 1 : 0), x + 5, 2, 1))
      : (api.o(e, t.body, n - 7, x + 1 + w, 2, 5),
        api.o(e, t.body, n + 5, x + 1 - w, 2, 5),
        api.o(e, t.head, n - 7, x + 5 + w, 2, 1),
        api.o(e, t.head, n + 5, x + 5 - w, 2, 1)),
    api.o(e, t.head, n - 4, j, 8, 7),
    api.o(e, api.ot(t.head, -0.15), n - 4, j + 6, 8, 1));
  let N = (W, _, ie, ze) => {
      if (!t.ombre) {
        api.o(e, t.hair, W, _, ie, ze);
        return;
      }
      for (let ke = 0; ke < ze; ke++) {
        let le = _ + ke - (j - 2);
        api.o(
          e,
          le < 5 ? t.ombre[0] : le < 7 ? "#3a3026" : le < 9 ? t.ombre[1] : t.ombre[2],
          W,
          _ + ke,
          ie,
          1,
        );
      }
    },
    Q = t.style === 3;
  (Q
    ? (api.o(e, t.hair, n - 5, j + 1, 1, 3), api.o(e, t.hair, n + 4, j + 1, 1, 3))
    : (N(n - 5, j - 2, 10, 3), t.ombre || api.o(e, api.ot(t.hair, 0.3), n - 3, j - 2, 4, 1)),
    t.style === 2 && (api.o(e, t.hair, n - 2, j - 5, 5, 3), api.o(e, d, n - 2, j - 3, 5, 1)),
    u
      ? Q
        ? api.o(e, api.ot(t.head, -0.1), n - 4, j, 8, 5)
        : t.ombre
          ? N(n - 6, j, 12, 10)
          : N(n - 4, j, 8, t.style === 1 ? 8 : 5)
      : f
        ? (api.o(e, "#2a1a1a", n + c * 2, j + 3, 1, 2),
          api.o(e, "#e88", n + c * 2, j + 5, 1, 1),
          Q || N(c > 0 ? n - 5 : n + 2, j - 1, 3, t.style === 1 ? (t.ombre ? 11 : 8) : 4),
          t.extra === "beard" && api.o(e, "#e8e8f0", c > 0 ? n : n - 4, j + 4, 4, 4))
        : (api.o(e, "#2a1a1a", n - 2, j + 3, 1, 2),
          api.o(e, "#2a1a1a", n + 2, j + 3, 1, 2),
          api.o(e, "#e88", n - 3, j + 5, 1, 1),
          api.o(e, "#e88", n + 3, j + 5, 1, 1),
          t.style === 1
            ? (N(n - 6, j, 2, t.ombre ? 10 : 8), N(n + 4, j, 2, t.ombre ? 10 : 8))
            : Q || (api.o(e, t.hair, n - 5, j, 1, 3), api.o(e, t.hair, n + 4, j, 1, 3)),
          t.extra === "beard" &&
            (api.o(e, "#e8e8f0", n - 3, j + 4, 6, 5), api.o(e, "#c8c8d0", n - 2, j + 8, 4, 1))),
    t.extra === "cap" &&
      (api.o(e, "#d23a3a", n - 5, j - 3, 10, 3),
      f
        ? api.o(e, "#a02020", n + c * 3 - (c < 0 ? 3 : 0), j - 1, 4, 1)
        : u || api.o(e, "#a02020", n - 4, j, 8, 1)),
    t.extra === "hat" &&
      (api.o(e, "#4a6a2a", n - 7, j - 1, 14, 1), api.o(e, "#5a7a2a", n - 4, j - 4, 8, 3)),
    t.extra === "straw" &&
      (api.o(e, "#e8c860", n - 7, j - 1, 14, 2),
      api.o(e, "#d8b040", n - 4, j - 3, 8, 2),
      api.o(e, "#c0392b", n - 4, j - 1, 8, 1)),
    t.extra === "folder" && t.style === 1 && !u && !f && api.o(e, "#d8d8e0", n - 3, j + 2, 6, 1),
    !u && !g && P());
};

api.Yp = function Yp(e, t, n, i) {
  return api.Ue("w" + e + "_" + t + "_" + n + "_" + i, 22, 34, (a) =>
    api.zh(a, api.Is[e], 11, 24, t, n, i),
  );
};

api.e2 = function e2(e, t) {
  return t === "zbyszek" && !e.f.luteDone ? "zbyszek0" : t;
};

api.t2 = function t2(e) {
  return api.Is[e] ? -24 + api.pp(e) : -21 + api.pp(e);
};

api.pp = function pp(e) {
  let t = api.cp.get(e);
  if (t !== void 0) return t;
  let n = 34;
  for (let i of [0, 1]) {
    let a = api.Is[e] ? api.Yp(e, 0, 1, i) : api.Xp(e, i),
      r = api.Vn(a).getImageData(0, 0, a.width, a.height).data;
    for (let s = 0; s < a.height && s < n; s++) {
      let u = !1;
      for (let f = 0; f < a.width; f++)
        if (r[(s * a.width + f) * 4 + 3] > 0) {
          u = !0;
          break;
        }
      if (u) {
        n = s;
        break;
      }
    }
  }
  return (api.cp.set(e, n), n);
};

api.wh = function wh(e, t, n) {
  for (let i of t.npcs) {
    let a = api.Af(e, i),
      r = a.x,
      s = a.y;
    if (Math.abs(r - n.x) < 12 && n.y - s > -10 && n.y - s < 22)
      return s + api.t2(api.e2(e, i.id)) - 2 - 13 - 8;
  }
  return n.y - 26;
};
