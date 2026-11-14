// @ts-nocheck
/* Kafelki terenu, ściany i podłoże.
   Nazwy wewnętrzne zostały po minifikacji — logika jest ta sama co w oryginalnej paczce. */
import { api } from "../runtime/api.js";

api.i2 = function i2(e, t, n, i, a, r) {
  let s = i * api.T,
    u = a * api.T,
    f = api.Ws[n.theme],
    c = r != null ? r : api.Pe(t, n.id, i, a),
    y = n.theme,
    w = api.me(i, a, n.id),
    b = () => {
      for (let d = 0; d < 4; d++)
        for (let v = 0; v < 4; v++) {
          let g = i * 4 + v,
            C = a * 4 + d,
            S =
              api.mp(g * 0.07, C * 0.07, n.id + 3) * 0.75 +
              api.mp(g * 0.3, C * 0.3, n.id + 9) * 0.25 +
              (api.me(g, C, 4) - 0.5) * 0.12;
          api.o(
            e,
            S > 0.66 ? f.g2 : S > 0.45 ? f.g0 : S > 0.3 ? f.g1 : f.g3,
            s + v * 4,
            u + d * 4,
            4,
            4,
          );
        }
      let l = api.Pe(t, n.id, i, a - 1);
      (l === "t" || l === "h" || l === "#" || l === "M") &&
        api.o(e, "rgba(10,30,20,0.22)", s, u, api.T, 4);
      for (let d = 0; d < 7; d++) {
        let v = Math.floor(api.me(i, a, d + 10) * 16),
          g = Math.floor(api.me(i, a, d + 30) * 16);
        api.o(e, d < 3 ? f.g2 : f.g3, s + v, u + g, 1, 1);
      }
      if (w < 0.35) {
        let d = Math.floor(api.me(i, a, 77) * 12) + 2,
          v = Math.floor(api.me(i, a, 78) * 10) + 4;
        (api.o(e, f.g2, s + d, u + v, 1, 2),
          api.o(e, f.g2, s + d + 2, u + v - 1, 1, 3),
          api.o(e, f.g3, s + d + 1, u + v + 1, 1, 1));
      }
    },
    x = () => {
      (api.o(e, f.g0, s, u, api.T, api.T),
        api.o(e, f.g3, s, u + 15, api.T, 1),
        api.o(e, f.g3, s + 15, u, 1, api.T),
        api.o(e, f.g2, s, u, api.T, 1),
        api.o(e, f.g2, s, u, 1, api.T),
        w < 0.3 && (api.o(e, f.g3, s + 4, u + 6, 5, 1), api.o(e, f.g3, s + 8, u + 7, 1, 3)),
        w > 0.82 &&
          (api.o(e, "#5a7a3a", s + 2, u + 11, 4, 2), api.o(e, "#6e9a48", s + 3, u + 11, 2, 1)),
        api.me(i, a, 5) < 0.15 && api.o(e, f.g1, s + 9, u + 3, 4, 4));
    },
    M = () => {
      (api.o(e, f.g0, s, u, api.T, api.T),
        api.o(e, f.g1, s, u + 8, api.T, 1),
        api.o(e, f.g1, s + 8, u, 1, api.T),
        api.o(e, f.g2, s, u, api.T, 1),
        api.o(e, "#4a5080", s + 2, u + 2, 1, 1),
        api.o(e, "#4a5080", s + 13, u + 2, 1, 1),
        api.o(e, "#4a5080", s + 2, u + 13, 1, 1),
        api.o(e, "#4a5080", s + 13, u + 13, 1, 1),
        w < 0.2 &&
          (api.o(e, "#1a1c30", s, u + 5, api.T, 2), api.o(e, "#5a3a8a", s + 3, u + 5, 2, 1)));
    },
    j = () => {
      api.o(e, f.g0, s, u, api.T, api.T);
      for (let d = 0; d < 4; d++) {
        api.o(e, f.g1, s, u + d * 4 + 3, api.T, 1);
        let v = Math.floor(api.me(i, a * 4 + d, 31) * 14) + 1;
        api.o(e, f.g3, s + v, u + d * 4, 1, 3);
      }
      (api.o(e, f.g2, s, u, api.T, 1), w < 0.18 && api.o(e, f.g3, s + 5, u + 6, 2, 1));
      let l = api.Pe(t, n.id, i, a - 1);
      (l === "#" || l === "K" || l === "F" || l === "O") &&
        api.o(e, "rgba(20,8,0,0.35)", s, u, api.T, 5);
    },
    D = () =>
      y === "ruins" || y === "depot" || y === "undead"
        ? x()
        : y === "server"
          ? M()
          : y === "inn"
            ? j()
            : b();
  if (c === "E" || c === "N" || c === "B" || c === "j" || c === "J") {
    D();
    if (c === "E") {
      let open = !api.Qo(t, "E");
      open
        ? api.o(e, "#9a9aa8", s, u, api.T, 2)
        : (api.o(e, "#2a2620", s, u, api.T, api.T),
          api.o(e, "#9a9aa8", s + 1, u, 2, api.T),
          api.o(e, "#9a9aa8", s + 6, u, 2, api.T),
          api.o(e, "#9a9aa8", s + 11, u, 2, api.T),
          api.o(e, "#c49bff", s + 6, u + 6, 4, 4));
    } else if (c === "N") {
      let on = !!t.f["tog:" + n.id + ":" + i + ":" + a];
      (api.o(e, "#5a3a1e", s + 6, u + 6, 4, 10),
        api.o(e, on ? "#5cf28a" : "#c0392b", s + 4, u + 2, 8, 5),
        api.o(e, "#1b1424", s + 7, u + 4, 2, 2));
    } else api.o(e, "rgba(0,0,0,0.22)", s + 1, u + 12, 14, 3);
    return;
  }
  if (c === "U") {
    x();
    for (let l = 0; l < 4; l++)
      (api.o(e, l % 2 ? "#6e6a5a" : "#8a8570", s, u + l * 4, api.T, 4),
        api.o(e, "#3e3a30", s, u + l * 4 + 3, api.T, 1));
    (api.o(e, "#1a120c", s + 3, u + 3, 10, 10),
      api.o(e, "#07060a", s + 4, u + 4, 8, 8),
      api.o(e, "#e0b060", s + 5, u + 3, 1, 10),
      api.o(e, "#e0b060", s + 10, u + 3, 1, 10),
      api.o(e, "#c89040", s + 5, u + 6, 6, 1),
      api.o(e, "#c89040", s + 5, u + 9, 6, 1));
    return;
  }
  if (c === "_") {
    (api.o(e, "#3a2412", s, u, api.T, api.T),
      api.o(e, "#7a4a22", s + 2, u + 1, 12, 13),
      api.o(e, "#5a3a1e", s + 5, u + 1, 1, 13),
      api.o(e, "#5a3a1e", s + 9, u + 1, 1, 13),
      api.o(e, "#c9a676", s + 11, u + 7, 2, 2));
    return;
  }
  if (y === "inn") {
    if (c === "#") {
      api.Pe(t, n.id, i, a + 1) !== "#" && a < n.h - 1 && i > 0 && i < n.w - 1
        ? (api.o(e, "#d8c4a0", s, u, api.T, api.T),
          api.o(e, "#c4ae88", s, u + 8, api.T, 1),
          api.o(e, "#5a3a1e", s, u, api.T, 3),
          api.o(e, "#5a3a1e", s + (i % 3 === 0 ? 0 : 15), u, 1, api.T),
          api.o(e, "#7a4a22", s, u + 10, api.T, 6),
          api.o(e, "#9a6232", s, u + 10, api.T, 1),
          api.o(e, "#3a2412", s, u + 15, api.T, 1),
          i % 4 === 1 &&
            a === 1 &&
            (api.o(e, "#3a2412", s + 3, u + 3, 10, 6),
            api.o(e, "#9ad0ff", s + 4, u + 4, 8, 4),
            api.o(e, "#3a2412", s + 7, u + 4, 1, 4)))
        : (api.o(e, "#24160e", s, u, api.T, api.T),
          api.o(e, "#3a2418", s, u, api.T, 1),
          api.o(e, "#2e1c12", s + 4, u + 6, 8, 1));
      return;
    }
    if (c === "K" || c === "F" || c === "O") {
      (D(), api.o(e, "rgba(0,0,0,0.22)", s + 1, u + 12, 14, 3));
      return;
    }
    if ((D(), c === "C" || c === "T" || c === "B" || c === "A")) {
      api.o(e, "rgba(0,0,0,0.22)", s + 1, u + 12, 14, 3);
      return;
    }
    if (c === "c") {
      (api.o(e, "rgba(0,0,0,0.25)", s + 4, u + 11, 8, 2),
        api.o(e, "#6b4423", s + 4, u + 6, 8, 5),
        api.o(e, "#8b5a2b", s + 4, u + 6, 8, 1),
        api.o(e, "#4a2e18", s + 5, u + 11, 1, 2),
        api.o(e, "#4a2e18", s + 10, u + 11, 1, 2));
      return;
    }
    if (c === "R") {
      (api.o(e, "#8a2a2a", s, u + 1, api.T, 14),
        api.o(e, "#c0392b", s + 1, u + 2, 14, 12),
        api.o(e, "#ffd84a", s + 3 + (i % 2) * 6, u + 6, 4, 4),
        api.o(e, "#6a1a1a", s, u + 1, api.T, 1));
      return;
    }
    if (c === "_") {
      (api.o(e, "#3a2412", s, u, api.T, api.T),
        api.o(e, "#7a4a22", s + 2, u + 1, 12, 13),
        api.o(e, "#5a3a1e", s + 5, u + 1, 1, 13),
        api.o(e, "#5a3a1e", s + 9, u + 1, 1, 13),
        api.o(e, "#c9a676", s + 11, u + 7, 2, 2));
      return;
    }
    if (c === "V") {
      (api.o(e, "#1a1020", s, u, api.T, api.T),
        t.f.westKey && t.f.southKey
          ? (api.o(e, "#2a5a2a", s + 2, u + 2, 12, 12), api.o(e, "#6adf6a", s + 5, u + 5, 6, 6))
          : (api.o(e, "#3a2a4a", s + 2, u + 2, 12, 12), api.o(e, "#5a4a6a", s + 5, u + 5, 6, 6)));
      return;
    }
    if (c === "Y") {
      if ((api.o(e, "#4a2e18", s + 1, u + 1, 14, 14), t.f.cellarQ)) {
        api.o(e, "#120a06", s + 2, u + 2, 12, 12);
        for (let l = 0; l < 3; l++) api.o(e, "#8b5a2b", s + 4, u + 4 + l * 4, 8, 1);
      } else
        (api.o(e, "#8b5a2b", s + 2, u + 2, 12, 12),
          api.o(e, "#6b4423", s + 2, u + 7, 12, 1),
          api.o(e, "#c9a227", s + 7, u + 9, 3, 3));
      return;
    }
    return;
  }
  if (c === ":") {
    (b(), api.o(e, f.d0, s, u, api.T, api.T));
    for (let d = 0; d < 6; d++)
      api.o(
        e,
        d % 2 ? f.d1 : f.d2,
        s + Math.floor(api.me(i, a, d + 50) * 15),
        u + Math.floor(api.me(i, a, d + 60) * 15),
        d === 0 ? 2 : 1,
        1,
      );
    let l = (d, v) => {
      let g = api.Pe(t, n.id, i + d, a + v);
      return g !== ":" && g !== "=" && g !== "H" && g !== "P";
    };
    for (let d = 0; d < 16; d += 2) {
      let v = Math.floor(api.me(i, a, 90 + d) * 3);
      (l(0, -1) && api.o(e, f.g1, s + d, u, 2, v),
        l(0, 1) && api.o(e, f.g1, s + d, u + 16 - v, 2, v),
        l(-1, 0) && api.o(e, f.g1, s, u + d, v, 2),
        l(1, 0) && api.o(e, f.g1, s + 16 - v, u + d, v, 2));
    }
    return;
  }
  if (c === "w") {
    (api.o(e, "#2f62b0", s, u, api.T, api.T),
      api.o(e, "#3a74c8", s + 1, u + 1, 14, 14),
      w < 0.5 && api.o(e, "#4a88d8", s + Math.floor(w * 20), u + 6, 4, 1));
    let l = (d, v) => {
      let g = api.Pe(t, n.id, i + d, a + v);
      return g !== "w" && g !== "=";
    };
    (l(0, -1) && (api.o(e, "#26508f", s, u, api.T, 3), api.o(e, "#bfe0ff", s, u + 3, api.T, 1)),
      l(0, 1) && api.o(e, "#bfe0ff", s, u + 15, api.T, 1),
      l(-1, 0) && api.o(e, "#bfe0ff", s, u, 1, api.T),
      l(1, 0) && api.o(e, "#bfe0ff", s + 15, u, 1, api.T));
    return;
  }
  if (c === "=") {
    (api.o(e, "#2f62b0", s, u, api.T, api.T), api.o(e, "#8b5a2b", s, u + 1, api.T, 14));
    for (let l = 0; l < 4; l++)
      (api.o(e, "#a8743c", s + l * 4, u + 1, 3, 14),
        api.o(e, "#5a3a1a", s + l * 4 + 3, u + 1, 1, 14));
    (api.o(e, "#5a3a1a", s, u + 1, api.T, 1), api.o(e, "#5a3a1a", s, u + 14, api.T, 1));
    return;
  }
  if (c === "#") {
    if (y === "ruins" || y === "depot" || y === "undead") {
      let l = api.Pe(t, n.id, i, a + 1),
        d = !api.n2(l) && l !== "L";
      api.o(e, "#3e3a30", s, u, api.T, api.T);
      for (let v = 0; v < 4; v++)
        for (let g = 0; g < 2; g++) {
          let C = (v % 2) * 4;
          api.o(
            e,
            api.me(i * 3 + g, a * 5 + v, 3) < 0.5 ? "#5a5546" : "#524d40",
            s + C + g * 8,
            u + v * 4,
            7,
            3,
          );
        }
      if (d) {
        api.o(e, "#2e2a22", s, u + 10, api.T, 6);
        for (let v = 0; v < 4; v++) api.o(e, "#45403a", s + v * 4 + 1, u + 11, 3, 2);
        (api.o(e, "#24201a", s, u + 15, api.T, 1), api.o(e, "#6a6552", s, u, api.T, 1));
      }
      w > 0.85 &&
        (api.o(e, "#4e7a34", s + 2, u + 2, 3, 6), api.o(e, "#6e9a48", s + 3, u + 2, 1, 4));
    } else if (y === "server") {
      (api.o(e, "#14162a", s, u, api.T, api.T),
        api.o(e, "#22253e", s + 1, u + 1, 14, 14),
        api.o(e, "#2e3250", s + 2, u + 2, 12, 2));
      for (let l = 0; l < 3; l++) api.o(e, "#0e1020", s + 2, u + 6 + l * 3, 12, 1);
    } else
      (b(),
        api.o(e, "#5a5546", s, u, api.T, api.T),
        api.o(e, "#6e6a58", s + 1, u + 1, 14, 6),
        api.o(e, "#4a4638", s, u + 12, api.T, 4));
    return;
  }
  if (c === "X") {
    (y === "ruins"
      ? i2(e, t, n, i, a, "#")
      : (b(),
        api.o(e, "#5a5546", s, u, api.T, api.T),
        api.o(e, "#6e6a58", s + 1, u + 1, 14, 6),
        api.o(e, "#4a4638", s, u + 12, api.T, 4)),
      api.o(e, "#1a1712", s + 7, u + 2, 1, 4),
      api.o(e, "#1a1712", s + 6, u + 5, 1, 3),
      api.o(e, "#1a1712", s + 8, u + 7, 1, 4),
      api.o(e, "#1a1712", s + 4, u + 9, 3, 1),
      api.o(e, "#1a1712", s + 9, u + 4, 3, 1));
    return;
  }
  if ((D(), c === "M")) {
    api.o(e, "rgba(0,0,0,0.28)", s, u + 8, api.T, 8);
    return;
  }
  if (c === ",") {
    let l =
      y === "garden"
        ? ["#ff8fa3", "#ffd84a", "#c49bff", "#ffffff", "#ff7a3a"]
        : ["#ff8fa3", "#ffd84a", "#ffffff"];
    for (let d = 0; d < (y === "garden" ? 4 : 2); d++) {
      let v = s + 2 + Math.floor(api.me(i, a, d + 100) * 11),
        g = u + 2 + Math.floor(api.me(i, a, d + 110) * 11),
        C = l[Math.floor(api.me(i, a, d + 120) * l.length)];
      (api.o(e, f.g3, v + 1, g + 2, 1, 2),
        api.o(e, C, v, g, 3, 1),
        api.o(e, C, v + 1, g - 1, 1, 3),
        api.o(e, "#ffe9a0", v + 1, g, 1, 1));
    }
  } else if (c === "t")
    (api.o(e, "rgba(0,0,0,0.25)", s + 1, u + 10, 14, 6),
      y === "forest"
        ? (api.o(e, f.trunk, s + 6, u + 8, 4, 8),
          api.o(e, api.ot(f.trunk, -0.3), s + 9, u + 8, 1, 8),
          api.o(e, "#2a1a10", s + 5, u + 15, 6, 1))
        : (api.o(e, f.trunk, s + 6, u + 8, 4, 8),
          api.o(e, api.ot(f.trunk, 0.2), s + 6, u + 8, 1, 8),
          api.o(e, "#3a2414", s + 4, u + 15, 3, 1),
          api.o(e, "#3a2414", s + 9, u + 15, 3, 1)));
  else if (c === "r")
    (api.o(e, "rgba(0,0,0,0.25)", s + 2, u + 12, 13, 3),
      api.o(e, "#5b5b63", s + 2, u + 4, 12, 10),
      api.o(e, "#7d7d86", s + 3, u + 4, 10, 8),
      api.o(e, "#9c9ca6", s + 4, u + 5, 6, 3),
      api.o(e, "#c0c0c8", s + 5, u + 5, 2, 1),
      api.o(e, "#46464e", s + 3, u + 13, 10, 1));
  else if (c === "b")
    (api.o(e, "rgba(0,0,0,0.25)", s + 1, u + 12, 14, 3),
      api.o(e, "#1f5a22", s + 1, u + 4, 14, 10),
      api.o(e, "#2f7d32", s + 2, u + 3, 12, 10),
      api.o(e, "#46a447", s + 3, u + 3, 6, 4),
      api.o(e, "#46a447", s + 9, u + 7, 4, 3),
      api.o(e, "#6cc45c", s + 4, u + 3, 2, 1),
      w < 0.4 &&
        (api.o(e, "#d23a4a", s + 5, u + 8, 2, 2), api.o(e, "#d23a4a", s + 10, u + 5, 2, 2)));
  else if (c === "f") {
    api.o(e, "#3a2a1a", s, u + 2, api.T, 13);
    for (let l = 0; l < 5; l++)
      (api.o(e, "#6b4a2a", s + l * 3, u + 3 + (l % 2) * 5, 3, 1),
        api.o(e, "#c0392b", s + 1 + l * 3, u + 6 + (l % 2) * 4, 1, 1),
        api.o(e, "#2f5e35", s + l * 3, u + 10, 2, 3),
        api.o(e, "#8a6a4a", s + l * 3 + 1, u + 1 + (l % 3), 1, 3));
  } else
    c === "x"
      ? (api.o(e, "rgba(0,0,0,0.3)", s + 1, u + 13, 14, 3),
        api.o(e, "#6b4423", s + 2, u + 2, 12, 12),
        api.o(e, "#a0703a", s + 3, u + 3, 10, 10),
        api.o(e, "#6b4423", s + 3, u + 7, 10, 1),
        api.o(e, "#6b4423", s + 7, u + 3, 1, 10),
        api.o(e, "#c89050", s + 3, u + 3, 10, 1))
      : c === "o" &&
        (api.o(e, "#4a4638", s + 1, u + 1, 14, 14),
        api.o(e, api.plateLit(t, n, i, a) ? "#7ff7ff" : "#8a8570", s + 3, u + 3, 10, 10),
        api.o(e, "#3a3628", s + 3, u + 12, 10, 1));
};

api.gh = function gh(e, t, n, i, a) {
  let r = i * api.T,
    s = a * api.T,
    u = api.Pe(t, n.id, i, a),
    f = api.Ws[n.theme];
  if (u === "t") {
    let c = f.can,
      y = api.me(i, a, 9);
    if (n.theme === "forest") {
      let w = Math.round((y - 0.5) * 4),
        b = 22 + Math.round(y * 6);
      (api.Un(e, "#0c1e12", r + 8 + w, s - b + 8, 12, 9),
        api.Un(e, "#0c1e12", r + 8 + w, s - b + 14, 13, 11),
        api.Un(e, "#0c1e12", r + 8 + w, s - b + 21, 12, 12),
        api.Un(e, c[1], r + 8 + w, s - b + 9, 11, 8),
        api.Un(e, c[0], r + 8 + w, s - b + 15, 12, 10),
        api.Un(e, c[1], r + 8 + w, s - b + 22, 10, 11),
        api.Un(e, c[2], r + 6 + w, s - b + 11, 6, 3),
        api.Un(e, c[2], r + 5 + w, s - b + 17, 6, 4),
        api.Un(e, c[3], r + 5 + w, s - b + 12, 3, 1));
    } else {
      let w = Math.round((y - 0.5) * 3);
      (api.ge(e, "#16301c", r + 8 + w, s - 3, 12),
        api.ge(e, c[0], r + 8 + w, s - 3, 11),
        api.ge(e, c[1], r + 6 + w, s - 5, 8),
        api.ge(e, c[1], r + 12 + w, s - 2, 7),
        api.ge(e, c[2], r + 5 + w, s - 7, 5),
        api.ge(e, c[3], r + 4 + w, s - 9, 2));
      for (let b = 0; b < 6; b++)
        api.o(
          e,
          b % 2 ? c[2] : c[0],
          r - 1 + w + Math.floor(api.me(i, a, b + 200) * 18),
          s - 12 + Math.floor(api.me(i, a, b + 210) * 16),
          2,
          1,
        );
      y < 0.3 &&
        n.theme !== "forest" &&
        (api.o(e, "#d23a4a", r + 4, s - 3, 2, 2), api.o(e, "#d23a4a", r + 11, s - 6, 2, 2));
    }
  } else if (u === "h") {
    let c = api.Pe(t, n.id, i - 1, a) !== "h",
      y = api.Pe(t, n.id, i, a - 1) !== "h";
    if (c && y) {
      let w = 1;
      for (; api.Pe(t, n.id, i + w, a) === "h";) w++;
      let b = w * api.T,
        x = r,
        M = s,
        j = x + (b >> 1),
        D = ["#a33b2b", "#8a3a8a", "#2b5aa3", "#a37a2b"][Math.floor(api.me(i, a, 2) * 4)];
      (api.o(e, "#e8d8b0", x, M + 14, b, 34), api.o(e, "#c8b890", x, M + 44, b, 4));
      for (let l = 0; l <= w; l++)
        api.o(e, "#7a5230", x + Math.min(b - 2, Math.round((l * (b - 2)) / w)), M + 14, 2, 34);
      (api.o(e, "#3a2412", j - 8, M + 28, 16, 20),
        api.o(e, "#5a3a1e", j - 7, M + 29, 14, 19),
        api.o(e, "#7a5230", j - 6, M + 30, 12, 18));
      for (let l = 0; l < 3; l++) api.o(e, "#5a3a1e", j - 6 + l * 4 + 3, M + 30, 1, 18);
      (api.o(e, "#c9a227", j + 3, M + 39, 2, 2),
        n.id === 0 && i === 30
          ? (api.o(e, "#3a2412", j - 1, M + 14, 2, 6),
            api.o(e, "#1b1424", j - 10, M + 19, 20, 9),
            api.o(e, "#c89050", j - 9, M + 20, 18, 7),
            api.o(e, "#ffffff", j - 4, M + 21, 5, 5),
            api.o(e, "#e8c060", j - 3, M + 23, 3, 3))
          : n.id === 0 && i === 12 && api.o(e, "#8a8fa0", j - 5, M + 22, 10, 2));
      for (let l of [8, b - 20])
        (api.o(e, "#3a2a1a", x + l - 1, M + 25, 12, 10),
          api.o(e, "#ffd88a", x + l, M + 26, 10, 8),
          api.o(e, "#3a2a1a", x + l + 4, M + 26, 1, 8),
          api.o(e, "#3a2a1a", x + l, M + 30, 10, 1));
      (api.o(e, api.ot(D, -0.35), x - 4, M - 6, b + 8, 24), api.o(e, D, x - 3, M - 6, b + 6, 20));
      for (let l = 0; l < 5; l++) api.o(e, api.ot(D, -0.2), x - 3, M - 3 + l * 4, b + 6, 1);
      (api.o(e, api.ot(D, 0.25), x - 3, M - 6, b + 6, 2),
        api.o(e, "#6e6a58", x + b - 18, M - 14, 8, 10),
        api.o(e, "#4a4638", x + b - 18, M - 14, 8, 2));
    }
  }
};

api.Ch = function Ch(e, t, n, i, a, r, s, u, f) {
  for (let c = a; c <= s; c++)
    for (let y = i; y <= r; y++) {
      let w = api.Pe(t, n.id, y, c),
        b = y * api.T,
        x = c * api.T;
      if (w === "w") {
        let M = (l, d) => {
            let v = api.Pe(t, n.id, y + l, c + d);
            return v !== "w" && v !== "=";
          },
          j = Math.floor(u * 5 + y * 3 + c * 7);
        for (let l = 0; l < 16; l += 2)
          (l / 2 + j) % 5 < 2 &&
            (M(0, -1) && api.o(e, "rgba(255,255,255,0.85)", b + l, x + 4 + ((l + j) % 2), 2, 1),
            M(0, 1) && api.o(e, "rgba(255,255,255,0.7)", b + l, x + 13 - ((l + j) % 2), 2, 1),
            M(-1, 0) && api.o(e, "rgba(255,255,255,0.7)", b + 1 + ((l + j) % 2), x + l, 1, 2),
            M(1, 0) && api.o(e, "rgba(255,255,255,0.7)", b + 14 - ((l + j) % 2), x + l, 1, 2));
        let D = (u * 6 + y * 3 + c * 5) % 16;
        (api.o(e, "rgba(200,230,255,0.55)", b + (D | 0), x + 7 + ((y + c) % 3) * 2, 3, 1),
          api.me(y, c, Math.floor(u * 2)) < 0.04 && api.o(e, "#ffffff", b + 8, x + 8, 1, 1));
      } else if (w === "H") {
        (api.o(e, "#5a5f70", b + 2, x + 9, 12, 7),
          api.o(e, "#8a8fa0", b + 3, x + 9, 10, 2),
          api.o(e, "#6a6f80", b + 4, x + 4, 8, 6));
        let M = 0.6 + Math.sin(u * 3) * 0.3;
        (api.o(e, "#3ab0c0", b + 6, x - 3 + Math.sin(u * 2) * 1.5, 4, 7),
          api.o(
            e,
            "rgba(200,255,255," + M.toFixed(2) + ")",
            b + 7,
            x - 2 + Math.sin(u * 2) * 1.5,
            2,
            3,
          ),
          f.push([b + 8, x, 46, 0.9]));
      } else if (w === "S") {
        let M = n.switches.findIndex((D) => D[0] === y && D[1] === c),
          j = t.f.gate || (M >= 0 && t.sw[M] > 0);
        (api.o(e, "#3e3a30", b + 2, x + 9, 12, 6),
          api.o(e, "#55556a", b + 3, x + 10, 10, 2),
          api.o(e, j ? "#7ff7ff" : "#2b6f8a", b + 5, x + 1 + (j ? Math.sin(u * 5) : 0), 6, 9),
          api.o(e, j ? "#ffffff" : "#4a8fa8", b + 6, x + 2, 2, 3),
          j && f.push([b + 8, x + 5, 40, 1]),
          !t.f.gate &&
            M >= 0 &&
            t.sw[M] > 0 &&
            (api.o(e, "#000", b + 1, x + 15, 14, 2),
            api.o(e, "#7ff7ff", b + 1, x + 15, Math.round((14 * t.sw[M]) / 12), 2)));
      } else if (w === "g" || w === "k" || w === "q" || w === "G")
        if (w === "g" ? t.f.lever1 : w === "k" ? t.f.lever2 : w === "q" ? t.f.plate : t.f.gate) {
          api.o(e, "#9a9aa8", b, x, api.T, 2);
          for (let j = 1; j < api.T; j += 4) api.o(e, "#6a6a78", b + j, x, 2, 3);
        } else {
          api.o(e, "#2a2620", b, x, api.T, api.T);
          for (let j = 1; j < api.T; j += 4)
            (api.o(e, "#9a9aa8", b + j, x, 2, api.T), api.o(e, "#d0d0dc", b + j, x, 1, api.T));
          (api.o(e, "#7a7a88", b, x + 3, api.T, 2),
            api.o(e, "#7a7a88", b, x + 11, api.T, 2),
            w === "q" && api.o(e, "#7ff7ff", b + 6, x + 6, 4, 4),
            w === "G" && api.o(e, "#c49bff", b + 6, x + 6, 4, 4));
        }
      else if (w === "D")
        t.f.door ||
          (api.o(e, "#3a2412", b, x, api.T, api.T),
          api.o(e, "#7a5230", b + 1, x, 14, api.T),
          api.o(e, "#5a3a1e", b + 1, x + 5, 14, 1),
          api.o(e, "#5a3a1e", b + 1, x + 11, 14, 1),
          c === 19 &&
            (api.o(e, "#f2c94c", b + 5, x + 10, 6, 6), api.o(e, "#2a1a0a", b + 7, x + 12, 2, 4)));
      else if (w === "V") {
        if (t.f.westKey && t.f.southKey) {
          let M = 0.5 + Math.sin(u * 3) * 0.35;
          (api.o(e, "rgba(106,223,106," + M.toFixed(2) + ")", b + 3, x + 3, 10, 10),
            f.push([b + 8, x + 8, 54, 1]));
        }
      } else if (w === "P") {
        if (!t.f.seal) {
          (api.o(e, "#4a4a5e", b, x, api.T, api.T),
            api.o(e, "#6e6e86", b + 1, x + 1, 14, 14),
            api.o(e, "#55556a", b + 1, x + 7, 14, 1));
          let M = 0.5 + Math.sin(u * 2) * 0.3;
          api.o(e, "rgba(127,247,255," + M.toFixed(2) + ")", b + (y % 2 ? 0 : 10), x + 4, 6, 7);
        }
      } else if (w === "L") {
        let M = n.levers.find((D) => D.tx === y && D.ty === c),
          j = M ? !!t.f[M.flag] : !1;
        (api.o(e, "#3e3a30", b, x, api.T, api.T),
          api.o(e, "#5a5546", b + 2, x + 9, 12, 6),
          api.o(e, "#2a2620", b + 6, x + 10, 4, 2),
          j
            ? (api.o(e, "#8a8fa0", b + 8, x + 3, 2, 8), api.o(e, "#5cf28a", b + 9, x + 1, 4, 4))
            : (api.o(e, "#8a8fa0", b + 6, x + 3, 2, 8),
              api.o(e, "#ff5050", b + 3, x + 1, 4, 4),
              Math.floor(u * 2) % 2 && api.o(e, "#ffffff", b + 4, x + 2, 1, 1)));
      } else if (w === "F" || w === "O") {
        for (let M = 0; M < 5; M++) {
          let j = Math.sin(u * (9 + M) + M * 2) * 2;
          api.o(e, M % 2 ? "#ff9a3c" : "#ffd84a", b + 3 + M * 2, x + 9 + j, 2, 6 - j);
        }
        (api.o(e, "#c0392b", b + 3, x + 14, 10, 2),
          f.push([b + 8, x + 12, w === "F" ? 74 : 60, 1]));
      } else if (w === "T")
        (Math.sin(u * 13 + y) > -0.6 && api.o(e, "#fff4b0", b + 11, x - 1, 1, 1),
          f.push([b + 11, x, 34, 0.7]));
      else if (w === "#" && n.theme === "ruins") {
        let M = api.Pe(t, n.id, y, c + 1);
        if (!api.n2(M) && M !== "L" && api.me(y, c, 41) < 0.12) {
          let j = Math.sin(u * 12 + y) > 0 ? 1 : 0;
          (api.o(e, "#5a3a1e", b + 7, x + 9, 2, 5),
            api.o(e, "#ff9a3c", b + 6, x + 5 - j, 4, 4),
            api.o(e, "#ffd84a", b + 7, x + 6 - j, 2, 2),
            f.push([b + 8, x + 8, 54, 0.95]));
        }
      } else if (w === "#" && n.theme === "server") {
        for (let M = 0; M < 3; M++) {
          let j = api.me(y, c * 7 + M, Math.floor(u * (2 + M))) < 0.5;
          api.o(e, j ? (M === 2 ? "#f2c94c" : "#5cf28a") : "#1f3a2a", b + 3 + M * 4, x + 4, 2, 1);
        }
        api.me(y, c, 3) < 0.1 && f.push([b + 8, x + 6, 26, 0.5]);
      } else if (w === "," && n.theme === "garden" && api.me(y, c, 7) < 0.08) {
        let M = b + 8 + Math.sin(u * 1.3 + y) * 6,
          j = x + 4 + Math.cos(u * 1.7 + c) * 4,
          D = Math.floor(u * 10 + y) % 2;
        (api.o(e, "#ffffff", M - (D ? 2 : 1), j, D ? 2 : 1, 2),
          api.o(e, "#ffffff", M + 1, j, D ? 2 : 1, 2),
          api.o(e, "#2a1a1a", M, j, 1, 2));
      }
    }
};

api.xh = function xh(e, t, n, i) {
  let hit = 0;
  if (String(t).indexOf(":") >= 0) {
    let p = String(t).split(":");
    ((t = p[0]), (hit = Number(p[1]) || 0));
  }
  if (t === "C")
    (api.o(e, "#6b4423", 4, 8, api.T, 11),
      api.o(e, "#a0703a", 4, 6, api.T, 4),
      api.o(e, "#c89050", 4, 6, api.T, 1),
      api.o(e, "#4a2e18", 4 + (n % 2 ? 2 : 10), 11, 3, 7),
      api.me(n, i, 8) < 0.5 && (api.o(e, "#ffffff", 9, 3, 4, 4), api.o(e, "#e8c060", 10, 4, 2, 2)));
  else if (t === "T")
    (api.o(e, "#4a2e18", 6, 14, 2, 4),
      api.o(e, "#4a2e18", 16, 14, 2, 4),
      api.o(e, "#8b5a2b", 4, 7, api.T, 8),
      api.o(e, "#a8743c", 5, 7, 14, 2),
      api.o(e, "#f4ecd8", 7, 8, 4, 3),
      api.o(e, "#ffffff", 14, 6, 3, 4),
      api.o(e, "#ffd84a", 15, 4, 1, 2));
  else if (t === "B")
    (api.o(e, "#1b1424", 6, 5, 12, 14),
      api.o(e, "#8b5a2b", 7, 6, 10, 12),
      api.o(e, "#a8743c", 8, 6, 3, 12),
      api.o(e, "#55556a", 7, 8, 10, 1),
      api.o(e, "#55556a", 7, 15, 10, 1));
  else if (t === "j")
    (api.o(e, "#1b1424", 5, 6, 10, 12),
      api.o(e, "#8a4a32", 6, 7, 8, 10),
      api.o(e, "#c46a4a", 6, 6, 8, 3),
      api.o(e, "#6a3030", 8, 4, 4, 2));
  else if (t === "J")
    (api.o(e, "#1b1424", 3, 4, 14, 14),
      api.o(e, "#6a5a48", 4, 5, 12, 12),
      api.o(e, "#8a7a60", 4, 5, 12, 3),
      api.o(e, "#3a3028", 6, 8, 8, 1),
      api.o(e, "#3a3028", 6, 11, 8, 1),
      api.o(e, "#c9a676", 9, 9, 2, 2));
  else if (t === "A")
    (api.o(e, "#4a2e18", 9, 12, 6, 6),
      api.o(e, "#2a2a34", 5, 7, 14, 5),
      api.o(e, "#4a4a5a", 5, 7, 14, 1),
      api.o(e, "#2a2a34", 3, 8, 3, 2));
  else if (t === "K") {
    (api.o(e, "#5a3a1e", 4, 4, api.T, api.T), api.o(e, "#3a2412", 5, 5, 14, 14));
    for (let s = 0; s < 3; s++) {
      api.o(e, "#7a4a22", 5, 9 + s * 5, 14, 1);
      for (let u = 0; u < 4; u++) {
        let f = ["#c0392b", "#2b6f8a", "#c9a227", "#5cf28a", "#e8e8f0", "#8a3a8a"][
          Math.floor(api.me(n * 7 + u, i + s, 5) * 6)
        ];
        api.o(e, f, 6 + u * 3, 5 + s * 5, 2, 4);
      }
    }
  } else
    (t === "F" || t === "O") &&
      (api.o(e, "#5a5546", 4, 4, api.T, api.T),
      api.o(e, "#7e7a68", 5, 5, 14, 4),
      api.o(e, "#1a1210", 6, 10, 12, 10),
      api.o(e, "#3a2a20", 6, 10, 12, 1),
      t === "O" && api.o(e, "#7a2a10", 7, 16, 10, 4));
  hit > 0 &&
    (t === "B" || t === "j" || t === "J") &&
    (api.o(e, "#1a120c", 7, 9, 6, 1),
    hit > 1 && api.o(e, "#1a120c", 10, 6, 1, 6),
    hit > 2 && api.o(e, "#1a120c", 5, 12, 8, 1));
};

api.Un = function Un(e, t, n, i, a, r) {
  for (let s = 0; s < a; s++) {
    let u = Math.round((r * (s + 1)) / a);
    api.o(e, t, n - u, i + s, u * 2, 1);
  }
};
