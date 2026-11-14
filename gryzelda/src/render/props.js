// @ts-nocheck
/* Rekwizyty: zegar, studnia, skrzynie, ikony.
   Nazwy wewnętrzne zostały po minifikacji — logika jest ta sama co w oryginalnej paczce. */
import { api } from "../runtime/api.js";

api.Sh = function Sh(e, t) {
  let n = t.tx * api.T,
    i = t.ty * api.T,
    a = t.w * api.T,
    r = t.h * api.T,
    s = "#1b1424",
    u = (f) => api.o(e, "rgba(0,0,0," + f + ")", n - 2, i + r - 6, a + 4, 7);
  if (t.kind === "clock") {
    (u(0.3),
      api.o(e, s, n + 1, i + 6, a - 2, r - 6),
      api.o(e, "#8a8470", n + 2, i + 7, a - 4, r - 8));
    for (let f = 0; f < 5; f++)
      for (let c = 0; c < 4; c++)
        api.o(e, "#6e6a58", n + 3 + (f % 2) * 5 + c * 11, i + 9 + f * 8, 9, 1);
    (api.o(e, s, n + 8, i - 44, 32, 54),
      api.o(e, "#c8b890", n + 9, i - 43, 30, 52),
      api.o(e, "#a89870", n + 31, i - 43, 8, 52));
    for (let f = 0; f < 6; f++) api.o(e, "#a89870", n + 9, i - 36 + f * 8, 22, 1);
    for (let f = 0; f < 16; f++) {
      let c = 20 - f;
      api.o(e, f ? "#8a2a2a" : s, n + 24 - c, i - 60 + f, c * 2, 1);
    }
    (api.o(e, "#b04040", n + 12, i - 48, 12, 2),
      api.o(e, s, n + 23, i - 68, 2, 9),
      api.o(e, "#ffd84a", n + 22, i - 70, 4, 3),
      api.ge(e, s, n + 24, i - 24, 9),
      api.ge(e, "#fff4d8", n + 24, i - 24, 8),
      api.o(e, "#c9a227", n + 16, i - 24, 2, 1),
      api.o(e, "#c9a227", n + 30, i - 24, 2, 1),
      api.o(e, "#c9a227", n + 24, i - 32, 1, 2),
      api.o(e, "#c9a227", n + 24, i - 17, 1, 2),
      api.o(e, s, n + 18, i + 26, 12, 22),
      api.o(e, "#5a3a1e", n + 19, i + 27, 10, 21),
      api.o(e, "#ffd84a", n + 27, i + 38, 1, 2),
      api.o(e, "#ffd88a", n + 14, i - 6, 6, 8),
      api.o(e, "#ffd88a", n + 28, i - 6, 6, 8));
  } else if (t.kind === "well") {
    (u(0.25),
      api.ge(e, s, n + 16, i + 20, 13),
      api.ge(e, "#8a8470", n + 16, i + 20, 12),
      api.ge(e, "#2a4a7a", n + 16, i + 18, 8),
      api.o(e, "#6e6a58", n + 4, i + 22, 24, 2),
      api.o(e, s, n + 3, i - 10, 4, 30),
      api.o(e, s, n + 25, i - 10, 4, 30),
      api.o(e, "#7a5230", n + 4, i - 9, 2, 28),
      api.o(e, "#7a5230", n + 26, i - 9, 2, 28),
      api.o(e, "#5a3a1e", n + 6, i - 2, 20, 2));
    for (let f = 0; f < 9; f++)
      api.o(e, f ? "#a33b2b" : s, n + 16 - (6 + f * 2), i - 16 + f, 12 + f * 4, 1);
    api.o(e, "#c9a227", n + 15, i - 2, 2, 10);
  } else if (t.kind === "mill") {
    u(0.3);
    for (let f = 0; f < 64; f++) {
      let c = 14 + Math.round(f * 0.14);
      (api.o(e, f % 9 === 0 ? "#b8a888" : "#e8d8b0", n + 24 - c, i - 16 + f, c * 2, 1),
        api.o(e, s, n + 24 - c - 1, i - 16 + f, 1, 1),
        api.o(e, s, n + 24 + c, i - 16 + f, 1, 1),
        api.o(e, "#c8b890", n + 24 + c - 5, i - 16 + f, 5, 1));
    }
    for (let f = 0; f < 12; f++) {
      let c = 4 + f;
      api.o(e, f ? "#6b4423" : s, n + 24 - c, i - 28 + f, c * 2, 1);
    }
    (api.o(e, s, n + 16, i + 30, 16, 18),
      api.o(e, "#4a2e18", n + 17, i + 31, 14, 17),
      api.o(e, "#6b4423", n + 18, i + 32, 12, 16),
      api.o(e, "#4a2e18", n + 21, i + 32, 1, 16),
      api.o(e, "#4a2e18", n + 25, i + 32, 1, 16),
      api.o(e, "#c9a227", n + 28, i + 40, 1, 2),
      api.o(e, "#ffd88a", n + 21, i + 4, 6, 6),
      api.o(e, s, n + 23, i + 4, 1, 6));
  } else if (t.kind === "hut") {
    (u(0.35),
      api.o(e, s, n + 1, i + 2, a - 2, r - 2),
      api.o(e, "#5a3a5a", n + 2, i + 3, a - 4, r - 4));
    for (let f = 0; f < 5; f++) api.o(e, "#4a2e4a", n + 2 + f * 10, i + 3, 2, r - 4);
    for (let f = 0; f < 20; f++) {
      let c = 6 + f * 1.6;
      api.o(
        e,
        f ? (f % 3 ? "#5a6a2a" : "#4a5a22") : s,
        Math.round(n + 22 - c),
        i - 18 + f,
        Math.round(c * 2 + 4),
        1,
      );
    }
    (api.o(e, "#3a4a1a", n - 8, i + 2, a + 16, 2),
      api.o(e, s, n + 34, i - 26, 6, 14),
      api.o(e, "#6e6a58", n + 35, i - 25, 4, 12),
      api.o(e, s, n + 3, i + 10, 10, 9),
      api.o(e, "#9affc8", n + 4, i + 11, 8, 7),
      api.o(e, s, n + 8, i + 11, 1, 7),
      api.o(e, s, n + 16, i + 12, 16, 20),
      api.o(e, "#3a2412", n + 17, i + 13, 14, 19),
      api.o(e, "#4a2e18", n + 18, i + 14, 12, 18),
      api.o(e, "#9affc8", n + 28, i + 22, 1, 2),
      api.o(e, "#e8e0c8", n + 38, i + 24, 3, 4),
      api.o(e, "#7ff7c0", n + 37, i + 22, 5, 2));
  } else if (t.kind === "oak") {
    (u(0.35), api.o(e, s, n + 6, i - 4, 36, 52), api.o(e, "#4a2e18", n + 7, i - 3, 34, 50));
    for (let c = 0; c < 6; c++) api.o(e, "#3a2010", n + 10 + c * 5, i, 1, 44);
    (api.o(e, "#5a3a1e", n + 8, i - 3, 6, 50),
      api.o(e, s, n - 2, i + 40, 52, 8),
      api.o(e, "#4a2e18", n - 1, i + 41, 50, 6),
      api.o(e, s, n + 14, i + 22, 20, 26),
      api.o(e, "#ffe9a0", n + 15, i + 23, 18, 25),
      api.o(e, "#ffd84a", n + 17, i + 26, 14, 22),
      api.o(e, "#ffe9a0", n + 19, i + 21, 10, 2),
      api.o(e, "#c9a227", n + 28, i + 36, 2, 2));
    let f = api.Ws.forest.can;
    (api.ge(e, "#0c1e12", n + 24, i - 30, 34),
      api.ge(e, f[0], n + 24, i - 30, 33),
      api.ge(e, f[1], n + 14, i - 36, 20),
      api.ge(e, f[1], n + 38, i - 28, 18),
      api.ge(e, f[2], n + 12, i - 42, 11),
      api.ge(e, f[3], n + 10, i - 46, 4));
    for (let c = 0; c < 22; c++)
      api.o(
        e,
        c % 3 ? f[2] : "#0c1e12",
        n - 6 + Math.floor(api.me(c, 3, 77) * 60),
        i - 60 + Math.floor(api.me(c, 4, 77) * 56),
        2,
        1,
      );
  } else if (t.kind === "fountain") {
    u(0.25);
    for (let f = 0; f < 2; f++) api.o(e, s, n + 1 + f, i + 10 + f, a - 2 - f * 2, r - 12 - f * 2);
    (api.o(e, "#c8c0b0", n + 2, i + 11, a - 4, r - 14),
      api.o(e, "#3a74c8", n + 6, i + 15, a - 12, r - 22),
      api.o(e, "#4a88d8", n + 6, i + 15, a - 12, 2),
      api.o(e, "#a8a090", n + 2, i + r - 5, a - 4, 2),
      api.o(e, s, n + 20, i - 6, 8, 30),
      api.o(e, "#e8e0d0", n + 21, i - 5, 6, 28),
      api.ge(e, s, n + 24, i - 8, 8),
      api.ge(e, "#e8e0d0", n + 24, i - 8, 7),
      api.ge(e, "#3a74c8", n + 24, i - 9, 5));
  } else if (t.kind === "statue") {
    (u(0.35),
      api.o(e, s, n, i + 14, a, 18),
      api.o(e, "#6e6a58", n + 1, i + 15, a - 2, 16),
      api.o(e, "#8a8470", n + 1, i + 15, a - 2, 3),
      api.o(e, s, n + 4, i - 30, 24, 46),
      api.o(e, "#d8d4c4", n + 5, i - 29, 22, 44),
      api.o(e, "#b8b4a4", n + 21, i - 29, 6, 44));
    for (let f = 0; f < 6; f++)
      api.o(
        e,
        f === 0 ? "#a03a3a" : "#8a8678",
        n + 8,
        i - 24 + f * 6,
        f === 0 ? 14 : 10 - (f % 2) * 3,
        2,
      );
    (api.o(e, s, n + 9, i + 4, 3, 3),
      api.o(e, s, n + 19, i + 4, 3, 3),
      api.o(e, s, n + 12, i + 10, 8, 1),
      api.o(e, "#4e7a34", n + 4, i + 8, 3, 8),
      api.o(e, "#6e9a48", n + 25, i - 10, 2, 10));
  } else if (t.kind === "arch") {
    for (let f of [n, n + a - 16]) {
      (api.o(e, s, f, i - 10, 16, 42),
        api.o(e, "#7e7a68", f + 1, i - 9, 14, 40),
        api.o(e, "#9a9580", f + 1, i - 9, 3, 40));
      for (let c = 0; c < 5; c++) api.o(e, "#5a5648", f + 1, i - 4 + c * 8, 14, 1);
    }
    (api.o(e, s, n - 2, i - 22, a + 4, 14),
      api.o(e, "#8a8570", n - 1, i - 21, a + 2, 12),
      api.o(e, "#a8a28a", n - 1, i - 21, a + 2, 2),
      api.o(e, s, n + a / 2 - 5, i - 24, 10, 16),
      api.o(e, "#7ff7ff", n + a / 2 - 3, i - 21, 6, 8),
      api.o(e, "#4e7a34", n + 6, i - 9, 4, 10),
      api.o(e, "#4e7a34", n + a - 12, i - 9, 3, 7));
  } else if (t.kind === "throne")
    (u(0.4),
      api.o(e, s, n + 2, i + 6, a - 4, r - 6),
      api.o(e, "#3a2a5a", n + 3, i + 7, a - 6, r - 8),
      api.o(e, "#a0203a", n + 10, i + 14, a - 20, 10),
      api.o(e, "#d04060", n + 10, i + 14, a - 20, 2),
      api.o(e, s, n + 6, i - 30, a - 12, 40),
      api.o(e, "#22253e", n + 7, i - 29, a - 14, 38),
      api.o(e, "#0e1020", n + 11, i - 25, a - 22, 20),
      api.o(e, "#c9a227", n + 7, i - 29, a - 14, 2),
      api.o(e, "#c9a227", n + 22, i - 36, 4, 8),
      api.o(e, s, n - 2, i + 4, 10, r - 4),
      api.o(e, s, n + a - 8, i + 4, 10, r - 4),
      api.o(e, "#2e3250", n - 1, i + 5, 8, r - 6),
      api.o(e, "#2e3250", n + a - 7, i + 5, 8, r - 6));
  else if (t.kind === "rack") {
    (u(0.4),
      api.o(e, s, n + 1, i - 20, a - 2, r + 18),
      api.o(e, "#1a1d34", n + 2, i - 19, a - 4, r + 16));
    for (let f = 0; f < 6; f++)
      (api.o(e, "#2a2e4c", n + 4, i - 16 + f * 8, a - 8, 6),
        api.o(e, "#0e1020", n + 4, i - 11 + f * 8, a - 8, 1));
    (api.o(e, "#3c4268", n + 2, i - 19, a - 4, 1),
      api.o(e, "#5a3a8a", n + a - 6, i - 19, 2, r + 16));
  }
};

api.Mh = function Mh(e, t, n, i) {
  let a = t.tx * api.T,
    r = t.ty * api.T,
    s = t.w * api.T;
  if (t.kind === "clock") {
    let u = a + 24,
      f = r - 24,
      c = n * 0.5,
      y = n * 0.04;
    ((e.strokeStyle = "#1b1424"),
      (e.lineWidth = 1),
      e.beginPath(),
      e.moveTo(u + 0.5, f + 0.5),
      e.lineTo(u + 0.5 + Math.cos(c) * 6, f + 0.5 + Math.sin(c) * 6),
      e.moveTo(u + 0.5, f + 0.5),
      e.lineTo(u + 0.5 + Math.cos(y) * 4, f + 0.5 + Math.sin(y) * 4),
      e.stroke(),
      i.push([a + 17, r - 2, 22, 0.5], [a + 31, r - 2, 22, 0.5]));
  } else if (t.kind === "mill") {
    let u = a + 24,
      f = r - 20,
      c = n * 0.9;
    for (let y = 0; y < 4; y++) {
      let w = c + (y * Math.PI) / 2,
        b = Math.cos(w),
        x = Math.sin(w);
      for (let M = 3; M < 32; M++)
        if ((api.o(e, "#4a2e18", u + b * M, f + x * M, 2, 2), M > 8)) {
          let j = -x,
            D = b;
          for (let l = 2; l < 7; l++)
            api.o(
              e,
              (M + l) % 4 ? "#f4ecd8" : "#c8b890",
              u + b * M + j * l,
              f + x * M + D * l,
              1,
              1,
            );
        }
    }
    (api.o(e, "#1b1424", u - 3, f - 3, 6, 6), api.o(e, "#c9a227", u - 2, f - 2, 4, 4));
  } else if (t.kind === "well")
    Math.floor(n * 2) % 3 === 0 &&
      api.o(e, "#bfe0ff", a + 13 + (Math.floor(n * 3) % 5), r + 17, 2, 1);
  else if (t.kind === "hut") {
    for (let u = 0; u < 4; u++) {
      let f = (n * 0.5 + u / 4) % 1;
      ((e.globalAlpha = 1 - f),
        api.ge(
          e,
          "#b8b0c8",
          Math.round(a + 37 + Math.sin(n + u) * 2 + f * 6),
          Math.round(r - 30 - f * 24),
          2 + Math.round(f * 3),
        ));
    }
    ((e.globalAlpha = 1), i.push([a + 8, r + 14, 40, 0.9], [a + 24, r + 22, 26, 0.6]));
  } else if (t.kind === "oak") {
    i.push([a + 24, r + 34, 60, 1]);
    for (let u = 0; u < 6; u++) {
      let f = n * 0.8 + u;
      api.o(
        e,
        "rgba(255,240,140,0.9)",
        a + 24 + Math.cos(f) * (10 + u * 3),
        r + 20 + Math.sin(f * 1.3) * 12,
        1,
        1,
      );
    }
  } else if (t.kind === "fountain") {
    for (let f = 0; f < 14; f++) {
      let c = (n * 1.2 + f / 14) % 1,
        y = (f / 14) * Math.PI * 2,
        w = c * 14;
      api.o(
        e,
        "rgba(220,240,255," + (1 - c).toFixed(2) + ")",
        a + 24 + Math.cos(y) * w,
        r - 12 - Math.sin(c * Math.PI) * 10 + c * 22,
        1,
        2,
      );
    }
    let u = Math.floor(n * 6) % 20;
    api.o(e, "#bfe0ff", a + 8 + u, r + 18, 4, 1);
  } else if (t.kind === "statue") {
    let u = Math.sin(n * 11) > 0 ? 1 : 0;
    for (let f of [a - 6, a + 34])
      (api.o(e, "#5a3a1e", f + 1, r + 14, 2, 10),
        api.o(e, "#ff9a3c", f, r + 10 - u, 4, 4),
        api.o(e, "#ffd84a", f + 1, r + 11 - u, 2, 2),
        i.push([f + 2, r + 12, 50, 0.95]));
  } else if (t.kind === "arch") {
    let u = 0.5 + Math.sin(n * 2) * 0.4;
    (api.o(e, "rgba(200,255,255," + u.toFixed(2) + ")", a + s / 2 - 2, r - 20, 4, 4),
      i.push([a + s / 2, r - 16, 30, 0.7]));
  } else if (t.kind === "throne") {
    for (let u = 0; u < 6; u++)
      api.o(
        e,
        api.me(u, Math.floor(n * 4), 5) < 0.5 ? "#ff4d6d" : "#3a0a14",
        a + 13 + u * 4,
        r - 22 + (u % 2) * 6,
        2,
        2,
      );
    i.push([a + 24, r - 12, 50, 0.7]);
  } else if (t.kind === "rack") {
    for (let u = 0; u < 6; u++)
      for (let f = 0; f < 3; f++) {
        let c = api.me(t.tx + f, u, Math.floor(n * (3 + f)) + t.ty) < 0.55;
        api.o(
          e,
          c ? (f === 2 ? "#f2c94c" : "#5cf28a") : "#1f3a2a",
          a + 6 + f * 4,
          r - 14 + u * 8,
          2,
          1,
        );
      }
    i.push([a + 16, r, 34, 0.6]);
  }
};

api.jh = function jh(e, t) {
  let n = [];
  for (let i = 0; i < t.h; i++)
    for (let a = 0; a < t.w; a++) {
      let r = api.Pe(e, t.id, a, i);
      if (r === "t")
        n.push({
          x: a * api.T - 10,
          y: i * api.T - 34,
          w: 36,
          h: 50,
          base: i * api.T + api.T,
          kind: "t",
          tx: a,
          ty: i,
          lm: null,
        });
      else if (
        r === "h" &&
        api.Pe(e, t.id, a - 1, i) !== "h" &&
        api.Pe(e, t.id, a, i - 1) !== "h"
      ) {
        let s = 0;
        for (; api.Pe(e, t.id, a, i + s) === "h";) s++;
        let u = 1;
        for (; api.Pe(e, t.id, a + u, i) === "h";) u++;
        n.push({
          x: a * api.T - 6,
          y: i * api.T - 16,
          w: u * api.T + 12,
          h: 68,
          base: (i + Math.max(1, s - 1)) * api.T + 10,
          kind: "h",
          tx: a,
          ty: i,
          lm: null,
        });
      } else
        (r === "C" ||
          r === "T" ||
          r === "B" ||
          r === "A" ||
          r === "K" ||
          r === "F" ||
          r === "O" ||
          r === "j" ||
          r === "J") &&
          n.push({
            x: a * api.T - 4,
            y: i * api.T - 8,
            w: 24,
            h: 28,
            base: i * api.T + 14,
            kind:
              "furn:" +
              r +
              ":" +
              ((e.f && e.f["brk:" + t.id + ":" + a + ":" + i]) || 0),
            tx: a,
            ty: i,
            lm: null,
          });
    }
  for (let i of api.vp)
    i.z === t.id &&
      n.push({
        x: i.tx * api.T - 12,
        y: i.ty * api.T - 76,
        w: i.w * api.T + 24,
        h: i.h * api.T + 84,
        base: (i.ty + i.h) * api.T - 6,
        kind: "lm",
        tx: i.tx,
        ty: i.ty,
        lm: i,
      });
  return n;
};

api.Si = function Si(e, t, n, i, a) {
  if (t.indexOf("qi:") === 0) {
    let r = t.slice(3),
      s = "#1b1424";
    r === "kam1"
      ? (api.o(e, s, n - 6, i - 5, 12, 10),
        api.o(e, "#c0392b", n - 5, i - 4, 10, 8),
        api.o(e, "#e8d8b0", n - 4, i - 5, 5, 2),
        api.o(e, "#ffd84a", n + 1, i - 1, 3, 3))
      : r === "zdz1"
        ? (api.o(e, s, n - 5, i - 7, 10, 13),
          api.o(e, "#ff7a1a", n - 1, i - 6, 2, 3),
          api.o(e, "#ff7a1a", n - 2, i - 3, 4, 3),
          api.o(e, "#ffffff", n - 3, i - 1, 6, 1),
          api.o(e, "#ff7a1a", n - 3, i, 6, 3),
          api.o(e, "#ff7a1a", n - 4, i + 3, 8, 2))
        : r === "fil2"
          ? (api.ge(e, s, n, i, 5),
            api.ge(e, "#e8403a", n, i, 4),
            api.o(e, "#ffffff", n - 2, i - 2, 2, 2),
            api.o(e, "#ffffff", n + 1, i + 1, 2, 2),
            api.o(e, "#ffffff", n + 2, i - 2, 1, 1))
          : r === "dar1"
            ? (api.o(e, s, n - 6, i - 5, 12, 11),
              api.o(e, "#b08850", n - 5, i - 4, 10, 9),
              api.o(e, "#e8d070", n - 1, i - 4, 2, 9),
              api.o(e, "#8a6a3a", n - 5, i - 4, 10, 1))
            : r === "rys1"
              ? (api.o(e, s, n - 4, i - 6, 8, 12),
                api.o(e, "#ffd84a", n - 3, i - 5, 6, 7),
                api.o(e, "#fff4b0", n - 2, i - 4, 2, 3),
                api.o(e, "#c8c8d0", n, i + 2, 1, 3),
                api.o(e, "#c8c8d0", n - 1, i + 4, 1, 1))
              : r === "edk1"
                ? (api.o(e, s, n - 7, i - 6, 14, 12),
                  api.o(e, "#a0703a", n - 6, i - 2, 12, 7),
                  api.o(e, "#c89050", n - 6, i, 12, 1),
                  api.o(e, "#e84a4a", n - 4, i - 4, 8, 2),
                  api.o(e, "#8b5a2b", n - 5, i - 6, 1, 4),
                  api.o(e, "#8b5a2b", n + 4, i - 6, 1, 4),
                  api.o(e, "#8b5a2b", n - 5, i - 6, 10, 1))
                : r === "okladka"
                  ? (api.o(e, s, n - 6, i - 5, 12, 10),
                    api.o(e, "#c0392b", n - 5, i - 4, 10, 8),
                    api.o(e, "#8a2a20", n - 5, i - 4, 2, 8),
                    api.o(e, "#7ff7c0", n + 1, i + 1, 3, 2))
                  : r === "jablka"
                    ? (api.o(e, s, n - 7, i - 3, 14, 9),
                      api.o(e, "#a0703a", n - 6, i - 1, 12, 6),
                      api.ge(e, s, n - 3, i - 3, 3),
                      api.ge(e, "#7fc04a", n - 3, i - 3, 2),
                      api.ge(e, s, n + 2, i - 3, 3),
                      api.ge(e, "#d23a3a", n + 2, i - 3, 2),
                      api.o(e, "#4a2e18", n + 2, i - 7, 1, 2))
                    : r === "ksiega"
                      ? (api.o(e, s, n - 6, i - 6, 12, 12),
                        api.o(e, "#e8c040", n - 5, i - 5, 10, 10),
                        api.o(e, "#a07a20", n - 5, i - 5, 2, 10),
                        api.o(e, "#1b1424", n - 1, i - 3, 4, 1),
                        api.o(e, "#1b1424", n, i - 1, 2, 3),
                        api.o(e, "#1b1424", n, i + 3, 2, 1))
                      : r === "awizo"
                        ? (api.o(e, s, n - 5, i - 6, 10, 12),
                          api.o(e, "#f4f0e0", n - 4, i - 5, 8, 10),
                          api.o(e, "#e8a020", n - 4, i - 5, 8, 2),
                          api.o(e, "#888", n - 3, i - 1, 6, 1),
                          api.o(e, "#888", n - 3, i + 1, 5, 1),
                          api.o(e, "#888", n - 3, i + 3, 4, 1))
                        : r === "dzwonek"
                          ? (api.o(e, s, n - 5, i - 6, 10, 12),
                            api.o(e, "#c9a227", n - 4, i - 3, 8, 6),
                            api.o(e, "#ffd84a", n - 3, i - 5, 6, 3),
                            api.o(e, "#ffe9a0", n - 2, i - 4, 1, 4),
                            api.o(e, "#7a5a00", n - 1, i + 3, 2, 2),
                            api.o(e, "#8b5a2b", n - 1, i - 7, 2, 2))
                          : r === "welna"
                          ? (api.o(e, s, n - 6, i - 4, 12, 8),
                            api.o(e, "#f4ead6", n - 5, i - 3, 10, 6),
                            api.o(e, "#ffffff", n - 3, i - 4, 4, 3),
                            api.o(e, "#e7d7b8", n + 1, i - 1, 4, 3),
                            api.o(e, "#c9a227", n - 1, i + 1, 2, 2))
                          : r === "zatyczki"
                            ? (api.o(e, s, n - 6, i - 4, 12, 8),
                              api.ge(e, "#4e8a34", n - 3, i, 3),
                              api.ge(e, "#4e8a34", n + 3, i, 3),
                              api.o(e, "#8ac860", n - 4, i - 2, 2, 1),
                              api.o(e, "#8ac860", n + 2, i - 2, 2, 1))
                            : r === "moneta"
                              ? (api.ge(e, s, n, i, 6),
                                api.ge(e, "#b8860b", n, i, 5),
                                api.ge(e, "#ffd84a", n, i, 4),
                                api.o(e, "#1b1424", n - 1, i - 1, 2, 2))
                              : (api.o(e, s, n - 4, i - 4, 8, 8),
                                api.o(e, "#ffd84a", n - 3, i - 3, 6, 6));
    return;
  }
  if (t === "coin") {
    let r = Math.abs(Math.cos(a * 5 + n)) * 3 + 1;
    (api.o(e, "#1b1424", n - r - 1, i - 5, r * 2 + 2, 10),
      api.o(e, "#b8860b", n - r, i - 4, r * 2, 8),
      api.o(e, "#ffd84a", n - r + 1, i - 4, Math.max(1, r * 2 - 2), 7));
  } else if (t === "heart") api.a2(e, n - 3, i - 3, 1);
  else if (t === "klucz")
    (api.o(e, "#1b1424", n - 6, i - 3, 14, 6),
      api.o(e, "#ffd84a", n - 5, i - 2, 4, 4),
      api.o(e, "#ffd84a", n - 1, i - 1, 7, 2),
      api.o(e, "#ffd84a", n + 3, i + 1, 2, 2),
      api.o(e, "#7a5a00", n - 4, i - 1, 2, 2));
  else if (t === "seal")
    (api.o(e, "#1b1424", n - 6, i - 6, 12, 12),
      api.o(e, "#2b6f8a", n - 5, i - 5, 10, 10),
      api.o(e, "#7ff7ff", n - 3, i - 3, 6, 6),
      api.o(e, "#ffffff", n - 1, i - 2, 2, 2));
  else if (t === "grzyb")
    (api.o(e, "#1b1424", n - 5, i - 5, 10, 10),
      api.o(e, "#e8e0c8", n - 1, i, 3, 4),
      api.o(e, "#7ff7c0", n - 4, i - 4, 8, 4),
      api.o(e, "#ffffff", n - 2, i - 3, 2, 1));
  else if (t === "kawa")
    (api.o(e, "#1b1424", n - 5, i - 4, 11, 9),
      api.o(e, "#ffffff", n - 4, i - 3, 7, 7),
      api.o(e, "#6b3a1a", n - 3, i - 2, 5, 2),
      api.o(e, "#ffffff", n + 3, i - 1, 2, 3),
      api.o(e, "rgba(255,255,255,0.6)", n - 2, i - 7 - ((a * 4) % 3), 1, 2));
  else if (t === "ekspres")
    (api.o(e, "#1b1424", n - 5, i - 5, 10, 10),
      api.o(e, "#ff5050", n - 4, i - 4, 8, 8),
      api.o(e, "#ffd84a", n - 1, i - 3, 2, 4),
      api.o(e, "#ffd84a", n - 2, i, 4, 1),
      api.o(e, "#ffd84a", n - 1, i + 2, 2, 1));
  else if (t === "magnes")
    (api.o(e, "#1b1424", n - 5, i - 5, 10, 10),
      api.o(e, "#d23", n - 4, i - 4, 3, 8),
      api.o(e, "#d23", n + 1, i - 4, 3, 8),
      api.o(e, "#d23", n - 4, i + 2, 8, 2),
      api.o(e, "#e8e8e8", n - 4, i - 4, 3, 2),
      api.o(e, "#e8e8e8", n + 1, i - 4, 3, 2));
  else if (t === "lutnia")
    (api.o(e, "#1b1424", n - 6, i - 7, 12, 14),
      api.o(e, "#a0703a", n - 5, i - 1, 8, 7),
      api.o(e, "#6b4423", n - 1, i - 6, 2, 6),
      api.o(e, "#2a1a10", n - 2, i + 1, 3, 3),
      api.o(e, "#ffd84a", n - 2, i - 7, 3, 2));
  else if (t === "zebatka") {
    (api.o(e, "#1b1424", n - 6, i - 6, 12, 12),
      api.o(e, "#c9a227", n - 5, i - 5, 10, 10),
      api.o(e, "#fff4d8", n - 3, i - 3, 6, 6),
      api.o(e, "#8a7a20", n - 1, i - 1, 2, 2));
    for (let [r, s] of [
      [-5, -1],
      [3, -1],
      [-1, -5],
      [-1, 3],
    ])
      api.o(e, "#c9a227", n + r, i + s, 2, 2);
  } else
    t === "banka"
      ? (api.o(e, "#1b1424", n - 5, i - 5, 10, 10),
        api.o(e, "rgba(159,216,255,0.8)", n - 4, i - 4, 8, 8),
        api.o(e, "#ffffff", n - 2, i - 3, 2, 2))
      : t === "crystal"
        ? (api.o(e, "rgba(127,247,255,0.25)", n - 10, i - 16, 20, 26),
          api.o(e, "#1b1424", n - 6, i - 12, 12, 22),
          api.o(e, "#3ab0c0", n - 5, i - 11, 10, 20),
          api.o(e, "#7ff7ff", n - 3, i - 11, 5, 18),
          api.o(e, "#ffffff", n - 2, i - 9, 2, 6))
        : t === "manifest"
          ? (api.o(e, "#1b1424", n - 6, i - 5, 12, 10),
            api.o(e, "#f4f0e0", n - 5, i - 4, 10, 8),
            api.o(e, "#d23", n - 5, i - 4, 10, 2),
            api.o(e, "#888", n - 3, i - 1, 6, 1),
            api.o(e, "#888", n - 3, i + 1, 4, 1))
          : t === "badge"
            ? (api.o(e, "#1b1424", n - 5, i - 5, 10, 10),
              api.o(e, "#c49bff", n - 4, i - 4, 8, 8),
              api.o(e, "#ffd84a", n - 2, i - 2, 4, 4),
              api.o(e, "#fff", n - 1, i - 1, 2, 2))
            : t === "root"
              ? (api.o(e, "#1b1424", n - 5, i - 6, 10, 12),
                api.o(e, "#2a4a2a", n - 4, i - 5, 8, 10),
                api.o(e, "#6adf6a", n - 3, i - 3, 6, 6),
                api.o(e, "#7ff7ff", n - 1, i - 1, 2, 2))
              : t === "trap" &&
                (api.o(e, "#1b1424", n - 5, i - 3, 10, 6),
                api.o(e, "#ffd84a", n - 4, i - 2, 8, 4),
                api.o(e, "#d23", n - 1, i - 1, 2, 2));
};
