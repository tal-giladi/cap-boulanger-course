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
- [ ] Module 2 — Ingredients
- [ ] Module 3 — Dough Science
- [ ] Module 4 — Fermentation
- [ ] Module 5 — Temperature Management
- [ ] Module 6 — Baker's Mathematics
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

- Agent A: done
- Agent B: Module 2 (started 2026-10-08)
- PAUSE after modules 1 and 2 finish (Tal, 2026-10-08): merge, commit, push, then stop and wait.

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
