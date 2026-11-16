// @ts-nocheck
/* Poprawki świata po audycie v1.4.6:
   - wyjścia zawsze w przerwie muru / w drzwiach, ze ścieżką,
   - lądowanie dokładnie 2 kafelki na wprost wejścia,
   - ścieżki bez ślepych końcówek, nowe lokacje tam, gdzie droga coś obiecuje,
   - Akt 3 bez skrótu z Serca Kolejki do Roota. */
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
const exitTo = (z, to) => z.exits.find((e) => e.to === to);
const FLOORISH = ".,:btr";

/* ---------- nowe lokacje ---------- */

function buildPrzystan() {
  // 60: na końcu zapomnianej drogi z Bagien SLA na południe.
  let z = api.be(60, "Przystań Przeterminowanych Zgłoszeń", 32, 20, "t", "swamp"),
    k = z.t;
  rect(z, 1, 1, 30, 18, ".");
  rect(z, 15, 0, 16, 0, ".");
  // zalew na dole, pomost na środku
  rect(z, 3, 13, 28, 18, "w");
  rect(z, 2, 14, 2, 18, "w");
  rect(z, 29, 14, 29, 18, "w");
  rect(z, 15, 13, 16, 16, "=");
  // trzcina i kamienie, deterministycznie
  for (let [x, y] of [[3, 3], [7, 2], [27, 3], [26, 7], [4, 9], [9, 11], [22, 11], [28, 10], [12, 5], [20, 4]])
    set(z, x, y, "t");
  for (let [x, y] of [[5, 6], [24, 9], [10, 8], [21, 2], [6, 12], [25, 12]]) set(z, x, y, "r");
  for (let [x, y] of [[8, 4], [18, 7], [23, 5], [11, 10], [4, 4], [26, 4], [13, 2]]) set(z, x, y, ",");
  for (let [x, y] of [[2, 7], [29, 6], [3, 11]]) set(z, x, y, "b");
  // ścieżka: od wejścia na pomost, odnoga do skrzyni przewoźnika
  rect(z, 15, 0, 16, 12, ":");
  rect(z, 17, 9, 24, 10, ":");
  z.npcs = [{ id: "czeslaw", tx: 16, ty: 16 }];
  z.chests = [{ id: "nowe_przystan", tx: 25, ty: 10 }];
  z.items = [{ kind: "kawa", tx: 4, ty: 2, id: "" }];
  z.spawns = [
    ["zombie", 7, 7],
    ["zombie", 24, 6],
    ["phone", 9, 3],
    ["bat", 21, 12],
  ];
  z.exits = [{ x0: 15, y0: 0, x1: 16, y1: 0, to: 11, tx: 16, ty: 33 }];
  api.qe[60] = z;
}

function buildChatkaWladka() {
  // 61: chatka na zachodnim końcu drogi przez Pola Ticketów.
  let z = api.be(61, "Chatka Zgłaszacza Władka", 11, 9, "#", "inn"),
    k = z.t;
  rect(z, 1, 1, 9, 7, ".");
  k[8][5] = "_";
  rect(z, 1, 1, 4, 1, "K");
  k[1][8] = "F";
  k[3][4] = "T";
  k[3][3] = "c";
  k[3][5] = "c";
  k[6][1] = "B";
  k[6][9] = "A";
  z.npcs = [{ id: "wladek", tx: 7, ty: 3 }];
  z.chests = [{ id: "nowe_wladek", tx: 2, ty: 5 }];
  z.exits = [{ x0: 5, y0: 8, x1: 5, y1: 8, to: 9, tx: 4, ty: 13 }];
  api.qe[61] = z;
}

/* ---------- poprawki istniejących stref ---------- */

function fixOutdoor() {
  let Q = api.qe;
  // 0 Wioska: ogon drogi na zachód od zejścia na Bagna prowadził w trawę
  rect(Q[0], 18, 28, 23, 29, ".", ":");

  // 1 Łąka: droga pod ruiną kończyła się przed ścianą, teraz dochodzi do wyłomu
  rect(Q[1], 57, 10, 57, 11, ".", ":");
  rect(Q[1], 55, 9, 56, 9, ":");

  // 2 Las: chatka Haliny, dąb i zejście do katakumb dostają drogę
  rect(Q[2], 46, 11, 49, 12, ":");
  rect(Q[2], 30, 30, 37, 31, ":");
  rect(Q[2], 30, 32, 31, 33, ":");
  rect(Q[2], 27, 34, 31, 35, ":");
  set(Q[2], 9, 35, ".");
  rect(Q[2], 8, 35, 8, 36, ":");

  // 9 Pola: dziura w linii drzew na północy (brzeg mapy bez wyjścia)
  rect(Q[9], 0, 0, Q[9].w - 1, 0, "t", ".,");
  // chatka Władka na końcu zachodniej drogi
  {
    let z = Q[9];
    rect(z, 1, 8, 7, 11, ".");
    rect(z, 2, 9, 6, 11, "h");
    set(z, 4, 11, "d");
    rect(z, 2, 12, 3, 13, ".", ":");
    z.exits.push({ x0: 4, y0: 11, x1: 4, y1: 11, to: 61, tx: 5, ty: 6 });
  }

  // 11 Bagna: wyjście do Call Center na samej krawędzi, zejście na Przystań, droga do chaty
  {
    let z = Q[11],
      cc = exitTo(z, 12);
    cc.y0 = cc.y1 = 35;
    z.exits.push({ x0: 16, y0: 35, x1: 17, y1: 35, to: 60, tx: 15, ty: 2 });
    rect(z, 5, 17, 9, 18, ":");
  }

  // 13 Kraina Nieumarłego: wyjścia w przerwach muru, lab Igi jako prawdziwy domek
  {
    let z = Q[13];
    rect(z, 28, 0, 29, 3, ":");
    let n = exitTo(z, 14);
    n.y0 = n.y1 = 0;
    rect(z, 36, 14, 39, 15, ":");
    let e = exitTo(z, 15);
    e.x0 = e.x1 = 39;
    rect(z, 20, 22, 21, 29, ".", ":");
    // laboratorium polowe
    rect(z, 3, 15, 9, 19, ".");
    rect(z, 4, 16, 8, 18, "h");
    set(z, 6, 18, "d");
    rect(z, 6, 19, 7, 21, ":");
    rect(z, 6, 20, 11, 21, ":");
    let lab = exitTo(z, 36);
    lab.x0 = lab.x1 = 6;
  }

  // 17 Chatka na Wschodzie: schody na strych stały 3 kafelki od drzwi, lądowało się obok nich
  {
    let z = Q[17],
      up = exitTo(z, 46);
    set(z, up.x0, up.y0, ".");
    set(z, 10, 7, "U");
    up.x0 = up.x1 = 10;
    up.y0 = up.y1 = 7;
  }

  // 38 Przysiółek: droga do owczarni kończy się przy skrzyni pasterza
  Q[38].chests.push({ id: "nowe_owczarnia", tx: 34, ty: 22 });

  // 43 Pastwisko: drogi dochodzą pod drzwi, bez ogonków
  {
    let z = Q[43];
    rect(z, 20, 11, 21, 11, ".", ":");
    rect(z, 22, 12, 25, 12, ":");
    rect(z, 25, 10, 25, 11, ":");
    set(z, 26, 12, ".");
    rect(z, 8, 21, 9, 21, ".", ":");
    rect(z, 20, 22, 22, 23, ".", ":");
    rect(z, 22, 21, 25, 21, ":");
    set(z, 36, 3, ".");
    // Kryjówka Dzwonka Beczki: wnęka w żywopłocie w północno-wschodnim rogu, wejście tylko od południa
    for (let [x, y] of [[35, 2], [36, 2], [37, 2], [35, 3], [37, 3]]) set(z, x, y, "t");
    set(z, 36, 4, ".");
  }
}

function fixAct23() {
  let Q = api.qe;
  // 5 Serwerownia: zachodnia przerwa w murze szersza niż wyjście
  set(Q[5], 0, 14, "#");
  set(Q[5], 0, 17, "#");
  // 15 Sala Eskalacji: południe zamknięte kratą, dopóki Lidia stoi
  {
    let z = Q[15];
    z.gateFlag = "lich";
    rect(z, 20, 19, 21, 19, ".");
    rect(z, 20, 18, 21, 18, "E");
    let s = exitTo(z, 24);
    s.y0 = s.y1 = 19;
  }
  // 24 Serce Kolejki: bez niewidzialnego skrótu; brama na północ dopiero po Roocie
  {
    let z = Q[24];
    z.gateFlag = "kozacki";
    z.exits = z.exits.filter((e) => !(e.to === 25 && e.y0 === 2));
    rect(z, 15, 0, 16, 0, ":");
    rect(z, 15, 1, 16, 1, "E");
    z.exits.push({ x0: 15, y0: 0, x1: 16, y1: 0, to: 25, tx: 12, ty: 17 });
    rect(z, 31, 12, 31, 13, ".");
    let e = exitTo(z, 26);
    e.x0 = e.x1 = 31;
    rect(z, 15, 2, 16, 23, ":");
    rect(z, 17, 12, 31, 13, ":");
  }
  // 25 Sala Roota: wejście od Przedpokoju, powrót do Serca za kratą
  {
    let z = Q[25];
    z.gateFlag = "kozacki";
    rect(z, 12, 18, 13, 18, "E");
    rect(z, 12, 19, 13, 19, ":");
    rect(z, 12, 0, 13, 17, ":");
  }
  // 26 Cmentarzysko: wyjścia na krawędziach, tam gdzie kończą się drogi
  {
    let z = Q[26],
      s = exitTo(z, 27),
      e = exitTo(z, 28);
    s.y0 = s.y1 = 27;
    e.x0 = e.x1 = 39;
  }
  // 27 Fabryka: wyjście do Przedpokoju jako przerwa we wschodnim murze
  {
    let z = Q[27],
      e = exitTo(z, 29);
    rect(z, 26, 18, 27, 19, ".");
    e.x0 = e.x1 = 27;
    e.y0 = 18;
    e.y1 = 19;
    rect(z, 10, 0, 11, 19, ":");
    rect(z, 12, 18, 27, 19, ":");
  }
  // 28 Labirynt Firewalli: wyjście na wschodniej krawędzi, wykuta ścieżka
  {
    let z = Q[28],
      e = exitTo(z, 29);
    e.x0 = e.x1 = 35;
    rect(z, 0, 14, 3, 15, ":", ".");
    rect(z, 2, 16, 3, 18, ":", ".");
    rect(z, 2, 19, 35, 19, ":", ".");
    rect(z, 19, 18, 35, 18, ":", ".");
  }
  // 29 Przedpokój: zachodnie przejścia w murze, północna brama na środku, ścieżki
  {
    let z = Q[29];
    rect(z, 0, 10, 0, 11, ".");
    rect(z, 0, 14, 0, 15, ".");
    for (let e of z.exits) if (e.to === 27 || e.to === 28) e.x0 = e.x1 = 0;
    rect(z, 10, 0, 10, 1, "#");
    rect(z, 13, 0, 13, 1, "#");
    let n = exitTo(z, 25);
    n.x0 = 11;
    n.x1 = 12;
    rect(z, 11, 0, 12, 15, ":");
    rect(z, 0, 10, 12, 11, ":");
    rect(z, 0, 14, 12, 15, ":");
  }
}

api.fixWorld = function fixWorld() {
  buildPrzystan();
  buildChatkaWladka();
  fixOutdoor();
  fixAct23();
};

/* ---------- lądowanie: 2 kafelki na wprost wejścia ---------- */

const GATES = "EgkqGDVYP";
export function openTile(z, x, y) {
  if (y < 0 || x < 0 || y >= z.h || x >= z.w) return !1;
  let c = z.t[y][x];
  if (GATES.includes(c)) return !0;
  return !api.Qo({ zone: z.id, f: {} }, c);
}
const exitGap = (z, x, y) => {
  let best = 99;
  for (let e of z.exits)
    for (let yy = e.y0; yy <= e.y1; yy++)
      for (let xx = e.x0; xx <= e.x1; xx++) best = Math.min(best, Math.max(Math.abs(x - xx), Math.abs(y - yy)));
  return best;
};
const inExit = (z, x, y) => z.exits.some((e) => x >= e.x0 && x <= e.x1 && y >= e.y0 && y <= e.y1);

export function inwardDirs(z, e) {
  if (e.y0 === 0) return [[0, 1]];
  if (e.y1 === z.h - 1) return [[0, -1]];
  if (e.x0 === 0) return [[1, 0]];
  if (e.x1 === z.w - 1) return [[-1, 0]];
  let c = z.t[e.y0][e.x0];
  if (c === "d") return [[0, 1]];
  // klapy, schody, portale w środku sali: dowolny wolny kierunek, najpierw w dół
  return [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
}

export function landingFor(z, back, prefer) {
  for (let [dx, dy] of inwardDirs(z, back)) {
    let cand = [];
    for (let y = back.y0; y <= back.y1; y++)
      for (let x = back.x0; x <= back.x1; x++) cand.push([x + dx * 2, y + dy * 2, x + dx, y + dy]);
    prefer && cand.sort((a, b) => Math.abs(a[0] - prefer[0]) + Math.abs(a[1] - prefer[1]) - (Math.abs(b[0] - prefer[0]) + Math.abs(b[1] - prefer[1])));
    for (let [x, y, mx, my] of cand)
      if (openTile(z, x, y) && openTile(z, mx, my) && !GATES.includes(z.t[y][x]) && exitGap(z, x, y) >= 2)
        return { x, y, dx, dy };
  }
  return null;
}

export function backExit(src, ex, dest) {
  let backs = dest.exits.filter((r) => r.to === src.id);
  if (backs.length <= 1) return backs[0] || null;
  // kilka drzwi do tej samej strefy: bierzemy te, które są najbliżej obecnego lądowania
  return backs
    .map((r) => [r, Math.abs(r.x0 - ex.tx) + Math.abs(r.y0 - ex.ty)])
    .sort((a, b) => a[1] - b[1])[0][0];
}

api.fixLandings = function fixLandings() {
  api.landMiss = [];
  for (let src of api.qe) {
    if (!src) continue;
    for (let ex of src.exits) {
      let dest = api.qe[ex.to];
      if (!dest) continue;
      let back = backExit(src, ex, dest);
      if (!back) continue;
      let L = landingFor(dest, back, [ex.tx, ex.ty]);
      if (!L) {
        api.landMiss.push(src.id + "->" + dest.id);
        continue;
      }
      ex.tx = L.x;
      ex.ty = L.y;
    }
  }
};

/* ---------- potwory: nie na wyjściach, nie na lądowaniach, nie w ścianach ---------- */

api.fixSpawns = function fixSpawns() {
  for (let z of api.qe) {
    if (!z) continue;
    let lands = [];
    for (let s of api.qe) if (s) for (let e of s.exits) e.to === z.id && lands.push([e.tx, e.ty]);
    let bad = (x, y) => {
      if (!openTile(z, x, y) || GATES.includes(z.t[y][x]) || "dU_H=".includes(z.t[y][x])) return !0;
      for (let e of z.exits)
        if (x >= e.x0 - 2 && x <= e.x1 + 2 && y >= e.y0 - 2 && y <= e.y1 + 2) return !0;
      for (let [lx, ly] of lands) if (Math.abs(lx - x) <= 2 && Math.abs(ly - y) <= 2) return !0;
      if ((z.npcs || []).some((n) => n.tx === x && n.ty === y)) return !0;
      if ((z.chests || []).some((n) => n.tx === x && n.ty === y)) return !0;
      if ((api.clips || []).some((h) => h.z === z.id && Math.abs(h.x - x) <= 1 && Math.abs(h.y - y) <= 1)) return !0;
      return !1;
    };
    for (let s of z.spawns || []) {
      if (!bad(s[1], s[2])) continue;
      let best = null,
        sc = 1e9;
      for (let y = 1; y < z.h - 1; y++)
        for (let x = 1; x < z.w - 1; x++) {
          if (bad(x, y)) continue;
          let d = Math.abs(x - s[1]) + Math.abs(y - s[2]);
          d < sc && ((sc = d), (best = [x, y]));
        }
      best && ((s[1] = best[0]), (s[2] = best[1]));
    }
  }
};
