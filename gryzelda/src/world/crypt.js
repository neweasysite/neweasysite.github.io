// @ts-nocheck
/* Katakumby pod Lasem Szeptów. Sale dokładane po zbudowaniu świata,
   więc indeks strefy zostaje równy jej numerowi.
   Przejścia między piętrami są jednym kafelkiem w obie strony.
   Sale z dźwigniami i kamieniami mają mury, a skrzynia stoi w niszy za kratą. */
import { api } from "../runtime/api.js";

function blank(w, h) {
  return Array.from({ length: h }, () => Array(w).fill("#"));
}

function rows(lines) {
  return lines.map((s) => [...s]);
}

function openHall() {
  let g = blank(15, 15);
  for (let y = 2; y < 14; y++) for (let x = 1; x < 14; x++) g[y][x] = ".";
  g[14][7] = "_";
  g[1][7] = "U";
  return g;
}

function carveMaze(seed) {
  let cells = 5,
    pitch = 4,
    W = cells * pitch + 1,
    H = cells * pitch + 1,
    g = blank(W, H),
    seen = Array.from({ length: cells }, () => Array(cells).fill(!1)),
    s = seed >>> 0,
    rnd = () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0), s / 4294967296),
    dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ],
    visit = (cx, cy) => {
      seen[cy][cx] = !0;
      let ox = 1 + cx * pitch,
        oy = 1 + cy * pitch;
      for (let dy = 0; dy < 3; dy++) for (let dx = 0; dx < 3; dx++) g[oy + dy][ox + dx] = ".";
      let order = dirs.slice();
      for (let i = order.length - 1; i > 0; i--) {
        let j = Math.floor(rnd() * (i + 1)),
          tmp = order[i];
        ((order[i] = order[j]), (order[j] = tmp));
      }
      for (let [dx, dy] of order) {
        let nx = cx + dx,
          ny = cy + dy;
        if (nx < 0 || ny < 0 || nx >= cells || ny >= cells || seen[ny][nx]) continue;
        dx === 1 && (g[oy + 1][ox + 3] = ".");
        dx === -1 && (g[oy + 1][ox - 1] = ".");
        dy === 1 && (g[oy + 3][ox + 1] = ".");
        dy === -1 && (g[oy - 1][ox + 1] = ".");
        visit(nx, ny);
      }
    };
  visit(2, 2);
  let door = 10;
  ((g[H - 1][door] = "_"),
    g[H - 2][door] === "#" && (g[H - 2][door] = "."),
    (g[0][door] = "U"),
    g[1][door] === "#" && (g[1][door] = "."));
  return g;
}

function pitRoom() {
  return rows([
    "###############",
    "#######U#######",
    "#######E#######",
    "#######.....E.#",
    "#######.#######",
    "#######.#######",
    "###.........###",
    "###.###.###.###",
    "###.#N#.###.###",
    "###.#.#.###.###",
    "###.#.......###",
    "###.###.###.N##",
    "##N..........##",
    "##...........##",
    "#######_#######",
  ]);
}

function pit2Room() {
  return rows([
    "###############",
    "#######U#######",
    "#######E#######",
    "#######.....E.#",
    "#######.#######",
    "#######.#######",
    "##N####.#######",
    "##.####.#######",
    "##.####.####N##",
    "##...##.####.##",
    "####.##.##...##",
    "####.##.##.####",
    "##......N....##",
    "##...........##",
    "#######_#######",
  ]);
}

function wagaRoom() {
  return rows([
    "###############",
    "#######U#######",
    "#######E#######",
    "#######.....E.#",
    "#######.#######",
    "#######.#######",
    "#######.#######",
    "#######.###N###",
    "##N...#.###..##",
    "###.###.##..###",
    "###.###N##..###",
    "###.###.##..###",
    "###.###.##..###",
    "##...........##",
    "#######_#######",
  ]);
}

function sokobanRoom() {
  return rows([
    "###############",
    "#######U#######",
    "#######E#######",
    "#######.....E.#",
    "#######.#######",
    "#######.#######",
    "##o.........o##",
    "#####.#.#.#####",
    "#####.#.#.#####",
    "#####.#.#.#####",
    "##....###....##",
    "##.#..#.#..#.##",
    "##...........##",
    "#######.#######",
    "#######_#######",
  ]);
}

function lay(z, g) {
  for (let y = 0; y < z.h; y++) for (let x = 0; x < z.w; x++) z.t[y][x] = g[y][x];
}

api.buildCrypt = function buildCrypt() {
  if (api.qe.some((z) => z.id === 47)) return;
  let spec = [
      ["hall", "Próg Katakumb", "undead"],
      ["maze", "Labirynt Echa", "undead", 7],
      ["pit", "Sala Zapadni", "undead"],
      ["maze", "Labirynt Mgły", "undead", 11],
      ["waga", "Waga Popiołu", "ruins"],
      ["gallery", "Galeria Świec", "ruins"],
      ["maze", "Labirynt Korzeni", "undead", 21],
      ["sokoban", "Krąg Kamieni", "ruins"],
      ["pit2", "Druga Zapadnia", "undead"],
      ["gallery", "Nawa Cienia", "undead"],
      ["maze", "Labirynt Prochu", "ruins", 34],
      ["gallery", "Przedsionek Moroka", "undead"],
      ["boss", "Sanktuarium Moroka", "server"],
    ],
    puzzles = { pit: pitRoom, pit2: pit2Room, waga: wagaRoom, sokoban: sokobanRoom },
    rooms = spec.map((s, i) => {
      let id = 47 + i,
        kind = s[0],
        maze = kind === "maze",
        g = maze ? carveMaze(s[3]) : puzzles[kind] ? puzzles[kind]() : openHall();
      if (kind === "gallery") {
        for (let [x, y] of [
          [2, 5],
          [3, 5],
          [2, 6],
          [3, 6],
          [11, 5],
          [12, 5],
          [11, 6],
          [12, 6],
          [2, 9],
          [3, 9],
          [2, 10],
          [3, 10],
          [11, 9],
          [12, 9],
          [11, 10],
          [12, 10],
        ])
          g[y][x] = "#";
      }
      if (kind === "boss") {
        for (let x = 3; x <= 11; x += 2) ((g[4][x] = "c"), (g[10][x] = "c"));
        g[1][7] = "#";
      }
      kind === "hall" && ((g[4][12] = "B"), (g[5][3] = "c"), (g[5][11] = "c"));
      let z = api.be(id, s[1], g[0].length, g.length, "#", s[2]);
      return (lay(z, g), (z._kind = kind), z);
    });
  let mobs = {
    47: [
      ["slime", 3, 8],
      ["bat", 11, 8],
      ["slime", 5, 5],
      ["rat", 10, 10],
    ],
    48: [
      ["bat", 2, 2],
      ["rat", 18, 2],
      ["bat", 2, 18],
      ["rat", 18, 18],
      ["bat", 10, 10],
    ],
    49: [
      ["slime", 5, 13],
      ["bat", 10, 13],
      ["rat", 8, 12],
    ],
    50: [
      ["rat", 2, 2],
      ["bat", 18, 2],
      ["rat", 2, 18],
      ["bat", 18, 18],
      ["slime", 10, 10],
      ["rat", 10, 6],
    ],
    51: [
      ["bat", 4, 13],
      ["rat", 9, 13],
    ],
    52: [
      ["slime", 5, 8],
      ["bat", 9, 8],
      ["rat", 5, 12],
      ["bat", 9, 12],
      ["slime", 7, 6],
      ["rat", 4, 4],
    ],
    53: [
      ["bat", 2, 2],
      ["rat", 18, 2],
      ["bat", 2, 18],
      ["rat", 18, 18],
      ["slime", 10, 10],
      ["bat", 6, 10],
    ],
    54: [],
    55: [
      ["bat", 5, 13],
      ["rat", 10, 13],
      ["slime", 6, 12],
    ],
    56: [
      ["bat", 5, 8],
      ["rat", 9, 8],
      ["slime", 5, 12],
      ["bat", 9, 12],
      ["rat", 7, 6],
      ["slime", 4, 4],
      ["bat", 11, 4],
    ],
    57: [
      ["rat", 2, 2],
      ["bat", 18, 2],
      ["rat", 2, 18],
      ["bat", 18, 18],
      ["slime", 10, 10],
      ["bat", 6, 6],
      ["rat", 14, 14],
    ],
    58: [
      ["bat", 5, 4],
      ["rat", 9, 4],
      ["slime", 5, 8],
      ["bat", 9, 8],
      ["rat", 4, 12],
      ["slime", 10, 12],
    ],
    59: [["morok", 7, 6]],
  };
  for (let z of rooms) {
    z.spawns = mobs[z.id] || [];
    if (z._kind === "pit")
      ((z.toggles = [
        { tx: 2, ty: 12 },
        { tx: 12, ty: 11 },
        { tx: 5, ty: 8 },
      ]),
      (z.solve = [!1, !1, !0]),
      (z.gateFlag = "zap1"));
    if (z._kind === "pit2")
      ((z.toggles = [
        { tx: 2, ty: 6 },
        { tx: 8, ty: 12 },
        { tx: 12, ty: 8 },
      ]),
      (z.solve = [!0, !1, !0]),
      (z.gateFlag = "zap2"));
    if (z._kind === "waga")
      ((z.toggles = [
        { tx: 2, ty: 8 },
        { tx: 7, ty: 10 },
        { tx: 11, ty: 7 },
      ]),
      (z.solve = [!0, !1, !0]),
      (z.gateFlag = "popiol"),
      (z.blocks = [{ tx: 11, ty: 8 }]));
    if (z._kind === "sokoban")
      ((z.blocks = [
        { tx: 3, ty: 10, flag: "kreg", goal: [2, 6] },
        { tx: 11, ty: 10, flag: "kreg", goal: [12, 6] },
      ]),
      (z.plates = [
        { tx: 2, ty: 6, flag: "kreg" },
        { tx: 12, ty: 6, flag: "kreg" },
      ]),
      (z.gateFlag = "kreg"));
    (z._kind === "hall" || z._kind === "gallery" || z._kind === "boss") &&
      (z.chests = [{ id: "crypt" + z.id, tx: z._kind === "boss" ? 3 : 11, ty: 3 }]);
    (z._kind === "pit" || z._kind === "pit2" || z._kind === "waga" || z._kind === "sokoban") &&
      (z.chests = [{ id: "crypt" + z.id, tx: 13, ty: 3 }]);
    z._kind === "maze" && (z.chests = [{ id: "crypt" + z.id, tx: 18, ty: 10 }]);
  }
  let entry = (z) => (z._kind === "maze" ? { x: 10, y: 18 } : { x: 7, y: 12 }),
    reentry = (z) => (z._kind === "maze" ? { x: 10, y: 2 } : { x: 7, y: 4 }),
    south = (z) =>
      z._kind === "maze"
        ? { x0: 10, y0: 20, x1: 10, y1: 20 }
        : { x0: 7, y0: 14, x1: 7, y1: 14 },
    north = (z) =>
      z._kind === "maze"
        ? { x0: 10, y0: 0, x1: 10, y1: 0 }
        : { x0: 7, y0: 1, x1: 7, y1: 1 };
  rooms[0].exits.push({ ...south(rooms[0]), to: 2, tx: 8, ty: 35 });
  for (let i = 0; i < rooms.length - 1; i++) {
    let a = rooms[i],
      b = rooms[i + 1],
      ent = entry(b),
      back = reentry(a);
    (a.exits.push({ ...north(a), to: b.id, tx: ent.x, ty: ent.y }),
      b.exits.push({ ...south(b), to: a.id, tx: back.x, ty: back.y }));
  }
  for (let z of rooms) (delete z._kind, api.qe.push(z));
};
