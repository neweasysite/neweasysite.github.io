// @ts-nocheck
/** Mały odpowiednik hooków, bez Reacta. Kolejność wywołań musi być stała. */

let active = null;

export function bindHooks(hooks) {
  active = hooks;
}

export function useRef(value) {
  return active.useRef(value);
}

export function useState(value) {
  return active.useState(value);
}

export function useEffect(effect, deps) {
  return active.useEffect(effect, deps);
}

export function createHooks(schedule) {
  const slots = [];
  let cursor = 0;
  let alive = true;

  return {
    begin() {
      cursor = 0;
    },
    useRef(value) {
      const index = cursor++;
      if (slots[index] === undefined) slots[index] = { kind: "ref", current: value };
      return slots[index];
    },
    useState(value) {
      const index = cursor++;
      if (slots[index] === undefined) {
        slots[index] = {
          kind: "state",
          s: typeof value === "function" ? value() : value,
        };
      }
      const slot = slots[index];
      if (!slot.set) {
        slot.set = (next) => {
          const valueNext = typeof next === "function" ? next(slot.s) : next;
          if (Object.is(valueNext, slot.s)) return;
          slot.s = valueNext;
          schedule();
        };
      }
      return [slot.s, slot.set];
    },
    useEffect(effect, deps) {
      const index = cursor++;
      if (slots[index] === undefined) {
        slots[index] = { kind: "effect", deps: undefined, cleanup: null, fn: null, nextDeps: null };
      }
      const slot = slots[index];
      const prev = slot.deps;
      const changed =
        prev === undefined ||
        deps == null ||
        prev == null ||
        prev.length !== deps.length ||
        deps.some((item, i) => !Object.is(item, prev[i]));
      if (changed) {
        slot.fn = effect;
        slot.nextDeps = deps ? deps.slice() : null;
        slot.dirty = true;
      }
    },
    end() {
      const batch = [];
      for (const slot of slots) {
        if (slot && slot.kind === "effect" && slot.dirty) {
          slot.dirty = false;
          batch.push(slot);
        }
      }
      if (!batch.length) return;
      queueMicrotask(() => {
        if (!alive) return;
        for (const slot of batch) {
          if (slot.cleanup) {
            slot.cleanup();
            slot.cleanup = null;
          }
          const cleanup = slot.fn();
          slot.cleanup = typeof cleanup === "function" ? cleanup : null;
          slot.deps = slot.nextDeps;
        }
      });
    },
    dispose() {
      alive = false;
      for (const slot of slots) {
        if (slot && slot.kind === "effect" && slot.cleanup) {
          slot.cleanup();
          slot.cleanup = null;
        }
      }
    },
  };
}
