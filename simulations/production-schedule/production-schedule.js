// UI for the production-schedule simulation. All scheduling and checks live in schedule.js.
import * as S from "./schedule.js";

const $ = (id) => document.getElementById(id);
const form = $("form");
const tl = $("timeline");

let plan = null;
let current = S.DEFAULT_PRESET;
let unknownPreset = null;
let selected = null; // key of the selected stage ("p1:shape1") or oven ("oven:top")
let focusKey = null; // bar to focus after a re-render
let drag = null;
let suppressClick = false;
let lastAnalysis = null;

for (const [key, p] of Object.entries(S.PRESETS)) $("preset").append(new Option(p.title, key));

// ---------- helpers ----------

const ppm = () => Number($("zoom").value) || 2; // pixels per minute
function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}
function timeToInput(m) {
  if (!Number.isFinite(m)) return "";
  const r = ((Math.round(m) % 1440) + 1440) % 1440;
  return `${String(Math.floor(r / 60)).padStart(2, "0")}:${String(r % 60).padStart(2, "0")}`;
}
function inputToTime(v) {
  const m = /^(\d{1,2}):(\d{2})/.exec(v || "");
  return m ? Number(m[1]) * 60 + Number(m[2]) : NaN;
}
const num = (v) => (String(v).trim() === "" ? NaN : Number(v));
const sheetName = (p) => (S.SHEETS[p.sheet] ? S.SHEETS[p.sheet].name : "");
const kindText = (st) =>
  st.kind === "oven" ? "oven" : st.kind === "cool" ? "cooling" : st.elastic ? "dough time" : st.kind === "cold" ? "cooling in the cold" : st.small ? "small hands task" : "hands time";

function barClass(st) {
  if (st.kind === "oven") return "k-oven";
  if (st.kind === "cool") return "k-cool";
  if (st.kind === "cold") return "k-cold";
  if (st.elastic) return S.PLACES[st.place]?.cold ? "k-cold" : "k-dough";
  return "k-hands";
}

function packRows(items) {
  const rows = [];
  const sorted = [...items].sort((a, b) => a.s - b.s || b.e - a.e);
  const where = new Map();
  for (const it of sorted) {
    let r = rows.findIndex((end) => end <= it.s + 0.01);
    if (r < 0) {
      rows.push(it.e);
      r = rows.length - 1;
    } else rows[r] = it.e;
    where.set(it, r);
  }
  return { count: Math.max(1, rows.length), where };
}

// ---------- presets and query ----------

function readQuery() {
  let params;
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    params = new URLSearchParams();
  }
  const name = params.get("preset");
  const known = name && Object.prototype.hasOwnProperty.call(S.PRESETS, name);
  return { preset: known ? name : S.DEFAULT_PRESET, unknown: name && !known ? name : null };
}

function loadPreset(name) {
  plan = S.loadPreset(name);
  current = plan.preset;
  selected = null;
  focusKey = null;
  $("preset").value = current;
  $("preset-note").textContent = (unknownPreset ? `Unknown preset "${unknownPreset}", showing the default. ` : "") + plan.note;
  unknownPreset = null;
  syncForm();
  render();
}

// ---------- form ----------

function syncForm() {
  $("deadline").value = timeToInput(plan.deadline);
  $("start").value = timeToInput(plan.start);
  $("equipment").value = plan.equipment;
  $("equip-field").hidden = !plan.custom;
  $("equip-text").hidden = !!plan.custom;
  $("equip-text").textContent =
    plan.equipment === "home"
      ? "Home kitchen: mixing by hand, one oven that takes one tray, fridge and an air-conditioned room. Choose “Your own order” to change it."
      : "Bakery: spiral mixer, two-deck oven with independent thermostats, fan oven, proofing cabinet, cold room. Choose “Your own order” to change it.";
  $("kitchen-label").textContent = plan.equipment === "home" ? "Kitchen (°C)" : "Fournil (°C)";
  $("kitchen").value = plan.kitchen;
  $("cabinet").value = plan.cabinet ? plan.cabinet.temp : "";
  $("ac").value = plan.ac ?? "";
  $("dough-off").value = plan.doughOff || 0;
  for (const f of form.querySelectorAll("[data-show]")) {
    const w = f.dataset.show;
    f.hidden = w === "cabinet" ? !plan.cabinet : w === "ac" ? plan.equipment !== "home" : false;
  }
  const sel = $("add-sheet");
  if (!sel.options.length) for (const k of S.SHEET_ORDER) sel.append(new Option(`${k} ${S.SHEETS[k].name}`, k));
  syncAddQty();
  renderProducts();
  renderOvens(true);
}

function syncAddQty() {
  const k = $("add-sheet").value;
  const table = plan.equipment === "home" ? S.DEFAULT_QTY_HOME : S.DEFAULT_QTY;
  $("add-qty").value = table[k];
  $("add-qty-label").textContent = S.SHEETS[k].cream ? "Milk (g)" : `Pieces (${(S.SHEETS[k][plan.equipment].piece || S.SHEETS[k].piece)})`;
}

function renderProducts() {
  const ul = $("products");
  ul.replaceChildren();
  plan.products.forEach((p) => {
    const li = el("li");
    li.append(el("span", "p-name", p.label));
    const row = el("div", "p-row");
    if (p.fromSheet) {
      const f = el("div", "field");
      const id = `qty-${p.id}`;
      const lab = el("label", "", p.cream ? "Milk (g)" : "Pieces");
      lab.htmlFor = id;
      const inp = el("input");
      Object.assign(inp, { id, type: "number", min: 1, step: 1, value: p.qty });
      inp.inputMode = "numeric";
      inp.addEventListener("change", () => {
        const q = Math.round(num(inp.value));
        if (!(q >= 1)) return;
        const np = S.buildProduct(p.sheet, q, plan.equipment);
        plan.products[plan.products.indexOf(p)] = np;
        S.planProduct(plan, np);
        if (selected && selected.startsWith(`${p.id}:`)) selected = null;
        renderProducts();
        render();
      });
      f.append(lab, inp);
      row.append(f);
    }
    const planBtn = el("button", "secondary", "Plan backwards");
    planBtn.type = "button";
    planBtn.setAttribute("aria-label", `Plan ${p.short} backwards from the deadline`);
    planBtn.addEventListener("click", () => {
      S.planProduct(plan, p);
      render();
    });
    const rm = el("button", "secondary", "Remove");
    rm.type = "button";
    rm.setAttribute("aria-label", `Remove ${p.short}`);
    rm.addEventListener("click", () => {
      plan.products = plan.products.filter((x) => x !== p);
      if (selected && selected.startsWith(`${p.id}:`)) selected = null;
      renderProducts();
      render();
      $("add-sheet").focus();
    });
    row.append(planBtn, rm);
    li.append(row);
    ul.append(li);
  });
  if (!plan.products.length) ul.append(el("li", "muted", "No product yet: add one below."));
}

function usedOvens() {
  const used = new Set();
  for (const p of plan.products) for (const s of p.stages) if (s.kind === "oven") s.oven.forEach((u) => used.add(u));
  return plan.ovens.filter((o) => used.has(o.id));
}

function renderOvens(rebuild) {
  const box = $("ovens");
  const ovens = usedOvens();
  if (rebuild || box.children.length !== ovens.length || [...box.querySelectorAll("input")].some((i, k) => i.dataset.oven !== ovens[k]?.id)) {
    box.replaceChildren();
    for (const o of ovens) {
      const f = el("div", "oven-field");
      const id = `on-${o.id}`;
      const lab = el("label", "", `${o.name} switched on at`);
      lab.htmlFor = id;
      const inp = el("input");
      Object.assign(inp, { id, type: "time", step: 300 });
      inp.dataset.oven = o.id;
      inp.addEventListener("change", () => {
        const t = inputToTime(inp.value);
        if (Number.isFinite(t)) {
          o.on = t;
          render();
        }
      });
      f.append(lab, inp, el("span", "hint", `${o.preheat} min from cold to temperature`));
      box.append(f);
    }
    if (!ovens.length) box.append(el("p", "muted", "No oven load yet."));
  }
  for (const inp of box.querySelectorAll("input")) {
    if (inp === document.activeElement) continue;
    const o = plan.ovens.find((x) => x.id === inp.dataset.oven);
    inp.value = timeToInput(o.on);
  }
}

// ---------- timeline ----------

function renderTimeline(a) {
  const k = ppm();
  const starts = a.items.filter((x) => Number.isFinite(x.s)).map((x) => x.s);
  const ends = a.items.filter((x) => Number.isFinite(x.e)).map((x) => x.e);
  for (const b of a.ovenBars) starts.push(b.s), ends.push(b.e);
  starts.push(plan.deadline);
  ends.push(plan.deadline);
  const lo = Math.floor((Math.min(...starts) - 10) / 60) * 60;
  const hi = Math.ceil((Math.max(...ends) + 10) / 60) * 60;
  const W = Math.max(60, hi - lo) * k;
  const x = (t) => (Math.max(t, lo) - lo) * k;
  const bad = new Set(a.bad.flatMap((i) => i.keys));
  const warn = new Set(a.warn.flatMap((i) => i.keys));

  const scroller = $("tl-scroll");
  const keepLeft = scroller.scrollLeft;
  tl.replaceChildren();

  const track = (rows) => {
    const t = el("div", "tl-track");
    t.style.width = `${W}px`;
    t.style.backgroundImage = `repeating-linear-gradient(90deg, var(--grid-hour) 0 1px, transparent 1px ${60 * k}px), repeating-linear-gradient(90deg, var(--grid) 0 1px, transparent 1px ${15 * k}px)`;
    t.style.backgroundPosition = `${(Math.ceil(lo / 60) * 60 - lo) * k}px 0, 0 0`;
    for (let r = 0; r < rows; r++) t.append(el("div", "tl-sub"));
    const dl = el("div", "deadline-line");
    dl.style.left = `${x(plan.deadline)}px`;
    t.append(dl);
    return t;
  };
  const row = (labelText, sub, rows, cls = "") => {
    const r = el("div", `tl-row ${cls}`);
    const lab = el("div", "tl-label", labelText);
    if (sub) lab.append(el("small", "", sub));
    const t = track(rows);
    r.append(lab, t);
    tl.append(r);
    return t;
  };
  const place = (t, b, rowIdx) => {
    const sub = t.children[rowIdx] || t.children[0];
    sub.append(b);
  };
  const makeBar = (it, text, { interactive = false, small = false, kindCls, key = it.key, aria } = {}) => {
    const b = el(interactive ? "button" : "div", `bar ${kindCls || barClass(it.st)}`);
    const s = Number.isFinite(it.s) ? it.s : lo;
    const left = x(s);
    const width = Math.max(small ? 6 : 4, (it.e - s) * k);
    b.style.left = `${left}px`;
    b.style.width = `${width}px`;
    if (!Number.isFinite(it.s)) b.classList.add("open-left");
    if (small) b.classList.add("small");
    if (key) b.dataset.key = key;
    if (bad.has(key)) b.classList.add("is-bad");
    else if (warn.has(key)) b.classList.add("is-warn");
    if (selected && key === selected) b.classList.add("is-selected");
    if (!small) b.textContent = text;
    b.title = aria || `${text} ${S.fmtTime(it.s)}-${S.fmtTime(it.e)}`;
    if (interactive) {
      b.type = "button";
      b.setAttribute("aria-label", aria || text);
      if (it.movable) b.classList.add("movable");
    } else b.setAttribute("aria-hidden", "true");
    return b;
  };

  // Axis
  const head = el("div", "tl-row tl-head");
  head.append(el("div", "tl-label", "Time"));
  const axis = el("div", "tl-track");
  axis.style.width = `${W}px`;
  for (let t = Math.ceil(lo / 60) * 60; t <= hi; t += 60) {
    const tick = el("span", "tick", S.fmtTime(t));
    tick.style.left = `${x(t)}px`;
    if (x(t) < 20) tick.style.transform = "translateX(3px)";
    axis.append(tick);
  }
  const tag = el("span", "deadline-tag", `deadline ${S.fmtTime(plan.deadline)}`);
  tag.style.left = `${x(plan.deadline)}px`;
  axis.append(tag);
  head.append(axis);
  tl.append(head);

  // Product lanes
  for (const p of plan.products) {
    const mine = a.items.filter((it) => it.p === p && !it.st.during);
    const { count, where } = packRows(mine.map((it) => ({ ...it, s: Number.isFinite(it.s) ? it.s : lo })));
    const rowOf = new Map();
    [...where.entries()].forEach(([it, r]) => rowOf.set(it.key, r));
    const t = row(p.short, sheetName(p), count, p === plan.products[0] ? "sep" : "");
    for (const it of a.items.filter((x2) => x2.p === p)) {
      const st = it.st;
      const movable = S.isMovable(st) || !!st.during;
      const aria = `${p.label}: ${st.name}, ${S.fmtTime(it.s)} to ${S.fmtTime(it.e)}, ${kindText(st)}${bad.has(it.key) ? ", conflict" : warn.has(it.key) ? ", to check" : ""}${movable ? ". Arrow keys move it" : ""}`;
      const b = makeBar({ ...it, movable }, st.name, { interactive: true, small: !!st.during, aria });
      place(t, b, st.during ? rowOf.get(`${p.id}:${st.during}`) ?? 0 : rowOf.get(it.key) ?? 0);
    }
  }

  // Resource lanes
  const handsItems = a.items.filter((it) => it.st.res && it.st.res.includes("hands") && !it.st.small);
  {
    const { count, where } = packRows(handsItems);
    const t = row("You", "hands", count, "sep");
    for (const [it, r] of where) place(t, makeBar(it, it.p.short), r);
    for (const it of [...a.items.filter((x2) => x2.st.small), ...a.ovenTasks]) place(t, makeBar(it, "", { small: true, key: it.st.ovenTask ? `task:${it.key}` : it.key }), 0);
  }
  if (plan.mixer) {
    const mixes = a.items.filter((it) => it.st.mix);
    const { count, where } = packRows(mixes);
    const t = row("Mixer", "", count);
    for (const [it, r] of where) place(t, makeBar(it, it.p.short), r);
  }
  for (const o of plan.ovens) {
    const loads = a.items.filter((it) => it.st.kind === "oven" && it.st.oven.includes(o.id));
    if (!loads.length) continue;
    const t = row(o.name, "", 1);
    for (const b of a.ovenBars.filter((x2) => x2.oven === o.id)) {
      const next = loads.filter((L) => L.s >= b.s - 0.5 && L.s > b.s).map((L) => L.s);
      const e2 = next.length ? Math.min(b.e, Math.min(...next)) : b.e;
      const it = { s: b.s, e: Math.max(e2, b.s + 2), st: { kind: "heat" }, movable: b.kind === "preheat" };
      if (b.kind === "preheat") {
        const key = `oven:${o.id}`;
        const bar = makeBar(it, `on ${S.fmtTime(b.s)}, ${b.text}`, {
          interactive: true,
          kindCls: "k-heat",
          key,
          aria: `${o.name} switched on at ${S.fmtTime(b.s)}, ${b.text}, ready ${S.fmtTime(b.e)}${bad.has(key) ? ", conflict" : ""}. Arrow keys move it`,
        });
        place(t, bar, 0);
      } else place(t, makeBar(it, b.text, { kindCls: "k-heat", key: null }), 0);
    }
    for (const it of loads) place(t, makeBar(it, `${it.p.short} ${it.st.temp} °C`), 0);
  }
  const cab = a.items.filter((it) => it.st.elastic && it.st.place === "cabinet" && Number.isFinite(it.s));
  if (plan.cabinet && cab.length) {
    const { count, where } = packRows(cab);
    const t = row("Cabinet", `${S.fmtNum(plan.cabinet.temp)} °C, ${plan.cabinet.levels} levels`, count);
    for (const [it, r] of where) place(t, makeBar(it, `${it.p.short}${it.st.levels ? ` ${it.st.levels} lv` : ""}`), r);
  }
  const ac = a.items.filter((it) => it.st.elastic && it.st.place === "ac" && Number.isFinite(it.s));
  if (plan.equipment === "home" && ac.length) {
    const { count, where } = packRows(ac);
    const t = row("AC room", `${S.fmtNum(plan.ac)} °C`, count);
    for (const [it, r] of where) place(t, makeBar(it, it.p.short), r);
  }
  const cold = a.items.filter((it) => (it.st.elastic && S.PLACES[it.st.place]?.cold) || it.st.kind === "cold");
  if (cold.length) {
    const { count, where } = packRows(cold.map((it) => ({ ...it, s: Number.isFinite(it.s) ? it.s : lo })));
    const t = row(plan.equipment === "home" ? "Fridge" : "Cold", plan.equipment === "home" ? "and ice bath" : "cold room, chiller", count);
    for (const [it, r] of where) place(t, makeBar(it, it.p.short), r);
  }

  tl.style.width = `calc(var(--label-w) + ${W}px)`;
  scroller.scrollLeft = keepLeft;
}

// ---------- summary, issues, detail, list ----------

function renderSummary(a) {
  const p = $("summary");
  p.replaceChildren();
  if (!plan.products.length) {
    p.textContent = "Add a product to start.";
    return;
  }
  const spare =
    a.spare >= 0 ? `${S.fmtDur(a.spare)} spare` : `${S.fmtDur(-a.spare)} late`;
  p.append(
    el("strong", "", `Start ${S.fmtTime(a.start)}`),
    ` · last product cooled ${S.fmtTime(a.finish)} for the ${S.fmtTime(plan.deadline)} deadline (${spare})`,
    a.critical ? ` · longest chain: ${a.critical.p.short}, ${S.fmtDur(a.critical.len)}` : "",
    el("br"),
    el("strong", "", `${a.bad.length} conflict${a.bad.length === 1 ? "" : "s"}`),
    `, ${a.warn.length} to check, ${a.notes.length} note${a.notes.length === 1 ? "" : "s"}.`
  );
  if (!a.bad.length && !a.warn.length) p.append(" No conflict left: each resource does one thing at a time, at the temperature it needs.");
}

function issueItem(i) {
  const li = el("li");
  const box = el("p", `flag ${i.kind === "note" ? "cold" : i.kind}`);
  box.append(el("strong", "", i.lane), el("span", "", i.text));
  const key = i.keys.find((k) => !k.startsWith("task:"));
  if (key) {
    const b = el("button", "secondary", "Show");
    b.type = "button";
    b.setAttribute("aria-label", `Show in the organigramme: ${i.text}`);
    b.addEventListener("click", () => select(key, true));
    box.append(b);
  }
  li.append(box);
  return li;
}

function renderIssues(a) {
  const box = $("issues");
  box.replaceChildren();
  if (!a.bad.length && !a.warn.length) box.append(el("p", "flag good", "No conflict and nothing to check."));
  if (a.bad.length) {
    box.append(el("h3", "", `Conflicts (${a.bad.length})`));
    const ul = el("ul", "issues-list");
    a.bad.forEach((i) => ul.append(issueItem(i)));
    box.append(ul);
  }
  if (a.warn.length) {
    box.append(el("h3", "", `To check (${a.warn.length})`));
    const ul = el("ul", "issues-list");
    a.warn.forEach((i) => ul.append(issueItem(i)));
    box.append(ul);
  }
  if (a.notes.length) {
    const d = el("details", "notes");
    d.append(el("summary", "", `Notes (${a.notes.length}): small tasks, idle oven, spare time`));
    const ul = el("ul", "issues-list");
    a.notes.forEach((i) => ul.append(issueItem(i)));
    d.append(ul);
    box.append(d);
  }
}

function nudgeButtons(key) {
  const wrap = el("div", "nudge");
  for (const d of [-15, -5, 5, 15]) {
    const b = el("button", d < 0 ? "secondary" : "", `${d > 0 ? "+" : "−"}${Math.abs(d)} min`);
    b.type = "button";
    b.dataset.d = d;
    b.setAttribute("aria-label", `Move ${Math.abs(d)} minutes ${d < 0 ? "earlier" : "later"}`);
    b.addEventListener("click", () => {
      S.nudge(plan, key, d, $("with-after").checked);
      render();
      $("detail").querySelector(`button[data-d="${d}"]`)?.focus();
    });
    wrap.append(b);
  }
  return wrap;
}

function renderDetail(a) {
  const box = $("detail");
  box.replaceChildren();
  if (!selected) {
    box.append(el("p", "muted", "Select a bar in the organigramme, or “Show” next to a conflict."));
    return;
  }
  const related = a.issues.filter((i) => i.keys.includes(selected));
  if (selected.startsWith("oven:")) {
    const o = plan.ovens.find((x) => `oven:${x.id}` === selected);
    if (!o) return void (selected = null);
    box.append(el("h3", "", o.name));
    box.append(el("p", "detail-times", `On at ${S.fmtTime(o.on)}, ready ${S.fmtTime(o.on + o.preheat)}`));
    box.append(el("p", "", `${o.preheat} minutes from cold to temperature. Switch it on that long before its first load.`));
    box.append(nudgeButtons(selected));
  } else {
    const it = a.items.find((x) => x.key === selected);
    if (!it) {
      selected = null;
      return renderDetail(a);
    }
    const st = it.st;
    box.append(el("h3", "", it.p.label));
    box.append(el("p", "", `${st.name} (${kindText(st)})`));
    const len = it.e - it.s;
    box.append(el("p", "detail-times", Number.isFinite(it.s) ? `${S.fmtTime(it.s)} to ${S.fmtTime(it.e)} · ${S.fmtDur(len)}` : `until ${S.fmtTime(it.e)} (from the day before)`));
    if (st.kind === "oven") box.append(el("p", "", `${st.oven.map((u) => plan.ovens.find((o) => o.id === u)?.name || u).join(" and ")}, ${st.temp} °C${st.steam ? ", steam" : ""}.`));
    if (st.elastic) {
      const pred = it.p.stages.find((x) => x.id === st.after);
      const next = it.p.stages.find((x) => x.after === st.id && !x.during && !x.side);
      box.append(el("p", "", `Dough time: it runs from the end of ${pred ? pred.name.toLowerCase() : "the day before"}${next && !next.elastic ? ` to the start of ${next.name.toLowerCase()}` : ""}. Move those stages to change it.`));
      const w = S.expectedWindow(plan, st);
      if (st.ferment && !w.cold) {
        const range = Math.round(w.lo) === Math.round(w.hi) ? `about ${S.fmtDur(w.lo)}` : `about ${S.fmtDur(w.lo)}-${S.fmtDur(w.hi)}`;
        box.append(
          el(
            "p",
            "",
            `Expected here (${S.placeLabel(plan, st.place)}, ${S.fmtNum(w.T)} °C): ${range}. The sheet's time is for ${st.ref} °C; × 1.07 for each degree cooler, ÷ 1.07 for each degree warmer.`
          )
        );
      } else if (st.min !== undefined && st.min > 0) box.append(el("p", "", `At least ${S.fmtDur(st.min)} by the sheet.`));
      if (st.ferment && st.place !== "dough") {
        const f = el("div", "field");
        const lab = el("label", "", "Where it proofs");
        lab.htmlFor = "place-select";
        const sel = el("select");
        sel.id = "place-select";
        const opts = S.placesFor(plan);
        if (!opts.includes(st.place)) opts.unshift(st.place);
        for (const pl of opts) {
          const t = pl === "cabinet" && plan.cabinet ? plan.cabinet.temp : pl === "room" ? plan.kitchen : pl === "ac" ? plan.ac : S.PLACES[pl]?.temp;
          sel.append(new Option(`${S.placeLabel(plan, pl)}${Number.isFinite(t) && !S.PLACES[pl]?.temp ? `, ${S.fmtNum(t)} °C` : ""}`, pl));
        }
        sel.value = st.place;
        sel.addEventListener("change", () => {
          st.place = sel.value;
          render();
          $("place-select")?.focus();
        });
        f.append(lab, sel);
        box.append(f);
      }
    } else if (st.follows) {
      const pred = it.p.stages.find((x) => x.id === st.after);
      box.append(el("p", "", `Starts as soon as ${pred ? pred.name.toLowerCase() : "the stage before"} ends: move that stage.`));
    } else if (st.side && st.start === undefined) {
      box.append(el("p", "", "Done straight after the stage it belongs to."));
    }
    if (S.isMovable(st) || st.during) {
      box.append(nudgeButtons(selected));
      box.append(el("p", "muted small", $("with-after").checked ? "The stages after it move with it (untick the box above the organigramme to move it alone)." : "Only this stage moves; the dough stages around it stretch or shrink."));
    }
  }
  if (related.length) {
    const ul = el("ul", "issues-list");
    related.forEach((i) => ul.append(issueItem(i)));
    box.append(ul);
  }
}

function renderList(a) {
  const tb = $("list").querySelector("tbody");
  tb.replaceChildren();
  for (const p of plan.products) {
    const mine = a.items.filter((it) => it.p === p).sort((x, y) => (Number.isFinite(x.s) ? x.s : -1e9) - (Number.isFinite(y.s) ? y.s : -1e9));
    for (const it of mine) {
      const tr = el("tr");
      const st = it.st;
      const where =
        st.kind === "oven"
          ? `${st.oven.map((u) => plan.ovens.find((o) => o.id === u)?.name || u).join(" + ")}, ${st.temp} °C`
          : st.elastic
            ? S.placeLabel(plan, st.place)
            : st.kind === "cool"
              ? "rack"
              : st.mix && plan.mixer
                ? "you + mixer"
                : st.kind === "cold"
                  ? "cold"
                  : "you";
      tr.append(
        el("td", "", p.short),
        el("td", "", st.name),
        el("td", "num", Number.isFinite(it.s) ? S.fmtTime(it.s) : "before"),
        el("td", "num", S.fmtTime(it.e)),
        el("td", "num", Number.isFinite(it.s) ? S.fmtDur(it.e - it.s) : ""),
        el("td", "", where)
      );
      tb.append(tr);
    }
  }
}

function render() {
  const a = S.analyse(plan);
  lastAnalysis = a;
  renderTimeline(a);
  renderSummary(a);
  renderIssues(a);
  renderDetail(a);
  renderList(a);
  renderOvens(false);
  if (focusKey) {
    tl.querySelector(`button.bar[data-key="${focusKey}"]`)?.focus({ preventScroll: false });
    focusKey = null;
  }
}

function select(key, show = false) {
  selected = key;
  render();
  const b = tl.querySelector(`[data-key="${key}"]`);
  if (show && b) {
    b.scrollIntoView({ block: "nearest", inline: "center" });
    if (b.tagName === "BUTTON") b.focus({ preventScroll: true });
  }
}

// ---------- events ----------

tl.addEventListener("click", (e) => {
  if (suppressClick) {
    suppressClick = false;
    return;
  }
  const b = e.target.closest("[data-key]");
  if (!b) return;
  const key = b.dataset.key.replace(/^task:/, "");
  focusKey = b.tagName === "BUTTON" ? key : null;
  select(key);
});

tl.addEventListener("keydown", (e) => {
  const b = e.target.closest("button.bar");
  if (!b || (e.key !== "ArrowLeft" && e.key !== "ArrowRight")) return;
  if (!b.classList.contains("movable")) return;
  e.preventDefault();
  const d = (e.key === "ArrowLeft" ? -1 : 1) * (e.shiftKey ? 15 : 5);
  S.nudge(plan, b.dataset.key, d, $("with-after").checked);
  selected = b.dataset.key;
  focusKey = b.dataset.key;
  render();
});

tl.addEventListener("pointerdown", (e) => {
  const b = e.target.closest("button.bar.movable");
  if (!b || e.button !== 0) return;
  drag = { el: b, key: b.dataset.key, x0: e.clientX, delta: 0, moved: false, id: e.pointerId };
  try {
    b.setPointerCapture(e.pointerId);
  } catch {
    /* capture is optional */
  }
});
tl.addEventListener("pointermove", (e) => {
  if (!drag || e.pointerId !== drag.id) return;
  const dx = e.clientX - drag.x0;
  if (Math.abs(dx) > 4) drag.moved = true;
  if (!drag.moved) return;
  drag.delta = Math.round(dx / ppm() / 5) * 5;
  drag.el.style.transform = `translateX(${drag.delta * ppm()}px)`;
  drag.el.classList.add("dragging");
});
function endDrag(e, cancel) {
  if (!drag || e.pointerId !== drag.id) return;
  const d = drag;
  drag = null;
  if (!d.moved) return;
  suppressClick = true;
  if (!cancel && d.delta) S.nudge(plan, d.key, d.delta, $("with-after").checked);
  selected = d.key;
  focusKey = d.key;
  render();
}
tl.addEventListener("pointerup", (e) => endDrag(e, false));
tl.addEventListener("pointercancel", (e) => endDrag(e, true));

$("preset").addEventListener("change", () => loadPreset($("preset").value));
$("reset").addEventListener("click", () => loadPreset(current));
$("zoom").addEventListener("change", () => render());
$("with-after").addEventListener("change", () => renderDetail(lastAnalysis));
form.addEventListener("submit", (e) => e.preventDefault());

$("deadline").addEventListener("change", () => {
  const t = inputToTime($("deadline").value);
  if (Number.isFinite(t)) {
    plan.deadline = t;
    render();
  }
});
$("start").addEventListener("change", () => {
  const t = inputToTime($("start").value);
  if (Number.isFinite(t)) plan.start = t;
});
$("plan-back").addEventListener("click", () => {
  S.planAll(plan, "backward");
  render();
});
$("plan-fwd").addEventListener("click", () => {
  const t = inputToTime($("start").value);
  if (Number.isFinite(t)) plan.start = t;
  S.planAll(plan, "forward");
  render();
});
$("equipment").addEventListener("change", () => {
  S.setEquipment(plan, $("equipment").value);
  selected = null;
  syncForm();
  render();
});
$("add-sheet").addEventListener("change", syncAddQty);
$("add").addEventListener("click", () => {
  const k = $("add-sheet").value;
  const q = Math.round(num($("add-qty").value));
  if (!(q >= 1)) {
    $("add-qty").focus();
    return;
  }
  const p = S.buildProduct(k, q, plan.equipment);
  plan.products.push(p);
  S.planProduct(plan, p);
  renderProducts();
  render();
});
for (const [id, apply] of [
  ["kitchen", (v) => (plan.kitchen = v)],
  ["cabinet", (v) => plan.cabinet && (plan.cabinet.temp = v)],
  ["ac", (v) => (plan.ac = v)],
  ["dough-off", (v) => (plan.doughOff = v)],
]) {
  $(id).addEventListener("input", () => {
    const v = num($(id).value);
    if (!Number.isFinite(v)) return;
    apply(v);
    render();
  });
}

const q = readQuery();
unknownPreset = q.unknown;
loadPreset(q.preset);
