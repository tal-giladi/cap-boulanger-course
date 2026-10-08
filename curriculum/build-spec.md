# Build spec for module writers

You write ONE module of the CAP Boulanger preparation course. Read first, in this order:

1. `C:\Users\TalGiladi\OneDrive\repos\tals-academy\docs\new-course-instructions.md` (binding)
2. `curriculum/plan.md` (course plan; sections 3, 8, 9, 10, 11, 12 matter most)
3. this file
4. `curriculum/architecture.md` (your module's lesson list: ids, titles, competencies, practice idea)
5. `curriculum/competency-map.md`, `curriculum/research/sources.md`
6. `curriculum/research/raw/referentiel-cap-boulanger-2014.txt` (official référentiel; search it for
   your savoirs codes, e.g. `S3.3`) and `ep1-sujet-2019.txt` (a real EP1 paper: style of questions)
7. One finished module if any exists (`lessons/module-01/`) to match tone and format.

## What you produce for module NN

- `lessons/module-NN/lesson-MM.md` + `lesson-MM.quiz.yaml` for every lesson in the inventory (exactly
  that count, those ids; you may polish titles).
- `assessments/module-NN-quiz.md` + `assessments/module-NN-quiz.quiz.yaml` (10 questions).
- `projects/mNN-<slug>.md` (slug given in architecture.md): the module's larger practical piece.
- Diagrams: `assets/mNN-<name>.svg` (hand-written SVG) and/or mermaid blocks.
- `curriculum/glossary-inbox/module-NN.md`: new terms, one per line:
  `- **French term** (pronunciation) — English explanation.` (English-only terms: `- **Term** — explanation.`)
- `curriculum/matrix/module-NN.md`: a table mapping every lesson, every lesson-quiz question, the
  project and every module-quiz question to competency codes, e.g.
  `| 03.2 q1 | C2.3, S3.1 |`. Mark rows that need real practice with "requires physical practice".
- Append `lesson-MM done` to `curriculum/status/module-NN.log` after each lesson (md + quiz), then
  `module done` at the end.

Never edit shared files: `_sidebar.md`, `README.md`, `glossary.md`, `references/`, `templates/`,
`BUILD_PROGRESS.md`, other modules. If you need a new template or reference, describe it at the end of
your matrix file under `## Requests for main session`. Do not commit or push; the main session does.

## Lesson format (exact)

```markdown
---
id: "08.3"
module: 8
minutes: 12
practice_minutes: 90
prerequisites: ["08.2", "07.3"]
objectives:
  - "C2.3 — Pre-shape and shape six baguettes of 250 g to an even 40 cm length."
  - "S3.1 — Explain how shaping tension affects oven spring."
volatility: concept
sources:
  - title: "…"
    url: https://…
last_verified: "2026-10-08"
---

# 08.3 · Shaping Baguettes

One plain intro paragraph (2-3 sentences, no formatting at its start): what this lesson does and what
you will make.

## Why it matters
## Key terms
## How it works
## Worked example
## Practice
## What goes wrong
## Review
```

- Exactly those 7 `##` sections, in that order, no others. Use `###` inside them.
- Objectives start with a competency or savoir code from `competency-map.md` then ` — `. Quote each
  objective (it contains a colon-like dash). 2-4 objectives.
- `volatility: implementation` for anything that depends on current rules (exam, law, labels,
  regulations, prices, contracts, pay). Otherwise `concept`.
- `prerequisites`: real earlier lesson ids only.
- `minutes`: honest reading time (5-15). `practice_minutes`: honest hands-on time including waiting.
- **Key terms**: a table `| French | Say it | English meaning |` (pronunciation as simple English
  respelling, e.g. *poh-ahn-TAHZH*), 4-10 terms. French terms always taught French → English.
- **How it works**: first principles, what physically/chemically changes, with numbers. At least one
  diagram (SVG in `assets/` or a mermaid block) per lesson where it helps; at least two per module.
- **Worked example**: a realistic professional situation with real numbers, solved step by step.
- **Practice** (home practice pathway, plan section 9): what the learner does at home, with
  subsections `### You need` (minimum home equipment and the professional equivalent), `### Ingredients`
  (table with grams and baker's %, when baking), `### Steps` (numbered), `### Targets` (measurable:
  dough temperature, weights, times, sizes), `### How you know it worked`, `### Self-check` (a task
  list `- [ ] …`). Calculation lessons: give exercises with answers in `<details><summary>Answers</summary>…</details>`.
  Planning/paperwork lessons: the learner fills a template or a realistic document.
- **What goes wrong**: table `| Symptom | Likely cause | Fix now | Prevent next time |`.
- **Review**: 3-5 bullets; link `../../references/cap-exam.md` where exam-relevant (never repeat
  exam facts — durations, coefficients, product lists — in lessons; link instead).
- Lesson 1 of each practical module repeats briefly: watching is not doing; the Academy cannot grade
  photos — compare your result with the rubric; self-assessment does not replace the official exam.

## Safety and honesty

- Any step with a hot oven, steam, boiling water, sharp blades (lame, knife), mixers, sheeters, raw
  eggs or allergens opens with `> [!WARNING]` or `> [!CAUTION]` (one short, specific sentence or two).
  Home steam: never pour water into a hot glass dish; use a preheated metal tray and an oven glove,
  stand back.
- Never imply the course awards the CAP. Use "CAP Boulanger preparation".
- Exam/legal claims: cite an official source from `research/sources.md` in `sources`. Technical
  baking claims: cite reputable sources (ANMF/INBP materials, Arvalis/ANMF flour guides, Calvel,
  King Arthur Baking, Bake Info (Wheat Foods Council), FAO/WHO, ANSES, Ministry of Agriculture (agriculture.gouv.fr),
  economie.gouv.fr/DGCCRF for labelling, INRS for occupational safety, ADEME for environment,
  service-public.fr and travail-emploi.gouv.fr for employment law). Verify each URL loads (WebFetch)
  before citing it; do not cite a URL you have not opened.
- Numbers must be explained, not fake-precise. Typical ranges (e.g. salt 1.8-2.2% of flour, dough
  temperature 23-25 °C for pain courant) are given as ranges with the reason.
- English only. Metric (g, kg, °C, cm); give °F only in a few home-oven contexts.

## Home baseline the learner has

Domestic oven (assume 230-250 °C max, fan and conventional), a digital scale (1 g; ideally a 0.1 g
pocket scale for yeast/salt), a probe thermometer, bowls, a dough scraper, a plastic container with a
lid, baking trays, a rolling pin, a sharp knife or razor lame, a fridge and freezer. A stand mixer is
optional — always give the by-hand method. Home batch sizes: 500 g-1 kg flour for bread, 500 g for
viennoiserie; show the professional batch next to it.

## Practising in Israel (required from Module 5 on)

The learner lives in Israel. In every lesson whose home practice depends on an ingredient, a product,
equipment, water or climate, add a `### In Israel` subsection inside `## Practice` (no new `##`
sections): which Israeli product to buy (Hebrew name + transliteration + English, e.g. *kemach lechem*
קמח לחם, bread flour), how to adjust the formula (hydration, yeast, water temperature for a 26-32 °C
summer kitchen, proofing time, butter temperature), and where to find professional items. Flour:
link `../../references/flour-in-israel.md` instead of repeating it. Keep French law, exam rules and
professional standards as the subject; Israeli rules (Ministry of Health, Standards Institution of
Israel) only as home-practice notes. Brand names and availability change: say "checked 2026-10-08",
give what to look for on the label rather than a single brand, and cite only sources you opened.
Set `volatility: implementation` when a lesson's Israel notes depend on products or rules.

## Quizzes

Follow section 5 of the instructions exactly. Lesson quiz: 4-5 questions (3 minimum). Module quiz: 10
scenario questions using realistic documents (production orders, delivery notes, technical sheets,
labels, temperature logs, schedules) described in the question text. Calculations become "which
quantity is correct" with wrong options from typical slips (percent of dough instead of flour,
forgetting the pre-ferment, wrong unit). Defects become "symptom → which diagnosis". Spread `correct`
evenly (in a 10-question file: 2-3 each of 0,1,2,3, no pattern). Keep the correct option the same
length as the others (the checker flags it if it is >25% longer than the average of the others).
Always use `>-` block scalars for question, every option and explanation.

## Module quiz intro page

`assessments/module-NN-quiz.md`: `# Module N Quiz: Title`, one paragraph on what it covers, "10
multiple-choice scenario questions, pass mark 70%", then `## Revisit by topic`: bullets
`- Topic → [NN.M · Title](../lessons/module-NN/lesson-MM.md)`, then one line linking the project.
No questions or answers.

## Project brief

`projects/mNN-<slug>.md`: `# Project: Title`, intro paragraph, `## Brief` (realistic professional
order or task), `## You need`, `## Steps`, `## Deliverables` (what the learner writes/bakes/records),
`## Self-evaluation rubric` (table: criterion | meets standard | needs work), `## Links back` to
lessons. Use templates in `templates/` by relative link (`../templates/<name>.md`) when they exist.

## Templates available (link to them; do not edit)

- `templates/production-sheet.md` — fiche technique (formula, baker's %, process, targets)
- `templates/organigramme.md` — work schedule / organigramme
- `templates/bake-log.md` — bake log and self-evaluation
- `templates/temperature-log.md` — temperature log with base-temperature calculation
- `templates/delivery-check.md` — delivery reception check (accept / reject / report)
- `templates/quality-rubric.md` — product quality rubric (exterior, interior, taste)
- `templates/non-conformity-report.md` — non-conformity / malfunction report
- `templates/readiness-checklist.md` — "what you still need" checklist for the exam

Reference pages to link (exist, do not edit): `references/cap-exam.md`,
`references/troubleshooting.md`, `references/formulas.md`, `glossary.md`.

## Finish

Run `node curriculum/tools/check-module.mjs NN` from the course root until it prints `0 problems in
module NN`. Then append `module done` to the status log and report back: lesson titles (final H1
titles), the project file name, anything under "Requests for main session".
