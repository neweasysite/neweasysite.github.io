// @ts-nocheck
/* Obrażenia, unik, doświadczenie i łup.
   Nazwy wewnętrzne zostały po minifikacji — logika jest ta sama co w oryginalnej paczce. */
import { api } from "../runtime/api.js";

api.gi = function gi(e, t, n, i, a) {
  if (t.inv > 0.05) return;
  let r = api.Vo(e.lvl, t.lvl);
  if (Math.random() > api.$k(e, t.lvl)) {
    (api.Ne(e, t.x, t.y - 14, "pud\u0142o", "#9aa0b0"), api.G(e, "swing"));
    return;
  }
  if (e.f && e.f.sygnetOn) {
    ((t.hp = 0),
      (t.inv = 0.28),
      api.Ne(e, t.x, t.y - 14, "koniec", "#e0b060"),
      api.se(e, t.x, t.y, "#e0b060", 16, 80, 0.45),
      api.G(e, "crit"),
      api.ph(e, t));
    return;
  }
  let s = n * api.Vk(r);
  (r >= 3 &&
    t.kind !== "nest" &&
    Math.random() < Math.min(0.45, 0.12 + r * 0.04) &&
    ((s *= 0.25), api.Ne(e, t.x, t.y - 18, "stra\u017C!", "#a8c4ff"), api.G(e, "block")),
    t.kind === "shield" &&
      e.weapon !== "eskalacja" &&
      !e.f.rootEdge &&
      i * (e.px - t.x) + a * (e.py - t.y) > 0 &&
      ((s *= 0.3), api.Ne(e, t.x, t.y - 18, "blok!", "#a8c4ff")),
    e.skills.fury >= 2 && (s *= 1.08));
  let u = Math.random() < api.Wf(e),
    f = Math.max(0, Math.round(s * (u ? 2 : 1) * 10) / 10);
  ((t.hp -= f), (t.inv = 0.28), (t.poise -= api.Jk(e) * (u ? 1.4 : 1)));
  let c = t.kind !== "king" && t.kind !== "nest" && t.kind !== "golem" && t.kind !== "lich" && t.kind !== "audit" && t.kind !== "phantom" && t.kind !== "morok",
    y = api.vt(0.25 + r * 0.08, 0.15, 0.95);
  if (c && t.poise <= 0) {
    let w = api.vt(55 - Math.max(0, r) * 10 + (r < 0 ? 15 : 0), 22, 70);
    ((t.vx = i * w),
      (t.vy = a * w),
      (t.poise = t.poiseMax),
      api.Ne(e, t.x, t.y - 22, "wytr\u0105cenie", "#ffd84a"));
  } else c && r <= -2 ? ((t.vx = i * 28), (t.vy = a * 28)) : c && ((t.vx *= y), (t.vy *= y));
  if (
    (r >= 4 &&
      Math.random() < 0.18 &&
      (api.Oa(e, api.Ka(e, t.lvl, 1), t.x, t.y), api.Ne(e, e.px, e.py - 18, "kontra!", "#ff9a3c")),
    api.Ne(e, t.x, t.y - 12, (u ? "!" : "") + f, u ? "#ffd84a" : "#ffffff"),
    api.se(e, t.x, t.y, u ? "#ffd84a" : "#ffffff", u ? 10 : 5, 70, 0.3),
    api.G(e, u ? "crit" : "hit"),
    t.kind === "king" && !t.split && t.hp <= t.maxHp / 2)
  ) {
    t.split = !0;
    for (let w = 0; w < 2; w++) e.enemies.push(api.Pi(e, "slime", t.x + (w ? 16 : -16), t.y));
    api.ne(e, "Kr\xF3l Glut\xF3w si\u0119 dzieli! Bez paniki.", 2);
  }
  t.hp <= 0 && api.ph(e, t);
};

api.ph = function ph(e, t) {
  ((t.alive = !1), e.kills++);
  t.key === "clip:glut" &&
    !e.f.blystka &&
    ((e.f.blystka = !0),
    (e.dirty = !0),
    api.ne(e, "Błystka bojowa. Ten sam haczyk, tylko celujesz w potwora.", 3.2));
  let n =
      t.kind === "slime"
        ? 3
        : t.kind === "gold"
          ? 8
          : t.kind === "bat"
            ? 4
            : t.kind === "spam"
              ? 6
              : t.kind === "nest"
                ? 10
                : t.kind === "ticket"
                  ? 8
                  : t.kind === "charger"
                    ? 10
                    : t.kind === "shield"
                      ? 12
                      : t.kind === "phone"
                        ? 11
                        : t.kind === "zombie"
                          ? 9
                          : t.kind === "spider"
                            ? 12
                            : t.kind === "rat"
                              ? 2
                              : t.kind === "snake"
                                ? 5
                                : t.kind === "golem"
                                  ? 50
                                  : t.kind === "phantom"
                                    ? 45
                                    : t.kind === "lich"
                                      ? 80
                                      : t.kind === "morok"
                                        ? 140
                                        : 35,
    i = api.Vo(e.lvl, t.lvl),
    a = Math.round(n * api.qk(i));
  if (t.farm || (t.key && (e.f["rk:" + t.key] || 0) > 1)) {
    let r = (t.key && e.f["rk:" + t.key]) || 1,
      s = r <= 1 ? 4 : r === 2 ? 10 : 25;
    ((a = Math.max(0, Math.floor(a / s))), r >= 3 && (a = 0));
  }
  if (
    (i <= -5 && (a = Math.min(a, Math.random() < 0.3 ? 1 : 0)),
    api.se(
      e,
      t.x,
      t.y,
      t.kind === "gold"
        ? "#ffd84a"
        : t.kind === "bat" || t.kind === "phantom"
          ? "#9b6bd1"
          : t.kind === "spam" || t.kind === "nest" || t.kind === "ticket"
            ? "#ffffff"
            : t.kind === "zombie" || t.kind === "lich"
              ? "#6adf6a"
              : t.kind === "golem"
                ? "#c9a676"
                : "#5fe08a",
      t.kind === "king" || t.kind === "golem" || t.kind === "phantom" || t.kind === "lich"
        ? 60
        : 16,
      t.kind === "king" || t.kind === "golem" || t.kind === "phantom" || t.kind === "lich"
        ? 120
        : 70,
      0.6,
    ),
    (e.hitstop = t.kind === "king" ? 0.2 : 0.035),
    api.Bt(e, t.kind === "king" ? 6 : 1.5),
    api.G(e, t.kind === "king" ? "boom" : "kill"),
    a > 0
      ? api.Ne(e, t.x, t.y - 12, "+" + a + " XP", "#7ff7ff")
      : api.Ne(e, t.x, t.y - 12, "0 XP", "#9aa0b0"),
    t.key)
  ) {
    let r = !e.cut[t.key];
    if (
      ((e.cut[t.key] = !0),
      (e.dirty = !0),
      t.key.indexOf("sp:") === 0 || t.key.indexOf("nest:") === 0)
    ) {
      let s = (e.f["rk:" + t.key] || 0) + (r ? 1 : 0);
      ((e.f["rk:" + t.key] = Math.max(s, (e.f["rk:" + t.key] || 0) + 1)),
        api.Ip.has(t.key) &&
          !api.Wp(e.zone) &&
          (e.f["rt:" + t.key] = e.time + api.Yk * (1 + Math.min(4, e.f["rk:" + t.key] - 1))));
    }
    t.kind === "nest" &&
      api.ne(
        e,
        e.zone === 8
          ? "Gniazdo w piwnicy zniszczone (" +
              api.Rs(e) +
              "/2)." +
              (api.Rs(e) >= 2 ? " Wr\xF3\u0107 do Mietka!" : "")
          : "Gniazdo spamu zniszczone (" + api.Ds(e) + "/3).",
        2.6,
      );
  }
  if (
    (api.sh(e, t.kind, t.elite),
    t.elite &&
      (api.Es(e, 25 + t.lvl * 4),
      api.ne(e, t.elite + " pokonany! Elitarny przeciwnik, elitarna satysfakcja.", 2.6)),
    t.kind === "king" &&
      ((e.f.king = !0),
      (e.dirty = !0),
      e.items.push({ kind: "seal", x: t.x, y: t.y, v: 0, id: "seal", taken: !1 }),
      api.ne(
        e,
        "Kr\xF3l Glut\xF3w rozla\u0142 si\u0119 na dobre! W ka\u0142u\u017Cy co\u015B b\u0142yszczy...",
        3.5,
      ),
      api.Ct(e, 1.4, 1.3, t.x, t.y)),
    t.kind === "golem" &&
      ((e.f.golem = !0),
      (e.dirty = !0),
      e.items.push({ kind: "manifest", x: t.x, y: t.y, v: 0, id: "manifest", taken: !1 }),
      api.ne(
        e,
        "Golem Paczek rozsypa\u0142 si\u0119 na etykiety! Manifest le\u017Cy w gruzach.",
        3.5,
      ),
      api.Ct(e, 1.4, 1.3, t.x, t.y)),
    t.kind === "phantom" &&
      ((e.f.phantom = !0),
      (e.dirty = !0),
      e.items.push({ kind: "badge", x: t.x, y: t.y, v: 0, id: "badge", taken: !1 }),
      api.ne(e, "Upi\xF3r Hold Music ucich\u0142. Zosta\u0142a tylko Odznaka Eskalacji.", 3.5),
      api.Ct(e, 1.4, 1.3, t.x, t.y)),
    t.kind === "lich" &&
      (e.zone === 25
        ? ((e.f.kozacki = !0),
          (e.f.lich = !0),
          (e.dirty = !0),
          e.items.push({ kind: "root", x: t.x, y: t.y, v: 0, id: "root", taken: !1 }),
          api.ne(
            e,
            "Kozacki Root pokonany! Token Root Access jest tw\xF3j. Wr\xF3\u0107 do Kryszta\u0142u w Serwerowni.",
            4,
          ),
          api.Ct(e, 1.5, 1.5, t.x, t.y),
          api.G(e, "win"))
        : ((e.f.lich = !0),
          (e.win = !0),
          (e.dirty = !0),
          api.ne(
            e,
            "Lichwa Lidia upad\u0142a \u2014 ale to nie by\u0142 koniec. Serce Kolejki bije dalej. Twist: Lidia by\u0142a tylko eskalacj\u0105. Wejd\u017A na po\u0142udnie sali!",
            4.5,
          ),
          api.Ct(e, 1.4, 1.3, t.x, t.y),
          api.G(e, "win"))),
    t.kind === "audit" &&
      ((e.f.audit = !0),
      (e.dirty = !0),
      (e.coins += 40),
      api.ne(
        e,
        "AUDYT-BOT z\u0142o\u017Cony do akt. Archiwistka Roma chce protok\xF3\u0142 zamkni\u0119cia.",
        4,
      ),
      api.Ct(e, 1.5, 1.4, t.x, t.y),
      api.se(e, t.x, t.y, "#7ff7ff", 40, 110, 1),
      api.Es(e, 100),
      api.G(e, "boom")),
    t.kind === "morok" &&
      !e.f.morok &&
      ((e.f.morok = !0),
      (e.f.sygnet = !0),
      (e.f.sygnetOn = !0),
      (e.dirty = !0),
      e.weapons.indexOf("zaglada") < 0 && e.weapons.push("zaglada"),
      (e.weapon = "zaglada"),
      (e.coins += 80),
      (e.pts += 2),
      api.markHeirloom(),
      api.Es(e, 120),
      api.ne(
        e,
        "Morok zamyka ostatnią teczkę i pada. Miecz Zagłady jest twój. Sygnet Jednego Ciosu zostaje na palcu — i w następnej nowej grze też. Założony sygnet kończy każdego mobka jednym trafieniem.",
        5.5,
      ),
      api.Ct(e, 1.55, 1.6, t.x, t.y),
      api.se(e, t.x, t.y, "#e0b060", 48, 120, 1),
      api.G(e, "win")),
    t.kind === "gold")
  ) {
    for (let r = 0; r < 15; r++)
      e.items.push({
        kind: "coin",
        x: t.x + (Math.random() - 0.5) * 24,
        y: t.y + (Math.random() - 0.5) * 24,
        v: 1,
        id: "",
        taken: !1,
      });
    api.ne(e, "Z\u0142oty Glut! Deszcz groszy!", 2.2);
  } else
    t.kind !== "king" &&
      t.kind !== "golem" &&
      t.kind !== "phantom" &&
      t.kind !== "lich" &&
      t.kind !== "audit" &&
      t.kind !== "morok" &&
      (!t.farm || Math.random() < 0.35) &&
      api.Rf(e, t.x, t.y);
  api.Es(e, a);
};

api.Ps = function Ps(e, t) {
  let n = e.boss;
  if (!n || e.f.boss || !n.awake) return;
  let i = Math.random() < api.Wf(e),
    a = e.f && e.f.sygnetOn ? n.hp : Math.round(t * (i ? 2 : 1) * 10) / 10;
  ((n.hp -= a),
    (n.inv = 0.25),
    (e.bossHp = Math.max(1, n.hp)),
    api.G(e, "hit"),
    api.Ne(
      e,
      n.x,
      n.y - 22,
      e.f && e.f.sygnetOn ? "koniec" : (i ? "!" : "") + a,
      e.f && e.f.sygnetOn ? "#e0b060" : i ? "#ffd84a" : "#ffffff",
    ),
    api.se(e, n.x, n.y, "#ffffff", 6, 60, 0.3),
    n.hp <= 0 &&
      ((e.f.boss = !0),
      (e.dirty = !0),
      (e.eshots = []),
      (e.hitstop = 0.3),
      api.Bt(e, 9),
      api.G(e, "boom"),
      api.se(e, n.x, n.y, "#5cf28a", 70, 140, 1.1),
      api.se(e, n.x, n.y, "#ffd84a", 50, 100, 1.1),
      api.ne(e, "SUPPORT-BOT 3000: Zg\u0142oszenie... zamkni\u0119te... jako rozwi\u0105zane.", 4),
      api.Ct(e, 1.5, 1.8, n.x, n.y),
      api.Es(e, 80),
      e.items.push({
        kind: "crystal",
        x: api.Y(api.Pn.x),
        y: api.Y(api.Pn.y),
        v: 0,
        id: "",
        taken: !1,
      })));
};

api.Uf = function Uf(e) {
  let t = e.enemies.filter((n) => n.alive).map((n) => ({ x: n.x, y: n.y, e: n }));
  return (e.boss && !e.f.boss && e.boss.awake && t.push({ x: e.boss.x, y: e.boss.y, e: null }), t);
};

api.Zi = function Zi(e, t) {
  if (e.settings.autoAim) {
    let n = null,
      i = t;
    for (let a of api.Uf(e)) {
      let r = a.x - e.px,
        s = a.y - e.py,
        u = Math.hypot(r, s);
      u < i && (r * e.fx + s * e.fy) / (u || 1) > 0.1 && ((i = u), (n = a));
    }
    if (n) {
      let a = n.x - e.px,
        r = n.y - e.py,
        s = Math.hypot(a, r) || 1;
      return { x: a / s, y: r / s };
    }
  }
  return { x: e.fx, y: e.fy };
};

api.Oa = function Oa(e, t, n, i) {
  if (e.god && e.god.imm) return;
  if (e.inv > 0 || e.dashT > 0 || e.win || e.dead) return;
  if (e.ward > 0) {
    (e.ward--,
      (e.inv = 0.5),
      api.se(e, e.px, e.py, "#9fd8ff", 16, 70, 0.4),
      api.Ne(e, e.px, e.py - 16, "blok", "#9fd8ff"),
      api.G(e, "block"));
    return;
  }
  if (api.scarfAbsorb && api.scarfAbsorb(e)) {
    ((e.inv = 0.45),
      api.Ne(e, e.px, e.py - 16, "wełna", "#f4efe6"),
      api.se(e, e.px, e.py, "#f4efe6", 8, 30, 0.3),
      api.G(e, "block"));
    return;
  }
  ((e.hp -= t),
    (e.inv = 1),
    api.Bt(e, 3),
    api.Ne(e, e.px, e.py - 16, "-" + t, "#ff6b6b"),
    (e.hitstop = 0.05),
    api.se(e, e.px, e.py, "#ff6b6b", 10, 60, 0.4),
    api.G(e, "hurt"));
  let a = e.px - n,
    r = e.py - i,
    s = Math.hypot(a, r) || 1,
    u = { x: e.px, y: e.py };
  for (let f = 0; f < 6; f++) api.Ye(e, u, (a / s) * 2.5, (r / s) * 2.5, 5);
  ((e.px = u.x), (e.py = u.y), e.hp <= 0 && ((e.hp = 0), (e.dead = !0)));
};

api.Mi = function Mi(e, t) {
  let n = e.st,
    i = 0;
  return (
    t === "spinacz"
      ? (i = 0)
      : t === "miecz" || t === "eskalacja"
      ? (i = 1 + n.str * 0.55)
      : t === "zaglada"
        ? (i = (3 + n.str * 0.8) * 2.1)
        : t === "luk"
        ? (i = 1 + n.str * 0.35 + n.dex * 0.3)
        : t === "kusza"
          ? (i = (2 + n.str * 0.5 + n.dex * 0.4) * 1.5)
          : t === "iskry"
            ? (i = 1 + n.mnd * 0.6)
            : (i = 1.5 + n.mnd * 0.7),
    api.jn[t].aff === e.look.cls && (i *= 1.2),
    (t === "miecz" || t === "eskalacja" || t === "zaglada") && e.spec === "berserk" && (i *= 1.3),
    t === "eskalacja" && (i *= 1.35),
    (t === "luk" || t === "kusza") && e.spec === "snajper" && (i *= 1.15),
    (i *= 1 + 0.15 * api.Dp(e)),
    e.buf.ekspres > 0 && (i *= 2),
    i
  );
};

api.Pi = function Pi(e, t, n, i, a = "") {
  let s =
      Math.round(
        (t === "slime"
          ? 3
          : t === "gold"
            ? 4
            : t === "bat"
              ? 2
              : t === "spam"
                ? 5
                : t === "nest"
                  ? 9
                  : t === "ticket"
                    ? 6
                    : t === "charger"
                      ? 8
                      : t === "shield"
                        ? 10
                        : t === "phone"
                          ? 7
                          : t === "zombie"
                            ? 9
                            : t === "spider"
                              ? 8
                              : t === "rat"
                                ? 2
                                : t === "snake"
                                  ? 4
                                  : t === "golem"
                                    ? 40
                                    : t === "phantom"
                                      ? 36
                                      : t === "lich"
                                        ? 55
                                        : t === "audit"
                                          ? 70
                                          : t === "morok"
                                            ? 64
                                            : 30) *
          (t === "king" ? 1 : api.Fk[e.zone]) *
          10,
      ) / 10,
    u = api.Zk(e.zone, t),
    f =
      Math.round(
        (4 + u * 1.6 + (t === "shield" || t === "golem" || t === "lich" || t === "king" || t === "audit" || t === "morok" ? 10 : 0)) *
          10,
      ) / 10;
  return {
    farm: !1,
    uid: api.Wk++,
    kind: t,
    x: n,
    y: i,
    vx: 0,
    vy: 0,
    hp: s,
    maxHp: s,
    t: Math.random() * 2,
    inv: 0,
    alive: !0,
    cd: 1 + Math.random() * 1.5,
    z: 0,
    split: !1,
    hitId: -1,
    key: a,
    lvl: u,
    poise: f,
    poiseMax: f,
  };
};

api.$k = function $k(e, t) {
  let n = api.Vo(e.lvl, t),
    i = Math.min(0.18, e.st.dex * 0.012);
  return api.vt(0.82 - n * 0.055 + i, 0.18, 0.97);
};

api.Vk = function Vk(e) {
  return e <= -8
    ? 1.55
    : e <= -4
      ? 1.3
      : e <= -1
        ? 1.1
        : e <= 1
          ? 1
          : e <= 3
            ? 0.75
            : e <= 5
              ? 0.5
              : e <= 8
                ? 0.28
                : 0.12;
};

api.Ka = function Ka(e, t, n) {
  let i = api.Vo(e.lvl, t),
    a = 1;
  i <= -10
    ? (a = 0.05)
    : i <= -6
      ? (a = 0.2)
      : i <= -3
        ? (a = 0.45)
        : i <= 0
          ? (a = 0.75)
          : i <= 2
            ? (a = 1)
            : i <= 4
              ? (a = 1.35)
              : i <= 7
                ? (a = 1.8)
                : (a = 2.4);
  let r = 1 / (1 + e.st.vit * 0.04),
    s = n * a * r;
  return i <= -10 ? (Math.random() < 0.35 ? 1 : 0) : Math.max(0, Math.round(s * 10) / 10);
};

api.qk = function qk(e) {
  return e <= -8
    ? 0.05
    : e <= -5
      ? 0.12
      : e <= -3
        ? 0.4
        : e <= -1
          ? 0.7
          : e <= 1
            ? 1
            : e <= 3
              ? 1.25
              : e <= 5
                ? 1.5
                : 1.8;
};

api.Jk = function Jk(e) {
  return 8 + e.st.str * 2.2 + (e.spec === "berserk" ? 4 : 0);
};

api.Xk = function Xk(e) {
  let t = e.bossHp;
  return t > 30 ? 60 : t > 15 ? 30 : 15;
};

api.Wp = function Wp(e) {
  return (e >= 6 && e <= 8) || (e >= 16 && e <= 23) || e === 30 || e >= 31;
};

api.Vo = function Vo(e, t) {
  return t - e;
};

api.Qk = function Qk(e) {
  return e <= -5
    ? "#9aa0b0"
    : e <= -2
      ? "#5cf28a"
      : e <= 1
        ? "#ffd84a"
        : e <= 4
          ? "#ff9a3c"
          : "#ff4d6d";
};
