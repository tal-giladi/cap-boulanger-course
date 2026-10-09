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
- [x] Module 7 — The Production Process
- [x] Module 8 — Pain Courant
- [x] Module 9 — Pain de Tradition Française
- [x] Module 10 — Other Breads
- [x] Module 11 — Viennoiserie: The Croissant
- [x] Module 12 — Viennoiserie: Pain au Chocolat, Pain aux Raisins and Brioche Doughs
- [x] Module 13 — Professional Equipment
- [x] Module 14 — Production Planning
- [x] Module 15 — Product Quality
- [x] Module 16 — Troubleshooting
- [x] Module 17 — Hygiene and Food Safety
- [x] Module 18 — Environmental Responsibility
- [x] Module 19 — Communication and Sales
- [x] Module 20 — The Bakery as a Workplace and a Business
- [ ] Module 21 — EP1 Practice
- [ ] Module 22 — EP2 Practice and Production Day
- [ ] Simulations: water-temperature, production-schedule, troubleshooting
- [ ] Final QA (check-course 0 problems, matrix complete, troubleshooting reference updated from module 16, TODO_FOR_TAL)

## Agents now

- PAUSED after module 20 (2026-10-09). Next: modules 21 and 22.

## Decisions and open questions

- Framework wins over the plan's module list: added Module 20 (applied management, S5 = 20/80 of EP1);
  EP1 practice is Module 21 and EP2 practice is Module 22. 22 modules, 124 lessons.
- EP2 counted as coefficient 12 (PSE separate since the 2019 general-units arrêté); PFMP 14 weeks
  (Légifrance consolidated text). Reasons in `curriculum/research/sources.md`.
- Modules are added to `_sidebar.md` only when finished, so check-course stays at 0 problems.
- Repo is public (Tal, 2026-10-08). All three simulations to be built (Tal, 2026-10-08).
- GBPH (checked 2026-10-09 by module 17): official agriculture.gouv.fr list (6 Feb 2026) has no bakery guide; 1997 guide withdrawn 2025, new draft not validated; CNBPF "Essentiel" (2026) is guidance only. Re-check at final QA.
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
- Module 8 decisions: home pâte fermentée = mini PC-02 dough (50 g flour) made the evening before, then keep back 75 g (500 g batch) / 150 g (1 kg) at end of pointage; 270 g home baguette hits the 1.4 g salt limit at ~23 % baking loss; four-factor hand friction factor = 8; home steam = preheated metal tray lowest shelf, 100–150 mL hot water at loading, vent at ~10 min, fan off first 10 min. Final QA: module 8 troubleshooting rows, ASBE "Baking" source, quality-rubric crumb line for pain courant (see matrix).
- Module 7: Module 9 must cover freezing rules for pain de tradition (07.5 leaves them out). Final QA: module 7 sources (King Arthur ×9, FAO AGRIS Aguirre 2011, INRS), troubleshooting rows (pain ferré, croûte terne, fused cuts, fridge staling, façonneuse tearing), oven temperature source (INBP/ANMF).
- Module 9: sheet TR-01 (T65 tradition 100 / water 70 = 68 autolyse + 2 bassinage / salt 1.8 / fresh yeast 0.6 / tradition pâte fermentée 15; TPV 23 °C; ~2 h pointage with folds; salt 1.044 % of dough) + retarded variant; home tradition pâte fermentée = mini dough from the same additive-free flour, never PC-02; bakery friction factor 14 for autolyse + slow mix; tradition salt ≤ 1.4 g/100 g as good practice. Freezing ban (décret 93-1074 art. 2, Code conso L122-17) taught in 09.1/09.4 — 07.5 can link to 09.1. Campagne/complet are free names (QE 11049, 2024). Final QA: module 9 sources and troubleshooting rows, tradition crumb line in quality rubric (see matrix).
- Module 10 sheets CO-01, PM-01, VI-01, SE-01 (full formulas in curriculum/matrix/module-10.md item 3). Salt as % of dough: PC-02 1.076, CA-01 1.048, CO-01 0.958, PM-01 0.879, VI-01 1.004, SE-01 0.840. formulas.md salt ranges lowered to stay under the 2023/2025 limits (bread 1.6-1.8, pain de mie 1.5-1.6, viennois 1.8). No steam for pain de mie, egg-washed viennois, tin loaves. Final QA: module 10 troubleshooting rows, sources, unsourced shaping statements (fendu, tabatière, viennois cuts) — find INBP/ANMF source; 10.7 mentions 17.6 in plain text.
- CR-01 croissant (module 11): détrempe T45 100 / water 26 / milk 26 / sugar 11 / salt 2.0 / fresh yeast 4.0 / butter 8 = 177 %; beurrage 50 (≥ 82 % fat) → 227 %; TPV 20 °C; butter ~13 °C; 3 tours simples (warm kitchen: 1 double + 1 simple); sheet 3.5 mm; triangles 11 × 30 cm, 60 g; proof 24–26 °C, 75–80 % RH, < 27 °C, 1 h 30–2 h 30; bake 190–200 °C (fan 175–180), no steam; loss 12–15 %; batch rule pieces ÷ 0.90 × 1.02 ÷ 2.27. Module 12 sheets PL-01, PB-01, BR-01, CP-01 (see curriculum/matrix/module-12.md). Crème pâtissière: 63→10 °C in ≤ 2 h, 0–3 °C, 24 h course rule. Viennoiserie salt 2.0 % (outside the salt agreement). Final QA: modules 11/12 troubleshooting rows, sources, formulas.md CR-01/PL/PB/BR/CP labels, quality-rubric notes; Module 13 must source sheeter safety (INRS).
- Module 14: cooler-proof rule ΔT = ln(t2/t1) ÷ ln 1.07; TR-01 retarded total 187.2 %; 14.4 practice order (TR-01, VI-01, CR-01 + CP-01, PL-01; croissant dough is the ~8 h critical path); oven/cabinet setup and cooling allowances in curriculum/matrix/module-14.md. Production-schedule simulation should use module 14's numbers as presets and be linked from 14.3/14.4. Final QA: organigramme template suggestions (hands column, proofing/cold-space columns), planning troubleshooting rows, 14.4 → Module 22 link.
- Module 13: convection ovens set 15–20 °C below a still oven; CNBPF energy figures (empty 5 m² deck 2 h/day ≈ 12 kWh/day; 230 vs 250 °C saves ~10 %; steam up to 15 % of bake energy) — reuse in Module 18; electrical safety = read rating plate only; sheeter safety sourced (RONDO manual, INRS ED 4473; added to 11.4). Optional templates equipment-card / maintenance-log. Final QA: module 13 sources and troubleshooting rows; 13.3/13.6 mention Module 17 in plain text.
- Module 16: references/troubleshooting.md replaced with the merged version (all module 3–14 rows, 10 sections, Lesson column) — the Final QA troubleshooting items for modules 3–14 are done. Troubleshooting simulation: build from that page + decision trees in 16.2–16.5. Final QA: links 16.x → 15.x and troubleshooting intro → 15.1/15.2; optional back-links 04.7/11.7 → 16.1, 08.5 → 16.2–16.4, 13.4 → 16.3; optional "Evidence" field in non-conformity template.
- Module 15 conventions: crust colour scale 1–5 with product targets; crumb record = holes ≥ 5 mm in a 4 × 4 cm window + press test + tracing; house weight tolerance ±3 %, salt checked on the lightest piece; trade scales verified every 2 years (yearly for prepackages); cooling before the shop ~30 min bread / ~20 min viennoiserie. Final QA: quality-rubric template changes (pain courant + tradition crumb lines, croissant /18, colour scale pointer, exterior subtotal /12, weight target definition, expected crumb table); optional weight-control and tasting templates; module 15 troubleshooting rows (check against new page); 15.4/15.5 mention Module 17 and 19 in plain text; INRAE OPALINE host has TLS errors.
- Module 18: energy price 0.20 €/kWh (CNBPF example); bakery energy split heat 65 / cold 22 / motors 8 / lighting 5 %; craft bakery has no donation-agreement duty (only distributors > 400 m²); biowaste sorting for all professionals since 2024-01-01; old bread allowed in pain courant dough, never in tradition; donation tax reduction 60 % (ceiling €20,000 or 0.5 % turnover); AGEC thin bags < 50 µm only if home-compostable ≥ 60 % bio-based. Final QA: re-check those volatile items; ADEME/gov.il pages blocked; S4.3.2.5 waste-water devices not covered; optional back-links 13.4→18.1, 15.5/09.1/07.5/06.5→18.2, 13.6→18.3.
- Module 17 numbers: CNBPF reception limits very perishable +7 °C, perishable +11 °C, frozen −15 °C; chilled > +7 °C core → discard; frozen warmed to −15…+4 °C → thaw cold, treat as fresh; opened products 3 days unless label says otherwise; temperature records 12 months. Final QA: module 17 sources (see matrix), ANSES sources for E. coli / C. botulinum / B. cereus, optional templates (cold-unit temperature log, cleaning plan, allergen table); 17.6 → module 19 link after merge.
- Module 19: report order everywhere = facts and figures → what I did → what I propose → manager decides; pitch card has seven blocks. Module 21 can reuse module 19's quiz and project Saturday brief. Final QA: module 19 sources (Code du travail L4131-1, justice.fr allergens, Reg. 1924/2006, 828/2014), optional templates pitch-card / hand-over-brief, re-check Israeli allergen labelling change (Jan 2028).
- Module 20 figures (checked 2026-10-09; re-check at final QA): SMIC €12.31/h, €1,867.02/month from 1 June 2026 (start date only via search results); IDCC 843 avenant 139 grid from 2026-01-01: coef 155 €12.41, 160 €12.53, 170 €12.78; night +25 % 20:00–6:00; Sunday +20 %; worked public holiday paid double; corporate tax 15 % to €42,500 then 25 %; chocolate products VAT 20 %; overtime monthly factor 4.333. Au Pain de la Halle = SARL, gérante Mme Lebrun, Tours, 6 employees, APE 10.71C. Not covered: S5.3.1–S5.3.3 (organisation chart, règlement intérieur, training rights CPF/bilan) and S5.2.1 unemployment causes only briefly — cover in 21.5 or final QA. Code civil articles cited via ordinance 2016-131 — confirm current text.
