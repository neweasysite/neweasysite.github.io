// @ts-nocheck
/* Mapa, jaskinie, rzeki i generowanie stref.
   Nazwy wewnętrzne zostały po minifikacji — logika jest ta sama co w oryginalnej paczce. */
import { api } from "../runtime/api.js";

api.yk = function yk(e) {
  let t = e >>> 0;
  return () => {
    t = (t + 1831565813) >>> 0;
    let n = t;
    return (
      (n = Math.imul(n ^ (n >>> 15), n | 1)),
      (n ^= n + Math.imul(n ^ (n >>> 7), n | 61)),
      ((n ^ (n >>> 14)) >>> 0) / 4294967296
    );
  };
};

api.kk = function kk(e, t, n) {
  let i = [];
  for (let a = 0; a < t; a++) {
    let r = [];
    for (let s = 0; s < e; s++) r.push(n);
    i.push(r);
  }
  return i;
};

api.H = function H(e, t, n, i, a, r) {
  for (let s = n; s <= a; s++)
    for (let u = t; u <= i; u++) e[s] && e[s][u] !== void 0 && (e[s][u] = r);
};

api.Ie = function Ie(e, t, n, i, a, r, s, u, f) {
  for (let c = i; c <= r; c++)
    for (let y = n; y <= a; y++) e[c][y] === f && t() < u && (e[c][y] = s);
};

api.pe = function pe(e, t, n) {
  let i = (a, r) => {
    !e[r] || e[r][a] === void 0 || (e[r][a] = e[r][a] === "w" || e[r][a] === "=" ? "=" : n);
  };
  for (let a = 0; a + 1 < t.length; a++) {
    let [r, s] = t[a],
      [u, f] = t[a + 1];
    if (s === f) for (let c = Math.min(r, u); c <= Math.max(r, u) + 1; c++) (i(c, s), i(c, s + 1));
    else for (let c = Math.min(s, f); c <= Math.max(s, f) + 1; c++) (i(r, c), i(r + 1, c));
  }
};

api.be = function be(e, t, n, i, a, r) {
  return {
    id: e,
    name: t,
    w: n,
    h: i,
    t: api.kk(n, i, a),
    theme: r,
    exits: [],
    spawns: [],
    npcs: [],
    chests: [],
    items: [],
    levers: [],
    blocks: [],
    plates: [],
    switches: [],
  };
};

api.hk = function hk() {
  var F;
  let e = api.yk(1337),
    t = api.be(0, "Wioska Cierpliwo\u015B\u0107", 48, 32, "t", "grass"),
    n = t.t;
  (api.H(n, 1, 1, 46, 30, "."),
    api.Ie(n, e, 1, 1, 46, 30, "t", 0.04, "."),
    api.Ie(n, e, 1, 1, 46, 30, ",", 0.07, "."),
    api.Ie(n, e, 1, 1, 46, 30, "b", 0.015, "."),
    api.Ie(n, e, 1, 1, 46, 30, "r", 0.01, "."));
  for (let [k, L] of [
    [5, 4],
    [12, 4],
    [30, 5],
    [37, 4],
    [4, 23],
    [35, 21],
  ])
    (api.H(n, k - 1, L - 1, k + 5, L + 3, "."), api.H(n, k, L, k + 4, L + 2, "h"));
  (api.H(n, 19, 22, 26, 27, "w"),
    api.H(n, 18, 11, 30, 19, "."),
    api.H(n, 40, 24, 46, 30, "b"),
    api.H(n, 41, 25, 45, 29, "."),
    api.pe(
      n,
      [
        [24, 17],
        [24, 0],
      ],
      ":",
    ),
    api.pe(
      n,
      [
        [24, 15],
        [47, 15],
      ],
      ":",
    ),
    api.pe(
      n,
      [
        [24, 17],
        [10, 17],
        [10, 25],
      ],
      ":",
    ),
    api.pe(
      n,
      [
        [24, 17],
        [36, 17],
        [36, 11],
      ],
      ":",
    ),
    (n[1][24] = "P"),
    (n[1][25] = "P"),
    (n[13][22] = "H"),
    (t.npcs = [
      { id: "bogdan", tx: 20, ty: 14 },
      { id: "jadzia", tx: 33, ty: 12 },
      { id: "kamila", tx: 28, ty: 18 },
    ]),
    (t.chests = [{ id: "cache", tx: 43, ty: 27 }]),
    (t.items = [{ kind: "kawa", tx: 8, ty: 10, id: "" }]),
    api.pe(
      n,
      [
        [0, 20],
        [10, 20],
        [10, 17],
      ],
      ":",
    ),
    api.pe(
      n,
      [
        [24, 28],
        [24, 31],
      ],
      ":",
    ),
    api.pe(
      n,
      [
        [18, 28],
        [30, 28],
      ],
      ":",
    ),
    api.pe(
      n,
      [
        [6, 7],
        [6, 8],
        [12, 8],
      ],
      ":",
    ),
    api.pe(
      n,
      [
        [38, 7],
        [38, 11],
      ],
      ":",
    ),
    api.pe(
      n,
      [
        [5, 26],
        [9, 26],
      ],
      ":",
    ),
    api.pe(
      n,
      [
        [37, 24],
        [37, 28],
        [30, 28],
      ],
      ":",
    ),
    api.pe(
      n,
      [
        [36, 17],
        [40, 17],
        [40, 20],
        [43, 20],
      ],
      ":",
    ),
    (t.exits = [
      { x0: 24, y0: 0, x1: 25, y1: 0, to: 4, tx: 27, ty: 37 },
      { x0: 47, y0: 15, x1: 47, y1: 16, to: 1, tx: 1, ty: 15 },
      { x0: 0, y0: 20, x1: 0, y1: 21, to: 9, tx: 46, ty: 12 },
      { x0: 24, y0: 31, x1: 25, y1: 31, to: 11, tx: 16, ty: 1 },
    ]),
    t.npcs.push({ id: "piotr", tx: 6, ty: 18 }, { id: "basia", tx: 28, ty: 27 }));
  let i = api.be(1, "\u0141\u0105ka Czekania", 64, 32, "t", "grass");
  ((n = i.t),
    api.H(n, 1, 1, 62, 30, "."),
    api.Ie(n, e, 1, 1, 62, 30, "t", 0.05, "."),
    api.Ie(n, e, 1, 1, 62, 30, "r", 0.03, "."),
    api.Ie(n, e, 1, 1, 62, 30, "b", 0.03, "."),
    api.Ie(n, e, 1, 1, 62, 30, ",", 0.08, "."),
    api.H(n, 30, 0, 32, 31, "w"),
    api.H(n, 52, 2, 61, 8, "#"),
    api.H(n, 53, 3, 60, 7, "."),
    api.H(n, 55, 23, 62, 30, "b"),
    api.H(n, 57, 25, 61, 29, "."),
    api.H(n, 16, 13, 24, 19, "."));
  for (let [k, L] of [
    [12, 26],
    [50, 19],
    [38, 4],
  ])
    api.H(n, k - 1, L - 1, k + 1, L + 1, ".");
  (api.pe(
    n,
    [
      [0, 15],
      [20, 15],
      [20, 8],
      [42, 8],
      [42, 16],
      [63, 16],
    ],
    ":",
  ),
    api.pe(
      n,
      [
        [42, 10],
        [56, 10],
      ],
      ":",
    ),
    api.pe(
      n,
      [
        [20, 15],
        [20, 23],
        [46, 23],
        [46, 26],
      ],
      ":",
    ),
    (n[8][56] = "X"),
    (n[17][18] = "H"),
    (i.npcs = [
      { id: "zenek", tx: 44, ty: 26 },
      { id: "kot", tx: 59, ty: 27 },
    ]),
    (i.chests = [{ id: "mana", tx: 56, ty: 5 }]),
    (i.items = [
      { kind: "magnes", tx: 5, ty: 28, id: "" },
      { kind: "kawa", tx: 36, ty: 27, id: "" },
    ]),
    (i.spawns = [
      ["nest", 12, 26],
      ["nest", 50, 19],
      ["nest", 38, 4],
      ["slime", 10, 10],
      ["slime", 25, 20],
      ["slime", 36, 12],
      ["slime", 40, 20],
      ["slime", 50, 12],
      ["slime", 58, 14],
      ["slime", 14, 22],
      ["bat", 26, 5],
      ["bat", 48, 26],
      ["spam", 52, 22],
    ]),
    (i.exits = [
      { x0: 0, y0: 15, x1: 0, y1: 16, to: 0, tx: 46, ty: 15 },
      { x0: 63, y0: 16, x1: 63, y1: 17, to: 2, tx: 1, ty: 19 },
    ]));
  i.sheep = [
    { tx: 6, ty: 18, x0: 4, y0: 14, x1: 18, y1: 26 },
    { tx: 16, ty: 22, x0: 4, y0: 14, x1: 18, y1: 26 },
    { tx: 13, ty: 16, x0: 4, y0: 14, x1: 18, y1: 26, dark: !0 },
  ];
  for (let sh of i.sheep) {
    let tl = i.t[sh.ty][sh.tx];
    (tl === "t" || tl === "b" || tl === "r" || tl === ",") && (i.t[sh.ty][sh.tx] = ".");
  }
  let a = api.be(2, "Las Szept\xF3w", 56, 40, "t", "forest");
  n = a.t;
  for (let k of [
    [1, 15, 10, 24],
    [38, 3, 52, 13],
    [23, 23, 40, 36],
    [3, 29, 15, 37],
    [42, 17, 53, 26],
  ])
    api.H(n, k[0], k[1], k[2], k[3], ".");
  (api.Ie(n, e, 1, 1, 54, 38, "t", 0.05, "."),
    api.Ie(n, e, 1, 1, 54, 38, "b", 0.04, "."),
    api.Ie(n, e, 1, 1, 54, 38, ",", 0.05, "."),
    api.H(n, 28, 27, 34, 33, "."),
    api.pe(
      n,
      [
        [0, 19],
        [12, 19],
        [12, 11],
        [27, 11],
        [27, 0],
      ],
      ":",
    ),
    api.pe(
      n,
      [
        [27, 11],
        [44, 11],
      ],
      ":",
    ),
    api.pe(
      n,
      [
        [12, 19],
        [12, 32],
        [8, 32],
      ],
      ":",
    ),
    api.pe(
      n,
      [
        [12, 24],
        [30, 24],
        [30, 28],
      ],
      ":",
    ),
    api.pe(
      n,
      [
        [38, 30],
        [48, 30],
        [48, 21],
        [48, 13],
      ],
      ":",
    ),
    (n[4][27] = "f"),
    (n[4][28] = "f"),
    (n[5][27] = "f"),
    (n[5][28] = "f"),
    (a.npcs = [{ id: "halina", tx: 45, ty: 7 }]),
    (a.items = [
      [5, 31],
      [13, 35],
      [44, 5],
      [50, 24],
      [25, 34],
      [36, 25],
    ].map((k, L) => ({ kind: "grzyb", tx: k[0], ty: k[1], id: "g" + L }))),
    (a.spawns = [
      ["king", 31, 30],
      ["bat", 16, 11],
      ["bat", 35, 11],
      ["bat", 46, 20],
      ["bat", 9, 34],
      ["slime", 5, 20],
      ["slime", 26, 25],
      ["slime", 38, 34],
      ["slime", 50, 8],
      ["spam", 44, 24],
    ]),
    (a.exits = [
      { x0: 0, y0: 19, x1: 0, y1: 20, to: 1, tx: 62, ty: 16 },
      { x0: 27, y0: 0, x1: 28, y1: 0, to: 3, tx: 24, ty: 30 },
    ]));
  {
    let k = a.t;
    (api.pe(
      k,
      [
        [8, 32],
        [8, 36],
      ],
      ":",
    ),
      (k[35][8] = "."),
      (k[36][8] = "."),
      (k[36][6] = "#"),
      (k[36][7] = "#"),
      (k[36][9] = "#"),
      (k[36][10] = "#"),
      (k[37][6] = "#"),
      (k[37][7] = "."),
      (k[37][8] = "U"),
      (k[37][9] = "."),
      (k[37][10] = "#"),
      (k[38][6] = "#"),
      (k[38][7] = "#"),
      (k[38][8] = "#"),
      (k[38][9] = "#"),
      (k[38][10] = "#"),
      a.exits.push({ x0: 8, y0: 37, x1: 8, y1: 37, to: 47, tx: 7, ty: 12 }));
  }
  let r = api.be(3, "Sekretny Ogr\xF3d", 48, 32, "t", "garden");
  ((n = r.t),
    api.H(n, 2, 2, 45, 29, ","),
    api.Ie(n, e, 2, 2, 45, 29, "t", 0.03, ","),
    api.Ie(n, e, 2, 2, 45, 29, "b", 0.03, ","));
  for (let k of [
    [6, 5, 10, 8],
    [37, 5, 41, 8],
    [6, 22, 10, 25],
    [37, 22, 41, 25],
  ])
    api.H(n, k[0], k[1], k[2], k[3], "w");
  (api.H(n, 19, 13, 29, 19, "."),
    api.H(n, 21, 3, 27, 7, "."),
    api.pe(
      n,
      [
        [24, 31],
        [24, 6],
      ],
      ":",
    ),
    (n[16][22] = "H"),
    (r.chests = [{ id: "serce", tx: 24, ty: 4 }]),
    (r.items = [
      { kind: "ekspres", tx: 12, ty: 4, id: "" },
      { kind: "magnes", tx: 35, ty: 4, id: "" },
      { kind: "kawa", tx: 40, ty: 28, id: "" },
    ]),
    (r.spawns = [
      ["gold", 10, 15],
      ["gold", 38, 15],
      ["slime", 15, 26],
      ["slime", 33, 26],
    ]),
    (r.exits = [{ x0: 24, y0: 31, x1: 25, y1: 31, to: 2, tx: 27, ty: 1 }]));
  let s = api.be(4, "Ruiny Kolejki Zg\u0142osze\u0144", 56, 40, "#", "ruins");
  ((n = s.t),
    api.H(n, 22, 30, 33, 38, "."),
    api.pe(
      n,
      [
        [27, 38],
        [27, 22],
      ],
      ".",
    ),
    (n[39][27] = "."),
    (n[39][28] = "."),
    api.H(n, 18, 16, 37, 23, "."),
    api.H(n, 3, 15, 15, 25, "."));
  for (let [k, L] of [
    [5, 16],
    [13, 16],
    [5, 23],
    [13, 23],
  ])
    n[L][k] = "#";
  (api.H(n, 16, 19, 17, 20, "g"),
    (n[15][27] = "q"),
    (n[15][28] = "q"),
    (n[14][27] = "."),
    (n[14][28] = "."),
    api.H(n, 12, 3, 43, 13, "."),
    (n[8][20] = "#"),
    (n[8][35] = "#"),
    api.H(n, 26, 1, 29, 1, "."),
    (n[2][27] = "G"),
    (n[2][28] = "G"),
    (n[19][38] = "D"),
    (n[20][38] = "D"),
    api.H(n, 39, 18, 54, 21, "."),
    (n[19][55] = "."),
    (n[20][55] = "."),
    api.pe(
      n,
      [
        [44, 21],
        [44, 31],
        [35, 31],
      ],
      ".",
    ),
    (n[31][34] = "k"),
    (n[32][34] = "k"),
    (n[26][9] = "X"),
    api.H(n, 5, 27, 13, 33, "."),
    (n[32][31] = "L"),
    (n[18][52] = "L"));
  for (let [k, L] of [
    [23, 31],
    [32, 37],
    [19, 22],
    [36, 17],
  ])
    n[L][k] = "x";
  ((s.levers = [
    { tx: 31, ty: 32, flag: "lever1" },
    { tx: 52, ty: 18, flag: "lever2" },
  ]),
    (s.blocks = [{ tx: 9, ty: 17 }]),
    (s.plates = [{ tx: 9, ty: 22 }]),
    (n[22][9] = "o"),
    (s.switches = [
      [16, 5],
      [39, 5],
      [27, 11],
    ]));
  for (let [k, L] of s.switches) n[L][k] = "S";
  ((s.chests = [{ id: "kusza", tx: 9, ty: 30 }]),
    (s.items = [
      { kind: "klucz", tx: 27, ty: 1, id: "key" },
      { kind: "kawa", tx: 41, ty: 12, id: "" },
    ]),
    (s.spawns = [
      ["spam", 20, 18],
      ["spam", 35, 21],
      ["spam", 30, 8],
      ["bat", 8, 15],
      ["bat", 14, 10],
      ["bat", 40, 6],
      ["slime", 25, 20],
      ["slime", 48, 19],
      ["slime", 6, 24],
    ]),
    (s.exits = [
      { x0: 27, y0: 39, x1: 28, y1: 39, to: 0, tx: 24, ty: 2 },
      { x0: 55, y0: 19, x1: 55, y1: 20, to: 5, tx: 1, ty: 15 },
    ]));
  let u = api.be(5, "Serwerownia Supportu", 48, 32, "#", "server");
  ((n = u.t),
    api.H(n, 0, 14, 19, 17, "."),
    api.H(n, 5, 5, 15, 11, "."),
    api.pe(
      n,
      [
        [10, 11],
        [10, 14],
      ],
      ".",
    ),
    api.H(n, 20, 3, 45, 28, "."));
  for (let [k, L] of [
    [24, 7],
    [40, 7],
    [24, 23],
    [40, 23],
  ])
    api.H(n, k, L, k + 1, L + 1, "#");
  ((u.items = [
    { kind: "ekspres", tx: 13, ty: 6, id: "" },
    { kind: "banka", tx: 13, ty: 10, id: "" },
  ]),
    (u.spawns = [
      ["bat", 15, 16],
      ["spam", 8, 10],
    ]),
    (u.exits = [{ x0: 0, y0: 15, x1: 0, y1: 16, to: 4, tx: 54, ty: 19 }]));
  for (let [k, L] of [
    [30, 5],
    [12, 4],
  ])
    ((t.t[L + 2][k + 1] = "d"), (t.t[L + 2][k + 2] = "d"));
  (api.pe(
    t.t,
    [
      [31, 8],
      [31, 14],
    ],
    ":",
  ),
    api.pe(
      t.t,
      [
        [12, 7],
        [12, 16],
      ],
      ":",
    ),
    t.exits.push(
      { x0: 31, y0: 7, x1: 32, y1: 7, to: 6, tx: 8, ty: 9 },
      { x0: 13, y0: 6, x1: 14, y1: 6, to: 7, tx: 5, ty: 6 },
    ));
  let f = api.be(6, "Karczma Pod Pe\u0142n\u0105 Kolejk\u0105", 18, 12, "#", "inn");
  ((n = f.t),
    api.H(n, 1, 2, 16, 10, "."),
    api.H(n, 2, 3, 7, 3, "C"),
    api.H(n, 2, 1, 7, 1, "K"),
    (n[11][8] = "_"),
    (n[11][9] = "_"),
    (n[1][13] = "F"),
    (n[1][14] = "F"),
    (n[6][4] = "T"),
    (n[6][9] = "T"),
    (n[8][13] = "T"));
  for (let [k, L] of [
    [3, 6],
    [5, 6],
    [8, 6],
    [10, 6],
    [12, 8],
    [14, 8],
  ])
    n[L][k] = "c";
  ((n[3][15] = "B"),
    (n[4][15] = "B"),
    (n[10][1] = "B"),
    (n[2][1] = "B"),
    api.H(n, 7, 9, 10, 10, "R"),
    (n[9][15] = "Y"),
    (f.npcs = [
      { id: "mietek", tx: 8, ty: 3 },
      { id: "zbyszek", tx: 11, ty: 4 },
    ]),
    (f.exits = [
      { x0: 8, y0: 11, x1: 9, y1: 11, to: 0, tx: 31, ty: 9 },
      { x0: 15, y0: 9, x1: 15, y1: 9, to: 8, tx: 3, ty: 2 },
    ]));
  let c = api.be(7, "Ku\u017Ania Wandy", 12, 9, "#", "inn");
  ((n = c.t),
    api.H(n, 1, 2, 10, 7, "."),
    (n[8][5] = "_"),
    (n[8][6] = "_"),
    (n[1][2] = "O"),
    (n[1][3] = "O"),
    (n[3][3] = "A"),
    (n[1][8] = "K"),
    (n[1][9] = "K"),
    (n[5][10] = "B"),
    (n[6][10] = "B"),
    (n[7][1] = "B"),
    api.H(n, 5, 5, 7, 6, "R"),
    (c.npcs = [{ id: "wanda", tx: 6, ty: 3 }]),
    (c.exits = [{ x0: 5, y0: 8, x1: 6, y1: 8, to: 0, tx: 13, ty: 8 }]));
  let y = api.be(8, "Piwnica Karczmy", 26, 14, "#", "ruins");
  ((n = y.t),
    api.H(n, 1, 2, 24, 12, "."),
    (n[1][3] = "U"),
    api.H(n, 9, 2, 9, 8, "#"),
    api.H(n, 17, 6, 17, 12, "#"));
  for (let [k, L] of [
    [5, 4],
    [4, 10],
    [14, 3],
    [21, 11],
    [22, 3],
    [12, 11],
  ])
    n[L][k] = "x";
  ((n[6][1] = "B"),
    (n[7][1] = "B"),
    (n[12][13] = "B"),
    (n[2][24] = "B"),
    (y.spawns = [
      ["slime", 5, 8],
      ["slime", 12, 5],
      ["bat", 14, 10],
      ["slime", 20, 4],
      ["nest", 13, 8],
      ["nest", 22, 9],
      ["spam", 21, 6],
    ]),
    (y.items = [{ kind: "kawa", tx: 6, ty: 11, id: "" }]),
    (y.exits = [{ x0: 3, y0: 1, x1: 3, y1: 1, to: 6, tx: 14, ty: 9 }]),
    s.items.push({ kind: "lutnia", tx: 46, ty: 20, id: "lute" }));
  let w = api.be(9, "Zachodnie Pola Ticket\xF3w", 48, 28, "t", "grass");
  ((n = w.t),
    api.H(n, 1, 1, 46, 26, "."),
    api.Ie(n, e, 1, 1, 46, 26, "t", 0.04, "."),
    api.Ie(n, e, 1, 1, 46, 26, "b", 0.03, "."),
    api.Ie(n, e, 1, 1, 46, 26, ",", 0.06, "."),
    api.H(n, 18, 8, 28, 16, "."),
    api.pe(
      n,
      [
        [47, 12],
        [30, 12],
        [30, 20],
        [10, 20],
        [10, 12],
        [2, 12],
      ],
      ":",
    ),
    api.pe(
      n,
      [
        [10, 12],
        [10, 2],
      ],
      ":",
    ),
    (n[6][22] = "H"),
    (w.npcs = []),
    (w.chests = [{ id: "westcache", tx: 40, ty: 4 }]),
    (w.items = [
      { kind: "kawa", tx: 15, ty: 6, id: "" },
      { kind: "magnes", tx: 35, ty: 22, id: "" },
    ]),
    (w.spawns = [
      ["ticket", 12, 10],
      ["ticket", 20, 18],
      ["ticket", 32, 8],
      ["ticket", 38, 16],
      ["charger", 16, 14],
      ["charger", 28, 22],
      ["shield", 24, 12],
      ["slime", 8, 8],
      ["slime", 42, 20],
      ["bat", 14, 22],
    ]),
    (w.exits = [
      { x0: 47, y0: 12, x1: 47, y1: 13, to: 0, tx: 1, ty: 20 },
      { x0: 2, y0: 1, x1: 3, y1: 1, to: 10, tx: 12, ty: 22 },
    ]));
  let b = api.be(10, "Depot Zagubionych Paczek", 28, 24, "#", "depot");
  ((n = b.t), api.H(n, 2, 2, 25, 21, "."));
  for (let k of [8, 14, 20]) api.H(n, k, 4, k, 16, "#");
  (api.H(n, 8, 10, 20, 10, "."),
    api.pe(
      n,
      [
        [12, 22],
        [12, 10],
        [22, 10],
        [22, 18],
      ],
      ".",
    ),
    (n[23][12] = "."),
    (n[23][13] = "."),
    (n[18][22] = "L"),
    (b.levers = [{ tx: 22, ty: 18, flag: "depotDoor" }]),
    (n[6][14] = "g"),
    api.H(n, 10, 3, 18, 5, "."),
    (b.spawns = [
      ["ticket", 6, 12],
      ["ticket", 18, 14],
      ["shield", 10, 8],
      ["charger", 22, 8],
      ["golem", 14, 4],
      ["spam", 4, 18],
    ]),
    (b.items = [
      { kind: "kawa", tx: 24, ty: 20, id: "" },
      { kind: "banka", tx: 4, ty: 4, id: "" },
    ]),
    (b.chests = [{ id: "depot", tx: 24, ty: 4 }]),
    (b.exits = [{ x0: 12, y0: 23, x1: 13, y1: 23, to: 9, tx: 11, ty: 4 }]));
  let x = api.be(11, "Po\u0142udniowe Bagna SLA", 36, 36, "t", "swamp");
  ((n = x.t),
    api.H(n, 1, 1, 34, 34, "."),
    api.Ie(n, e, 1, 1, 34, 34, "t", 0.05, "."),
    api.Ie(n, e, 1, 1, 34, 34, "w", 0.04, "."),
    api.Ie(n, e, 1, 1, 34, 34, "b", 0.04, "."));
  for (let [k, L] of [
    [8, 8],
    [22, 10],
    [12, 22],
    [26, 24],
    [18, 16],
  ])
    api.H(n, k, L, k + 2, L + 2, "w");
  (api.pe(
    n,
    [
      [16, 0],
      [16, 10],
      [10, 10],
      [10, 20],
      [20, 20],
      [20, 30],
      [16, 30],
      [16, 35],
    ],
    ":",
  ),
    api.pe(
      n,
      [
        [20, 20],
        [30, 20],
        [30, 34],
      ],
      ":",
    ),
    (n[4][16] = "H"),
    (x.spawns = [
      ["zombie", 10, 12],
      ["zombie", 22, 14],
      ["zombie", 14, 26],
      ["charger", 18, 8],
      ["phone", 28, 22],
      ["phone", 8, 28],
      ["ticket", 24, 28],
      ["slime", 6, 18],
      ["bat", 30, 8],
    ]),
    (x.items = [
      { kind: "kawa", tx: 4, ty: 4, id: "" },
      { kind: "ekspres", tx: 32, ty: 32, id: "" },
    ]),
    (x.chests = [{ id: "swamp", tx: 30, ty: 6 }]),
    (x.exits = [
      { x0: 16, y0: 0, x1: 17, y1: 0, to: 0, tx: 24, ty: 30 },
      { x0: 30, y0: 34, x1: 31, y1: 34, to: 12, tx: 10, ty: 1 },
    ]));
  let M = api.be(12, "Call Center Cieni", 32, 24, "#", "ruins");
  ((n = M.t), api.H(n, 2, 2, 29, 21, "."));
  for (let k = 6; k <= 16; k += 5)
    for (let L = 6; L <= 22; L += 6)
      (api.H(n, L, k, L + 3, k + 2, "#"), (n[k + 2][L + 1] = "."), (n[k + 2][L + 2] = "."));
  (api.pe(
    n,
    [
      [10, 0],
      [10, 4],
    ],
    ".",
  ),
    (n[1][10] = "."),
    (n[1][11] = "."),
    (n[18][24] = "V"),
    (n[18][25] = "V"),
    (M.spawns = [
      ["phone", 8, 14],
      ["zombie", 26, 16],
      ["shield", 6, 18],
      ["phantom", 18, 10],
      ["ticket", 26, 8],
    ]),
    (M.items = [{ kind: "kawa", tx: 4, ty: 20, id: "" }]),
    (M.exits = [
      { x0: 10, y0: 0, x1: 11, y1: 0, to: 11, tx: 30, ty: 33 },
      { x0: 24, y0: 18, x1: 25, y1: 18, to: 13, tx: 12, ty: 30 },
    ]));
  let j = api.be(13, "Kraina Nieumar\u0142ego Supportu", 40, 32, "#", "undead");
  ((n = j.t), api.H(n, 2, 2, 37, 29, "."), api.Ie(n, e, 2, 2, 37, 29, "#", 0.03, "."));
  for (let [k, L] of [
    [8, 8],
    [30, 8],
    [8, 22],
    [30, 22],
    [20, 14],
  ])
    api.H(n, k, L, k + 1, L + 1, "#");
  (api.pe(
    n,
    [
      [12, 30],
      [12, 20],
      [20, 20],
      [20, 10],
      [28, 10],
      [28, 4],
    ],
    ":",
  ),
    api.pe(
      n,
      [
        [20, 20],
        [20, 30],
      ],
      ":",
    ),
    (n[31][12] = "."),
    (n[31][13] = "."),
    (n[6][20] = "H"),
    (j.npcs = [{ id: "ghost", tx: 14, ty: 18 }]),
    api.pe(
      n,
      [
        [20, 20],
        [36, 20],
        [36, 14],
      ],
      ":",
    ),
    (n[14][38] = "."),
    (n[15][38] = "."),
    (n[30][20] = "#"),
    (n[30][21] = "#"),
    (j.spawns = [
      ["zombie", 10, 10],
      ["zombie", 28, 12],
      ["zombie", 16, 24],
      ["phone", 22, 8],
      ["phone", 6, 20],
      ["shield", 32, 20],
      ["charger", 18, 14],
      ["ticket", 34, 26],
    ]),
    (j.items = [
      { kind: "kawa", tx: 4, ty: 4, id: "" },
      { kind: "banka", tx: 36, ty: 4, id: "" },
    ]),
    (j.chests = [{ id: "undead1", tx: 34, ty: 14 }]),
    (j.exits = [
      { x0: 12, y0: 31, x1: 13, y1: 31, to: 12, tx: 24, ty: 17 },
      { x0: 28, y0: 2, x1: 29, y1: 2, to: 14, tx: 10, ty: 22 },
      { x0: 38, y0: 14, x1: 38, y1: 15, to: 15, tx: 12, ty: 1 },
    ]));
  let D = api.be(14, "Krypta Hold Music", 24, 24, "#", "undead");
  ((n = D.t),
    api.H(n, 2, 2, 21, 21, "."),
    api.H(n, 6, 6, 8, 16, "#"),
    api.H(n, 14, 6, 16, 16, "#"),
    api.pe(
      n,
      [
        [10, 22],
        [10, 12],
        [12, 12],
      ],
      ".",
    ),
    (n[23][10] = "."),
    (n[23][11] = "."),
    (n[4][12] = "H"),
    (D.spawns = [
      ["zombie", 4, 8],
      ["zombie", 18, 8],
      ["phone", 12, 16],
      ["shield", 8, 12],
      ["charger", 16, 14],
    ]),
    (D.items = [{ kind: "ekspres", tx: 4, ty: 18, id: "" }]),
    (D.chests = [{ id: "crypt", tx: 18, ty: 4 }]),
    (D.exits = [{ x0: 10, y0: 23, x1: 11, y1: 23, to: 13, tx: 28, ty: 3 }]));
  let l = api.be(15, "Sala Eskalacji", 28, 20, "#", "undead");
  ((n = l.t), api.H(n, 2, 2, 25, 17, "."));
  for (let [k, L] of [
    [6, 6],
    [20, 6],
    [6, 12],
    [20, 12],
  ])
    api.H(n, k, L, k + 1, L + 1, "#");
  (api.pe(
    n,
    [
      [12, 1],
      [12, 6],
    ],
    ".",
  ),
    (n[0][12] = "."),
    (n[0][13] = "."),
    (l.npcs = [{ id: "lidia", tx: 16, ty: 8 }]),
    (l.spawns = [
      ["lich", 16, 10],
      ["zombie", 8, 8],
      ["zombie", 22, 8],
      ["phone", 10, 14],
    ]),
    (l.items = []),
    (l.exits = [{ x0: 12, y0: 0, x1: 13, y1: 0, to: 13, tx: 37, ty: 14 }]));
  for (let [k, L, ce, je, Be] of [
    [5, 4, 16, 6, 9],
    [37, 4, 17, 5, 8],
    [4, 23, 18, 6, 10],
    [35, 21, 19, 7, 9],
  ])
    ((t.t[L + 2][k + 1] = "d"),
      (t.t[L + 2][k + 2] = "d"),
      t.exits.push({ x0: k + 1, y0: L + 2, x1: k + 2, y1: L + 2, to: ce, tx: je, ty: Be }));
  ((i.t[19][23] = "d"),
    (i.t[19][24] = "d"),
    api.pe(
      i.t,
      [
        [23, 20],
        [23, 22],
      ],
      ":",
    ),
    i.exits.push({ x0: 23, y0: 19, x1: 24, y1: 19, to: 20, tx: 7, ty: 10 }),
    (a.t[10][48] = "d"),
    (a.t[10][49] = "d"),
    a.exits.push({ x0: 48, y0: 10, x1: 49, y1: 10, to: 21, tx: 5, ty: 9 }),
    (a.t[33][27] = "d"),
    (a.t[33][28] = "d"),
    a.exits.push({ x0: 27, y0: 33, x1: 28, y1: 33, to: 22, tx: 6, ty: 10 }),
    (x.t[16][5] = "d"),
    (x.t[16][6] = "d"),
    x.exits.push({ x0: 5, y0: 16, x1: 6, y1: 16, to: 23, tx: 7, ty: 11 }));
  let d = api.be(16, "Domek Jadzi", 14, 11, "#", "inn");
  {
    let k = d.t;
    (api.H(k, 1, 1, 12, 9, "."),
      (k[10][6] = "_"),
      (k[10][7] = "_"),
      api.H(k, 2, 2, 5, 3, "."),
      (k[2][2] = "B"),
      (k[2][3] = "B"),
      (k[3][2] = "K"),
      (k[2][10] = "F"),
      (k[2][11] = "F"),
      (k[5][4] = "T"),
      (k[5][5] = "c"),
      (k[5][7] = "c"),
      (k[7][10] = "K"),
      (k[7][11] = "K"),
      (k[8][2] = "B"),
      (k[3][7] = "C"),
      (k[6][9] = "U"),
      (d.items = [{ kind: "kawa", tx: 8, ty: 4, id: "" }]),
      (d.chests = [{ id: "home1", tx: 11, ty: 2 }]),
      (d.exits = [
        { x0: 6, y0: 10, x1: 7, y1: 10, to: 0, tx: 6, ty: 8 },
        { x0: 9, y0: 6, x1: 9, y1: 6, to: 31, tx: 4, ty: 2 },
      ]));
  }
  let v = api.be(31, "Piwnica Jadzi", 12, 10, "#", "ruins");
  {
    let k = v.t;
    (api.H(k, 1, 1, 10, 8, "."),
      (k[1][4] = "U"),
      (k[1][5] = "#"),
      api.H(k, 5, 3, 5, 6, "#"),
      (k[3][2] = "B"),
      (k[7][8] = "B"),
      (k[4][8] = "x"),
      (k[6][3] = "x"),
      (v.spawns = [
        ["rat", 3, 5],
        ["rat", 8, 4],
        ["rat", 7, 7],
        ["spider", 2, 7],
      ]),
      (v.items = [{ kind: "magnes", tx: 9, ty: 2, id: "" }]),
      (v.chests = [{ id: "jadziacell", tx: 9, ty: 7 }]),
      (v.exits = [{ x0: 4, y0: 1, x1: 4, y1: 1, to: 16, tx: 9, ty: 7 }]));
  }
  let g = api.be(17, "Chatka na Wschodzie", 13, 10, "#", "inn");
  {
    let k = g.t;
    (api.H(k, 1, 1, 11, 8, "."),
      (k[9][5] = "_"),
      (k[9][6] = "_"),
      api.H(k, 8, 2, 10, 4, "#"),
      (k[2][9] = "."),
      (k[2][10] = "."),
      (k[3][7] = "."),
      (k[3][8] = "."),
      (k[3][9] = "."),
      (k[3][10] = "."),
      (k[4][9] = "."),
      (k[2][2] = "B"),
      (k[2][3] = "x"),
      (k[5][3] = "T"),
      (k[6][8] = "B"),
      (k[6][6] = "U"),
      (k[4][10] = "x"),
      (k[7][2] = "K"),
      (k[2][8] = "C"),
      (g.spawns = [
        ["spider", 3, 4],
        ["spider", 9, 6],
        ["rat", 6, 3],
      ]),
      (g.items = [{ kind: "magnes", tx: 9, ty: 3, id: "" }]),
      (g.chests = [{ id: "home2", tx: 10, ty: 2 }]),
      (g.npcs = []),
      (g.exits = [
        { x0: 5, y0: 9, x1: 6, y1: 9, to: 0, tx: 38, ty: 8 },
        { x0: 6, y0: 6, x1: 6, y1: 6, to: 46, tx: 6, ty: 4 },
      ]));
  }
  let C = api.be(18, "Dom Piotra", 14, 12, "#", "inn");
  {
    let k = C.t;
    (api.H(k, 1, 1, 12, 10, "."),
      (k[11][6] = "_"),
      (k[11][7] = "_"),
      api.H(k, 2, 2, 6, 2, "C"),
      (k[3][4] = "T"),
      (k[4][3] = "c"),
      (k[4][5] = "c"),
      (k[2][9] = "K"),
      (k[2][10] = "K"),
      (k[2][11] = "K"),
      (k[5][10] = "B"),
      (k[8][2] = "B"),
      (k[7][9] = "A"),
      (k[8][11] = "U"),
      (C.items = [{ kind: "banka", tx: 8, ty: 5, id: "" }]),
      (C.exits = [
        { x0: 6, y0: 11, x1: 7, y1: 11, to: 0, tx: 5, ty: 27 },
        { x0: 11, y0: 8, x1: 11, y1: 8, to: 32, tx: 5, ty: 7 },
      ]));
  }
  let S = api.be(32, "Strych Piotra", 12, 10, "#", "inn");
  {
    let k = S.t;
    (api.H(k, 1, 1, 10, 8, "."),
      (k[8][5] = "U"),
      (k[2][2] = "B"),
      (k[2][8] = "B"),
      (k[3][5] = "K"),
      (k[6][3] = "x"),
      (k[5][9] = "x"),
      (S.spawns = [
        ["rat", 3, 4],
        ["bat", 8, 3],
        ["rat", 7, 6],
      ]),
      (S.items = [{ kind: "kawa", tx: 4, ty: 2, id: "" }]),
      (S.chests = [{ id: "piotratt", tx: 9, ty: 2 }]),
      (S.exits = [{ x0: 5, y0: 8, x1: 5, y1: 8, to: 18, tx: 10, ty: 7 }]));
  }
  let P = api.be(19, "Dom Basi", 15, 11, "#", "inn");
  {
    let k = P.t;
    (api.H(k, 1, 1, 13, 9, "."),
      (k[10][7] = "_"),
      (k[10][8] = "_"),
      api.H(k, 2, 3, 8, 3, "C"),
      (k[4][3] = "T"),
      (k[4][6] = "T"),
      (k[5][4] = "c"),
      (k[5][7] = "c"),
      (k[2][11] = "K"),
      (k[2][12] = "K"),
      (k[3][12] = "K"),
      (k[7][2] = "B"),
      (k[8][2] = "B"),
      (k[2][2] = "F"),
      (k[8][11] = "A"),
      (k[6][12] = "U"),
      (P.items = [{ kind: "kawa", tx: 10, ty: 5, id: "" }]),
      (P.chests = [{ id: "home3", tx: 12, ty: 7 }]),
      (P.exits = [
        { x0: 7, y0: 10, x1: 8, y1: 10, to: 0, tx: 37, ty: 25 },
        { x0: 12, y0: 6, x1: 12, y1: 6, to: 42, tx: 6, ty: 4 },
      ]));
  }
  let N = api.be(20, "Wn\u0119trze M\u0142yna", 16, 12, "#", "inn");
  {
    let k = N.t;
    (api.H(k, 1, 1, 14, 10, "."),
      (k[11][7] = "_"),
      (k[11][8] = "_"),
      api.H(k, 6, 4, 9, 7, "#"),
      (k[5][7] = "."),
      (k[5][8] = "."),
      (k[6][7] = "U"),
      (k[7][7] = "."),
      (k[7][8] = "."),
      (k[2][2] = "B"),
      (k[2][3] = "B"),
      (k[3][2] = "B"),
      (k[4][3] = "j"),
      (k[4][4] = "J"),
      (k[2][12] = "K"),
      (k[2][13] = "."),
      (k[8][2] = "A"),
      (k[9][12] = "T"),
      (k[8][13] = "c"),
      (N.spawns = [
        ["spider", 3, 5],
        ["bat", 12, 4],
        ["rat", 11, 8],
      ]),
      (N.items = [{ kind: "ekspres", tx: 4, ty: 8, id: "" }]),
      (N.chests = [{ id: "mill1", tx: 13, ty: 2 }]),
      (N.exits = [
        { x0: 7, y0: 11, x1: 8, y1: 11, to: 1, tx: 23, ty: 21 },
        { x0: 7, y0: 6, x1: 7, y1: 6, to: 33, tx: 6, ty: 5 },
      ]));
  }
  let Q = api.be(33, "Strych M\u0142yna", 14, 10, "#", "inn");
  {
    let k = Q.t;
    (api.H(k, 1, 1, 12, 8, "."),
      (k[8][4] = "U"),
      (k[4][6] = "U"),
      (k[2][2] = "."),
      (k[2][3] = "B"),
      (k[2][10] = "B"),
      (k[3][6] = "K"),
      (k[5][2] = "x"),
      (k[6][11] = "x"),
      (k[6][2] = "j"),
      (k[4][9] = "T"),
      (Q.spawns = [
        ["snake", 5, 4],
        ["snake", 10, 5],
        ["bat", 7, 3],
        ["rat", 3, 6],
      ]),
      (Q.items = [{ kind: "zebatka", tx: 11, ty: 2, id: "gear1" }]),
      (Q.chests = [{ id: "millloft", tx: 2, ty: 2 }]),
      (Q.exits = [
        { x0: 4, y0: 8, x1: 4, y1: 8, to: 20, tx: 7, ty: 7 },
        { x0: 6, y0: 4, x1: 6, y1: 4, to: 41, tx: 6, ty: 5 },
      ]));
  }
  let W = api.be(21, "Chata w Lesie", 13, 11, "#", "inn");
  {
    let k = W.t;
    (api.H(k, 1, 1, 11, 9, "."),
      (k[10][5] = "_"),
      (k[10][6] = "_"),
      (k[2][2] = "O"),
      (k[2][3] = "O"),
      (k[3][5] = "T"),
      (k[4][4] = "c"),
      (k[4][6] = "c"),
      (k[2][9] = "K"),
      (k[2][10] = "K"),
      (k[6][2] = "B"),
      (k[7][9] = "B"),
      (k[5][10] = "A"),
      api.H(k, 5, 6, 8, 7, "R"),
      (k[5][8] = "U"),
      (W.items = [{ kind: "kawa", tx: 8, ty: 4, id: "" }]),
      (W.chests = [{ id: "hut1", tx: 10, ty: 3 }]),
      (W.exits = [
        { x0: 5, y0: 10, x1: 6, y1: 10, to: 2, tx: 48, ty: 12 },
        { x0: 8, y0: 5, x1: 8, y1: 5, to: 34, tx: 4, ty: 2 },
      ]));
  }
  let _ = api.be(34, "Korzenie Chatki", 14, 11, "#", "ruins");
  {
    let k = _.t;
    (api.H(k, 1, 1, 12, 9, "."),
      (k[1][4] = "U"),
      api.H(k, 6, 3, 6, 7, "#"),
      api.H(k, 3, 5, 9, 5, "#"),
      (k[5][5] = "."),
      (k[3][2] = "x"),
      (k[8][3] = "x"),
      (k[3][10] = "x"),
      (k[7][11] = "B"),
      (_.spawns = [
        ["snake", 3, 3],
        ["snake", 10, 7],
        ["rat", 9, 3],
        ["spider", 2, 8],
      ]),
      (_.items = [{ kind: "banka", tx: 11, ty: 2, id: "" }]),
      (_.chests = [{ id: "hutroot", tx: 11, ty: 8 }]),
      (_.exits = [{ x0: 4, y0: 1, x1: 4, y1: 1, to: 21, tx: 8, ty: 6 }]));
  }
  let ie = api.be(22, "Serce \u015Awiec\u0105cego D\u0119bu", 14, 12, "t", "garden");
  {
    let k = ie.t;
    (api.H(k, 2, 2, 11, 10, "."),
      api.Ie(k, e, 2, 2, 11, 10, ",", 0.2, "."),
      (k[11][6] = "_"),
      (k[11][7] = "_"),
      (k[3][7] = "H"),
      (k[5][4] = "T"),
      (k[8][9] = "B"),
      (ie.items = [
        { kind: "grzyb", tx: 4, ty: 5, id: "oakg22" },
        { kind: "banka", tx: 9, ty: 5, id: "" },
      ]),
      (ie.chests = [{ id: "oak22", tx: 7, ty: 3 }]),
      (ie.spawns = [
        ["bat", 4, 8],
        ["snake", 10, 7],
      ]),
      (ie.exits = [{ x0: 6, y0: 11, x1: 7, y1: 11, to: 2, tx: 28, ty: 35 }]),
      (a.t[37][28] = "."),
      (a.t[37][27] = "."),
      (a.t[38][28] = "."));
  }
  let ze = api.be(23, "Korzenie SLA", 16, 13, "t", "garden");
  {
    let k = ze.t;
    (api.H(k, 2, 2, 13, 11, "."),
      api.Ie(k, e, 2, 2, 13, 11, ",", 0.18, "."),
      api.H(k, 7, 5, 9, 7, "t"),
      (k[12][7] = "_"),
      (k[12][8] = "_"),
      (k[6][3] = "B"),
      (k[9][12] = "B"),
      (k[8][5] = "."),
      (ze.items = [
        { kind: "grzyb", tx: 4, ty: 8, id: "oakg23" },
        { kind: "ekspres", tx: 12, ty: 4, id: "" },
      ]),
      (ze.chests = [{ id: "oak23", tx: 11, ty: 9 }]),
      (ze.spawns = [
        ["bat", 4, 4],
        ["bat", 12, 8],
        ["snake", 5, 10],
        ["rat", 10, 3],
      ]),
      (ze.exits = [{ x0: 7, y0: 12, x1: 8, y1: 12, to: 11, tx: 5, ty: 18 }]));
  }
  let ke = api.be(24, "Serce Kolejki", 32, 24, "#", "server");
  ((n = ke.t), api.H(n, 2, 2, 29, 21, "."));
  for (let [k, L] of [
    [8, 6],
    [22, 6],
    [8, 14],
    [22, 14],
  ])
    api.H(n, k, L, k + 1, L + 1, "#");
  (api.pe(
    n,
    [
      [15, 22],
      [15, 10],
    ],
    ".",
  ),
    (n[23][15] = "."),
    (n[23][16] = "."),
    (ke.spawns = [
      ["charger", 10, 10],
      ["shield", 20, 10],
      ["phone", 12, 16],
      ["zombie", 18, 16],
    ]),
    (ke.items = [
      { kind: "ekspres", tx: 4, ty: 4, id: "" },
      { kind: "banka", tx: 26, ty: 4, id: "" },
    ]),
    (ke.chests = [{ id: "act3cache", tx: 26, ty: 18 }]),
    (ke.exits = [
      { x0: 15, y0: 23, x1: 16, y1: 23, to: 15, tx: 20, ty: 16 },
      { x0: 14, y0: 2, x1: 17, y1: 2, to: 25, tx: 12, ty: 16 },
    ]));
  let le = api.be(25, "Sala Kozackiego Roota", 28, 20, "#", "undead");
  ((n = le.t), api.H(n, 2, 2, 25, 17, "."));
  for (let [k, L] of [
    [6, 5],
    [20, 5],
    [6, 12],
    [20, 12],
  ])
    api.H(n, k, L, k + 1, L + 1, "#");
  ((n[19][12] = "."),
    (n[19][13] = "."),
    (n[18][12] = "."),
    (n[18][13] = "."),
    (n[17][12] = "."),
    (n[17][13] = "."),
    (le.spawns = [["lich", 14, 8]]),
    (le.items = []),
    (le.exits = [{ x0: 12, y0: 19, x1: 13, y1: 19, to: 24, tx: 15, ty: 4 }]),
    (l.t[18][20] = "."),
    (l.t[18][21] = "."),
    l.exits.push({ x0: 20, y0: 18, x1: 21, y1: 18, to: 24, tx: 15, ty: 21 }),
    (ke.t[12][30] = "."),
    (ke.t[13][30] = "."),
    ke.exits.push({ x0: 30, y0: 12, x1: 30, y1: 13, to: 26, tx: 2, ty: 12 }));
  let ve = api.be(26, "Cmentarzysko Ticket\xF3w", 40, 28, "t", "undead");
  ((n = ve.t),
    api.H(n, 1, 1, 38, 26, "."),
    api.Ie(n, e, 1, 1, 38, 26, "t", 0.03, "."),
    api.Ie(n, e, 1, 1, 38, 26, "#", 0.02, "."),
    api.pe(
      n,
      [
        [0, 12],
        [20, 12],
        [20, 2],
        [30, 2],
        [30, 20],
        [38, 20],
      ],
      ":",
    ),
    api.pe(
      n,
      [
        [20, 12],
        [20, 26],
      ],
      ":",
    ),
    (n[4][10] = "H"),
    (ve.npcs = []),
    (ve.spawns = [
      ["spider", 8, 8],
      ["spider", 28, 8],
      ["zombie", 12, 18],
      ["ticket", 24, 16],
      ["spider", 32, 22],
      ["shield", 16, 6],
    ]),
    (ve.items = [
      { kind: "kawa", tx: 4, ty: 4, id: "" },
      { kind: "banka", tx: 36, ty: 4, id: "" },
    ]),
    (ve.chests = [{ id: "grave1", tx: 34, ty: 14 }]),
    (ve.exits = [
      { x0: 0, y0: 12, x1: 0, y1: 13, to: 24, tx: 28, ty: 12 },
      { x0: 20, y0: 26, x1: 21, y1: 26, to: 27, tx: 10, ty: 2 },
      { x0: 38, y0: 20, x1: 38, y1: 21, to: 28, tx: 2, ty: 14 },
    ]));
  let Te = api.be(27, "Fabryka Spamu", 28, 24, "#", "depot");
  ((n = Te.t), api.H(n, 2, 2, 25, 21, "."));
  for (let k of [8, 14, 20]) api.H(n, k, 4, k, 16, "#");
  (api.H(n, 8, 10, 20, 10, "."),
    api.pe(
      n,
      [
        [10, 1],
        [10, 10],
      ],
      ".",
    ),
    (n[0][10] = "."),
    (n[0][11] = "."),
    (Te.spawns = [
      ["spam", 6, 8],
      ["spam", 18, 8],
      ["nest", 12, 14],
      ["spider", 22, 16],
      ["charger", 6, 18],
      ["phone", 20, 18],
    ]),
    (Te.items = [{ kind: "ekspres", tx: 4, ty: 20, id: "" }]),
    (Te.chests = [{ id: "spamf", tx: 22, ty: 4 }]),
    (Te.npcs = []),
    (Te.exits = [
      { x0: 10, y0: 0, x1: 11, y1: 0, to: 26, tx: 20, ty: 24 },
      { x0: 24, y0: 20, x1: 25, y1: 20, to: 29, tx: 4, ty: 10 },
    ]));
  let ft = api.be(28, "Labirynt Firewalli", 36, 28, "#", "server");
  ((n = ft.t), api.H(n, 1, 1, 34, 26, "."));
  for (let k = 4; k <= 22; k += 4)
    for (let L = 4; L <= 30; L += 6) api.H(n, L, k, L + 2, k + 2, "#");
  (api.pe(
    n,
    [
      [0, 14],
      [10, 14],
      [10, 6],
      [22, 6],
      [22, 18],
      [34, 18],
    ],
    ".",
  ),
    (n[14][0] = "."),
    (n[15][0] = "."),
    (n[18][34] = "."),
    (n[19][34] = "."),
    (ft.spawns = [
      ["shield", 6, 8],
      ["shield", 28, 22],
      ["charger", 14, 22],
      ["spider", 30, 10],
      ["phantom", 26, 22],
      ["ticket", 4, 22],
    ]),
    (ft.chests = [{ id: "firew", tx: 30, ty: 4 }]),
    (ft.items = [{ kind: "magnes", tx: 4, ty: 24, id: "" }]),
    (ft.exits = [
      { x0: 0, y0: 14, x1: 0, y1: 15, to: 26, tx: 36, ty: 20 },
      { x0: 34, y0: 18, x1: 34, y1: 19, to: 29, tx: 4, ty: 14 },
    ]));
  let tt = api.be(29, "Przedpok\xF3j Roota", 24, 20, "#", "undead");
  ((n = tt.t), api.H(n, 2, 2, 21, 17, "."));
  for (let [k, L] of [
    [6, 6],
    [16, 6],
    [6, 12],
    [16, 12],
  ])
    api.H(n, k, L, k + 1, L + 1, "#");
  ((n[10][1] = "."), (n[11][1] = "."), (n[14][1] = "."), (n[15][1] = "."));
  for (let k = 0; k <= 4; k++)
    ((n[k][10] = "."), (n[k][11] = "."), (n[k][12] = "."), (n[k][13] = "."));
  ((tt.spawns = [
    ["phantom", 12, 8],
    ["spider", 6, 14],
    ["spider", 18, 14],
    ["shield", 10, 14],
  ]),
    (tt.chests = [{ id: "ante", tx: 18, ty: 4 }]),
    (tt.exits = [
      { x0: 2, y0: 10, x1: 2, y1: 11, to: 27, tx: 22, ty: 20 },
      { x0: 2, y0: 14, x1: 2, y1: 15, to: 28, tx: 32, ty: 18 },
      { x0: 10, y0: 0, x1: 13, y1: 0, to: 25, tx: 12, ty: 2 },
    ]),
    (le.t[0][12] = "."),
    (le.t[0][13] = "."),
    (le.t[1][12] = "."),
    (le.t[1][13] = "."),
    le.exits.push({ x0: 12, y0: 0, x1: 13, y1: 0, to: 29, tx: 11, ty: 2 }),
    (t.t[19][43] = "d"),
    (t.t[19][44] = "d"),
    t.exits.push({ x0: 43, y0: 19, x1: 44, y1: 19, to: 30, tx: 5, ty: 8 }));
  let ue = api.be(30, "Wn\u0119trze Wie\u017Cy Zegarowej", 12, 11, "#", "inn");
  ((n = ue.t), api.H(n, 1, 1, 10, 9, "."), (n[10][5] = "_"), (n[10][6] = "_"));
  for (let [k, L] of [
    [2, 3],
    [8, 3],
    [3, 7],
    [7, 7],
  ])
    n[L][k] = "c";
  ((n[2][2] = "K"),
    (n[2][3] = "K"),
    (ue.npcs = [{ id: "horacy", tx: 6, ty: 4 }]),
    (ue.items = [{ kind: "kawa", tx: 8, ty: 6, id: "" }]),
    (ue.chests = [{ id: "clock1", tx: 9, ty: 2 }]),
    (ue.exits = [{ x0: 5, y0: 10, x1: 6, y1: 10, to: 0, tx: 43, ty: 21 }]),
    api.H(t.t, 17, 6, 23, 10, "."),
    api.H(t.t, 18, 7, 22, 9, "h"),
    (t.t[9][19] = "d"),
    (t.t[9][20] = "d"),
    api.pe(
      t.t,
      [
        [19, 10],
        [19, 11],
        [24, 11],
      ],
      ":",
    ),
    t.exits.push({ x0: 19, y0: 9, x1: 20, y1: 9, to: 35, tx: 5, ty: 8 }));
  let z = api.be(35, "Apteka Igi", 14, 11, "#", "inn");
  {
    let k = z.t;
    (api.H(k, 1, 1, 12, 9, "."),
      (k[10][5] = "_"),
      (k[10][6] = "_"),
      api.H(k, 2, 2, 10, 2, "C"),
      (k[3][3] = "T"),
      (k[3][7] = "T"),
      (k[4][4] = "c"),
      (k[4][6] = "c"),
      (k[4][8] = "c"),
      (k[2][11] = "K"),
      (k[3][11] = "K"),
      (k[4][11] = "K"),
      (k[6][11] = "K"),
      (k[2][1] = "O"),
      (k[7][2] = "B"),
      (k[8][2] = "B"),
      (k[7][9] = "A"),
      (k[5][1] = "F"),
      api.H(k, 6, 6, 9, 7, "R"),
      (z.npcs = [{ id: "iga", tx: 6, ty: 3 }]),
      (z.items = [{ kind: "kawa", tx: 10, ty: 5, id: "" }]),
      (z.chests = [{ id: "aptek", tx: 11, ty: 8 }]),
      (z.exits = [{ x0: 5, y0: 10, x1: 6, y1: 10, to: 0, tx: 19, ty: 11 }]));
  }
  ((j.t[18][6] = "d"),
    (j.t[18][7] = "d"),
    j.exits.push({ x0: 6, y0: 18, x1: 7, y1: 18, to: 36, tx: 5, ty: 8 }));
  let R = api.be(36, "Laboratorium Polowe", 13, 10, "#", "undead");
  {
    let k = R.t;
    (api.H(k, 1, 1, 11, 8, "."),
      (k[9][5] = "_"),
      (k[9][6] = "_"),
      (k[2][2] = "K"),
      (k[2][3] = "K"),
      (k[2][8] = "K"),
      (k[2][9] = "K"),
      (k[4][5] = "T"),
      (k[5][4] = "c"),
      (k[5][6] = "c"),
      (k[3][10] = "B"),
      (k[7][2] = "B"),
      (k[6][9] = "A"),
      (k[2][5] = "F"),
      (k[7][7] = "x"),
      (R.npcs = [{ id: "gienia", tx: 6, ty: 4 }]),
      (R.items = [{ kind: "banka", tx: 9, ty: 6, id: "" }]),
      (R.chests = [{ id: "labiga", tx: 10, ty: 2 }]),
      (R.exits = [{ x0: 5, y0: 9, x1: 6, y1: 9, to: 13, tx: 6, ty: 20 }]));
  }
  let arch = api.be(37, "Archiwum Milczenia", 22, 16, "#", "server");
  ((n = arch.t),
    api.H(n, 1, 1, 20, 14, "."),
    api.H(n, 8, 4, 9, 10, "#"),
    api.H(n, 8, 7, 9, 7, "."),
    (n[15][10] = "."),
    (n[15][11] = "."),
    (arch.npcs = [{ id: "roma", tx: 4, ty: 4 }]),
    (arch.spawns = [
      ["audit", 16, 6],
      ["shield", 14, 10],
      ["spam", 6, 11],
    ]),
    (arch.chests = [{ id: "arch1", tx: 18, ty: 3 }]),
    (arch.items = [{ kind: "ekspres", tx: 18, ty: 12, id: "" }]),
    (arch.exits = [{ x0: 10, y0: 15, x1: 11, y1: 15, to: 5, tx: 44, ty: 16 }]),
    (u.t[16][46] = "."),
    (u.t[17][46] = "."),
    (u.t[16][47] = "."),
    (u.t[17][47] = "."),
    u.exits.push({ x0: 47, y0: 16, x1: 47, y1: 17, to: 37, tx: 10, ty: 13 }));
  api.H(w.t, 7, 0, 15, 4, ".");
  api.H(w.t, 8, 1, 14, 3, "h");
  w.t[3][11] = "d";
  api.pe(
    w.t,
    [
      [10, 12],
      [10, 4],
    ],
    ":",
  );
  w.exits = w.exits.filter((k) => k.to !== 10);
  w.exits.push({ x0: 11, y0: 3, x1: 11, y1: 3, to: 10, tx: 12, ty: 22 });
  ((j.t[3][28] = "."), (j.t[3][29] = "."), (j.t[2][28] = "."), (j.t[2][29] = "."));
  ((j.t[14][36] = "."), (j.t[14][37] = "."), (j.t[15][36] = "."), (j.t[15][37] = "."));
  api.pe(
    i.t,
    [
      [22, 23],
      [22, 31],
    ],
    ":",
  );
  i.exits.push({ x0: 22, y0: 31, x1: 23, y1: 31, to: 38, tx: 20, ty: 2 });
  let ham = api.be(38, "Przysi\u00F3\u0142ek za M\u0142ynem", 41, 29, "t", "grass");
  {
    let k = ham.t;
    (api.H(k, 1, 1, 39, 27, "."),
      api.Ie(k, e, 1, 1, 39, 27, "t", 0.035, "."),
      api.Ie(k, e, 1, 1, 39, 27, ",", 0.06, "."),
      api.Ie(k, e, 1, 1, 39, 27, "b", 0.02, "."),
      api.pe(
        k,
        [
          [20, 0],
          [20, 14],
          [8, 14],
        ],
        ":",
      ),
      api.pe(
        k,
        [
          [20, 14],
          [32, 14],
          [40, 14],
        ],
        ":",
      ),
      api.pe(
        k,
        [
          [20, 14],
          [20, 22],
          [28, 22],
        ],
        ":",
      ),
      api.H(k, 5, 5, 11, 10, "."),
      api.H(k, 6, 6, 10, 8, "h"),
      (k[8][8] = "d"),
      api.pe(
        k,
        [
          [8, 14],
          [8, 9],
        ],
        ":",
      ),
      api.H(k, 27, 5, 33, 10, "."),
      api.H(k, 28, 6, 32, 8, "h"),
      (k[8][30] = "d"),
      api.pe(
        k,
        [
          [30, 14],
          [30, 9],
        ],
        ":",
      ),
      (k[16][18] = "H"),
      api.H(k, 2, 20, 7, 25, "w"),
      api.H(k, 31, 17, 38, 17, "t"),
      api.H(k, 38, 17, 38, 25, "t"),
      api.H(k, 31, 25, 38, 25, "t"),
      api.H(k, 31, 17, 31, 25, "t"),
      (k[20][31] = "."),
      (k[21][31] = "."),
      api.H(k, 32, 18, 37, 24, "."),
      (k[19][34] = ","),
      (k[22][36] = ","),
      (k[20][35] = "."),
      api.pe(
        k,
        [
          [28, 22],
          [32, 22],
        ],
        ":",
      ),
      (ham.npcs = [
        { id: "wicek", tx: 26, ty: 20 },
        { id: "franek", tx: 24, ty: 12 },
      ]),
      (ham.spawns = [
        ["slime", 6, 16],
        ["slime", 14, 24],
        ["bat", 36, 10],
      ]),
      (ham.chests = [{ id: "hamcache", tx: 4, ty: 16 }]),
      (ham.items = [{ kind: "kawa", tx: 12, ty: 8, id: "" }]),
      (ham.sheep = [
        { tx: 33, ty: 19, x0: 32, y0: 18, x1: 37, y1: 24 },
        { tx: 36, ty: 22, x0: 32, y0: 18, x1: 37, y1: 24 },
        { tx: 34, ty: 23, x0: 32, y0: 18, x1: 37, y1: 24 },
        { tx: 36, ty: 19, x0: 32, y0: 18, x1: 37, y1: 24, dark: !0 },
      ]),
      (ham.exits = [
        { x0: 20, y0: 0, x1: 21, y1: 0, to: 1, tx: 22, ty: 30 },
        { x0: 8, y0: 8, x1: 8, y1: 8, to: 39, tx: 4, ty: 5 },
        { x0: 30, y0: 8, x1: 30, y1: 8, to: 40, tx: 4, ty: 5 },
        { x0: 40, y0: 14, x1: 40, y1: 15, to: 43, tx: 2, ty: 15 },
      ]));
  }
  let wHome = api.be(39, "Chata Wicka", 9, 7, "#", "inn");
  {
    let k = wHome.t;
    (api.H(k, 1, 1, 7, 5, "."),
      (k[6][4] = "_"),
      (k[2][2] = "B"),
      (k[2][3] = "B"),
      (k[2][6] = "K"),
      (k[4][3] = "T"),
      (k[4][5] = "c"),
      (wHome.chests = [{ id: "wicek1", tx: 6, ty: 4 }]),
      (wHome.items = [{ kind: "kawa", tx: 2, ty: 4, id: "" }]),
      (wHome.exits = [{ x0: 4, y0: 6, x1: 4, y1: 6, to: 38, tx: 8, ty: 9 }]));
  }
  let gHome = api.be(40, "Chata Genowefy", 9, 7, "#", "inn");
  {
    let k = gHome.t;
    (api.H(k, 1, 1, 7, 5, "."),
      (k[6][4] = "_"),
      (k[2][2] = "K"),
      (k[2][6] = "F"),
      (k[3][4] = "T"),
      (k[4][3] = "c"),
      (gHome.npcs = [{ id: "genowefa", tx: 6, ty: 4 }]),
      (gHome.chests = [{ id: "genhome", tx: 2, ty: 4 }]),
      (gHome.exits = [{ x0: 4, y0: 6, x1: 4, y1: 6, to: 38, tx: 30, ty: 9 }]));
  }
  let crown = api.be(41, "Czubek Młyna", 13, 11, "#", "inn");
  {
    let k = crown.t;
    (api.H(k, 1, 1, 11, 9, "."),
      (k[3][6] = "U"),
      (k[2][2] = "B"),
      (k[2][3] = "j"),
      (k[2][9] = "J"),
      (k[7][2] = "B"),
      (k[8][10] = "j"),
      (crown.chests = [{ id: "milltop", tx: 10, ty: 2 }]),
      (crown.exits = [{ x0: 6, y0: 3, x1: 6, y1: 3, to: 33, tx: 6, ty: 5 }]));
  }
  let bloft = api.be(42, "Piętro Basi", 13, 11, "#", "inn");
  {
    let k = bloft.t;
    (api.H(k, 1, 1, 11, 9, "."),
      (k[6][6] = "U"),
      (k[2][2] = "B"),
      (k[2][3] = "B"),
      (k[2][4] = "j"),
      (k[2][10] = "J"),
      (k[3][10] = "j"),
      (k[8][2] = "K"),
      (k[8][3] = "K"),
      (bloft.chests = [{ id: "basloft", tx: 10, ty: 8 }]),
      (bloft.spawns = [["rat", 4, 8]]),
      (bloft.exits = [{ x0: 6, y0: 6, x1: 6, y1: 6, to: 19, tx: 11, ty: 6 }]));
  }
  let past = api.be(43, "Pastwisko za Płotem", 41, 27, "t", "grass");
  {
    let k = past.t;
    (api.H(k, 1, 1, 39, 25, "."),
      api.Ie(k, e, 1, 1, 39, 25, "t", 0.04, "."),
      api.Ie(k, e, 1, 1, 39, 25, ",", 0.05, "."),
      api.Ie(k, e, 1, 1, 39, 25, "b", 0.012, "."),
      api.pe(
        k,
        [
          [0, 15],
          [20, 15],
        ],
        ":",
      ),
      api.pe(
        k,
        [
          [20, 15],
          [20, 11],
          [25, 11],
        ],
        ":",
      ),
      api.pe(
        k,
        [
          [20, 15],
          [20, 22],
          [25, 22],
        ],
        ":",
      ),
      api.pe(
        k,
        [
          [8, 15],
          [8, 20],
        ],
        ":",
      ),
      api.H(k, 4, 4, 14, 4, "t"),
      api.H(k, 14, 4, 14, 12, "t"),
      api.H(k, 4, 12, 14, 12, "t"),
      api.H(k, 4, 4, 4, 12, "t"),
      api.H(k, 5, 5, 13, 11, "."),
      (k[12][8] = "."),
      (k[12][9] = "."),
      api.H(k, 22, 6, 28, 11, "."),
      api.H(k, 23, 7, 27, 9, "h"),
      (k[9][25] = "d"),
      (k[10][25] = "."),
      (k[11][25] = "."),
      (k[12][25] = "."),
      api.H(k, 22, 16, 28, 23, "."),
      api.H(k, 23, 18, 27, 20, "h"),
      (k[20][25] = "d"),
      (k[21][25] = "."),
      (k[22][25] = "."),
      (k[23][25] = "."),
      (k[20][8] = "H"),
      (past.npcs = [{ id: "hela", tx: 12, ty: 14 }]),
      (past.spawns = [
        ["slime", 30, 12],
        ["spider", 34, 18],
        ["bat", 18, 22],
        ["slime", 32, 22],
      ]),
      (past.sheep = [
        { tx: 7, ty: 7, x0: 5, y0: 5, x1: 13, y1: 11 },
        { tx: 10, ty: 8, x0: 5, y0: 5, x1: 13, y1: 11 },
        { tx: 12, ty: 10, x0: 5, y0: 5, x1: 13, y1: 11 },
        { tx: 8, ty: 10, x0: 5, y0: 5, x1: 13, y1: 11, dark: !0 },
        { tx: 10, ty: 18, x0: 6, y0: 16, x1: 16, y1: 23 },
        { tx: 14, ty: 20, x0: 6, y0: 16, x1: 16, y1: 23 },
      ]));
    for (let sh of past.sheep) {
      let tl = k[sh.ty][sh.tx];
      (tl === "t" || tl === "b" || tl === "r" || tl === "," || tl === "h") && (k[sh.ty][sh.tx] = ".");
    }
    past.exits = [
      { x0: 0, y0: 15, x1: 0, y1: 16, to: 38, tx: 39, ty: 14 },
      { x0: 25, y0: 9, x1: 25, y1: 9, to: 44, tx: 6, ty: 8 },
      { x0: 25, y0: 20, x1: 25, y1: 20, to: 45, tx: 6, ty: 8 },
    ];
  }
  let stone = api.be(44, "Kamienna Zagroda", 13, 11, "#", "ruins");
  {
    let k = stone.t,
      rows = [
        "#############",
        "###########.#",
        "######.....E#",
        "######.######",
        "##o.......o##",
        "####.#.#.####",
        "####.#.#.####",
        "##...#.#...##",
        "##.#.#.#.#.##",
        "##.........##",
        "######_######",
      ];
    for (let yy = 0; yy < 11; yy++) for (let xx = 0; xx < 13; xx++) k[yy][xx] = rows[yy][xx];
    ((stone.blocks = [
      { tx: 3, ty: 7, flag: "kamienie", goal: [2, 4] },
      { tx: 9, ty: 7, flag: "kamienie", goal: [10, 4] },
    ]),
      (stone.plates = [
        { tx: 2, ty: 4, flag: "kamienie" },
        { tx: 10, ty: 4, flag: "kamienie" },
      ]),
      (stone.gateFlag = "kamienie"),
      (stone.chests = [{ id: "past1", tx: 11, ty: 1 }]),
      (stone.exits = [{ x0: 6, y0: 10, x1: 6, y1: 10, to: 43, tx: 25, ty: 12 }]));
  }
  let scale = api.be(45, "Waga Siana", 13, 11, "#", "inn");
  {
    let k = scale.t,
      rows = [
        "#############",
        "###########.#",
        "######.....E#",
        "######.######",
        "##N#.#...#.##",
        "##.#.#.#.#.##",
        "##.......#.##",
        "##.#.#.#.#.##",
        "####.#N#.#.##",
        "##...#.#..N##",
        "######_######",
      ];
    for (let yy = 0; yy < 11; yy++) for (let xx = 0; xx < 13; xx++) k[yy][xx] = rows[yy][xx];
    ((scale.toggles = [
      { tx: 2, ty: 4 },
      { tx: 6, ty: 8 },
      { tx: 10, ty: 9 },
    ]),
      (scale.solve = [!0, !1, !0]),
      (scale.gateFlag = "waga"),
      (scale.chests = [{ id: "wagac", tx: 11, ty: 1 }]),
      (scale.exits = [{ x0: 6, y0: 10, x1: 6, y1: 10, to: 43, tx: 25, ty: 23 }]));
  }
  let elo = api.be(46, "Strych Chatki", 13, 9, "#", "inn");
  {
    let k = elo.t;
    (api.H(k, 1, 1, 11, 7, "."),
      (k[6][6] = "U"),
      (k[2][2] = "B"),
      (k[2][3] = "j"),
      (k[2][9] = "J"),
      (k[3][9] = "B"),
      (k[5][2] = "J"),
      (elo.chests = [{ id: "easloft", tx: 10, ty: 2 }]),
      (elo.spawns = [
        ["rat", 4, 5],
        ["spider", 8, 4],
      ]),
      (elo.exits = [{ x0: 6, y0: 6, x1: 6, y1: 6, to: 17, tx: 6, ty: 5 }]));
  }
  let O = [
      t,
      i,
      a,
      r,
      s,
      u,
      f,
      c,
      y,
      w,
      b,
      x,
      M,
      j,
      D,
      l,
      d,
      g,
      C,
      P,
      N,
      W,
      ie,
      ze,
      ke,
      le,
      ve,
      Te,
      ft,
      tt,
      ue,
      v,
      S,
      Q,
      _,
      z,
      R,
      arch,
      ham,
      wHome,
      gHome,
      crown,
      bloft,
      past,
      stone,
      scale,
      elo,
    ],
    q = (k) => O.find((L) => L.id === k);
  for (let [k, L, ce, je] of [
    [0, "zdzich", 16, 20],
    [0, "grazyna", 34, 10],
    [0, "filip", 15, 26],
    [0, "darek", 42, 12],
    [1, "ola", 10, 20],
    [1, "rysiek", 28, 13],
    [2, "edek", 5, 17],
    [9, "staszek", 25, 14],
    [11, "mirek", 25, 16],
    [13, "kuba", 30, 26],
    [6, "henio", 13, 5],
  ])
    q(k).npcs.push({ id: L, tx: ce, ty: je });
  for (let k of api.Qi)
    k.steps.forEach((L, ce) => {
      var je;
      if (
        (L.t === "item" &&
          q(L.z).items.push({ kind: "qi", tx: L.tx, ty: L.ty, id: k.id + ":" + ce }),
        L.t === "kill")
      )
        for (let [Be, rt] of L.at) {
          let $i = q(L.z),
            Ha = (je = $i.t[rt]) == null ? void 0 : je[Be];
          (Ha === "t" || Ha === "b" || Ha === "r" || Ha === ",") && ($i.t[rt][Be] = ".");
        }
    });
  for (let k of O) {
    let L = (ce, je) => {
      var rt;
      let Be = (rt = k.t[je]) == null ? void 0 : rt[ce];
      (Be === "t" || Be === "b" || Be === "r" || Be === "," || Be === "#") && (k.t[je][ce] = ".");
    };
    (k.spawns.forEach((ce) => L(ce[1], ce[2])),
      k.npcs.forEach((ce) => L(ce.tx, ce.ty)),
      k.chests.forEach((ce) => L(ce.tx, ce.ty)),
      k.items.forEach((ce) => L(ce.tx, ce.ty)));
  }
  let ye = {};
  for (let k of O) ye[k.id] = k;
  for (let k of O)
    for (let L of k.exits) {
      let ce = ye[L.to];
      if (!ce) continue;
      let je = (F = ce.t[L.ty]) == null ? void 0 : F[L.tx];
      (je === "t" || je === "b" || je === "r" || je === "," || je === "#") &&
        (ce.t[L.ty][L.tx] = ".");
    }
  return O;
};

api.bk = function bk() {
  var e, t;
  for (let n of api.qe)
    for (let i of n.exits) {
      let a = n.t[i.y0];
      if (!a || a[i.x0] !== "d" || i.y0 !== i.y1) continue;
      let r = i.x0,
        s = i.x1;
      for (; "hMd".includes((e = a[r - 1]) != null ? e : "");) r--;
      for (; "hMd".includes((t = a[s + 1]) != null ? t : "");) s++;
      let u = ".";
      for (let y = r; y <= s; y++)
        if (a[y] !== "d") {
          u = a[y];
          break;
        }
      for (let y = r; y <= s; y++) a[y] === "d" && (a[y] = u);
      let f = u === "." ? i.x0 : (r + s) >> 1;
      ((a[f] = "d"), (i.x0 = i.x1 = f));
      let c = n.t[i.y0 + 1];
      (n.id === 0 && c && (c[f] === "." || c[f] === ",") && (c[f] = ":"),
        (s - r) % 2 && u !== "." && api.wk.push("EVEN_BUILDING z" + n.id + " @" + r + "-" + s));
    }
  for (let n of api.qe) {
    let i = n.h - 1,
      a = n.exits.find((c) => c.y0 === i && n.t[i][c.x0] === "_");
    if (!a) continue;
    let r = n.t[i][0];
    if (n.w % 2 === 0) {
      let c = n.w - 1;
      for (let y = 0; y < n.h; y++) {
        let w = n.t[y][c - 1];
        n.t[y].splice(c, 0, y === i ? r : y === 0 || w === "#" || w === "t" ? w : ".");
      }
      n.w++;
    }
    let s = (n.w - 1) >> 1;
    for (let c = 0; c < n.w; c++) n.t[i][c] === "_" && (n.t[i][c] = r);
    ((n.t[i][s] = "_"), (a.x0 = a.x1 = s));
    let u = api.qe[a.to],
      f = u.exits.find((c) => c.to === n.id && u.t[c.y0][c.x0] === "d");
    f && (a.tx = f.x0);
    for (let c of u.exits) c.to === n.id && c.ty >= n.h - 4 && (c.tx = s);
  }
};

api.vk = function vk(e, t, n, i, a) {
  let r = t,
    s = n,
    u = (f, c) => (f < c ? 1 : f > c ? -1 : 0);
  for (; r !== i;)
    ((r += u(r, i)), (api.Cs.has(e.t[s][r]) || e.t[s][r] === ":") && (e.t[s][r] = "."));
  for (; s !== a;)
    ((s += u(s, a)), (api.Cs.has(e.t[s][r]) || e.t[s][r] === ":") && (e.t[s][r] = "."));
};

api.xk = function xk(e, t, n) {
  let i = (u, f) => {
      if (f < 0 || u < 0 || f >= e.h || u >= e.w) return !1;
      let c = e.t[f][u];
      return api.xp.has(c) ? !0 : !api.Cs.has(c);
    },
    a = new Set(),
    r = [],
    s = (u, f) => {
      let c = u + "," + f;
      a.has(c) || !i(u, f) || (a.add(c), r.push([u, f]));
    };
  s(t, n);
  for (let u = 0; u < r.length; u++) {
    let [f, c] = r[u];
    (s(f + 1, c), s(f - 1, c), s(f, c + 1), s(f, c - 1));
  }
  return a;
};

api.gk = function gk() {
  for (let e of api.qe)
    if (e.exits.length)
      for (let t = 0; t < 8; t++) {
        let n = e.exits[0],
          i = api.xk(e, n.x0, n.y0),
          a = null;
        for (let r of e.exits)
          for (let s = r.y0; s <= r.y1 && !a; s++)
            for (let u = r.x0; u <= r.x1; u++)
              if (!i.has(u + "," + s)) {
                a = { x: u, y: s };
                break;
              }
        if (!a) break;
        api.vk(e, a.x, a.y, n.x0, n.y0);
      }
};

api.Sk = function Sk() {
  for (let e of api.qe) {
    let t = (r, s) => {
        if (s < 0 || r < 0 || s >= e.h || r >= e.w) return !1;
        let u = e.t[s][r];
        return api.xp.has(u) ? !0 : !api.Cs.has(u);
      },
      n = new Set(),
      i = [],
      a = (r, s) => {
        let u = r + "," + s;
        n.has(u) || !t(r, s) || (n.add(u), i.push([r, s]));
      };
    for (let r of e.exits)
      for (let s = r.y0; s <= r.y1; s++) for (let u = r.x0; u <= r.x1; u++) a(u, s);
    for (let r of api.qe) for (let s of r.exits) s.to === e.id && a(s.tx, s.ty);
    e.id === api.Qn.zone && a(api.Qn.x, api.Qn.y);
    for (let r = 0; r < i.length; r++) {
      let [s, u] = i[r];
      (a(s + 1, u), a(s - 1, u), a(s, u + 1), a(s, u - 1));
    }
    for (let r = 0; r < e.h; r++)
      for (let s = 0; s < e.w; s++) t(s, r) && (n.has(s + "," + r) || (e.t[r][s] = "#"));
  }
};

/* Lądowanie co najmniej dwa kafelki od każdego wyjścia.
   Górna krawędź prowadzi na dół następnej mapy (i odwrotnie w każdą stronę),
   więc nie da się wejść i od razu wypaść albo dać się odepchnąć w drzwi. */
api.padPortals = function padPortals() {
  const MIN = 2;
  const soft = new Set(["t", ",", "b", "r"]);
  const hard = (c) =>
    !c ||
    (api.xp && api.xp.has(c)) ||
    api.Cs.has(c) ||
    "=ENoSgkqGDVYP".includes(c);
  const edge = (z, ex) => {
    const dn = ex.y0,
      ds = z.h - 1 - ex.y1,
      dw = ex.x0,
      de = z.w - 1 - ex.x1,
      m = Math.min(dn, ds, dw, de);
    if (m > 1) return "in";
    if (m === dn) return "N";
    if (m === ds) return "S";
    if (m === dw) return "W";
    return "E";
  };
  const zoneById = (id) => api.qe.find((z) => z.id === id) || api.qe[id];
  const exitDist = (z, x, y) => {
    let best = 99;
    for (const ex of z.exits)
      for (let yy = ex.y0; yy <= ex.y1; yy++)
        for (let xx = ex.x0; xx <= ex.x1; xx++)
          best = Math.min(best, Math.max(Math.abs(x - xx), Math.abs(y - yy)));
    return best;
  };
  const open = (z, x, y) =>
    y >= 0 && x >= 0 && y < z.h && x < z.w && !hard(z.t[y][x]);
  const taken = (z, x, y) =>
    (z.spawns || []).some((s) => s[1] === x && s[2] === y) ||
    (z.npcs || []).some((s) => s.tx === x && s.ty === y) ||
    (z.chests || []).some((s) => s.tx === x && s.ty === y) ||
    (z.items || []).some((s) => s.tx === x && s.ty === y) ||
    (z.blocks || []).some((s) => s.tx === x && s.ty === y) ||
    (z.levers || []).some((s) => s.tx === x && s.ty === y) ||
    (z.toggles || []).some((s) => s.tx === x && s.ty === y) ||
    (z.plates || []).some((s) => s.tx === x && s.ty === y);
  const seek = (z, ax, ay, ix, iy, avoidBusy) => {
    for (let dist = MIN; dist < Math.max(z.w, z.h) + 2; dist++) {
      const bx = ax + ix * dist,
        by = ay + iy * dist;
      for (let lat = 0; lat <= 10; lat++) {
        const lats = lat === 0 ? [0] : [lat, -lat];
        for (const latv of lats) {
          const x = ix !== 0 ? bx : bx + latv,
            y = iy !== 0 ? by : by + latv;
          if (!open(z, x, y)) continue;
          if (exitDist(z, x, y) < MIN) continue;
          if (avoidBusy && taken(z, x, y)) continue;
          return [x, y];
        }
      }
    }
    return null;
  };
  for (const src of api.qe)
    for (const ex of src.exits) {
      const dest = zoneById(ex.to);
      if (!dest) continue;
      const dir = edge(src, ex);
      const backs = dest.exits.filter((r) => r.to === src.id);
      const back =
        backs.find((r) => edge(dest, r) === { N: "S", S: "N", E: "W", W: "E" }[dir]) ||
        backs[0] ||
        null;
      const be = back ? edge(dest, back) : "in";
      let ax, ay, ix, iy;
      if (dir !== "in" && be === dir && back) {
        const far = { N: "S", S: "N", E: "W", W: "E" }[dir];
        ax = (back.x0 + back.x1) >> 1;
        ay = (back.y0 + back.y1) >> 1;
        if (far === "S") ((ay = dest.h - 1), (ix = 0), (iy = -1));
        else if (far === "N") ((ay = 0), (ix = 0), (iy = 1));
        else if (far === "E") ((ax = dest.w - 1), (ix = -1), (iy = 0));
        else ((ax = 0), (ix = 1), (iy = 0));
      } else if (back) {
        ax = (back.x0 + back.x1) >> 1;
        ay = (back.y0 + back.y1) >> 1;
        let dx = Math.sign(ex.tx - ax),
          dy = Math.sign(ex.ty - ay);
        if (be === "N") ((dx = 0), (dy = 1));
        else if (be === "S") ((dx = 0), (dy = -1));
        else if (be === "W") ((dx = 1), (dy = 0));
        else if (be === "E") ((dx = -1), (dy = 0));
        else if (dx === 0 && dy === 0) {
          const cx = (dest.w - 1) / 2,
            cy = (dest.h - 1) / 2;
          Math.abs(cx - ax) >= Math.abs(cy - ay)
            ? ((dx = Math.sign(cx - ax) || 1), (dy = 0))
            : ((dx = 0), (dy = Math.sign(cy - ay) || -1));
        } else Math.abs(ex.tx - ax) >= Math.abs(ex.ty - ay) ? (dy = 0) : (dx = 0);
        ix = dx;
        iy = dy;
      } else continue;
      const already =
        exitDist(dest, ex.tx, ex.ty) >= MIN &&
        open(dest, ex.tx, ex.ty) &&
        !(dir !== "in" && be === dir);
      if (already) continue;
      const pick = seek(dest, ax, ay, ix, iy, !0) || seek(dest, ax, ay, ix, iy, !1);
      if (!pick) continue;
      ex.tx = pick[0];
      ex.ty = pick[1];
      const c = dest.t[pick[1]][pick[0]];
      soft.has(c) && (dest.t[pick[1]][pick[0]] = ".");
    }
  for (const z of api.qe)
    for (const s of z.spawns || []) {
      if (exitDist(z, s[1], s[2]) >= MIN) continue;
      let best = null,
        score = 99;
      for (let y = 1; y < z.h - 1; y++)
        for (let x = 1; x < z.w - 1; x++) {
          if (!open(z, x, y) || taken(z, x, y)) continue;
          const d = exitDist(z, x, y);
          if (d < MIN) continue;
          const sc = Math.abs(x - s[1]) + Math.abs(y - s[2]);
          sc < score && ((score = sc), (best = [x, y]));
        }
      best && ((s[1] = best[0]), (s[2] = best[1]));
    }
};

api.Ia = function Ia(e, t) {
  let n = e.f["buf:" + t];
  return typeof n == "number" ? Math.max(0, Math.min(api.pn[t].length - 1, n)) : 0;
};
