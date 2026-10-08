# Build progress

Goal: build "CAP Boulanger Preparation" per `curriculum/plan.md`, following
`tals-academy/docs/new-course-instructions.md` and `curriculum/build-spec.md`, until
`npm run check-course` reports `0 problems`. Repo: https://github.com/tal-giladi/cap-boulanger-course

## Resume procedure

1. Read this file, then `curriculum/status/*.log`. Skip anything marked done.
2. Never run more than two writing agents at once; one module per agent; agents follow
   `curriculum/build-spec.md` and validate with `node curriculum/tools/check-module.mjs NN`.
3. Shared files (`_sidebar.md`, `README.md`, `glossary.md`, `references/`, `templates/`) are edited
   only by the main session. After a module finishes: add it to `_sidebar.md` (running numbers from
   `curriculum/architecture.md`), merge `curriculum/glossary-inbox/module-NN.md` into `glossary.md`,
   run check-course from the Academy repo, commit and push.

## Units

- [x] Repo, GitHub remote, plan moved to `curriculum/plan.md`
- [x] Planning: sources, competency map, architecture/lesson inventory, exam map, physical practice, build spec, validator
- [x] Foundations: README, _sidebar, glossary, references (cap-exam, formulas, troubleshooting), templates (8), course-details
- [ ] manifest.json and competency matrix (matrix assembled from `curriculum/matrix/` at the end)
- [x] Module 1 — Introduction to Professional Baking
- [x] Module 2 — Ingredients
- [x] Module 3 — Dough Science
- [x] Module 4 — Fermentation
- [x] Module 5 — Temperature Management
- [x] Module 6 — Baker's Mathematics
- [ ] Module 7 — The Production Process
- [ ] Module 8 — Pain Courant
- [ ] Module 9 — Pain de Tradition Française
- [ ] Module 10 — Other Breads
- [ ] Module 11 — Viennoiserie: The Croissant
- [ ] Module 12 — Viennoiserie: Pain au Chocolat, Pain aux Raisins and Brioche Doughs
- [ ] Module 13 — Professional Equipment
- [ ] Module 14 — Production Planning
- [ ] Module 15 — Product Quality
- [ ] Module 16 — Troubleshooting
- [ ] Module 17 — Hygiene and Food Safety
- [ ] Module 18 — Environmental Responsibility
- [ ] Module 19 — Communication and Sales
- [ ] Module 20 — The Bakery as a Workplace and a Business
- [ ] Module 21 — EP1 Practice
- [ ] Module 22 — EP2 Practice and Production Day
- [ ] Simulations: water-temperature, production-schedule, troubleshooting
- [ ] Final QA (check-course 0 problems, matrix complete, troubleshooting reference updated from module 16, TODO_FOR_TAL)

## Agents now

- PAUSED after modules 5 and 6 (2026-10-08). Next: modules 7 and 8.

## Decisions and open questions

- Framework wins over the plan's module list: added Module 20 (applied management, S5 = 20/80 of EP1);
  EP1 practice is Module 21 and EP2 practice is Module 22. 22 modules, 124 lessons.
- EP2 counted as coefficient 12 (PSE separate since the 2019 general-units arrêté); PFMP 14 weeks
  (Légifrance consolidated text). Reasons in `curriculum/research/sources.md`.
- Modules are added to `_sidebar.md` only when finished, so check-course stays at 0 problems.
- Repo is public (Tal, 2026-10-08). All three simulations to be built (Tal, 2026-10-08).
- Module 17 must re-check the bakery GBPH: CNBPF 2026 guide says the 1997 GBPH was withdrawn in 2025 and the new one was not yet validated (as of 2026-10-08).
- Module 5 should refer back to the simple hand-mix water estimate in 01.7 (3 × target − flour − room − 2 °C).
- Technical sheets defined in 01.6 for reuse: PC-02 (T55 100 / water 64 / salt 1.8 / fresh yeast 1.5 / pâte fermentée 15) and PD-01 (direct, by hand: water 65 / salt 1.8 / yeast 1.5).
- Final QA: turn plain-text forward references into links (02.2 and 02.9 → 09.1; module 2 mentions of 03.5, 07.5, 10.7, 17.6). Check every module's matrix file for similar requests.
- Module 2 salt limits (agriculture.gouv.fr): pain courant 1.4 g/100 g since Oct 2023; wholemeal/cereal 1.3 g; pain de mie 1.1 g since Oct 2025.
- Module 5 friction figures must agree with 03.4 (hand kneading +1–3 °C, intensive mixing +10 °C or more).
- Final QA: add module 3 troubleshooting rows (over-oxidation → white bland crumb; over-mixed/warm → sticky slack dough; late contre-frasage → flour specks) and its sources (see curriculum/matrix/module-03.md).
- Module 5 should use module 4's planning rule: fermentation ~7 % faster/slower per °C of dough temperature.
- Final QA: add module 4 troubleshooting rows (forgotten salt; over-ripe pre-ferment; over-proofed retarded dough) and its sources; turn module 4 plain-text references (Module 5, 06.4, Module 7, 09.1, Module 11, 14, 17) into links. Consider merging glossary "Croûtage" and "Pâte croûtée".
- Israel adaptation (Tal, 2026-10-08): every module from 5 on adds `### In Israel` home-practice notes (build-spec "Practising in Israel"). New reference `references/flour-in-israel.md`. Final QA: retrofit `### In Israel` notes into modules 1–4 practice sections where ingredients/climate matter.
- Module 5 water-temperature convention (binding from module 6 on): base = target × factors (3, or 4 with pre-ferment); water = base − flour − room (− pre-ferment) − friction factor; friction factor = mixing heat × factors; a printed TB already excludes friction; ice = water × (tap − wanted) ÷ (tap + 80), counted inside the water weight. Water-temperature simulation should follow it and link 05.2/05.3.
- Final QA: module 5 troubleshooting rows and sources (see curriculum/matrix/module-05.md); optional pointer from 01.7 to 05.3.
- Module 6: order sheets PO-01 (baguettes on poolish) and CA-01 (campagne on liquid levain) in projects/m06-calculation-workbook.md — reuse in modules 8–10. VAT source BOFiP BOI-TVA-LIQ-30-10-10. Baking-loss 20 % still unsourced (planning estimate). Final QA: module 6 troubleshooting rows and sources (see matrix); 06.5 mentions 08.3 in plain text.
