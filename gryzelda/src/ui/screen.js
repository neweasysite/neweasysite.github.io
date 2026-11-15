// @ts-nocheck
/* Ekran gry: menu, tworzenie postaci, pauza, dialog, sterowanie, pętla.
   Nazwy wewnętrzne zostały po minifikacji — logika jest ta sama co w oryginalnej paczce. */
import { api } from "../runtime/api.js";
import { useEffect, useRef, useState } from "../runtime/hooks.js";

api.Qf = function Qf() {
  let e = api.$0(),
    t = useRef(null),
    n = useRef(null),
    i = useRef(null),
    a = useRef(null),
    r = useRef(null),
    s = useRef(null),
    u = useRef(null),
    f = useRef({ cur: null }),
    c = useRef(null),
    y = useRef(null),
    w = useRef({
      u: !1,
      d: !1,
      l: !1,
      r: !1,
      jx: 0,
      jy: 0,
      atk: !1,
      atkHeld: !1,
      skill: !1,
      dash: !1,
      talk: !1,
      swap: !1,
    }),
    b = useRef("menu"),
    x = useRef(api.ap()),
    [M, j] = useState("menu"),
    [D, l] = useState("char"),
    [d, v] = useState(api.ap()),
    [g, C] = useState("bogdan"),
    [tick, S] = useState(0),
    [P, N] = useState({
      goal: "",
      near: "",
      dash: !1,
      skill: "",
      weapons: 1,
      skillOk: !0,
      weapon: "Miecz",
      pts: 0,
      potsHp: 0,
      potsMp: 0,
      potTop: 40,
      nav: "",
    }),
    [Q, W] = useState(!1),
    [_, ie] = useState(""),
    ze = useRef(null),
    ke = useRef(!1),
    le = useRef({ open: 0, fresh: !1, keyHeld: !1 }),
    ve = useRef(0),
    Te = useRef(new Set()),
    ft = useRef(""),
    [tt, ue] = useState(!1),
    [z, R] = useState(!1),
    [O, q] = useState(""),
    [ye, F] = useState(""),
    [k, L] = useState(""),
    [ce, je] = useState(960),
    [Be, rt] = useState(!1),
    [$i, Ha] = useState(!1),
    [$f, f2] = useState(!1),
    [Vf, qf] = useState(!1),
    [X, Se] = useState(""),
    [_s, Jf] = useState(""),
    [Vi, qo] = useState(""),
    [qn, d2] = useState({ w: 800, h: 450 }),
    [Xf, qi] = useState(!1),
    [Yf, c2] = useState(0),
    [nn, Ba] = useState(0),
    [godAsk, setGodAsk] = useState(!1),
    [godPw, setGodPw] = useState(""),
    [godHot, setGodHot] = useState(() => api.godOpen()),
    [godBad, setGodBad] = useState(""),
    godTap = useRef({ n: 0, at: 0 }),
    godIn = useRef(null),
    ed = useRef(null),
    td = useRef(null),
    Ji = useRef({ joy: null, atk: null }),
    As = useRef(null),
    Hs = useRef(null),
    p2 = useRef({ sk: 0, dash: 0 }),
    Tn = (m) => {
      ((x.current = m), v(m));
    },
    Gt = (m) => {
      ((b.current = m), j(m));
    },
    xt = () => S((m) => m + 1),
    mn = () => {
      ((Ji.current = { joy: null, atk: null }),
        (w.current = {
          u: !1,
          d: !1,
          l: !1,
          r: !1,
          jx: 0,
          jy: 0,
          atk: !1,
          atkHeld: !1,
          skill: !1,
          dash: !1,
          talk: !1,
          swap: !1,
        }),
        r.current && (r.current.style.transform = "translate(0px,0px)"));
    },
    Ga = () => {
      i.current && i.current.focus();
    },
    nd = () => (y.current || (y.current = new api.Nf()), y.current),
    En = () => {
      let m = nd(),
        I = u.current;
      (I && ((m.music = I.settings.music), (m.sfx = I.settings.sfx)), m.init());
    };
  (useEffect(() => {
    ue(api.op() !== null);
    let m = !1;
    try {
      m = window.matchMedia("(pointer: coarse)").matches;
    } catch {
      m = !1;
    }
    (rt(m), (c.current = api.$n(api.oe, api.de)));
    let I = ed.current,
      A = () => {
        let $ = window.visualViewport,
          re = $ ? $.height : window.innerHeight,
          We = n.current,
          nt =
            We && !document.fullscreenElement
              ? Math.max(0, We.getBoundingClientRect().top + window.scrollY)
              : 0;
        (c2(Math.max(240, Math.floor(re - nt))), I && d2({ w: I.clientWidth, h: I.clientHeight }));
      },
      J = document.documentElement,
      K = document.body,
      ae = [J.style.overflow, K.style.overflow, K.style.margin, J.style.height, K.style.height];
    ((J.style.overflow = "hidden"),
      (K.style.overflow = "hidden"),
      (K.style.margin = "0"),
      (J.style.height = "100%"),
      (K.style.height = "100%"));
    try {
      let $ = n.current;
      qf(!!document.fullscreenEnabled && !!($ && $.requestFullscreen));
    } catch {
      qf(!1);
    }
    let B = () => {
        let $ = !!document.fullscreenElement;
        (f2($), $ || qi(!1), setTimeout(A, 50));
      },
      U = () => {
        mn();
      },
      V = () => {
        document.hidden && mn();
      };
    (document.addEventListener("fullscreenchange", B),
      window.addEventListener("blur", U),
      document.addEventListener("visibilitychange", V),
      window.addEventListener("resize", A),
      window.addEventListener("orientationchange", A));
    let Ce = window.visualViewport;
    (Ce && Ce.addEventListener("resize", A), A());
    let Ge = null;
    try {
      ((Ge = new ResizeObserver(A)), I && Ge.observe(I));
    } catch {
      Ge = null;
    }
    return () => {
      (Ge && Ge.disconnect(),
        window.removeEventListener("resize", A),
        window.removeEventListener("orientationchange", A),
        Ce && Ce.removeEventListener("resize", A),
        window.removeEventListener("blur", U),
        document.removeEventListener("visibilitychange", V),
        document.removeEventListener("fullscreenchange", B),
        y.current && y.current.stop(),
        (J.style.overflow = ae[0]),
        (K.style.overflow = ae[1]),
        (K.style.margin = ae[2]),
        (J.style.height = ae[3]),
        (K.style.height = ae[4]));
    };
  }, []),
    useEffect(() => {
      let m = 0,
        I = performance.now(),
        A = performance.now(),
        J = (K) => {
          let ae = Math.min(0.05, (K - I) / 1e3);
          I = K;
          let B = t.current,
            U = B ? B.getContext("2d") : null,
            V = u.current,
            Ce = b.current;
          if (
            (U && (U.imageSmoothingEnabled = !1),
            V &&
              (Ce === "play" || Ce === "pause" || Ce === "dialog" || Ce === "dead" || Ce === "win"))
          ) {
            if (Ce === "play") {
              if ((api.yh(V, w.current, ae), V.dirty && ((V.dirty = !1), api.fe(V)), V.sq.length)) {
                let nr = y.current;
                for (let tl of V.sq) nr && nr.play(tl);
                V.sq = [];
              }
              V.req
                ? (C(V.req),
                  Se(""),
                  (V.req = null),
                  mn(),
                  api.Oh(le.current, performance.now(), Te.current.size > 0),
                  Gt("dialog"))
                : V.dead
                  ? (V.zone === 15 && (V.f.lichTry = (V.f.lichTry || 0) + 1),
                    V.deaths++,
                    mn(),
                    (ve.current = performance.now()),
                    Gt("dead"))
                  : V.win &&
                    ((V.win = !1), api.fe(V), mn(), (ve.current = performance.now()), Gt("win"));
              let $ = V.near
                  ? V.near.kind === "lever" || V.near.kind === "toggle"
                    ? "U\u017Cyj"
                    : V.near.id === "kot"
                      ? "Pog\u0142aszcz"
                      : "M\xF3w"
                  : "",
                re = !!(V.active && V.skills[V.active]) && V.mp >= api.Tf(V, V.active),
                We = Math.ceil(api.Ze(V) / 2),
                Ln = 3 + Math.ceil(We / api.o2(api.oe, api.Lf)) * 8 + 14 + 4,
                ia =
                  api.navGoal(V).text +
                  "|" +
                  (V.nav || "") +
                  "|" +
                  $ +
                  "|" +
                  (V.skills.dash > 0) +
                  "|" +
                  (V.active && V.skills[V.active] ? V.active : "") +
                  "|" +
                  V.weapons.length +
                  "|" +
                  re +
                  "|" +
                  V.weapon +
                  "|" +
                  V.pts +
                  "|" +
                  (V.lvl >= 5 && !V.spec) +
                  "|" +
                  V.potsHp +
                  "|" +
                  V.potsMp +
                  "|" +
                  Ln;
              ia !== ft.current &&
                ((ft.current = ia),
                N({
                  goal: api.navGoal(V).text,
                  nav: V.nav || "",
                  near: $,
                  dash: V.skills.dash > 0,
                  skill: V.active && V.skills[V.active] ? api.Pt[V.active].name : "",
                  weapons: V.weapons.length,
                  skillOk: re,
                  weapon: api.jn[V.weapon].name.split(" ").pop() || "Bro\u0144",
                  pts: V.pts + (V.lvl >= 5 && !V.spec ? 1 : 0),
                  potsHp: V.potsHp,
                  potsMp: V.potsMp,
                  potTop: Ln,
                }));
              let tr = ze.current;
              tr &&
                (tr.style.filter =
                  ke.current && Math.floor(K / 500) % 2 === 0 ? "brightness(1.55)" : "none");
              let $t = p2.current;
              (($t.sk = V.skillCd > 0 ? Math.max($t.sk, V.skillCd) : 0),
                ($t.dash = V.dashCd > 0 ? Math.max($t.dash, V.dashCd) : 0),
                As.current &&
                  (As.current.style.height =
                    ($t.sk ? Math.round((V.skillCd / $t.sk) * 100) : 0) + "%"),
                Hs.current &&
                  (Hs.current.style.height =
                    ($t.dash ? Math.round((V.dashCd / $t.dash) * 100) : 0) + "%"));
            }
            (c.current &&
              (c.current.width !== api.oe || c.current.height !== api.de) &&
              (c.current = api.$n(api.oe, api.de)),
              U && c.current && api.Dh(U, V, f.current, c.current),
              U &&
                Ce !== "play" &&
                (U.setTransform(1, 0, 0, 1, 0, 0),
                (U.fillStyle = "rgba(14,8,26,0.55)"),
                U.fillRect(0, 0, api.oe, api.de),
                (U.font = "bold 12px monospace"),
                (U.textAlign = "center"),
                (U.fillStyle = "#fff4b0"),
                U.fillText(
                  Ce === "pause"
                    ? "PAUZA"
                    : Ce === "dialog"
                      ? api.Zn[id.current]
                      : Ce === "dead"
                        ? "PAD\u0141A\u015A"
                        : "\u015AWIAT URATOWANY",
                  api.oe / 2,
                  api.de / 2,
                ),
                (U.textAlign = "left")));
          } else U && api.Th(U, (K - A) / 1e3, x.current, !1);
          let Ge = td.current;
          if (Ge && Ce === "create") {
            let $ = Ge.getContext("2d");
            if ($) {
              (($.imageSmoothingEnabled = !1),
                ($.fillStyle = "#241a3a"),
                $.fillRect(0, 0, Ge.width, Ge.height));
              let re = Math.floor((K - A) / 160) % 4,
                We = [
                  [0, 1],
                  [1, 0],
                  [-1, 0],
                  [0, -1],
                ],
                nt = Math.floor(Ge.width / 4),
                Ln = 12;
              (($.fillStyle = "#3a6a3a"),
                $.fillRect(0, Ge.height - Ln, Ge.width, Ln),
                We.forEach((ia, tr) => {
                  let $t = api.Zf(x.current, ia[0], ia[1], re, !1),
                    nr = Math.round(tr * nt + (nt - $t.width) / 2),
                    tl = Math.round((Ge.height - Ln - $t.height) / 2);
                  $.drawImage($t, nr, tl);
                }));
            }
          }
          m = requestAnimationFrame(J);
        };
      return ((m = requestAnimationFrame(J)), () => cancelAnimationFrame(m));
    }, []));
  let id = useRef("bogdan");
  (useEffect(() => {
    id.current = g;
  }, [g]),
    useEffect(() => {
      if (M !== "pause" || D !== "quest") return;
      let m = u.current,
        I = s.current;
      if (!m || !I) return;
      let A = api.Cn(m),
        J = api.Vn(I),
        K = f.current.cur;
      ((I.width = A.w * 4),
        (I.height = A.h * 4),
        (J.imageSmoothingEnabled = !1),
        K && J.drawImage(K.mini, 0, 0, A.w * 4, A.h * 4),
        (J.fillStyle = "rgba(20,14,34,0.92)"));
      for (let B = 0; B < Math.ceil(A.h / 8); B++)
        for (let U = 0; U < Math.ceil(A.w / 8); U++)
          m.seen[m.zone + ":" + U + ":" + B] || J.fillRect(U * 32, B * 32, 32, 32);
      ((J.fillStyle = "#ffffff"), J.fillRect((m.px / api.T) * 4 - 3, (m.py / api.T) * 4 - 3, 6, 6));
      let ae = api.Ff(m);
      ae &&
        ((J.fillStyle = "#ffd84a"),
        J.fillRect((ae.x / api.T) * 4 - 3, (ae.y / api.T) * 4 - 3, 6, 6));
    }, [M, D, tick]));
  useEffect(() => {
    if (!godAsk) return;
    let m = godIn.current;
    m && m.focus();
  }, [godAsk]);
  let m2 = () => {
      (En(), api.rp());
      let m = { ...d, name: d.name.trim() || "Gryzelda" };
      Tn(m);
      let I = api.Np(m);
      ((u.current = I),
        (f.current.cur = null),
        api.fe(I),
        ue(!0),
        mn(),
        Gt("play"),
        setTimeout(Ga, 0));
    },
    ad = (m) => {
      En();
      let I = api.Ak(m);
      ((u.current = I),
        (f.current.cur = null),
        Tn(m.look),
        api.fe(I),
        ue(!0),
        mn(),
        Gt("play"),
        setTimeout(Ga, 0));
    },
    y2 = () => {
      let m = api.op();
      if (!m) {
        ue(!1);
        return;
      }
      try {
        let I = api.Op(JSON.parse(m));
        if (typeof I == "string") {
          q("Zapis uszkodzony: " + I);
          return;
        }
        ad(I);
      } catch {
        q("Zapis uszkodzony.");
      }
    },
    Jn = () => {
      (R(!1), q(""), mn(), Gt("play"), setTimeout(Ga, 0));
    },
    od = () => {
      b.current === "play" &&
        (mn(),
        q(""),
        F(""),
        godHot && u.current && api.godBind(u.current),
        (ve.current = performance.now()),
        Gt("pause"));
    },
    k2 = () => {
      let m = u.current;
      if (!m) return;
      let I = Math.floor(m.coins * 0.2);
      ((m.coins -= I),
        (m.dead = !1),
        (m.hp = api.Ze(m)),
        (m.mp = api.ut(m)),
        (m.inv = 1.5),
        (m.ward = 0),
        (m.buf = { kawa: 0, ekspres: 0, magnes: 0 }),
        api.Ks(m, m.cp.zone, m.cp.x, m.cp.y),
        api.ne(
          m,
          I
            ? "Wr\xF3ci\u0142a\u015B do kapliczki. Zgubi\u0142a\u015B " + I + " groszy."
            : "Wr\xF3ci\u0142a\u015B do kapliczki.",
          3,
        ),
        api.fe(m),
        Jn());
    },
    rd = (m, I) => {
      let A = w.current;
      switch (m) {
        case "ArrowUp":
        case "w":
        case "W":
          return ((A.u = I), !0);
        case "ArrowDown":
        case "s":
        case "S":
          return ((A.d = I), !0);
        case "ArrowLeft":
        case "a":
        case "A":
          return ((A.l = I), !0);
        case "ArrowRight":
        case "d":
        case "D":
          return ((A.r = I), !0);
        case " ":
        case "j":
        case "J":
          return ((A.atkHeld = I), I && (A.atk = !0), !0);
        case "e":
        case "E":
          return (I && (A.talk = !0), !0);
        case "k":
        case "K":
          return (I && (A.skill = !0), !0);
        case "l":
        case "L":
        case "Shift":
          return (I && (A.dash = !0), !0);
        case "q":
        case "Q":
          return (I && (A.swap = !0), !0);
        case "1":
          return (I && (A.potHp = !0), !0);
        case "2":
          return (I && (A.potMp = !0), !0);
      }
      return !1;
    },
    h2 = (m) => {
      if (
        (Te.current.add(m.key),
        b.current === "dialog" &&
          (m.repeat || le.current.keyHeld) &&
          (m.key === "Enter" || m.key === " "))
      ) {
        m.preventDefault();
        return;
      }
      if (b.current === "play") {
        if (m.key === "Escape" || m.key === "p" || m.key === "P") {
          (m.preventDefault(), od());
          return;
        }
        if (m.repeat) {
          (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].indexOf(m.key) >= 0 ||
            "wasdWASDjJ".indexOf(m.key) >= 0) &&
            m.preventDefault();
          return;
        }
        rd(m.key, !0) && m.preventDefault();
      }
    },
    z2 = (m) => {
      (Te.current.delete(m.key),
        Te.current.size === 0 && (le.current.keyHeld = !1),
        rd(m.key, !1) && m.preventDefault());
    },
    sd = (m) => {
      let I = a.current;
      if (!I) return;
      let A = I.getBoundingClientRect(),
        J = api.Lh(A.left + A.width / 2, A.top + A.height / 2, A.width / 2, m.clientX, m.clientY);
      ((w.current.jx = J[0]),
        (w.current.jy = J[1]),
        r.current &&
          (r.current.style.transform =
            "translate(" +
            Math.round(J[0] * A.width * 0.3) +
            "px," +
            Math.round(J[1] * A.width * 0.3) +
            "px)"));
    },
    w2 = () => {
      ((w.current.jx = 0),
        (w.current.jy = 0),
        r.current && (r.current.style.transform = "translate(0px,0px)"));
    },
    b2 = (m) => {
      if (
        (m.preventDefault(), m.stopPropagation(), En(), !!api.kp(Ji.current, "joy", m.pointerId))
      ) {
        try {
          m.currentTarget.setPointerCapture(m.pointerId);
        } catch {}
        sd(m);
      }
    },
    v2 = (m) => {
      api.Nh(Ji.current, "joy", m.pointerId) && sd(m);
    },
    Bs = (m) => {
      api.hp(Ji.current, "joy", m.pointerId) && w2();
    },
    x2 = (m) => {
      if (
        (m.preventDefault(), m.stopPropagation(), En(), !!api.kp(Ji.current, "atk", m.pointerId))
      ) {
        try {
          m.currentTarget.setPointerCapture(m.pointerId);
        } catch {}
        b.current === "play" && ((w.current.atk = !0), (w.current.atkHeld = !0));
      }
    },
    Gs = (m) => {
      api.hp(Ji.current, "atk", m.pointerId) && (w.current.atkHeld = !1);
    },
    g2 = () => {
      let m = n.current;
      if ((En(), Vf && m && m.requestFullscreen))
        try {
          m.requestFullscreen()
            .then(() => {
              qi(!0);
            })
            .catch(() => {
              qi(!0);
            });
        } catch {
          qi(!0);
        }
      else qi(!0);
      setTimeout(Ga, 0);
    },
    S2 = () => {
      qi(!1);
      try {
        document.fullscreenElement &&
          document
            .exitFullscreen()
            .catch(() => q("Nie uda\u0142o si\u0119 wyj\u015B\u0107 z pe\u0142nego ekranu."));
      } catch {}
    },
    Fs = () => {
      Xf || $f ? S2() : g2();
    },
    Dn = (m) => {
      m.preventDefault();
    },
    Jo = (m) => (I) => {
      (I.preventDefault(), I.stopPropagation(), En(), b.current === "play" && (w.current[m] = !0));
    },
    Xo = Be || (u.current ? u.current.settings.touch : !1),
    Fa = Math.max(1, Math.floor(Math.min(Math.max(240, qn.w), Math.max(200, qn.h)) / 180)),
    Us = Math.ceil(Math.max(240, qn.w) / Fa),
    Zs = Math.ceil(Math.max(200, qn.h) / Fa),
    he = api.Kh(Math.max(240, qn.w), Math.max(200, qn.h)),
    Ua = Math.ceil((he.top.y + he.top.h + 4) / Fa),
    Qs = Math.ceil((he.top.w / 2 + 4) / Fa),
    $s = Xo ? Math.ceil((he.joy.s * 0.6) / Fa) : 8;
  (api.Y0(Us, Zs, Xo, Math.max(34, Ua), $s, Ua, Qs),
    useEffect(() => {
      api.Y0(Us, Zs, Xo, Math.max(34, Ua), $s, Ua, Qs);
    }, [Us, Zs, Xo, Ua, $s, Qs]),
    (ke.current = M === "play" && !!P.goal && P.goal !== _ && !Q),
    useEffect(() => {
      if (!Q) return;
      let m = setTimeout(() => W(!1), 16e3);
      return () => clearTimeout(m);
    }, [Q, P.goal]));
  let p = u.current,
    E = {
      ink: "#1b1424",
      panel: "#2b1d3a",
      panel2: "#3d2a55",
      deep: "#20152e",
      wood: "#7a4a22",
      woodL: "#c08a44",
      woodD: "#4a2a12",
      stone: "#5a5470",
      stoneL: "#8e88a8",
      gold: "#ffd84a",
      goldD: "#b8860b",
      text: "#fff4dc",
      dim: "#e2d4f4",
      faint: "#b4a2cc",
      cyan: "#7ff7ff",
      red: "#ff4d6d",
      green: "#5cf28a",
    },
    Ft = '"Courier New", ui-monospace, Menlo, monospace',
    M2 = Ft,
    Vs = (m, I) => `0 0 0 2px ${E.ink}, 0 0 0 4px ${m}, 0 0 0 6px ${I}, 0 0 0 8px ${E.ink}`,
    _h = {
      background: E.deep,
      boxShadow: `inset 0 0 0 2px ${E.panel2}, 0 0 0 2px ${E.ink}`,
      padding: 12,
      margin: "4px 2px 12px",
      color: E.text,
    },
    Za = {
      fontFamily: Ft,
      fontSize: 20,
      fontWeight: 700,
      margin: 0,
      color: E.gold,
      textShadow: `2px 2px 0 ${E.ink}`,
      letterSpacing: "0.02em",
    },
    Lt = { fontFamily: M2, fontSize: 15, color: E.dim, lineHeight: "21px" },
    Xi = {
      fontFamily: Ft,
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: E.cyan,
      margin: "14px 0 8px",
      textShadow: `1px 1px 0 ${E.ink}`,
    },
    j2 = { display: "flex", flexWrap: "wrap", gap: 10 },
    qs = {
      minHeight: 44,
      padding: "10px 16px",
      border: "none",
      borderRadius: 0,
      fontFamily: Ft,
      fontSize: 15,
      fontWeight: 700,
      cursor: "pointer",
      outline: "none",
      imageRendering: "pixelated",
    },
    Rn = (m) => ({
      ...qs,
      background: m ? E.panel2 : E.deep,
      color: m ? E.gold : E.dim,
      boxShadow: m
        ? `0 0 0 2px ${E.ink}, inset 0 0 0 2px ${E.gold}`
        : `0 0 0 2px ${E.ink}, inset 0 0 0 2px ${E.stone}`,
      margin: 2,
    }),
    Ut = {
      ...qs,
      minHeight: 50,
      padding: "12px 22px",
      fontSize: 17,
      background: "#e0a830",
      color: E.ink,
      boxShadow: `0 0 0 2px ${E.ink}, inset 0 3px 0 ${E.gold}, inset 0 -4px 0 ${E.goldD}`,
      margin: 2,
    },
    Zt = {
      ...qs,
      background: E.wood,
      color: E.text,
      textShadow: `1px 1px 0 ${E.ink}`,
      boxShadow: `0 0 0 2px ${E.ink}, inset 0 3px 0 ${E.woodL}, inset 0 -4px 0 ${E.woodD}`,
      margin: 2,
    },
    Ti = {
      ...Zt,
      background: E.stone,
      boxShadow: `0 0 0 2px ${E.ink}, inset 0 3px 0 ${E.stoneL}, inset 0 -4px 0 #34304a`,
    },
    Qa = (m, I, A = !1) => ({
      width: m,
      height: m,
      borderRadius: 999,
      border: `3px solid ${E.ink}`,
      boxShadow: I
        ? `inset 0 0 0 3px ${E.gold}, inset 0 -6px 0 rgba(0,0,0,0.35), 0 0 0 3px ${E.woodL}, 0 0 0 5px ${E.ink}`
        : `inset 0 0 0 3px ${E.stoneL}, inset 0 -6px 0 rgba(0,0,0,0.35), 0 0 0 3px ${E.stone}, 0 0 0 5px ${E.ink}`,
      background: I ? "rgba(190,40,60,0.82)" : "rgba(43,29,58,0.72)",
      color: E.text,
      fontFamily: Ft,
      fontSize: 12,
      fontWeight: 700,
      textShadow: `1px 1px 0 ${E.ink}`,
      opacity: A ? 0.45 : 1,
      touchAction: "none",
      userSelect: "none",
      WebkitUserSelect: "none",
      WebkitTouchCallout: "none",
      WebkitTapHighlightColor: "transparent",
      cursor: "pointer",
      padding: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      lineHeight: 1.05,
      overflow: "hidden",
    }),
    P2 = (m) => {
      if (!p) return;
      let I = p.skills[m],
        A = api.Pt[m];
      I >= A.costs.length ||
        p.lvl < A.lvl[I] ||
        p.coins < A.costs[I] ||
        ((p.coins -= A.costs[I]),
        (p.skills[m] = I + 1),
        m !== "dash" && m !== "fury" && m !== "seria" && !p.active && (p.active = m),
        api.se(p, p.px, p.py, "#ffd84a", 24, 70, 0.7),
        api.G(p, "item"),
        api.fe(p),
        xt());
    },
    C2 = (m) => {
      if (!p || p.pts <= 0) return;
      let I = api.Ze(p),
        A = api.ut(p);
      (p.st[m]++, p.pts--, (p.hp += api.Ze(p) - I), (p.mp += api.ut(p) - A), api.fe(p), xt());
    },
    T2 = (m, I) =>
      (0, api.h.jsxs)("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          padding: "7px 10px",
          background: E.panel2,
          boxShadow: `inset 0 -2px 0 ${E.ink}`,
        },
        children: [
          (0, api.h.jsx)("div", {
            style: {
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: E.cyan,
              textShadow: `1px 1px 0 ${E.ink}`,
            },
            children: m,
          }),
          I,
        ],
      }),
    Ee = (m, I, A, J) =>
      (0, api.h.jsxs)(
        "div",
        {
          style: {
            background: E.deep,
            boxShadow: `0 0 0 2px ${E.ink}, inset 0 0 0 2px ${E.panel2}`,
            margin: "4px 2px 14px",
          },
          children: [
            T2(m, A),
            (0, api.h.jsx)("div", { style: { padding: 10, display: "grid", gap: 8 }, children: I }),
          ],
        },
        J || m,
      ),
    Qe = (m) =>
      (0, api.h.jsx)("div", {
        style: { fontSize: 13, lineHeight: "18px", color: E.faint },
        children: m,
      }),
    yn = {
      display: "grid",
      alignItems: "center",
      gap: 10,
      padding: "8px 10px",
      background: E.panel,
      boxShadow: `inset 0 0 0 2px ${E.panel2}`,
      minWidth: 0,
    },
    Yo = {
      fontSize: 22,
      fontWeight: 700,
      color: E.gold,
      textAlign: "center",
      textShadow: `2px 2px 0 ${E.ink}`,
      lineHeight: 1,
    },
    Kt = { fontSize: 15, fontWeight: 700, color: E.text, lineHeight: "19px" },
    Qt = { fontSize: 12, lineHeight: "16px", color: E.faint, marginTop: 2 },
    $a = (m) => ({
      ...(m ? Ut : Zt),
      minHeight: 44,
      minWidth: 52,
      padding: "6px 12px",
      fontSize: 14,
      margin: 0,
      opacity: m ? 1 : 0.45,
      whiteSpace: "nowrap",
    }),
    Je = (m, I = E.gold) =>
      (0, api.h.jsx)("span", {
        style: {
          display: "inline-block",
          padding: "2px 7px",
          background: E.ink,
          color: I,
          fontSize: 12,
          fontWeight: 700,
          boxShadow: `inset 0 0 0 1px ${I}`,
        },
        children: m,
      }),
    Xn = (m, I) => {
      if (!p) return null;
      let A = api.Pt[m],
        J = p.skills[m],
        K = A.costs.length,
        ae = J < K ? A.costs[J] : 0,
        B = J < K ? A.lvl[J] : 0,
        U =
          J >= K
            ? "Maksymalna ranga"
            : p.lvl < B
              ? "Wymaga poziomu " + B
              : p.coins < ae
                ? "Brakuje " + (ae - p.coins) + " gr"
                : "",
        V = api.Zn[A.trainer] + (api.np[A.trainer] ? " (" + api.np[A.trainer] + ")" : ""),
        Ce = null;
      I
        ? (Ce =
            J < K
              ? (0, api.h.jsx)("button", {
                  style: $a(!U),
                  disabled: !!U,
                  onClick: () => P2(m),
                  children: (J ? "Ulepsz " : "Kup ") + ae + " gr",
                })
              : Je("MAX"))
        : J > 0 && m !== "dash"
          ? (Ce = (0, api.h.jsx)("button", {
              style: {
                ...Rn(p.active === m),
                minHeight: 44,
                padding: "6px 10px",
                fontSize: 13,
                margin: 0,
              },
              onClick: () => {
                ((p.active = m), api.fe(p), xt());
              },
              children: p.active === m ? "\u2713 Aktywna" : "Ustaw",
            }))
          : J > 0
            ? (Ce = Je("Przycisk \xBB"))
            : (Ce = Je(A.costs[0] + " gr", E.faint));
      let Ge = I
        ? U
          ? "\u2717 " + U
          : J < K
            ? "\u2713 Mo\u017Cesz " + (J ? "ulepszy\u0107" : "kupi\u0107")
            : ""
        : J === 0
          ? "Uczy: " + V + " \xB7 od poz. " + A.lvl[0]
          : J < K
            ? "Nast\u0119pna ranga: " +
              A.costs[J] +
              " gr \xB7 poz. " +
              A.lvl[J] +
              " \xB7 " +
              V.split(" (")[0]
            : "Maksymalna ranga";
      return (0, api.h.jsxs)(
        "div",
        {
          style: { ...yn, gridTemplateColumns: "minmax(0,1fr) auto" },
          children: [
            (0, api.h.jsxs)("div", {
              style: { minWidth: 0 },
              children: [
                (0, api.h.jsxs)("div", {
                  style: { ...Kt, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" },
                  children: [
                    A.name,
                    api.Ep(p, m) &&
                      (0, api.h.jsx)("span", {
                        style: { color: "#ff9aa8", fontSize: 12 },
                        children: "(obca klasa: 50% mocy)",
                      }),
                    (0, api.h.jsx)("span", {
                      style: { color: E.gold, fontSize: 13, letterSpacing: 1 },
                      children: "\u2605".repeat(J) + "\u2606".repeat(K - J),
                    }),
                    A.mp
                      ? (0, api.h.jsxs)("span", {
                          style: { color: "#9fc0ff", fontSize: 12 },
                          children: [api.Tf(p, m), " many"],
                        })
                      : null,
                  ],
                }),
                (0, api.h.jsx)("div", { style: Qt, children: A.desc }),
                Ge &&
                  (0, api.h.jsx)("div", {
                    style: {
                      fontSize: 12,
                      marginTop: 3,
                      color: I && U ? "#ff9aa8" : I ? E.green : E.dim,
                    },
                    children: Ge,
                  }),
              ],
            }),
            (0, api.h.jsx)("div", { children: Ce }),
          ],
        },
        m,
      );
    },
    Ah = (m, I) => Xn(m, I),
    er = [
      {
        id: "arm1",
        name: "Sk\xF3rzany kubrak",
        desc: "+2 maks. zdrowia (1 serce).",
        cost: 25,
        need: "",
        ok: () => !0,
      },
      {
        id: "edge1",
        name: "Naostrzenie broni I",
        desc: "+15% obra\u017Ce\u0144 ka\u017Cdej broni.",
        cost: 20,
        need: "",
        ok: () => !0,
      },
      {
        id: "edge2",
        name: "Wywa\u017Cenie broni II",
        desc: "Kolejne +15% obra\u017Ce\u0144.",
        cost: 45,
        need: "Przynie\u015B \u017Cywic\u0119 Kr\xF3la Glut\xF3w (pokonaj go).",
        ok: (m) => !!m.f.king,
      },
      {
        id: "arm2",
        name: "Kolczuga z drutu modemowego",
        desc: "+3 maks. zdrowia.",
        cost: 60,
        need: "Wanda potrzebuje odcisku Piecz\u0119ci Lasu.",
        ok: (m) => !!m.f.seal,
      },
      {
        id: "edge3",
        name: "Hartowanie III",
        desc: "Kolejne +15% obra\u017Ce\u0144.",
        cost: 90,
        need: "Wymaga stali z Ruin (poci\u0105gnij d\u017Awigni\u0119 w Ruinach).",
        ok: (m) => !!m.f.lever1,
      },
      {
        id: "arm3",
        name: "Pancerz z etykiet paczek",
        desc: "+4 maks. zdrowia.",
        cost: 80,
        need: "Przynie\u015B Manifest Paczek z Depotu.",
        ok: (m) => !!m.f.westKey,
      },
      {
        id: "edge4",
        name: "Ostrzenie SLA IV",
        desc: "Kolejne +15% obra\u017Ce\u0144.",
        cost: 110,
        need: "Wymaga Odznaki Eskalacji z Call Center.",
        ok: (m) => !!m.f.southKey,
      },
      {
        id: "rootEdge",
        name: "Hart Root",
        desc: "+20% obra\u017Ce\u0144, przebija tarcze jak Ostrze Eskalacji.",
        cost: 150,
        need: "Token Root Access (po Lichwie).",
        ok: (m) => !!m.f.rootTok,
      },
    ],
    E2 = (m) => {
      if (!p) return;
      let I = er.find((J) => J.id === m);
      if (!I || p.f[m] || !I.ok(p) || p.coins < I.cost) return;
      let A = api.Ze(p);
      ((p.coins -= I.cost),
        (p.f[m] = !0),
        (p.hp += api.Ze(p) - A),
        api.se(p, p.px, p.py, "#ffd84a", 24, 70, 0.7),
        api.G(p, "chest"),
        api.fe(p),
        xt());
    },
    ld = (m, I) => {
      if (!p) return null;
      let A = !!p.f[m.id],
        J = A
          ? ""
          : m.ok(p)
            ? p.coins < m.cost
              ? "Brakuje " + (m.cost - p.coins) + " gr"
              : ""
            : m.need;
      return (0, api.h.jsxs)(
        "div",
        {
          style: { ...yn, gridTemplateColumns: "minmax(0,1fr) auto" },
          children: [
            (0, api.h.jsxs)("div", {
              style: { minWidth: 0 },
              children: [
                (0, api.h.jsx)("div", { style: Kt, children: m.name }),
                (0, api.h.jsx)("div", { style: Qt, children: m.desc }),
                !A &&
                  (0, api.h.jsx)("div", {
                    style: { fontSize: 12, marginTop: 3, color: J ? "#ff9aa8" : E.green },
                    children: J
                      ? "\u2717 " + J
                      : I
                        ? "\u2713 Mo\u017Cesz kupi\u0107"
                        : "U Kowalki Wandy",
                  }),
              ],
            }),
            (0, api.h.jsx)("div", {
              children: A
                ? Je("\u2713 MASZ", E.green)
                : I
                  ? (0, api.h.jsx)("button", {
                      style: $a(!J),
                      disabled: !!J,
                      onClick: () => E2(m.id),
                      children: m.cost + " gr",
                    })
                  : Je(m.cost + " gr", E.faint),
            }),
          ],
        },
        m.id,
      );
    },
    D2 = () => {
      if (!p) return null;
      let m = g,
        I = p.look.name,
        A = [],
        J = [],
        K = ($) => A.push($),
        ae = ($, re) => J.push({ label: $, fn: re }),
        B = ($, re) => {
          ($ && !api.th(p, m, $)) || ae(re, () => Se($));
        },
        U = ($ = "Do widzenia") =>
          ae($, () => {
            (api.fe(p), Jn());
          }),
        V = null,
        Ce = ($) =>
          ae($.label, () => {
            let re = $.act ? $.act(p) : void 0;
            if (((p.dirty = !0), api.fe(p), $.end)) {
              Jn();
              return;
            }
            (Se(typeof re == "string" ? re : $.go || ""), xt());
          }),
        Ge = api.fh(p, m, X);
      if (((X === "train" || X === "buff" || X === "shop") && (p.f["kn:" + X + ":" + m] = !0), Ge))
        (Ge.lines.forEach(K), Ge.opts.forEach(Ce));
      else if (m === "bogdan")
        X === ""
          ? p.f.bogdan
            ? p.f.won && !p.f.act2
              ? (K(
                  "Kryszta\u0142 mrugn\u0105\u0142... i znowu ticket. Tymczasowa odpowied\u017A. Prawdziwy Root siedzi w Krainie Nieumar\u0142ego Supportu. Najpierw Zach\xF3d i Po\u0142udnie.",
                ),
                ae("Co mam zrobi\u0107?", () => {
                  ((p.f.act2 = !0), (p.dirty = !0), api.fe(p), Se("act2"));
                }),
                U())
              : (K(
                  p.f.root
                    ? p.f.audit
                      ? "Root i audyt zamkni\u0119te. Kolejka \u015Bpiewa z rado\u015Bci. Id\u017A, odpocznij \u2014 albo szukaj sekret\xF3w."
                      : "Root przyj\u0119ty, ale Archiwum Milczenia na wschodzie Serwerowni jeszcze warczy. AUDYT-BOT nie odpuszcza."
                    : p.f.act2
                      ? p.f.westKey && p.f.southKey
                        ? "Portal w Call Center Cieni powinien \u015Bwieci\u0107. Nieumar\u0142y Support czeka."
                        : p.f.westKey
                          ? "Manifest masz. Teraz Basia na po\u0142udniu \u2014 Bagna SLA."
                          : p.f.southKey
                            ? "Odznaka jest. Piotr na zachodzie wci\u0105\u017C czeka na Manifest."
                            : "Piotr na zachodzie Wioski, Basia na po\u0142udniu. Obaj maj\u0105 klucze do portalu."
                      : p.f.boss
                        ? "S\u0142ysza\u0142em huk z Serwerowni. Dumny jestem jak kapliczka po remoncie."
                        : p.f.seal
                          ? "Piecz\u0119\u0107! P\xF3\u0142nocna brama Wioski otwarta. W Ruinach czekaj\u0105 d\u017Awignie, blok i kryszta\u0142y. Wanda w ku\u017Ani zrobi ci co\u015B mocniejszego."
                          : p.f.king
                            ? "Kr\xF3l Glut\xF3w pokonany? To gdzie Piecz\u0119\u0107? W ka\u0142u\u017Cy po nim, jak znam glutowe zwyczaje."
                            : p.f.cellarDone
                              ? "Piwnica Mietka czysta, s\u0142ysza\u0142em. Teraz Las Szept\xF3w na wsch\xF3d, za \u0141\u0105k\u0105. Kr\xF3l Glut\xF3w pilnuje Piecz\u0119ci."
                              : "Najpierw rozgrzewka: Mietek w karczmie ma gluty w piwnicy. Doskok ju\u017C umiesz, u\u017Cyj go!",
                ),
                B("where", "Dok\u0105d teraz?"),
                B("seal", "Po co nam ta Piecz\u0119\u0107?"),
                B("train", "Naucz mnie walki"),
                p.f.seal && B("ruins", "Co jest w Ruinach?"),
                p.f.act2 && (B("west", "Co jest na zachodzie?"), B("south", "A na po\u0142udniu?")),
                p.f.westKey && p.f.southKey && B("undead", "Kraina Nieumar\u0142ego Supportu?"),
                U())
            : (K(
                "Ho ho, " +
                  I +
                  "! Ty te\u017C czekasz na odpowied\u017A od supportu? Ca\u0142a Wioska czeka. Od tygodnia nikt nie dosta\u0142 nawet automatycznego \u201Edzi\u0119kujemy za cierpliwo\u015B\u0107\u201D.",
              ),
              ae("Co si\u0119 w\u0142a\u015Bciwie sta\u0142o?", () => Se("intro")),
              U("Musz\u0119 lecie\u0107"))
          : X === "intro"
            ? (K(
                "SUPPORT-BOT 3000 zamkn\u0105\u0142 si\u0119 w Serwerowni za Ruinami i trzyma ca\u0142\u0105 krain\u0119 w kolejce. Kto\u015B musi tam doj\u015B\u0107. Kto\u015B cierpliwy. " +
                  (p.look.cls === "war"
                    ? "Kto\u015B z mieczem."
                    : p.look.cls === "ran"
                      ? "Kto\u015B z \u0142ukiem. Przynajmniej b\u0119dziesz ucieka\u0107 z daleka."
                      : "Kto\u015B z kosturem. Iskry, magia, rachunek za pr\u0105d.") +
                  " Pomo\u017Cesz?",
              ),
              ae("Przyjmuj\u0119 misj\u0119", () => {
                ((p.f.bogdan = !0),
                  p.skills.dash || (p.skills.dash = 1),
                  (p.dirty = !0),
                  api.G(p, "item"),
                  Se("accept"));
              }),
              B("", "Wr\xF3\u0107"))
            : X === "accept"
              ? (K(
                  "Wiedzia\u0142em! Pierwsza lekcja gratis: Doskok (przycisk \xBB albo Shift). Robisz unik i przez chwil\u0119 nic ci\u0119 nie trafia. Najpierw rozgrzewka: Mietek w karczmie Pod Pe\u0142n\u0105 Kolejk\u0105 ma gluty w piwnicy. Potem Las Szept\xF3w i Kr\xF3l Glut\xF3w: po\u0142kn\u0105\u0142 Piecz\u0119\u0107 Lasu, kt\xF3ra otwiera p\xF3\u0142nocn\u0105 bram\u0119 do Ruin.",
                ),
                U("Ruszam"))
              : X === "where"
                ? (K(
                    api.Zo(p).text +
                      " Z\u0142ota ksi\u0105\u017Cka u g\xF3ry ekranu przypomina cel, a \u017C\xF3\u0142ta strza\u0142ka prowadzi. Poboczne te\u017C, gdy w ksi\u0105\u017Cce albo w Dzienniku naci\u015Bniesz Prowad\u017A.",
                  ),
                  B("", "Inne pytanie"),
                  U())
                : X === "seal"
                  ? (K(
                      "Piecz\u0119\u0107 Lasu to kamie\u0144 z b\u0142\u0119kitnym rdzeniem. Kr\xF3l Glut\xF3w po\u0142kn\u0105\u0142 j\u0105, gdy support zamkn\u0105\u0142 zg\u0142oszenie jako \u201Enie dotyczy\u201D. Bez niej p\xF3\u0142nocna brama si\u0119 nie otworzy.",
                    ),
                    B("", "Inne pytanie"),
                    U())
                  : X === "ruins"
                    ? (K(
                        "Ruiny Kolejki Zg\u0142osze\u0144. D\u017Awignie, kamienny blok, kryszta\u0142y na czas. Tam potwory gryz\u0105 mocniej: zr\xF3b zakupy u Wandy i rozdaj punkty, zanim wejdziesz.",
                      ),
                      B("", "Inne pytanie"),
                      U())
                    : X === "act2"
                      ? (K(
                          "Na zachodzie Naczelnik Piotr tonie w zagubionych paczkach. Na po\u0142udniu Analityczka Basia mierzy SLA w bagnie. Dwa klucze otworz\u0105 portal do Nieumar\u0142ego Supportu.",
                        ),
                        U("Ruszam"))
                      : X === "west"
                        ? (K(
                            "Zachodnie Pola Ticket\xF3w. Lataj\u0105ce zg\u0142oszenia, tarcze z regulaminu, biegacze z deadline\u2019em. Depot na p\xF3\u0142nocy p\xF3l strze\u017Ce Golem Paczek \u2014 z niego wypada Manifest.",
                          ),
                          B("", "Inne pytanie"),
                          U())
                        : X === "south"
                          ? (K(
                              "Po\u0142udniowe Bagna SLA. Timeouty, zombie z helpdesku, telefony-przywo\u0142ywacze. W Call Center Cieni gra hold music \u2014 ucisz Upi\xF3ra, we\u017A Odznak\u0119.",
                            ),
                            B("", "Inne pytanie"),
                            U())
                          : X === "undead"
                            ? (K(
                                "Kraina Nieumar\u0142ego Supportu. Hold music na wieki. Lichwa Lidia trzyma Token Root Access. Bez treningu i ostrzenia u Wandy nawet nie pr\xF3buj.",
                              ),
                              B("", "Inne pytanie"),
                              U())
                            : X === "train" &&
                              (K(
                                "Wir Ostrzy rani wok\xF3\u0142. Furia: przytrzymany ATAK strzela seriami (wr\u0119cz). Doskok ranga 2 skraca odnowienie. P\u0142acisz groszami.",
                              ),
                              (V = api.Ui.filter(($) => api.Pt[$].trainer === "bogdan").map(($) =>
                                Xn($, !0),
                              )),
                              B("", "Wr\xF3\u0107 do rozmowy"),
                              U());
      else if (m === "halina") {
        let $ = api.Ns(p);
        if ((p.f.halina || ((p.f.halina = !0), (p.dirty = !0)), X === ""))
          (K(
            "Czuj\u0119 zapach kogo\u015B, kto czeka na odpowied\u017A od supportu... Czego chcesz, dziecino? Ucz\u0119 czar\xF3w, parz\u0119 Ekspres, kt\xF3ry trzyma d\u0142u\u017Cej, a za kolczastymi zaro\u015Blami na p\xF3\u0142nocy lasu szepcze co\u015B, o czym support nie wie.",
          ),
            p.f.mushQ
              ? $ >= 5 && !p.f.mushDone
                ? ae("Oddaj 5 grzyb\xF3w", () => {
                    ((p.f.mushDone = !0),
                      p.weapons.indexOf("burza") < 0 && p.weapons.push("burza"),
                      api.G(p, "chest"),
                      api.ne(p, "Kostur Burzy! Zmie\u0144 bro\u0144 przyciskiem Bro\u0144 (Q).", 3),
                      api.fe(p),
                      Se("thanks"));
                  })
                : p.f.mushDone ||
                  K(
                    "Grzyby: " +
                      $ +
                      "/5. \u015Awiec\u0105 na zielono w ciemnych zak\u0105tkach lasu.",
                  )
              : B("mush", "Potrzebujesz pomocy?"),
            B("bramble", "Co jest za zaro\u015Blami?"),
            B("crypt", "Co jest na dole lasu?"),
            B("train", "Naucz mnie magii"),
            B("buff", "Ulepsz czas Ekspresu"),
            U());
        else if (X === "mush")
          (K(
            "Przynie\u015B mi 5 \u015Bwiec\u0105cych grzyb\xF3w z tego lasu, a oddam ci Kostur Burzy: piorun przeskakuje mi\u0119dzy wrogami.",
          ),
            ae("Zbior\u0119 grzyby", () => {
              ((p.f.mushQ = !0), api.pinNav(p, "mush", !0), api.fe(p), Se(""));
            }),
            ae("Mo\u017Ce p\xF3\u017Aniej", () => Se("")));
        else if (X === "bramble")
          (K(
            "Kolczaste zaro\u015Bla na p\xF3\u0142nocy pali tylko Kula Ognia. Za nimi jest Sekretny Ogr\xF3d, o kt\xF3rym support nie wie. Jest tam skrzynia z sercem.",
          ),
            B("train", "Chc\u0119 Kul\u0119 Ognia"),
            B("", "Inne pytanie"));
        else if (X === "crypt")
          (K(
            "Na południu lasu, pod korzeniami, są schody w dół. Katakumby bez numeru sprawy. Schodzi się salami, od czwartego poziomu aż do dwudziestego ósmego. Na dnie siedzi Morok, Archiwariusz Otchłani, i nie oddaje Sygnetu Jednego Ciosu. Jak go dobijesz, następna nowa gra zacznie się z tym pierścieniem na palcu.",
          ),
            B("", "Inne pytanie"));
        else if (X === "thanks")
          (K(
            "Uwa\u017Caj, kostur gryzie. Klawisz Q albo przycisk Bro\u0144, \u017Ceby nim machn\u0105\u0107.",
          ),
            U());
        else if (X === "train")
          (K(
            "Kula Ognia pali zaro\u015Bla. Seria: przytrzymanie strzela seriami z \u0142uku/kostura. Tarcza Cierpliwo\u015Bci poch\u0142ania trafienia.",
          ),
            (V = api.Ui.filter((re) => api.Pt[re].trainer === "halina").map((re) => Xn(re, !0))),
            B("", "Wr\xF3\u0107 do rozmowy"),
            U());
        else if (X === "buff") {
          let re = api.Ia(p, "ekspres"),
            We = api.pn.ekspres.length - 1;
          if (re >= We)
            (K(
              "Ekspres trzyma ju\u017C " +
                api.bt(p, "ekspres") +
                " s. Wi\u0119cej nie wyci\u015Bn\u0119 z kawy supportu.",
            ),
              B("", "Wr\xF3\u0107"));
          else {
            let nt = api.Sf.ekspres[re];
            (K(
              "Ulepsz Ekspres: " +
                api.pn.ekspres[re] +
                " s \u2192 " +
                api.pn.ekspres[re + 1] +
                " s za " +
                nt +
                " gr.",
            ),
              ae("Kup ulepszenie (" + nt + " gr)", () => {
                if (p.coins < nt) {
                  Se("brokebuff");
                  return;
                }
                ((p.coins -= nt),
                  (p.f["buf:ekspres"] = re + 1),
                  api.G(p, "item"),
                  api.fe(p),
                  Se("buffok"));
              }),
              B("", "Wr\xF3\u0107"));
          }
        } else
          X === "buffok"
            ? (K("Teraz Ekspres trwa " + api.bt(p, "ekspres") + " s. Nie marnuj go na gluty."),
              B("buff", "Jeszcze?"),
              U())
            : X === "brokebuff" &&
              (K("Grosze, dziecko. Magia nie jest na kredyt."), B("buff", "Wr\xF3\u0107"));
      } else if (m === "jadzia")
        p.f.catQ
          ? p.f.cat && !p.f.catDone
            ? (K(
                "Mruczek wr\xF3ci\u0142! Masz tu, wnusiu, 15 groszy i co\u015B na rozum: 1 punkt umiej\u0119tno\u015Bci.",
              ),
              ae("Dzi\u0119kuj\u0119, babciu", () => {
                ((p.f.catDone = !0),
                  (p.coins += 15),
                  (p.pts += 1),
                  api.G(p, "chest"),
                  api.fe(p),
                  xt());
              }))
            : (K(
                p.f.catDone
                  ? "Mruczek \u015Bpi na piecu. Plotka: w krzakach na po\u0142udniowym wschodzie Wioski kto\u015B schowa\u0142 oszcz\u0119dno\u015Bci."
                  : "Mruczek jest na \u0141\u0105ce, w krzakach za rzek\u0105 na po\u0142udniowym wschodzie.",
              ),
              U())
          : X === ""
            ? (K("Dziecko, m\xF3j Mruczek uciek\u0142 na \u0141\u0105k\u0119! Przyprowadzisz go?"),
              ae("Poszukam Mruczka", () => {
                ((p.f.catQ = !0), api.pinNav(p, "cat", !0), api.fe(p), Se("hint"));
              }),
              B("hint", "Gdzie go widzia\u0142a\u015B?"),
              U("Nie teraz, babciu"))
            : (K(
                "W krzakach na po\u0142udniowym wschodzie \u0141\u0105ki, za rzek\u0105. Nagroda si\u0119 znajdzie!",
              ),
              p.f.catQ ||
                ae("Poszukam Mruczka", () => {
                  ((p.f.catQ = !0), api.pinNav(p, "cat", !0), api.fe(p), xt());
                }),
              U());
      else if (m === "kamila")
        if (X === "") {
          let $ = [
              "Powiedz mi co\u015B mi\u0142ego. Szybko, zanim zadzwoni telefon.",
              "Co tam? Jak tam? Co porabiasz? Tylko w punktach, za kwadrans mam komisj\u0119.",
              "No to konkretnie: masz pi\u0119\u0107 minut. Albo dwie kawy. Wybieraj m\u0105drze.",
              "O, jeste\u015B! M\xF3w, jak ci min\u0105\u0142 dzie\u0144. M\xF3j min\u0105\u0142 z kosztorysem. Wygra\u0142 na punkty.",
              "W Referacie Inwestycji mamy zasad\u0119: najpierw papier, potem \u0142opata. Zdzisiek ma odwrotn\u0105 i te\u017C mu jako\u015B dzia\u0142a.",
              "Dobrze ci\u0119 widzie\u0107. Serio. Nie tak serio jak termin przetargu, ale prawie.",
              "Pytanie kontrolne: jad\u0142a\u015B co\u015B dzi\u015B? Przygody na pusty \u017Co\u0142\u0105dek to niegospodarno\u015B\u0107.",
              "M\xF3w kr\xF3tko i na temat. Dobra, \u017Cartuj\u0119, opowiadaj wszystko, i tak czekam na podpis.",
              "Jak skończę ten stos, idę po kawę. Jak skończę kawę, idę po następny stos.",
              "Kosztorys? Kosztorys jest pi\u0119kny. Rzeczywisto\u015B\u0107 si\u0119 do niego jeszcze nie dostosowa\u0142a.",
              "Smoki spóźniają się z ofertami. Ja spóźniam się z urlopem. Remis.",
            ],
            re = p.f["tk:kamila"] || 0,
            We = re + Math.floor(p.time / 20);
          (K(
            p.f["sqd:kam3"] && We % 3 === 0
              ? "Dzi\u0119ki tobie mamy teczk\u0119, protok\xF3\u0142 i dofinansowanie. Dyrekcja pyta, czy nie chcesz etatu. Uciekaj, p\xF3ki mo\u017Cesz."
              : $[We % $.length],
          ),
            p.f["sqd:kamMost"] &&
              !p.f["sq:kam1"] &&
              K("Deski Zdzicha leżą na drodze, przez wodę. W papierach mostu nadal nie ma."),
            p.f["sq:kam1"] &&
              !p.f["sqd:kam1"] &&
              K("Teczki przy mnie nie ma. Sam wiatr ją wziął. Przynieś, to pogadamy o przetargu."),
            K(
              "Parz\u0119 te\u017C kaw\u0119 urz\u0119dow\u0105. Dzia\u0142a szybciej ni\u017C obieg dokument\xF3w, a jak masz grosze, naucz\u0119 ci\u0119 parzy\u0107 j\u0105 d\u0142u\u017Cej.",
            ),
            p.kamila
              ? K("Jedna kawa na wizyt\u0119. Reszta idzie na posiedzenie komisji.")
              : ae("Poprosz\u0119 kaw\u0119 urz\u0119dow\u0105", () => {
                  ((p.kamila = !0),
                    (p.f["tk:kamila"] = re + 1),
                    (p.buf.kawa = api.bt(p, "kawa")),
                    api.G(p, "power"),
                    api.fe(p),
                    Jn());
                }),
            B("buff", "Ulepsz czas dzia\u0142ania kawy"),
            ae("Dzi\u0119kuj\u0119, nie", () => {
              ((p.f["tk:kamila"] = re + 1), api.fe(p), Jn());
            }));
        } else if (X === "buff") {
          let $ = api.Ia(p, "kawa"),
            re = api.pn.kawa.length - 1;
          if ($ >= re)
            (K(
              "Maksimum! Twoja kawa trzyma " +
                api.bt(p, "kawa") +
                " s. D\u0142u\u017Cej trzyma tylko procedura odwo\u0142awcza.",
            ),
              B("", "Wr\xF3\u0107"));
          else {
            let We = api.Sf.kawa[$];
            (K(
              "Ranga " +
                $ +
                " \u2192 " +
                ($ + 1) +
                ": kawa z " +
                api.pn.kawa[$] +
                " s do " +
                api.pn.kawa[$ + 1] +
                " s. Koszt " +
                We +
                " gr.",
            ),
              ae("Kup ulepszenie (" + We + " gr)", () => {
                if (p.coins < We) {
                  Se("broke");
                  return;
                }
                ((p.coins -= We),
                  (p.f["buf:kawa"] = $ + 1),
                  api.G(p, "item"),
                  api.fe(p),
                  Se("buffok"));
              }),
              B("", "Wr\xF3\u0107"));
          }
        } else
          X === "buffok"
            ? (K(
                "Parzysz jak do\u015Bwiadczona urz\u0119dniczka: mocno i z za\u0142\u0105cznikiem. Nowa kawa b\u0119dzie trzyma\u0107 " +
                  api.bt(p, "kawa") +
                  " s.",
              ),
              B("buff", "Jeszcze?"),
              U())
            : X === "broke" &&
              (K(
                "Bez grosza ani \u0142yka. Bud\u017Cet jest napi\u0119ty jak termin oddania inwestycji.",
              ),
              B("buff", "Wr\xF3\u0107"));
      else if (m === "zenek") {
        let $ = api.Ds(p);
        if (X === "train")
          (K(
            "Pu\u0142apka, Salwa i Przewr\xF3t. \u0141uczniczka dostaje pe\u0142n\u0105 moc, reszta po\u0142ow\u0119. P\u0142acisz groszami.",
          ),
            (V = api.Ui.filter((re) => api.Pt[re].trainer === "zenek").map((re) => Xn(re, !0))),
            B("", "Wr\xF3\u0107"),
            U());
        else if (X === "buff") {
          let re = api.Ia(p, "magnes"),
            We = api.pn.magnes.length - 1;
          if (re >= We)
            (K(
              "Magnes trzyma " +
                api.bt(p, "magnes") +
                " s (~5 min). Grosze same skacz\u0105 do kieszeni.",
            ),
              B("", "Wr\xF3\u0107"));
          else {
            let nt = api.Sf.magnes[re];
            (K(
              "Magnes: " +
                api.pn.magnes[re] +
                " s \u2192 " +
                api.pn.magnes[re + 1] +
                " s za " +
                nt +
                " gr.",
            ),
              ae("Kup ulepszenie (" + nt + " gr)", () => {
                if (p.coins < nt) {
                  Se("brokebuff");
                  return;
                }
                ((p.coins -= nt),
                  (p.f["buf:magnes"] = re + 1),
                  api.G(p, "item"),
                  api.fe(p),
                  Se("buffok"));
              }),
              B("", "Wr\xF3\u0107"));
          }
        } else if (X === "buffok")
          (K(
            "Nowy magnes: " +
              api.bt(p, "magnes") +
              " s. Nie wci\u0105gaj glut\xF3w \u2014 tylko grosze.",
          ),
            B("buff", "Jeszcze?"),
            U());
        else if (X === "brokebuff")
          (K("Bez grosza nie ma magnesu. Ironia, wiem."), B("buff", "Wr\xF3\u0107"));
        else if (!p.f.nestQ)
          X === ""
            ? (K(
                "Gniazda spamu zalewaj\u0105 mi \u0141\u0105k\u0119! Zniszcz wszystkie trzy, a dam ci \u0142uk.",
              ),
              ae("Bior\u0119 zlecenie", () => {
                ((p.f.nestQ = !0), api.pinNav(p, "nest", !0), api.fe(p), Se("where"));
              }),
              B("where", "Gdzie s\u0105 gniazda?"),
              U("Nie mam czasu"))
            : (K(
                "Jedno przy zachodniej polanie, jedno za rzek\u0105 na wschodzie, jedno na p\xF3\u0142nocy przy rzece. Wypluwaj\u0105 lataj\u0105ce maile.",
              ),
              p.f.nestQ ||
                ae("Bior\u0119 zlecenie", () => {
                  ((p.f.nestQ = !0), api.pinNav(p, "nest", !0), api.fe(p), xt());
                }),
              U());
        else if ($ >= 3 && !p.f.nestDone) {
          let re = p.weapons.indexOf("luk") >= 0;
          (K(
            re
              ? "\u0141uk ju\u017C masz, wi\u0119c prosz\u0119: 40 groszy i 1 punkt."
              : "Czysto! Trzymaj m\xF3j zapasowy \u0141uk. Zmieniasz bro\u0144 przyciskiem Bro\u0144 (Q).",
          ),
            ae("Odbierz nagrod\u0119", () => {
              ((p.f.nestDone = !0),
                re ? ((p.coins += 40), (p.pts += 1)) : p.weapons.push("luk"),
                api.G(p, "chest"),
                api.fe(p),
                xt());
            }));
        } else
          (K(
            p.f.nestDone
              ? "\u0141\u0105ka oddycha. Dzi\u0119ki, " +
                  I +
                  ". Mog\u0119 ci\u0119 te\u017C nauczy\u0107 tropicielskich sztuczek i wyd\u0142u\u017Cy\u0107 ci magnes na grosze."
              : "Zniszczone gniazda: " +
                  $ +
                  "/3. Jak b\u0119dziesz mie\u0107 grosze, wyd\u0142u\u017C\u0119 ci magnes" +
                  (p.lvl >= 3 ? " i poka\u017C\u0119 par\u0119 tropicielskich sztuczek." : "."),
          ),
            (p.f.nestDone || p.lvl >= 3) && B("train", "Naucz sztuczek \u0142uczniczki"),
            B("buff", "Ulepsz czas magnesu"),
            U());
      } else if (m === "mietek") {
        let $ = api.Rs(p);
        X === ""
          ? (K(
              p.f.bogdan
                ? p.f.cellarDone
                  ? "Moja ulubiona bohaterka! Piwnica cicha, beczki ca\u0142e. Siadaj, co poda\u0107?"
                  : p.f.cellarQ
                    ? $ >= 2
                      ? "Cisza na dole? Naprawd\u0119? No to nale\u017Cy ci si\u0119 nagroda!"
                      : "Gniazda na dole: " + $ + "/2. Klapa w rogu sali, tu\u017C przy beczkach."
                    : "Bogdan ci\u0119 przys\u0142a\u0142? \u015Awietnie. Mam w piwnicy problem. Glutowy problem. I spamowy."
                : "Witaj w Pod Pe\u0142n\u0105 Kolejk\u0105! U nas kolejka do baru kr\xF3tsza ni\u017C do supportu. Bogdan szuka kogo\u015B odwa\u017Cnego, pogadaj z nim na placu.",
            ),
            p.f.bogdan && !p.f.cellarQ && B("cellar", "Co jest w piwnicy?"),
            p.f.cellarQ &&
              !p.f.cellarDone &&
              $ >= 2 &&
              ae("Odbierz nagrod\u0119", () => {
                ((p.f.cellarDone = !0),
                  (p.coins += 25),
                  (p.pts += 2),
                  (p.dirty = !0),
                  api.G(p, "chest"),
                  api.se(p, p.px, p.py, "#ffd84a", 24, 70, 0.7),
                  api.fe(p),
                  Se("reward"));
              }),
            ae("Gulasz kolejkowy (6 gr, pe\u0142ne zdrowie i mana)", () => {
              if (p.coins < 6) {
                Se("broke");
                return;
              }
              ((p.coins -= 6),
                (p.hp = api.Ze(p)),
                (p.mp = api.ut(p)),
                api.G(p, "heal"),
                api.fe(p),
                Se("stew"));
            }),
            p.f.bogdan && B("gossip", "Jakie\u015B plotki?"),
            U())
          : X === "cellar"
            ? (K(
                "Gluty zal\u0119g\u0142y si\u0119 w beczkach, a dwa gniazda spamu pluj\u0105 mailami \u201ETwoja paczka czeka\u201D. Zniszcz oba gniazda, to dam ci 25 groszy i dwa punkty na rozw\xF3j. Klapa jest w rogu sali.",
              ),
              ae("Zejd\u0119 do piwnicy", () => {
                ((p.f.cellarQ = !0), (p.dirty = !0), (p.layerDirty = !0), api.fe(p), Se(""));
              }),
              B("", "Wr\xF3\u0107"))
            : X === "reward"
              ? (K(
                  "Prosz\u0119: 25 groszy i 2 punkty. Rozdaj je w Menu \u2192 Posta\u0107, bo w lesie gluty s\u0105 wi\u0119ksze. A Wanda z ku\u017Ani obok studni naostrzy ci bro\u0144, powo\u0142aj si\u0119 na mnie.",
                ),
                B("", "Dzi\u0119ki"))
              : X === "stew"
                ? (K(
                    "Gulasz kolejkowy: gotuje si\u0119 tak d\u0142ugo jak czas oczekiwania na odpowied\u017A. Smacznego!",
                  ),
                  B("", "Wr\xF3\u0107"))
                : X === "broke"
                  ? (K("Za 6 groszy, kochana. Nawet support tyle nie bierze. Bo nic nie robi."),
                    B("", "Wr\xF3\u0107"))
                  : X === "gossip" &&
                    (K(
                      p.f.boss
                        ? "Podobno Kryszta\u0142 Odpowiedzi zn\xF3w dzia\u0142a. Ludzie dostaj\u0105 maile \u201ETwoje zg\u0142oszenie zosta\u0142o rozwi\u0105zane\u201D. P\u0142acz\u0105 ze szcz\u0119\u015Bcia."
                        : p.f.lever1
                          ? "Kupcy gadaj\u0105, \u017Ce za drzwiami w Ruinach stoi co\u015B, co m\xF3wi \u201Eprosz\u0119 czeka\u0107\u201D na okr\u0105g\u0142o."
                          : p.f.seal
                            ? "Zbyszek m\xF3wi, \u017Ce zgubi\u0142 lutni\u0119 w Ruinach. Zapytaj go, tylko nie pro\u015B, \u017Ceby za\u015Bpiewa\u0142."
                            : p.f.king
                              ? "Las ucich\u0142. Znaczy si\u0119, Kr\xF3l Glut\xF3w albo umar\u0142, albo czeka na odpowied\u017A."
                              : "W Lesie Szept\xF3w rz\u0105dzi Kr\xF3l Glut\xF3w. Wielki jak beczka, skacze jak wiewi\xF3rka. R\xF3b uniki, kiedy rzuca cie\u0144.",
                    ),
                    B("", "Wr\xF3\u0107"));
      } else if (m === "zbyszek")
        X === ""
          ? (K(
              "Ballada o " +
                I +
                ", zwrotka " +
                (1 +
                  (p.f.cellarDone ? 1 : 0) +
                  (p.f.king ? 1 : 0) +
                  (p.f.seal ? 1 : 0) +
                  (p.f.door ? 1 : 0) +
                  (p.f.boss ? 1 : 0)) +
                ": " +
                (p.f.boss
                  ? "\u201E...i bot upad\u0142, a kolejka znik\u0142a, jak piwo w czwartek!\u201D"
                  : p.f.seal
                    ? "\u201E...Piecz\u0119\u0107 w d\u0142oni, brama w g\xF3rze, a bohaterka ci\u0105gle w kolejce w podr\xF3\u017Ce!\u201D"
                    : p.f.king
                      ? "\u201E...Kr\xF3la Glut\xF3w pokona\u0142a, cho\u0107 si\u0119 troch\u0119 przyklei\u0142a!\u201D"
                      : p.f.cellarDone
                        ? "\u201E...w piwnicy gluty, w piwnicy spam, a ona wesz\u0142a i zrobi\u0142a BAM!\u201D"
                        : "\u201E...siedzia\u0142a w kolejce, numer cztery tysi\u0105ce...\u201D Hm, potrzebuj\u0119 wi\u0119cej materia\u0142u."),
            ),
            p.f.seal &&
              !p.f.luteQ &&
              (K("(Zbyszek wybija rytm \u0142y\u017Ckami o kufel. Lutni nigdzie nie wida\u0107.)"),
              B("lute", "Czemu grasz na \u0142y\u017Ckach?")),
            p.f.luteQ && p.f.luteFound && !p.f.luteDone
              ? ae("Oddaj lutni\u0119", () => {
                  ((p.f.luteDone = !0),
                    (p.bonusMp += 3),
                    (p.mp = api.ut(p)),
                    (p.pts += 1),
                    (p.coins += 20),
                    (p.dirty = !0),
                    api.G(p, "chest"),
                    api.fe(p),
                    Se("luteok"));
                })
              : p.f.luteQ &&
                !p.f.luteDone &&
                K("(Lutnia wci\u0105\u017C w Ruinach. Zbyszek stuka \u0142y\u017Ckami w kufel.)"),
            U())
          : X === "lute"
            ? (K(
                "Bo moja lutnia zosta\u0142a w Ruinach! Ucieka\u0142em przed czym\u015B, co krzycza\u0142o \u201ETwoje zg\u0142oszenie jest dla nas wa\u017Cne\u201D. Le\u017Cy gdzie\u015B za drzwiami na wschodzie holu. Przyniesiesz? Naucz\u0119 ci\u0119 piosenki na man\u0119.",
              ),
              ae("Poszukam lutni", () => {
                ((p.f.luteQ = !0), (p.dirty = !0), api.pinNav(p, "lute", !0), api.fe(p), Se(""));
              }),
              B("", "Mo\u017Ce p\xF3\u017Aniej"))
            : X === "luteok" &&
              (K(
                "Moja lutnia! Masz: 20 groszy, punkt rozwoju i piosenk\u0119, kt\xF3ra na sta\u0142e dodaje 3 many. Nie pytaj jak. Magia rym\xF3w.",
              ),
              U());
      else if (m === "wanda")
        X === ""
          ? (K(
              p.f.edge1 || p.f.arm1
                ? "Wracasz? Dobrze. Bro\u0144 to nie kubek po kawie, trzeba o ni\u0105 dba\u0107."
                : "Ku\u017Ania Wandy. Ostrz\u0119, kuj\u0119, \u0142atam. Mietek m\xF3wi, \u017Ce walczysz z glutami. " +
                    (p.look.cls === "war"
                      ? "Z tym mieczem? Odwa\u017Cnie."
                      : p.look.cls === "ran"
                        ? "Z tym \u0142ukiem? Z daleka to ka\u017Cdy odwa\u017Cny."
                        : "Z kosturem? Gluty si\u0119 iskier nie boj\u0105. Ja troch\u0119 tak."),
            ),
            K(
              "Ulepszenia le\u017C\u0105 na kowadle, a jak chcesz, naucz\u0119 ci\u0119 paru technik wojowniczki.",
            ),
            B("shop", "Poka\u017C ulepszenia"),
            B("train", "Naucz technik wojowniczki"),
            B("tip", "Jaka\u015B rada?"),
            p.f.act2 && B("tip2", "Co z nowymi krainami?"),
            U())
          : X === "train"
            ? (K(
                "Uderzenie Tarcz\u0105 og\u0142usza. Prowokacja \u015Bci\u0105ga aggro i daje chwil\u0119 twardo\u015Bci. Dla Wojowniczki pe\u0142na moc, dla reszty po\u0142owa.",
              ),
              (V = api.Ui.filter(($) => api.Pt[$].trainer === "wanda").map(($) => Xn($, !0))),
              B("", "Wr\xF3\u0107"),
              U())
            : X === "shop"
              ? (K(
                  "Ulepszenia s\u0105 na sta\u0142e. Lepsze rzeczy wymagaj\u0105 materia\u0142\xF3w, kt\xF3re zdob\u0119dziesz po drodze.",
                ),
                (V = (0, api.h.jsxs)(api.h.Fragment, {
                  children: [
                    er.filter(($) => !!p.f[$.id] || $.ok(p)).map(($) => ld($, !0)),
                    er.some(($) => !p.f[$.id] && !$.ok(p)) &&
                      Qe(
                        "Reszta kowad\u0142a czeka na materia\u0142y, o kt\xF3rych jeszcze nic nie wiesz.",
                      ),
                  ],
                })),
                B("", "Wr\xF3\u0107"),
                U())
              : X === "tip"
                ? (K(
                    p.f.seal
                      ? "W Ruinach wrogi bij\u0105 za dwa. Pluskwy spamu najpierw migaj\u0105 czerwonym wykrzyknikiem, potem strzelaj\u0105 wachlarzem. Odsu\u0144 si\u0119 w bok."
                      : "Kr\xF3l Glut\xF3w skacze tam, gdzie stoisz. Patrz na cie\u0144 i doskocz w bok, potem tnij, zanim zn\xF3w podskoczy.",
                  ),
                  B("", "Wr\xF3\u0107"))
                : X === "tip2" &&
                  (K(
                    "Na Polach Ticket\xF3w biegacze migaj\u0105 z\u0142otem przed szar\u017C\u0105 \u2014 doskocz w bok. Tarcze blokuj\u0105 od frontu: kr\u0119\u0107 Wir Ostrzy albo Ostrze Eskalacji. W Nieumar\u0142ym \u015Bwiecie bez kolczugi nawet nie wchod\u017A.",
                  ),
                  B("", "Wr\xF3\u0107"));
      else if (m === "piotr")
        X === ""
          ? p.f.act2
            ? p.f.westKey
              ? (K(
                  "Manifest! Piecz\u0119\u0107 pocztowa znowu ma sens. Masz 40 groszy i punkt. Id\u017A do Basi na po\u0142udnie, je\u015Bli jeszcze nie masz Odznaki.",
                ),
                p.f.westDone ||
                  ((p.f.westDone = !0),
                  (p.coins += 40),
                  (p.pts += 1),
                  (p.dirty = !0),
                  api.G(p, "chest"),
                  api.fe(p)),
                U())
              : (K(
                  p.f.westQ
                    ? p.f.golem
                      ? "Golem le\u017Cy? Manifest powinien b\u0142yszcze\u0107 w Depocie."
                      : "Pola Ticket\xF3w na zach\xF3d, potem Depot na p\xF3\u0142nocy p\xF3l. Golem Paczek nie lubi, gdy kto\u015B skanuje jego etykiety."
                    : "Zach\xF3d tonie w ticketach \u201Egdzie moja paczka\u201D. Przynie\u015B Manifest z Depotu \u2014 otworzy p\xF3\u0142 portalu.",
                ),
                p.f.westQ ||
                  ae("Wezm\u0119 si\u0119 za paczki", () => {
                    ((p.f.westQ = !0), (p.dirty = !0), api.pinNav(p, "west", !0), api.fe(p), Se("westjob"));
                  }),
                B("depot", "Gdzie dok\u0142adnie Depot?"),
                B("westjob", "Jacy wrogowie?"),
                U())
            : (K(
                "Naczelnik Piotr, poczta Wioski. Paczki gin\u0105 na zachodzie. Pogadaj z Bogdanem, jak sko\u0144czysz z Kryszta\u0142em \u2014 wtedy pogadamy o Manife\u015Bcie.",
              ),
              U())
          : X === "westjob"
            ? (K(
                "Tickety strzelaj\u0105 papierem po wykrzykniku. Biegacze \u0142aduj\u0105 z\u0142otym b\u0142yskiem. Tarcze \u2014 od ty\u0142u albo Wirem. Powodzenia.",
              ),
              U("Id\u0119"))
            : X === "depot" &&
              (K(
                "P\xF3\u0142nocny kraniec Zachodnich P\xF3l. D\u017Awignia otwiera bram\u0119 do sali Golema. We\u017A kaw\u0119 z kapliczki po drodze.",
              ),
              B("", "Wr\xF3\u0107"));
      else if (m === "basia")
        X === ""
          ? p.f.act2
            ? p.f.southKey
              ? (K(
                  "Odznaka Eskalacji! M\xF3j dashboard wreszcie zielony. 40 groszy i punkt. Portal w Call Center Cieni \u2014 zielone V.",
                ),
                p.f.southDone ||
                  ((p.f.southDone = !0),
                  (p.coins += 40),
                  (p.pts += 1),
                  (p.dirty = !0),
                  api.G(p, "chest"),
                  api.fe(p)),
                U())
              : (K(
                  p.f.southQ
                    ? p.f.phantom
                      ? "Upi\xF3r ucich\u0142? Odznaka le\u017Cy w Call Center."
                      : "Bagna \u2192 Call Center. Hold music zabija. Upi\xF3r miga i skacze \u2014 unikaj cienia."
                    : "Po\u0142udnie: Bagna SLA. Zombie z helpdesku, telefony przywo\u0142uj\u0105ce. W Call Center Upi\xF3r Hold Music strze\u017Ce Odznaki.",
                ),
                p.f.southQ ||
                  ae("Zmniejsz\u0119 timeout", () => {
                    ((p.f.southQ = !0), (p.dirty = !0), api.pinNav(p, "south", !0), api.fe(p), Se("southjob"));
                  }),
                B("swamp", "Jak przej\u015B\u0107 bagna?"),
                B("southjob", "Na co uwa\u017Ca\u0107?"),
                U())
            : (K(
                "Basia, analityczka SLA. Bagna na po\u0142udniu przekraczaj\u0105 timeout. Wr\xF3\u0107, gdy Bogdan og\u0142osi Act 2 \u2014 znaczy, gdy Kryszta\u0142 znowu zawiedzie.",
              ),
              U())
          : X === "southjob"
            ? (K(
                "Telefony dzwoni\u0105 zielonym wykrzyknikiem, potem spawnuj\u0105 zombie. Upi\xF3r \u2014 jak Kr\xF3l Glut\xF3w, tylko z echem hold music. Kapliczki lecz\u0105.",
              ),
              U("Id\u0119"))
            : X === "swamp" &&
              (K(
                "Trzymaj si\u0119 \u015Bcie\u017Cki z kafelk\xF3w. Woda gryzie ruch. Call Center na po\u0142udniowym wschodzie bagien.",
              ),
              B("", "Wr\xF3\u0107"));
      else if (m === "ghost")
        X === ""
          ? (K(
              "By\u0142em agentem helpdesku. Teraz duchem. Hold music... nigdy nie milknie. Lichwa Lidia w Sali Eskalacji (po\u0142udnie hubu) trzyma Token Root. Magini mo\u017Ce ode mnie wzi\u0105\u0107 Migni\u0119cie, Mr\xF3z i Barier\u0119.",
            ),
            B("lich", "Kim jest Lidia?"),
            B("how", "Jak przetrwa\u0107?"),
            B("train", "Naucz magii Aktu 2+"),
            U("Dzi\u0119ki, duchu"))
          : X === "train"
            ? (K(
                "Migni\u0119cie, Mr\xF3z SLA, Bariera Kolejkowa. Magini w pe\u0142ni, inni na p\xF3\u0142 gwizdka. Ceny hurtowe helpdesku.",
              ),
              (V = api.Ui.filter(($) => api.Pt[$].trainer === "ghost").map(($) => Xn($, !0))),
              B("", "Wr\xF3\u0107"),
              U())
            : X === "lich"
              ? (K(
                  "Lidia eskalowa\u0142a ka\u017Cde zg\u0142oszenie w niesko\u0144czono\u015B\u0107, a\u017C zosta\u0142a lichem. Strzela ticketami i skacze. Zostaw j\u0105 na koniec, zbierz si\u0142y w Krypcie Hold Music na p\xF3\u0142nocy.",
                ),
                B("", "Wr\xF3\u0107"))
              : X === "how" &&
                (K(
                  "Kapliczki tu dzia\u0142aj\u0105. Zombie wolne, ale bol\u0105. Telefony najpierw migaj\u0105. A Ostrze Eskalacji z Lichwy przebija tarcze \u2014 Wanda b\u0119dzie zazdrosna.",
                ),
                B("", "Wr\xF3\u0107"));
      else if (m === "lidia")
        (p.f.lich
          ? K("(Pozosta\u0142 tylko szkielet s\u0142uchawki i nuta hold music.)")
          : K(
              "Lichwa Lidia: Twoje zg\u0142oszenie... jest... dla nas... wa\u017Cne... Prosz\u0119... czeka\u0107... na... zawsze...",
            ),
          U("..."));
      else if (m === "horacy")
        X === ""
          ? (K(
              "Tik-tak... Horacy, zegarmistrz. Wieża tyka, bo ja ją nakręcam — nie dlatego, że świat jest punktualny." +
                (p.f.bogdan && !p.f.gearQ
                  ? " Przy ostatniej burzy wiatrak na Łące połknął główną zębatkę. Od tamtej pory wieża spóźnia się o kwadrans."
                  : ""),
            ),
            p.f.bogdan && !p.f.gearQ && B("gears", "Czemu zegar sp\xF3\u017Ania?"),
            p.f.gearQ && p.f.gearFound && !p.f.gearDone
              ? ae("Oddaj z\u0119batk\u0119", () => {
                  ((p.f.gearDone = !0),
                    (p.coins += 30),
                    (p.pts += 1),
                    (p.bonusHp += 2),
                    (p.hp = Math.min(api.Ze(p), p.hp + 2)),
                    (p.dirty = !0),
                    api.G(p, "chest"),
                    api.fe(p),
                    Se("gearok"));
                })
              : p.f.gearQ &&
                !p.f.gearDone &&
                K(
                  "Z\u0119batka powinna by\u0107 na strychu M\u0142yna na \u0141\u0105ce. W\u0119\u017Ce pilnuj\u0105 zardzewia\u0142ych k\xF3\u0142.",
                ),
            p.f.seal && B("tick", "Co s\u0142ycha\u0107 w mechanizmie?"),
            U())
          : X === "gears"
            ? (K(
                "Ta sama historia, bez drugiego dna: burza, wiatrak na Łące, zębatka na strychu Młyna. Węże pilnują zardzewiałych kół. Przynieś ją, a oddam grosz i trochę twardości.",
              ),
              ae("Poszukam z\u0119batki", () => {
                ((p.f.gearQ = !0), (p.dirty = !0), api.pinNav(p, "gear", !0), api.fe(p), Se(""));
              }),
              B("", "Mo\u017Ce p\xF3\u017Aniej"))
            : X === "gearok"
              ? (K(
                  "Pi\u0119knie z\u0119bi! +30 groszy, punkt rozwoju i +2 maksymalne zdrowie. Tik-tak zn\xF3w r\xF3wny.",
                ),
                U())
              : X === "tick" &&
                (K(
                  p.f.boss
                    ? "Kryszta\u0142 zn\xF3w tyka w rytmie odpowiedzi. Lubi\u0119, gdy \u015Bwiat ma deadline."
                    : "Ruinowy mechanizm wr\xF3t... kto\u015B ci\u0105gle resetuje timer. Uwa\u017Caj na boty.",
                ),
                B("", "Wr\xF3\u0107"));
      else if (m === "iga") {
        let $ = api.Dk(p),
          re = api.Rk(p);
        if (X === "")
          (K(
            "Iga Apteczna. Gotuj\u0119 eliksiry z tego, co support odrzuci\u0142 jako \u201Enie jest bugiem\u201D. Pe\u0142ne zdrowie, pe\u0142na mana \u2014 i zero hold music w butelce. Kapliczek coraz mniej, wi\u0119c butelki schodz\u0105 jak ciep\u0142e bu\u0142ki.",
          ),
            B("shop", "Poka\u017C eliksiry"),
            B("tip", "Czemu kapliczki znikaj\u0105?"),
            U());
        else if (X === "shop") {
          K(
            "Limit " +
              api.vi +
              " sztuk ka\u017Cdego. Ceny rosn\u0105 z aktem (teraz HP " +
              $ +
              " gr, MP " +
              re +
              " gr). Przyciski eliksir\xF3w pojawi\u0105 si\u0119 pod mapk\u0105, gdy co\u015B kupisz.",
          );
          let We = (nt) => {
            let Ln = nt === "hp" ? $ : re;
            if ((nt === "hp" ? p.potsHp : p.potsMp) >= api.vi) {
              Se("full");
              return;
            }
            if (p.coins < Ln) {
              Se("broke");
              return;
            }
            ((p.coins -= Ln),
              nt === "hp" ? p.potsHp++ : p.potsMp++,
              api.G(p, "coin"),
              api.fe(p),
              xt(),
              Se("bought"));
          };
          (ae(
            "Eliksir zdrowia (pe\u0142ne HP) \u2014 " + $ + " gr [" + p.potsHp + "/" + api.vi + "]",
            () => We("hp"),
          ),
            ae(
              "Eliksir many (pe\u0142na MP) \u2014 " + re + " gr [" + p.potsMp + "/" + api.vi + "]",
              () => We("mp"),
            ),
            B("", "Wr\xF3\u0107"));
        } else
          X === "bought"
            ? (K(
                "Prosz\u0119, nie wstrz\u0105sa\u0107. Chyba \u017Ce lubisz niespodzianki typu \u201Ezmiana priorytetu ticketu\u201D.",
              ),
              B("shop", "Jeszcze co\u015B"),
              U())
            : X === "full"
              ? (K(
                  "Plecak bulgocze. Limit " +
                    api.vi +
                    ". Wypij co\u015B, zanim kupisz wi\u0119cej \u2014 nie jestem magazynem Allegro.",
                ),
                B("shop", "Wr\xF3\u0107 do sklepu"),
                U())
              : X === "broke"
                ? (K(
                    "Grosze najpierw, b\u0105belki p\xF3\u017Aniej. Support te\u017C tak m\xF3wi, tylko nic nie daje.",
                  ),
                  B("shop", "Wr\xF3\u0107"))
                : X === "tip" &&
                  (K(
                    "Kapliczki? Kto\u015B je wycina\u0142 jak zb\u0119dne feature'y. Zosta\u0142o ich ma\u0142o \u2014 i \u017Cadnej przy bossach. Dlatego ja sprzedaj\u0119 butelki. Tik-tak, zdrowie nie poczeka.",
                  ),
                  B("", "Wr\xF3\u0107"));
      }
      if (!Ge && X === "") {
        let $ = api.Zp(p, m);
        $.lines.forEach(K);
        let re = J.splice(Math.max(0, J.length - 1));
        ($.opts.forEach(Ce), J.push(...re));
      }
      return (0, api.h.jsxs)("div", {
        children: [
          (0, api.h.jsx)("div", {
            style: { display: "grid", gap: 8 },
            children: A.map(($, re) =>
              (0, api.h.jsx)(
                "div",
                { style: { fontSize: 16, lineHeight: "23px", color: E.text }, children: $ },
                re,
              ),
            ),
          }),
          V &&
            (0, api.h.jsxs)("div", {
              style: { display: "grid", gap: 8, marginTop: 12 },
              children: [
                (0, api.h.jsxs)("div", {
                  style: { display: "flex", gap: 8, flexWrap: "wrap" },
                  children: [Je("Grosze: " + p.coins), Je("Poziom: " + p.lvl, E.cyan)],
                }),
                V,
              ],
            }),
          J.length > 0 &&
            (0, api.h.jsx)("div", {
              style: { display: "grid", gap: 6, marginTop: 12 },
              children: J.map(($, re) =>
                (0, api.h.jsx)(
                  "button",
                  {
                    style: {
                      ...(re === 0 ? Ut : Zt),
                      textAlign: "left",
                      fontSize: 15,
                      minHeight: 46,
                      margin: 0,
                    },
                    onClick: (We) => {
                      api.Ih(le.current, performance.now(), We.detail > 0) && $.fn();
                    },
                    children: "\u25B8 " + $.label,
                  },
                  re,
                ),
              ),
            }),
        ],
      });
    },
    pinTo = (id) => {
      if (!p) return;
      (api.pinNav(p, id, !0), api.fe(p), (ft.current = ""));
      let row = api.navGoal(p);
      (N((m) => ({ ...m, goal: row.text, nav: p.nav || "" })), xt());
    },
    navRows = (compact) => {
      if (!p) return null;
      let pin = api.activeNav(p),
        rows = api.navChoices(p).filter((c) => !c.done || c.id === "main");
      if (compact && rows.length < 2) return null;
      return rows.map((c) =>
        (0, api.h.jsxs)(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr) auto",
              gap: 8,
              alignItems: "center",
            },
            children: [
              (0, api.h.jsxs)("div", {
                style: { minWidth: 0 },
                children: [
                  (0, api.h.jsx)("div", {
                    style: {
                      fontSize: compact ? 14 : 15,
                      fontWeight: 700,
                      color: pin === c.id ? E.gold : E.text,
                      lineHeight: "18px",
                    },
                    children: c.title,
                  }),
                  !compact &&
                    (0, api.h.jsx)("div", {
                      style: { fontSize: 13, color: E.faint, lineHeight: "17px", marginTop: 2 },
                      children: c.detail,
                    }),
                ],
              }),
              (0, api.h.jsx)("button", {
                type: "button",
                "aria-pressed": pin === c.id,
                "aria-label":
                  (pin === c.id ? "Strza\u0142ka ju\u017C prowadzi: " : "Prowad\u017A strza\u0142k\u0119: ") +
                  c.title,
                style: {
                  ...(pin === c.id ? Ut : Zt),
                  margin: 0,
                  minHeight: 44,
                  padding: "6px 10px",
                  fontSize: 13,
                  whiteSpace: "nowrap",
                },
                onClick: (ev) => {
                  (ev.stopPropagation(), pin !== c.id && pinTo(c.id));
                },
                children: pin === c.id ? "Prowadzi" : "Prowad\u017A",
              }),
            ],
          },
          c.id,
        ),
      );
    },
    R2 = () => {
      if (!p) return null;
      let m = p.f,
        I = [
          ["Porozmawiaj z mistrzem Bogdanem", !!m.bogdan],
          ["Oczy\u015B\u0107 piwnic\u0119 karczmy dla Mietka", !!m.cellarDone],
          ["Pokonaj Kr\xF3la Glut\xF3w", !!m.king],
          ["Zdob\u0105d\u017A Piecz\u0119\u0107 Lasu", !!m.seal],
          ["Poci\u0105gnij d\u017Awigni\u0119 w Ruinach", !!m.lever1],
          ["Dopchnij blok na p\u0142yt\u0119", !!m.plate],
          ["Zapal 3 kryszta\u0142y", !!m.gate],
          ["We\u017A Klucz Eskalacji", !!m.key],
          ["Otw\xF3rz drzwi do Serwerowni", !!m.door],
          ["Pokonaj SUPPORT-BOTA 3000", !!m.boss],
          ["Dotknij Kryszta\u0142u Odpowiedzi", !!m.won],
          ["Rozpocznij Act 2 u Bogdana", !!m.act2],
          ["Zdob\u0105d\u017A Manifest Paczek (zach\xF3d)", !!m.westKey],
          ["Zdob\u0105d\u017A Odznak\u0119 Eskalacji (po\u0142udnie)", !!m.southKey],
          ["Wejd\u017A do Krainy Nieumar\u0142ego Supportu", !!m.undead],
          ["Pokonaj Lichw\u0119 Lidi\u0119", !!m.lich],
          [
            "Akt 3: Cmentarzysko, labirynt, przedpok\xF3j",
            !!m.cem,
          ],
          ["Pokonaj Kozacki Root", !!m.kozacki],
          ["U\u017Cyj Tokenu Root na Krysztale", !!m.root],
          ["Pokonaj AUDYT-BOTA w Archiwum", !!m.audit],
          ["Protok\xF3\u0142 zamkni\u0119cia u Romy", !!m["sqd:rom1"]],
        ],
        A = [];
      (m.catQ && A.push(["Babcia Jadzia: znajd\u017A Mruczka na \u0141\u0105ce", !!m.catDone]),
        m.nestQ && A.push(["My\u015Bliwy Zenek: gniazda spamu " + api.Ds(p) + "/3", !!m.nestDone]),
        m.mushQ && A.push(["Wied\u017Ama Halina: grzyby " + api.Ns(p) + "/5", !!m.mushDone]),
        m.luteQ &&
          A.push([
            "Bard Zbyszek: lutnia z Ruin" + (m.luteFound && !m.luteDone ? " (odnie\u015B)" : ""),
            !!m.luteDone,
          ]),
        m.gearQ &&
          A.push([
            "Zegarmistrz Horacy: z\u0119batka ze strychu M\u0142yna" +
              (m.gearFound && !m.gearDone ? " (odnie\u015B)" : ""),
            !!m.gearDone,
          ]),
        m.westQ && A.push(["Naczelnik Piotr: Manifest z Depotu", !!m.westDone]),
        m.southQ && A.push(["Analityczka Basia: Odznaka z Call Center", !!m.southDone]));
      for (let U of api.Qi)
        m["sq:" + U.id] &&
          A.push([
            api.Zn[U.giver] + ": " + U.name + (m["sqd:" + U.id] ? "" : " \u2014 " + api.Gp(p, U)),
            !!m["sqd:" + U.id],
          ]);
      let J = [
          ["Babcine oszcz\u0119dno\u015Bci (Wioska)", !!p.cut["chest:cache"]],
          [
            "Kryszta\u0142 Many za p\u0119kni\u0119t\u0105 \u015Bcian\u0105 (\u0141\u0105ka)",
            !!p.cut["chest:mana"],
          ],
          ["Sekretny Ogr\xF3d za zaro\u015Blami (Las)", !!p.cut["chest:serce"]],
          ["Skarb za p\u0119kni\u0119ciem w zachodnim skrzydle (Ruiny)", !!p.cut["chest:kusza"]],
          ["Skr\xF3t z korytarza do sali wej\u015Bciowej (Ruiny)", !!m.lever2],
          ["Skrzynia na Polach Ticket\xF3w", !!p.cut["chest:westcache"]],
          ["Skrzynia w Depocie", !!p.cut["chest:depot"]],
          ["Skrzynia na Bagnach SLA", !!p.cut["chest:swamp"]],
          ["Skrzynia w Krainie Nieumar\u0142ych", !!p.cut["chest:undead1"]],
          ["Skrzynia w Krypcie Hold Music", !!p.cut["chest:crypt"]],
          ["Piwnica Jadzi", !!p.cut["chest:jadziacell"]],
          ["Strych Piotra", !!p.cut["chest:piotratt"]],
          ["Strych M\u0142yna", !!p.cut["chest:millloft"]],
          ["Korzenie Chatki", !!p.cut["chest:hutroot"]],
        ],
        K = [];
      for (let U of I) if ((K.push(U), !U[1])) break;
      let ae = J.filter((U) => U[1]),
        B = (U) =>
          U.map((V, Ce) =>
            (0, api.h.jsxs)(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "22px minmax(0,1fr)",
                  gap: 6,
                  alignItems: "start",
                  fontSize: 14,
                  lineHeight: "19px",
                  color: V[1] ? E.faint : E.text,
                },
                children: [
                  (0, api.h.jsx)("span", {
                    style: { color: V[1] ? E.green : E.gold, fontWeight: 700 },
                    children: V[1] ? "\u2713" : "\u25CB",
                  }),
                  (0, api.h.jsx)("span", {
                    style: { textDecoration: V[1] ? "line-through" : "none" },
                    children: V[0],
                  }),
                ],
              },
              Ce,
            ),
          );
      return (0, api.h.jsxs)("div", {
        children: [
          Ee(
            "Strza\u0142ka",
            (0, api.h.jsxs)(api.h.Fragment, {
              children: [
                (0, api.h.jsx)("div", {
                  style: { fontSize: 16, lineHeight: "22px", color: E.text },
                  children: api.navGoal(p).text,
                }),
                Qe(
                  "\u017B\xF3\u0142ta strza\u0142ka i punkt na mapie id\u0105 za wybranym zadaniem. Poboczne te\u017C \u2014 przycisk Prowad\u017A.",
                ),
                navRows(!1),
              ],
            }),
            Je(api.navTitle(p)),
          ),
          Ee(
            "Mapa: " + api.Cn(p).name,
            (0, api.h.jsxs)(api.h.Fragment, {
              children: [
                (0, api.h.jsx)("canvas", {
                  ref: s,
                  style: {
                    width: "100%",
                    maxWidth: 520,
                    imageRendering: "pixelated",
                    display: "block",
                    boxShadow: `0 0 0 2px ${E.ink}`,
                  },
                }),
                Qe(
                  "Bia\u0142y punkt to Ty, \u017C\xF3\u0142ty to wybrany cel lub wyj\u015Bcie w jego stron\u0119. Ciemne pola s\u0105 jeszcze nieodkryte.",
                ),
              ],
            }),
          ),
          Qe(
            "Dziennik zapisuje tylko to, co ju\u017C odkry\u0142a\u015B. Rozmawiaj z lud\u017Ami, zagl\u0105daj w ka\u017Cdy k\u0105t, a nowe wpisy pojawi\u0105 si\u0119 same.",
          ),
          Ee("G\u0142\xF3wny w\u0105tek", B(K), Je("\u2713 " + I.filter((U) => U[1]).length)),
          Ee(
            "Zadania poboczne",
            A.length
              ? B(A)
              : (0, api.h.jsx)("div", {
                  style: { fontSize: 14, color: E.dim },
                  children:
                    "Jeszcze \u017Cadnych. Ludzie w okolicy na pewno czego\u015B potrzebuj\u0105 \u2014 wystarczy zagada\u0107.",
                }),
            A.length ? Je("\u2713 " + A.filter((U) => U[1]).length) : null,
          ),
          Ee(
            "Sekrety",
            ae.length
              ? B(ae)
              : (0, api.h.jsx)("div", {
                  style: { fontSize: 14, color: E.dim },
                  children:
                    "Nic jeszcze nie odkry\u0142a\u015B. Sekrety same si\u0119 nie znajd\u0105.",
                }),
            ae.length ? Je("\u2713 " + ae.length) : null,
          ),
        ],
      });
    },
    Va = (m, I, A, J) =>
      (0, api.h.jsx)("div", {
        style: { ...j2, gap: m.length > 5 ? 6 : 10 },
        children: m.map((K, ae) =>
          (0, api.h.jsxs)(
            "button",
            {
              style: {
                ...Rn(I === ae),
                display: "flex",
                alignItems: "center",
                gap: 6,
                ...(m.length > 5 ? { padding: "8px 10px", fontSize: 14 } : {}),
              },
              onClick: () => A(ae),
              children: [
                J &&
                  (0, api.h.jsx)("span", {
                    style: {
                      width: 14,
                      height: 14,
                      background: J[ae],
                      display: "inline-block",
                      border: `2px solid ${E.ink}`,
                    },
                  }),
                K,
              ],
            },
            K,
          ),
        ),
      }),
    ud = Be || (p ? p.settings.touch : !1),
    N2 = api.Ls()
      ? "Zapis trwa\u0142y w tej przegl\u0105darce (automatyczny)."
      : "Ta przegl\u0105darka blokuje pami\u0119\u0107: zapis dzia\u0142a tylko w tej sesji. Skopiuj kod zapisu, \u017Ceby wr\xF3ci\u0107 p\xF3\u017Aniej.",
    Yn = Xf || $f,
    kn = Math.max(240, qn.w),
    hn = Math.max(200, qn.h),
    mt = kn > hn * 1.15,
    Nn = Math.max(1, Math.floor(Math.min(kn, hn) / 180)),
    Js = Math.ceil(kn / Nn),
    Xs = Math.ceil(hn / Nn),
    Ys = Math.min(kn, hn),
    Hh = Math.round(Math.min(160, Math.max(112, Ys * 0.34))),
    Bh = Math.round(Math.min(108, Math.max(78, Ys * 0.24))),
    Gh = Math.round(Math.min(66, Math.max(52, Ys * 0.15))),
    Fh = 40 * Nn,
    L2 = Yf > 0 ? Yf + "px" : "100dvh",
    K2 = { ...Ti, minHeight: 44, padding: "8px 12px", fontSize: 14, whiteSpace: "nowrap" },
    fd = Yn ? "Zamknij pe\u0142ny ekran" : "Graj na pe\u0142nym ekranie",
    Yi = (m, I) => ({
      width: "100%",
      maxWidth: m,
      maxHeight: "100%",
      display: "flex",
      flexDirection: "column",
      background: "rgba(32,21,46,0.96)",
      boxShadow: Vs(E.woodL, E.woodD),
      overflow: "hidden",
      boxSizing: "border-box",
      color: E.text,
      ...I,
    }),
    ea = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
      padding: "10px 12px",
      background: E.panel,
      boxShadow: `inset 0 -2px 0 ${E.ink}, inset 0 -4px 0 ${E.panel2}`,
      flexShrink: 0,
      flexWrap: "wrap",
    },
    ta = {
      padding: 12,
      overflowY: "auto",
      overscrollBehavior: "contain",
      WebkitOverflowScrolling: "touch",
      flex: "1 1 auto",
      minHeight: 0,
      touchAction: "pan-y",
    },
    qa = {
      display: "flex",
      gap: 8,
      padding: "10px 12px",
      background: E.panel,
      boxShadow: `inset 0 2px 0 ${E.ink}, inset 0 4px 0 ${E.panel2}`,
      flexShrink: 0,
      flexWrap: "wrap",
      justifyContent: "flex-end",
    },
    na = (m) => ({
      position: "absolute",
      inset: 0,
      padding: 14,
      display: "flex",
      alignItems: m === "center" ? "center" : "flex-end",
      justifyContent: "center",
      boxSizing: "border-box",
      zIndex: 5,
      lineHeight: "normal",
      touchAction: "auto",
      pointerEvents: "auto",
    }),
    O2 = ["Imi\u0119", "Wygl\u0105d", "Str\xF3j", "Klasa"],
    dd = (0, api.h.jsxs)("div", {
      children: [
        (0, api.h.jsx)("div", {
          style: { ...Lt, color: E.text },
          children:
            "Telefon: joystick w lewym dolnym rogu, \u2694 ATAK i umiej\u0119tno\u015Bci w prawym. Przytrzymany ATAK strzela seriami dopiero po nauce odpowiedniej umiej\u0119tno\u015Bci.",
        }),
        (0, api.h.jsx)("div", {
          style: { ...Lt, marginTop: 8 },
          children:
            "Klawiatura: WASD lub strza\u0142ki ruch, Spacja/J atak, E rozmowa/d\u017Awignia, K umiej\u0119tno\u015B\u0107, L/Shift doskok, Q zmiana broni, P/Esc menu.",
        }),
        (0, api.h.jsx)("div", {
          style: { ...Lt, marginTop: 8 },
          children:
            "Poziomy daj\u0105 punkty do Si\u0142y, Witalno\u015Bci, Zr\u0119czno\u015Bci i Umys\u0142u. Umiej\u0119tno\u015Bci ucz\u0105 ludzie, kt\xF3rych spotkasz po drodze. Na poziomie 5 wybierasz specjalizacj\u0119. Kapliczki lecz\u0105 i zapisuj\u0105.",
        }),
      ],
    }),
    Ja = (m, I, A) =>
      (0, api.h.jsxs)(api.h.Fragment, {
        children: [
          (0, api.h.jsx)("span", { style: { fontSize: A, lineHeight: 1 }, children: m }),
          (0, api.h.jsx)("span", { style: { fontSize: 11, marginTop: 2 }, children: I }),
        ],
      }),
    el = {
      ...Ti,
      width: 46,
      height: 46,
      minHeight: 46,
      padding: 0,
      margin: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      position: "relative",
      boxSizing: "border-box",
      WebkitTapHighlightColor: "transparent",
      userSelect: "none",
      touchAction: "none",
    },
    I2 = (0, api.h.jsxs)("svg", {
      width: "26",
      height: "22",
      viewBox: "0 0 13 11",
      shapeRendering: "crispEdges",
      style: { display: "block", pointerEvents: "none" },
      children: [
        (0, api.h.jsx)("rect", { x: "0", y: "0", width: "13", height: "11", fill: E.ink }),
        (0, api.h.jsx)("rect", { x: "1", y: "1", width: "5", height: "8", fill: "#f4ecd8" }),
        (0, api.h.jsx)("rect", { x: "7", y: "1", width: "5", height: "8", fill: "#f4ecd8" }),
        (0, api.h.jsx)("rect", { x: "6", y: "1", width: "1", height: "9", fill: E.woodD }),
        (0, api.h.jsx)("rect", { x: "2", y: "3", width: "3", height: "1", fill: E.stoneL }),
        (0, api.h.jsx)("rect", { x: "2", y: "5", width: "3", height: "1", fill: E.stoneL }),
        (0, api.h.jsx)("rect", { x: "8", y: "3", width: "3", height: "1", fill: E.stoneL }),
        (0, api.h.jsx)("rect", { x: "8", y: "5", width: "2", height: "1", fill: E.stoneL }),
        (0, api.h.jsx)("rect", { x: "1", y: "9", width: "11", height: "1", fill: E.woodL }),
        (0, api.h.jsx)("rect", { x: "9", y: "0", width: "2", height: "4", fill: "#c0283c" }),
      ],
    }),
    cd = (m) =>
      (0, api.h.jsx)("div", {
        ref: m,
        style: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "0%",
          background: "rgba(10,5,20,0.6)",
          pointerEvents: "none",
        },
      });
  let pokeTitle = () => {
      if (godAsk || godHot) return;
      let g = godTap.current;
      g.n++;
      g.n >= 7 && ((g.n = 0), setGodPw(""), setGodBad(""), setGodAsk(!0));
    },
    sealTitle = () => {
      if (api.godMatch(godPw)) {
        (api.godUnlock(),
          u.current && api.godBind(u.current),
          setGodHot(!0),
          setGodAsk(!1),
          setGodPw(""),
          setGodBad(""),
          q("Tryb boga włączony. W grze: menu, Postać."));
        return;
      }
      setGodBad("Nie pasuje.");
    },
    godBump = (kind, key, dir) => {
      if (!p || !godHot) return;
      if (kind === "st") {
        let n = Math.max(0, Math.min(999, p.st[key] + dir));
        if (n === p.st[key]) return;
        let h0 = api.Ze(p),
          m0 = api.ut(p);
        p.st[key] = n;
        let dh = api.Ze(p) - h0,
          dm = api.ut(p) - m0;
        ((p.hp = Math.max(1, Math.min(api.Ze(p), p.hp + (dh > 0 ? dh : 0)))),
          (p.mp = Math.max(0, Math.min(api.ut(p), p.mp + (dm > 0 ? dm : 0)))));
      } else if (kind === "lvl") {
        let n = Math.max(1, Math.min(999, p.lvl + dir));
        if (n === p.lvl) return;
        p.lvl = n;
        let cap = api.$o(p.lvl);
        (p.xp >= cap && (p.xp = cap - 1),
          dir > 0
            ? ((p.hp = api.Ze(p)), (p.mp = api.ut(p)))
            : ((p.hp = Math.min(p.hp, api.Ze(p))), (p.mp = Math.min(p.mp, api.ut(p)))));
      } else if (kind === "sk") {
        let A = api.Pt[key],
          J = p.skills[key] || 0,
          n = J + dir;
        if (n < 0 || n > A.costs.length) return;
        ((p.skills[key] = n),
          n === 0 && p.active === key && (p.active = null),
          n > 0 &&
            key !== "dash" &&
            key !== "fury" &&
            key !== "seria" &&
            !p.active &&
            (p.active = key));
      }
      (api.fe(p), xt());
    },
    godToggle = (key) => {
      if (!p || !godHot) return;
      ((p.god = api.godFlip(key)), xt());
    },
    godBtn = (label, ok, fn) =>
      (0, api.h.jsx)("button", {
        style: {
          ...$a(ok),
          minWidth: label.length > 1 ? 48 : 44,
          width: label.length > 1 ? 48 : 44,
          padding: 0,
          fontSize: label.length > 1 ? 14 : 22,
        },
        disabled: !ok,
        onClick: fn,
        children: label,
      });
  return (0, api.h.jsx)("div", {
    ref: n,
    style: {
      position: Yn ? "fixed" : "relative",
      inset: Yn ? 0 : void 0,
      zIndex: Yn ? 1e3 : void 0,
      width: Yn ? "100vw" : "100%",
      height: L2,
      overflow: "hidden",
      background: "#0c0816",
      color: E.text,
      fontFamily: Ft,
      boxSizing: "border-box",
      overscrollBehavior: "none",
    },
    children: (0, api.h.jsxs)("div", {
      ref: ed,
      tabIndex: 0,
      onContextMenu: Dn,
      onKeyDown: h2,
      onKeyUp: z2,
      onBlur: (m) => {
        b.current === "play" &&
          !(m.relatedTarget instanceof Node && m.currentTarget.contains(m.relatedTarget)) &&
          mn();
      },
      style: {
        position: "absolute",
        inset: 0,
        outline: "none",
        overflow: "hidden",
        touchAction: M === "play" ? "none" : "manipulation",
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
        WebkitTapHighlightColor: "transparent",
      },
      children: [
        (0, api.h.jsxs)("div", {
          ref: i,
          tabIndex: -1,
          onPointerDown: () => {
            (Ga(), En());
          },
          style: {
            position: "absolute",
            left: 0,
            top: 0,
            width: Js * Nn,
            height: Xs * Nn,
            outline: "none",
            lineHeight: 0,
            touchAction: "none",
          },
          children: [
            (0, api.h.jsx)("canvas", {
              ref: t,
              width: Js,
              height: Xs,
              style: {
                width: Js * Nn,
                height: Xs * Nn,
                display: "block",
                imageRendering: "pixelated",
              },
            }),
            M === "menu" &&
              (0, api.h.jsx)("button", {
                type: "button",
                "aria-label": "Gryzelda",
                onClick: (m) => {
                  (m.stopPropagation(), pokeTitle());
                },
                style: (() => {
                  let a = Math.round((api.oe - 320) / 2),
                    r = Math.round((api.de - 180) * 0.45),
                    cx = a + 160,
                    cy = r + 46,
                    w = Math.min(Math.max(80, api.oe - 8), 220),
                    left = Math.max(0, Math.round(cx - w / 2)),
                    top = Math.max(0, Math.round(cy - 28));
                  return {
                    position: "absolute",
                    left: left * Nn,
                    top: top * Nn,
                    width: w * Nn,
                    height: Math.min(64, Math.max(36, api.de * 0.22)) * Nn,
                    padding: 0,
                    margin: 0,
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "transparent",
                    cursor: "pointer",
                    pointerEvents: "auto",
                    zIndex: 2,
                  };
                })(),
              }),
          ],
        }),
        (0, api.h.jsx)("div", {
          style: {
            position: "absolute",
            inset: 0,
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
            paddingLeft: "env(safe-area-inset-left)",
            paddingRight: "env(safe-area-inset-right)",
            boxSizing: "border-box",
            pointerEvents: "none",
          },
          children: (0, api.h.jsxs)("div", {
            style: { position: "relative", width: "100%", height: "100%", pointerEvents: "none" },
            children: [
              M === "play" &&
                (0, api.h.jsxs)(api.h.Fragment, {
                  children: [
                    (0, api.h.jsxs)("div", {
                      style: {
                        position: "absolute",
                        left: "50%",
                        top: he.top.y,
                        transform: "translateX(-50%)",
                        display: "flex",
                        gap: 6,
                        pointerEvents: "auto",
                      },
                      children: [
                        (0, api.h.jsxs)("button", {
                          ref: ze,
                          "aria-label": "Strza\u0142ka: wybierz zadanie",
                          style: el,
                          onClick: () => {
                            Q ? W(!1) : (W(!0), ie(P.goal));
                          },
                          children: [
                            I2,
                            P.goal !== _ &&
                              (0, api.h.jsx)("span", {
                                style: {
                                  position: "absolute",
                                  right: 3,
                                  top: 3,
                                  width: 8,
                                  height: 8,
                                  background: E.gold,
                                  boxShadow: `0 0 0 2px ${E.ink}`,
                                },
                              }),
                          ],
                        }),
                        (0, api.h.jsxs)("button", {
                          "aria-label": "Menu" + (P.pts ? ": " + P.pts + " do rozdania" : ""),
                          style: {
                            ...el,
                            background: E.wood,
                            boxShadow: `0 0 0 2px ${E.ink}, inset 0 3px 0 ${E.woodL}, inset 0 -4px 0 ${E.woodD}`,
                          },
                          onClick: od,
                          children: [
                            "\u275A\u275A",
                            P.pts > 0 &&
                              (0, api.h.jsx)("span", {
                                style: {
                                  position: "absolute",
                                  right: -6,
                                  top: -6,
                                  minWidth: 18,
                                  height: 18,
                                  padding: "0 3px",
                                  background: E.gold,
                                  color: E.ink,
                                  fontSize: 12,
                                  lineHeight: "18px",
                                  boxShadow: `0 0 0 2px ${E.ink}`,
                                },
                                children: "+" + P.pts,
                              }),
                          ],
                        }),
                        (0, api.h.jsx)("button", {
                          "aria-label": fd,
                          style: el,
                          onClick: Fs,
                          children: Yn ? "\u2921" : "\u26F6",
                        }),
                      ],
                    }),
                    (P.potsHp > 0 || P.potsMp > 0) &&
                      (0, api.h.jsxs)("div", {
                        style: {
                          position: "absolute",
                          right: Math.max(6, 3 * Nn),
                          top: 66 * Nn,
                          display: "flex",
                          gap: 6,
                          pointerEvents: "auto",
                          zIndex: 5,
                        },
                        children: [
                          P.potsHp > 0 &&
                            (0, api.h.jsxs)("button", {
                              "aria-label": "Eliksir zdrowia \xD7" + P.potsHp,
                              disabled: P.potsHp <= 0,
                              onPointerDown: (m) => {
                                (m.preventDefault(),
                                  m.stopPropagation(),
                                  En(),
                                  api.jf(ve.current, performance.now()) &&
                                    b.current === "play" &&
                                    (w.current.potHp = !0));
                              },
                              onContextMenu: Dn,
                              style: {
                                width: 40,
                                height: 40,
                                minHeight: 40,
                                padding: 0,
                                border: "none",
                                borderRadius: 0,
                                imageRendering: "pixelated",
                                cursor: P.potsHp > 0 ? "pointer" : "default",
                                opacity: P.potsHp > 0 ? 1 : 0.4,
                                background: E.panel,
                                boxShadow: `0 0 0 2px ${E.ink}, inset 0 0 0 2px ${E.red}`,
                                color: E.text,
                                fontFamily: Ft,
                                fontSize: 11,
                                fontWeight: 700,
                                touchAction: "none",
                                position: "relative",
                              },
                              children: [
                                (0, api.h.jsx)("span", {
                                  style: {
                                    display: "block",
                                    width: 14,
                                    height: 18,
                                    margin: "4px auto 0",
                                    background: "#ff8fa3",
                                    boxShadow: `inset 2px 2px 0 #fff, 0 0 0 1px ${E.ink}`,
                                  },
                                }),
                                (0, api.h.jsx)("span", {
                                  style: {
                                    position: "absolute",
                                    right: 2,
                                    bottom: 1,
                                    fontSize: 11,
                                    color: E.gold,
                                  },
                                  children: "\xD7" + P.potsHp,
                                }),
                              ],
                            }),
                          P.potsMp > 0 &&
                            (0, api.h.jsxs)("button", {
                              "aria-label": "Eliksir many \xD7" + P.potsMp,
                              disabled: P.potsMp <= 0,
                              onPointerDown: (m) => {
                                (m.preventDefault(),
                                  m.stopPropagation(),
                                  En(),
                                  api.jf(ve.current, performance.now()) &&
                                    b.current === "play" &&
                                    (w.current.potMp = !0));
                              },
                              onContextMenu: Dn,
                              style: {
                                width: 40,
                                height: 40,
                                minHeight: 40,
                                padding: 0,
                                border: "none",
                                borderRadius: 0,
                                imageRendering: "pixelated",
                                cursor: P.potsMp > 0 ? "pointer" : "default",
                                opacity: P.potsMp > 0 ? 1 : 0.4,
                                background: E.panel,
                                boxShadow: `0 0 0 2px ${E.ink}, inset 0 0 0 2px #5b8cff`,
                                color: E.text,
                                fontFamily: Ft,
                                fontSize: 11,
                                fontWeight: 700,
                                touchAction: "none",
                                position: "relative",
                              },
                              children: [
                                (0, api.h.jsx)("span", {
                                  style: {
                                    display: "block",
                                    width: 14,
                                    height: 18,
                                    margin: "4px auto 0",
                                    background: "#7fa8ff",
                                    boxShadow: `inset 2px 2px 0 #fff, 0 0 0 1px ${E.ink}`,
                                  },
                                }),
                                (0, api.h.jsx)("span", {
                                  style: {
                                    position: "absolute",
                                    right: 2,
                                    bottom: 1,
                                    fontSize: 11,
                                    color: E.cyan,
                                  },
                                  children: "\xD7" + P.potsMp,
                                }),
                              ],
                            }),
                        ],
                      }),
                    Q &&
                      (0, api.h.jsxs)("div", {
                        style: {
                          position: "absolute",
                          left: "50%",
                          top: he.top.y + he.top.h + 8,
                          transform: "translateX(-50%)",
                          width: Math.min(420, kn - 24),
                          maxHeight: "46vh",
                          overflow: "auto",
                          boxSizing: "border-box",
                          background: "rgba(32,21,46,0.96)",
                          boxShadow: Vs(E.woodL, E.woodD),
                          padding: "10px 12px",
                          pointerEvents: "auto",
                        },
                        children: [
                          (0, api.h.jsxs)("div", {
                            style: {
                              display: "flex",
                              justifyContent: "space-between",
                              gap: 8,
                              alignItems: "center",
                            },
                            children: [
                              (0, api.h.jsx)("div", {
                                style: {
                                  fontSize: 12,
                                  fontWeight: 700,
                                  letterSpacing: "0.08em",
                                  color: E.cyan,
                                  textTransform: "uppercase",
                                },
                                children: "Strza\u0142ka \xB7 " + (p ? api.navTitle(p) : "cel"),
                              }),
                              (0, api.h.jsx)("button", {
                                type: "button",
                                "aria-label": "Zwi\u0144 cel",
                                style: { ...Ti, margin: 0, minHeight: 36, padding: "4px 8px", fontSize: 12 },
                                onClick: () => W(!1),
                                children: "Zwi\u0144",
                              }),
                            ],
                          }),
                          (0, api.h.jsx)("div", {
                            style: {
                              fontSize: 16,
                              lineHeight: "22px",
                              color: E.text,
                              marginTop: 4,
                            },
                            children: P.goal,
                          }),
                          (0, api.h.jsx)("div", {
                            style: {
                              display: "grid",
                              gap: 8,
                              marginTop: 10,
                            },
                            children: navRows(!0),
                          }),
                          (0, api.h.jsx)("div", {
                            style: { fontSize: 12, color: E.faint, marginTop: 8 },
                            children:
                              "Prowad\u017A prze\u0142\u0105cza strza\u0142k\u0119 tak\u017Ce na zadania poboczne. Reszta wpis\xF3w: Menu \u2192 Dziennik.",
                          }),
                        ],
                      }),
                    ud &&
                      (0, api.h.jsxs)(api.h.Fragment, {
                        children: [
                          (0, api.h.jsxs)("div", {
                            ref: a,
                            "aria-label": "Joystick",
                            onPointerDown: b2,
                            onPointerMove: v2,
                            onPointerUp: Bs,
                            onPointerCancel: Bs,
                            onLostPointerCapture: Bs,
                            onContextMenu: Dn,
                            style: {
                              position: "absolute",
                              left: he.joy.x,
                              bottom: hn - he.joy.y - he.joy.s,
                              width: he.joy.s,
                              height: he.joy.s,
                              borderRadius: 999,
                              boxSizing: "border-box",
                              background:
                                "radial-gradient(circle, rgba(43,29,58,0.35) 0%, rgba(27,20,36,0.55) 70%)",
                              border: `3px solid ${E.ink}`,
                              boxShadow: `inset 0 0 0 3px ${E.stoneL}, inset 0 0 0 7px rgba(27,20,36,0.5), 0 0 0 3px ${E.stone}, 0 0 0 5px ${E.ink}`,
                              touchAction: "none",
                              pointerEvents: "auto",
                              WebkitTouchCallout: "none",
                            },
                            children: [
                              (0, api.h.jsx)("div", {
                                style: {
                                  position: "absolute",
                                  left: "50%",
                                  top: 8,
                                  transform: "translateX(-50%)",
                                  color: E.stoneL,
                                  fontSize: 12,
                                  pointerEvents: "none",
                                },
                                children: "\u25B2",
                              }),
                              (0, api.h.jsx)("div", {
                                style: {
                                  position: "absolute",
                                  left: "50%",
                                  bottom: 8,
                                  transform: "translateX(-50%)",
                                  color: E.stoneL,
                                  fontSize: 12,
                                  pointerEvents: "none",
                                },
                                children: "\u25BC",
                              }),
                              (0, api.h.jsx)("div", {
                                style: {
                                  position: "absolute",
                                  top: "50%",
                                  left: 8,
                                  transform: "translateY(-50%)",
                                  color: E.stoneL,
                                  fontSize: 12,
                                  pointerEvents: "none",
                                },
                                children: "\u25C0",
                              }),
                              (0, api.h.jsx)("div", {
                                style: {
                                  position: "absolute",
                                  top: "50%",
                                  right: 8,
                                  transform: "translateY(-50%)",
                                  color: E.stoneL,
                                  fontSize: 12,
                                  pointerEvents: "none",
                                },
                                children: "\u25B6",
                              }),
                              (0, api.h.jsx)("div", {
                                ref: r,
                                style: {
                                  position: "absolute",
                                  width: Math.round(he.joy.s * 0.42),
                                  height: Math.round(he.joy.s * 0.42),
                                  borderRadius: 999,
                                  boxSizing: "border-box",
                                  left: "50%",
                                  top: "50%",
                                  marginLeft: -Math.round(he.joy.s * 0.21),
                                  marginTop: -Math.round(he.joy.s * 0.21),
                                  background: E.wood,
                                  border: `3px solid ${E.ink}`,
                                  boxShadow: `inset 0 4px 0 ${E.woodL}, inset 0 -5px 0 ${E.woodD}`,
                                  pointerEvents: "none",
                                },
                              }),
                            ],
                          }),
                          (0, api.h.jsx)("button", {
                            "aria-label": "Atak",
                            onPointerDown: x2,
                            onPointerUp: Gs,
                            onPointerCancel: Gs,
                            onLostPointerCapture: Gs,
                            onContextMenu: Dn,
                            style: {
                              ...Qa(he.atk.s, !0),
                              boxSizing: "border-box",
                              position: "absolute",
                              right: kn - he.atk.x - he.atk.s,
                              bottom: hn - he.atk.y - he.atk.s,
                              pointerEvents: "auto",
                            },
                            children: Ja("\u2694", "ATAK", 28),
                          }),
                          (0, api.h.jsxs)("button", {
                            "aria-label": "Umiej\u0119tno\u015B\u0107 " + (P.skill || ""),
                            onPointerDown: Jo("skill"),
                            onContextMenu: Dn,
                            style: {
                              ...Qa(he.skill.s, !1, !P.skill || !P.skillOk),
                              boxSizing: "border-box",
                              position: "absolute",
                              right: kn - he.skill.x - he.skill.s,
                              bottom: hn - he.skill.y - he.skill.s,
                              pointerEvents: "auto",
                            },
                            children: [
                              cd(As),
                              Ja("\u2726", P.skill ? P.skill.split(" ")[0] : "Umiej.", 18),
                            ],
                          }),
                          (0, api.h.jsxs)("button", {
                            "aria-label": "Doskok",
                            onPointerDown: Jo("dash"),
                            onContextMenu: Dn,
                            style: {
                              ...Qa(he.dash.s, !1, !P.dash),
                              boxSizing: "border-box",
                              position: "absolute",
                              right: kn - he.dash.x - he.dash.s,
                              bottom: hn - he.dash.y - he.dash.s,
                              pointerEvents: "auto",
                            },
                            children: [cd(Hs), Ja("\xBB", "Doskok", 20)],
                          }),
                          (0, api.h.jsx)("button", {
                            "aria-label": "Rozmowa " + (P.near || ""),
                            onPointerDown: Jo("talk"),
                            onContextMenu: Dn,
                            style: {
                              ...Qa(he.talk.s, !!P.near, !P.near),
                              boxSizing: "border-box",
                              background: P.near ? "rgba(200,150,40,0.85)" : "rgba(43,29,58,0.72)",
                              position: "absolute",
                              right: kn - he.talk.x - he.talk.s,
                              bottom: hn - he.talk.y - he.talk.s,
                              pointerEvents: "auto",
                            },
                            children: Ja("!", P.near || "M\xF3w", 18),
                          }),
                          P.weapons > 1 &&
                            (0, api.h.jsx)("button", {
                              "aria-label": "Zmie\u0144 bro\u0144",
                              onPointerDown: Jo("swap"),
                              onContextMenu: Dn,
                              style: {
                                ...Qa(he.swap.s, !1),
                                boxSizing: "border-box",
                                position: "absolute",
                                right: kn - he.swap.x - he.swap.s,
                                bottom: hn - he.swap.y - he.swap.s,
                                pointerEvents: "auto",
                              },
                              children: Ja("\u21C4", P.weapon, 16),
                            }),
                        ],
                      }),
                    !ud &&
                      (0, api.h.jsx)("div", {
                        style: {
                          position: "absolute",
                          right: 8,
                          bottom: 8,
                          padding: "4px 8px",
                          background: "rgba(27,20,36,0.7)",
                          boxShadow: `0 0 0 2px ${E.ink}`,
                          color: E.faint,
                          fontSize: 12,
                          pointerEvents: "none",
                        },
                        children:
                          "WASD ruch \xB7 Spacja atak \xB7 E rozmowa \xB7 K umiej. \xB7 L doskok \xB7 Q bro\u0144 \xB7 1/2 eliksir \xB7 P menu",
                      }),
                  ],
                }),
              M === "menu" &&
                (0, api.h.jsxs)("div", {
                  style: { ...na("end"), pointerEvents: "none" },
                  children: [
                    godAsk &&
                      (0, api.h.jsxs)("div", {
                        style: {
                          position: "absolute",
                          left: "50%",
                          top: "38%",
                          transform: "translate(-50%, -50%)",
                          width: "min(360px, calc(100% - 28px))",
                          padding: 12,
                          background: "rgba(32,21,46,0.97)",
                          boxShadow: Vs(E.woodL, E.woodD),
                          pointerEvents: "auto",
                          zIndex: 5,
                          display: "grid",
                          gap: 8,
                          boxSizing: "border-box",
                        },
                        children: [
                          (0, api.h.jsx)("div", {
                            style: { ...Za, fontSize: 16 },
                            children: "Hasło",
                          }),
                          (0, api.h.jsx)("input", {
                            ref: godIn,
                            value: godPw,
                            maxLength: 32,
                            onChange: (m) => {
                              (setGodPw(m.target.value), godBad && setGodBad(""));
                            },
                            onKeyDown: (m) => {
                              (m.stopPropagation(), m.key === "Enter" && (m.preventDefault(), sealTitle()));
                            },
                            style: {
                              width: "100%",
                              boxSizing: "border-box",
                              minHeight: 48,
                              padding: "10px 12px",
                              border: "none",
                              boxShadow: `inset 0 0 0 2px ${E.gold}, 0 0 0 2px ${E.ink}`,
                              background: E.ink,
                              color: E.text,
                              fontSize: 18,
                              fontWeight: 700,
                              fontFamily: Ft,
                              userSelect: "text",
                            },
                          }),
                          godBad &&
                            (0, api.h.jsx)("div", {
                              style: { ...Lt, color: "#ff9aa8" },
                              children: godBad,
                            }),
                          (0, api.h.jsxs)("div", {
                            style: { display: "flex", gap: 8, justifyContent: "flex-end" },
                            children: [
                              (0, api.h.jsx)("button", {
                                style: { ...Ti, margin: 0, minHeight: 44 },
                                onClick: () => {
                                  (setGodAsk(!1), setGodPw(""), setGodBad(""));
                                },
                                children: "Anuluj",
                              }),
                              (0, api.h.jsx)("button", {
                                style: { ...Ut, margin: 0, minHeight: 44 },
                                onClick: sealTitle,
                                children: "Wejdź",
                              }),
                            ],
                          }),
                        ],
                      }),
                    Vi === "" &&
                      (0, api.h.jsxs)("div", {
                        style: {
                          display: "flex",
                          flexDirection: mt ? "row" : "column",
                          flexWrap: "wrap",
                          gap: 6,
                          justifyContent: "center",
                          alignItems: mt ? "center" : "stretch",
                          maxWidth: mt ? 720 : 340,
                          width: "100%",
                          padding: "10px 12px",
                          margin: 8,
                          background: "rgba(32,21,46,0.92)",
                          boxShadow: Vs(E.woodL, E.woodD),
                          boxSizing: "border-box",
                          pointerEvents: "auto",
                        },
                        children: [
                          tt &&
                            (0, api.h.jsx)("button", {
                              style: {
                                ...Ut,
                                flex: mt ? "0 0 auto" : "1 1 auto",
                                minHeight: 44,
                                padding: "8px 18px",
                                fontSize: 15,
                                margin: 0,
                              },
                              onClick: y2,
                              children: "\u25B6 Kontynuuj",
                            }),
                          (0, api.h.jsx)("button", {
                            style: {
                              ...(tt ? Zt : Ut),
                              flex: mt ? "0 0 auto" : "1 1 auto",
                              minHeight: 44,
                              padding: "8px 18px",
                              fontSize: 15,
                              margin: 0,
                            },
                            onClick: () => {
                              (Ba(0), Gt("create"));
                            },
                            children: "\u271A Nowa gra",
                          }),
                          (0, api.h.jsx)("button", {
                            style: {
                              ...Ti,
                              flex: mt ? "0 0 auto" : "1 1 auto",
                              minHeight: 44,
                              padding: "8px 14px",
                              fontSize: 13,
                              margin: 0,
                            },
                            onClick: () => qo("help"),
                            children: "? Jak gra\u0107",
                          }),
                          (0, api.h.jsx)("button", {
                            style: {
                              ...Ti,
                              flex: mt ? "0 0 auto" : "1 1 auto",
                              minHeight: 44,
                              padding: "8px 14px",
                              fontSize: 13,
                              margin: 0,
                            },
                            onClick: () => qo("import"),
                            children: "\u21E9 Wczytaj zapis",
                          }),
                          (0, api.h.jsxs)("button", {
                            style: {
                              ...Ti,
                              flex: mt ? "0 0 auto" : "1 1 auto",
                              minHeight: 44,
                              padding: "8px 14px",
                              fontSize: 13,
                              margin: 0,
                            },
                            onClick: Fs,
                            children: ["\u26F6 ", fd],
                          }),
                          O &&
                            (0, api.h.jsx)("div", {
                              style: { ...Lt, color: E.gold, width: "100%", textAlign: "center" },
                              children: O,
                            }),
                        ],
                      }),
                    Vi !== "" &&
                      (0, api.h.jsxs)("div", {
                        style: { ...Yi(620), margin: 8, pointerEvents: "auto" },
                        children: [
                          (0, api.h.jsxs)("div", {
                            style: ea,
                            children: [
                              (0, api.h.jsx)("div", {
                                style: Za,
                                children: Vi === "help" ? "Jak gra\u0107" : "Wczytaj zapis",
                              }),
                              (0, api.h.jsx)("button", {
                                style: K2,
                                onClick: () => qo(""),
                                children: "\u2715 Zamknij",
                              }),
                            ],
                          }),
                          (0, api.h.jsxs)("div", {
                            style: ta,
                            children: [
                              Vi === "help" && dd,
                              Vi === "import" &&
                                (0, api.h.jsxs)("div", {
                                  children: [
                                    (0, api.h.jsx)("div", {
                                      style: { ...Lt, marginBottom: 8 },
                                      children:
                                        "Wklej kod zapisu (zaczyna si\u0119 od GRZ2-), kt\xF3ry skopiowa\u0142a\u015B w Ustawieniach.",
                                    }),
                                    (0, api.h.jsx)("textarea", {
                                      value: k,
                                      onChange: (m) => L(m.target.value),
                                      placeholder: "GRZ2-...",
                                      rows: 3,
                                      style: {
                                        width: "100%",
                                        boxSizing: "border-box",
                                        fontFamily: Ft,
                                        fontSize: 16,
                                        padding: 10,
                                        background: E.ink,
                                        color: E.text,
                                        border: "none",
                                        boxShadow: `inset 0 0 0 2px ${E.stone}`,
                                        borderRadius: 0,
                                        resize: "none",
                                        userSelect: "text",
                                      },
                                    }),
                                    O &&
                                      (0, api.h.jsx)("div", {
                                        style: { ...Lt, color: E.gold, marginTop: 8 },
                                        children: O,
                                      }),
                                  ],
                                }),
                            ],
                          }),
                          Vi === "import" &&
                            (0, api.h.jsx)("div", {
                              style: qa,
                              children: (0, api.h.jsx)("button", {
                                style: Ut,
                                onClick: () => {
                                  let m = api.Bk(k);
                                  typeof m == "string" ? q(m) : (q(""), qo(""), ad(m));
                                },
                                children: "Wczytaj zapis",
                              }),
                            }),
                        ],
                      }),
                  ],
                }),
              M === "create" &&
                (0, api.h.jsx)("div", {
                  style: {
                    ...na("center"),
                    background: "rgba(12,8,22,0.35)",
                    pointerEvents: "auto",
                  },
                  children: (0, api.h.jsxs)("div", {
                    style: { ...Yi(920), margin: 8 },
                    children: [
                      (0, api.h.jsxs)("div", {
                        style: ea,
                        children: [
                          (0, api.h.jsx)("div", {
                            style: Za,
                            children: "Stw\xF3rz bohaterk\u0119",
                          }),
                          (0, api.h.jsx)("div", {
                            style: { display: "flex", gap: 4, flexWrap: "wrap" },
                            children: O2.map((m, I) =>
                              (0, api.h.jsx)(
                                "button",
                                {
                                  style: {
                                    ...Rn(nn === I),
                                    minHeight: 44,
                                    padding: "6px 10px",
                                    fontSize: 14,
                                  },
                                  onClick: () => Ba(I),
                                  children: I + 1 + "\xB7" + m,
                                },
                                m,
                              ),
                            ),
                          }),
                        ],
                      }),
                      (0, api.h.jsxs)("div", {
                        style: {
                          ...ta,
                          display: "flex",
                          flexDirection: mt ? "row" : "column",
                          gap: 14,
                          alignItems: mt ? "flex-start" : "stretch",
                        },
                        children: [
                          (0, api.h.jsxs)("div", {
                            style: {
                              flex: mt ? "0 0 36%" : "0 0 auto",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 6,
                              alignSelf: mt ? "stretch" : void 0,
                              minHeight: mt ? 160 : void 0,
                            },
                            children: [
                              (0, api.h.jsx)("canvas", {
                                ref: td,
                                width: 176,
                                height: 56,
                                style: {
                                  width: "100%",
                                  maxWidth: mt ? 360 : 300,
                                  aspectRatio: "176 / 56",
                                  imageRendering: "pixelated",
                                  boxShadow: `0 0 0 2px ${E.ink}, 0 0 0 4px ${E.stone}`,
                                  display: "block",
                                  margin: "0 auto",
                                },
                              }),
                              (0, api.h.jsx)("div", {
                                style: { ...Lt, fontSize: 13, textAlign: "center", color: E.gold },
                                children:
                                  (d.name.trim() || "Gryzelda") + " \xB7 " + api.et[d.cls].name,
                              }),
                            ],
                          }),
                          (0, api.h.jsxs)("div", {
                            style: { flex: "1 1 auto", minWidth: 0 },
                            children: [
                              nn === 0 &&
                                (0, api.h.jsxs)("div", {
                                  children: [
                                    (0, api.h.jsx)("div", {
                                      style: { ...Xi, marginTop: 0 },
                                      children: "Imi\u0119",
                                    }),
                                    (0, api.h.jsx)("input", {
                                      value: d.name,
                                      maxLength: 14,
                                      onChange: (m) => Tn({ ...d, name: m.target.value }),
                                      onKeyDown: (m) => {
                                        m.key === "Enter" && Ba(1);
                                      },
                                      style: {
                                        width: "100%",
                                        boxSizing: "border-box",
                                        minHeight: 48,
                                        padding: "10px 12px",
                                        borderRadius: 0,
                                        border: "none",
                                        boxShadow: `inset 0 0 0 2px ${E.gold}, 0 0 0 2px ${E.ink}`,
                                        background: E.ink,
                                        color: E.text,
                                        fontSize: 18,
                                        fontWeight: 700,
                                        fontFamily: Ft,
                                        userSelect: "text",
                                      },
                                    }),
                                    (0, api.h.jsx)("div", {
                                      style: { ...Lt, marginTop: 8 },
                                      children:
                                        "Imi\u0119 pojawi si\u0119 w rozmowach. Puste pole oznacza \u201EGryzelda\u201D.",
                                    }),
                                  ],
                                }),
                              nn === 1 &&
                                (0, api.h.jsxs)("div", {
                                  children: [
                                    (0, api.h.jsx)("div", {
                                      style: { ...Xi, marginTop: 0 },
                                      children: "Fryzura",
                                    }),
                                    Va(api.gp, d.hair, (m) => Tn({ ...d, hair: m })),
                                    (0, api.h.jsx)("div", {
                                      style: Xi,
                                      children: "Kolor w\u0142os\xF3w",
                                    }),
                                    Va(
                                      api.Mk,
                                      d.hairColor,
                                      (m) => Tn({ ...d, hairColor: m }),
                                      api.Of,
                                    ),
                                    (0, api.h.jsx)("div", { style: Xi, children: "Karnacja" }),
                                    Va(api.Pk, d.skin || 0, (m) => Tn({ ...d, skin: m }), api.Ts),
                                  ],
                                }),
                              nn === 2 &&
                                (0, api.h.jsxs)("div", {
                                  children: [
                                    (0, api.h.jsx)("div", {
                                      style: { ...Xi, marginTop: 0 },
                                      children: "Str\xF3j",
                                    }),
                                    Va(api.Sp, d.outfit, (m) => Tn({ ...d, outfit: m })),
                                    (0, api.h.jsx)("div", { style: Xi, children: "Kolor stroju" }),
                                    Va(
                                      api.jk,
                                      d.outfitColor,
                                      (m) => Tn({ ...d, outfitColor: m }),
                                      api.If,
                                    ),
                                  ],
                                }),
                              nn === 3 &&
                                (0, api.h.jsx)("div", {
                                  style: { display: "grid", gap: 6 },
                                  children: ["war", "ran", "mag"].map((m) =>
                                    (0, api.h.jsxs)(
                                      "button",
                                      {
                                        onClick: () => Tn({ ...d, cls: m }),
                                        style: {
                                          ...Rn(d.cls === m),
                                          textAlign: "left",
                                          padding: "8px 12px",
                                        },
                                        children: [
                                          (0, api.h.jsxs)("div", {
                                            style: { fontSize: 16, fontWeight: 700 },
                                            children: [
                                              api.et[m].name,
                                              " ",
                                              (0, api.h.jsxs)("span", {
                                                style: {
                                                  fontSize: 12,
                                                  fontWeight: 500,
                                                  color: E.faint,
                                                },
                                                children: [
                                                  "SI\u0141 ",
                                                  api.et[m].base.str,
                                                  " \xB7 WIT ",
                                                  api.et[m].base.vit,
                                                  " \xB7 ZR\u0118 ",
                                                  api.et[m].base.dex,
                                                  " \xB7 UMY ",
                                                  api.et[m].base.mnd,
                                                ],
                                              }),
                                            ],
                                          }),
                                          (0, api.h.jsxs)("div", {
                                            style: {
                                              ...Lt,
                                              fontSize: 13,
                                              lineHeight: "18px",
                                              marginTop: 2,
                                            },
                                            children: [
                                              api.et[m].desc,
                                              " Bro\u0144: ",
                                              api.jn[api.et[m].start].name,
                                              ".",
                                            ],
                                          }),
                                        ],
                                      },
                                      m,
                                    ),
                                  ),
                                }),
                            ],
                          }),
                        ],
                      }),
                      (0, api.h.jsxs)("div", {
                        style: { ...qa, justifyContent: "space-between", alignItems: "center" },
                        children: [
                          (0, api.h.jsx)("button", {
                            style: Ti,
                            onClick: () => {
                              nn === 0 ? Gt("menu") : Ba(nn - 1);
                            },
                            children: nn === 0 ? "\u25C0 Menu" : "\u25C0 Wstecz",
                          }),
                          tt &&
                            nn === 3 &&
                            (0, api.h.jsx)("div", {
                              style: {
                                ...Lt,
                                fontSize: 13,
                                flex: "1 1 120px",
                                textAlign: "center",
                                color: E.gold,
                              },
                              children: "Nowa gra nadpisze obecny zapis.",
                            }),
                          nn < 3
                            ? (0, api.h.jsx)("button", {
                                style: Ut,
                                onClick: () => Ba(nn + 1),
                                children: "Dalej \u25B6",
                              })
                            : (0, api.h.jsx)("button", {
                                style: Ut,
                                onClick: m2,
                                children: "Rozpocznij przygod\u0119 \u25B6",
                              }),
                        ],
                      }),
                    ],
                  }),
                }),
              M === "pause" &&
                p &&
                (0, api.h.jsx)("div", {
                  style: {
                    ...na("center"),
                    padding: mt ? 8 : 10,
                    background: "rgba(12,8,22,0.35)",
                    pointerEvents: "auto",
                  },
                  children: (0, api.h.jsxs)("div", {
                    style: { ...Yi(900, { height: "100%" }), maxHeight: "100%" },
                    children: [
                      (0, api.h.jsx)("div", {
                        style: {
                          ...ea,
                          padding: 6,
                          display: "grid",
                          gridTemplateColumns: "repeat(5, minmax(0,1fr))",
                          gap: 4,
                        },
                        children: [
                          ["char", "\u263A", "Posta\u0107"],
                          ["eq", "\u2694", "Sprz\u0119t"],
                          ["skills", "\u2726", "Umiej."],
                          ["quest", "\u25A4", "Dziennik"],
                          ["settings", "\u2699", "Opcje"],
                        ].map((m) => {
                          let I = D === m[0],
                            A = m[0] === "char" ? p.pts + (p.lvl >= 5 && !p.spec ? 1 : 0) : 0;
                          return (0, api.h.jsxs)(
                            "button",
                            {
                              "aria-label": m[2],
                              style: {
                                ...Rn(I),
                                margin: 0,
                                minHeight: 50,
                                padding: "4px 2px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 2,
                                position: "relative",
                                minWidth: 0,
                              },
                              onClick: () => {
                                (l(m[0]), R(!1), q(""));
                              },
                              children: [
                                (0, api.h.jsx)("span", {
                                  style: { fontSize: 18, lineHeight: 1 },
                                  children: m[1],
                                }),
                                (0, api.h.jsx)("span", {
                                  style: {
                                    fontSize: 12,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "100%",
                                  },
                                  children: m[2],
                                }),
                                A > 0 &&
                                  (0, api.h.jsx)("span", {
                                    style: {
                                      position: "absolute",
                                      right: 2,
                                      top: 2,
                                      minWidth: 16,
                                      height: 16,
                                      background: E.gold,
                                      color: E.ink,
                                      fontSize: 11,
                                      lineHeight: "16px",
                                      boxShadow: `0 0 0 1px ${E.ink}`,
                                    },
                                    children: A,
                                  }),
                              ],
                            },
                            m[0],
                          );
                        }),
                      }),
                      (0, api.h.jsxs)("div", {
                        style: ta,
                        children: [
                          D === "char" &&
                            (0, api.h.jsxs)("div", {
                              children: [
                                Ee(
                                  "Bohaterka",
                                  (0, api.h.jsxs)(api.h.Fragment, {
                                    children: [
                                      (0, api.h.jsxs)("div", {
                                        style: {
                                          display: "grid",
                                          gridTemplateColumns: "minmax(0,1fr) auto",
                                          gap: 10,
                                          alignItems: "center",
                                        },
                                        children: [
                                          (0, api.h.jsxs)("div", {
                                            style: { minWidth: 0 },
                                            children: [
                                              (0, api.h.jsx)("div", {
                                                style: { ...Kt, fontSize: 18 },
                                                children: p.look.name,
                                              }),
                                              (0, api.h.jsxs)("div", {
                                                style: Qt,
                                                children: [
                                                  api.et[p.look.cls].name,
                                                  p.spec
                                                    ? " \xB7 " +
                                                      (
                                                        api.gf[p.look.cls].find(
                                                          (m) => m.id === p.spec,
                                                        ) || { name: "" }
                                                      ).name
                                                    : "",
                                                ],
                                              }),
                                            ],
                                          }),
                                          (0, api.h.jsx)("div", {
                                            style: {
                                              ...Yo,
                                              fontSize: 18,
                                              padding: "6px 10px",
                                              background: E.ink,
                                              boxShadow: `inset 0 0 0 2px ${E.gold}`,
                                            },
                                            children: "POZ " + p.lvl,
                                          }),
                                        ],
                                      }),
                                      (0, api.h.jsxs)("div", {
                                        children: [
                                          (0, api.h.jsxs)("div", {
                                            style: {
                                              display: "flex",
                                              justifyContent: "space-between",
                                              fontSize: 12,
                                              color: E.faint,
                                            },
                                            children: [
                                              (0, api.h.jsx)("span", {
                                                children: "Do\u015Bwiadczenie",
                                              }),
                                              (0, api.h.jsx)("span", {
                                                children: p.xp + " / " + api.$o(p.lvl),
                                              }),
                                            ],
                                          }),
                                          (0, api.h.jsx)("div", {
                                            style: {
                                              height: 10,
                                              background: E.ink,
                                              boxShadow: `inset 0 0 0 2px ${E.panel2}`,
                                              marginTop: 3,
                                            },
                                            children: (0, api.h.jsx)("div", {
                                              style: {
                                                height: "100%",
                                                width:
                                                  Math.round((100 * p.xp) / api.$o(p.lvl)) + "%",
                                                background: E.cyan,
                                              },
                                            }),
                                          }),
                                        ],
                                      }),
                                      (0, api.h.jsx)("div", {
                                        style: {
                                          display: "grid",
                                          gridTemplateColumns:
                                            "repeat(auto-fill, minmax(110px, 1fr))",
                                          gap: 6,
                                        },
                                        children: [
                                          ["Zdrowie", Math.ceil(p.hp) + "/" + api.Ze(p)],
                                          ["Mana", Math.floor(p.mp) + "/" + api.ut(p)],
                                          ["Obra\u017Cenia", api.Mi(p, p.weapon).toFixed(1)],
                                          ["Krytyk", Math.round(api.Wf(p) * 100) + "%"],
                                          ["Szybko\u015B\u0107", String(Math.round(api.Rp(p)))],
                                          ["Grosze", String(p.coins)],
                                        ].map((m) =>
                                          (0, api.h.jsxs)(
                                            "div",
                                            {
                                              style: {
                                                background: E.panel,
                                                boxShadow: `inset 0 0 0 2px ${E.panel2}`,
                                                padding: "6px 8px",
                                              },
                                              children: [
                                                (0, api.h.jsx)("div", {
                                                  style: {
                                                    fontSize: 11,
                                                    color: E.faint,
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.06em",
                                                  },
                                                  children: m[0],
                                                }),
                                                (0, api.h.jsx)("div", {
                                                  style: {
                                                    fontSize: 17,
                                                    fontWeight: 700,
                                                    color: E.text,
                                                  },
                                                  children: m[1],
                                                }),
                                              ],
                                            },
                                            m[0],
                                          ),
                                        ),
                                      }),
                                    ],
                                  }),
                                ),
                                godHot &&
                                  Ee(
                                    "Tryb boga",
                                    (0, api.h.jsxs)(api.h.Fragment, {
                                      children: [
                                        Qe(
                                          "Poziom i cechy bez limitu punktów. Umiejętności — zakładka Umiej., bez chodzenia do nauczycieli.",
                                        ),
                                        (0, api.h.jsxs)("div", {
                                          style: {
                                            display: "flex",
                                            gap: 4,
                                            alignItems: "center",
                                            flexWrap: "wrap",
                                          },
                                          children: [
                                            godBtn("−10", p.lvl > 1, () => godBump("lvl", "", -10)),
                                            godBtn("−", p.lvl > 1, () => godBump("lvl", "", -1)),
                                            (0, api.h.jsx)("div", {
                                              style: { ...Yo, fontSize: 18, minWidth: 72 },
                                              children: "POZ " + p.lvl,
                                            }),
                                            godBtn("+", p.lvl < 999, () => godBump("lvl", "", 1)),
                                            godBtn("+10", p.lvl < 999, () => godBump("lvl", "", 10)),
                                          ],
                                        }),
                                        [
                                          [
                                            "imm",
                                            "Nieśmiertelność",
                                            "Ciosy i pociski nie zdejmują zdrowia.",
                                          ],
                                          [
                                            "veil",
                                            "Niewidzialność",
                                            "Mobki nie gonią, nie strzelają i nie budzą bossa.",
                                          ],
                                        ].map((m) =>
                                          (0, api.h.jsxs)(
                                            "div",
                                            {
                                              style: {
                                                ...yn,
                                                gridTemplateColumns: "minmax(0,1fr) auto",
                                              },
                                              children: [
                                                (0, api.h.jsxs)("div", {
                                                  children: [
                                                    (0, api.h.jsx)("div", {
                                                      style: { ...Kt, fontSize: 14 },
                                                      children: m[1],
                                                    }),
                                                    (0, api.h.jsx)("div", {
                                                      style: Qt,
                                                      children: m[2],
                                                    }),
                                                  ],
                                                }),
                                                (0, api.h.jsx)("button", {
                                                  "aria-label": m[1],
                                                  style: {
                                                    ...Rn(!!(p.god && p.god[m[0]])),
                                                    minHeight: 44,
                                                    minWidth: 72,
                                                    margin: 0,
                                                    padding: "6px 10px",
                                                  },
                                                  onClick: () => godToggle(m[0]),
                                                  children:
                                                    p.god && p.god[m[0]] ? "WŁ." : "WYŁ.",
                                                }),
                                              ],
                                            },
                                            m[0],
                                          ),
                                        ),
                                      ],
                                    }),
                                  ),
                                Ee(
                                  "Cechy",
                                  (0, api.h.jsxs)(api.h.Fragment, {
                                    children: [
                                      (0, api.h.jsxs)("div", {
                                        style: {
                                          display: "grid",
                                          gridTemplateColumns: "auto minmax(0,1fr)",
                                          gap: 10,
                                          alignItems: "center",
                                          padding: "8px 10px",
                                          background: p.pts > 0 ? "rgba(255,216,74,0.12)" : E.panel,
                                          boxShadow: `inset 0 0 0 2px ${p.pts > 0 ? E.gold : E.panel2}`,
                                        },
                                        children: [
                                          (0, api.h.jsx)("div", {
                                            style: { ...Yo, fontSize: 28, minWidth: 44 },
                                            children: p.pts,
                                          }),
                                          (0, api.h.jsxs)("div", {
                                            children: [
                                              (0, api.h.jsx)("div", {
                                                style: { ...Kt, fontSize: 14 },
                                                children:
                                                  p.pts > 0
                                                    ? "Wolne punkty do rozdania"
                                                    : "Brak wolnych punkt\xF3w",
                                              }),
                                              (0, api.h.jsx)("div", {
                                                style: Qt,
                                                children:
                                                  godHot
                                                    ? "Tryb boga: + i − zmieniają cechę bez punktów (0–999)."
                                                    : "Ka\u017Cdy poziom daje 2 punkty. Dodaj je przyciskiem + przy cesze.",
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      api.Ck.map((m) =>
                                        godHot
                                          ? (0, api.h.jsxs)(
                                              "div",
                                              {
                                                style: {
                                                  ...yn,
                                                  gridTemplateColumns: "minmax(0,1fr)",
                                                },
                                                children: [
                                                  (0, api.h.jsxs)("div", {
                                                    style: { minWidth: 0 },
                                                    children: [
                                                      (0, api.h.jsx)("div", {
                                                        style: Kt,
                                                        children: m.name,
                                                      }),
                                                      (0, api.h.jsx)("div", {
                                                        style: Qt,
                                                        children: m.desc,
                                                      }),
                                                    ],
                                                  }),
                                                  (0, api.h.jsxs)("div", {
                                                    style: {
                                                      display: "flex",
                                                      gap: 4,
                                                      alignItems: "center",
                                                      justifyContent: "flex-end",
                                                      flexWrap: "wrap",
                                                    },
                                                    children: [
                                                      godBtn("−10", p.st[m.k] > 0, () =>
                                                        godBump("st", m.k, -10),
                                                      ),
                                                      godBtn("−", p.st[m.k] > 0, () =>
                                                        godBump("st", m.k, -1),
                                                      ),
                                                      (0, api.h.jsx)("div", {
                                                        style: { ...Yo, minWidth: 36 },
                                                        children: p.st[m.k],
                                                      }),
                                                      godBtn("+", p.st[m.k] < 999, () =>
                                                        godBump("st", m.k, 1),
                                                      ),
                                                      godBtn("+10", p.st[m.k] < 999, () =>
                                                        godBump("st", m.k, 10),
                                                      ),
                                                    ],
                                                  }),
                                                ],
                                              },
                                              m.k,
                                            )
                                          : (0, api.h.jsxs)(
                                              "div",
                                              {
                                                style: {
                                                  ...yn,
                                                  gridTemplateColumns: "minmax(0,1fr) 44px 52px",
                                                },
                                                children: [
                                                  (0, api.h.jsxs)("div", {
                                                    style: { minWidth: 0 },
                                                    children: [
                                                      (0, api.h.jsx)("div", {
                                                        style: Kt,
                                                        children: m.name,
                                                      }),
                                                      (0, api.h.jsx)("div", {
                                                        style: Qt,
                                                        children: m.desc,
                                                      }),
                                                    ],
                                                  }),
                                                  (0, api.h.jsx)("div", {
                                                    style: Yo,
                                                    children: p.st[m.k],
                                                  }),
                                                  (0, api.h.jsx)("button", {
                                                    "aria-label": "Dodaj punkt: " + m.name,
                                                    style: {
                                                      ...$a(p.pts > 0),
                                                      minWidth: 52,
                                                      width: 52,
                                                      padding: 0,
                                                      fontSize: 22,
                                                    },
                                                    disabled: p.pts <= 0,
                                                    onClick: () => C2(m.k),
                                                    children: "+",
                                                  }),
                                                ],
                                              },
                                              m.k,
                                            ),
                                      ),
                                    ],
                                  }),
                                  Je(
                                    p.pts > 0 ? p.pts + " pkt" : "0 pkt",
                                    p.pts > 0 ? E.gold : E.faint,
                                  ),
                                ),
                                p.lvl >= 5 &&
                                  !p.spec &&
                                  Ee(
                                    "Specjalizacja (wyb\xF3r na sta\u0142e)",
                                    (0, api.h.jsxs)(api.h.Fragment, {
                                      children: [
                                        (0, api.h.jsx)("div", {
                                          style: {
                                            display: "grid",
                                            gridTemplateColumns:
                                              "repeat(auto-fit, minmax(220px, 1fr))",
                                            gap: 8,
                                          },
                                          children: api.gf[p.look.cls].map((m) =>
                                            (0, api.h.jsxs)(
                                              "button",
                                              {
                                                style: {
                                                  ...Rn(_s === m.id),
                                                  textAlign: "left",
                                                  padding: 10,
                                                  margin: 0,
                                                },
                                                onClick: () => Jf(m.id),
                                                children: [
                                                  (0, api.h.jsx)("div", {
                                                    style: Kt,
                                                    children: m.name,
                                                  }),
                                                  (0, api.h.jsx)("div", {
                                                    style: { ...Qt, color: E.dim },
                                                    children: m.desc,
                                                  }),
                                                  (0, api.h.jsx)("div", {
                                                    style: Qt,
                                                    children: api.tp[m.id],
                                                  }),
                                                ],
                                              },
                                              m.id,
                                            ),
                                          ),
                                        }),
                                        _s &&
                                          (0, api.h.jsxs)("div", {
                                            style: {
                                              display: "grid",
                                              gridTemplateColumns: "minmax(0,1fr) auto",
                                              gap: 8,
                                              alignItems: "center",
                                            },
                                            children: [
                                              Qe("Nie da si\u0119 zmieni\u0107 p\xF3\u017Aniej."),
                                              (0, api.h.jsx)("button", {
                                                style: { ...Ut, margin: 0 },
                                                onClick: () => {
                                                  ((p.spec = _s),
                                                    Jf(""),
                                                    (p.hp = api.Ze(p)),
                                                    api.se(p, p.px, p.py, "#ffd84a", 30, 80, 0.8),
                                                    api.G(p, "level"),
                                                    api.fe(p),
                                                    xt());
                                                },
                                                children: "Zatwierd\u017A",
                                              }),
                                            ],
                                          }),
                                      ],
                                    }),
                                  ),
                                p.spec && Ee("Specjalizacja", Qe(api.tp[p.spec])),
                                p.lvl < 5 &&
                                  Ee(
                                    "Specjalizacja",
                                    Qe(
                                      "Odblokuje si\u0119 na poziomie 5. Do wyboru: " +
                                        api.gf[p.look.cls].map((m) => m.name).join(" albo ") +
                                        ".",
                                    ),
                                    Je("poz. 5", E.faint),
                                  ),
                              ],
                            }),
                          D === "eq" &&
                            (0, api.h.jsxs)("div", {
                              children: [
                                Ee(
                                  "Eliksiry",
                                  (0, api.h.jsxs)(api.h.Fragment, {
                                    children: [
                                      Qe(
                                        "Szybkie u\u017Cycie: przyciski pod mapk\u0105 albo klawisze 1 (HP) i 2 (MP). Limit " +
                                          api.vi +
                                          " sztuk." +
                                          (p.f["vz:35"] || p.f["kn:shop:iga"]
                                            ? " Sprzedaje je Iga w Aptece."
                                            : ""),
                                      ),
                                      (0, api.h.jsxs)("div", {
                                        style: { ...yn, gridTemplateColumns: "minmax(0,1fr) auto" },
                                        children: [
                                          (0, api.h.jsxs)("div", {
                                            children: [
                                              (0, api.h.jsx)("div", {
                                                style: Kt,
                                                children: "Eliksir zdrowia",
                                              }),
                                              (0, api.h.jsxs)("div", {
                                                style: Qt,
                                                children: [
                                                  "Przywraca ca\u0142e HP. Masz ",
                                                  p.potsHp,
                                                  "/",
                                                  api.vi,
                                                  ".",
                                                ],
                                              }),
                                            ],
                                          }),
                                          (0, api.h.jsx)("button", {
                                            style: $a(p.potsHp > 0 && p.hp < api.Ze(p)),
                                            disabled: !(p.potsHp > 0 && p.hp < api.Ze(p)),
                                            onClick: () => {
                                              api.Pp(p) && (api.fe(p), xt());
                                            },
                                            children: "U\u017Cyj",
                                          }),
                                        ],
                                      }),
                                      (0, api.h.jsxs)("div", {
                                        style: { ...yn, gridTemplateColumns: "minmax(0,1fr) auto" },
                                        children: [
                                          (0, api.h.jsxs)("div", {
                                            children: [
                                              (0, api.h.jsx)("div", {
                                                style: Kt,
                                                children: "Eliksir many",
                                              }),
                                              (0, api.h.jsxs)("div", {
                                                style: Qt,
                                                children: [
                                                  "Przywraca ca\u0142\u0105 man\u0119. Masz ",
                                                  p.potsMp,
                                                  "/",
                                                  api.vi,
                                                  ".",
                                                ],
                                              }),
                                            ],
                                          }),
                                          (0, api.h.jsx)("button", {
                                            style: $a(p.potsMp > 0 && p.mp < api.ut(p)),
                                            disabled: !(p.potsMp > 0 && p.mp < api.ut(p)),
                                            onClick: () => {
                                              api.Cp(p) && (api.fe(p), xt());
                                            },
                                            children: "U\u017Cyj",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  Je(p.potsHp + "+" + p.potsMp),
                                ),
                                Ee(
                                  "Wzmacniacze (czas)",
                                  (0, api.h.jsxs)(api.h.Fragment, {
                                    children: [
                                      Qe(
                                        "Czas dzia\u0142ania da si\u0119 wyd\u0142u\u017Cy\u0107. Kto to potrafi, dowiesz si\u0119 po drodze.",
                                      ),
                                      ["kawa", "ekspres", "magnes"].map((m) =>
                                        (0, api.h.jsxs)(
                                          "div",
                                          {
                                            style: {
                                              ...yn,
                                              gridTemplateColumns: "minmax(0,1fr) auto",
                                            },
                                            children: [
                                              (0, api.h.jsxs)("div", {
                                                children: [
                                                  (0, api.h.jsx)("div", {
                                                    style: Kt,
                                                    children:
                                                      m === "kawa"
                                                        ? "Kawa"
                                                        : m === "ekspres"
                                                          ? "Ekspres"
                                                          : "Magnes",
                                                  }),
                                                  (0, api.h.jsxs)("div", {
                                                    style: Qt,
                                                    children: [
                                                      "Ranga ",
                                                      api.Ia(p, m),
                                                      " \xB7 trwa ",
                                                      api.bt(p, m),
                                                      " s",
                                                      p.buf[m] > 0
                                                        ? " \xB7 teraz " +
                                                          Math.ceil(p.buf[m]) +
                                                          " s"
                                                        : "",
                                                      api.Lk(p, m)
                                                        ? " \xB7 ulepsza: " + api.Zn[api.Mp[m]]
                                                        : "",
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              Je(api.bt(p, m) + "s"),
                                            ],
                                          },
                                          m,
                                        ),
                                      ),
                                    ],
                                  }),
                                ),
                                Ee(
                                  "Bronie",
                                  (0, api.h.jsxs)(api.h.Fragment, {
                                    children: [
                                      Qe(
                                        "Bro\u0144 w r\u0119ku atakuje przyciskiem \u2694. Zmiana: przycisk \u21C4 albo Q.",
                                      ),
                                      p.weapons.map((m) =>
                                        (0, api.h.jsxs)(
                                          "div",
                                          {
                                            style: {
                                              ...yn,
                                              gridTemplateColumns: "minmax(0,1fr) 48px auto",
                                            },
                                            children: [
                                              (0, api.h.jsxs)("div", {
                                                style: { minWidth: 0 },
                                                children: [
                                                  (0, api.h.jsx)("div", {
                                                    style: Kt,
                                                    children: api.jn[m].name,
                                                  }),
                                                  (0, api.h.jsxs)("div", {
                                                    style: Qt,
                                                    children: [
                                                      api.jn[m].desc,
                                                      api.jn[m].aff === p.look.cls
                                                        ? " Premia klasy +20%."
                                                        : "",
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              (0, api.h.jsxs)("div", {
                                                style: { textAlign: "center" },
                                                children: [
                                                  (0, api.h.jsx)("div", {
                                                    style: { ...Yo, fontSize: m === "spinacz" ? 14 : 18 },
                                                    children:
                                                      m === "spinacz" ? "4 kaf." : api.Mi(p, m).toFixed(1),
                                                  }),
                                                  (0, api.h.jsx)("div", {
                                                    style: { fontSize: 10, color: E.faint },
                                                    children: m === "spinacz" ? "zasi\u0119g" : "obra\u017C.",
                                                  }),
                                                ],
                                              }),
                                              (0, api.h.jsx)("button", {
                                                style: {
                                                  ...Rn(p.weapon === m),
                                                  minHeight: 44,
                                                  padding: "6px 10px",
                                                  fontSize: 13,
                                                  margin: 0,
                                                },
                                                onClick: () => {
                                                  ((p.weapon = m), api.fe(p), xt());
                                                },
                                                children:
                                                  p.weapon === m
                                                    ? "\u2713 W r\u0119ku"
                                                    : "We\u017A",
                                              }),
                                            ],
                                          },
                                          m,
                                        ),
                                      ),
                                      p.f.sygnet &&
                                        (0, api.h.jsx)("button", {
                                          style: {
                                            ...Rn(!!p.f.sygnetOn),
                                            minHeight: 44,
                                            marginTop: 8,
                                          },
                                          onClick: () => {
                                            ((p.f.sygnetOn = !p.f.sygnetOn),
                                              api.fe(p),
                                              api.ne(
                                                p,
                                                p.f.sygnetOn
                                                  ? "Sygnet Jednego Ciosu założony. Każde trafienie kończy sprawę."
                                                  : "Sygnet schowany do kieszeni. Broń znów liczy obrażenia.",
                                                2.4,
                                              ),
                                              xt());
                                          },
                                          children: p.f.sygnetOn
                                            ? "\u2713 Sygnet Jednego Ciosu"
                                            : "Za\u0142\xF3\u017C Sygnet Jednego Ciosu",
                                        }),
                                    ],
                                  }),
                                  Je(String(p.weapons.length)),
                                ),
                                Ee(
                                  "Tropy",
                                  api.Cf.some((m) => api.Mf(p, m))
                                    ? (0, api.h.jsx)(api.h.Fragment, {
                                        children: api.Cf.filter((m) => api.Mf(p, m)).map((m) =>
                                          (0, api.h.jsxs)(
                                            "div",
                                            {
                                              style: {
                                                ...yn,
                                                gridTemplateColumns: "minmax(0,1fr)",
                                              },
                                              children: [
                                                (0, api.h.jsx)("div", {
                                                  style: Kt,
                                                  children: api.jn[m].name,
                                                }),
                                                (0, api.h.jsx)("div", {
                                                  style: Qt,
                                                  children: api.Mf(p, m),
                                                }),
                                              ],
                                            },
                                            m,
                                          ),
                                        ),
                                      })
                                    : Qe(
                                        "Nie s\u0142ysza\u0142a\u015B o \u017Cadnej innej broni. Jeszcze. Rozmawiaj z lud\u017Ami i zagl\u0105daj w ka\u017Cdy k\u0105t.",
                                      ),
                                ),
                                api.Ok(p) &&
                                  Ee(
                                    "Ku\u017Ania Wandy: pancerz i ostrzenie",
                                    (0, api.h.jsxs)(api.h.Fragment, {
                                      children: [
                                        Qe(
                                          "Trwa\u0142e ulepszenia u Kowalki Wandy. Wida\u0107 tylko to, co ju\u017C le\u017Cy na kowadle.",
                                        ),
                                        er
                                          .filter((m) => !!p.f[m.id] || m.ok(p))
                                          .map((m) => ld(m, !1)),
                                      ],
                                    }),
                                    Je("+" + api.Dp(p) * 15 + "% obra\u017C.", E.cyan),
                                  ),
                                Ee(
                                  "Trwa\u0142e bonusy",
                                  (0, api.h.jsx)("div", {
                                    style: {
                                      display: "grid",
                                      gridTemplateColumns: "repeat(auto-fill, minmax(110px,1fr))",
                                      gap: 6,
                                    },
                                    children: [
                                      [
                                        "Zdrowie",
                                        "+" +
                                          (p.bonusHp +
                                            (p.f.arm1 ? 2 : 0) +
                                            (p.f.arm2 ? 3 : 0) +
                                            (p.f.arm3 ? 4 : 0)),
                                      ],
                                      ["Mana", "+" + p.bonusMp],
                                    ].map((m) =>
                                      (0, api.h.jsxs)(
                                        "div",
                                        {
                                          style: {
                                            background: E.panel,
                                            boxShadow: `inset 0 0 0 2px ${E.panel2}`,
                                            padding: "6px 8px",
                                          },
                                          children: [
                                            (0, api.h.jsx)("div", {
                                              style: {
                                                fontSize: 11,
                                                color: E.faint,
                                                textTransform: "uppercase",
                                              },
                                              children: m[0],
                                            }),
                                            (0, api.h.jsx)("div", {
                                              style: { fontSize: 17, fontWeight: 700 },
                                              children: m[1],
                                            }),
                                          ],
                                        },
                                        m[0],
                                      ),
                                    ),
                                  }),
                                ),
                                Ee(
                                  "Wzmocnienia (chwilowe)",
                                  (0, api.h.jsxs)(api.h.Fragment, {
                                    children: [
                                      [
                                        ["Kawa", "Szybko\u015B\u0107 +40%."],
                                        ["Ekspres Priorytetowy", "Podw\xF3jne obra\u017Cenia."],
                                        ["Magnes", "Przyci\u0105ga grosze."],
                                        ["Ba\u0144ka", "Poch\u0142ania jedno trafienie."],
                                      ].map((m) =>
                                        (0, api.h.jsxs)(
                                          "div",
                                          {
                                            style: {
                                              display: "grid",
                                              gridTemplateColumns:
                                                "minmax(110px, 40%) minmax(0,1fr)",
                                              gap: 8,
                                              fontSize: 14,
                                            },
                                            children: [
                                              (0, api.h.jsx)("span", {
                                                style: { fontWeight: 700 },
                                                children: m[0],
                                              }),
                                              (0, api.h.jsx)("span", {
                                                style: { color: E.faint },
                                                children: m[1],
                                              }),
                                            ],
                                          },
                                          m[0],
                                        ),
                                      ),
                                      Qe("Wypadaj\u0105 ze skrzynek, krzak\xF3w i potwor\xF3w."),
                                    ],
                                  }),
                                ),
                              ],
                            }),
                          D === "skills" &&
                            (0, api.h.jsxs)("div", {
                              children: [
                                Ee(
                                  "Aktywna (przycisk \u2726 / K)",
                                  Qe(
                                    p.active && p.skills[p.active]
                                      ? api.Pt[p.active].name + ": " + api.Pt[p.active].desc
                                      : "Ustaw umiej\u0119tno\u015B\u0107 przyciskiem \u201EUstaw\u201D.",
                                  ),
                                  Je("Grosze: " + p.coins),
                                ),
                                godHot &&
                                  Ee(
                                    "Bez nauczyciela",
                                    (0, api.h.jsxs)(api.h.Fragment, {
                                      children: [
                                        Qe(
                                          "Dodajesz i zdejmujesz rangi bez groszy, poziomu i wędrówki do trenera. Aktywną ustawisz niżej.",
                                        ),
                                        api.Ui.map((J) => {
                                          let A = api.Pt[J],
                                            K = A.costs.length,
                                            U = p.skills[J] || 0;
                                          return (0, api.h.jsxs)(
                                            "div",
                                            {
                                              style: {
                                                ...yn,
                                                gridTemplateColumns: "minmax(0,1fr) auto auto",
                                              },
                                              children: [
                                                (0, api.h.jsxs)("div", {
                                                  style: { minWidth: 0 },
                                                  children: [
                                                    (0, api.h.jsx)("div", {
                                                      style: Kt,
                                                      children: A.name,
                                                    }),
                                                    (0, api.h.jsx)("div", {
                                                      style: {
                                                        color: E.gold,
                                                        fontSize: 13,
                                                        letterSpacing: 1,
                                                      },
                                                      children:
                                                        "\u2605".repeat(U) +
                                                        "\u2606".repeat(Math.max(0, K - U)),
                                                    }),
                                                  ],
                                                }),
                                                godBtn("−", U > 0, () => godBump("sk", J, -1)),
                                                godBtn("+", U < K, () => godBump("sk", J, 1)),
                                              ],
                                            },
                                            J,
                                          );
                                        }),
                                      ],
                                    }),
                                  ),
                                api.Ik.map((m) => {
                                  let I = m.ids.filter((J) => p.skills[J] > 0),
                                    A = m.ids.filter((J) => p.skills[J] === 0 && api.ip(p, J));
                                  return (0, api.h.jsxs)(
                                    "div",
                                    {
                                      children: [
                                        I.length > 0 &&
                                          Ee(
                                            m.title,
                                            (0, api.h.jsx)(api.h.Fragment, {
                                              children: I.map((J) => Xn(J, !1)),
                                            }),
                                          ),
                                        A.length > 0 &&
                                          Ee(
                                            m.title + " \u2014 do nauki",
                                            (0, api.h.jsx)(api.h.Fragment, {
                                              children: A.map((J) => Xn(J, !1)),
                                            }),
                                          ),
                                      ],
                                    },
                                    m.title,
                                  );
                                }),
                                api.Ui.some((m) => !api.ip(p, m)) &&
                                  Qe(
                                    "??? Inne umiej\u0119tno\u015Bci pojawi\u0105 si\u0119 tu, gdy poznasz kogo\u015B, kto ich uczy.",
                                  ),
                              ],
                            }),
                          D === "quest" &&
                            ((p.zone === 4 && p.f.lever1 && !p.f.plate) ||
                              (p.zone !== 4 &&
                                api.qe[p.zone].blocks.length > 0 &&
                                !p.f[api.qe[p.zone].blocks[0].flag])) &&
                            Ee(
                              "Zagadka z blokiem",
                              (0, api.h.jsxs)(api.h.Fragment, {
                                children: [
                                  (0, api.h.jsxs)("div", {
                                    style: {
                                      display: "grid",
                                      gridTemplateColumns: "minmax(0,1fr) auto",
                                      gap: 8,
                                      alignItems: "center",
                                    },
                                    children: [
                                      Qe(
                                        "Blok utkn\u0105\u0142? Przywr\xF3\u0107 go na start (p\u0142yta i reszta post\u0119pu zostaj\u0105).",
                                      ),
                                      (0, api.h.jsx)("button", {
                                        style: { ...Zt, margin: 0 },
                                        onClick: () => {
                                          api.$p(p)
                                            ? (api.fe(p), q("Blok przywr\xF3cony."))
                                            : q(
                                                "Nie mo\u017Cna teraz (odsu\u0144 si\u0119 z pola startowego bloku).",
                                              );
                                        },
                                        children: "Przywr\xF3\u0107",
                                      }),
                                    ],
                                  }),
                                  O && Qe(O),
                                ],
                              }),
                            ),
                          D === "quest" && R2(),
                          D === "settings" &&
                            (0, api.h.jsxs)("div", {
                              children: [
                                Ee(
                                  "D\u017Awi\u0119k i sterowanie",
                                  (0, api.h.jsxs)(api.h.Fragment, {
                                    children: [
                                      [
                                        ["music", "Muzyka"],
                                        ["sfx", "Efekty d\u017Awi\u0119kowe"],
                                        ["shake", "Wstrz\u0105sy ekranu"],
                                        ["autoAim", "Wspomaganie celowania"],
                                        ["touch", "Przyciski dotykowe na komputerze"],
                                      ].map((m) =>
                                        (0, api.h.jsxs)(
                                          "div",
                                          {
                                            style: {
                                              ...yn,
                                              gridTemplateColumns: "minmax(0,1fr) auto",
                                            },
                                            children: [
                                              (0, api.h.jsx)("div", {
                                                style: { ...Kt, fontSize: 14 },
                                                children: m[1],
                                              }),
                                              (0, api.h.jsx)("button", {
                                                "aria-label": m[1],
                                                style: {
                                                  ...Rn(p.settings[m[0]]),
                                                  minHeight: 44,
                                                  minWidth: 72,
                                                  margin: 0,
                                                  padding: "6px 10px",
                                                },
                                                onClick: () => {
                                                  p.settings[m[0]] = !p.settings[m[0]];
                                                  let I = nd();
                                                  ((I.music = p.settings.music),
                                                    (I.sfx = p.settings.sfx),
                                                    (p.settings.music || p.settings.sfx) &&
                                                      I.init(),
                                                    api.fe(p),
                                                    xt());
                                                },
                                                children: p.settings[m[0]]
                                                  ? "W\u0141."
                                                  : "WY\u0141.",
                                              }),
                                            ],
                                          },
                                          m[0],
                                        ),
                                      ),
                                      y.current &&
                                        !y.current.supported &&
                                        Qe(
                                          "D\u017Awi\u0119k niedost\u0119pny w tej przegl\u0105darce.",
                                        ),
                                    ],
                                  }),
                                ),
                                Ee(
                                  "Ekran",
                                  (0, api.h.jsxs)(api.h.Fragment, {
                                    children: [
                                      (0, api.h.jsxs)("div", {
                                        style: { ...yn, gridTemplateColumns: "minmax(0,1fr) auto" },
                                        children: [
                                          (0, api.h.jsx)("div", {
                                            style: { ...Kt, fontSize: 14 },
                                            children: "Pe\u0142ny ekran",
                                          }),
                                          (0, api.h.jsx)("button", {
                                            style: {
                                              ...Rn(Yn),
                                              minHeight: 44,
                                              margin: 0,
                                              padding: "6px 10px",
                                            },
                                            onClick: Fs,
                                            children: Yn ? "W\u0141." : "WY\u0141.",
                                          }),
                                        ],
                                      }),
                                      !Vf &&
                                        Qe(
                                          "Ta przegl\u0105darka nie udost\u0119pnia pe\u0142nego ekranu (np. iPhone): gra wype\u0142ni wtedy ca\u0142e okno strony.",
                                        ),
                                    ],
                                  }),
                                ),
                                Ee(
                                  "Zapis",
                                  (0, api.h.jsxs)(api.h.Fragment, {
                                    children: [
                                      Qe(N2),
                                      (0, api.h.jsxs)("div", {
                                        style: {
                                          display: "grid",
                                          gridTemplateColumns:
                                            "repeat(auto-fit, minmax(140px, 1fr))",
                                          gap: 6,
                                        },
                                        children: [
                                          (0, api.h.jsx)("button", {
                                            style: { ...Zt, margin: 0 },
                                            onClick: () => {
                                              (api.fe(p), q("Zapisano."));
                                            },
                                            children: "Zapisz teraz",
                                          }),
                                          (0, api.h.jsx)("button", {
                                            style: { ...Zt, margin: 0 },
                                            onClick: () => {
                                              (api.fe(p), F(api.Hk(api.Lp(p))));
                                            },
                                            children: "Kod zapisu",
                                          }),
                                          (0, api.h.jsx)("button", {
                                            style: { ...Zt, margin: 0 },
                                            onClick: () => {
                                              (api.fe(p), ue(!0), Gt("menu"));
                                            },
                                            children: "Menu g\u0142\xF3wne",
                                          }),
                                        ],
                                      }),
                                      O && Qe(O),
                                      ye &&
                                        (0, api.h.jsxs)("div", {
                                          style: { display: "grid", gap: 6 },
                                          children: [
                                            (0, api.h.jsx)("textarea", {
                                              "data-save-code": "1",
                                              readOnly: !0,
                                              value: ye,
                                              rows: 3,
                                              onFocus: (m) => m.currentTarget.select(),
                                              onContextMenu: (m) => m.stopPropagation(),
                                              style: {
                                                width: "100%",
                                                boxSizing: "border-box",
                                                fontFamily: Ft,
                                                fontSize: 12,
                                                padding: 8,
                                                background: E.ink,
                                                color: E.text,
                                                border: "none",
                                                boxShadow: `inset 0 0 0 2px ${E.stone}`,
                                                borderRadius: 0,
                                                userSelect: "text",
                                                WebkitUserSelect: "text",
                                                WebkitTouchCallout: "default",
                                              },
                                            }),
                                            (0, api.h.jsx)("button", {
                                              type: "button",
                                              style: { ...Zt, margin: 0, justifySelf: "start" },
                                              onClick: () => {
                                                let m = () => q("Skopiowano."),
                                                  I = () =>
                                                    q(
                                                      "Nie posz\u0142o samo. Zaznacz kod w polu i skopiuj z menu.",
                                                    ),
                                                  A = () => {
                                                    let J = document.querySelector(
                                                      "textarea[data-save-code]",
                                                    );
                                                    if (!J) {
                                                      I();
                                                      return;
                                                    }
                                                    (J.focus(), J.select());
                                                    try {
                                                      document.execCommand("copy") ? m() : I();
                                                    } catch {
                                                      I();
                                                    }
                                                  };
                                                navigator.clipboard && navigator.clipboard.writeText
                                                  ? navigator.clipboard
                                                      .writeText(ye)
                                                      .then(m)
                                                      .catch(A)
                                                  : A();
                                              },
                                              children: "Kopiuj",
                                            }),
                                          ],
                                        }),
                                      ye &&
                                        Qe(
                                          "Skopiuj ten kod albo stuknij Kopiuj. W menu g\u0142\xF3wnym wklej go w \u201EWczytaj zapis\u201D.",
                                        ),
                                    ],
                                  }),
                                ),
                                Ee("Pomoc", dd),
                                Ee(
                                  "Nowa gra",
                                  (0, api.h.jsxs)(api.h.Fragment, {
                                    children: [
                                      !z &&
                                        (0, api.h.jsx)("button", {
                                          style: { ...Zt, margin: 0, justifySelf: "start" },
                                          onClick: () => R(!0),
                                          children: "Zacznij od nowa\u2026",
                                        }),
                                      z &&
                                        (0, api.h.jsxs)(api.h.Fragment, {
                                          children: [
                                            (0, api.h.jsx)("div", {
                                              style: { fontSize: 14, color: E.gold },
                                              children:
                                                "Na pewno? Ca\u0142y post\u0119p zostanie usuni\u0119ty.",
                                            }),
                                            (0, api.h.jsxs)("div", {
                                              style: {
                                                display: "grid",
                                                gridTemplateColumns:
                                                  "repeat(auto-fit, minmax(140px, 1fr))",
                                                gap: 6,
                                              },
                                              children: [
                                                (0, api.h.jsx)("button", {
                                                  style: {
                                                    ...Ut,
                                                    background: "#c0283c",
                                                    margin: 0,
                                                  },
                                                  onClick: () => {
                                                    (api.rp(),
                                                      ue(!1),
                                                      R(!1),
                                                      (u.current = null),
                                                      Gt("create"));
                                                  },
                                                  children: "Tak, usu\u0144 post\u0119p",
                                                }),
                                                (0, api.h.jsx)("button", {
                                                  style: { ...Zt, margin: 0 },
                                                  onClick: () => R(!1),
                                                  children: "Anuluj",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                    ],
                                  }),
                                ),
                              ],
                            }),
                        ],
                      }),
                      (0, api.h.jsxs)("div", {
                        style: {
                          ...qa,
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "8px 10px",
                        },
                        children: [
                          (0, api.h.jsxs)("div", {
                            style: { display: "flex", gap: 6, flexWrap: "wrap", minWidth: 0 },
                            children: [
                              Je("POZ " + p.lvl, E.cyan),
                              Je(p.coins + " gr"),
                              p.pts > 0 && Je("+" + p.pts + " pkt"),
                            ],
                          }),
                          (0, api.h.jsx)("button", {
                            style: { ...Ut, margin: 0 },
                            onClick: () => {
                              api.jf(ve.current, performance.now()) && Jn();
                            },
                            children: "\u25B6 Wr\xF3\u0107 do gry",
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              M === "dialog" &&
                p &&
                (0, api.h.jsx)("div", {
                  onPointerDown: () => {
                    le.current.fresh = !0;
                  },
                  style: { ...na("end"), background: "rgba(12,8,22,0.35)" },
                  children: (0, api.h.jsxs)("div", {
                    style: Yi(820, { maxHeight: mt ? "100%" : "78%" }),
                    children: [
                      (0, api.h.jsxs)("div", {
                        style: ea,
                        children: [
                          (0, api.h.jsx)("div", {
                            style: { ...Za, fontSize: 18 },
                            children: api.Zn[g],
                          }),
                          (0, api.h.jsx)("button", {
                            style: {
                              ...Ti,
                              minHeight: 44,
                              padding: "6px 12px",
                              fontSize: 14,
                              margin: 0,
                            },
                            onClick: () => {
                              (api.fe(p), Jn());
                            },
                            children: "\u2715 Zamknij",
                          }),
                        ],
                      }),
                      (0, api.h.jsx)("div", { style: ta, children: D2() }),
                    ],
                  }),
                }),
              M === "dead" &&
                (0, api.h.jsx)("div", {
                  style: { ...na("center"), background: "rgba(12,8,22,0.55)" },
                  children: (0, api.h.jsxs)("div", {
                    style: Yi(560),
                    children: [
                      (0, api.h.jsx)("div", {
                        style: ea,
                        children: (0, api.h.jsx)("div", {
                          style: Za,
                          children: "Twoja bohaterka pad\u0142a",
                        }),
                      }),
                      (0, api.h.jsx)("div", {
                        style: ta,
                        children: (0, api.h.jsx)("div", {
                          style: Lt,
                          children:
                            "Twoja pozycja w kolejce: 4815. Wrócisz do ostatniej kapliczki z pełnym zdrowiem i stracisz 20% groszy. Poziom, bronie i zadania zostają; boss wraca do początku bieżącej fazy." +
                            (p && p.zone === 15 && (p.f.lichTry || 0) >= 2
                              ? " Lichwa Lidia bije mocniej niż twój ekwipunek. Zanim wejdziesz trzeci raz: u Wandy zbierz odłamki pancerza, u Horacego w wieży przynieś zębatkę ze strychu młyna, u Igi w aptece kup eliksiry i rozdaj punkty w menu Postać. W dzienniku przycisk Prowadź ustawia strzałkę, jeśli te zadania już masz. Duch Helpdesku powie, jak tu walczyć. W Przysiółku za Młynem (południe Łąki) ludzie żyją zwyczajnie i też mają drobne sprawy."
                              : ""),
                        }),
                      }),
                      (0, api.h.jsx)("div", {
                        style: qa,
                        children: (0, api.h.jsx)("button", {
                          style: Ut,
                          onClick: k2,
                          children: "Wr\xF3\u0107 do kapliczki",
                        }),
                      }),
                    ],
                  }),
                }),
              M === "win" &&
                p &&
                (0, api.h.jsx)("div", {
                  style: { ...na("center"), background: "rgba(12,8,22,0.55)" },
                  children: (0, api.h.jsxs)("div", {
                    style: Yi(600),
                    children: [
                      (0, api.h.jsx)("div", {
                        style: ea,
                        children: (0, api.h.jsx)("div", {
                          style: Za,
                          children: p.f["sqd:rom1"]
                            ? "\u015Awiat zamkni\u0119ty urz\u0119dowo"
                            : p.f.audit
                              ? "Audyt z\u0142o\u017Cony"
                              : p.f.root
                                ? "Root przyj\u0119ty"
                                : p.f.kozacki
                                  ? "Akt 3 \u2014 prawie!"
                                  : p.f.lich
                                    ? "Akt 2 uko\u0144czony"
                                    : "Akt 1 uko\u0144czony",
                        }),
                      }),
                      (0, api.h.jsxs)("div", {
                        style: ta,
                        children: [
                          (0, api.h.jsx)("div", {
                            style: Lt,
                            children: p.f["sqd:rom1"]
                              ? "Protok\xF3\u0142 zamkni\u0119cia ostemplowany. " +
                                p.look.name +
                                " uratowa\u0142a \u015Bwiat i dosta\u0142a na to papier."
                              : p.f.audit
                                ? "AUDYT-BOT le\u017Cy. Archiwistka Roma czeka z protoko\u0142em zamkni\u0119cia \u015Bwiata."
                                : p.f.root
                                  ? "Kryszta\u0142 przyj\u0105\u0142 root, ale na wschodzie Serwerowni otworzy\u0142o si\u0119 Archiwum Milczenia. AUDYT-BOT jeszcze nie podpisa\u0142."
                                  : p.f.kozacki
                                    ? "Kozacki Root pad\u0142. Zanie\u015B Token do Kryszta\u0142u \u2014 dopiero wtedy \u015Bwiat b\u0119dzie uratowany."
                                    : p.f.lich
                                      ? "Twist: Lichwa Lidia by\u0142a tylko eskalacj\u0105 Hold Music. Serce Kolejki bije dalej \u2014 strza\u0142ka prowadzi przez Cmentarzysko, Labirynt Firewalli i Przedpok\xF3j a\u017C do Kozackiego Roota."
                                      : "Kryszta\u0142 mrugn\u0105\u0142 tylko tymczasow\u0105 odpowiedzi\u0105. To nie koniec \u2014 wr\xF3\u0107 do Bogdana. Act 2 czeka.",
                          }),
                          (0, api.h.jsxs)("div", {
                            style: { ...Lt, marginTop: 8, fontFamily: Ft },
                            children: [
                              "Poziom ",
                              p.lvl,
                              " \xB7 Czas ",
                              Math.floor(p.time / 60),
                              " min \xB7 Grosze ",
                              p.coins,
                              " \xB7 \u015Amierci ",
                              p.deaths,
                            ],
                          }),
                        ],
                      }),
                      (0, api.h.jsxs)("div", {
                        style: qa,
                        children: [
                          (0, api.h.jsx)("button", {
                            style: Zt,
                            onClick: () => Gt("menu"),
                            children: "Menu g\u0142\xF3wne",
                          }),
                          (0, api.h.jsx)("button", {
                            style: Ut,
                            onClick: () => {
                              (p &&
                                p.f.won &&
                                !p.f.act2 &&
                                ((p.f.act2 = !0), (p.dirty = !0), api.fe(p)),
                                (p.win = !1),
                                Jn());
                            },
                            children: p.f["sqd:rom1"]
                              ? "Graj dalej (sekrety)"
                              : p.f.audit
                                ? "\u25B6 Do Romy"
                                : p.f.root
                                  ? "\u25B6 Do Archiwum"
                                  : p.f.kozacki
                                    ? "\u25B6 Do Kryszta\u0142u"
                                    : p.f.lich
                                      ? "\u25B6 Act 3: za strza\u0142k\u0105"
                                      : "\u25B6 Act 2: dalej w fabu\u0142\u0119",
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
            ],
          }),
        }),
      ],
    }),
  });
};
