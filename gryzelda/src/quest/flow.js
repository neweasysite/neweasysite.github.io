// @ts-nocheck
/* Dziennik, dialogi danych i postęp zadań.
   Nazwy wewnętrzne zostały po minifikacji — logika jest ta sama co w oryginalnej paczce. */
import { api } from "../runtime/api.js";

api.Zo = function Zo(e) {
  let t = e.f;
  if (!t.bogdan)
    return { text: "Porozmawiaj z mistrzem Bogdanem w Wiosce.", zone: 0, x: 20, y: 14 };
  if (!t.cellarDone) {
    if (!t.cellarQ)
      return {
        text: "Zajrzyj do karczmy \u201EPod Pe\u0142n\u0105 Kolejk\u0105\u201D (du\u017Ce drzwi na p\xF3\u0142nocny wsch\xF3d od placu) i pogadaj z Mietkiem.",
        zone: 6,
        x: 8,
        y: 3,
      };
    let n = api.qe[8].spawns.filter(
      (i) => i[0] === "nest" && !e.cut["nest:8:" + i[1] + ":" + i[2]],
    );
    return n.length
      ? {
          text:
            "Piwnica karczmy (klapa w rogu sali): zniszcz gniazda spamu " + (2 - n.length) + "/2.",
          zone: 8,
          x: n[0][1],
          y: n[0][2],
        }
      : { text: "Piwnica czysta! Wr\xF3\u0107 do Mietka po nagrod\u0119.", zone: 6, x: 8, y: 3 };
  }
  return t.king
    ? t.seal
      ? t.lever1
        ? t.plate
          ? t.gate
            ? t.key
              ? t.door
                ? t.boss
                  ? t.won
                    ? t.act2
                      ? t.westKey
                        ? t.southKey
                          ? t.rootTok
                            ? t.root
                              ? e.f.audit
                                ? e.f["sqd:rom1"]
                                  ? {
                                      text: "Kolejka zamkni\u0119ta urz\u0119dowo. Sekret\xF3w jeszcze troch\u0119 zosta\u0142o.",
                                      zone: -1,
                                      x: 0,
                                      y: 0,
                                    }
                                  : {
                                      text: "Audyt pad\u0142. Oddaj protok\xF3\u0142 zamkni\u0119cia Archiwistce Romie.",
                                      zone: 37,
                                      x: 4,
                                      y: 4,
                                    }
                                : {
                                    text: "Root przyj\u0119ty. Na wschodzie Serwerowni otworzy\u0142o si\u0119 Archiwum Milczenia \u2014 pokonaj AUDYT-BOTA.",
                                    zone: 37,
                                    x: 16,
                                    y: 6,
                                  }
                              : {
                                  text: "U\u017Cyj Tokenu Root na Krysztale \u2014 tylko wtedy \u015Bwiat b\u0119dzie uratowany.",
                                  zone: 5,
                                  x: api.Pn.x,
                                  y: api.Pn.y,
                                }
                            : t.undead
                              ? t.lich
                                ? t.kozacki
                                  ? {
                                      text: "Podnie\u015B Token Root Access z Sali Kozackiego Roota.",
                                      zone: 25,
                                      x: 14,
                                      y: 8,
                                    }
                                  : t.ante
                                    ? {
                                        text: "Przedpok\xF3j Roota za tob\u0105. W Sali Kozackiego Roota doko\u0144cz robot\u0119.",
                                        zone: 25,
                                        x: 14,
                                        y: 8,
                                      }
                                    : t.maze
                                      ? {
                                          text: "Labirynt Firewalli: id\u017A wykut\u0105 \u015Bcie\u017Ck\u0105 na wsch\xF3d, do Przedpokoju Roota.",
                                          zone: 29,
                                          x: 11,
                                          y: 10,
                                        }
                                      : t.cem
                                        ? {
                                            text: "Cmentarzysko za tob\u0105. Wschodnia brama prowadzi do Labiryntu Firewalli.",
                                            zone: 28,
                                            x: 10,
                                            y: 14,
                                          }
                                        : {
                                            text: "Akt 3: z Sali Eskalacji na po\u0142udnie, przez Serce Kolejki, na Cmentarzysko Ticket\xF3w. Strza\u0142ka nie staje \u2014 prowadzi dalej.",
                                            zone: 26,
                                            x: 20,
                                            y: 12,
                                          }
                                : {
                                    text: "Akt 2: Sala Eskalacji \u2014 pokonaj Lichw\u0119 Lidi\u0119.",
                                    zone: 15,
                                    x: 16,
                                    y: 10,
                                  }
                              : {
                                  text: "Oba klucze masz! Wejd\u017A w portal V w Call Center Cieni.",
                                  zone: 12,
                                  x: 24,
                                  y: 18,
                                }
                          : t.southQ
                            ? t.phantom
                              ? {
                                  text: "Podnie\u015B Odznak\u0119 Eskalacji w Call Center.",
                                  zone: 12,
                                  x: 18,
                                  y: 10,
                                }
                              : {
                                  text: "Po\u0142udniowe Bagna \u2192 Call Center Cieni: ucisz Upi\xF3ra Hold Music.",
                                  zone: 12,
                                  x: 18,
                                  y: 10,
                                }
                            : {
                                text: "Pogadaj z Analityczk\u0105 Basi\u0105 przy po\u0142udniowej drodze Wioski.",
                                zone: 0,
                                x: 28,
                                y: 27,
                              }
                        : t.westQ
                          ? t.golem
                            ? {
                                text: "Podnie\u015B Manifest Paczek w Depocie.",
                                zone: 10,
                                x: 14,
                                y: 4,
                              }
                            : {
                                text: "Zachodnie Pola \u2192 Depot Zagubionych Paczek: pokonaj Golema Paczek.",
                                zone: 10,
                                x: 14,
                                y: 4,
                              }
                          : {
                              text: "Pogadaj z Naczelnikiem Piotrem na zachodnim skraju Wioski (droga w lewo).",
                              zone: 0,
                              x: 6,
                              y: 18,
                            }
                      : {
                          text: "Kryszta\u0142 da\u0142 tylko tymczasow\u0105 odpowied\u017A. Wr\xF3\u0107 do Bogdana w Wiosce.",
                          zone: 0,
                          x: 20,
                          y: 14,
                        }
                    : {
                        text: "Dotknij Kryszta\u0142u Odpowiedzi.",
                        zone: 5,
                        x: api.Pn.x,
                        y: api.Pn.y,
                      }
                  : {
                      text: "Serwerownia: pokonaj SUPPORT-BOTA 3000.",
                      zone: 5,
                      x: api._a.x,
                      y: api._a.y,
                    }
                : {
                    text: "Otw\xF3rz Kluczem Eskalacji drzwi na wschodzie holu.",
                    zone: 4,
                    x: 37,
                    y: 19,
                  }
              : {
                  text: "Krata otwarta! We\u017A Klucz Eskalacji z wn\u0119ki.",
                  zone: 4,
                  x: 27,
                  y: 1,
                }
            : {
                text: "Sala Kryszta\u0142\xF3w: zapal 3 kryszta\u0142y w ci\u0105gu 12 sekund.",
                zone: 4,
                x: 27,
                y: 11,
              }
          : {
              text: "Zachodnie skrzyd\u0142o Ruin: dopchnij kamienny blok na p\u0142yt\u0119 (popychaj go od g\xF3ry).",
              zone: 4,
              x: 9,
              y: 22,
            }
        : {
            text: "Wr\xF3\u0107 do Wioski, przejd\u017A p\xF3\u0142nocn\u0105 bram\u0105 do Ruin i poci\u0105gnij d\u017Awigni\u0119 w sali wej\u015Bciowej.",
            zone: 4,
            x: 31,
            y: 32,
          }
      : {
          text: "Podnie\u015B Piecz\u0119\u0107 Lasu z polany Kr\xF3la Glut\xF3w.",
          zone: 2,
          x: 31,
          y: 30,
        }
    : {
        text: "Id\u017A na wsch\xF3d przez \u0141\u0105k\u0119 do Lasu Szept\xF3w i pokonaj Kr\xF3la Glut\xF3w na polanie.",
        zone: 2,
        x: 31,
        y: 30,
      };
};

api.ch = function ch(e, t) {
  if (e === t) return null;
  let n = { [e]: null },
    i = [e];
  for (; i.length;) {
    let s = i.shift();
    for (let u of api.qe[s].exits) u.to in n || ((n[u.to] = { z: s, e: u }), i.push(u.to));
  }
  if (!(t in n)) return null;
  let a = t,
    r = n[a];
  for (; r && r.z !== e;) ((a = r.z), (r = n[a]));
  return r ? r.e : null;
};

api.npcTile = function npcTile(id) {
  if (!api.qe) return null;
  for (let z of api.qe) {
    if (!z || !z.npcs) continue;
    for (let n of z.npcs) if (n.id === id) return { zone: z.id, x: n.tx, y: n.ty };
  }
  return null;
};

function navTile(zone, x, y, text) {
  return { text, zone, x, y };
}

function navNpc(id, text) {
  let n = api.npcTile(id);
  return n ? { text, zone: n.zone, x: n.x, y: n.y } : null;
}

api.navFlags = [
  {
    id: "cat",
    active: (e) => !!e.f.catQ && !e.f.catDone,
    title: () => "Babcia Jadzia: Mruczek",
    detail: (e) => (e.f.cat ? "odnieś kota Jadzi" : "Łąka, krzaki za rzeką"),
    goal: (e) =>
      e.f.cat
        ? navNpc("jadzia", "Oddaj Mruczka Babci Jadzi.")
        : navTile(1, 59, 27, "Łąka Czekania: znajdź Mruczka za rzeką, na południowym wschodzie."),
  },
  {
    id: "nest",
    active: (e) => !!e.f.nestQ && !e.f.nestDone,
    title: () => "Myśliwy Zenek: gniazda spamu",
    detail: (e) =>
      api.Ds(e) >= 3 ? "wróć do Zenka" : "gniazda spamu " + api.Ds(e) + "/3",
    goal: (e) => {
      if (api.Ds(e) >= 3) return navNpc("zenek", "Gniazda czyste. Wróć do Myśliwego Zenka.");
      let left = api.qe[1].spawns.find(
        (t) => t[0] === "nest" && !e.cut["nest:1:" + t[1] + ":" + t[2]],
      );
      return left
        ? navTile(1, left[1], left[2], "Zniszcz gniazdo spamu (" + api.Ds(e) + "/3).")
        : navNpc("zenek", "Wróć do Myśliwego Zenka.");
    },
  },
  {
    id: "mush",
    active: (e) => !!e.f.mushQ && !e.f.mushDone,
    title: () => "Wiedźma Halina: grzyby",
    detail: (e) =>
      api.Ns(e) >= 5 ? "wróć do Haliny" : "świecące grzyby " + api.Ns(e) + "/5",
    goal: (e) => {
      if (api.Ns(e) >= 5) return navNpc("halina", "Masz grzyby. Wróć do Wiedźmy Haliny.");
      let left = api.qe[2].items.find((t) => t.kind === "grzyb" && !e.cut["item:" + t.id]);
      return left
        ? navTile(2, left.tx, left.ty, "Świecący grzyb w Lesie Szeptów (" + api.Ns(e) + "/5).")
        : navNpc("halina", "Wróć do Wiedźmy Haliny.");
    },
  },
  {
    id: "lute",
    active: (e) => !!e.f.luteQ && !e.f.luteDone,
    title: () => "Bard Zbyszek: lutnia",
    detail: (e) => (e.f.luteFound ? "odnieś lutnię Zbyszkowi" : "Ruiny, wschód holu"),
    goal: (e) =>
      e.f.luteFound
        ? navNpc("zbyszek", "Odnieś lutnię Bardowi Zbyszkowi.")
        : navTile(4, 46, 20, "Lutnia leży w Ruinach, za wschodnimi drzwiami holu."),
  },
  {
    id: "gear",
    active: (e) => !!e.f.gearQ && !e.f.gearDone,
    title: () => "Zegarmistrz Horacy: zębatka",
    detail: (e) => (e.f.gearFound ? "odnieś zębatkę Horacemu" : "strych Młyna na Łące"),
    goal: (e) =>
      e.f.gearFound
        ? navNpc("horacy", "Odnieś zębatkę Zegarmistrzowi Horacemu.")
        : navTile(33, 11, 2, "Zębatka leży na strychu Młyna."),
  },
  {
    id: "west",
    active: (e) => !!e.f.westQ && !e.f.westDone,
    title: () => "Naczelnik Piotr: Manifest",
    detail: (e) => (e.f.westKey ? "oddaj Manifest Piotrowi" : "Depot Zagubionych Paczek"),
    goal: (e) =>
      e.f.westKey
        ? navNpc("piotr", "Oddaj Manifest Paczek Naczelnikowi Piotrowi.")
        : navTile(10, 14, 4, "Depot: pokonaj Golema Paczek i podnieś Manifest."),
  },
  {
    id: "south",
    active: (e) => !!e.f.southQ && !e.f.southDone,
    title: () => "Analityczka Basia: Odznaka",
    detail: (e) => (e.f.southKey ? "oddaj Odznakę Basi" : "Call Center Cieni"),
    goal: (e) =>
      e.f.southKey
        ? navNpc("basia", "Oddaj Odznakę Eskalacji Analityczce Basi.")
        : navTile(12, 18, 10, "Call Center: ucisz Upióra Hold Music i podnieś Odznakę."),
  },
];

api.sqGoal = function sqGoal(e, t) {
  if (!e.f["sq:" + t.id] || e.f["sqd:" + t.id]) return null;
  let text = api.Gp(e, t) || t.name;
  if (api.Bf(e, t)) return navNpc(t.giver, text);
  let step = api.Ci(e, t);
  if (!step) return navNpc(t.giver, text);
  if (step.t === "item") return navTile(step.z, step.tx, step.ty, text);
  if (step.t === "kill") {
    let killed = e.f["sqk:" + t.id] || 0;
    if (e.zone === step.z && e.enemies) {
      let live = e.enemies.find(
        (n) =>
          n.hp > 0 &&
          (n.kind === step.kind || (step.kind === "slime" && n.kind === "gold")) &&
          (!step.elite || n.elite === step.elite),
      );
      if (live)
        return {
          text,
          zone: step.z,
          x: Math.max(0, Math.round((live.x - 8) / api.T)),
          y: Math.max(0, Math.round((live.y - 8) / api.T)),
        };
    }
    let spot = step.at && step.at[Math.min(killed, step.at.length - 1)];
    return spot ? navTile(step.z, spot[0], spot[1], text) : navNpc(t.giver, text);
  }
  if (step.t === "talk") return navNpc(step.to, text) || navNpc(t.giver, text);
  return navNpc(t.giver, text);
};

api.navChoices = function navChoices(e) {
  let main = api.Zo(e),
    list = [
      {
        id: "main",
        title: "Główny wątek",
        detail: main.text,
        done: main.zone < 0,
      },
    ];
  for (let flag of api.navFlags)
    flag.active(e) &&
      list.push({
        id: flag.id,
        title: flag.title(e),
        detail: flag.detail(e),
        done: !1,
      });
  for (let q of api.Qi || []) {
    if (!e.f["sq:" + q.id]) continue;
    let done = !!e.f["sqd:" + q.id];
    list.push({
      id: q.id,
      title: (api.Zn[q.giver] || q.giver) + ": " + q.name,
      detail: done ? "zrobione" : api.Gp(e, q),
      done,
    });
  }
  return list;
};

api.activeNav = function activeNav(e) {
  let id = e.nav || "main",
    live = api.navChoices(e).filter((c) => !c.done || c.id === "main");
  return live.some((c) => c.id === id) ? id : "main";
};

api.navTitle = function navTitle(e) {
  let id = api.activeNav(e),
    row = api.navChoices(e).find((c) => c.id === id);
  return row ? row.title : "Główny wątek";
};

api.navGoal = function navGoal(e) {
  let id = api.activeNav(e),
    next = id === "main" ? "" : id;
  if ((e.nav || "") !== next) ((e.nav = next), (e.dirty = !0));
  if (id !== "main") {
    let flag = api.navFlags.find((f) => f.id === id);
    if (flag) {
      let g = flag.goal(e);
      if (g && g.zone >= 0) return g;
    }
    let q = api.Os(id);
    if (q) {
      let g = api.sqGoal(e, q);
      if (g && g.zone >= 0) return g;
    }
  }
  return api.Zo(e);
};

api.pinNav = function pinNav(e, id, announce) {
  ((e.nav = !id || id === "main" ? "" : id), (e.dirty = !0));
  if (announce) api.ne(e, "Strzałka prowadzi: " + api.navTitle(e) + ".", 2.6);
};

api.Ff = function Ff(e) {
  let t = api.navGoal(e);
  if (t.zone < 0) return null;
  if (t.zone !== e.zone) {
    let n = api.ch(e.zone, t.zone);
    return n ? { x: ((n.x0 + n.x1) / 2) * api.T + 8, y: ((n.y0 + n.y1) / 2) * api.T + 8 } : null;
  }
  let n = t.x,
    i = t.y,
    a = api.qe[t.zone];
  if (a && api.Qo(e, api.Pe(e, t.zone, n, i))) {
    let r = null,
      s = 99;
    for (let u = -3; u <= 3; u++)
      for (let f = -3; f <= 3; f++) {
        if (!u && !f) continue;
        let c = n + f,
          y = i + u;
        if (c < 0 || y < 0 || c >= a.w || y >= a.h) continue;
        if (api.Qo(e, api.Pe(e, t.zone, c, y))) continue;
        let w = Math.abs(f) + Math.abs(u);
        w < s && ((s = w), (r = [c, y]));
      }
    r && ((n = r[0]), (i = r[1]));
  }
  return { x: api.Y(n), y: api.Y(i) };
};

api.Es = function Es(e, t) {
  for (e.xp += t; e.xp >= api.$o(e.lvl);) {
    ((e.xp -= api.$o(e.lvl)),
      e.lvl++,
      (e.pts += e.lvl % 5 === 0 ? 2 : 1),
      (e.hp = api.Ze(e)),
      (e.mp = api.ut(e)));
    let n = e.lvl % 5 === 0 ? 2 : 1;
    (api.ne(
      e,
      e.lvl === 5 && !e.spec
        ? "Poziom 5! Wybierz specjalizacj\u0119 w menu Posta\u0107."
        : "Poziom " + e.lvl + "! +" + n + " pkt w menu Posta\u0107.",
      3.4,
    ),
      api.se(e, e.px, e.py, "#ffd84a", 30, 90, 0.8),
      api.se(e, e.px, e.py, "#7ff7ff", 20, 50, 0.9),
      api.Ct(e, 1.2, 0.6),
      (e.dirty = !0),
      api.G(e, "level"));
  }
};

api.fh = function fh(e, t, n) {
  if (n.indexOf("sq:") === 0) return api.uh(e, t, n);
  let i = api.bp[t];
  if (!i) return null;
  let a = e.f["tk:" + t] || 0,
    r = [],
    s = [],
    u = e.look.name,
    f = (c) => {
      c.f["tk:" + t] = a + 1;
    };
  if (n === "") {
    (r.push(i[a % i.length]),
      t === "filip" &&
        !e.f["k:game"] &&
        r.push("Ej, a mam te\u017C tak\u0105 jedn\u0105 teori\u0119... Wielk\u0105!"));
    let c = api.Zp(e, t);
    (r.push(...c.lines),
      s.push(...c.opts),
      t === "filip" && !e.f["k:game"] && s.push({ label: "Jak\u0105 teori\u0119?", go: "game" }),
      s.push({ label: "Opowiedz co\u015B jeszcze", act: (y) => (f(y), "") }),
      s.push({
        label: "Na razie",
        end: !0,
        act: (y) => {
          f(y);
        },
      }));
  } else
    n === "game"
      ? (r.push(
          "\u017Be to wszystko to GRA! Kto\u015B ci\u0119 trzyma w telefonie i naciska guziki. Jak idziesz w lewo, to on kciukiem robi tak o. Wiesz, \u017Ce jeste\u015B w grze, a nie w prawdziwym \u015Bwiecie?",
        ),
        s.push({ label: "Bzdura, to prawdziwy \u015Bwiat!", go: "game2" }))
      : n === "game2"
        ? (r.push(
            u +
              ": \u201EBzdura. Gdyby to by\u0142a gra, mia\u0142abym zapis stanu, pasek zdrowia i pieni\u0105dze wypada\u0142yby z glut\xF3w... Chwila. Mam to wszystko.\u201D",
          ),
          r.push(
            "(" +
              u +
              " przez d\u0142u\u017Csz\u0105 chwil\u0119 patrzy w niebo. Niebo ma dziwnie r\xF3wne piksele.)",
          ),
          s.push({ label: "Niewa\u017Cne. Id\u0119 ratowa\u0107 \u015Bwiat.", go: "game3" }))
        : n === "game3" &&
          (r.push(
            "No widzisz! To pomachaj do niego! Nie, nie do mnie. Do ekranu! ...A jak ju\u017C ratujesz \u015Bwiat, to zapisz gr\u0119 przy kapliczce, bo m\xF3j tata zawsze zapomina.",
          ),
          s.push({
            label: "(macha nie\u015Bmia\u0142o)",
            act: (c) => ((c.f["k:game"] = !0), (c.dirty = !0), ""),
          }));
  return { lines: r, opts: s };
};

api.uh = function uh(e, t, n) {
  let [, i, a] = n.split(":"),
    r = api.Os(i),
    s = [],
    u = [];
  if (!r) return { lines: ["..."], opts: [{ label: "Wr\xF3\u0107", go: "" }] };
  let f = (c) => {
    ((c.f["sq:" + r.id] = !0),
      (c.nav = r.id),
      (c.dirty = !0),
      api.G(c, "item"),
      api.lh(c),
      api.ne(c, "Nowy wpis w Dzienniku: \u201E" + r.name + "\u201D. Strza\u0142ka tam prowadzi.", 3.2));
  };
  if (a === "offer")
    (s.push(r.offer),
      r.quiz && !r.steps.length
        ? u.push({ label: "Dawaj pytania!", act: (c) => (f(c), "sq:" + r.id + ":q0") })
        : u.push({ label: "Zajm\u0119 si\u0119 tym", act: (c) => (f(c), "sq:" + r.id + ":acc") }),
      u.push({ label: "Mo\u017Ce p\xF3\u017Aniej", go: "" }));
  else if (a === "acc") (s.push(r.accept), u.push({ label: "Wr\xF3\u0107 do rozmowy", go: "" }));
  else if (a === "to") {
    let c = api.Ci(e, r);
    c && c.t === "talk" && c.to === t
      ? (s.push(c.txt),
        u.push({
          label: c.ok || "Przeka\u017C\u0119",
          act: (y) => (api.G(y, "item"), api.Gf(y, r), ""),
        }))
      : (s.push("..."), u.push({ label: "Wr\xF3\u0107", go: "" }));
  } else if (a === "done") (s.push(r.done), u.push({ label: "Dzi\u0119ki!", go: "" }));
  else if (a === "bad")
    (s.push(r.wrong || "Nie."),
      u.push({ label: "Jeszcze raz", go: "sq:" + r.id + ":q0" }),
      u.push({ label: "P\xF3\u017Aniej", go: "" }));
  else if (a && a[0] === "q" && r.quiz) {
    let c = Number(a.slice(1)) || 0,
      y = r.quiz[c];
    (s.push(y.q),
      y.a.forEach((w, b) =>
        u.push(
          b !== y.ok
            ? { label: w, go: "sq:" + r.id + ":bad" }
            : c + 1 < r.quiz.length
              ? { label: w, go: "sq:" + r.id + ":q" + (c + 1) }
              : { label: w, act: (x) => (api.Fp(x, r), "sq:" + r.id + ":done") },
        ),
      ));
  }
  return { lines: s, opts: u };
};

api.dh = function dh(e, t) {
  return api.Qi.some((n) => {
    if (n.giver === t && (api.Hp(e, n) || api.Bf(e, n))) return !0;
    let i = api.Ci(e, n);
    return !!i && i.t === "talk" && i.to === t;
  });
};

api.Gp = function Gp(e, t) {
  if (e.f["sqd:" + t.id]) return "zrobione";
  if (api.Bf(e, t))
    return t.quiz
      ? "odpowiedz na pytania: " + api.Zn[t.giver]
      : "wr\xF3\u0107 do: " + api.Zn[t.giver];
  let n = api.Ci(e, t);
  if (!n) return "";
  let i = t.steps.length > 1 ? "krok " + (api.Aa(e, t) + 1) + "/" + t.steps.length + " \xB7 " : "";
  return n.t === "item"
    ? i + "szukaj: " + n.name + " \u2014 " + n.hint
    : n.t === "kill"
      ? i + ((e.f["sqk:" + t.id] || 0) + "/" + n.n) + " \xB7 " + n.hint
      : i + "id\u017A do: " + n.hint;
};

api.Gf = function Gf(e, t, n) {
  let i = api.Aa(e, t) + 1;
  ((e.f["sqs:" + t.id] = i), delete e.f["sqk:" + t.id], (e.dirty = !0));
  let a = t.steps[i];
  api.ne(
    e,
    (n ? n + " " : "") +
      (a
        ? "Dziennik: " + api.Gp(e, t)
        : "Dziennik: \u201E" +
          t.name +
          "\u201D \u2014 wr\xF3\u0107 do: " +
          api.Zn[t.giver] +
          "."),
    3.8,
  );
  if (
    a &&
    a.t === "item" &&
    a.z === e.zone &&
    !e.items.some((r) => r.kind === "qi" && r.id === t.id + ":" + i && !r.taken)
  )
    e.items.push({
      kind: "qi",
      x: api.Y(a.tx),
      y: api.Y(a.ty),
      v: 0,
      id: t.id + ":" + i,
      taken: !1,
    });
  api.lh(e);
};

api.rh = function rh(e, t) {
  let [n] = t.split(":"),
    i = api.Os(n),
    a = i && api.Ci(e, i);
  !i ||
    !a ||
    a.t !== "item" ||
    !api.Bp(e, t) ||
    (api.G(e, "item"), api.Gf(e, i, a.name + "! " + a.fin));
};

api.Fp = function Fp(e, t) {
  e.f["sqd:" + t.id] ||
    ((e.f["sqd:" + t.id] = !0),
    (e.coins += t.reward.c),
    t.reward.p && (e.pts += t.reward.p),
    api.Es(e, t.reward.xp),
    (e.dirty = !0),
    api.G(e, "chest"),
    api.se(e, e.px, e.py, "#ffd84a", 24, 70, 0.7),
    api.onQuestDone && api.onQuestDone(e, t),
    api.ne(
      e,
      "Dziennik: \u201E" +
        t.name +
        "\u201D uko\u0144czone! " +
        (t.reward.c ? "+" + t.reward.c + " gr, " : "") +
        "+" +
        t.reward.xp +
        " XP" +
        (t.reward.p ? ", +" + t.reward.p + " pkt" : ""),
      3.4,
    ));
};

api.questMatch = function questMatch(step, enemy) {
  return (
    !!enemy &&
    enemy.alive &&
    enemy.hp > 0 &&
    (enemy.kind === step.kind || (step.kind === "slime" && enemy.kind === "gold")) &&
    (!step.elite || enemy.elite === step.elite)
  );
};

api.questSpot = function questSpot(e, z, tx, ty) {
  let zone = api.qe[z],
    ok = (x, y) => {
      if (!zone || y < 1 || x < 1 || y >= zone.h - 1 || x >= zone.w - 1) return !1;
      let tile = api.Pe(e, z, x, y);
      if (
        api.Qo(e, tile) ||
        tile === "d" ||
        tile === "_" ||
        tile === "U" ||
        tile === "H" ||
        tile === "E"
      )
        return !1;
      return !e.enemies.some(
        (n) => n.alive && Math.abs(n.x - api.Y(x)) < 12 && Math.abs(n.y - api.Y(y)) < 12,
      );
    };
  if (ok(tx, ty)) return [tx, ty];
  for (let rad = 1; rad <= 6; rad++)
    for (let dy = -rad; dy <= rad; dy++)
      for (let dx = -rad; dx <= rad; dx++)
        if (Math.max(Math.abs(dx), Math.abs(dy)) === rad && ok(tx + dx, ty + dy))
          return [tx + dx, ty + dy];
  return [tx, ty];
};

api.Up = function Up(e, t, n) {
  let at = t.at[n % t.at.length],
    spot = api.questSpot(e, t.z, at[0], at[1]),
    i = api.Pi(e, t.kind, api.Y(spot[0]), api.Y(spot[1]), "");
  (t.elite &&
    ((i.hp = i.maxHp = Math.round(i.maxHp * 40) / 10),
    (i.lvl += 3),
    (i.poise = i.poiseMax = i.poiseMax * 2),
    (i.elite = t.elite)),
    e.enemies.push(i));
};

api.Zp = function Zp(e, t) {
  let n = [],
    i = [];
  for (let a of api.Qi) {
    a.giver === t &&
      (api.Hp(e, a)
        ? i.push({ label: a.ask, go: "sq:" + a.id + ":offer" })
        : api.Hf(e, a.id) &&
          (api.Bf(e, a)
            ? i.push(
                a.quiz
                  ? { label: a.turn, go: "sq:" + a.id + ":q0" }
                  : { label: a.turn, act: (s) => (api.Fp(s, a), "sq:" + a.id + ":done") },
              )
            : n.push(
                a.prog
                  .replace("{n}", String(e.f["sqk:" + a.id] || 0))
                  .replace("{s}", String(api.Aa(e, a))),
              )));
    let r = api.Ci(e, a);
    r && r.t === "talk" && r.to === t && i.push({ label: r.ask, go: "sq:" + a.id + ":to" });
  }
  return { lines: n, opts: i };
};

api.oh = function oh(e) {
  var a;
  let [t, n] = e.split(":"),
    i = (a = api.Os(t)) == null ? void 0 : a.steps[Number(n)];
  return i && i.t === "item" ? i.ic : t;
};

api.Hp = function Hp(e, t) {
  return (
    !e.f["sq:" + t.id] && (!t.after || !!e.f["sqd:" + t.after]) && (!t.gate || api._p(e, t.gate))
  );
};

api.Ci = function Ci(e, t) {
  return (api.Hf(e, t.id) && t.steps[api.Aa(e, t)]) || null;
};

api.Bf = function Bf(e, t) {
  return api.Hf(e, t.id) && api.Aa(e, t) >= t.steps.length;
};

api.Bp = function Bp(e, t) {
  let [n, i] = t.split(":"),
    a = api.Os(n);
  if (!a) return !1;
  let r = api.Ci(e, a);
  return !!r && r.t === "item" && api.Aa(e, a) === Number(i);
};

api.sh = function sh(e, t, n) {
  for (let i of api.Qi) {
    let a = api.Ci(e, i);
    if (
      !a ||
      a.t !== "kill" ||
      a.z !== e.zone ||
      !(a.kind === t || (a.kind === "slime" && t === "gold")) ||
      (a.elite && a.elite !== n)
    )
      continue;
    let r = (e.f["sqk:" + i.id] || 0) + 1;
    ((e.f["sqk:" + i.id] = r),
      (e.dirty = !0),
      api.Ne(e, e.px, e.py - 22, i.name + " " + Math.min(r, a.n) + "/" + a.n, "#ffd84a"),
      r >= a.n && api.Gf(e, i, a.fin));
  }
};

api.lh = function lh(e) {
  if (!e || !api.Qi || !e.enemies) return;
  for (let t of api.Qi) {
    let n = api.Ci(e, t);
    if (!n || n.t !== "kill" || n.z !== e.zone || !n.at || !n.at.length) continue;
    let need = n.n - (e.f["sqk:" + t.id] || 0);
    if (need <= 0) continue;
    let live = e.enemies.filter((a) => api.questMatch(n, a)).length;
    for (let a = 0; a < need - live; a++) api.Up(e, n, a);
  }
};
