import test from "node:test";
import assert from "node:assert/strict";
import { api } from "../runtime/api.js";
import "../world/build.js";
import "../world/crypt.js";
import "../world/query.js";
import "../world/travel.js";
import "./clip.js";
import "../data/content.js";
import "../quest/flow.js";
import "./interact.js";
import "../player/build.js";
import "../sim/combat.js";
import "../sim/tick.js";
import { decideClip, rayHook, scarfAbsorb, openMost, facing, clipBlockedByPuzzle } from "./clip.js";

api.initData();

const T = api.T;

test("facing stays on one axis", () => {
  assert.deepEqual(facing(1, 0.2), { x: 1, y: 0 });
  assert.deepEqual(facing(0, 0), { x: 0, y: 1 });
});

test("ray hits a hook four tiles ahead and ignores hooks behind or aside", () => {
  let hooks = [
    { id: "a", z: 1, x: 5, y: 2 },
    { id: "b", z: 1, x: 2, y: 6 },
    { id: "c", z: 2, x: 5, y: 2 },
  ];
  assert.equal(rayHook(hooks, 1, 1, 2, 1, 0).id, "a");
  assert.equal(rayHook(hooks, 1, 1, 2, -1, 0), null);
  assert.equal(rayHook(hooks, 1, 2, 2, 0, 1).id, "b");
  assert.equal(rayHook(hooks, 1, 2, 2, 0, 0).id, "b");
  assert.equal(rayHook(hooks, 2, 1, 2, 1, 0).id, "c");
});

test("use priority: hook, then lure, then pin, then whistle, then miss", () => {
  let base = {
    clipCd: 0,
    px: 8,
    py: 8,
    T: 16,
    fx: 1,
    fy: 0,
    zone: 1,
    hooks: [{ id: "h", z: 1, x: 5, y: 0 }],
    spinacz: true,
    blystka: true,
    falsz: true,
    staples: 2,
    enemies: [],
  };
  assert.equal(decideClip({ ...base, px: 16, py: 8 }).type, "hook");
  assert.equal(decideClip({ ...base, spinacz: false, px: 16, py: 8 }).type, "hint");
  assert.equal(
    decideClip({
      ...base,
      enemies: [{ alive: true, hp: 3, kind: "slime", x: 40, y: 8 }],
    }).type,
    "lure",
  );
  assert.equal(
    decideClip({
      ...base,
      blystka: false,
      enemies: [{ alive: true, hp: 3, kind: "king", x: 24, y: 8 }],
    }).type,
    "whistle",
  );
  assert.equal(
    decideClip({
      ...base,
      blystka: false,
      enemies: [{ alive: true, hp: 3, kind: "rat", x: 24, y: 8 }],
    }).type,
    "pin",
  );
  assert.equal(decideClip({ ...base, blystka: false, falsz: false, staples: 0 }).type, "miss");
  assert.equal(decideClip({ ...base, spinacz: false }).type, "none");
  assert.equal(decideClip({ ...base, clipCd: 0.2 }).type, "wait");
});

test("scarf drinks exactly one hit", () => {
  let e = { f: { szalik: true }, scarfUsed: false };
  assert.equal(scarfAbsorb(e), true);
  assert.equal(e.scarfUsed, true);
  assert.equal(scarfAbsorb(e), false);
  e.scarfUsed = false;
  assert.equal(scarfAbsorb(e), true);
  assert.equal(scarfAbsorb({ f: {} }), false);
});

test("combat actually skips damage on the wool scarf", () => {
  let e = {
    god: null,
    inv: 0,
    dashT: 0,
    win: false,
    dead: false,
    ward: 0,
    hp: 10,
    px: 40,
    py: 40,
    zone: 0,
    blocks: [],
    cut: {},
    f: { szalik: true },
    scarfUsed: false,
    texts: [],
    parts: [],
    sq: [],
    settings: { shake: true },
    shake: 0,
    hitstop: 0,
  };
  api.Oa(e, 4, 20, 40);
  assert.equal(e.hp, 10);
  assert.equal(e.scarfUsed, true);
  e.inv = 0;
  api.Oa(e, 4, 20, 40);
  assert.equal(e.hp, 6);
});

test("fifteen hooks, eight of them are rewards, none missing", () => {
  assert.deepEqual(api.clipMiss, []);
  assert.equal(api.clips.length, 15);
  let rewards = api.clips.filter((h) => h.reward !== "coin");
  assert.equal(rewards.length, 8);
  for (let h of api.clips) {
    let tile = api.qe[h.z].t[h.y][h.x];
    assert.notEqual(tile, "#");
    assert.notEqual(tile, "w");
    assert.notEqual(tile, "M");
  }
});

test("hooks stay off doors", () => {
  for (let h of api.clips) {
    let zone = api.qe[h.z];
    for (let ex of zone.exits)
      assert.ok(
        h.x < ex.x0 - 2 || h.x > ex.x1 + 2 || h.y < ex.y0 - 2 || h.y > ex.y1 + 2,
        h.id,
      );
  }
});

test("the river bridge is one row and stays shut until Kamila stamps it", () => {
  let row = api.qe[1].t[12];
  assert.equal(row[30], "w");
  assert.equal(row[32], "w");
  assert.equal(row[29], ".");
  assert.equal(row[33], ".");
  assert.equal(api.qe[1].t[8][31], "=");
  let copy = api.qe[1].t.map((r) => r.slice());
  assert.equal(openMost(api.qe[1]), true);
  assert.equal(api.qe[1].t[12][30], ".");
  assert.equal(api.qe[1].t[12][31], ".");
  assert.equal(api.qe[1].t[12][32], ".");
  assert.equal(api.qe[1].t[8][31], "=");
  assert.equal(api.qe[1].t[11][30], copy[11][30]);
  assert.equal(api.qe[1].t[13][30], copy[13][30]);
  api.qe[1].t[12][30] = "w";
  api.qe[1].t[12][31] = copy[12][31];
  api.qe[1].t[12][32] = "w";
});

test("quest items sit on the hook and old quests are untouched", () => {
  let most = api.clipById("most"),
    kam = api.Qi.find((q) => q.id === "kamMost"),
    spin = api.Qi.find((q) => q.id === "spin1"),
    rys = api.Qi.find((q) => q.id === "rys1"),
    kam1 = api.Qi.find((q) => q.id === "kam1");
  assert.equal(kam.steps[0].tx, most.x);
  assert.equal(kam.steps[0].ty, most.y);
  assert.equal(kam.after, "kam1");
  assert.equal(spin.after, "rys1");
  assert.equal(rys.steps.length, 2);
  assert.equal(kam1.steps[0].tx, 58);
  assert.equal(api.Qi.filter((q) => q.id === "rys1").length, 1);
});

test("spinacz is not granted until Wanda finishes, and the scarf needs the ram", () => {
  let e = { f: {}, coins: 0, pts: 0, lvl: 1, xp: 0, st: { vit: 1, str: 1, dex: 1, mnd: 1 }, spec: "", bonusHp: 0, sq: [] };
  let spin = api.Qi.find((q) => q.id === "spin1");
  assert.equal(api.Hp(e, spin), false);
  e.f["sqd:rys1"] = true;
  assert.equal(api.Hp(e, spin), true);
  api.onQuestDone(e, spin);
  assert.equal(e.f.spinacz, true);
  let hel = api.Qi.find((q) => q.id === "helSzal");
  e.f["sqd:hel1"] = true;
  assert.equal(api.Hp(e, hel), false);
  e.f.baranHook = true;
  assert.equal(api.Hp(e, hel), true);
  api.onQuestDone(e, hel);
  assert.equal(e.f.szalik, true);
  assert.equal(e.scarfUsed, false);
});

test("Beczka does not leave the pen without Ola's bell", () => {
  let sheep = api.qe[1].sheep.find((s) => s.dark);
  let before = sheep.x1;
  let y0 = sheep.y0;
  let e = {
    f: {},
    cut: {},
    dirty: false,
    flock: [],
    px: 0,
    py: 0,
    coins: 0,
    zone: 1,
    enemies: [],
    sq: [],
    parts: [],
    texts: [],
  };
  api.clipArrive(e, api.clipById("belka"));
  assert.equal(sheep.x1, before);
  assert.equal(e.f.beczka, undefined);
  e.f["sqd:ola1"] = true;
  api.clipArrive(e, api.clipById("belka"));
  assert.equal(sheep.x1, 28);
  assert.equal(sheep.y0, 10);
  assert.equal(e.f.beczka, true);
  let others = api.qe[1].sheep.filter((s) => !s.dark);
  assert.ok(others.every((s) => s.x1 !== 28 && s.y0 !== 10));
  sheep.x1 = before;
  sheep.y0 = y0;
});

test("a portal landing is still at least two tiles from every door", () => {
  for (let src of api.qe)
    for (let ex of src.exits) {
      let dest = api.qe.find((z) => z.id === ex.to);
      assert.ok(dest, ex.to);
      let best = 99;
      for (let door of dest.exits)
        for (let y = door.y0; y <= door.y1; y++)
          for (let x = door.x0; x <= door.x1; x++)
            best = Math.min(best, Math.max(Math.abs(ex.tx - x), Math.abs(ex.ty - y)));
      assert.ok(best >= 2, src.id + "->" + ex.to + " d=" + best);
    }
});

function shell() {
  return {
    f: {},
    cut: {},
    sq: [],
    parts: [],
    texts: [],
    enemies: [],
    blocks: [],
    coins: 0,
    staples: 0,
    bonusHp: 0,
    hp: 10,
    mp: 4,
    px: 8,
    py: 8,
    fx: 1,
    fy: 0,
    zone: 0,
    st: { vit: 1, str: 1, dex: 1, mnd: 1 },
    spec: "",
    dirty: false,
  };
}

test("the bridge and the mill beam are a four-tile throw", () => {
  let most = api.clipById("most");
  let belka = api.clipById("belka");
  assert.deepEqual({ x: most.x, y: most.y }, { x: 33, y: 12 });
  assert.deepEqual({ x: belka.x, y: belka.y }, { x: 23, y: 16 });
  assert.equal(rayHook(api.clips, 1, 29, 12, 1, 0).id, "most");
  assert.equal(rayHook(api.clips, 1, 23, 20, 0, -1).id, "belka");
  assert.equal(api.qe[11].t[api.clipLie.y][api.clipLie.x] === "." || api.qe[11].t[api.clipLie.y][api.clipLie.x] === "=" || api.qe[11].t[api.clipLie.y][api.clipLie.x] === ":", true);
});

test("every hook has a place to stand and throw", () => {
  for (let h of api.clips) {
    let zone = api.qe[h.z];
    let tile = zone.t[h.y][h.x];
    assert.ok(tile === "." || tile === ":" || tile === "=", h.id + " tile " + tile);
    let stood = false;
    for (let [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ])
      for (let s = 1; s <= 4 && !stood; s++) {
        let x = h.x - dx * s,
          y = h.y - dy * s;
        let stand = zone.t[y] && zone.t[y][x];
        if (stand !== "." && stand !== ":" && stand !== "=") continue;
        let clear = true;
        for (let k = 1; k < s; k++) {
          let mid = zone.t[y + dy * k][x + dx * k];
          if (mid === "#" || mid === "L") clear = false;
        }
        stood = clear;
      }
    assert.ok(stood, h.id);
  }
});

test("a solved puzzle gives the button back, an open one keeps it", () => {
  assert.equal(clipBlockedByPuzzle({ zone: 4, px: api.Y(8), py: api.Y(18), f: {} }), true);
  assert.equal(
    clipBlockedByPuzzle({ zone: 4, px: api.Y(8), py: api.Y(18), f: { plate: true } }),
    false,
  );
  assert.equal(clipBlockedByPuzzle({ zone: 4, px: api.Y(12), py: api.Y(10), f: {} }), false);
  assert.equal(clipBlockedByPuzzle({ zone: 44, blocks: [{ flag: "kamienie" }], f: {} }), true);
  assert.equal(
    clipBlockedByPuzzle({ zone: 44, blocks: [{ flag: "kamienie" }], f: { kamienie: true } }),
    false,
  );
  assert.equal(clipBlockedByPuzzle({ zone: 1, blocks: [], f: {} }), false);
});

test("a miss spends nothing, and staples stop at six", () => {
  let e = shell();
  e.f.spinacz = true;
  api.clipUse(e);
  assert.equal(e.hp, 10);
  assert.equal(e.mp, 4);
  assert.equal(e.coins, 0);
  assert.ok(e.clipCd > 0);
  let nisza = api.clipById("nisza");
  api.clipArrive(e, nisza);
  assert.equal(e.staples, 3);
  api.clipArrive(e, nisza);
  assert.equal(e.staples, 3);
});

test("the gold slime returns after you leave, until the lure drops", () => {
  let e = shell();
  e.zone = 2;
  let hook = api.clipById("gniazdo");
  api.clipArrive(e, hook);
  assert.equal(e.enemies.filter((n) => n.key === "clip:glut" && n.alive).length, 1);
  assert.equal(e.enemies[0].kind, "gold");
  api.clipArrive(e, hook);
  assert.equal(e.enemies.length, 1);
  e.enemies = [];
  api.clipArrive(e, hook);
  assert.equal(e.enemies.length, 1);
  e.f.blystka = true;
  e.enemies = [];
  api.clipArrive(e, hook);
  assert.equal(e.enemies.length, 0);
});

test("a loaded save reopens the bridge and lets Beczka out", () => {
  let sheep = api.qe[1].sheep.find((s) => s.dark);
  let x1 = sheep.x1,
    y0 = sheep.y0;
  assert.equal(api.qe[1].t[12][30], "w");
  api.applyClipWorld({ f: { mostOpen: true, beczka: true } });
  assert.equal(api.qe[1].t[12][30], ".");
  assert.equal(api.qe[1].t[12][32], ".");
  assert.equal(api.qe[1].t[8][31], "=");
  assert.equal(sheep.x1, 28);
  assert.equal(sheep.y0, 10);
  api.qe[1].t[12][30] = "w";
  api.qe[1].t[12][31] = "w";
  api.qe[1].t[12][32] = "w";
  sheep.x1 = x1;
  sheep.y0 = y0;
});

