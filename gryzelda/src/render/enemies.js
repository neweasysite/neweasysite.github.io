// @ts-nocheck
/* Gluty, tickety i pozostali wrogowie.
   Nazwy wewnętrzne zostały po minifikacji — logika jest ta sama co w oryginalnej paczce. */
import { api } from "../runtime/api.js";

api.bh = function bh(e, t, n = 0) {
  return e === "slime" || e === "gold"
    ? api.Ue(e + t, 16, 14, (i) => {
        let a = e === "gold" ? "#f2c94c" : "#3fbf6f",
          r = e === "gold" ? "#b8860b" : "#258a4a",
          s = e === "gold" ? "#fff4b0" : "#a6f5c0",
          u = t ? 1 : 0;
        (api.o(i, r, 1, 6 + u, 14, 7 - u),
          api.o(i, a, 2, 4 + u, 12, 8 - u),
          api.o(i, a, 4, 2 + u, 8, 3),
          api.o(i, s, 4, 3 + u, 3, 2),
          api.o(i, s, 3, 5 + u, 1, 2),
          api.o(i, "#123", 5, 7 + u, 2, 2),
          api.o(i, "#123", 9, 7 + u, 2, 2),
          api.o(i, "#ffffff", 5, 7 + u, 1, 1),
          api.o(i, "#ffffff", 9, 7 + u, 1, 1),
          e === "gold" && api.o(i, "#ffffff", 11, 2 + u, 1, 1));
      })
    : e === "bat"
      ? api.Ue("bat" + t, 20, 12, (i) => {
          (api.o(i, "#3b2058", 7, 3, 6, 6),
            api.o(i, "#5b3088", 8, 3, 4, 2),
            api.o(i, "#ff5050", 8, 5, 1, 1),
            api.o(i, "#ff5050", 11, 5, 1, 1),
            api.o(i, "#ffffff", 9, 8, 1, 1),
            api.o(i, "#ffffff", 10, 8, 1, 1),
            t
              ? (api.o(i, "#5b3088", 0, 1, 7, 3),
                api.o(i, "#5b3088", 13, 1, 7, 3),
                api.o(i, "#3b2058", 1, 4, 4, 1),
                api.o(i, "#3b2058", 15, 4, 4, 1))
              : (api.o(i, "#5b3088", 0, 5, 7, 3),
                api.o(i, "#5b3088", 13, 5, 7, 3),
                api.o(i, "#3b2058", 2, 8, 3, 1),
                api.o(i, "#3b2058", 15, 8, 3, 1)));
        })
      : e === "spam"
        ? api.Ue("spam" + t, 16, 16, (i) => {
            (api.o(i, "#3b2a20", 4, 12, 2, 3 + t),
              api.o(i, "#3b2a20", 10, 12, 2, 4 - t),
              api.o(i, "#f4f4f4", 1, 3, 14, 10),
              api.o(i, "#d8d8d8", 1, 11, 14, 2),
              api.o(i, "#d23", 1, 3, 7, 1),
              api.o(i, "#d23", 8, 3, 7, 1),
              api.o(i, "#d23", 3, 4, 10, 1),
              api.o(i, "#d23", 6, 5, 4, 1),
              api.o(i, "#222", 4, 8, 2, 2),
              api.o(i, "#222", 10, 8, 2, 2),
              api.o(i, "#d23", 6, 0, 4, 3),
              api.o(i, "#ffffff", 7, 1, 1, 1));
          })
        : e === "nest"
          ? api.Ue("nest" + t, 20, 18, (i) => {
              (api.o(i, "#6b4423", 1, 8, 18, 9),
                api.o(i, "#8b5a2b", 2, 6, 16, 4),
                api.o(i, "#4a2a12", 3, 12, 14, 2));
              for (let a = 0; a < 4; a++)
                (api.o(i, "#f4f4f4", 3 + a * 4, 3 - (a % 2) + t, 4, 4),
                  api.o(i, "#d23", 3 + a * 4, 3 - (a % 2) + t, 4, 1));
            })
          : e === "ticket"
            ? api.Ue("ticket" + t, 16, 16, (i) => {
                (api.o(i, "#f4f0e0", 2, 2 + t, 12, 12),
                  api.o(i, "#e8e0c8", 2, 12 + t, 12, 2),
                  api.o(i, "#d23", 2, 2 + t, 12, 2),
                  api.o(i, "#888", 4, 6 + t, 8, 1),
                  api.o(i, "#888", 4, 8 + t, 6, 1),
                  api.o(i, "#222", 5, 10 + t, 2, 2),
                  api.o(i, "#222", 9, 10 + t, 2, 2));
              })
            : e === "charger"
              ? api.Ue("charger" + t + n, 18, 16, (i) => {
                  let a = n ? 1 : 0;
                  (api.o(i, "#6a2a2a", 3, 6, 12, 9),
                    api.o(i, "#a03838", 4, 5, 10, 8),
                    api.o(i, a ? "#ffd84a" : "#ff8080", 6, 7, 2, 2),
                    api.o(i, a ? "#ffd84a" : "#ff8080", 10, 7, 2, 2),
                    api.o(i, "#3b1a1a", 2, 13 + t, 3, 3),
                    api.o(i, "#3b1a1a", 13, 13 + (1 - t), 3, 3),
                    a && api.o(i, "#ffd84a", 7, 1, 4, 3));
                })
              : e === "shield"
                ? api.Ue("shield" + t, 18, 18, (i) => {
                    (api.o(i, "#4a5568", 6, 4, 6, 12),
                      api.o(i, "#7a8498", 7, 5, 4, 10),
                      api.o(i, "#c9ced8", 1, 5 + t, 7, 10),
                      api.o(i, "#e8e8f4", 2, 6 + t, 5, 2),
                      api.o(i, "#c9a227", 3, 9 + t, 3, 3),
                      api.o(i, "#222", 9, 8, 1, 1),
                      api.o(i, "#222", 11, 8, 1, 1));
                  })
                : e === "phone"
                  ? api.Ue("phone" + t, 14, 18, (i) => {
                      (api.o(i, "#2a2a32", 3, 2, 8, 14),
                        api.o(i, "#3a3a48", 4, 3, 6, 12),
                        api.o(i, t ? "#5cf28a" : "#3a5a3a", 5, 5, 4, 3),
                        api.o(i, "#888", 5, 10, 4, 1),
                        api.o(i, "#888", 5, 12, 4, 1),
                        t && (api.o(i, "#5cf28a", 1, 4, 2, 2), api.o(i, "#5cf28a", 11, 4, 2, 2)));
                    })
                  : e === "zombie"
                    ? api.Ue("zombie" + t, 16, 20, (i) => {
                        (api.o(i, "#3a5a3a", 4, 8 + t, 8, 8),
                          api.o(i, "#4a7a4a", 5, 7 + t, 6, 7),
                          api.o(i, "#6adf6a", 5, 2 + t, 6, 6),
                          api.o(i, "#1a2a1a", 6, 4 + t, 1, 2),
                          api.o(i, "#1a2a1a", 9, 4 + t, 1, 2),
                          api.o(i, "#2a4a2a", 4, 15 + t, 3, 4),
                          api.o(i, "#2a4a2a", 9, 15 + (1 - t), 3, 4));
                      })
                    : e === "golem"
                      ? api.Ue("golem" + t + n, 36, 32, (i) => {
                          (api.o(i, "#6a5e4e", 4, 10 + t, 28, 20),
                            api.o(i, "#8a7e6a", 6, 8 + t, 24, 18),
                            api.o(i, "#c9a676", 8, 4 + t, 20, 8),
                            api.o(i, "#ffd84a", 12, 12 + t, 4, 3),
                            api.o(i, "#ffd84a", 20, 12 + t, 4, 3),
                            api.o(i, "#5a4e3e", 10, 18 + t, 16, 2),
                            api.o(i, "#fff4b0", 14, 6 + t, 8, 1));
                        })
                      : e === "phantom"
                        ? api.Ue("phantom" + t + n, 28, 30, (i) => {
                            (api.o(i, "rgba(120,80,180,0.7)", 6, 8 + t, 16, 18),
                              api.o(i, "rgba(160,120,220,0.85)", 8, 6 + t, 12, 16),
                              api.o(i, "#e8d0ff", 10, 4 + t, 8, 8),
                              api.o(i, "#ff5050", 11, 7 + t, 2, 2),
                              api.o(i, "#ff5050", 15, 7 + t, 2, 2));
                            for (let a = 0; a < 3; a++)
                              api.o(i, "rgba(180,140,240,0.5)", 8 + a * 5, 24 + t + (a % 2), 4, 4);
                          })
                        : e === "root"
                          ? api.Ue("root" + t + n, 36, 40, (i) => {
                              /* Kozacki Root: czerwono-złoty, z koroną, wąsem i szablą — nie do pomylenia z Lidią. */
                              (api.o(i, "#4a0810", 4, 14 + t, 28, 22),
                                api.o(i, "#8a1424", 9, 14 + t, 18, 22),
                                api.o(i, "#b8243a", 11, 15 + t, 14, 18),
                                api.o(i, "#ffd84a", 9, 24 + t, 18, 2),
                                api.o(i, "#e0b060", 9, 34 + t, 18, 2),
                                api.o(i, "#ffd84a", 5, 13 + t, 7, 4),
                                api.o(i, "#ffd84a", 24, 13 + t, 7, 4),
                                api.o(i, "#b8860b", 5, 16 + t, 7, 1),
                                api.o(i, "#b8860b", 24, 16 + t, 7, 1),
                                api.o(i, "#e8d8c0", 12, 6 + t, 12, 9),
                                api.o(i, "#c8b8a0", 12, 13 + t, 12, 2),
                                api.o(i, "#ffd84a", 14, 9 + t, 3, 2),
                                api.o(i, "#ffd84a", 19, 9 + t, 3, 2),
                                api.o(i, "#2a1a10", 13, 13 + t, 4, 1),
                                api.o(i, "#2a1a10", 19, 13 + t, 4, 1),
                                api.o(i, "#2a1a10", 12, 14 + t, 1, 2),
                                api.o(i, "#2a1a10", 23, 14 + t, 1, 2),
                                api.o(i, "#ffd84a", 11, 3 + t, 14, 3),
                                api.o(i, "#ffd84a", 11, 0 + t, 2, 3),
                                api.o(i, "#ffd84a", 17, 0 + t, 2, 3),
                                api.o(i, "#ffd84a", 23, 0 + t, 2, 3),
                                api.o(i, "#ff3048", 17, 4 + t, 2, 1),
                                api.o(i, "#7ff7ff", 13, 4 + t, 1, 1),
                                api.o(i, "#7ff7ff", 22, 4 + t, 1, 1),
                                api.o(i, "#d8d8e0", 31, 17 + t, 2, 15),
                                api.o(i, "#ffffff", 31, 17 + t, 1, 6),
                                api.o(i, "#ffd84a", 29, 15 + t, 6, 2),
                                api.o(i, "#7ff7ff", 16, 19 + t, 4, 4),
                                api.o(i, "#ffffff", 17, 20 + t, 2, 2),
                                api.o(i, "#2a0610", 12, 36 + t, 4, 4),
                                api.o(i, "#2a0610", 20, 36 + (1 - t), 4, 4));
                            })
                        : e === "lich" || e === "audit"
                          ? api.Ue((e === "audit" ? "audit" : "lich") + t + n, 32, 36, (i) => {
                              (api.o(i, e === "audit" ? "#142028" : "#1a2a1a", 8, 14 + t, 16, 18),
                                api.o(i, e === "audit" ? "#1a4060" : "#2a4a2a", 10, 12 + t, 12, 16),
                                api.o(i, e === "audit" ? "#7ff7ff" : "#6adf6a", 10, 4 + t, 12, 10),
                                api.o(i, "#c49bff", 8, 2 + t, 16, 4),
                                api.o(i, e === "audit" ? "#ffd84a" : "#9b6bd1", 12, 0 + t, 8, 4),
                                api.o(i, "#ff5050", 12, 8 + t, 2, 2),
                                api.o(i, "#ff5050", 18, 8 + t, 2, 2),
                                api.o(i, "#7ff7ff", 14, 18 + t, 4, 4),
                                api.o(i, "#ffffff", 15, 19 + t, 2, 2));
                            })
                          : e === "spider"
                            ? api.Ue("spider" + t, 18, 14, (i) => {
                                (api.o(i, "#2a1a10", 2, 6, 14, 6),
                                  api.o(i, "#5a3a22", 3, 5, 12, 5),
                                  api.o(i, "#8a5a32", 5, 3, 8, 4),
                                  api.o(i, "#ff5050", 6, 4, 2, 2),
                                  api.o(i, "#ff5050", 10, 4, 2, 2));
                                for (let [a, r] of [
                                  [0, 6],
                                  [1, 9],
                                  [16, 6],
                                  [15, 9],
                                  [2, 3],
                                  [14, 3],
                                ])
                                  api.o(i, "#3a2a18", a, r + (t ? 1 : 0), 2, 1);
                              })
                            : e === "rat"
                              ? api.Ue("rat" + t, 14, 10, (i) => {
                                  (api.o(i, "#3a2a1a", 2, 4 + t, 10, 5),
                                    api.o(i, "#6a4a2a", 3, 3 + t, 8, 5),
                                    api.o(i, "#8a6a3a", 8, 2 + t, 5, 4),
                                    api.o(i, "#1a1010", 10, 3 + t, 1, 1),
                                    api.o(i, "#1a1010", 12, 3 + t, 1, 1),
                                    api.o(i, "#5a3a22", 1, 6 + t, 2, 1),
                                    api.o(i, "#5a3a22", 0, 3 + t, 2, 1),
                                    api.o(i, "#4a3020", 4, 8 + t, 2, 2),
                                    api.o(i, "#4a3020", 7, 8 + (1 - t), 2, 2));
                                })
                              : e === "snake"
                                ? api.Ue("snake" + t, 18, 12, (i) => {
                                    (api.o(i, "#1a3a1a", 1, 6 + t, 14, 4),
                                      api.o(i, "#2a6a2a", 2, 5 + t, 12, 4),
                                      api.o(i, "#3a8a3a", 12, 3 + t, 5, 5),
                                      api.o(i, "#ff5050", 14, 4 + t, 2, 2),
                                      api.o(i, "#ffd84a", 16, 5 + t, 2, 1),
                                      api.o(i, "#1a3a1a", 0, 5 + (t ? 0 : 1), 3, 2),
                                      api.o(i, "#2a6a2a", 4, 8 + t, 3, 2));
                                  })
                                : e === "morok"
                                  ? api.Ue("morok" + t, 28, 32, (i) => {
                                      let a = t ? 1 : 0;
                                      (api.o(i, "#140810", 6, 14 + a, 16, 16),
                                        api.o(i, "#2a1028", 8, 12 + a, 12, 16),
                                        api.o(i, "#3a1840", 7, 10 + a, 14, 6),
                                        api.o(i, "#c8b8a0", 10, 8 + a, 8, 7),
                                        api.o(i, "#7ff7ff", 11, 10 + a, 2, 2),
                                        api.o(i, "#7ff7ff", 15, 10 + a, 2, 2),
                                        api.o(i, "#1a1020", 12, 13 + a, 4, 1),
                                        api.o(i, "#d8d0c0", 8, 2 + a, 12, 6),
                                        api.o(i, "#e0b060", 9, 3 + a, 10, 1),
                                        api.o(i, "#e0b060", 13, 1 + a, 2, 3),
                                        api.o(i, "#6a1830", 4, 18 + a, 4, 8),
                                        api.o(i, "#e8dcc0", 20, 18 + a, 4, 8),
                                        api.o(i, "#e0b060", 21, 22 + a, 3, 3),
                                        api.o(i, "#fff4c8", 22, 23 + a, 1, 1));
                                    })
                                  : api.Ue("king" + t + n, 32, 28, (i) => {
                                    let a = t ? 1 : 0;
                                    (api.o(i, "#1f7a43", 1, 10 + a, 30, 16 - a),
                                      api.o(i, "#2fa35b", 2, 7 + a, 28, 17 - a),
                                      api.o(i, "#2fa35b", 6, 4 + a, 20, 4),
                                      api.o(i, "#9ff0b8", 7, 6 + a, 6, 3),
                                      api.o(i, "#9ff0b8", 5, 9 + a, 2, 3),
                                      api.o(i, "#123", 10, 13 + a, 3, 4),
                                      api.o(i, "#123", 19, 13 + a, 3, 4),
                                      api.o(i, "#ffffff", 10, 13 + a, 1, 1),
                                      api.o(i, "#ffffff", 19, 13 + a, 1, 1),
                                      api.o(i, "#123", 13, 20 + a, 6, 1),
                                      api.o(i, "#f2c94c", 9, a, 14, 4),
                                      api.o(i, "#f2c94c", 9, -3 + a, 2, 3),
                                      api.o(i, "#f2c94c", 15, -3 + a, 2, 3),
                                      api.o(i, "#f2c94c", 21, -3 + a, 2, 3),
                                      api.o(i, "#ff4d6d", 15, 1 + a, 2, 2),
                                      api.o(i, "#b8860b", 9, 3 + a, 14, 1));
                                  });
};

api.vh = function vh(e, t) {
  return api.Ue("boss" + e + (t ? 1 : 0), 44, 44, (n) => {
    (api.o(n, "#5a5f70", 2, 20, 6, 14),
      api.o(n, "#5a5f70", 36, 20, 6, 14),
      api.o(n, "#7a7f90", 3, 20, 4, 3),
      api.o(n, "#7a7f90", 37, 20, 4, 3),
      api.o(n, "#6a6f80", 8, 10, 28, 30),
      api.o(n, "#8a8fa0", 9, 10, 26, 28),
      api.o(n, "#a9aec0", 9, 10, 26, 3),
      api.o(n, "#5a5f70", 9, 36, 26, 2),
      api.o(n, "#16202e", 12, 15, 20, 13),
      api.o(n, "#22344a", 12, 15, 20, 2));
    let i = t ? "#ff5050" : "#5cf28a";
    (t
      ? (api.o(n, i, 14, 19, 5, 2),
        api.o(n, i, 25, 19, 5, 2),
        api.o(n, i, 15, 18, 3, 1),
        api.o(n, i, 26, 18, 3, 1))
      : (api.o(n, i, 15, 18, 4, 3), api.o(n, i, 25, 18, 4, 3)),
      e
        ? (api.o(n, i, 16, 24, 2, 1), api.o(n, i, 20, 24, 2, 1), api.o(n, i, 24, 24, 2, 1))
        : api.o(n, i, 16, 24, 12, 1),
      api.o(n, "#f2c94c", 14, 31, 16, 3),
      api.o(n, "#2a2a2a", 15, 32, 14, 1),
      api.o(n, "#6a6f80", 21, 3, 2, 7),
      api.o(n, e ? "#ff5050" : "#802020", 19, 0, 6, 4));
  });
};

api.n2 = function n2(e) {
  return e === "#" || e === "X";
};

api.baa = function baa(dark, frame) {
  return api.Ue("sheep" + (dark ? 1 : 0) + frame, 20, 16, (c) => {
    (api.o(c, dark ? "#e4dcc8" : "#f7f3e8", 2, 6, 12, 7),
      api.o(c, "#fffdf6", 3, 6, 8, 2),
      api.o(c, dark ? "#2a241c" : "#f7f3e8", 12, 5, 6, 5),
      api.o(c, "#1a120c", 16, 6, 1, 1),
      api.o(c, dark ? "#1a120c" : "#d8c8a8", 13, 3, 3, 2),
      dark &&
        (api.o(c, "#1a120c", 11, 3, 2, 3),
        api.o(c, "#1a120c", 10, 1, 2, 2),
        api.o(c, "#3a3228", 11, 0, 3, 2),
        api.o(c, "#1a120c", 16, 3, 2, 3),
        api.o(c, "#1a120c", 17, 1, 2, 2),
        api.o(c, "#3a3228", 16, 0, 3, 2)),
      api.o(c, "#2a241c", frame ? 5 : 4, 12, 2, 3),
      api.o(c, "#2a241c", frame ? 9 : 10, 12, 2, 3));
  });
};

api.mp = function mp(e, t, n) {
  let i = Math.floor(e),
    a = Math.floor(t),
    r = e - i,
    s = t - a,
    u = r * r * (3 - 2 * r),
    f = s * s * (3 - 2 * s),
    c = api.me(i, a, n),
    y = api.me(i + 1, a, n),
    w = api.me(i, a + 1, n),
    b = api.me(i + 1, a + 1, n);
  return c + (y - c) * u + (w - c) * f + (c - y - w + b) * u * f;
};

api.ge = function ge(e, t, n, i, a) {
  for (let r = -a; r <= a; r++) {
    let s = Math.round(Math.sqrt(a * a - r * r));
    api.o(e, t, n - s, i + r, s * 2, 1);
  }
};
