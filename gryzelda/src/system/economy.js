// @ts-nocheck
/* Ekonomia v1.5.0: grosze rosną z głębokością świata, bossowie sypią groszami,
   kuźnia ma ceny dopasowane do tego, co dokładny gracz realnie zbierze w danym akcie.
   Liczby sprawdza narzedzia/ekonomia.mjs. */
import { api } from "../runtime/api.js";

const r5 = (v) => Math.max(5, Math.round(v / 5) * 5);

/* Wartość jednej monety z łupu: Akt 1 = 1 gr, Akt 2 = 2–3 gr, Akt 3 = 4–5 gr. */
api.coinV = function coinV(zone) {
  return 1 + Math.floor((api.Df[zone] || 1) / 6);
};

/* Skrzynie ze stałą nagrodą (dają też coś na stałe). Reszta: zwykła skrzynia skalowana poziomem strefy. */
api.chestFixed = {
  cache: 12,
  mana: 10,
  serce: 20,
  kusza: 15,
  arch1: 40,
  nowe_przystan: 30,
  nowe_wladek: 20,
  nowe_owczarnia: 35,
};
api.chestLoot = function chestLoot(e, id) {
  if (id in api.chestFixed) return { c: api.chestFixed[id], fixed: !0 };
  if (api.specialChests && api.specialChests[id]) return api.specialChests[id];
  let df = api.Df[e.zone] || 1;
  return { c: r5(18 + df * 3.2), pts: 1 };
};
const CHEST_JOKES = [
  "Skrzynia! W środku grosze i karteczka „Dziękujemy za cierpliwość”.",
  "Skrzynia! Ktoś tu zostawił oszczędności i paragon na 3 kawy.",
  "Skrzynia! Grosze leżą równo, jakby ktoś je wcześniej policzył dwa razy.",
  "Skrzynia! Zamek otworzył się sam. Pewnie też czekał na support.",
  "Skrzynia! Pachnie kurzem, stalą i zaległym urlopem.",
];
api.openChest = function openChest(e, l) {
  let L = api.chestLoot(e, l.id);
  if (L.fixed) return !1;
  if (L.open) return (L.open(e, l), !0);
  ((e.coins += L.c), L.pts && (e.pts += L.pts));
  let j = CHEST_JOKES[(l.id.length + l.tx * 7 + l.ty * 3) % CHEST_JOKES.length];
  api.ne(e, j + " +" + L.c + " groszy" + (L.pts ? ", +" + L.pts + " punkt rozwoju." : "."), 3.2);
  return !0;
};

/* Bossowie przy pierwszym pokonaniu sypią deszczem groszy (zbierasz je jak zwykłe monety). */
api.bossCoins = { stamper: 60, reklamator: 110, king: 40, support: 60, golem: 70, phantom: 60, lich: 100, root: 160, audit: 90, morok: 120 };
api.bossPurse = function bossPurse(e, kind, x, y) {
  let k = kind === "lich" && e.zone === 25 ? "root" : kind,
    sum = api.bossCoins[k],
    flag = "purse:" + k + ":" + e.zone;
  if (!sum || e.f[flag]) return;
  ((e.f[flag] = !0), (e.dirty = !0));
  let n = Math.min(12, Math.max(6, Math.round(sum / 10))),
    v = Math.floor(sum / n),
    rest = sum - v * n;
  for (let i = 0; i < n; i++) {
    let a = (i / n) * Math.PI * 2;
    e.items.push({
      kind: "coin",
      x: x + Math.cos(a) * (10 + (i % 3) * 6),
      y: y + Math.sin(a) * (8 + (i % 3) * 5),
      v: v + (i === 0 ? rest : 0),
      id: "",
      taken: !1,
    });
  }
};

/* Kuźnia Wandy: ceny ran 1/2/3 (patrz ekonomia.mjs). */
api.forgeCosts = {
  arm1: [30, 70, 120],
  edge1: [30, 65, 110],
  edge2: [55, 120, 200],
  arm2: [70, 150, 250],
  edge3: [90, 180, 290],
  arm3: [110, 220, 350],
  edge4: [130, 260, 400],
  rootEdge: [220, 440, 680],
};

/* Do raportu ekonomii: grosze z dialogów fabularnych i pobocznych. */
api.mainCoins = { 1: [25, 60], 2: [40, 40], 3: [100] };
api.sideDialogCoins = [15, 20, 30, 40];
