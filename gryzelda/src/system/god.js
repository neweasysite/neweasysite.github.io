// @ts-nocheck
/* Pieczęć menu. Hasło nie leży w źródle jako tekst. */
import { api } from "../runtime/api.js";

const MARK = "grz.q7";
const FLAGS = "grz.qf";

function mix(s) {
  let a = 0x811c9dc5 >>> 0;
  let b = 0x9e3779b9 >>> 0;
  for (let i = 0; i < s.length; i++) {
    let c = s.charCodeAt(i);
    a = Math.imul(a ^ c, 0x01000193) >>> 0;
    b = Math.imul(b ^ (c + ((i * 17) & 255)), 0x85ebca6b) >>> 0;
    a = (a ^ (b >>> 11)) >>> 0;
  }
  a = Math.imul(a ^ s.length, 0x27d4eb2f) >>> 0;
  b = Math.imul(b ^ (a >>> 16), 0xc2b2ae35) >>> 0;
  return [a >>> 0, b >>> 0];
}

const SEAL_A = (0x48604aae ^ 0x138c9cdf) >>> 0;
const SEAL_B = (0xdcc06dba ^ 0x132579df) >>> 0;

api.godOpen = function godOpen() {
  try {
    return window.localStorage.getItem(MARK) === "1";
  } catch {
    return false;
  }
};

api.godUnlock = function godUnlock() {
  try {
    window.localStorage.setItem(MARK, "1");
  } catch {
    /* ta sesja i tak trzyma stan w pamięci */
  }
};

api.godMatch = function godMatch(raw) {
  if (typeof raw !== "string") return false;
  let s = raw.trim();
  if (!s || s.length > 32) return false;
  let d = mix(s);
  return d[0] === SEAL_A && d[1] === SEAL_B;
};

api.godFlags = function godFlags() {
  let o = { imm: false, veil: false };
  try {
    let t = JSON.parse(window.localStorage.getItem(FLAGS) || "null");
    if (t && typeof t === "object") {
      o.imm = !!t.imm;
      o.veil = !!t.veil;
    }
  } catch {
    /* zostaw wyłączone */
  }
  return o;
};

api.godFlip = function godFlip(key) {
  let o = api.godFlags();
  if (key === "imm" || key === "veil") o[key] = !o[key];
  try {
    window.localStorage.setItem(FLAGS, JSON.stringify(o));
  } catch {
    /* tylko ta sesja */
  }
  return o;
};

api.godBind = function godBind(e) {
  if (!e) return e;
  e.god = api.godOpen() ? api.godFlags() : null;
  return e;
};
