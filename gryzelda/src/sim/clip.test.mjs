import test from "node:test";
import assert from "node:assert/strict";
import { api } from "../runtime/api.js";
import "../world/build.js";
import "../world/crypt.js";
import "../world/fixes.js";
import "../world/query.js";
import "../world/travel.js";
import "./clip.js";
import "../data/content.js";
import "../quest/flow.js";
import "./interact.js";
import "../player/build.js";
import "./combat.js";
import "./tick.js";
import "../system/rest.js";
import { decideClip, rayHook, scarfAbsorb, openMost, openEast, facing, clipBlockedByPuzzle, reachesWithoutFord, nearRiver } from "./clip.js";

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

test("sixteen hooks, the piles included, none missing", () => {
  assert.deepEqual(api.clipMiss, []);
  let main = api.clips.filter((h) => !h.back);
  assert.equal(main.length, 16);
  assert.equal(api.clips.filter((h) => h.back).length, 13);
  let rewards = main.filter((h) => h.reward !== "coin" && h.reward !== "moor");
  assert.equal(rewards.length, 14);
  assert.equal(main.filter((h) => h.reward === "coin").length, 0);
  assert.equal(api.clips.filter((h) => h.reward === "moor").length, 2);
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

test("the river stays water and the road bridge is wooden planks", () => {
  let fords = 0;
  for (let y = 0; y < api.qe[1].h; y++)
    for (let x = 0; x < api.qe[1].w; x++) if (api.qe[1].t[y][x] === "=") fords++;
  assert.equal(fords, 0);
  for (let y = 0; y < api.qe[1].h; y++)
    for (let x = 30; x <= 32; x++) assert.equal(api.qe[1].t[y][x], "w", y + "," + x);
  assert.equal(api.qe[1].t[15][8], ":");
  assert.ok(8 < 30);
  let copy = api.qe[1].t.map((r) => r.slice());
  assert.equal(openMost(api.qe[1]), true);
  for (let y of [8, 9])
    for (let x of [30, 31, 32]) assert.equal(api.qe[1].t[y][x], "=", y + "," + x);
  assert.equal(api.qe[1].t[23][31], "w");
  assert.equal(api.qe[1].t[7][31], "w");
  assert.equal(api.qe[1].t[10][31], "w");
  assert.equal(openEast(api.qe[1]), true);
  for (let y of [23, 24])
    for (let x of [30, 31, 32]) assert.equal(api.qe[1].t[y][x], "=", y + "," + x);
  assert.equal(api.qe[1].t[8][29], copy[8][29]);
  for (let y of [8, 9, 23, 24]) for (let x of [30, 31, 32]) api.qe[1].t[y][x] = "w";
});

test("quest items sit on the hook and old quests are untouched", () => {
  let kam = api.Qi.find((q) => q.id === "kamMost"),
    spin = api.Qi.find((q) => q.id === "spin1"),
    rys = api.Qi.find((q) => q.id === "rys1"),
    kam1 = api.Qi.find((q) => q.id === "kam1");
  assert.equal(kam.giver, "zdzich");
  assert.equal(kam.steps[0].t, "item");
  assert.equal(kam.steps[0].tx, 8);
  assert.equal(kam.steps[0].ty, 15);
  assert.ok(kam.steps[0].tx < 20);
  assert.equal(kam.steps[0].ic, "deski");
  assert.equal(kam.steps[1].to, "kamila");
  assert.equal(/teczk/i.test([kam.ask, kam.offer, kam.accept, kam.done, kam.steps[1].txt].join(" ")), false);
  assert.equal(/spinacz|most|darek|kamila/i.test(spin.ask), false);
  assert.equal(/kamila|darek|\bmost\b/i.test(spin.offer), false);
  assert.equal(/ruin/i.test(api.Qi.find((q) => q.id === "wan1").ask), false);
  let zdz = api.Qi.find((q) => q.id === "zdz1");
  let wan = api.Qi.find((q) => q.id === "wan1");
  assert.equal(zdz.after, "kamMost");
  assert.equal(wan.after, "spin1");
  assert.equal(api.Hp({ f: {} }, kam), false);
  assert.equal(api.Hp({ f: { riverBlock: true } }, kam), false);
  assert.equal(api.Hp({ f: { bogdanBridge: true } }, kam), true);
  assert.equal(api.Hp({ f: {} }, zdz), false);
  assert.equal(api.Hp({ f: { bogdanBridge: true, "sqd:kamMost": true } }, zdz), true);
  assert.equal(api.Hp({ f: { bogdanBridge: true, "sq:kamMost": true } }, zdz), false);
  assert.equal(api.Hp({ f: { seal: true } }, wan), false);
  assert.equal(api.Hp({ f: { seal: true, "sqd:spin1": true } }, wan), true);
  assert.equal(api.Zp({ f: {} }, "zdzich").opts.filter((o) => o.go && o.go.endsWith(":offer")).length, 0);
  let stuck = api.Zp({ f: { bogdanBridge: true } }, "zdzich").opts.find((o) => o.go && o.go.endsWith(":offer"));
  assert.equal(stuck.label, "Nie da się przejść na wschód");
  let fresh = { f: {} },
    by = {};
  for (let q of api.Qi) if (api.Hp(fresh, q)) by[q.giver] = (by[q.giver] || 0) + 1;
  for (let [g, n] of Object.entries(by)) assert.equal(n, 1, g);
  let afterBridge = { f: { "sqd:kamMost": true } };
  assert.deepEqual(
    api.Qi.filter((q) => q.giver === "zdzich" && api.Hp(afterBridge, q)).map((q) => q.id),
    ["zdz1"],
  );
  assert.deepEqual(
    api.Qi.filter((q) => q.giver === "kamila" && api.Hp(afterBridge, q)).map((q) => q.id),
    ["kam1"],
  );
  assert.equal(kam.after, undefined);
  assert.equal(kam1.after, "kamMost");
  assert.equal(api.Hp({ f: { bogdanBridge: true } }, kam), true);
  assert.equal(api.Hp({ f: {} }, kam1), false);
  assert.equal(spin.after, "rys1");
  assert.equal(rys.steps.length, 2);
  assert.equal(kam1.steps[0].tx, 58);
  assert.equal(api.Qi.filter((q) => q.id === "rys1").length, 1);
  assert.equal(api.jn.spinacz.name, "Spinacz");
  assert.ok(api.Cf.includes("spinacz"));
  assert.equal(reachesWithoutFord(0, 2), false);
  assert.equal(reachesWithoutFord(0, 9), true);
});

test("spinacz is not granted until Wanda finishes, and the scarf needs the ram", () => {
  let e = { f: {}, coins: 0, pts: 0, lvl: 1, xp: 0, st: { vit: 1, str: 1, dex: 1, mnd: 1 }, spec: "", bonusHp: 0, sq: [], weapons: ["miecz"], weapon: "miecz" };
  let spin = api.Qi.find((q) => q.id === "spin1");
  assert.equal(api.Hp(e, spin), false);
  e.f["sqd:rys1"] = true;
  assert.equal(api.Hp(e, spin), true);
  api.onQuestDone(e, spin);
  assert.equal(e.f.spinacz, true);
  assert.ok(e.weapons.includes("spinacz"));
  assert.equal(e.weapon, "spinacz");
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

test("the road is not a hook, and the piles cross opposite ways", () => {
  let east = api.clipById("palE");
  let west = api.clipById("palW");
  assert.equal(api.clipById("most"), undefined);
  assert.deepEqual({ x: east.x, y: east.y }, { x: 33, y: 5 });
  assert.deepEqual({ x: west.x, y: west.y }, { x: 29, y: 28 });
  assert.ok(west.y > east.y);
  assert.equal(rayHook(api.clips, 1, 29, 5, 1, 0).id, "palE");
  assert.equal(rayHook(api.clips, 1, 33, 28, -1, 0).id, "palW");
  assert.equal(rayHook(api.clips, 1, 29, 8, 1, 0), null);
  assert.equal(rayHook(api.clips, 1, 33, 5, -1, 0), null);
  let belka = api.clipById("belka");
  assert.deepEqual({ x: belka.x, y: belka.y }, { x: 23, y: 16 });
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
  assert.equal(api.qe[1].t[8][31], "w");
  assert.equal(api.qe[1].t[23][31], "w");
  api.applyClipWorld({ f: { mostOpen: true, beczka: true } });
  assert.equal(api.qe[1].t[8][31], "w");
  assert.equal(api.qe[1].t[23][31], "w");
  api.applyClipWorld({ f: { "sqd:kamMost": true, beczka: true } });
  assert.equal(api.qe[1].t[8][30], "=");
  assert.equal(api.qe[1].t[9][32], "=");
  assert.equal(api.qe[1].t[23][31], "w");
  api.applyClipWorld({ f: { "sqd:kamMost": true, "sqd:kam3": true } });
  assert.equal(api.qe[1].t[23][30], "=");
  assert.equal(api.qe[1].t[24][32], "=");
  assert.equal(api.qe[1].t[8][31], "=");
  assert.equal(sheep.x1, 28);
  assert.equal(sheep.y0, 10);
  let armed = { f: { spinacz: true }, weapons: ["miecz"], weapon: "miecz" };
  api.applyClipWorld(armed);
  assert.equal(armed.weapon, "spinacz");
  assert.equal(api.qe[1].t[8][31], "w");
  for (let y of [8, 9, 23, 24]) for (let x of [30, 31, 32]) api.qe[1].t[y][x] = "w";
  sheep.x1 = x1;
  sheep.y0 = y0;
});

test("the river only says the footbridge is gone, Bogdan names Zdzich", () => {
  let lure = api.Qi.find((q) => q.id === "rys1").steps[0];
  assert.equal(lure.z, 43);
  assert.equal(lure.tx, 22);
  assert.equal(lure.ty, 22);
  let said = "";
  let prev = api.ne;
  api.ne = (_e, m) => {
    said = m;
  };
  let e = { zone: 1, px: api.Y(29), py: api.Y(8), f: {}, dirty: false };
  api.noteRiver(e);
  api.ne = prev;
  assert.equal(e.f.riverBlock, true);
  assert.match(said, /Kładki nie ma/);
  assert.equal(/zdzich|bogdan/i.test(said), false);
  assert.equal(api.dh({ f: { riverBlock: true } }, "zdzich"), false);
  assert.equal(api.dh({ f: { bogdanBridge: true } }, "zdzich"), true);
  let early = api.Zo({ f: { bogdan: true, cellarDone: true, riverBlock: true } });
  assert.equal(early.zone, 2);
  let told = api.Zo({ f: { bogdan: true, cellarDone: true, bogdanBridge: true } });
  assert.equal(told.zone, 0);
  assert.equal(told.x, 16);
  assert.match(told.text, /Zdzisiek/);
});

test("sheep die and run, fighters hit back, house doors sit in the middle", () => {
  let e = {
    zone: 0,
    px: 80,
    py: 80,
    fx: 1,
    fy: 0,
    f: {},
    coins: 0,
    hp: 30,
    inv: 0,
    dashT: 0,
    dead: false,
    win: false,
    ward: 0,
    texts: [],
    parts: [],
    sq: [],
    blocks: [],
    settings: { shake: false },
    flock: [
      {
        x: 80,
        y: 80,
        gx: 80,
        gy: 80,
        hp: 6,
        dead: false,
        dark: false,
        x0: 0,
        y0: 0,
        x1: 30,
        y1: 30,
        boop: -1,
        flee: 0,
        wait: 1,
      },
    ],
    np: {
      bogdan: { x: 200, y: 80, gx: 200, gy: 80, hitId: -1, wait: 2 },
      filip: { x: 200, y: 120, gx: 200, gy: 120, hitId: -1, wait: 2 },
    },
  };
  api.pokeWorld(e, 80, 80, 10, 2, 1, 1, 0);
  assert.equal(e.flock[0].hp, 4);
  assert.ok(e.flock[0].flee > 0);
  assert.equal(e.flock[0].dead, false);
  api.pokeWorld(e, 80, 80, 10, 9, 2, 1, 0);
  assert.equal(e.flock[0].dead, true);
  assert.equal(e.flock[0].fall, 0.45);
  assert.equal(e.coins, 1);
  let before = e.hp,
    bx = e.np.bogdan.x;
  api.pokeWorld(e, 200, 80, 10, 3, 3, 1, 0);
  assert.equal(e.hp, before);
  assert.equal(e.np.bogdan.x, bx);
  assert.equal(e.np.bogdan.duel, true);
  assert.equal(e.np.bogdan.lvl, 14);
  assert.ok(e.np.bogdan.hp < e.np.bogdan.maxHp);
  let fx = e.np.filip.x;
  api.pokeWorld(e, 200, 120, 10, 3, 4, 1, 0);
  assert.equal(e.np.filip.x, fx);
  assert.ok(e.np.filip.shy > 0);
  assert.notEqual(e.np.filip.gx, fx);
  api.slideNpc(e, api.Cn(e), "filip", e.np.filip, 0.05);
  let face = e.np.filip.fx + ":" + e.np.filip.fy;
  assert.ok(e.np.filip.fx === 0 || e.np.filip.fy === 0);
  api.slideNpc(e, api.Cn(e), "filip", e.np.filip, 0.05);
  assert.equal(e.np.filip.fx + ":" + e.np.filip.fy, face);
  e.np.bogdan.x = 90;
  e.np.bogdan.y = 80;
  e.np.bogdan.atk = 0;
  e.np.bogdan.swing = 0;
  api.duelStep(e, "bogdan", e.np.bogdan, 0.2);
  assert.ok(e.hp < before);
  e.np.bogdan.hp = 1;
  e.np.bogdan.inv = 0;
  e.np.bogdan.hitId = -1;
  api.pokeWorld(e, e.np.bogdan.x, e.np.bogdan.y, 12, 5, 9, 1, 0);
  assert.equal(e.np.bogdan.duel, false);
  assert.equal(e.f["beat:bogdan"], true);
  assert.match(api.duelLine(e, "bogdan"), /silniejsza/);
  assert.equal(api.duelLine(e, "bogdan"), "");
  for (const z of api.qe) {
    if (!z || z.theme !== "inn" || z.w > 18) continue;
    assert.equal(z.w % 2, 1, z.name + " width");
    for (const ex of z.exits) {
      const tile = z.t[ex.y0][ex.x0];
      if ((tile === "_" || tile === "U" || tile === "d") && (ex.y0 === 0 || ex.y0 === z.h - 1))
        assert.equal(ex.x0, (z.w - 1) >> 1, z.name);
    }
  }
  for (const z of api.qe)
    for (const ex of z.exits || []) {
      const dest = api.qe.find((d) => d && d.id === ex.to);
      if (!dest || dest.theme !== "inn" || dest.w > 18) continue;
      const back = (dest.exits || []).find(
        (r) => r.to === z.id && dest.t[r.y0] && dest.t[r.y0][r.x0] === "_",
      );
      if (!back) continue;
      assert.equal(ex.tx, back.x0, dest.name + " landing");
    }
});

