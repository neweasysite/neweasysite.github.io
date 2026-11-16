// @ts-nocheck
/* Gryzelda i Kryształ Odpowiedzi — rekonstrukcja źródeł.
   © 2026 Kamil Goda. Silnik bez Reacta: HTML, canvas, moduły JS. */
import { api } from "./runtime/api.js";
import { bindHooks, createHooks } from "./runtime/hooks.js";
import { createSurface, jsx, jsxs, Fragment } from "./runtime/dom.js";
import "./world/build.js";
import "./world/crypt.js";
import "./world/fixes.js";
import "./system/economy.js";
import "./world/expansion.js";
import "./sim/ai.js";
import "./system/extras.js";
import "./world/query.js";
import "./world/travel.js";
import "./render/canvas.js";
import "./render/actor.js";
import "./render/enemies.js";
import "./render/tiles.js";
import "./render/props.js";
import "./render/frame.js";
import "./sim/tick.js";
import "./sim/combat.js";
import "./sim/interact.js";
import "./sim/clip.js";
import "./quest/flow.js";
import "./player/build.js";
import "./player/items.js";
import "./system/god.js";
import "./ui/screen.js";
import "./boot/helpers.js";
import "./system/rest.js";
import "./data/content.js";

export function startGame(host) {
  api.h = { jsx, jsxs, Fragment };
  if (!api._ready) {
    api.initData();
    api._ready = true;
  }
  const surface = createSurface(host);
  const hooks = createHooks(() => surface.schedule(render));
  let dead = false;
  function render() {
    if (dead) return;
    bindHooks(hooks);
    hooks.begin();
    const view = api.Qf();
    surface.commit(view);
    hooks.end();
  }
  render();
  return () => {
    dead = true;
    hooks.dispose();
    surface.destroy();
  };
}

if (typeof document !== "undefined") {
  const pageRoot = document.getElementById("root");
  if (pageRoot && pageRoot.dataset.gryzeldaHost === "page") startGame(pageRoot);
}
