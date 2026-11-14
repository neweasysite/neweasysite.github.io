// @ts-nocheck
/* Eliksiry, buffy i drobiazgi ekwipunku.
   Nazwy wewnętrzne zostały po minifikacji — logika jest ta sama co w oryginalnej paczce. */
import { api } from "../runtime/api.js";

api.Pp = function Pp(e) {
  return (e.potsHp || 0) <= 0
    ? !1
    : e.hp >= api.Ze(e) - 0.01
      ? (api.ne(e, "Ju\u017C pe\u0142ne zdrowie.", 1.4), !1)
      : (e.potsHp--,
        (e.hp = api.Ze(e)),
        api.se(e, e.px, e.py, "#ff8fa3", 18, 50, 0.5),
        api.Ne(e, e.px, e.py - 14, "Eliksir HP", "#ff8fa3"),
        api.G(e, "heal"),
        (e.dirty = !0),
        !0);
};

api.Cp = function Cp(e) {
  return (e.potsMp || 0) <= 0
    ? !1
    : e.mp >= api.ut(e) - 0.01
      ? (api.ne(e, "Ju\u017C pe\u0142na mana.", 1.4), !1)
      : (e.potsMp--,
        (e.mp = api.ut(e)),
        api.se(e, e.px, e.py, "#7fa8ff", 18, 50, 0.5),
        api.Ne(e, e.px, e.py - 14, "Eliksir MP", "#7fa8ff"),
        api.G(e, "power"),
        (e.dirty = !0),
        !0);
};

api.Tp = function Tp(e, t) {
  return !!e.f["kn:train:" + t] || api.Ui.some((n) => api.Pt[n].trainer === t && e.skills[n] > 0);
};

api.ip = function ip(e, t) {
  let n = api.Pt[t];
  return e.skills[t] > 0 ? !0 : api.Tp(e, n.trainer);
};

api.Ep = function Ep(e, t) {
  let n = api.Pt[t].cls;
  return !!n && n !== e.look.cls;
};

api.Nk = function Nk(e, t) {
  return api.Ep(e, t) ? 0.5 : 1;
};

api.Lk = function Lk(e, t) {
  return !!e.f["kn:buff:" + api.Mp[t]] || api.Ia(e, t) > 0;
};

api.Ok = function Ok(e) {
  return !!e.f["vz:7"] || !!e.f["kn:shop:wanda"] || api.Kk.some((t) => !!e.f[t]);
};
