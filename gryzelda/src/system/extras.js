// @ts-nocheck
/* v1.5.0: Bestiariusz, Zaginione Pieczątki, nowi mieszkańcy (Skarbiec, Loch), skrzynie specjalne.
   Dane dokładane do tabel z content.js w api.extendNpcs() (wołane pod koniec initData). */
import { api } from "../runtime/api.js";

/* ---------- Bestiariusz ---------- */
api.beastNames = {
  slime: "Glut", gold: "Złoty Glut", bat: "Nietoperz", spam: "Spam", nest: "Gniazdo Spamu",
  ticket: "Ticket", charger: "Szarżownik", shield: "Tarczownik", phone: "Infolinia",
  zombie: "Zombiak", spider: "Pająk", rat: "Szczur", snake: "Wąż", king: "Król Glutów",
  golem: "Golem", phantom: "Fantom", lich: "Lisz", audit: "AUDYT-BOT", morok: "Morok",
  stamper: "Pieczątkarz Ryszard", reklamator: "Kierownik Reklamacji",
};
const BEAST_NOTE = {
  slime: "Lepki, ale szczery.", bat: "Lata zygzakiem, bo nie ma GPS.", spam: "Strzela wiadomościami. Nie odpisuj.",
  ticket: "Trzyma dystans jak dział obsługi klienta.", charger: "Najpierw stoi, potem leci. Pomarańczowe „!” to nie ozdoba.",
  shield: "Tarcza z przodu, plecy z tyłu. Logiczne.", phone: "Wzywa zombiaki. Odbierz mu zasięg.",
  zombie: "Wolny, ale przyprowadza kolegów.", spider: "Zachodzi od boku. Taki styl.",
  rat: "Szybki. Ranny ucieka i wraca z pretensjami.", snake: "Pluje z dystansu. Zielone „!” = zaraz splunie.",
};
const BOSSY = new Set(["king", "golem", "phantom", "lich", "audit", "morok", "stamper", "reklamator", "nest"]);
api.beastKill = function beastKill(e, t) {
  let k = "bk:" + t.kind,
    n = (e.f[k] || 0) + 1;
  e.f[k] = n;
  if (BOSSY.has(t.kind)) return;
  (n === 10 || n === 25) &&
    api.ne(
      e,
      "Bestiariusz: " + (api.beastNames[t.kind] || t.kind) + " ×" + n + ". " +
        (n === 10 ? "Znawczyni: +5% obrażeń przeciw nim." : "Pogromczyni: +10% obrażeń przeciw nim. Rodzina " + (api.beastNames[t.kind] || t.kind) + " pisze skargę."),
      3.4,
    );
};
api.beastMult = function beastMult(e, kind) {
  if (BOSSY.has(kind)) return 1;
  let n = (e.f && e.f["bk:" + kind]) || 0;
  return n >= 25 ? 1.1 : n >= 10 ? 1.05 : 1;
};

/* ---------- Zaginione Pieczątki ---------- */
api.pickExtra = function pickExtra(e, l) {
  if (l.kind !== "stamp") return;
  let n = api.stampCount(e),
    T = api.stampTotal;
  (e.dirty = !0), api.G(e, "chime"), api.se(e, l.x, l.y, "#ff4d6d", 18, 60, 0.6);
  api.ne(
    e,
    "Zaginiona Pieczątka " + n + "/" + T + "! " +
      (n === 1
        ? "Na rączce wyryte: „Własność W. — zwrócić za nagrodą”. Władek z Przystani pewnie wie, czyja."
        : n === T
          ? "Komplet! Władek się popłacze. Ze szczęścia, mam nadzieję."
          : n === 6
            ? "Połowa kolekcji. Władek obiecywał coś za sześć."
            : "Pachnie tuszem i biurokracją."),
    3.4,
  );
};

/* ---------- Skrzynie specjalne (kwoty liczy też narzedzia/ekonomia.mjs) ---------- */
api.specialChests = {
  skarbiec: {
    c: 120,
    open(e) {
      ((e.coins += 120), (e.pts += 1), (e.f.rekawica = !0), (e.bonusHp = (e.bonusHp || 0) + 3), (e.hp += 3), (e.dirty = !0));
      api.ne(
        e,
        "RĘKAWICA KUSTOSZA! +3 maks. HP, mocniejszy cios i kamienie pchasz dwa razy szybciej. Do tego 120 groszy i punkt. Kustosz byłby dumny, gdyby nie spał.",
        5,
      );
      api.G(e, "level");
    },
  },
  skarbiec_l: { c: 90 },
  skarbiec_p: { c: 60, pts: 1 },
  loch_kor: { c: 60 },
  loch_szafa: { c: 70, pts: 1 },
  loch_piecz: { c: 80 },
  loch_haslo: {
    c: 50,
    open(e) {
      ((e.coins += 50), (e.bonusMp += 3), (e.mp = api.ut(e)), (e.dirty = !0));
      api.ne(e, "Notes z hasłami: „admin1”, „admin2”, „NIE_ZGADNIESZ”. Czytanie go daje +3 maks. many i 50 groszy.", 4);
    },
  },
  loch_boss: {
    c: 150,
    open(e) {
      ((e.coins += 150), (e.pts += 2), (e.bonusHp = (e.bonusHp || 0) + 2), (e.hp += 2), (e.f.zlotaPieczatka = !0), (e.dirty = !0));
      api.ne(
        e,
        "Złota Pieczątka Kierownika: „ROZPATRZONO POZYTYWNIE”. Pierwsza w historii działu. +2 maks. HP, 2 punkty rozwoju, 150 groszy.",
        5,
      );
      api.G(e, "level");
    },
  },
};

/* ---------- Mieszkańcy i plotki ---------- */
const NEW_LINES = {
  kustosz: [
    "Kustosz Zenon. Pilnuję Skarbca Przesuwnych Spraw. Głównie pilnuję, żeby nie spać za głośno.",
    "Trzy sale. Każda trudniejsza. Kamień pchniesz, ale nie pociągniesz. Jak zrobisz z kamienia korek w rogu, to zostaje korkiem na zawsze.",
    "Utknęłaś? Wyjdź z sali i wróć, kamienie wracają na miejsca. Albo Dziennik → Przywróć. Albo Użyj, jak nikogo nie ma obok.",
    "Na końcu leży Rękawica Kustosza. Moja. Zgubiłem ją w 1987. Weź, mnie i tak się nie chce schylać.",
  ],
  numerek: [
    "Pani Bożenka, Dział Reklamacji. Proszę pobrać numerek. Obsługujemy numer 3. Pani ma 4812.",
    "Na zachód Sala Pieczątkarza. Ryszard skacze i wbija pieczątki w podłogę. Bez jego pieczątki krata do Kierownika nie puści.",
    "Korytarz na wschód rozgałęzia się. Ktoś tam kiedyś przebił ścianę, żeby się schować przed petentem. Pęknięta, trzeba ją tylko trącić.",
    "Kierownik przyjmuje we wtorki od 9:00 do 9:05. Z pieczątkami z sufitu. Niech pani patrzy pod nogi, czerwone krzyżyki to nie dekoracja.",
  ],
  haslo: [
    "Jestem Duchem Zapomnianego Hasła. Miałem osiem znaków, wielką literę, cyfrę i znak specjalny. I nikt mnie nie pamiętał.",
    "Co 30 dni każą mnie zmieniać. Zmieniłem się już 412 razy. Teraz jestem „Haslo412!”.",
    "Skrzynia w rogu? Notes z hasłami. Najbardziej strzeżona rzecz w lochu. Leży na wierzchu.",
  ],
};
const RUMORS = {
  wladek: [
    "Moje zgłoszenie numer jeden utknęło w Dziale Reklamacji. Pod pomostem Czesława, na samym końcu, jest właz. Ja nie zejdę, mam lęk przed kolejkami.",
    "Zbieram zaginione pieczątki. Rozsiało się ich dwanaście po świecie. Za sześć coś dam, za komplet dam wszystko, co mam. Czyli dużo.",
  ],
  hela: [
    "Za stodołą Zachodnich Pól stoi ruina z kamiennymi drzwiami. Mówią: Skarbiec. Podobno otwiera się, jak kamienie w Kamiennej Zagrodzie siądą na płytach.",
  ],
  czeslaw: [
    "Spod pomostu, z samego końca, słychać stukanie pieczątek. Tam jest właz do jakiegoś działu. Ja nie schodzę, mam przeterminowane ubezpieczenie.",
  ],
};
const NEW_NAMES = { kustosz: "Kustosz Zenon", numerek: "Pani Bożenka", haslo: "Duch Hasła" };
const NEW_LOOKS = {
  kustosz: { body: "#5a4a6a", head: "#e8c8a8", hair: "#e0e0e0", style: 0, extra: "beard", legs: "#2a2a3a" },
  numerek: { body: "#8a3a4a", head: "#f1c7a0", hair: "#6a3a2a", style: 1, extra: "folder", legs: "#3a2a2a" },
  haslo: { body: "#3a5a7a", head: "#b8d8e8", hair: "#e0f0ff", style: 0, extra: "clock", legs: "#2a3a4a" },
};

api.extendNpcs = function extendNpcs() {
  if (api.bp.kustosz) return;
  Object.assign(api.bp, NEW_LINES);
  for (let k in RUMORS) api.bp[k] && api.bp[k].push(...RUMORS[k]);
  Object.assign(api.Zn, NEW_NAMES);
  Object.assign(api.Is, NEW_LOOKS);
  api.ep && Object.assign(api.ep, { kustosz: 0, numerek: 0, haslo: 1 });
  api.NPC_LINE && Object.assign(api.NPC_LINE, { kustosz: "Nie budzić. Budzić kamienie.", numerek: "Proszę pobrać numerek.", haslo: "Zła odpowiedź. Spróbuj ‘admin’." });
  // Zadanie Władka: Reklamacja nr 1 (przedmiot za bossem lochu)
  if (!api.Qi.some((q) => q.id === "rek1")) {
    let q = {
      id: "rek1",
      name: "Reklamacja nr 1",
      giver: "wladek",
      ask: "Gdzie utknęło to pierwsze zgłoszenie?",
      offer:
        "W Dziale Reklamacji, pod pomostem Czesława. Na końcu, w gabinecie kierownika, leży moja teczka. Przynieś ją, a wbiję ci pieczątkę „ZAŁATWIONE”. Pierwszą w moim życiu.",
      accept: "Weź numerek. I kanapkę. Kolejki tam są dłuższe niż ten korytarz.",
      prog: "Teczka wciąż u kierownika. Mówi się, że on nigdy nie wychodzi z gabinetu. Nawet na kawę.",
      turn: "Oto twoje zgłoszenie nr 1",
      done: "ZAŁATWIONE! Trzydzieści lat czekania! Masz 120 groszy, punkt i moją dozgonną wdzięczność. Wdzięczność jest bez paragonu.",
      reward: { c: 120, xp: 160, p: 1 },
      steps: [
        {
          t: "item",
          z: 71,
          tx: 17,
          ty: 2,
          name: "Teczka Zgłoszenia nr 1",
          ic: "awizo",
          hint: "Dział Reklamacji pod pomostem, gabinet kierownika",
          fin: "Teczka! Na okładce: „Zgłoszenie nr 1. Status: w analizie (od 1996)”. Wracaj do Władka.",
        },
      ],
    };
    api.Qi.push(q);
    api.qe[71] && api.qe[71].items.push({ kind: "qi", tx: 17, ty: 2, id: "rek1:0" });
  }
  wrapIcons();
};

/* Władek przyjmuje pieczątki: nagroda za 6 i za 12. */
api.stampOpts = function stampOpts(e, t) {
  if (t !== "wladek") return [];
  let n = api.stampCount(e),
    o = [];
  n >= 6 &&
    !e.f.stamp6 &&
    o.push({
      label: "Mam sześć twoich pieczątek",
      act: (s) => {
        ((s.f.stamp6 = !0), (s.coins += 80), (s.pts += 1), (s.dirty = !0), api.G(s, "coin"));
        api.ne(s, "Władek: „Sześć! Pół kolekcji!” Dostajesz 80 groszy i punkt rozwoju.", 3.4);
        return "";
      },
    });
  n >= 12 &&
    !e.f.stamp12 &&
    o.push({
      label: "Mam komplet: dwanaście",
      act: (s) => {
        ((s.f.stamp12 = !0), (s.coins += 150), (s.bonusHp = (s.bonusHp || 0) + 4), (s.hp += 4), (s.dirty = !0), api.G(s, "level"));
        api.ne(s, "Władek: „KOMPLET!” Płacze do teczki. Dostajesz 150 groszy i +4 maks. HP. Pieczątki zostają u ciebie, on chce tylko popatrzeć.", 4.4);
        return "";
      },
    });
  return o;
};

/* Wpisy do Dziennika: Bestiariusz i Pieczątki */
api.journalExtra = function journalExtra(e) {
  let out = [],
    n = api.stampCount(e);
  (n > 0 || e.f["tk:wladek"]) &&
    out.push("Zaginione Pieczątki: " + n + "/" + api.stampTotal + (n < api.stampTotal ? ". Władek zbiera. Szukaj w kątach, które nikt nie sprząta." : ". Komplet!"));
  let kinds = Object.keys(api.beastNames).filter((k) => e.f["bk:" + k] > 0);
  if (kinds.length)
    for (let k of kinds) {
      let c = e.f["bk:" + k],
        tier = BOSSY.has(k) ? " (pokonany)" : c >= 25 ? " · Pogromczyni +10%" : c >= 10 ? " · Znawczyni +5% (do 25: " + (25 - c) + ")" : " (do Znawczyni: " + (10 - c) + ")";
      out.push(api.beastNames[k] + " ×" + c + tier + (BEAST_NOTE[k] ? " — " + BEAST_NOTE[k] : ""));
    }
  else out.push("Bestiariusz jest pusty. Potwory jeszcze nie wiedzą, że się ich spisuje.");
  return out;
};

/* Ikony nowych przedmiotów */
function wrapIcons() {
  if (!api.Si || api.Si.wrapped) return;
  let base = api.Si;
  api.Si = function Si(e, t, n, i, a) {
    if (t === "stamp") {
      let b = Math.round(Math.sin((a || 0) * 3) * 1);
      api.o(e, "#1b1424", n - 4, i - 7 + b, 8, 12);
      api.o(e, "#8a5a32", n - 2, i - 6 + b, 4, 5);
      api.o(e, "#b8243a", n - 3, i - 1 + b, 6, 3);
      api.o(e, "#ff4d6d", n - 3, i + 2 + b, 6, 1);
      return;
    }
    return base(e, t, n, i, a);
  };
  api.Si.wrapped = !0;
}
