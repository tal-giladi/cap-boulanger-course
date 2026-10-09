# Competency matrix — Module 14: Production Planning

Codes from `curriculum/competency-map.md`. "Requires physical practice" marks rows whose skill can only be built by doing it at home or in a bakery. Planning (organigrammes, oven plans, resource checks, reports) is practised on paper and fully online; running a multi-product day to the clock is not.

| Item | Competencies / savoirs | Note |
|---|---|---|
| 14.1 lesson | C1.2, C1.3, S3.1, S3.3 | paper practice (home tradition organigramme); the optional bake to the plan requires physical practice |
| 14.1 q1 | C1.2, C1.3 | |
| 14.1 q2 | C1.2, S3.3 | |
| 14.1 q3 | C1.2, S3.1 | |
| 14.1 q4 | C1.3, S3.3 | |
| 14.1 q5 | C1.2, S3.1 | |
| 14.2 lesson | C1.2, C1.3, S3.3, S3.4 | paper practice (two-product home plan, one-tray oven); the optional bake requires physical practice |
| 14.2 q1 | C1.2, S3.3, S3.4 | |
| 14.2 q2 | C1.2, S3.1 | |
| 14.2 q3 | C1.2 | |
| 14.2 q4 | C1.3, S3.3 | |
| 14.2 q5 | C1.2, S3.1 | |
| 14.3 lesson | C1.2, C1.3, C4.4, C2.5, S3.1 | paper practice (find the conflicts in a home brunch plan; measure your oven); the optional bake requires physical practice |
| 14.3 q1 | C1.3, S3.1 | |
| 14.3 q2 | C1.2, S3.1 | |
| 14.3 q3 | C1.2, S3.4 | |
| 14.3 q4 | C1.2 | |
| 14.3 q5 | C4.4 | |
| 14.4 lesson | C1.2, C1.3, C2.6, S3.1, S3.4, S4.2 | paper practice (home three-dough day); baking the day requires physical practice |
| 14.4 q1 | C1.2, S3.4 | |
| 14.4 q2 | C1.3 | |
| 14.4 q3 | C2.6, S4.2 | |
| 14.4 q4 | C1.2, S3.1 | |
| 14.4 q5 | C1.2, C4.4 | |
| Project m14-multi-product-schedule | C1.2, C1.3, C2.2, C2.3, C2.5, C2.6, C3.2, C4.4, S3.1, S3.3, S3.4 | Part A on paper; Part B requires physical practice (a home multi-product day run to the clock, planned vs real times, rubric) |
| Module quiz q1 | C1.2, C1.3 | |
| Module quiz q2 | C1.3, S3.3 | |
| Module quiz q3 | C1.2, S3.4 | |
| Module quiz q4 | C1.3, S3.1 | |
| Module quiz q5 | C1.2, S3.4 | |
| Module quiz q6 | S3.3, S1.4 | |
| Module quiz q7 | C1.2, S3.1 | |
| Module quiz q8 | C2.6, S4.2 | |
| Module quiz q9 | C4.4 | |
| Module quiz q10 | C1.2, S3.4 | |

## Requests for main session

1. **Promises in earlier lessons that Module 14 now delivers (final QA: turn into links).** Grep of `Module 14`, `14.[1-4]`, `organigramme` on 2026-10-09:
   - `lessons/module-01/lesson-06.md` line 61 "Module 14 teaches it in full; here you only read one" → `[Module 14](../module-14/lesson-01.md)`. 14.1 delivers it: rétroplanning from the deadline, hands time vs dough time, 15-minute template slots with codes, a full table organigramme and a Gantt, preheat, cooling, cleaning, the 7 % rule applied to the plan, slowing a second oven load.
   - `lessons/module-04/lesson-04.md` line 96 "(organigramme, Module 14)" → `[organigramme, lesson 14.3](../module-14/lesson-03.md)` (oven load conflicts).
   - Module 4 matrix already lists "14" among plain-text references to link (BUILD_PROGRESS decisions); the two lines above are those.
   - No reference page, template or project mentions Module 14. `lessons/module-13/` is being written in parallel and was not checked; Module 14 contains no link or mention of Module 13 files.
2. **Module 14's own plain-text forward references:** "Module 22" (full production-day rehearsal with the real exam timing) in 14.4 (How it works step 5 of the worked example, Practice intro) → link to the Module 22 lesson or project when it exists. Lesson 09.1 (tradition and freezing) is linked in the module quiz page.
3. **`templates/organigramme.md` (suggested edits, not made):** add a "You (hands)" column and optional "Proofing place / cold space" columns to the timeline; add checks "one setting for everything in the proofing cabinet (laminated dough below about 27 °C)", "oven heating and cooling times measured and written as lines", "small tasks (fold, egg wash, unload) may slip a few minutes, blocks (mixing, dividing, shaping, turns) may not overlap", and "crème pâtissière: time at 63 °C and at 10 °C on the plan (≤ 2 h)". Module 14 lessons already teach these in the text.
4. **Simulation:** plan.md section 11 proposes `simulations/production-schedule/` (place products on oven/mixer timelines and flag overlaps). If built, link it from 14.3 ("How it works", after the resource-lanes diagram) and 14.4 with a `Simulation:` line. Module 14's numbers (two-deck oven, 12 baguettes / 20 rolls / two 40 × 60 trays per deck, 60 min preheat, 25 min 180→250 °C, 40 min 250→180 °C; 5-tray fan oven, 20 min to 175 °C; 16-level cabinet) can serve as its presets.
5. **Consistency notes for BUILD_PROGRESS.md decisions:**
   - Module 14 oven conventions (Au Pain de la Halle): two-deck oven, independent thermostats, each deck 12 baguettes, 6 boules of 400 g, 20 rolls or two 40 × 60 trays; 60 min from cold (as 01.6); 5 min between loads; measured 250→180 °C about 40 min and 180→250 °C about 25 min (scenario figures, labelled as "the bakery's own records"); 5-tray fan oven 20 min to 175 °C; proofing cabinet 16 levels, one setting; fournil 22 °C; cold room 3 °C.
   - Cooling allowances used: bread 30 min before the shop (01.6, 07.5); home tradition 1 h (09.4); viennoiserie 20 min; pain au lait 30 min.
   - Second oven group slowed by proofing cooler: ΔT = ln(t2/t1) ÷ ln 1.07 (7 % rule, 04.2). Used in 14.1, 14.2, 14.3, the project and quizzes.
   - TR-01 retarded batch with 0.4 % yeast totals 187.2 % (project Part A).
   - Course batches computed in Module 14: 14.2 (PC-02 4,700 g flour for 24 × 350 g; CR-01 1,000 g for 32 croissants); 14.4 (TR-01 4,000 g; VI-01 1,300 g; CR-01 1,200 g / beurrage 600 g; CP-01 200 g milk; PL-01 700 g); project (PC-02 6,600 g; TR-01 retarded 3,300 g; CR-01 2,100 g / 1,050 g; PB-01 900 g).
6. **Statements without a page opened for them (trade practice or scenario data; please find an INBP/ANMF or CAP textbook page if possible):** a deck cools down more slowly than it heats up and loads are grouped hottest first; a home oven drops quickly with the door open and heats back slowly (learners are told to measure their own); shaping speeds (24 baguettes in about 20-25 min; 70 laminated pieces in about 45 min); blocking shaped pâte levée pieces (pains au lait, braids, navettes) overnight in a programmable cabinet (12.3 used pointage différé of the bulk dough; Module 14 extends pousse contrôlée to shaped pâte levée, standard practice but unsourced); a tradition détente of about 50 min for the last-divided group (14.4) is presented as acceptable on the cooler bench.
7. **Sources (all re-opened with WebFetch on 2026-10-09; none new to the course):** référentiel PDF (loads; content checked against `curriculum/research/raw/referentiel-cap-boulanger-2014.txt`: C1.2 conditions "une commande, les recettes, un organigramme de travail", C1.3 "enchaînement cohérent des tâches", S3.1.1, EP2 definition); EP1 2019 PDF (loads; content checked against the raw extract); France Compétences RNCP42115 (BC02 lists "Organiser son travail"); King Arthur "Dough temperature" pro reference (predictability of the production schedule); King Arthur "How to refrigerate bread dough to bake later" (8-12 h, up to about 16 h; chill bulk or final rise); Elle & Vire Professionnel croissants (1 h rests after turns, proof about 2 h 30 at 25 °C, deck 190-200 °C 15-17 min, fan 175 °C); INRS boulangerie risks (burns, falls, manual handling; it does not mention working hours or night work); Wikipedia Tel Aviv climate table (IMS data: July mean max 29.4 °C, August 30.2 °C, mean min 23.0-23.7 °C, RH 70 % / 67 %).
8. **Israel notes:** `### In Israel` in every lesson's Practice, "checked 2026-10-09": summer climate from the IMS table, early-morning starts, colder water and milk (05.2), retarding in the fridge, proofing laminated dough in an air-conditioned room at 24-26 °C, the oven's preheat heating the kitchen, fridge space as a planned resource (5 °C or below), and the one-tray home oven turned into a queue hottest first. Hebrew terms used: קמח לבן, חלב, חמאה (with references to 12.1/12.3 and `references/flour-in-israel.md` for products). No product brands named.
9. **New assets:** `assets/m14-backward-planning.svg` (14.1: TR-01 40-baguette organigramme built backwards, hands vs dough time) and `assets/m14-resource-conflicts.svg` (14.3: draft redrawn as resource lanes with five conflicts). Mermaid: gantt in 14.1 (one bread, two loads), gantt with full dates across midnight in 14.2 (Friday lamination and blocking, Saturday baguettes), decision flowchart in 14.2, gantt in 14.3 (corrected plan), flowchart and full-day gantt in 14.4.
10. **Glossary:** new terms in `curriculum/glossary-inbox/module-14.md`. Not repeated because already in `glossary.md`: organigramme, lot / fournée, commande, fiche technique, mise en place, pousse contrôlée / pousse avec blocage, pointage retardé (au froid), armoire de pousse contrôlée, capacité du pétrin, contrôle qualité, four à sole, non-conformité.
11. **Exam facts:** none repeated. Lessons link `references/cap-exam.md` for what the production test asks; 14.4's order is labelled a course practice order, not an exam subject, and its 6:00-14:45 practice day is the course's choice (the lesson says the real timing is in the exam reference and Module 22 rehearses it).
12. **`references/troubleshooting.md` (optional "Planning" rows):** "Second oven load over-proofed → both groups proofed at the same temperature; proof the waiting group about 3-4 °C cooler (14.1)"; "Dough ready, oven cold → preheat not on the plan (14.1)"; "Croissants leaking after a shared proof → cabinet set warmer for bread (14.3)"; "Laminated products late in a one-day order → détrempe not mixed first (14.4)".
