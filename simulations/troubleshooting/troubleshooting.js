// UI for the troubleshooting simulation. All data and tree logic live in diagnosis.js.
import * as D from "./diagnosis.js";

const $ = (id) => document.getElementById(id);

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}
function link(href, text) {
  const a = el("a", "", text);
  a.href = href;
  return a;
}
function lessonLinks(ids) {
  const ul = el("ul", "links");
  for (const id of ids) {
    const li = el("li");
    li.append(link(D.lessonPath(id), `Lesson ${id}`));
    ul.append(li);
  }
  return ul;
}

const state = {
  preset: D.DEFAULT_PRESET,
  mode: "diagnose",
  family: "bread",
  symptom: "flat",
  answers: [], // [{ node, option }]
  caseIndex: 0,
  checked: false,
  tried: new Set(), // case ids answered at least once
  right: new Set(), // case ids right at the first try
};
let moveFocus = false;

// ---------- setup ----------

for (const [key, p] of Object.entries(D.PRESETS)) $("preset").append(new Option(p.title, key));
for (const [key, f] of Object.entries(D.FAMILIES)) {
  const lab = el("label");
  const inp = el("input");
  Object.assign(inp, { type: "radio", name: "family", value: key });
  lab.append(inp, ` ${f.label}`);
  $("families").append(lab);
}
D.CASES.forEach((k, i) => $("case").append(new Option(`${i + 1}. ${k.title}`, k.id)));

function readQuery() {
  let params;
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    params = new URLSearchParams();
  }
  const name = params.get("preset");
  const known = name && Object.prototype.hasOwnProperty.call(D.PRESETS, name);
  const caseId = params.get("case");
  const caseKnown = caseId && D.CASES.some((k) => k.id === caseId);
  const symptom = params.get("symptom");
  return {
    preset: known ? name : caseId ? "drill" : D.DEFAULT_PRESET,
    unknown: name && !known ? name : null,
    caseId: caseKnown ? caseId : null,
    unknownCase: caseId && !caseKnown ? caseId : null,
    symptom: symptom && D.SYMPTOMS[symptom] ? symptom : null,
  };
}

function loadPreset(name, opts = {}) {
  const p = D.PRESETS[name];
  state.preset = name;
  state.mode = p.mode;
  if (p.mode === "diagnose") {
    const sym = opts.symptom || p.symptom;
    state.symptom = sym;
    state.family = D.SYMPTOMS[sym].family;
  }
  const caseId = opts.caseId || p.case;
  if (caseId) state.caseIndex = Math.max(0, D.CASES.findIndex((k) => k.id === caseId));
  if (opts.caseId) state.mode = "drill";
  state.answers = [];
  state.checked = false;
  $("preset").value = name;
  let note = "";
  if (opts.unknown) note += `Unknown preset "${opts.unknown}", showing the default. `;
  if (opts.unknownCase) note += `Unknown case "${opts.unknownCase}", showing the first case. `;
  $("preset-note").textContent = note + (opts.caseId ? D.PRESETS.drill.note : p.note);
  moveFocus = false;
  render();
}

// ---------- diagnose ----------

function currentNode() {
  const s = D.SYMPTOMS[state.symptom];
  let id = s.start;
  for (const a of state.answers) {
    const o = s.nodes[a.node].options[a.option];
    if (o.cause) return { cause: o.cause };
    id = o.to;
  }
  return { node: id };
}

function renderDescribe() {
  for (const r of document.querySelectorAll('input[name="family"]')) r.checked = r.value === state.family;
  const sel = $("symptom");
  sel.replaceChildren();
  for (const [key, s] of Object.entries(D.SYMPTOMS)) if (s.family === state.family) sel.append(new Option(s.label, key));
  sel.value = state.symptom;
  const s = D.SYMPTOMS[state.symptom];
  $("symptom-hint").textContent = `French: ${s.fr}. Taught in lesson ${s.lesson}. Before you answer: what exactly, where on the piece, how many pieces, when first seen?`;
}

function renderEvidence(pos) {
  const s = D.SYMPTOMS[state.symptom];
  const trail = $("trail");
  trail.replaceChildren();
  state.answers.forEach((a, i) => {
    const n = s.nodes[a.node];
    const li = el("li");
    li.append(el("span", "q", n.q), el("span", "a", n.options[a.option].label));
    const b = el("button", "secondary", "Change");
    b.type = "button";
    b.setAttribute("aria-label", `Change the answer to: ${n.q}`);
    b.addEventListener("click", () => {
      state.answers = state.answers.slice(0, i);
      moveFocus = true;
      renderDiagnose();
    });
    li.append(b);
    trail.append(li);
  });
  trail.hidden = !state.answers.length;

  const box = $("question");
  box.replaceChildren();
  $("restart").hidden = !state.answers.length;
  if (pos.cause) return;
  const n = s.nodes[pos.node];
  const wrap = el("div", "question");
  const h = el("h3", "", n.q);
  h.id = "q-current";
  h.tabIndex = -1;
  wrap.setAttribute("role", "group");
  wrap.setAttribute("aria-labelledby", "q-current");
  wrap.append(h, el("p", "check-hint", `Check: ${n.check}`));
  const list = el("div", "answers");
  n.options.forEach((o, i) => {
    const b = el("button", "", o.label);
    b.type = "button";
    b.addEventListener("click", () => {
      state.answers.push({ node: pos.node, option: i });
      moveFocus = true;
      renderDiagnose();
    });
    list.append(b);
  });
  wrap.append(list);
  box.append(wrap);
}

function renderChain(pos) {
  const fam = D.FAMILIES[state.family];
  const possible = new Set(
    pos.cause ? [D.CAUSES[pos.cause].stage] : D.reachable(state.symptom, pos.node).map((c) => D.CAUSES[c].stage)
  );
  const chain = $("chain");
  chain.replaceChildren();
  for (const st of fam.chain) {
    const li = el("li", "", D.STAGES[st]);
    if (pos.cause && possible.has(st)) {
      li.className = "found";
      li.append(el("span", "visually-hidden", " (stage of the probable cause)"));
    } else if (possible.has(st)) {
      li.className = "possible";
      li.append(el("span", "visually-hidden", " (can still explain it)"));
    }
    chain.append(li);
  }
}

function renderCause(pos) {
  const all = D.reachable(state.symptom);
  const now = new Set(pos.cause ? [pos.cause] : D.reachable(state.symptom, pos.node));
  const box = $("cause");
  box.replaceChildren();
  if (pos.cause) {
    const c = D.CAUSES[pos.cause];
    box.append(el("p", "cause-title", c.title), el("p", "", c.why));
    const row = el("p", "cause-row", `Troubleshooting row: "${c.row}" (${D.STAGES[c.stage]}). `);
    row.append(link(D.REFERENCE_PATH, "Open the Troubleshooting page"));
    box.append(row);
  } else {
    box.append(el("p", "muted", `${now.size} of ${all.length} candidate causes still possible. Keep the one that explains every symptom and that the records support.`));
  }
  $("cand-summary").textContent = `Candidate causes (${now.size} kept, ${all.length - now.size} ruled out)`;
  const ul = $("candidates");
  ul.replaceChildren();
  // Unique titles; the kept ones first.
  const sorted = [...all].sort((a, b) => Number(now.has(b)) - Number(now.has(a)));
  for (const id of sorted) {
    const kept = now.has(id);
    const li = el("li", kept ? (pos.cause ? "kept" : "") : "out", D.CAUSES[id].title);
    if (!kept) li.append(el("span", "visually-hidden", " (ruled out by your evidence)"));
    ul.append(li);
  }
}

function renderAct(pos) {
  const box = $("act");
  box.replaceChildren();
  if (!pos.cause) {
    box.append(el("p", "muted", "Answer the evidence questions to reach a probable cause."));
    return;
  }
  const c = D.CAUSES[pos.cause];
  const s = D.SYMPTOMS[state.symptom];
  const dl = el("dl", "act");
  dl.append(el("dt", "", "Correction now"), el("dd", "", c.fixNow === "—" ? "Nothing to save on this batch: report it and prevent." : c.fixNow));
  dl.append(el("dt", "", "Prevention: one change for the next batch"), el("dd", "", c.prevent));
  const facts = state.answers.map((a) => s.nodes[a.node].options[a.option].label).join("; ");
  const report = `Constat: ${s.label.toLowerCase()} (${s.fr})${facts ? `; ${facts}` : ""}. Action: ${c.fixNow === "—" ? "reported, batch sold or set aside as the manager decides." : c.fixNow} Probable cause: ${c.title}. Prevention: ${c.prevent}`;
  const dd = el("dd");
  dd.append(el("p", "report", report));
  const p = el("p", "small muted", "Write it on the ");
  p.append(link(D.REPORT_PATH, "non-conformity report"), " with the batch, the quantity and your own readings.");
  dd.append(p);
  dl.append(el("dt", "", "Report draft"), dd);
  const ldd = el("dd");
  ldd.append(lessonLinks(D.lessonsFor(pos.cause, state.symptom)));
  dl.append(el("dt", "", "Learn the cause"), ldd);
  box.append(dl);
}

function renderDiagnose() {
  renderDescribe();
  const pos = currentNode();
  renderEvidence(pos);
  renderChain(pos);
  renderCause(pos);
  renderAct(pos);
  if (moveFocus) {
    moveFocus = false;
    const target = pos.cause ? $("h-cause") : $("q-current");
    if (target) target.focus();
    if (pos.cause && window.matchMedia && !window.matchMedia("(min-width: 760px)").matches) target.scrollIntoView({ block: "start" });
  }
}

// ---------- case drill ----------

function renderCase() {
  const k = D.CASES[state.caseIndex];
  $("case").value = k.id;
  $("case-title").textContent = k.title;
  $("case-family").textContent = `${D.FAMILIES[k.family].label}. From lesson ${k.lessonOf}.`;
  $("case-story").textContent = k.story;
  const thead = $("case-records").tHead;
  thead.replaceChildren();
  const hr = el("tr");
  for (const c of k.cols) {
    const th = el("th", "", c);
    th.scope = "col";
    hr.append(th);
  }
  thead.append(hr);
  const tbody = $("case-records").tBodies[0];
  tbody.replaceChildren();
  for (const r of k.records) {
    const tr = el("tr");
    r.forEach((v, i) => {
      if (i === 0) {
        const th = el("th", "", v);
        th.scope = "row";
        tr.append(th);
      } else tr.append(el("td", "", v));
    });
    tbody.append(tr);
  }
  const opts = $("case-options");
  opts.replaceChildren();
  for (const o of k.options) {
    const lab = el("label");
    lab.dataset.id = o.id;
    const inp = el("input");
    Object.assign(inp, { type: "radio", name: "case-cause", value: o.id });
    lab.append(inp, el("span", "", o.text));
    opts.append(lab);
  }
  $("case-error").hidden = true;
  $("feedback").replaceChildren(el("p", "muted", "Choose a cause and check it."));
  $("prev-case").disabled = state.caseIndex === 0;
  $("next-case").disabled = state.caseIndex === D.CASES.length - 1;
  state.checked = false;
  renderScore();
}

function renderScore() {
  $("score").textContent = state.tried.size
    ? `Right at the first try: ${state.right.size} of ${state.tried.size} cases tried (${D.CASES.length} cases).`
    : "";
}

function checkCase(e) {
  e.preventDefault();
  const k = D.CASES[state.caseIndex];
  const chosen = $("case-form").querySelector('input[name="case-cause"]:checked');
  if (!chosen) {
    $("case-error").hidden = false;
    return;
  }
  $("case-error").hidden = true;
  const ok = chosen.value === k.answer;
  if (!state.tried.has(k.id)) {
    state.tried.add(k.id);
    if (ok) state.right.add(k.id);
  }
  for (const lab of $("case-options").querySelectorAll("label")) {
    lab.classList.remove("right", "wrong");
    if (lab.dataset.id === k.answer && ok) lab.classList.add("right");
    else if (lab.dataset.id === chosen.value && !ok) lab.classList.add("wrong");
  }
  const fb = $("feedback");
  fb.replaceChildren();
  const pick = k.options.find((o) => o.id === chosen.value);
  if (!ok) {
    const f = el("div", "flag bad");
    f.append(el("strong", "", "Not this one. "), el("span", "", pick.feedback), el("p", "", "Look at the records again and choose another cause."));
    fb.append(f);
  } else {
    const c = D.CAUSES[k.cause];
    const f = el("div", "flag good");
    f.append(el("strong", "", `Right: ${pick.text}.`));
    fb.append(f);
    fb.append(el("h3", "", "The evidence that decides"), el("p", "", k.evidence));
    const ul = el("ul", "why-not");
    for (const o of k.options) if (o.id !== k.answer) {
      const li = el("li");
      li.append(el("strong", "", `${o.text}: `), o.feedback);
      ul.append(li);
    }
    fb.append(el("h3", "", "Why not the others"), ul);
    const dl = el("dl", "act");
    dl.append(el("dt", "", "Correction now"), el("dd", "", c.fixNow === "—" ? "Nothing to save on this batch: report it and prevent." : c.fixNow));
    dl.append(el("dt", "", "Prevention"), el("dd", "", c.prevent));
    const ldd = el("dd");
    const ids = [...c.lessons];
    if (!ids.includes(k.lessonOf)) ids.push(k.lessonOf);
    ldd.append(lessonLinks(ids));
    dl.append(el("dt", "", "Learn the cause"), ldd);
    fb.append(dl);
  }
  renderScore();
  $("h-feedback").focus();
}

// ---------- shared ----------

function render() {
  for (const r of document.querySelectorAll('input[name="mode"]')) r.checked = r.value === state.mode;
  $("diagnose").hidden = state.mode !== "diagnose";
  $("drill").hidden = state.mode !== "drill";
  if (state.mode === "diagnose") renderDiagnose();
  else renderCase();
}

for (const r of document.querySelectorAll('input[name="mode"]'))
  r.addEventListener("change", () => {
    state.mode = r.value;
    render();
  });
$("families").addEventListener("change", (e) => {
  if (e.target.name !== "family") return;
  state.family = e.target.value;
  state.symptom = Object.keys(D.SYMPTOMS).find((k) => D.SYMPTOMS[k].family === state.family);
  state.answers = [];
  renderDiagnose();
});
$("symptom").addEventListener("change", () => {
  state.symptom = $("symptom").value;
  state.answers = [];
  renderDiagnose();
});
$("describe").addEventListener("submit", (e) => e.preventDefault());
$("restart").addEventListener("click", () => {
  state.answers = [];
  moveFocus = true;
  renderDiagnose();
});
$("case").addEventListener("change", () => {
  state.caseIndex = D.CASES.findIndex((k) => k.id === $("case").value);
  renderCase();
});
$("prev-case").addEventListener("click", () => {
  if (state.caseIndex > 0) state.caseIndex--;
  renderCase();
});
$("next-case").addEventListener("click", () => {
  if (state.caseIndex < D.CASES.length - 1) state.caseIndex++;
  renderCase();
});
$("case-form").addEventListener("submit", checkCase);
$("case-options").addEventListener("change", () => ($("case-error").hidden = true));
$("preset").addEventListener("change", () => loadPreset($("preset").value));
$("reset").addEventListener("click", () => loadPreset(state.preset));

const q = readQuery();
loadPreset(q.preset, q);
