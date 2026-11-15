// @ts-nocheck
/* Spinacz: haczyk na gumce. Nie jest bronią i nie otwiera krat.
   Czyste decyzje są eksportowane, żeby dało się je testować bez rysowania. */
import { api } from "../runtime/api.js";

export const CLIP_RANGE = 4;

const BIG = new Set(["king", "golem", "phantom", "lich", "audit", "morok", "nest"]);

export function facing(fx, fy) {
  let x = fx || 0,
    y = fy || 0;
  Math.abs(x) >= Math.abs(y) ? (y = 0) : (x = 0);
  if (!x && !y) y = 1;
  return { x: Math.sign(x) || 0, y: Math.sign(y) || 0 };
}

export function rayHook(hooks, zone, tx, ty, fx, fy) {
  let f = facing(fx, fy);
  for (let s = 1; s <= CLIP_RANGE; s++) {
    let x = tx + f.x * s,
      y = ty + f.y * s,
      h = hooks.find((k) => k.z === zone && k.x === x && k.y === y);
    if (h) return h;
  }
  return null;
}

function smallEnemy(n) {
  return !!n && n.alive && n.hp > 0 && !BIG.has(n.kind);
}

export function decideClip(p) {
  if ((p.clipCd || 0) > 0) return { type: "wait" };
  let tx = Math.floor(p.px / p.T),
    ty = Math.floor(p.py / p.T),
    f = facing(p.fx, p.fy),
    hook = rayHook(p.hooks || [], p.zone, tx, ty, f.x, f.y);
  if (hook) return p.spinacz ? { type: "hook", hook, fx: f.x, fy: f.y } : { type: "hint", hook };
  if (!p.spinacz) return { type: "none" };
  let ahead = (dist) =>
    (p.enemies || []).find((n) => {
      if (!smallEnemy(n)) return !1;
      let dx = n.x - p.px,
        dy = n.y - p.py,
        dot = dx * f.x + dy * f.y;
      return dot > 0 && Math.hypot(dx, dy) <= dist;
    });
  if (p.blystka) {
    let n = ahead(p.T * CLIP_RANGE);
    if (n) return { type: "lure", enemy: n, fx: f.x, fy: f.y };
  }
  if ((p.staples || 0) > 0) {
    let n = ahead(p.T + 4);
    if (n) return { type: "pin", enemy: n };
  }
  if (p.falsz) return { type: "whistle" };
  return { type: "miss" };
}

export function scarfAbsorb(e) {
  if (!e.f || !e.f.szalik || e.scarfUsed) return !1;
  return ((e.scarfUsed = !0), !0);
}

api.scarfAbsorb = scarfAbsorb;

export function openMost(zone) {
  if (!zone || !zone.t[12]) return !1;
  for (let x = 30; x <= 32; x++) zone.t[12][x] = ".";
  return zone.t[12][30] === "." && zone.t[12][31] === "." && zone.t[12][32] === ".";
}

export function sealRiver(zone) {
  if (!zone) return;
  for (let y = 0; y < zone.h; y++) {
    if (!zone.t[y]) continue;
    if (y === 12 && zone.t[y][30] === "." && zone.t[y][31] === "." && zone.t[y][32] === ".") continue;
    for (let x = 30; x <= 32; x++) zone.t[y][x] = "w";
  }
}

export function reachesWithoutFord(from, to) {
  let seen = new Set(),
    q = [from];
  while (q.length) {
    let id = q.pop();
    if (seen.has(id)) continue;
    seen.add(id);
    let zone = (api.qe || []).find((n) => n.id === id);
    if (!zone) continue;
    for (let ex of zone.exits || []) {
      if ((id === 1 && ex.to === 2) || (id === 2 && ex.to === 1)) continue;
      seen.has(ex.to) || q.push(ex.to);
    }
  }
  return seen.has(to);
}

const REWARDS = {
  belka: "beczka",
  slupek: "wezwanie",
  polka: "map",
  balkon: "heart",
  nisza: "staples",
  zagroda: "scarf",
  gniazdo: "glut",
};

api.clipSpecs = [
  { id: "most", z: 1, x: 33, y: 12, lock: !0 },
  { id: "belka", z: 1, x: 23, y: 16, lock: !0 },
  { id: "slupek", z: 9, x: 18, y: 14 },
  { id: "polka", z: 10, x: 18, y: 6 },
  { id: "balkon", z: 30, x: 8, y: 3 },
  { id: "nisza", z: 47, x: 4, y: 8 },
  { id: "zagroda", z: 43, x: 8, y: 8 },
  { id: "gniazdo", z: 2, x: 26, y: 28 },
  { id: "plot", z: 0, x: 12, y: 8 },
  { id: "dach", z: 6, x: 4, y: 4 },
  { id: "row", z: 9, x: 36, y: 18 },
  { id: "hals", z: 52, x: 4, y: 4 },
  { id: "wies", z: 38, x: 14, y: 16 },
  { id: "ruina", z: 4, x: 12, y: 10 },
  { id: "bagno", z: 11, x: 18, y: 10 },
];

function soft(tile) {
  return tile === "t" || tile === "," || tile === "b" || tile === "r";
}

function clearStand(z, x, y) {
  let zone = api.qe[z];
  if (!zone || !zone.t[y] || zone.t[y][x] == null) return !1;
  let tile = zone.t[y][x];
  if (soft(tile) || tile === "w") {
    zone.t[y][x] = ".";
    return !0;
  }
  return tile === "." || tile === ":" || tile === "=";
}

function expandBeczka() {
  let pen = (api.qe[1].sheep || []).find((s) => s.dark);
  pen && ((pen.x1 = 28), (pen.y0 = 10));
}

export function clipBlockedByPuzzle(e) {
  if (!e) return !1;
  if (e.zone === 4) return !!(api.up && api.up(e) && !(e.f && e.f.plate));
  if (!e.blocks || !e.blocks.length) return !1;
  let flag = e.blocks[0].flag || "";
  return !(flag && e.f && e.f[flag]);
}

api.clipBlockedByPuzzle = clipBlockedByPuzzle;

function free(z, x, y) {
  let zone = api.qe[z];
  if (!zone || y < 1 || x < 1 || y >= zone.h - 1 || x >= zone.w - 1) return !1;
  let tile = zone.t[y][x];
  if (tile === "w" || tile === "=" || tile === "E" || tile === "d" || tile === "_" || tile === "U" || tile === "H" || tile === "M" || tile === "#" || tile === "c")
    return !1;
  if (api.Cs && api.Cs.has(tile) && !soft(tile)) return !1;
  for (let ex of zone.exits)
    if (x >= ex.x0 - 2 && x <= ex.x1 + 2 && y >= ex.y0 - 2 && y <= ex.y1 + 2) return !1;
  if ((zone.npcs || []).some((n) => Math.abs(n.tx - x) + Math.abs(n.ty - y) <= 1)) return !1;
  if ((zone.spawns || []).some((s) => Math.abs(s[1] - x) + Math.abs(s[2] - y) <= 1)) return !1;
  if ((zone.items || []).some((s) => s.tx === x && s.ty === y && s.kind !== "qi")) return !1;
  if ((zone.chests || []).some((s) => s.tx === x && s.ty === y)) return !1;
  return !0;
}

function snap(spec) {
  if (spec.lock && free(spec.z, spec.x, spec.y)) return { x: spec.x, y: spec.y };
  let best = null,
    score = 99;
  for (let y = spec.y - 4; y <= spec.y + 4; y++)
    for (let x = spec.x - 4; x <= spec.x + 4; x++) {
      if (!free(spec.z, x, y)) continue;
      let sc = Math.abs(x - spec.x) + Math.abs(y - spec.y);
      if (spec.lock && sc > 0) continue;
      sc < score && ((score = sc), (best = { x, y }));
    }
  return best;
}

api.placeClips = function placeClips() {
  api.clips = [];
  api.clipMiss = [];
  for (let spec of api.clipSpecs) {
    let at = snap(spec);
    if (!at) {
      api.clipMiss.push(spec.id);
      continue;
    }
    let tile = api.qe[spec.z].t[at.y][at.x];
    soft(tile) && (api.qe[spec.z].t[at.y][at.x] = ".");
    api.clips.push({
      id: spec.id,
      z: spec.z,
      x: at.x,
      y: at.y,
      reward: REWARDS[spec.id] || "coin",
    });
  }
  let meadow = api.qe[1];
  meadow.t[12][26] = ".";
  meadow.t[12][29] = ".";
  meadow.t[12][33] = ".";
  sealRiver(meadow);
  let lie = api.qe[11];
  api.clipLie = { z: 11, x: 22, y: 20 };
  lie && clearStand(11, 22, 20);
  let move = (quest, step, id) => {
    let q = (api.Qi || []).find((k) => k.id === quest),
      hook = api.clips.find((k) => k.id === id);
    if (!q || !hook || !q.steps[step]) return;
    let s = q.steps[step];
    s.z = hook.z;
    s.tx = hook.x;
    s.ty = hook.y;
    let item = api.qe[hook.z].items.find((n) => n.id === quest + ":" + step);
    item && ((item.tx = hook.x), (item.ty = hook.y));
  };
  move("falsz1", 0, "slupek");
};

api.clipById = function clipById(id) {
  return (api.clips || []).find((h) => h.id === id);
};

function grantSpinacz(e) {
  e.f.spinacz = !0;
  if (!Array.isArray(e.weapons)) return;
  e.weapons.indexOf("spinacz") < 0 && (e.weapons.push("spinacz"), (e.weapon = "spinacz"));
}

function say(e, text) {
  api.ne && api.ne(e, text, 3.2);
  api.G && api.G(e, "item");
}

api.clipArrive = function clipArrive(e, hook) {
  if (!hook) return;
  if (hook.reward === "beczka") {
    let rang = !!(e.f["sqd:ola1"] || e.cut["item:ola1:1"]);
    if (!rang)
      return say(e, "Beczka stoi na belce i udaje deskę. Bez dzwonka Oli nawet nie mrugnie.");
    if (e.f.beczka) return;
    e.f.beczka = !0;
    e.dirty = !0;
    expandBeczka();
    let live = (e.flock || []).find((s) => s.dark);
    live && ((live.x1 = 28), (live.y0 = 10), (live.gx = api.Y(24)), (live.gy = api.Y(20)));
    return say(e, "Dzyń. Beczka schodzi z belki na łąkę, jakby to było w grafiku.");
  }
  if (hook.reward === "glut") return api.clipGlut(e, hook);
  if (e.f["clip:" + hook.id]) return;
  e.f["clip:" + hook.id] = !0;
  e.dirty = !0;
  if (hook.reward === "coin") {
    e.coins = (e.coins || 0) + 3;
    return say(e, "Za hakiem trzy grosze. Reszta to skrót.");
  }
  if (hook.reward === "protocol")
    return say(e, "Na deskach leży protokół odbioru częściowego. Kamila coś takiego podpisuje.");
  if (hook.reward === "wezwanie")
    return say(e, "Ticket zaadresowany do ciebie. Zbyszek w karczmie czyta takie rzeczy na głos.");
  if (hook.reward === "map") {
    e.f.clipMap = !0;
    return say(
      e,
      "Manifest Darka, trzy krzyżyki: balkon wieży, nisza w progu katakumb, gniazdo nad dębem. Czwarty, środek bagna, jest za równy. Kłamie.",
    );
  }
  if (hook.reward === "heart") {
    if (!e.f.sprezyna) {
      e.f.sprezyna = !0;
      e.bonusHp = (e.bonusHp || 0) + 2;
      e.hp = api.Ze ? api.Ze(e) : e.hp;
    }
    return say(e, "Sprężyna z zegara. Jedno serce, na stałe. Horacy i tak spóźnia minuty.");
  }
  if (hook.reward === "staples") {
    e.staples = Math.min(6, (e.staples || 0) + 3);
    return say(e, "Zszywacz stażysty. Trzy zszywki: mały wróg stoi przez chwilę. Kraty nie ruszają się od tego.");
  }
  if (hook.reward === "scarf") {
    e.f.baranHook = !0;
    return say(e, "Baran Support zostawił kłak na murze. Hela na pastwisku wie, co z tym zrobić.");
  }
};

api.clipGlut = function clipGlut(e, hook) {
  if (!e || !hook || e.f.blystka) return;
  if ((e.enemies || []).some((n) => n.key === "clip:glut" && n.alive)) return;
  e.enemies = e.enemies || [];
  let y = hook.y - 1;
  clearStand(hook.z, hook.x, y) || (y = hook.y);
  e.enemies.push(api.Pi(e, "gold", api.Y(hook.x), api.Y(y), "clip:glut"));
  say(e, "Złoty glut Ryśka. Siedzi w gnieździe, jakby miał umowę.");
};

api.clipUse = function clipUse(e) {
  let d = decideClip({
    clipCd: e.clipCd || 0,
    px: e.px,
    py: e.py,
    T: api.T,
    fx: e.fx,
    fy: e.fy,
    zone: e.zone,
    hooks: api.clips || [],
    spinacz: !!e.f.spinacz,
    blystka: !!e.f.blystka,
    falsz: !!e.f.falsz,
    staples: e.staples || 0,
    enemies: e.enemies || [],
  });
  if (d.type === "wait" || d.type === "none") return !1;
  if (d.type === "hint")
    return (
      say(e, "Za wysoko. Wanda w kuźni prostuje takie rzeczy."),
      (e.clipCd = 0.6),
      !0
    );
  if (d.type === "hook") {
    e.px = api.Y(d.hook.x);
    e.py = api.Y(d.hook.y);
    e.clipCd = 0.55;
    api.se && api.se(e, e.px, e.py, "#c4845a", 10, 40, 0.35);
    api.clipArrive(e, d.hook);
    return !0;
  }
  if (d.type === "lure") {
    d.enemy.x = e.px + d.fx * 18;
    d.enemy.y = e.py + d.fy * 18;
    d.enemy.vx = 0;
    d.enemy.vy = 0;
    e.clipCd = 0.7;
    return (say(e, "Błystka ciągnie."), !0);
  }
  if (d.type === "pin") {
    e.staples--;
    d.enemy.pinT = 2;
    d.enemy.vx = 0;
    d.enemy.vy = 0;
    e.clipCd = 0.45;
    return (say(e, "Zszyte. Zostało " + e.staples + "."), !0);
  }
  if (d.type === "whistle") {
    e.falszT = 3.2;
    e.clipCd = 1.2;
    return (say(e, "Fałsz. Tickety gubią temat."), !0);
  }
  e.clipCd = 0.35;
  api.Ne && api.Ne(e, e.px, e.py - 14, "opada", "#c4845a");
  return !0;
};

api.clipTick = function clipTick(e, dt) {
  e.clipCd = Math.max(0, (e.clipCd || 0) - dt);
  e.falszT = Math.max(0, (e.falszT || 0) - dt);
  if (!e.f || !e.f.clipMap || e.f.clipLie || !api.clipLie) return;
  let tx = Math.floor(e.px / api.T),
    ty = Math.floor(e.py / api.T);
  if (e.zone === api.clipLie.z && tx === api.clipLie.x && ty === api.clipLie.y) {
    e.f.clipLie = !0;
    e.dirty = !0;
    say(e, "Pusto. Darek postawił krzyżyk dla symetrii. Manifest kłamie w jednym miejscu, jak każdy manifest.");
  }
};

api.clipPaint = function clipPaint(ctx, zone) {
  if (!api.clips || !api.o) return;
  for (let h of api.clips) {
    if (h.z !== zone.id) continue;
    let x = h.x * api.T,
      y = h.y * api.T;
    api.o(ctx, "#c4845a", x + 7, y + 2, 2, 8);
    api.o(ctx, "#f4efe6", x + 5, y + 2, 6, 2);
  }
};

api.onQuestDone = function onQuestDone(e, t) {
  if (!t) return;
  if (t.id === "spin1") {
    grantSpinacz(e);
    e.dirty = !0;
  } else if (t.id === "kamMost") {
    openMost(api.qe[1]);
    e.f.mostOpen = !0;
    e.layerDirty = !0;
    e.dirty = !0;
  } else if (t.id === "falsz1") {
    e.f.falsz = !0;
    e.dirty = !0;
  } else if (t.id === "helSzal") {
    e.f.szalik = !0;
    e.scarfUsed = !1;
    e.dirty = !0;
  }
};

api.applyClipWorld = function applyClipWorld(e) {
  if (!e || !e.f) return;
  (e.f.spinacz || e.f["sqd:spin1"]) && grantSpinacz(e);
  e.f.beczka && expandBeczka();
  if (e.f.mostOpen || e.f["sqd:kamMost"]) {
    openMost(api.qe[1]);
    return;
  }
  if (e.cp && !reachesWithoutFord(0, e.cp.zone) && api.Qn) {
    e.cp = { zone: 0, x: api.Y(api.Qn.x), y: api.Y(api.Qn.y) };
    e.f._bridgeBack = !0;
  }
};
