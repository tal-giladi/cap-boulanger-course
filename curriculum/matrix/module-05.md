# Competency matrix — Module 5: Temperature Management

Codes from `curriculum/competency-map.md`. "Requires physical practice" marks rows whose skill can only be built by doing it at home or in a bakery.

| Item | Competencies / savoirs | Note |
|---|---|---|
| 05.1 lesson | S3.1, S4.1, S4.2, C2.2, C4.4 | requires physical practice (kitchen temperature audit, oven test) |
| 05.1 q1 | S3.1, C1.3 | |
| 05.1 q2 | S4.2, C4.4 | |
| 05.1 q3 | S3.1, C2.2 | |
| 05.1 q4 | C2.2, S3.1 | |
| 05.1 q5 | S3.4, S4.1 | |
| 05.2 lesson | S3.1, C1.3 | requires physical practice (mix a dough to 24 °C ± 1 °C) |
| 05.2 q1 | C1.3, S3.1 | |
| 05.2 q2 | C1.3, S3.1 | |
| 05.2 q3 | S3.1 | |
| 05.2 q4 | C1.3, S3.1 | |
| 05.2 q5 | S3.1, S2.1 | |
| 05.3 lesson | S3.1, C1.3, C2.2 | requires physical practice (measure own friction factor; ice check) |
| 05.3 q1 | C1.3, S3.3 | |
| 05.3 q2 | C1.3, C2.2 | |
| 05.3 q3 | S3.1 | |
| 05.3 q4 | S3.1, C1.3 | |
| 05.3 q5 | S3.1, C1.2 | |
| 05.4 lesson | S3.1, S3.3, S3.4, C4.4 | requires physical practice (full temperature log of a bake) |
| 05.4 q1 | S3.3, C1.3 | |
| 05.4 q2 | S3.3, C4.4 | |
| 05.4 q3 | S3.1, C3.2 | |
| 05.4 q4 | S3.4 | |
| 05.4 q5 | S3.1, S3.3 | |
| Project m05-temperature-log | S3.1, S3.3, C1.2, C1.3, C2.2, C2.3, C3.2, C4.4 | requires physical practice |
| Module quiz q1 | C1.3, S3.1 | |
| Module quiz q2 | C1.3, C2.2 | |
| Module quiz q3 | S3.1, S3.3, C4.4 | |
| Module quiz q4 | C1.3, S3.3 | |
| Module quiz q5 | C1.3, S3.4 | |
| Module quiz q6 | S4.2, C4.4 | |
| Module quiz q7 | S3.1, C4.4 | |
| Module quiz q8 | S3.4 | |
| Module quiz q9 | C1.3, S3.3 | |
| Module quiz q10 | S3.3, C1.2 | |

## Requests for main session

1. **Convention used across Module 5 (please keep in Module 6 and later):** base = TPV × number of factors (3, or 4 with a pre-ferment); water = base − flour − room (− pre-ferment) − friction factor, where the friction factor is "degrees of mixing heat × number of factors" (hand kneading 1-3 °C ≈ 3-9; improved spiral about 4-7 °C ≈ 12-21; intensive 10 °C or more ≈ 30+, 3-factor values). A TB printed on a sheet or exam paper already has friction removed: water = TB − fournil − flour (EP1 2019 brioche: 48 − 44 = 4 °C). Ice = water × (tap − wanted) ÷ (tap + 80), ice counted inside the water weight. This matches `templates/temperature-log.md`; its "Friction (mixer heating)" line could say "friction factor (heating × number of factors)" to remove any doubt. Module 6 (being written in parallel) is referred to only in plain text; no links were added to it.
2. **Lesson 01.7 note (optional):** 05.2 and 05.3 explain that 01.7's "− 2" is a small hand friction factor and that measured hand kneading usually gives 3-9 (Sam's own 01.7 record gives 6.5). If you want 01.7 to match, its sentence "The 2 °C is a small allowance…" could add "(lesson 05.3 shows how to measure your own; 3-9 is usual by hand)". Not required: 05.2/05.3 already reconcile it.
3. **Simulation (optional, plan section 11):** `simulations/water-temperature/` would fit lesson 05.2/05.3 exactly: inputs TPV, flour, room, pre-ferment (on/off), friction factor or TB, tap temperature, water weight → water temperature, ice and tap weights, with the limits (below 1-2 °C, above 40 °C) flagged. If built, link it from 05.2 "How it works" with a `Simulation:` line.
4. **`references/troubleshooting.md` (optional rows):** "Dough far too warm in a pre-ferment dough → 3-factor friction factor used in a 4-factor calculation, or pre-ferment temperature not counted (lesson 05.3)"; "Dough far too soft after cooling the water with ice → ice added on top of the full water weight (lesson 05.3)"; "Pale bread, weak spring at the right bake time → oven below its dial; check with an oven thermometer (lesson 05.1)".
5. **New verified sources for `curriculum/research/sources.md`** (all opened with WebFetch on 2026-10-08): King Arthur Baking "Desired dough temperature" (https://www.kingarthurbaking.com/blog/2018/05/29/desired-dough-temperature), "Determining the friction factor in baking" (https://www.kingarthurbaking.com/blog/2018/08/27/determining-the-friction-factor-in-baking), "Identifying oven hot spots" (https://www.kingarthurbaking.com/blog/2018/05/15/how-to-identify-oven-hot-spots), "Hearth bread recipe" (https://www.kingarthurbaking.com/recipes/hearth-bread-recipe), "Laminated dough" (https://www.kingarthurbaking.com/blog/2014/07/29/flaky-buttery-fabulous), "Croissant sourdough bread" (https://www.kingarthurbaking.com/blog/2025/06/05/croissant-sourdough-bread); Swiss Bake ice formula (https://www.swissbake.in/blog/importance-of-regulating-the-dough-temp-during-baking); Hellopro water cooler (https://conseils.hellopro.fr/comment-fonctionne-un-refroidisseur-d-eau-pour-boulangerie-5701.html). Israel notes: Ministry of Health uniform specification 4.2c, 2026 (https://www.gov.il/BlobFolder/generalpage/uniform-spec-04-02c/he/04_2026_uniform-spec-04-02c-2026-clean.pdf: chilled food up to 5 °C, frozen -18 °C; read from the PDF text); Wikipedia Tel Aviv climate table from Israel Meteorological Service data (https://en.wikipedia.org/wiki/Tel_Aviv; the IMS site itself renders its tables by JavaScript and could not be read); Midrag plumbers' Q&A on warm cold-tap water in summer (https://www.midrag.co.il/Expanel/Question/1638). Re-verified: King Arthur pro "Dough temperature", référentiel PDF and EP1 2019 PDF (both load; text checked against `research/raw`). No source was found for a measured summer tap-water temperature in Israel, so the lessons tell the learner to measure it instead of giving a figure.
6. **Glossary:** new terms in `curriculum/glossary-inbox/module-05.md`. Not repeated because already in `glossary.md`: échauffement, TPV, température de pâte, chambre de pousse, chambre froide positive, hygrométrie, ressuage, pétrissage à vitesse lente / amélioré / intensifié, pétrin à spirale / à axe oblique.
7. **New assets:** `assets/m05-temperature-ladder.svg` (05.1), `assets/m05-base-temperature.svg` (05.2); mermaid diagrams in 05.3 (when the water cannot do it) and 05.4 (temperature checks stage by stage).
8. **Forward references (plain text, no links):** Module 6 (Baker's Mathematics), Modules 11-12 (viennoiserie temperatures, 05.4), Module 17 (hygiene, cold chain, 05.1).
