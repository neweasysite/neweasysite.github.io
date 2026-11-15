// @ts-nocheck
/* Wygląd, statystyki, zapis i wczytanie.
   Nazwy wewnętrzne zostały po minifikacji — logika jest ta sama co w oryginalnej paczce. */
import { api } from "../runtime/api.js";

api.ap = function ap() {
  return {
    name: "Gryzelda",
    hair: 0,
    hairColor: 0,
    outfit: 0,
    outfitColor: 0,
    cls: "war",
    skin: 0,
  };
};

api.markHeirloom = function markHeirloom() {
  api._heir = !0;
  try {
    window.localStorage.setItem("__gry_sygnet", "1");
  } catch {
    /* zapis gry i tak trzyma flagę w tej rozgrywce */
  }
};

api.hasHeirloom = function hasHeirloom() {
  if (api._heir) return !0;
  try {
    return window.localStorage.getItem("__gry_sygnet") === "1";
  } catch {
    return !1;
  }
};

api.Np = function Np(e) {
  let t = { ...api.et[e.cls].base },
    n = [api.et[e.cls].start],
    i = {
      look: e,
      st: t,
      lvl: 1,
      xp: 0,
      pts: 0,
      coins: 0,
      hp: 0,
      mp: 0,
      bonusHp: 0,
      bonusMp: 0,
      staples: 0,
      scarfUsed: !1,
      clipCd: 0,
      falszT: 0,
      skills: {
        dash: 0,
        spin: 0,
        fury: 0,
        bash: 0,
        taunt: 0,
        fire: 0,
        ward: 0,
        seria: 0,
        trap: 0,
        multi: 0,
        roll: 0,
        blink: 0,
        frost: 0,
        barrier: 0,
      },
      active: null,
      weapons: n,
      weapon: api.et[e.cls].start,
      spec: "",
      f: { v8: !0, v9: !0, v10: !0, v11: !0 },
      cut: {},
      seen: {},
      zone: 0,
      px: 0,
      py: 0,
      fx: 0,
      fy: 1,
      mvx: 0,
      mvy: 0,
      camX: 0,
      camY: 0,
      inv: 0,
      atkCd: 0,
      swing: 0,
      swingId: 0,
      walk: 0,
      dashT: 0,
      dashCd: 0,
      dvx: 0,
      dvy: 0,
      skillCd: 0,
      ward: 0,
      wardT: 0,
      spinT: 0,
      castT: 0,
      pushT: 0,
      atkT: 0,
      atkMax: 0,
      cp: { zone: 0, x: api.Y(api.Qn.x), y: api.Y(api.Qn.y) },
      shrineLock: !1,
      enemies: [],
      items: [],
      pshots: [],
      eshots: [],
      parts: [],
      texts: [],
      bolts: [],
      boss: null,
      bossHp: 60,
      blocks: [],
      sw: [0, 0, 0],
      buf: { kawa: 0, ekspres: 0, magnes: 0 },
      potsHp: 0,
      potsMp: 0,
      msg: "",
      msgT: 0,
      banner: "",
      bannerT: 0,
      time: 0,
      hitstop: 0,
      shake: 0,
      zoom: 1,
      zt: 1,
      zT: 0,
      zfx: -1,
      zfy: -1,
      dead: !1,
      win: !1,
      req: null,
      near: null,
      deaths: 0,
      kills: 0,
      settings: { shake: !0, autoAim: !0, music: !0, sfx: !0, touch: !1 },
      dirty: !1,
      kamila: !1,
      sq: [],
      layerDirty: !0,
      np: {},
      nav: "",
    };
  return (
    (i.hp = api.Ze(i)),
    (i.mp = api.ut(i)),
    api.hasHeirloom() && ((i.f.sygnet = !0), (i.f.sygnetOn = !0)),
    api.Ks(i, 0, api.Y(api.Qn.x), api.Y(api.Qn.y)),
    api.godBind(i),
    api.ne(
      i,
      i.f.sygnet
        ? "Sygnet Jednego Ciosu jest na palcu: każde trafienie kończy mobka. Zdejmiesz go w menu, przy broniach. Potem Bogdan."
        : "Support nie odpisa\u0142. Porozmawiaj z mistrzem Bogdanem (\u017C\xF3\u0142ty wykrzyknik).",
      4.5,
    ),
    i
  );
};

api.Lp = function Lp(e) {
  return {
    v: 2,
    look: e.look,
    st: e.st,
    lvl: e.lvl,
    xp: e.xp,
    pts: e.pts,
    coins: e.coins,
    bonusHp: e.bonusHp,
    bonusMp: e.bonusMp,
    staples: e.staples || 0,
    scarfUsed: !!e.scarfUsed,
    skills: e.skills,
    active: e.active,
    weapons: e.weapons,
    weapon: e.weapon,
    spec: e.spec,
    f: e.f,
    cut: e.cut,
    seen: e.seen,
    cp: e.cp,
    settings: e.settings,
    deaths: e.deaths,
    kills: e.kills,
    time: e.time,
    bossHp: e.bossHp,
    potsHp: e.potsHp,
    potsMp: e.potsMp,
    nav: e.nav || "",
  };
};

api.Ak = function Ak(e) {
  let t = api.Np(e.look);
  if (
    ((t.st = { ...e.st }),
    (t.lvl = e.lvl),
    (t.xp = e.xp),
    (t.pts = e.pts),
    (t.coins = e.coins),
    (t.bonusHp = e.bonusHp),
    (t.bonusMp = e.bonusMp),
    (t.staples = typeof e.staples == "number" ? Math.max(0, Math.min(6, Math.floor(e.staples))) : 0),
    (t.scarfUsed = !!e.scarfUsed),
    (t.skills = { ...t.skills, ...e.skills }),
    (t.active = e.active),
    (t.weapons = e.weapons.slice()),
    (t.weapon = e.weapon),
    (t.spec = e.spec),
    (t.f = { ...e.f }),
    t.f.v8 ||
      ((t.f.king || t.f.seal) && ((t.f.cellarQ = !0), (t.f.cellarDone = !0)), (t.f.v8 = !0)),
    t.f.v9 || ((t.f.v9 = !0), t.f.won && (t.f.act2 = !0)),
    t.f.v11 || (t.f.v11 = !0),
    !t.f.v10)
  ) {
    t.f.v10 = !0;
    let n = Math.max(
      0,
      t.st.str +
        t.st.vit +
        t.st.dex +
        t.st.mnd -
        (api.et[t.look.cls].base.str +
          api.et[t.look.cls].base.vit +
          api.et[t.look.cls].base.dex +
          api.et[t.look.cls].base.mnd),
    );
    ((t.st = { ...api.et[t.look.cls].base }),
      (t.pts += n + Math.max(0, t.lvl - 1)),
      t.skills.fury === void 0 && (t.skills.fury = 0),
      t.skills.seria === void 0 && (t.skills.seria = 0));
    for (let i of ["bash", "taunt", "trap", "multi", "roll", "blink", "frost", "barrier"])
      t.skills[i] === void 0 && (t.skills[i] = 0);
    t.cp &&
      t.cp.zone >= api.qe.length &&
      (t.cp = { zone: 0, x: api.Y(api.Qn.x), y: api.Y(api.Qn.y) });
  }
  return (
    (t.cut = { ...e.cut }),
    (t.seen = { ...e.seen }),
    (t.cp = { ...e.cp }),
    (t.settings = { ...t.settings, ...e.settings }),
    (t.deaths = e.deaths),
    (t.kills = e.kills),
    (t.time = e.time),
    (t.bossHp = e.bossHp),
    (t.potsHp = typeof e.potsHp == "number" ? e.potsHp : 0),
    (t.potsMp = typeof e.potsMp == "number" ? e.potsMp : 0),
    (t.nav = typeof e.nav == "string" ? e.nav : ""),
    api.applyClipWorld && api.applyClipWorld(t),
    (t.hp = api.Ze(t)),
    (t.mp = api.ut(t)),
    api.godBind(t),
    api.Ks(t, t.cp.zone, t.cp.x, t.cp.y),
    api.ne(
      t,
      t.f._plankReset
        ? "Deski liczymy od nowa. Leżą na zachodniej drodze, zaraz za wsią. Kamila tylko podpisuje."
        : t.f._bridgeBack
          ? "Kładki nie ma, dopóki Kamila nie podpisze. Jesteś w wiosce. Deski są zaraz za wsią, na zachodzie."
          : "Wczytano zapis. Witaj z powrotem, " + t.look.name + "!",
      3.4,
    ),
    delete t.f._bridgeBack,
    delete t.f._plankReset,
    t
  );
};

api.Ls = function Ls() {
  if (api.ji !== null) return api.ji;
  try {
    (window.localStorage.setItem("__gry_t", "1"),
      window.localStorage.removeItem("__gry_t"),
      (api.ji = !0));
  } catch {
    api.ji = !1;
  }
  return api.ji;
};

api.fe = function fe(e) {
  let t = JSON.stringify(api.Lp(e));
  if (((api._f = t), api.Ls()))
    try {
      window.localStorage.setItem(api.Kf, t);
    } catch {
      api.ji = !1;
    }
};

api.op = function op() {
  if (api.Ls())
    try {
      let e = window.localStorage.getItem(api.Kf);
      if (e) return e;
    } catch {
      api.ji = !1;
    }
  return api._f;
};

api.rp = function rp() {
  if (((api._f = null), api.Ls()))
    try {
      window.localStorage.removeItem(api.Kf);
    } catch {
      api.ji = !1;
    }
};

api.Kp = function Kp(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++) ((t ^= e.charCodeAt(n)), (t = Math.imul(t, 16777619)));
  return (t >>> 0).toString(36);
};

api.Hk = function Hk(e) {
  let t = JSON.stringify(e);
  return "GRZ2-" + btoa(unescape(encodeURIComponent(t))) + "-" + api.Kp(t);
};

api.Ve = function Ve(e, t, n) {
  return typeof e == "number" && isFinite(e) && e >= t && e <= n;
};

api.Op = function Op(e) {
  if (!e || typeof e != "object") return "Brak danych.";
  let t = e;
  return t.v !== 2
    ? "Nieznana wersja zapisu."
    : !t.look ||
        typeof t.look.name != "string" ||
        !(t.look.cls in api.et) ||
        !api.Ve(t.look.hair, 0, api.gp.length - 1) ||
        !api.Ve(t.look.hairColor, 0, api.Of.length - 1) ||
        !api.Ve(t.look.outfit, 0, api.Sp.length - 1) ||
        !api.Ve(t.look.outfitColor, 0, api.If.length - 1) ||
        (t.look.skin !== void 0 && !api.Ve(t.look.skin, 0, api.Ts.length - 1))
      ? "Uszkodzony wygl\u0105d postaci."
      : !t.st ||
          !api.Ve(t.st.str, 0, 999) ||
          !api.Ve(t.st.vit, 0, 999) ||
          !api.Ve(t.st.dex, 0, 999) ||
          !api.Ve(t.st.mnd, 0, 999)
        ? "Uszkodzone statystyki."
        : !api.Ve(t.lvl, 1, 999) ||
            !api.Ve(t.xp, 0, 99999) ||
            !api.Ve(t.pts, 0, 999) ||
            !api.Ve(t.coins, 0, 999999) ||
            !api.Ve(t.bonusHp, 0, 99) ||
            !api.Ve(t.bonusMp, 0, 99)
          ? "Uszkodzone liczby."
          : !Array.isArray(t.weapons) ||
              !t.weapons.length ||
              !t.weapons.every((n) => api.Cf.indexOf(n) >= 0) ||
              t.weapons.indexOf(t.weapon) < 0
            ? "Uszkodzona bro\u0144."
            : !t.cp ||
                !api.Ve(t.cp.zone, 0, Math.max(30, api.qe.length - 1)) ||
                !api.Ve(t.cp.x, 0, 2e3) ||
                !api.Ve(t.cp.y, 0, 2e3)
              ? "Uzkodzony punkt powrotu."
              : !t.skills ||
                  !["dash", "spin", "fire", "ward"].every((n) => api.Ve(t.skills[n], 0, 3))
                ? "Uszkodzone umiej\u0119tno\u015Bci."
                : typeof t.f != "object" ||
                    typeof t.cut != "object" ||
                    typeof t.seen != "object" ||
                    !t.settings
                  ? "Uszkodzone flagi."
                  : !api.Ve(t.bossHp, 0, 60) || !api.Ve(t.time, 0, 1e7)
                    ? "Uszkodzony stan."
                    : t;
};

api.Bk = function Bk(e) {
  let n = e.trim().split("-");
  if (n.length !== 3 || n[0] !== "GRZ2") return "To nie jest kod zapisu Gryzeldy.";
  let i = "";
  try {
    i = decodeURIComponent(escape(atob(n[1])));
  } catch {
    return "Kod jest uszkodzony (base64).";
  }
  if (api.Kp(i) !== n[2]) return "Suma kontrolna si\u0119 nie zgadza.";
  try {
    return api.Op(JSON.parse(i));
  } catch {
    return "Nie da si\u0119 odczyta\u0107 danych.";
  }
};

api.ne = function ne(e, t, n = 2.8) {
  ((e.msg = t), (e.msgT = n));
};

api.se = function se(e, t, n, i, a, r = 60, s = 0.5, u = 0) {
  if (!(e.parts.length > 350))
    for (let f = 0; f < a; f++) {
      let c = Math.random() * Math.PI * 2,
        y = r * (0.3 + Math.random() * 0.7);
      e.parts.push({
        x: t,
        y: n,
        vx: Math.cos(c) * y,
        vy: Math.sin(c) * y,
        life: s * (0.6 + Math.random() * 0.4),
        max: s,
        col: i,
        s: Math.random() < 0.5 ? 1 : 2,
        g: u,
      });
    }
};

api.Ne = function Ne(e, t, n, i, a) {
  e.texts.push({ x: t, y: n, txt: i, col: a, life: 0.8 });
};

api.Ct = function Ct(e, t, n, i = -1, a = -1) {
  ((e.zt = t), (e.zT = n), (e.zfx = i), (e.zfy = a));
};

api.Bt = function Bt(e, t) {
  e.settings.shake && (e.shake = Math.max(e.shake, t));
};

api.G = function G(e, t) {
  e.sq.length < 12 && e.sq.push(t);
};
