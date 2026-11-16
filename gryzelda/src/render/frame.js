// @ts-nocheck
/* Klatka widoku, minimapa, HUD na płótnie i ekran tytułowy.
   Nazwy wewnętrzne zostały po minifikacji — logika jest ta sama co w oryginalnej paczce. */
import { api } from "../runtime/api.js";

api.Dh = function Dh(e, t, n, i) {
  let a = api.Cn(t),
    r = t.time;
  if (!n.cur || n.cur.zone !== t.zone || t.layerDirty) {
    let z = api.Ph(t, a);
    ((n.cur = { zone: t.zone, ...z }), (t.layerDirty = !1));
  }
  let s = n.cur;
  (e.setTransform(1, 0, 0, 1, 0, 0), (e.imageSmoothingEnabled = !1));
  let u = t.zoom,
    f = t.px + t.fx * 22 + t.mvx * 18,
    c = t.py + t.fy * 16 + t.mvy * 14;
  t.zfx >= 0 && ((f = t.zfx), (c = t.zfy));
  let y = 1 - Math.exp(-((t.zfx >= 0 ? 4 : 7) * (1 / 60)));
  ((t.camX += (f - t.camX) * y), (t.camY += (c - t.camY) * y));
  let w = api.oe / (2 * u),
    b = api.de / (2 * u),
    x = a.w * api.T,
    M = a.h * api.T;
  {
    let z = api.Eh(a.w * api.T, a.h * api.T, w, b, u);
    ((t.camX = z.x0 > z.x1 ? (z.x0 + z.x1) / 2 : api.vt(t.camX, z.x0, z.x1)),
      (t.camY = z.y0 > z.y1 ? (z.y0 + z.y1) / 2 : api.vt(t.camY, z.y0, z.y1)));
  }
  let j = t.shake > 0 ? (Math.random() - 0.5) * t.shake : 0,
    D = t.shake > 0 ? (Math.random() - 0.5) * t.shake : 0,
    l = Math.round(api.oe / 2 - t.camX * u + j),
    d = Math.round(api.de / 2 - t.camY * u + D);
  ((e.fillStyle = "#0d0a14"),
    e.fillRect(0, 0, api.oe, api.de),
    e.setTransform(u, 0, 0, u, l, d),
    api.o(e, "#070510", -6, -6, x + 12, M + 12));
  let v = Math.max(0, Math.floor((t.camX - w) / api.T) - 1),
    g = Math.max(0, Math.floor((t.camY - b) / api.T) - 1),
    C = Math.min(a.w - 1, Math.ceil((t.camX + w) / api.T) + 1),
    S = Math.min(a.h - 1, Math.ceil((t.camY + b) / api.T) + 2),
    P = v * api.T,
    N = g * api.T,
    Q = (C - v + 1) * api.T,
    W = (S - g + 1) * api.T;
  e.drawImage(s.ground, P, N, Q, W, P, N, Q, W);
  let _ = [[t.px, t.py - 4, a.theme === "grass" || a.theme === "garden" ? 0 : 78, 1]];
  if ((api.Ch(e, t, a, v, g, C, S, r, _), a.theme === "grass" || a.theme === "garden")) {
    e.fillStyle = "rgba(20,30,40,0.10)";
    for (let z = 0; z < 5; z++) {
      let R = ((z * 211 + r * 8) % (x + 200)) - 100,
        O = api.me(z, 3) * M;
      (e.beginPath(), e.ellipse(R, O, 60, 26, 0, 0, Math.PI * 2), e.fill());
    }
  }
  let ie = (z, R, O = 32) =>
    z > t.camX - w - O && z < t.camX + w + O && R > t.camY - b - O && R < t.camY + b + O;
  for (let z of a.chests) {
    let R = api.Y(z.tx),
      O = api.Y(z.ty);
    if (!ie(R, O)) continue;
    let q = t.cut["chest:" + z.id],
      ye = api.Ue("chest" + (q ? 1 : 0), 16, 14, (F) => {
        (api.o(F, "#5a3a1e", 1, 4, 14, 10),
          api.o(F, "#8b5a2b", 2, 5, 12, 8),
          api.o(F, "#c9a227", 1, 8, 14, 1),
          q
            ? (api.o(F, "#2a1a0a", 2, 4, 12, 3), api.o(F, "#a0703a", 1, 0, 14, 3))
            : (api.o(F, "#a0703a", 1, 1, 14, 5),
              api.o(F, "#c89050", 2, 1, 12, 1),
              api.o(F, "#ffd84a", 7, 6, 2, 3)));
      });
    (e.drawImage(ye, R - 9, O - 9),
      !q && Math.floor(r * 3) % 2 && api.o(e, "#ffffff", R + 5, O - 10, 1, 1),
      q || _.push([R, O, 26, 0.5]));
  }
  for (let z of t.blocks) {
    if (((z.x += (z.tx * api.T - z.x) * 0.3), (z.y += (z.ty * api.T - z.y) * 0.3), !ie(z.x, z.y)))
      continue;
    let R = api.Ue("block", 16, 18, (O) => {
      (api.o(O, "#3e3a30", 0, 14, 16, 4),
        api.o(O, "#8a8570", 0, 2, 16, 13),
        api.o(O, "#a8a28a", 0, 0, 16, 4),
        api.o(O, "#6e6a5a", 2, 6, 12, 1),
        api.o(O, "#6e6a5a", 2, 10, 12, 1),
        api.o(O, "#c49bff", 6, 7, 4, 3));
    });
    e.drawImage(R, Math.round(z.x) - 1, Math.round(z.y) - 3);
  }
  for (let z of t.items) {
    if (!ie(z.x, z.y)) continue;
    z.kind === "klucz" && !t.f.gate && (e.globalAlpha = 0.4);
    let R = Math.round(Math.sin(r * 4 + z.x) * 1.5);
    (api.o(e, "rgba(0,0,0,0.25)", z.x - 4, z.y + 5, 8, 2),
      api.Si(e, z.kind === "qi" ? "qi:" + api.oh(z.id) : z.kind, z.x, z.y + R - 2, r),
      (e.globalAlpha = 1),
      (z.kind === "qi" ||
        z.kind === "grzyb" ||
        z.kind === "crystal" ||
        z.kind === "seal" ||
        z.kind === "root" ||
        z.kind === "badge" ||
        z.kind === "manifest") &&
        _.push([z.x, z.y, z.kind === "crystal" || z.kind === "root" ? 70 : 30, 0.8]));
  }
  let ze = [];
  for (let z of a.npcs) {
    if (z.id === "kot" && t.f.cat) continue;
    let R = api.Af(t, z),
      O = Math.round(R.x),
      q = Math.round(R.y);
    if (!ie(O, q)) continue;
    let ye = api.e2(t, z.id),
      F = api.Is[z.id] ? t.np[z.id] : null;
    ze.push({
      y: q,
      fn: () => {
        F
          ? e.drawImage(
              api.Yp(z.id, F.fx, F.fy, F.moving ? Math.floor(F.walk * 7) % 4 : 0),
              O - 11,
              q - 24,
            )
          : e.drawImage(api.Xp(ye, Math.floor(r * 2 + z.tx) % 2), O - 11, q - 21);
        F && F.duel && api.npcBlade(e, O, q, F);
        let k = q + api.t2(ye) - 2,
          L =
            (z.id === "bogdan" && (!t.f.bogdan || (t.f.won && !t.f.act2))) ||
            (z.id === "bogdan" && t.f.riverBlock && !t.f.bogdanBridge && !t.f["sqd:kamMost"]) ||
            (z.id === "jadzia" && (!t.f.catQ || (t.f.cat && !t.f.catDone))) ||
            (z.id === "zenek" && (!t.f.nestQ || (api.Ds(t) >= 3 && !t.f.nestDone))) ||
            (z.id === "halina" && (!t.f.mushQ || (api.Ns(t) >= 5 && !t.f.mushDone))) ||
            (z.id === "mietek" &&
              !!t.f.bogdan &&
              (!t.f.cellarQ || (api.Rs(t) >= 2 && !t.f.cellarDone))) ||
            (z.id === "zbyszek" &&
              ((!!t.f.seal && !t.f.luteQ) || (!!t.f.luteFound && !t.f.luteDone))) ||
            (z.id === "piotr" && !!t.f.act2 && !t.f.westDone) ||
            (z.id === "basia" && !!t.f.act2 && !t.f.southDone) ||
            (z.id === "ghost" && !!t.f.undead && !t.f.lich) ||
            api.dh(t, z.id),
          ce = Math.round(Math.sin(r * 6) * 1.5);
        t.near && t.near.id === z.id
          ? (api.cn(e, O - 9, k - 9 + ce, 18, 9),
            (e.font = "7px monospace"),
            (e.fillStyle = "#ffffff"),
            (e.textBaseline = "top"),
            e.fillText(z.id === "kot" ? "Miau" : "E", O - (z.id === "kot" ? 7 : 2), k - 8 + ce))
          : L &&
            (api.o(e, "#1b1424", O - 2, k - 10 + ce, 5, 10),
            api.o(e, "#ffd84a", O - 1, k - 9 + ce, 3, 5),
            api.o(e, "#ffd84a", O - 1, k - 3 + ce, 3, 2));
      },
    });
  }
  for (let z of t.enemies)
    ie(z.x, z.y) &&
      ze.push({
        y: z.y,
        fn: () => {
          let R = Math.floor(r * (z.kind === "bat" ? 10 : 4) + z.uid) % 2,
            O = z.kind === "charger" && z.z !== 0 ? 1 : 0,
            look = z.kind === "lich" && t.zone === 25 ? "root" : z.kind,
            q = api.bh(look, R, O);
          (z.inv > 0.1 && (q = api.dp(look + R + O, q)),
            z.elite &&
              ((e.globalAlpha = 0.35 + Math.sin(r * 5) * 0.15),
              api.ge(e, "#ffd84a", Math.round(z.x), Math.round(z.y + 2), 11),
              (e.globalAlpha = 1)));
          let ye = Math.round(Math.max(0, z.z));
          (z.kind === "king" || z.kind === "golem" || z.kind === "lich" || z.kind === "phantom" || z.kind === "stamper" || z.kind === "reklamator"
            ? api.o(e, "rgba(0,0,0,0.3)", z.x - 13 + ye / 3, z.y + 9, 26 - ye / 1.5, 4)
            : z.kind === "bat"
              ? api.o(e, "rgba(0,0,0,0.22)", z.x - 4, z.y + 9, 8, 2)
              : api.o(e, "rgba(0,0,0,0.25)", z.x - 6, z.y + 5, 12, 3),
            e.drawImage(
              q,
              Math.round(z.x - q.width / 2),
              Math.round(z.y - q.height / 2 - ye - (z.kind === "king" ? 4 : 2)),
            ),
            (z.kind === "spam" || z.kind === "ticket") &&
              z.cd < 0.45 &&
              Math.hypot(z.x - t.px, z.y - t.py) < 140 &&
              (api.o(e, "#1b1424", z.x - 2, z.y - 22, 5, 9),
              api.o(e, "#ff4d6d", z.x - 1, z.y - 21, 3, 4),
              api.o(e, "#ff4d6d", z.x - 1, z.y - 16, 3, 2)),
            z.kind === "charger" &&
              z.z < 0 &&
              (api.o(e, "#1b1424", z.x - 2, z.y - 22, 5, 9),
              api.o(e, "#ffd84a", z.x - 1, z.y - 21, 3, 4),
              api.o(e, "#ffd84a", z.x - 1, z.y - 16, 3, 2)),
            ((z.windT > 0) || (z.kind === "snake" && z.cd < 0.45 && Math.hypot(z.x - t.px, z.y - t.py) < 100)) &&
              (api.o(e, "#1b1424", z.x - 2, z.y - 22, 5, 9),
              api.o(e, z.kind === "snake" ? "#c8ff5a" : "#ff9a3c", z.x - 1, z.y - 21, 3, 4),
              api.o(e, z.kind === "snake" ? "#c8ff5a" : "#ff9a3c", z.x - 1, z.y - 16, 3, 2)),
            z.kind === "phone" &&
              z.cd < 0.8 &&
              (api.o(e, "#1b1424", z.x - 2, z.y - 22, 5, 9),
              api.o(e, "#5cf28a", z.x - 1, z.y - 21, 3, 4),
              api.o(e, "#5cf28a", z.x - 1, z.y - 16, 3, 2)),
            z.hp < z.maxHp &&
              z.kind !== "king" &&
              (api.o(e, "#1b1424", z.x - 7, z.y - 14, 14, 3),
              api.o(
                e,
                "#ff5050",
                z.x - 6,
                z.y - 13,
                Math.max(0, Math.round((12 * z.hp) / z.maxHp)),
                1,
              )));
          let F = api.Qk(api.Vo(t.lvl, z.lvl)),
            k = z.y - q.height / 2 - ye - (z.kind === "king" ? 10 : 8);
          ((e.font = "6px monospace"),
            (e.textAlign = "center"),
            (e.textBaseline = "bottom"),
            (e.fillStyle = "#1b1424"),
            e.fillText(String(z.lvl), Math.round(z.x) + 1, Math.round(k) + 1),
            (e.fillStyle = F),
            e.fillText(String(z.lvl), Math.round(z.x), Math.round(k)),
            z.elite &&
              ((e.fillStyle = "#1b1424"),
              e.fillText("\u2605 " + z.elite, Math.round(z.x) + 1, Math.round(k) - 6),
              (e.fillStyle = "#ffd84a"),
              e.fillText("\u2605 " + z.elite, Math.round(z.x), Math.round(k) - 7)),
            (e.textAlign = "left"),
            (e.textBaseline = "alphabetic"));
        },
      });
  for (let z of t.flock || [])
    ie(z.x, z.y) &&
      ze.push({
        y: z.y,
        fn: () => {
          let R = api.baa(!!z.dark, z.moving ? Math.floor(z.walk * 8) % 2 : 0),
            face = z.face < 0 ? -1 : 1,
            sx = Math.round(z.x),
            sy = Math.round(z.y - 11);
          if (z.dead) {
            let k = z.fall > 0 ? 1 - z.fall / 0.45 : 1;
            (e.save(),
              e.translate(sx, sy + 8),
              e.rotate(-1.57 * k),
              e.drawImage(R, -10, -8),
              e.restore());
            return;
          }
          if (face < 0) {
            e.save();
            e.translate(sx, 0);
            e.scale(-1, 1);
            e.drawImage(R, -10, sy);
            e.restore();
          } else e.drawImage(R, sx - 10, sy);
        },
      });
  let ke = t.boss;
  (ke &&
    !t.f.boss &&
    ze.push({
      y: ke.y + 10,
      fn: () => {
        let z = ke.hp / ke.maxHp < 0.5,
          R = api.vh(Math.floor(r * 2) % 2, z);
        (ke.inv > 0.1 && (R = api.dp("boss" + z, R)),
          api.o(e, "rgba(0,0,0,0.3)", ke.x - 16, ke.y + 20, 32, 4),
          e.drawImage(R, Math.round(ke.x - 23), Math.round(ke.y - 26 + Math.sin(r * 3) * 2)),
          _.push([ke.x, ke.y, 60, 0.7]));
      },
    }),
    ze.push({
      y: t.py,
      fn: () => {
        if (t.inv > 0 && Math.floor(t.inv * 12) % 2 === 0) return;
        let spinning = t.spinT > 0,
          R =
            Math.hypot(t.mvx, t.mvy) > 0.05
              ? Math.floor(t.walk * 9) % 4
              : (Math.floor(r * 1.5) % 2, 0),
          O = spinning ? 2 : api.hh(t),
          q = api.Zf(t.look, spinning ? 1 : t.fx, spinning ? 0 : t.fy, R, t.castT > 0, t.weapon, O),
          ye = O === 2 ? 1 : O === 1 ? -1 : 0,
          veil = t.god && t.god.veil;
        (veil && (e.save(), (e.globalAlpha = 0.42)),
          spinning
            ? (e.save(),
              e.translate(Math.round(t.px), Math.round(t.py - 8)),
              e.rotate((1 - t.spinT / 0.3) * Math.PI * 2),
              e.drawImage(q, -22, -23),
              e.restore())
            : (t.fy < 0 && t.swing > 0 && api.yp(e, t),
              e.drawImage(q, Math.round(t.px - 22 + t.fx * ye), Math.round(t.py - 31 + t.fy * ye)),
              t.fy >= 0 && t.swing > 0 && api.yp(e, t)),
          veil && e.restore(),
          t.god &&
            t.god.imm &&
            api.o(e, "#ffd84a", Math.round(t.px - 6), Math.round(t.py - 2), 12, 1));
      },
    }));
  for (let z of s.objs) {
    if (
      z.x > t.camX + w + 4 ||
      z.x + z.w < t.camX - w - 4 ||
      z.y > t.camY + b + 4 ||
      z.y + z.h < t.camY - b - 4
    )
      continue;
    ze.push({ y: z.base, fn: () => e.drawImage(z.cv, z.x, z.y) });
    let R = z.lm;
    R && ze.push({ y: z.base + 0.01, fn: () => api.Mh(e, R, r, _) });
  }
  ze.sort((z, R) => z.y - R.y);
  for (let z of ze) z.fn();
  if (t.marks && t.marks.length && api.drawMark) for (let z of t.marks) api.drawMark(e, z, t.time || 0);
  if (t.spinT > 0) {
    let z = (1 - t.spinT / 0.3) * Math.PI * 2;
    for (let R = 0; R < 10; R++) {
      let O = z - R * 0.18;
      api.o(
        e,
        "rgba(232,240,255," + (0.95 - R * 0.09).toFixed(2) + ")",
        t.px + Math.cos(O) * 20 - 2,
        t.py - 2 + Math.sin(O) * 20 - 2,
        4,
        4,
      );
    }
  }
  if (t.ward > 0) {
    let z = 12 + Math.sin(r * 6);
    for (let R = 0; R < 16; R++) {
      let O = (R / 16) * Math.PI * 2 + r;
      api.o(e, "rgba(159,216,255,0.85)", t.px + Math.cos(O) * z, t.py - 4 + Math.sin(O) * z, 1, 1);
    }
  }
  for (let z of t.pshots) {
    let R = Math.round(z.x),
      O = Math.round(z.y),
      q = Math.hypot(z.vx, z.vy) || 1;
    if (z.kind === "arrow" || z.kind === "quarrel") {
      let ye = z.kind === "quarrel" ? 9 : 8;
      for (let F = 0; F < ye; F++)
        api.o(
          e,
          F < 2 ? "#ffffff" : z.kind === "quarrel" ? "#4a4a5a" : "#8b5a2b",
          R - (z.vx / q) * F,
          O - (z.vy / q) * F,
          F < 2 ? 2 : 1,
          F < 2 ? 2 : 1,
        );
      api.o(e, "#d23", R - (z.vx / q) * (ye - 1), O - (z.vy / q) * (ye - 1), 2, 2);
    } else
      z.kind === "bolt"
        ? (api.o(e, "#1b1424", R - 4, O - 4, 8, 8),
          api.o(e, "#7b4fd1", R - 3, O - 3, 6, 6),
          api.o(e, "#e0ccff", R - 1, O - 1, 3, 3),
          _.push([R, O, 24, 0.6]))
        : z.kind === "spark"
          ? api.o(e, "#c49bff", R - 1, O - 1, 3, 3)
          : z.kind === "fire"
            ? (api.o(e, "#1b1424", R - 5, O - 5, 10, 10),
              api.o(e, "#c0392b", R - 4, O - 4, 8, 8),
              api.o(e, "#ff9a3c", R - 3, O - 3, 6, 6),
              api.o(e, "#ffd84a", R - 1, O - 1, 3, 3),
              _.push([R, O, 44, 1]))
            : (api.o(e, "#1b1424", R - 4, O - 5, 9, 11),
              api.o(e, "#ffd84a", R - 3, O - 4, 7, 9),
              api.o(e, "#d23", R - 1, O - 2, 3, 1));
  }
  for (let z of t.eshots) {
    let R = Math.round(z.x),
      O = Math.round(z.y);
    z.kind === "ticket"
      ? (api.o(e, "#1b1424", R - 4, O - 5, 9, 11),
        api.o(e, "#f4f4f4", R - 3, O - 4, 7, 9),
        api.o(e, "#d23", R - 1, O - 2, 3, 1),
        api.o(e, "#d23", R + 1, O - 1, 1, 1),
        api.o(e, "#d23", R, O, 1, 1),
        api.o(e, "#d23", R, O + 2, 1, 1))
      : (api.o(e, "#1b1424", R - 5, O - 4, 10, 8),
        api.o(e, "#ffffff", R - 4, O - 3, 8, 6),
        api.o(e, "#d23", R - 4, O - 3, 4, 1),
        api.o(e, "#d23", R, O - 3, 4, 1),
        api.o(e, "#d23", R - 1, O - 2, 2, 1));
  }
  for (let z of t.bolts) {
    ((e.strokeStyle = "rgba(200,230,255," + (z.life / 0.18).toFixed(2) + ")"),
      (e.lineWidth = 2),
      e.beginPath());
    for (let R = 0; R < z.pts.length; R++) {
      let O = z.pts[R],
        q = R > 0 && R < z.pts.length ? (Math.random() - 0.5) * 6 : 0;
      if (R === 0) e.moveTo(O[0], O[1]);
      else {
        let ye = z.pts[R - 1];
        (e.lineTo((O[0] + ye[0]) / 2 + q, (O[1] + ye[1]) / 2 + q), e.lineTo(O[0], O[1]));
      }
    }
    (e.stroke(), (e.lineWidth = 1));
    for (let R of z.pts) _.push([R[0], R[1], 30, 1]);
  }
  for (let z = 0; z < 34; z++) {
    let R = a.theme,
      O = api.me(z, 11) * api.oe,
      q = api.me(z, 12) * api.de,
      ye = R === "server" ? 0 : R === "ruins" ? 2 : R === "forest" ? 6 : 14,
      F = R === "server" ? -18 : R === "ruins" ? (z % 7 === 0 ? 60 : 3) : R === "forest" ? 9 : 7,
      k = t.camX - w + ((((O + r * ye + Math.sin(r * 1.3 + z) * 6) % api.oe) + api.oe) % api.oe),
      L = t.camY - b + ((((q + r * F) % api.de) + api.de) % api.de);
    if (R === "inn") {
      z % 3 === 0 &&
        api.o(e, "rgba(255,230,180," + (0.2 + Math.sin(r + z) * 0.12).toFixed(2) + ")", k, L, 1, 1);
      continue;
    }
    if (R === "server") {
      api.o(e, z % 4 ? "rgba(92,242,138,0.5)" : "rgba(127,247,255,0.6)", k, L, 1, z % 3 ? 3 : 2);
      continue;
    }
    if (R === "ruins") {
      z % 7 === 0
        ? api.o(e, "rgba(160,200,255,0.6)", k, L, 1, 2)
        : api.o(
            e,
            "rgba(230,220,200," + (0.25 + Math.sin(r * 2 + z) * 0.15).toFixed(2) + ")",
            k,
            L,
            1,
            1,
          );
      continue;
    }
    if (R === "forest" && z % 3) {
      let Be = 0.5 + Math.sin(r * 3 + z) * 0.5;
      (api.o(e, "rgba(255,240,120," + Be.toFixed(2) + ")", k, L, 1, 1),
        _.push([k, L, 10, 0.5 * Be]));
      continue;
    }
    let ce =
        R === "garden"
          ? z % 2
            ? "#ff9ab8"
            : "#ffe0ec"
          : R === "forest"
            ? "#c87a2a"
            : z % 3
              ? "#d8e890"
              : "#9ac850",
      je = Math.floor(r * 4 + z) % 2;
    api.o(e, ce, k, L, je ? 2 : 1, je ? 1 : 2);
  }
  for (let z = 0; z < 0; z++) {
    let R =
        t.camX -
        w +
        (((api.me(z, 11) * api.oe +
          r * (a.theme === "forest" ? 8 : a.theme === "server" ? 0 : 12)) %
          api.oe) /
          u) *
          u,
      O =
        t.camY -
        b +
        ((((api.me(z, 12) * api.de +
          r * (a.theme === "server" ? -14 : a.theme === "forest" ? 10 : 4) +
          Math.sin(r + z) * 4) %
          api.de) +
          api.de) %
          api.de),
      q =
        a.theme === "forest"
          ? z % 3
            ? "rgba(255,240,120," + (0.5 + Math.sin(r * 3 + z) * 0.5).toFixed(2) + ")"
            : "#a86a2a"
          : a.theme === "ruins"
            ? "rgba(230,220,200,0.35)"
            : a.theme === "server"
              ? "rgba(92,242,138,0.45)"
              : "rgba(255,255,230,0.55)";
    (api.o(e, q, R, O, 1, 1), a.theme === "forest" && z % 3 && _.push([R, O, 8, 0.4]));
  }
  for (let z of t.parts)
    ((e.globalAlpha = api.vt(z.life / z.max, 0, 1)), api.o(e, z.col, z.x, z.y, z.s, z.s));
  ((e.globalAlpha = 1),
    (e.font = "bold 7px monospace"),
    (e.textAlign = "center"),
    (e.textBaseline = "middle"));
  for (let z of t.texts)
    ((e.globalAlpha = api.vt(z.life / 0.5, 0, 1)),
      (e.fillStyle = "#1b1424"),
      e.fillText(z.txt, z.x + 1, z.y + 1),
      (e.fillStyle = z.col),
      e.fillText(z.txt, z.x, z.y));
  ((e.globalAlpha = 1), (e.textAlign = "left"));
  let le = api.Ff(t);
  if (le && ie(le.x, le.y, -8)) {
    let z = Math.round(Math.sin(r * 5) * 2),
      R = api.wh(t, a, le);
    (api.o(e, "#1b1424", le.x - 3, R + z, 7, 7),
      api.o(e, "#ffd84a", le.x - 2, R + 1 + z, 5, 5),
      api.o(e, "#fff4b0", le.x - 1, R + 1 + z, 2, 2));
  }
  e.setTransform(1, 0, 0, 1, 0, 0);
  let ve = {
      grass: "rgba(40,20,60,0.10)",
      garden: "rgba(80,40,10,0.06)",
      forest: "rgba(6,22,18,0.50)",
      ruins: "rgba(14,8,24,0.58)",
      server: "rgba(4,8,30,0.50)",
      inn: "rgba(30,14,4,0.32)",
      swamp: "rgba(10,28,18,0.45)",
      undead: "rgba(8,18,12,0.62)",
      depot: "rgba(24,16,10,0.48)",
    },
    Te = api.Vn(i);
  ((Te.globalCompositeOperation = "source-over"),
    Te.clearRect(0, 0, api.oe, api.de),
    (Te.fillStyle = ve[a.theme]),
    Te.fillRect(0, 0, api.oe, api.de),
    (Te.globalCompositeOperation = "destination-out"));
  for (let z of _) {
    let R = (z[0] - t.camX) * u + api.oe / 2,
      O = (z[1] - t.camY) * u + api.de / 2,
      q = z[2] * u;
    if (R < -q || R > api.oe + q || O < -q || O > api.de + q) continue;
    let ye = Te.createRadialGradient(R, O, 0, R, O, q);
    (ye.addColorStop(0, "rgba(0,0,0," + z[3] + ")"),
      ye.addColorStop(1, "rgba(0,0,0,0)"),
      (Te.fillStyle = ye),
      Te.fillRect(R - q, O - q, q * 2, q * 2));
  }
  if ((e.drawImage(i, 0, 0), a.theme === "ruins" || a.theme === "forest")) {
    e.globalCompositeOperation = "lighter";
    for (let z of _) {
      if (z[2] < 40 || z[2] > 60) continue;
      let R = (z[0] - t.camX) * u + api.oe / 2,
        O = (z[1] - t.camY) * u + api.de / 2,
        q = e.createRadialGradient(R, O, 0, R, O, z[2] * 0.6);
      (q.addColorStop(0, a.theme === "ruins" ? "rgba(255,150,60,0.18)" : "rgba(120,255,200,0.12)"),
        q.addColorStop(1, "rgba(0,0,0,0)"),
        (e.fillStyle = q),
        e.fillRect(R - 40, O - 40, 80, 80));
    }
    e.globalCompositeOperation = "source-over";
  }
  let ft = Math.min(api.oe, api.de) * 0.55,
    tt = Math.max(ft + 20, Math.hypot(api.oe, api.de) * 0.62),
    ue = e.createRadialGradient(api.oe / 2, api.de / 2, ft, api.oe / 2, api.de / 2, tt);
  if (
    (ue.addColorStop(0, "rgba(0,0,0,0)"),
    ue.addColorStop(
      1,
      a.theme === "grass" || a.theme === "garden" ? "rgba(10,5,20,0.22)" : "rgba(10,5,20,0.4)",
    ),
    (e.fillStyle = ue),
    e.fillRect(0, 0, api.oe, api.de),
    t.hp / api.Ze(t) <= 0.3 && !t.dead)
  ) {
    let z = 0.25 + Math.sin(r * 6) * 0.12,
      R = e.createRadialGradient(
        api.oe / 2,
        api.de / 2,
        Math.min(api.oe, api.de) * 0.4,
        api.oe / 2,
        api.de / 2,
        Math.max(Math.min(api.oe, api.de) * 0.4 + 20, Math.hypot(api.oe, api.de) * 0.6),
      );
    (R.addColorStop(0, "rgba(255,0,0,0)"),
      R.addColorStop(1, "rgba(200,0,30," + z.toFixed(2) + ")"),
      (e.fillStyle = R),
      e.fillRect(0, 0, api.oe, api.de));
  }
  if (le && !ie(le.x, le.y, -8)) {
    let z = (le.x - t.camX) * u,
      R = (le.y - t.camY) * u,
      O = Math.atan2(R, z),
      q = Math.min(
        (api.oe / 2 - 14) / Math.abs(Math.cos(O) || 0.001),
        (api.de / 2 - 14) / Math.abs(Math.sin(O) || 0.001),
      ),
      ye = api.oe / 2 + Math.cos(O) * q,
      F = api.de / 2 + Math.sin(O) * q,
      k = Math.sin(r * 6) * 2;
    (e.save(),
      e.translate(ye + Math.cos(O) * k, F + Math.sin(O) * k),
      e.rotate(O),
      (e.fillStyle = "#1b1424"),
      e.beginPath(),
      e.moveTo(7, 0),
      e.lineTo(-5, -6),
      e.lineTo(-2, 0),
      e.lineTo(-5, 6),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#ffd84a"),
      e.beginPath(),
      e.moveTo(5, 0),
      e.lineTo(-4, -4),
      e.lineTo(-1, 0),
      e.lineTo(-4, 4),
      e.closePath(),
      e.fill(),
      e.restore());
  }
  api.Rh(e, t, s);
};

api.Ph = function Ph(e, t) {
  let n = api.$n(t.w * api.T, t.h * api.T),
    i = api.$n(1, 1),
    a = api.$n(t.w, t.h),
    r = api.Vn(n),
    s = api.Vn(a);
  for (let f = 0; f < t.h; f++) for (let c = 0; c < t.w; c++) api.i2(r, e, t, c, f);
  api.clipPaint && api.clipPaint(r, t);
  let u = api.jh(e, t).map((f) => {
    let c = api.$n(f.w, f.h),
      y = api.Vn(c);
    return (
      f.kind.indexOf("furn:") === 0
        ? api.xh(y, f.kind.slice(5), f.tx, f.ty)
        : (y.translate(-f.x, -f.y), f.lm ? api.Sh(y, f.lm) : api.gh(y, e, t, f.tx, f.ty)),
      { x: f.x, y: f.y, w: f.w, h: f.h, base: f.base, cv: c, lm: f.lm }
    );
  });
  for (let f = 0; f < t.h; f++)
    for (let c = 0; c < t.w; c++) {
      let y = api.Pe(e, t.id, c, f),
        w =
          y === "w"
            ? "#3a74c8"
            : y === "t"
              ? t.theme === "forest"
                ? "#1a4426"
                : "#2e6b34"
              : y === "#"
                ? t.theme === "server"
                  ? "#14162a"
                  : "#3e3a30"
                : y === ":"
                  ? "#c9a676"
                  : y === "h" || y === "d"
                    ? "#a33b2b"
                    : y === "C" || y === "T" || y === "B" || y === "K" || y === "j" || y === "J"
                      ? "#5a3a1e"
                      : y === "E"
                        ? "#c49bff"
                        : y === "N" || y === "U" || y === "_"
                          ? "#c9a676"
                      : y === "F" || y === "O"
                        ? "#ff9a3c"
                        : y === "H"
                          ? "#7ff7ff"
                          : y === "="
                            ? "#a8743c"
                            : y === "r" || y === "b" || y === "x"
                              ? "#4a5a3a"
                              : y === "M"
                                ? "#ffd84a"
                                : api.Ws[t.theme].g0;
      api.o(s, w, c, f, 1, 1);
    }
  return { ground: n, top: i, mini: a, objs: u };
};

api.Rh = function Rh(e, t, n) {
  let i = t.time;
  ((e.font = "bold 7px monospace"), (e.textBaseline = "top"));
  let a = api.Ze(t),
    r = api.ut(t),
    s = Math.ceil(a / 2),
    u = api.o2(api.oe, api.Lf),
    f = Math.ceil(s / u),
    c = Math.max(Math.min(u, s) * 8 + 6, 46);
  api.cn(e, 3, 3, c, f * 8 + 14);
  for (let ue = 0; ue < s; ue++)
    api.a2(e, 6 + (ue % u) * 8, 6 + Math.floor(ue / u) * 8, api.vt((t.hp - ue * 2) / 2, 0, 1));
  let y = 7 + f * 8,
    w = c - 6;
  (api.o(e, "#1b1424", 6, y, w, 4),
    api.o(e, "#22305a", 7, y + 1, w - 2, 2),
    api.o(e, "#5b8cff", 7, y + 1, Math.round((w - 2) * api.vt(t.mp / r, 0, 1)), 2),
    api.o(e, "#a8c4ff", 7, y + 1, Math.round((w - 2) * api.vt(t.mp / r, 0, 1)), 1),
    api.o(e, "#1b1424", 0, api.de - 2, api.oe, 2),
    api.o(e, "#7ff7ff", 0, api.de - 2, Math.round((api.oe * t.xp) / api.$o(t.lvl)), 1));
  let b = 6,
    x = y + 7,
    M = (ue, z, R) => {
      z <= 0 ||
        (api.cn(e, b - 1, x, 13, 16),
        api.Si(e, ue, b + 5, x + 7, i),
        api.o(e, "#ffd84a", b, x + 12, Math.round((11 * z) / R), 1),
        (e.fillStyle = "#fff4b0"),
        (e.font = "5px monospace"),
        e.fillText(String(Math.ceil(z)) + "s", b, x + 14),
        (b += 15));
    };
  (M("kawa", t.buf.kawa, api.bt(t, "kawa")),
    M("ekspres", t.buf.ekspres, api.bt(t, "ekspres")),
    M("magnes", t.buf.magnes, api.bt(t, "magnes")),
    t.ward > 0 &&
      (api.cn(e, b - 1, x, 13, 13),
      api.Si(e, "banka", b + 5, x + 7, i),
      (e.fillStyle = "#fff"),
      e.fillText(String(t.ward), b + 8, x + 6),
      (b += 15)));
  let j = api.Cn(t),
    D = 46,
    l = 28,
    d = api.oe - D - 4,
    v = 4;
  api.cn(e, d - 1, v - 1, D + 2, l + 2);
  let g = Math.min(D / j.w, l / j.h),
    C = j.w * g,
    S = j.h * g,
    P = d + (D - C) / 2,
    N = v + (l - S) / 2;
  (e.drawImage(n.mini, 0, 0, j.w, j.h, P, N, C, S), (e.fillStyle = "rgba(20,14,34,0.92)"));
  for (let ue = 0; ue < Math.ceil(j.h / 8); ue++)
    for (let z = 0; z < Math.ceil(j.w / 8); z++)
      t.seen[t.zone + ":" + z + ":" + ue] ||
        e.fillRect(
          Math.floor(P + z * 8 * g),
          Math.floor(N + ue * 8 * g),
          Math.ceil(8 * g) + 1,
          Math.ceil(8 * g) + 1,
        );
  let Q = api.Ff(t);
  (Q &&
    (api.o(e, "#1b1424", P + (Q.x / api.T) * g - 2, N + (Q.y / api.T) * g - 2, 4, 4),
    api.o(e, "#ffd84a", P + (Q.x / api.T) * g - 1, N + (Q.y / api.T) * g - 1, 2, 2)),
    Math.floor(i * 3) % 2 &&
      api.o(e, "#ffffff", P + (t.px / api.T) * g - 1, N + (t.py / api.T) * g - 1, 3, 3),
    api.cn(e, d - 1, v + l + 3, D + 2, 11),
    api.o(e, "#ffd84a", d + 2, v + l + 5, 4, 6),
    api.o(e, "#b8860b", d + 2, v + l + 10, 4, 1),
    (e.fillStyle = "#ffffff"),
    e.fillText(String(t.coins), d + 8, v + l + 5),
    (e.fillStyle = t.pts > 0 ? "#ffd84a" : "#7ff7ff"),
    (e.textAlign = "right"),
    e.fillText("Lv" + t.lvl + (t.pts > 0 ? "+" : ""), d + D - 1, v + l + 5),
    (e.textAlign = "left"),
    api.xi ||
      (api.cn(e, 3, api.de - 18, 92, 13),
      (e.fillStyle = "#ffffff"),
      e.fillText(api.jn[t.weapon].name, 6, api.de - 15)),
    !api.xi &&
      t.active &&
      t.skills[t.active] &&
      ((e.fillStyle = "#c49bff"),
      (e.textAlign = "right"),
      e.fillText(api.Pt[t.active].name.split(" ")[0], 92, api.de - 15),
      (e.textAlign = "left")));
  let W = d + 7,
    _ = v + l + 24;
  (t.f.seal && !api.northOpen(t) && (api.Si(e, "seal", W, _, i), (W += 15)),
    t.f.key && !t.f.door && (api.Si(e, "klucz", W, _, i), (W += 15)),
    t.f.westKey && !t.f.westDone && (api.Si(e, "manifest", W, _, i), (W += 15)),
    t.f.southKey && !t.f.southDone && (api.Si(e, "badge", W, _, i), (W += 15)),
    t.f.rootTok && !t.f.root && api.Si(e, "root", W, _, i));
  let ie = t.boss,
    ze = api.Pf,
    ke = Math.min(144, api.oe - 16);
  if (ie && !t.f.boss && ie.awake) {
    let ue = Math.round(api.oe / 2 - ke / 2);
    (api.cn(e, ue, ze, ke, 14),
      api.o(e, "#3a0a14", ue + 4, ze + 8, ke - 8, 4),
      api.o(
        e,
        "#ff4d6d",
        ue + 4,
        ze + 8,
        Math.max(0, Math.round(((ke - 8) * ie.hp) / ie.maxHp)),
        4,
      ),
      api.o(
        e,
        "#ffb0c0",
        ue + 4,
        ze + 8,
        Math.max(0, Math.round(((ke - 8) * ie.hp) / ie.maxHp)),
        1,
      ));
    for (let z of [0.5, 0.25]) api.o(e, "#1b1424", ue + 4 + (ke - 8) * z, ze + 7, 1, 6);
    ((e.fillStyle = "#ffffff"),
      (e.textAlign = "center"),
      e.fillText("SUPPORT-BOT 3000", api.oe / 2, ze),
      (e.textAlign = "left"));
  }
  if (t.bannerT > 0) {
    let ue = Math.min(1, t.bannerT * 2, (2.4 - t.bannerT) * 4);
    ((e.globalAlpha = api.vt(ue, 0, 1)), (e.font = "bold 9px monospace"), (e.textAlign = "center"));
    let z = e.measureText(t.banner).width + 16,
      R = ie && !t.f.boss && ie.awake ? ze + 18 : ze;
    (api.cn(e, api.oe / 2 - z / 2, R, z, 14),
      api.o(e, "#ffd84a", api.oe / 2 - z / 2, R + 13, z, 1),
      (e.fillStyle = "#fff4b0"),
      e.fillText(t.banner, api.oe / 2, R + 3),
      (e.textAlign = "left"),
      (e.globalAlpha = 1),
      (e.font = "bold 7px monospace"));
  }
  let le = Math.min(216, api.oe - 8),
    ve = Math.round(api.oe / 2 - le / 2) + (api.xi || api.oe < 300 ? 0 : 50),
    Te = Math.floor((le - 10) / 4.3),
    ft = Math.max(api.Pf + 20, 48),
    tt = api.xi ? ft : api.de - 17;
  if (t.msgT > 0 && t.msg) {
    e.font = "7px monospace";
    let ue = t.msg.split(" "),
      z = [],
      R = "";
    for (let ye of ue)
      (R + " " + ye).trim().length > Te ? (z.push(R.trim()), (R = ye)) : (R += " " + ye);
    (R.trim() && z.push(R.trim()),
      z.length > 3 && ((z = z.slice(0, 3)), (z[2] = z[2].slice(0, Te - 3) + "...")));
    let O = z.length * 8 + 5,
      q = api.xi ? ft : api.de - O - 5;
    ((e.globalAlpha = Math.min(0.95, t.msgT * 3)),
      api.cn(e, ve, q, le, O),
      api.o(e, "#7ff7ff", ve, q, 2, O),
      (e.fillStyle = "#ffffff"),
      z.forEach((ye, F) => e.fillText(ye, ve + 5, q + 3 + F * 8)),
      (e.globalAlpha = 1),
      (tt = api.xi ? q + O + 3 : q - 14));
  }
  if (t.near) {
    e.font = "bold 7px monospace";
    let ue =
        t.near.kind === "lever" || t.near.kind === "toggle"
          ? "U\u017Cyj d\u017Awigni"
          : t.near.id === "kot"
            ? "Pog\u0142aszcz kota"
            : "M\xF3w: " + api.Zn[t.near.id],
      z = e.measureText(ue).width + 26,
      R = Math.round(api.oe / 2 - z / 2 + (api.xi ? 0 : 30));
    (api.cn(e, R, tt, z, 12),
      api.o(e, "#ffd84a", R + 2, tt + 2, 9, 8),
      (e.fillStyle = "#1b1424"),
      e.fillText("E", R + 4, tt + 3),
      (e.fillStyle = "#ffffff"),
      e.fillText(ue, R + 15, tt + 3));
  }
};

api.Th = function Th(e, t, n, i) {
  e.setTransform(1, 0, 0, 1, 0, 0);
  let a = Math.round((api.oe - 320) / 2),
    r = Math.round((api.de - 180) * 0.45),
    s = e.createLinearGradient(0, 0, 0, api.de);
  (s.addColorStop(0, "#1b1440"),
    s.addColorStop(0.5, "#5a3a7a"),
    s.addColorStop(0.8, "#e8846a"),
    s.addColorStop(1, "#f2c48a"),
    (e.fillStyle = s),
    e.fillRect(0, 0, api.oe, api.de),
    e.translate(a, r));
  for (let y = 0; y < 40; y++) {
    let w = ((api.me(y, 1) * api.oe) | 0) - a,
      b = ((api.me(y, 2) * (80 + r)) | 0) - r;
    Math.sin(t * 2 + y) > -0.3 && api.o(e, "#fff6d8", w, b, 1, 1);
  }
  let u = Math.min(248, api.oe - a - 44);
  (api.o(e, "#fff1c0", u, 26, 18, 18),
    api.o(e, "#ffe08a", u + 2, 28, 14, 14),
    api.o(e, "rgba(255,240,190,0.15)", u - 8, 18, 34, 34));
  let f = (y, w, b, x, M, j) => {
    e.fillStyle = y;
    for (let D = -a - 2; D < api.oe - a + 2; D += 2) {
      let l = D + t * M,
        d = w - (Math.sin(l * x + j) * b + Math.sin(l * x * 2.3 + j * 2) * b * 0.4);
      e.fillRect(D, Math.round(d), 2, api.de - r - Math.round(d) + 2);
    }
  };
  (f("#4a2e6a", 110, 18, 0.02, 4, 1), f("#3a2458", 125, 14, 0.035, 9, 4));
  let c = 214;
  ((e.fillStyle = "#2a1a40"),
    e.fillRect(c, 92, 28, 30),
    e.fillRect(c - 6, 100, 8, 22),
    e.fillRect(c + 26, 98, 8, 24),
    e.fillRect(c + 10, 80, 8, 14),
    api.o(e, Math.floor(t * 3) % 2 ? "#ff5050" : "#802020", c + 13, 76, 2, 4));
  for (let y = 0; y < 4; y++)
    api.o(e, api.me(y, Math.floor(t * 2)) < 0.6 ? "#5cf28a" : "#1f3a2a", c + 4 + y * 6, 100, 2, 2);
  (f("#2a1a3e", 140, 10, 0.05, 18, 7), f("#1a1028", 158, 8, 0.08, 34, 9));
  for (let y = 0; y < 18; y++) {
    let w = ((api.me(y, 5) * api.oe + Math.sin(t * 0.7 + y) * 14) % api.oe) - a,
      b = 120 + api.me(y, 6) * 55 + Math.cos(t + y) * 6,
      x = 0.5 + Math.sin(t * 3 + y * 2) * 0.5;
    ((e.fillStyle = "rgba(255,240,120," + x.toFixed(2) + ")"),
      e.fillRect(Math.round(w), Math.round(b), 1, 1));
  }
  if (!i) {
    ((e.textAlign = "center"), (e.textBaseline = "middle"), (e.font = "bold 30px monospace"));
    let y = 46 + Math.sin(t * 1.5) * 2;
    e.fillStyle = "#1b1424";
    for (let [b, x] of [
      [-2, 0],
      [2, 0],
      [0, -2],
      [0, 2],
      [2, 2],
    ])
      e.fillText("GRYZELDA", 160 + b, y + x);
    let w = e.createLinearGradient(0, y - 14, 0, y + 14);
    (w.addColorStop(0, "#fff4b0"),
      w.addColorStop(1, "#f2a03a"),
      (e.fillStyle = w),
      e.fillText("GRYZELDA", 160, y),
      (e.font = "bold 10px monospace"),
      (e.fillStyle = "#1b1424"),
      e.fillText("i Kryszta\u0142 Odpowiedzi", 161, y + 22),
      (e.fillStyle = "#7ff7ff"),
      e.fillText("i Kryszta\u0142 Odpowiedzi", 160, y + 21),
      (e.font = "7px monospace"),
      (e.fillStyle = "rgba(255,255,255,0.6)"),
      e.fillText(api.mk, 160, 172),
      (e.textAlign = "left"));
  }
  if (n) {
    let y = i ? 4 : 2,
      b = i
        ? [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
          ][Math.floor(t / 1.6) % 4]
        : [1, 0],
      x = Math.floor(t * 6) % 4,
      M = Math.floor(t * 1.5) % 3 === 0,
      j = api.Zf(n, b[0], b[1], x, M && n.cls !== "war"),
      D = i ? 160 : Math.max(70, -a + 34),
      l = 150;
    (api.o(e, "#1a1028", D - (30 * y) / 2, l, 30 * y, 4),
      e.drawImage(
        j,
        Math.round(D - (j.width * y) / 2),
        Math.round(l - j.height * y + 13 * y),
        j.width * y,
        j.height * y,
      ),
      i &&
        ((e.font = "bold 10px monospace"),
        (e.textAlign = "center"),
        (e.fillStyle = "#1b1424"),
        e.fillText(n.name || "Gryzelda", 161, 21),
        (e.fillStyle = "#fff4b0"),
        e.fillText(n.name || "Gryzelda", 160, 20),
        (e.font = "8px monospace"),
        (e.fillStyle = "#7ff7ff"),
        e.fillText(api.et[n.cls].name, 160, 32),
        (e.textAlign = "left")));
  }
  e.setTransform(1, 0, 0, 1, 0, 0);
};

api.a2 = function a2(e, t, n, i) {
  let a = [
    [1, 0, 2],
    [4, 0, 2],
    [0, 1, 7],
    [0, 2, 7],
    [1, 3, 5],
    [2, 4, 3],
    [3, 5, 1],
  ];
  for (let r of a) api.o(e, "#1b1424", t + r[0] - 0, n + r[1] + 1, r[2], 1);
  for (let r of a) api.o(e, "#5a2a34", t + r[0], n + r[1], r[2], 1);
  if (i > 0) {
    (e.save(), e.beginPath(), e.rect(t, n, i >= 1 ? 7 : 3.5, 7), e.clip());
    for (let r of a) api.o(e, "#ff4d6d", t + r[0], n + r[1], r[2], 1);
    (api.o(e, "#ffb0c0", t + 1, n + 1, 1, 1), e.restore());
  }
};

api.npcBlade = function npcBlade(e, x, y, a) {
  let ang = Math.atan2(a.fy || 1, a.fx || 0);
  a.swing > 0 && (ang += (1 - a.swing / 0.28) * 1.8 - 0.9);
  let x2 = x + Math.cos(ang) * 11,
    y2 = y - 10 + Math.sin(ang) * 11,
    col = a.lvl >= 11 ? "#e8e8f4" : a.lvl >= 9 ? "#c9a227" : "#b0b6c4";
  (api.o(e, "#5a3a22", (x + x2) / 2 - 1, (y - 10 + y2) / 2 - 1, 2, 2),
    api.o(e, col, x2 - 2, y2 - 2, 4, 2),
    api.o(e, "#1b1424", x - 8, y - 30, 16, 3),
    api.o(
      e,
      "#ff5050",
      x - 7,
      y - 29,
      Math.max(0, Math.round((14 * a.hp) / (a.maxHp || 1))),
      1,
    ),
    (e.font = "6px monospace"),
    (e.textAlign = "center"),
    (e.textBaseline = "bottom"),
    (e.fillStyle = "#1b1424"),
    e.fillText("lvl " + a.lvl, x + 1, y - 31),
    (e.fillStyle = "#ffd84a"),
    e.fillText("lvl " + a.lvl, x, y - 32),
    (e.textAlign = "left"),
    (e.textBaseline = "alphabetic"));
};

api.yp = function yp(e, t) {
  let n = 1 - t.swing / 0.22,
    a = Math.atan2(t.fy, t.fx) - 1.2 + n * 2.4;
  for (let s = 0; s < 7; s++) {
    let u = a - s * 0.16,
      f = 14,
      c = (0.95 - s * 0.13) * (1 - n * 0.4);
    (api.o(
      e,
      "rgba(255,255,255," + c.toFixed(2) + ")",
      t.px + Math.cos(u) * f - 1,
      t.py - 3 + Math.sin(u) * f - 1,
      s < 2 ? 3 : 2,
      s < 2 ? 3 : 2,
    ),
      api.o(
        e,
        "rgba(180,220,255," + (c * 0.6).toFixed(2) + ")",
        t.px + Math.cos(u) * (f - 4),
        t.py - 3 + Math.sin(u) * (f - 4),
        1,
        1,
      ));
  }
  let r = a;
  (api.o(e, "#e8e8f4", t.px + Math.cos(r) * 6, t.py - 3 + Math.sin(r) * 6, 2, 2),
    api.o(e, "#c9a227", t.px + Math.cos(r) * 3, t.py - 3 + Math.sin(r) * 3, 2, 2));
};

api.o2 = function o2(e, t) {
  return t > 0 ? api.vt(Math.floor((e / 2 - t - 4 - 3 - 6) / 8), 4, 10) : 10;
};

api.kp = function kp(e, t, n) {
  return e[t] !== null ? !1 : ((e[t] = n), !0);
};

api.Nh = function Nh(e, t, n) {
  return e[t] === n;
};

api.hp = function hp(e, t, n) {
  return e[t] !== n ? !1 : ((e[t] = null), !0);
};

api.Lh = function Lh(e, t, n, i, a) {
  let r = (i - e) / n,
    s = (a - t) / n,
    u = Math.hypot(r, s);
  return (u > 1 && ((r /= u), (s /= u)), u < 0.12 && ((r = 0), (s = 0)), [r, s]);
};

api.Kh = function Kh(e, t) {
  let n = Math.min(e, t),
    i = 14,
    a = Math.round(Math.min(150, Math.max(104, n * 0.32))),
    r = Math.round(Math.min(100, Math.max(74, n * 0.23))),
    s = Math.round(Math.min(60, Math.max(48, n * 0.14))),
    u = e - i - r / 2,
    f = t - i - r / 2,
    c = r / 2 + s / 2 + 12,
    y = (b, x) => ({
      x: Math.round(u + Math.cos(b) * x - s / 2),
      y: Math.round(f + Math.sin(b) * x - s / 2),
      s,
    }),
    w = 3 * 46 + 2 * 6;
  return {
    joy: { x: i, y: t - i - a, s: a },
    atk: { x: e - i - r, y: t - i - r, s: r },
    skill: y(Math.PI, c),
    dash: y(Math.PI * 1.25, c),
    talk: y(Math.PI * 1.5, c),
    swap: y(Math.PI * 1.5, c + s + 8),
    top: { x: Math.round(e / 2 - w / 2), y: 6, w, h: 46 },
  };
};

api.Oh = function Oh(e, t, n) {
  ((e.open = t), (e.fresh = !1), (e.keyHeld = n));
};

api.Ih = function Ih(e, t, n) {
  return n ? e.fresh && t - e.open > 60 : !e.keyHeld && t - e.open > 250;
};
