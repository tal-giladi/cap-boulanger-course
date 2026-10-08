# CAP Boulanger Preparation — course plan

Build a complete, free, self-paced course that prepares a complete beginner for the French
**CAP Boulanger** professional qualification, for Tal's Academy.

## 0. Binding build rules — read first

This plan is subordinate to `C:\Users\TalGiladi\OneDrive\repos\tals-academy\docs\new-course-instructions.md`.
Read that whole file before writing anything. When this plan and that file disagree, that file wins.
In short:

- Work in this folder (`course-creator\CAP-Boulanger-course`), never in the Academy repo. `git init` it first.
- Plain markdown and YAML only: no React/JSX/MDX, no npm or build step, no generated HTML pages, no
  content that needs JavaScript. The Academy already provides progress tracking, search, navigation,
  lesson times and certificates — do not build any of that.
- English only. French professional terms are taught as **French term → English explanation**.
- Repo layout, `_sidebar.md`, lesson front-matter and file naming exactly as in the instructions
  (`lessons/module-NN/lesson-MM.md`, `lessons/module-NN/lesson-MM.quiz.yaml`,
  `assessments/module-NN-quiz.md` + `.quiz.yaml`, `labs/module-NN/`, `templates/`, `projects/`,
  `simulations/`, `assets/`, `glossary.md`, `references/`). Planning material goes in `curriculum/` only.
- **Every graded question is multiple choice** (4 options, one correct) in a `.quiz.yaml`, with an
  explanation. 3-5 per lesson, 8-10 scenario questions per module quiz, pass mark 70%.
- Learning by doing: every lesson ends in something the learner does at home (bake, calculate,
  plan, inspect, diagnose), with steps, equipment, time and how they know it worked. Every module ends
  in a larger practical piece.
- Always current: verify every claim against current official sources before writing the lesson;
  record `sources` and `last_verified` in the front-matter.
- At most two writing agents at once, `BUILD_PROGRESS.md` + `curriculum/status/module-NN.log`, commit
  after every module, run `npm run check-course -- ../course-creator/CAP-Boulanger-course` from the
  Academy repo after every module until it reports `0 problems`.
- Write `curriculum/course-details.md` (suggested slug `cap-boulanger`, repo
  `tal-giladi/cap-boulanger-course`, free, risk notice about ovens, hot surfaces, sharp blades, mixers and
  allergens).

## 1. Objective and honest positioning

- The course prepares for the CAP; it does **not** award it. The CAP is a French national diploma
  awarded by the Ministry of Education after the official examination.
- Describe it as **"CAP Boulanger preparation"**, never as a certification. Standard wording:
  "This free course prepares you for the CAP Boulanger. It is not the CAP itself and does not award the
  French national diploma." Never write "Get your CAP by completing this course."
- Any Academy completion certificate is only a certificate of course completion. Put the exact
  disclaimer for Tal in `curriculum/course-details.md`: "This certificate confirms completion of the
  online CAP Boulanger preparation course. It is not a French CAP Boulanger diploma and is not issued by
  the French Ministry of Education."
- The course must clearly separate: (1) what can be learned online, (2) what needs physical practice,
  (3) what the official exam assesses, (4) the administrative requirements a candidate must meet.
- Target certification: **RNCP42115 – CAP Boulanger**, pathways starting 01/09/2026, RNCP registration
  currently until 31/08/2028. Re-verify these before writing.

Official sources (source of truth; never invent exam requirements):

- France Compétences RNCP42115: https://www.francecompetences.fr/recherche/rncp/42115
- Légifrance CAP Boulanger decree: https://www.legifrance.gouv.fr/loda/id/JORFTEXT000028699556
- Eduscol professional frameworks: https://referentiels-professionnels.eduscol.education.fr/

Source priority: Ministry of Education → Eduscol → Légifrance → France Compétences → other official
French government sources → professional organisations → established schools → other reputable
professional sources. Third-party sources are for supplementary teaching only. Every claim about exam
structure, durations, coefficients, eligibility, legal or qualification requirements must cite an
authoritative source in the lesson's `sources`.

## 2. Target learner

A complete beginner: has never worked in a bakery, cooks at home, has a domestic oven, knows no French
bakery terms, may want to work as a boulanger and take the CAP. Teach from first principles.

## 3. Course philosophy

Not a recipe collection. Teach the chain
**ingredient → dough → process → fermentation → shaping → baking → finished product → diagnosis**.
For every important technique: what we do, why, what changes physically/chemically, what can go wrong,
how to recognise it, how to correct it. Use numerical examples wherever useful.

## 4. Before writing lessons (planning phase, all in `curriculum/`)

Do not start by generating hundreds of lessons. First produce, in `curriculum/`:

1. The official competency map extracted from the current RNCP42115 / Eduscol framework.
2. The course architecture (modules) and lesson inventory.
3. A competency matrix mapping every lesson, lesson quiz, practical exercise and module/final quiz
   question to competencies.
4. Competencies that cannot be learned online, marked "requires physical practice".
5. The exam map (EP1/EP2 and general blocks, as the official texts define them).
6. `curriculum/manifest.json` (certification, RNCP, framework version/date, modules, competencies,
   lessons, assessments, practical requirements). It is a planning file and is not imported.

Then write the lessons module by module.

## 5. Versioning

The framework can change. Keep all exam rules (structure, durations, coefficients, eligibility,
framework version and dates, official URLs) in **one** reference page, `references/cap-exam.md`, linked
from the top of `_sidebar.md` and shown as "Curriculum version: RNCP42115, checked <date>". Lessons
link to it instead of repeating exam facts. Lessons and quizzes that would go out of date when the
framework changes get `volatility: implementation`.

## 6. Competency coverage

### Block 1 — Approvisionnement, communication, sécurité alimentaire et hygiène en boulangerie

Receiving deliveries; checking quantities and quality; detecting non-conformities; correct ingredient
storage; stock organisation; hygiene; employee health and safety; food safety; cleaning and
sanitation; food-safety procedures; environmental practices; communicating problems to management,
with colleagues and with sales staff; explaining products to sales staff; professional vocabulary.
Practical outcome: given a realistic delivery note and description, decide accept / reject / report.

### Block 2 — Production and presentation (the largest part)

Organising work; calculating quantities; weighing and measuring; preparing ingredients and dough;
manufacturing; fermentation; shaping; proofing; baking; cooling; storing; conditioning; presenting;
checking final weight, quantity and visual quality; detecting production problems; reporting
non-conformities.

## 7. Module outline (adjust to the official framework; it wins over this list)

Each lesson takes roughly 5-15 minutes of reading plus its practice time; split long subjects.

1. **Introduction to professional baking** — what a boulanger is, what the CAP qualifies you to do,
   bakery workflow, terminology, measurements, baker's percentages, production sheets, mise en place,
   organisation. Practice: read a simple production order and list ingredients, equipment, quantities,
   sequence, fermentation times and baking requirements.
2. **Ingredients** — flour (wheat anatomy, extraction, French flour types, gluten, proteins, starch,
   ash, strength, absorption, storage, defects, effect on elasticity/extensibility/fermentation/volume/
   crumb/crust); water (hydration, temperature, hardness); salt (flavour, gluten, fermentation, typical
   %); yeast (fresh vs dry, metabolism, temperature, quantity, storage); levain (microbiology, LAB,
   feeding, acidity, behaviour, pros/cons); sugar, fats, butter, milk, eggs, seeds, grains, malt,
   improvers/additives where relevant — each with its technological function.
3. **Dough science** — gluten development, hydration, autolyse, mixing, kneading, dough temperature,
   strength, elasticity, extensibility, oxidation, gas retention; under-kneading vs correct vs
   over-kneading.
4. **Fermentation** — alcoholic fermentation, CO2, yeast metabolism, temperature and time, pointage,
   dividing, détente, apprêt, retarded and cold fermentation. Judging fermentation by dough behaviour,
   not a timer; under / correct / over-fermented: symptoms → causes → correction. Practice: "diagnose
   the dough" exercises with the learner's own doughs.
5. **Temperature management** — flour, room, water, dough, fermentation, butter, proofing and oven
   temperatures; calculating water temperature from a target dough temperature, with numerical
   exercises.
6. **Baker's mathematics** — percentages, scaling (1 kg to 10 kg flour), hydration, salt and yeast %,
   production quantities, losses, yield, unit conversions, temperature calculations. Worked example:
   flour 10 kg, water 65%, salt 2%, yeast 1% → every ingredient, then the reverse problem.
7. **The production process** — the 18 stages from production order to cleaning the workstation, and
   why each exists.
8. **Pain courant** — formula, mixing, fermentation, shaping, proofing, scoring, baking, evaluation.
9. **Pain de tradition française** — legal definition (Décret pain 1993, verify current text),
   permitted ingredients, production principles, fermentation, shaping, scoring, baking, expected
   characteristics. Not "a long loaf".
10. **Other breads** — baguettes, bâtards, boules, seeded/grain, wholemeal and the other products the
    framework requires (follow the framework, don't invent a list).
11. **Viennoiserie: croissant** — détrempe, beurrage, tourage, turns, resting, rolling, cutting,
    shaping, proofing, egg wash, baking, evaluation; physical structure of laminated dough; why butter
    temperature is critical; failures (butter breaks, melts in, uneven layers, leaking, poor lift,
    dense interior, distorted shape).
12. **Viennoiserie: pain au chocolat, brioche and the other required products** — and explicitly how
    pain au chocolat production differs from croissant.
13. **Professional equipment** — spiral/planetary mixers, dividers, sheeters, proofing cabinets, ovens,
    scales, thermometers, cutters, trays, bannetons, lames, refrigeration, storage: purpose, operating
    principle, correct use, cleaning, safety, common mistakes, and the home equivalent.
14. **Production planning** — several products at once (e.g. baguettes, croissants, pains au chocolat,
    brioche) with quantities, preparation/fermentation/proofing times, oven availability and equipment
    limits. Practice: build a feasible schedule (template in `templates/`), check it against the
    worked solution.
15. **Product quality** — exterior (shape, volume, colour, crust, scoring, regularity), interior
    (crumb, alveolation, texture, elasticity, moisture), taste (aroma, acidity, salt, fermentation
    character, balance). Practice: evaluate the learner's own bakes with the rubric.
16. **Troubleshooting** — problem → probable causes → evidence → correction → prevention for dense
    crumb, weak volume, spreading, tearing, pale/burnt crust, gummy or dry crumb, irregular/excessive
    holes, poor scoring, weak oven spring, under/over-fermentation, butter leakage, poor lamination.
    Also kept as one reference page, `references/troubleshooting.md`.
17. **Hygiene and food safety** — personal hygiene, hand washing, clothing, contamination and
    cross-contamination, cleaning vs disinfection, allergens (EU 14), storage, temperature control,
    pests, waste, traceability, HACCP / PMS, occupational safety. Realistic scenarios ("an employee
    touches a phone and then handles shaped dough…").
18. **Environmental responsibility** — energy, water, waste and food waste, storage, packaging,
    cleaning products, as the framework defines it.
19. **Communication and sales** — with the manager, colleagues and sales staff; explaining
    ingredients, method, flavour, texture, allergens and characteristics. Practice: written
    role-play scripts.
20. **EP1 practice** and 21. **EP2 practice and production day** — exam-style practice (see section
    10), the final practical production-day simulation, and the "what you still need" checklist.

### General CAP subjects

French / history-geography / EMC, mathematics / physics-chemistry, foreign language, EPS and
prevention-health-environment are outside this course. Mark them clearly in `references/cap-exam.md`
and the README as "additional preparation required", unless the candidate is exempt (state the
exemption rules only as the official sources give them). Never imply the bakery modules alone prepare
for the whole CAP.

## 8. Lesson structure

Use one fixed set of `##` sections in every lesson (no quiz section in the markdown — the quiz is the
`.quiz.yaml`):

1. `## Why it matters`
2. `## Key terms` (French → English, pronunciation where useful)
3. `## How it works` (first principles, numbers, diagram)
4. `## Worked example`
5. `## Practice` (home practice pathway, see section 9)
6. `## What goes wrong` (symptoms → cause → fix)
7. `## Review` (3-5 bullet takeaways and the link to `references/cap-exam.md` where relevant)

Front-matter `objectives` list the competencies the lesson serves (e.g. "C2.3 — …").

## 9. Home practice pathway

Repeat in the course: watching someone make bread does not make you able to make bread. Every
practical skill gets, in its `## Practice` section: required and minimum equipment, the professional
equivalent, ingredients with weights, procedure, measurable targets (dough temperature, weight, volume,
time), expected result, troubleshooting and a self-evaluation checklist (task list). Progression:
basic dough → simple bread → baguette → several breads → viennoiserie → several products at once →
full production day. The learner does not start with croissants. Every module ends in a larger
practical piece, written as a project brief under `projects/`.

The Academy cannot grade photos: the learner compares their own result with the rubric. Never claim
self-assessment or AI image evaluation replaces the official practical exam.

### Practising in Israel (Tal, 2026-10-08)

The learner practises at home in Israel. The exam, the law and the professional content stay French,
but every home-practice instruction must work with what is sold and how kitchens behave in Israel:
flour (see `references/flour-in-israel.md`, incl. 80% whole wheat), yeast, butter and dairy fat
content, chocolate and fillings, water hardness, warm and humid kitchens (dough temperature, proofing
times, butter for lamination), equipment and oven sizes, and where to buy professional ingredients.
Israeli rules (Ministry of Health, Standards Institution of Israel) are mentioned only to help the
learner buy and practise safely, never instead of the French rules the exam tests.

## 10. Assessment

- Lesson quizzes and module quizzes: multiple choice only (see section 0). Turn every other question
  type the old plan wanted into multiple choice: calculations → "which quantity is correct" with
  plausible wrong answers (common slips), defect identification → described or pictured symptom with
  four diagnoses, corrective action, ordering → "which step comes next / which sequence is correct",
  scheduling → "which schedule is feasible", matching → "which term matches". No trivia; test
  professional reasoning in realistic situations, using realistic documents (delivery notes,
  production sheets, labels, technical sheets, hygiene procedures).
- **EP1-style and EP2-style practice**: split module 20 into two modules, "EP1 practice" and "EP2
  practice and production day". Their lessons are practice-exam rounds by topic (each with a 5-question
  quiz) and their module quizzes are 10-question mock exams whose intro pages state the suggested time
  limit and which lessons to revisit per topic. The practical part of EP2 is a project brief
  (production order, calculations, organisation, workflow, quality control) the learner carries out at
  home and self-evaluates.
- Final knowledge check: the practice-exam rounds together cover the whole theory curriculum; no
  quiz file goes above the 5 (lesson) / 10 (module) question limits.
- No competency dashboard, weakness report or timer: the Academy shows quiz scores per module; each
  module quiz intro page lists which lessons to revisit for each topic.

## 11. Visuals and simulations

Highly visual, never decorative. SVG or PNG under `assets/` with meaningful alt text, and mermaid for
flows: wheat grain, flour composition, gluten development, fermentation, dough structure, bread
anatomy, baguette scoring, croissant lamination and butter layers, production workflow, equipment,
production schedules (Gantt). Optional simulations (plain HTML + vanilla JS, rules in section 7 of the
instructions), only where they really help, e.g.:

- `simulations/water-temperature/` — target dough temperature calculator with base-temperature method;
- `simulations/production-schedule/` — place products on oven/mixer timelines and flag impossible
  overlaps;
- `simulations/troubleshooting/` — pick symptoms, see probable causes and the lessons to revisit.

## 12. Quality bar

Serious professional school, not an AI recipe site. Avoid generic introductions, repetition, filler,
fake precision, unexplained numbers, recipe dumping, superficial quizzes, walls of text without
diagrams. Prefer first principles, professional scenarios, numerical examples, troubleshooting,
practical assignments, progressive difficulty and exam-style questions.

## 13. Done means

`npm run check-course` reports `0 problems`, the checklist in section 10 of the instructions is done,
everything is committed, and `TODO_FOR_TAL.md` says the course is ready to import with the repo name
and commit.
