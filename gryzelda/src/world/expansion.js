// @ts-nocheck
/* Rozbudowa v1.5.0:
   - Skarbiec Przesuwnych Spraw (62–66): trzy sale sokobana + skarbiec z Rękawicą Kustosza,
   - Dział Reklamacji (67–71): loch poza fabułą z mini-bossem Pieczątkarzem i bossem Reklamatorem,
   - dźwignie powiązane (z.links) w zagadkach z dźwigniami,
   - Krąg Kamieni (54) w nowym, niesymetrycznym układzie,
   - Zaginione Pieczątki: 12 znajdziek po całym świecie.
   Układy sal sokobana wygenerował i sprawdził narzedzia/sokogen.mjs + sokoban.mjs. */
import { api } from "../runtime/api.js";

const set = (z, x, y, c) => {
  if (z.t[y] && z.t[y][x] !== void 0) z.t[y][x] = c;
};
const rect = (z, x0, y0, x1, y1, c, only) => {
  for (let y = y0; y <= y1; y++)
    for (let x = x0; x <= x1; x++) {
      if (!z.t[y] || z.t[y][x] === void 0) continue;
      if (only && !only.includes(z.t[y][x])) continue;
      z.t[y][x] = c;
    }
};

/* ---------- dźwignie powiązane ---------- */

export const LEVERS = {
  45: { links: [[0, 1], [1, 2], [2]], solve: [!0, !1, !0] },
  49: { links: [[0, 1], [1, 2], [2, 0, 1]], solve: [!0, !1, !0] },
  51: { links: [[0, 1], [1, 0, 2], [2, 0]], solve: [!0, !1, !1] },
  55: { links: [[0, 1], [1, 2], [2, 0, 1]], solve: [!1, !0, !1] },
};
api.leverPattern = function leverPattern(e, z, target) {
  let order = z.toggles.map((t, i) => [t.tx, i]).sort((a, b) => a[0] - b[0]);
  return order
    .map(([, i]) => {
      let t = z.toggles[i],
        v = target ? !!z.solve[i] : !!e.f["tog:" + z.id + ":" + t.tx + ":" + t.ty];
      return v ? "\u25BC" : "\u25B2";
    })
    .join(" ");
};
api.leverHint = function leverHint(z, intro) {
  return (
    intro +
    " Wzór na kracie (od lewej): " +
    api.leverPattern({ f: {} }, z, !0) +
    ". Dźwignie są powiązane sznurkiem: jedna potrafi pociągnąć sąsiadkę."
  );
};
function applyLevers() {
  for (let id in LEVERS) {
    let z = api.qe[id];
    if (!z || !z.toggles) continue;
    z.links = LEVERS[id].links;
    z.solve = LEVERS[id].solve;
  }
}

/* ---------- Krąg Kamieni (54): nowy, niesymetryczny układ ---------- */

export const KREG = {
  // 15x11, krata w x=7 (schody dalej) i x=11 (skrzynia); 32 pchnięcia minimum
  rows: [
    "###############",
    "##....#.......#",
    "##.##..##...#.#",
    "##..#.#.#.#..##",
    "#.$.#....#...##",
    "#.#..#..#...$##",
    "#.....#...$...#",
    "#.o#..........#",
    "#.o.........###",
    "#o..#.#....#.##",
    "###############",
  ],
};
function buildKreg() {
  let old = api.qe[54],
    z = api.be(54, old.name, 15, 13, "#", old.theme),
    blocks = [],
    plates = [];
  KREG.rows.forEach((r, y) =>
    [...r].forEach((c, x) => {
      let ty = y + 2;
      c === "$" && (blocks.push([x, ty]), (c = "."));
      c === "o" && plates.push([x, ty]);
      z.t[ty][x] = c;
    }),
  );
  set(z, 7, 1, "U");
  set(z, 11, 1, ".");
  set(z, 7, 2, "E");
  set(z, 11, 2, "E");
  set(z, 7, 12, "_");
  z.gateFlag = "kreg";
  z.plates = plates.map(([x, y]) => ({ tx: x, ty: y, flag: "kreg" }));
  z.blocks = blocks.map(([x, y], i) => ({ tx: x, ty: y, flag: "kreg", goal: plates[i] }));
  z.chests = [{ id: "crypt54", tx: 11, ty: 1 }];
  z.spawns = [];
  z.exits = [
    { x0: 7, y0: 12, x1: 7, y1: 12, to: 53, tx: 0, ty: 0 },
    { x0: 7, y0: 1, x1: 7, y1: 1, to: 55, tx: 0, ty: 0 },
  ];
  z.soko = !0;
  api.qe[54] = z;
}

/* ---------- sokoban: sale Skarbca ---------- */

export const SOKO = [
  {
    id: 63,
    name: "Sala I: Sprawa Prosta",
    flag: "sok1",
    gx: 2,
    rows: ["#########", "##..o...#", "#.#$$.o.#", "#.#.##.##", "#......##", "#.......#", "#########"],
  },
  {
    id: 64,
    name: "Sala II: Sprawa Złożona",
    flag: "sok2",
    gx: 8,
    rows: [
      "###########",
      "#...#..#..#",
      "##o#o.....#",
      "#....$$.#.#",
      "#.....#...#",
      "#o#.#...$.#",
      "#.#.......#",
      "#..##.....#",
      "###########",
    ],
  },
  {
    id: 65,
    name: "Sala III: Sprawa Beznadziejna",
    flag: "sok3",
    gx: 9,
    rows: [
      "###########",
      "#....#....#",
      "#.#$$.#...#",
      "#..$..#.###",
      "#.....#...#",
      "#....#....#",
      "#.#.....oo#",
      "##....#.#o#",
      "#.#...#.#.#",
      "###########",
    ],
  },
];

/* Pokój z układu: rząd nad salą ze schodami U do następnej sali, krata E w górnej ścianie, drzwi _ na dole. */
export function sokoRoom(spec, prev, next) {
  let W = spec.rows[0].length,
    H = spec.rows.length,
    cx = W >> 1,
    z = api.be(spec.id, spec.name, W, H + 2, "#", "ruins"),
    blocks = [],
    plates = [];
  spec.rows.forEach((r, y) =>
    [...r].forEach((c, x) => {
      let ty = y + 2;
      c === "$" && (blocks.push([x, ty]), (c = "."));
      c === "o" && plates.push([x, ty]);
      z.t[ty][x] = c;
    }),
  );
  z.t[1][spec.gx] = "U";
  z.t[2][spec.gx] = "E";
  z.t[H + 1][cx] = "_";
  z.gateFlag = spec.flag;
  z.plates = plates.map(([x, y]) => ({ tx: x, ty: y, flag: spec.flag }));
  z.blocks = blocks.map(([x, y], i) => ({ tx: x, ty: y, flag: spec.flag, goal: plates[i] }));
  z.exits = [
    { x0: cx, y0: H + 1, x1: cx, y1: H + 1, to: prev, tx: 0, ty: 0 },
    { x0: spec.gx, y0: 1, x1: spec.gx, y1: 1, to: next, tx: 0, ty: 0 },
  ];
  z.soko = !0;
  return z;
}

function buildVault() {
  // Wejście: kamienna ruina na południowym wschodzie Zachodnich Pól (strefa 9).
  let f = api.qe[9];
  rect(f, 35, 22, 41, 24, "h");
  set(f, 38, 24, "d");
  rect(f, 37, 25, 38, 26, ":");
  rect(f, 30, 22, 31, 26, ":");
  rect(f, 32, 25, 36, 26, ":");
  f.exits.push({ x0: 38, y0: 24, x1: 38, y1: 24, to: 62, tx: 5, ty: 6 });

  // 62 Przedsionek: Kustosz i krata, która wpuszcza dopiero po Kamiennej Zagrodzie.
  let p = api.be(62, "Przedsionek Skarbca", 11, 9, "#", "ruins");
  rect(p, 1, 3, 9, 7, ".");
  set(p, 5, 1, "U");
  set(p, 5, 2, "E");
  set(p, 5, 8, "_");
  for (let [x, y] of [[1, 3], [9, 3]]) set(p, x, y, "K");
  for (let [x, y] of [[1, 7], [9, 7]]) set(p, x, y, "B");
  set(p, 8, 5, "H");
  p.gateFlag = "kamienie";
  p.gateHint =
    "Krata Skarbca ani drgnie. Na tabliczce: „Wstęp tylko dla osób, które przesunęły już coś w życiu. Najlepiej kamień.”";
  p.npcs = [{ id: "kustosz", tx: 3, ty: 4 }];
  p.exits = [
    { x0: 5, y0: 8, x1: 5, y1: 8, to: 9, tx: 38, ty: 26 },
    { x0: 5, y0: 1, x1: 5, y1: 1, to: 63, tx: 0, ty: 0 },
  ];
  api.qe[62] = p;

  api.qe[63] = sokoRoom(SOKO[0], 62, 64);
  api.qe[64] = sokoRoom(SOKO[1], 63, 65);
  api.qe[65] = sokoRoom(SOKO[2], 64, 66);

  // 66 Skarbiec: nagroda.
  let s = api.be(66, "Skarbiec Przesuwnych Spraw", 11, 9, "#", "server");
  rect(s, 1, 1, 9, 7, ".");
  set(s, 5, 8, "_");
  for (let x of [1, 2, 8, 9]) set(s, x, 1, "K");
  for (let [x, y] of [[2, 4], [8, 4]]) set(s, x, y, "O");
  s.chests = [
    { id: "skarbiec", tx: 5, ty: 2 },
    { id: "skarbiec_l", tx: 1, ty: 6 },
    { id: "skarbiec_p", tx: 9, ty: 6 },
  ];
  s.exits = [{ x0: 5, y0: 8, x1: 5, y1: 8, to: 65, tx: 0, ty: 0 }];
  api.qe[66] = s;
}

/* ---------- loch: Dział Reklamacji ---------- */

function buildLoch() {
  // wejście: schody na końcu pomostu w Przystani (60)
  let pr = api.qe[60];
  set(pr, 15, 16, "U");
  pr.exits.push({ x0: 15, y0: 16, x1: 15, y1: 16, to: 67, tx: 12, ty: 3 });

  // 67 Poczekalnia
  let a = api.be(67, "Dział Reklamacji: Poczekalnia", 25, 15, "#", "undead");
  rect(a, 1, 2, 23, 13, ".");
  set(a, 12, 1, "U");
  for (let y of [5, 9]) for (let x of [4, 6, 8, 10, 14, 16, 18, 20]) set(a, x, y, "c");
  rect(a, 1, 2, 4, 2, "K");
  rect(a, 20, 2, 23, 2, "K");
  for (let [x, y] of [[2, 12], [3, 12], [22, 12]]) set(a, x, y, "B");
  set(a, 12, 12, "H");
  rect(a, 0, 7, 0, 8, ".");
  rect(a, 24, 7, 24, 8, ".");
  a.npcs = [{ id: "numerek", tx: 12, ty: 7 }];
  a.spawns = [
    ["zombie", 6, 7],
    ["zombie", 19, 11],
    ["phone", 19, 3],
    ["rat", 5, 11],
    ["bat", 9, 10],
  ];
  a.exits = [
    { x0: 12, y0: 1, x1: 12, y1: 1, to: 60, tx: 15, ty: 14 },
    { x0: 0, y0: 7, x1: 0, y1: 8, to: 69, tx: 14, ty: 6 },
    { x0: 24, y0: 7, x1: 24, y1: 8, to: 68, tx: 2, ty: 6 },
  ];
  api.qe[67] = a;

  // 68 Korytarz Odrzuconych Wniosków: rozgałęziony, z kratą do gabinetu i pękniętą ścianą do archiwum
  let b = api.be(68, "Korytarz Odrzuconych Wniosków", 31, 15, "#", "undead");
  rect(b, 0, 6, 25, 7, ".");
  rect(b, 6, 2, 7, 12, ".");
  rect(b, 14, 2, 15, 12, ".");
  rect(b, 22, 1, 23, 12, ".");
  rect(b, 6, 2, 15, 3, ".");
  rect(b, 14, 11, 23, 12, ".");
  rect(b, 2, 10, 4, 12, ".");
  set(b, 5, 11, ".");
  rect(b, 18, 2, 20, 4, ".");
  set(b, 21, 3, ".");
  rect(b, 22, 1, 23, 1, "E");
  rect(b, 22, 0, 23, 0, ".");
  rect(b, 26, 6, 26, 7, "X");
  rect(b, 27, 6, 30, 7, ".");
  for (let [x, y] of [[9, 5], [11, 5], [17, 8], [19, 8], [24, 5]]) set(b, x, y, "K");
  b.gateFlag = "pieczatkarz";
  b.gateHint =
    "Krata z tabliczką „Kierownik przyjmuje po okazaniu pieczątki”. Pieczątki tu nie ma. Ktoś w tym lochu ją trzyma.";
  b.chests = [
    { id: "loch_kor", tx: 2, ty: 11 },
    { id: "loch_szafa", tx: 19, ty: 2 },
  ];
  b.spawns = [
    ["shield", 10, 6],
    ["ticket", 15, 9],
    ["charger", 19, 7],
    ["spider", 6, 10],
    ["zombie", 22, 5],
    ["phone", 11, 3],
    ["rat", 3, 11],
  ];
  b.exits = [
    { x0: 0, y0: 6, x1: 0, y1: 7, to: 67, tx: 22, ty: 7 },
    { x0: 22, y0: 0, x1: 23, y1: 0, to: 71, tx: 10, ty: 14 },
    { x0: 30, y0: 6, x1: 30, y1: 7, to: 70, tx: 2, ty: 4 },
  ];
  api.qe[68] = b;

  // 69 Sala Pieczątkarza (mini-boss)
  let c = api.be(69, "Sala Pieczątkarza", 17, 13, "#", "undead");
  rect(c, 1, 1, 15, 11, ".");
  rect(c, 16, 6, 16, 7, ".");
  for (let [x, y] of [[4, 3], [12, 3], [4, 9], [12, 9]]) set(c, x, y, "O");
  for (let x of [1, 2, 3]) set(c, x, 1, "K");
  c.chests = [{ id: "loch_piecz", tx: 1, ty: 6 }];
  c.spawns = [
    ["stamper", 6, 6],
    ["rat", 3, 3],
    ["rat", 3, 10],
  ];
  c.exits = [{ x0: 16, y0: 6, x1: 16, y1: 7, to: 67, tx: 2, ty: 7 }];
  api.qe[69] = c;

  // 70 Archiwum Zapomnianych Haseł (sekret za pękniętą ścianą)
  let d = api.be(70, "Archiwum Zapomnianych Haseł", 13, 9, "#", "server");
  rect(d, 1, 1, 11, 7, ".");
  rect(d, 0, 3, 0, 4, ".");
  rect(d, 2, 1, 10, 1, "K");
  for (let [x, y] of [[4, 5], [8, 5]]) set(d, x, y, "T");
  d.npcs = [{ id: "haslo", tx: 6, ty: 3 }];
  d.chests = [{ id: "loch_haslo", tx: 11, ty: 6 }];
  d.exits = [{ x0: 0, y0: 3, x1: 0, y1: 4, to: 68, tx: 27, ty: 6 }];
  api.qe[70] = d;

  // 71 Gabinet Kierownika Reklamacji (boss)
  let g = api.be(71, "Gabinet Kierownika Reklamacji", 21, 17, "#", "server");
  rect(g, 1, 1, 19, 15, ".");
  rect(g, 10, 16, 11, 16, ".");
  for (let [x, y] of [[5, 5], [15, 5], [5, 11], [15, 11]]) set(g, x, y, "O");
  rect(g, 8, 3, 12, 3, "T");
  rect(g, 1, 1, 4, 1, "K");
  rect(g, 16, 1, 19, 1, "K");
  g.chests = [{ id: "loch_boss", tx: 10, ty: 2 }];
  g.spawns = [["reklamator", 10, 7]];
  g.exits = [{ x0: 10, y0: 16, x1: 11, y1: 16, to: 68, tx: 22, ty: 2 }];
  api.qe[71] = g;
}

/* ---------- Zaginione Pieczątki ---------- */

export const STAMPS = [
  [1, 57, 2],
  [2, 3, 33],
  [38, 2, 26],
  [8, 1, 1],
  [43, 38, 25],
  [9, 45, 25],
  [11, 2, 2],
  [60, 29, 2],
  [66, 5, 6],
  [70, 1, 6],
  [26, 2, 2],
  [52, 1, 1],
];
export function placeStamps() {
  api.stampSpots = [];
  STAMPS.forEach(([zid, x, y], i) => {
    let z = api.qe[zid];
    if (!z) return;
    let ok = (xx, yy) =>
      z.t[yy] &&
      z.t[yy][xx] !== void 0 &&
      !api.Qo({ zone: zid, f: {}, cut: {} }, z.t[yy][xx]) &&
      !"_dUHEo=cq".includes(z.t[yy][xx]) &&
      !z.exits.some((e) => xx >= e.x0 - 2 && xx <= e.x1 + 2 && yy >= e.y0 - 2 && yy <= e.y1 + 2) &&
      !(z.chests || []).some((c) => Math.abs(c.tx - xx) + Math.abs(c.ty - yy) < 2) &&
      !(z.npcs || []).some((c) => c.tx === xx && c.ty === yy) &&
      !(z.items || []).some((c) => c.tx === xx && c.ty === yy);
    let best = null;
    for (let r = 0; r < 8 && !best; r++)
      for (let yy = y - r; yy <= y + r && !best; yy++)
        for (let xx = x - r; xx <= x + r && !best; xx++) ok(xx, yy) && (best = [xx, yy]);
    if (!best) return;
    z.items.push({ kind: "stamp", tx: best[0], ty: best[1], id: "stamp" + (i + 1) });
    api.stampSpots.push([zid, best[0], best[1]]);
  });
}
api.stampTotal = STAMPS.length;
api.stampCount = (e) => STAMPS.filter((s, i) => e.cut["item:stamp" + (i + 1)]).length;

/* ---------- podpowiedzi przy wejściu ---------- */

api.enterHints = {
  62: "Przedsionek Skarbca. Kustosz pilnuje, żeby nikt nie przesunął niczego bez zgody. Chyba że kamień.",
  63: "Sala I. Kamienie na płyty. Utknęło? Użyj z dala od wszystkiego albo Dziennik → Przywróć. Wyjście z sali też ją resetuje.",
  64: "Sala II. Trzy kamienie. Kolejność ma tu większe znaczenie niż w urzędzie.",
  65: "Sala III. Kustosz nazywa ją „Sprawa Beznadziejna”. Kustosz przesadza. Trochę.",
  67: "Dział Reklamacji. Poczekalnia pełna ludzi, którzy czekają tak długo, że przestali być ludźmi.",
  69: "Sala Pieczątkarza. Słychać rytmiczne PAC. PAC. PAC.",
  70: "Archiwum Zapomnianych Haseł. Na każdej półce: „hasło123”, „hasło1234”, „HASŁO123!”.",
  71: "Gabinet Kierownika Reklamacji. Na drzwiach: „Reklamacje rozpatrujemy w 14 dni. Lat.”",
};
api.enterHint = function enterHint(e, t) {
  let h = api.enterHints[t];
  if (!h || e.cut["hint:z" + t]) return;
  e.cut["hint:z" + t] = !0;
  api.ne(e, h, 4.2);
};

/* ---------- składanie ---------- */

api.expandWorld = function expandWorld() {
  if (api.qe[62]) return;
  applyLevers();
  buildVault();
  buildLoch();
  buildKreg();
  placeStamps();
};
api.vaultZones = [62, 63, 64, 65, 66];
api.vaultAct = 2;
api.lochZones = [67, 68, 69, 70, 71];
api.lochAct = 2;
