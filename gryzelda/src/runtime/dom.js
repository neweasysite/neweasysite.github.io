// @ts-nocheck
/** Rysuje drzewo widoku prosto do DOM. Nie jest to React. */

export const Fragment = Symbol.for("gryzelda.fragment");

export function jsx(type, props, key) {
  const source = props || {};
  const next = {};
  for (const name of Object.keys(source)) {
    if (name === "key" || name === "ref") continue;
    next[name] = source[name];
  }
  return {
    type,
    props: next,
    key: key ?? source.key ?? null,
    ref: source.ref,
  };
}

export const jsxs = jsx;

const SVG_NS = "http://www.w3.org/2000/svg";
const SVG_TAGS = new Set(["svg", "rect", "g", "path", "circle"]);
const EVENTS = {
  onClick: "click",
  onContextMenu: "contextmenu",
  onPointerDown: "pointerdown",
  onPointerUp: "pointerup",
  onPointerMove: "pointermove",
  onPointerCancel: "pointercancel",
  onLostPointerCapture: "lostpointercapture",
  onKeyDown: "keydown",
  onKeyUp: "keyup",
  onChange: "input",
  onBlur: "blur",
  onFocus: "focus",
};
const UNITLESS = new Set([
  "opacity",
  "zIndex",
  "fontWeight",
  "lineHeight",
  "zoom",
  "flexGrow",
  "flexShrink",
  "order",
  "orphans",
  "widows",
]);

function flatten(child, out) {
  if (child == null || child === false || child === true) return;
  if (Array.isArray(child)) {
    for (const item of child) flatten(item, out);
    return;
  }
  if (typeof child === "object" && child.type === Fragment) {
    flatten(child.props && child.props.children, out);
    return;
  }
  out.push(child);
}

function isText(value) {
  return typeof value === "string" || typeof value === "number";
}

function cssValue(name, value) {
  if (typeof value === "number" && !UNITLESS.has(name)) return value + "px";
  return value == null ? "" : String(value);
}

function assignRef(ref, node) {
  if (typeof ref === "function") ref(node);
  else if (ref && typeof ref === "object") ref.current = node;
}

function syncStyle(record, style) {
  const prev = record.styleMap || {};
  const next = {};
  const source = style || {};
  for (const name of Object.keys(source)) {
    const value = source[name];
    if (value == null || value === false) continue;
    next[name] = value;
  }
  for (const name of Object.keys(prev)) {
    if (!(name in next)) record.node.style[name] = "";
  }
  for (const name of Object.keys(next)) {
    if (prev[name] === next[name]) continue;
    record.node.style[name] = cssValue(name, next[name]);
  }
  record.styleMap = next;
}

function syncEvents(record, props) {
  const prev = record.events || {};
  const next = {};
  for (const prop of Object.keys(EVENTS)) {
    if (typeof props[prop] === "function") next[prop] = props[prop];
  }
  for (const prop of Object.keys(prev)) {
    if (next[prop] === prev[prop]) continue;
    record.node.removeEventListener(EVENTS[prop], prev[prop]);
  }
  for (const prop of Object.keys(next)) {
    if (next[prop] === prev[prop]) continue;
    record.node.addEventListener(EVENTS[prop], next[prop]);
  }
  record.events = next;
}

function setAttr(node, name, value) {
  if (value == null || value === false) node.removeAttribute(name);
  else node.setAttribute(name, value === true ? "" : String(value));
}

function syncProps(record, vnode) {
  const node = record.node;
  const props = vnode.props;
  syncStyle(record, props.style);
  syncEvents(record, props);
  if ("disabled" in props) node.disabled = !!props.disabled;
  if ("readOnly" in props) node.readOnly = !!props.readOnly;
  if ("tabIndex" in props && props.tabIndex != null) node.tabIndex = props.tabIndex;
  if ("value" in props && props.value != null && node.value !== String(props.value)) {
    node.value = String(props.value);
  }
  if ("placeholder" in props) node.placeholder = props.placeholder || "";
  if ("rows" in props && props.rows != null) node.rows = props.rows;
  if ("maxLength" in props && props.maxLength != null) node.maxLength = props.maxLength;
  if ("type" in props && props.type != null) node.type = props.type;
  setAttr(node, "role", props.role);
  setAttr(node, "aria-label", props["aria-label"]);
  if ("data-save-code" in props) setAttr(node, "data-save-code", props["data-save-code"]);
  if (node.tagName === "CANVAS") {
    if (props.width != null && node.width !== Number(props.width)) node.width = Number(props.width);
    if (props.height != null && node.height !== Number(props.height))
      node.height = Number(props.height);
  } else {
    if ("width" in props) setAttr(node, "width", props.width);
    if ("height" in props) setAttr(node, "height", props.height);
  }
  if ("x" in props) setAttr(node, "x", props.x);
  if ("y" in props) setAttr(node, "y", props.y);
  if ("fill" in props) setAttr(node, "fill", props.fill);
  if ("viewBox" in props) setAttr(node, "viewBox", props.viewBox);
  if ("shapeRendering" in props) setAttr(node, "shape-rendering", props.shapeRendering);
  if (record.ref !== vnode.ref) {
    if (record.ref) assignRef(record.ref, null);
    record.ref = vnode.ref;
  }
  if (vnode.ref) assignRef(vnode.ref, node);
  reconcileChildren(node, props.children);
}

function createElement(vnode, parent) {
  const svg = SVG_TAGS.has(vnode.type) || (parent && parent.namespaceURI === SVG_NS);
  const node = svg
    ? document.createElementNS(SVG_NS, vnode.type)
    : document.createElement(vnode.type);
  const record = { kind: "el", type: vnode.type, node, ref: null, events: {}, styleMap: {} };
  syncProps(record, vnode);
  return record;
}

function removeRecord(record) {
  if (!record) return;
  if (record.kind === "el") {
    if (record.ref) assignRef(record.ref, null);
    for (const prop of Object.keys(record.events || {})) {
      record.node.removeEventListener(EVENTS[prop], record.events[prop]);
    }
    for (const kid of record.node.__kids || []) removeRecord(kid);
  }
  record.node.remove();
}

function reconcileChildren(parent, children) {
  const flat = [];
  flatten(children, flat);
  const old = parent.__kids || [];
  const next = [];
  for (let i = 0; i < flat.length; i++) {
    const vnode = flat[i];
    const prev = old[i];
    if (isText(vnode)) {
      const text = String(vnode);
      if (prev && prev.kind === "text") {
        if (prev.node.nodeValue !== text) prev.node.nodeValue = text;
        next.push(prev);
      } else {
        if (prev) removeRecord(prev);
        next.push({ kind: "text", node: document.createTextNode(text) });
      }
      continue;
    }
    if (prev && prev.kind === "el" && prev.type === vnode.type) {
      syncProps(prev, vnode);
      next.push(prev);
    } else {
      if (prev) removeRecord(prev);
      next.push(createElement(vnode, parent));
    }
  }
  for (let i = flat.length; i < old.length; i++) removeRecord(old[i]);
  for (let i = 0; i < next.length; i++) {
    const node = next[i].node;
    if (parent.childNodes[i] !== node) parent.insertBefore(node, parent.childNodes[i] || null);
  }
  parent.__kids = next;
}

export function createSurface(host) {
  let frame = 0;
  return {
    schedule(run) {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        run();
      });
    },
    commit(vnode) {
      reconcileChildren(host, [vnode]);
    },
    destroy() {
      if (frame) cancelAnimationFrame(frame);
      for (const kid of host.__kids || []) removeRecord(kid);
      host.__kids = [];
    },
  };
}
