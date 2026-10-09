// UI for the water-temperature simulation. All arithmetic lives in calc.js.
import { compute, fermentation, frictionFactor, fmt, METHODS, PRESETS, DEFAULT_PRESET } from "./calc.js";

const $ = (id) => document.getElementById(id);
const form = $("form");
const NUM_FIELDS = ["tpv", "tb", "flour", "room", "prefermentTemp", "friction", "waterWeight", "tap", "cold", "reading", "pointage"];

// Fill the selects.
for (const [key, p] of Object.entries(PRESETS)) $("preset").append(new Option(p.title, key));
for (const [key, m] of Object.entries(METHODS)) {
  const text = m.heating === null ? m.label : `${m.label} (heating ${m.range})`;
  $("method").append(new Option(text, key));
}

let current = DEFAULT_PRESET;

function readQuery() {
  let params;
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    params = new URLSearchParams();
  }
  const name = params.get("preset");
  const known = name && Object.prototype.hasOwnProperty.call(PRESETS, name);
  // Individual values can override the preset, e.g. ?preset=pc02&tap=22
  const overrides = {};
  for (const k of NUM_FIELDS) {
    const v = params.get(k);
    if (v !== null && v.trim() !== "" && Number.isFinite(Number(v))) overrides[k] = Number(v);
  }
  if (params.get("mode") === "tb" || params.get("mode") === "tpv") overrides.mode = params.get("mode");
  if (params.get("method") && METHODS[params.get("method")]) overrides.method = params.get("method");
  if (params.has("preferment")) overrides.preferment = params.get("preferment") !== "0";
  return { preset: known ? name : DEFAULT_PRESET, unknown: name && !known ? name : null, overrides };
}

function setValues(v) {
  form.querySelector(`input[name="mode"][value="${v.mode}"]`).checked = true;
  for (const k of NUM_FIELDS) $(k).value = v[k];
  $("preferment").checked = !!v.preferment;
  $("method").value = v.method;
}

function getValues() {
  const v = {
    mode: form.querySelector('input[name="mode"]:checked').value,
    preferment: $("preferment").checked,
    method: $("method").value,
  };
  for (const k of NUM_FIELDS) v[k] = $(k).value.trim() === "" ? NaN : Number($(k).value);
  return v;
}

function loadPreset(name, overrides = {}, unknown = null) {
  current = name;
  $("preset").value = name;
  setValues({ ...PRESETS[name].values, ...overrides });
  $("preset-note").textContent = (unknown ? `Unknown preset "${unknown}", showing the default. ` : "") + PRESETS[name].note;
  update();
}

function showFor(v) {
  for (const el of document.querySelectorAll("[data-show]")) {
    const w = el.dataset.show;
    const on = w === "tb" ? v.mode === "tb" : w === "tpv" ? v.mode === "tpv" : w === "preferment" ? v.preferment : w === "custom" ? v.method === "custom" : true;
    el.hidden = !on;
  }
  $("tpv-hint").hidden = v.mode !== "tb";
}

function needed(v) {
  const req = ["flour", "room", "waterWeight", "tap", "cold", "tpv"];
  if (v.mode === "tb") req.push("tb");
  if (v.preferment) req.push("prefermentTemp");
  if (v.mode === "tpv" && v.method === "custom") req.push("friction");
  return req.filter((k) => !Number.isFinite(v[k]));
}

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

function update() {
  const v = getValues();
  showFor(v);

  const n = v.preferment ? 4 : 3;
  if (v.method !== "custom") {
    const m = METHODS[v.method];
    $("method-hint").textContent = `Friction factor with ${n} factors: ${fmt(m.heating)} × ${n} = ${fmt(frictionFactor(v.method, n))}.`;
  } else {
    $("method-hint").textContent = "From your own records (lesson 05.3).";
  }
  $("friction-hint").textContent = `Measured with ${n} factors: ${n} × dough − (flour + room + water${v.preferment ? " + pre-ferment" : ""}).`;

  const missing = needed(v);
  const error = $("error");
  if (missing.length) {
    const names = missing.map((k) => form.querySelector(`label[for="${k}"]`)?.textContent || k);
    error.textContent = `Enter a number for: ${names.join(", ")}.`;
    error.hidden = false;
    $("answer").textContent = "—";
    $("flags").replaceChildren();
    $("steps").replaceChildren();
    $("ferm").replaceChildren();
    return;
  }
  error.hidden = true;

  const r = compute(v);

  // Headline.
  const answer = $("answer");
  answer.replaceChildren();
  if (r.usable !== r.water) {
    answer.append(`Use ${fmt(r.usable)} °C`);
    answer.append(el("span", "sub", `Calculated ${fmt(r.water)} °C is beyond what the water can do: dough about ${r.deviation > 0 ? "+" : ""}${fmt(r.deviation)} °C off target.`));
  } else {
    answer.append(`${fmt(r.water)} °C`);
    const how = v.mode === "tb" ? `from TB ${fmt(v.tb)}` : `${r.n} factors, friction factor ${fmt(r.friction)}`;
    answer.append(el("span", "sub", how));
  }
  const s = r.supply;
  if (s.need === "colder") {
    let line = `Ice: about ${fmt(s.ice)} g + ${fmt(s.tapWater)} g tap water (total ${fmt(v.waterWeight)} g).`;
    if (s.coldWater !== null) line += ` Or ${fmt(s.coldWater)} g of ${fmt(v.cold)} °C water + ${fmt(s.blendTap)} g tap.`;
    answer.append(el("span", "sub", line));
  } else if (s.need === "warmer") {
    answer.append(el("span", "sub", "Warmer than the tap: blend in kettle water, check with the probe."));
  }

  // Flags.
  $("flags").replaceChildren(...r.flags.map((f) => el("p", `flag ${f.kind}`, f.text)));

  // Steps.
  $("steps").replaceChildren(
    ...r.steps.map((st) => {
      const li = el("li");
      li.append(el("span", "t", st.title), el("span", "expr", st.expr));
      if (st.note) li.append(el("span", "note", st.note));
      return li;
    })
  );

  // Fermentation hint.
  const ferm = $("ferm");
  ferm.replaceChildren();
  const tpvLabel = v.mode === "tb" ? `TPV ${fmt(v.tpv)} °C (enter the sheet's TPV above)` : `TPV ${fmt(v.tpv)} °C`;
  const line = (label, reading) => {
    const f = fermentation(v.tpv, reading, Number.isFinite(v.pointage) ? v.pointage : 45);
    const p = el("p");
    const head =
      f.direction === "on"
        ? `${label}: dough ${fmt(reading)} °C, on target.`
        : `${label}: dough ${fmt(reading)} °C, ${fmt(Math.abs(f.delta))} °C ${f.delta > 0 ? "warm" : "cold"} → about ${f.percent} % ${f.direction}.`;
    p.append(el("strong", "", head), " ", el("span", "", f.expr));
    return p;
  };
  ferm.append(el("p", "muted small", tpvLabel));
  if (r.deviation !== 0) ferm.append(line("With this water", r.predicted));
  if (Number.isFinite(v.reading)) ferm.append(line("Your reading", v.reading));
  else ferm.append(el("p", "muted", "Enter the dough temperature you read after mixing."));
}

form.addEventListener("input", update);
form.addEventListener("change", update);
form.addEventListener("submit", (e) => e.preventDefault());
$("preset").addEventListener("change", () => loadPreset($("preset").value));
$("reset").addEventListener("click", () => loadPreset(current));

const q = readQuery();
loadPreset(q.preset, q.overrides, q.unknown);
