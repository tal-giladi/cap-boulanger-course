# Project: A Week of Doughs on Target

This project brings module 5 together. You first audit a bakery's week of temperature records during a heat wave, find the three days where something went wrong and why, then you run your own "week" at home: three bakes on three different days, each with a full temperature log, each aimed at a dough within ±1 °C of its target. You finish with a personal temperature card for your kitchen, the document a baker keeps so that every calculation starts from real numbers.

## Brief

You are the ouvrier boulanger at Boulangerie du Marché. On Saturday the owner leaves you this note with the week's temperature records:

> **Note de la patronne — canicule**
>
> Semaine de chaleur, et trois jours avec des problèmes. Les relevés sont ci-dessous (PC-02, 5,400 g de farine, eau 64 % = 3,456 g, pâte fermentée 15 %, TPV 24 °C, facteur de friction de référence 27 en 4 facteurs).
> Pour chaque jour : l'eau qu'il fallait, la glace s'il en fallait, et ce qui s'est passé quand ça n'a pas marché.
> Ensuite, fais la même chose chez toi sur trois jours et fais-moi une fiche « températures » de ta cuisine.

In English: a heat-wave week with three problem days. For each day: the water that was needed, the ice if any, and what happened when it did not work. Then do the same at home over three days, and make a "temperatures" card for your kitchen.

### The week's records

| Day | Flour | Fournil | Pâte fermentée | Tap | Water used | Dough after mixing | Note |
|---|---|---|---|---|---|---|---|
| Monday | 21 °C | 24 °C | 6 °C | 24 °C | 18 °C | 24.2 °C | — |
| Tuesday | 22 °C | 25 °C | 6 °C | 25 °C | 16 °C | 24.4 °C | — |
| Wednesday | 23 °C | 26 °C | 7 °C | 25 °C | 25 °C (tap) | 27.0 °C | apprentice used friction factor 15 from the old direct-dough card |
| Thursday | 23 °C | 27 °C | 6 °C | 26 °C | 13 °C (424 g ice) | 24.3 °C | cabinet display 25 °C; baguettes over-proofed at the planned time |
| Friday | 24 °C | 28 °C | 6 °C | 27 °C | 517 g ice + 3,456 g tap | 24.0 °C | dough very soft, stuck to the divider |

<details><summary>Reference answers (open after you have written yours)</summary>

Water = 4 × 24 − flour − fournil − pâte fermentée − 27.

1. **Monday:** 96 − 21 − 24 − 6 − 27 = 18 °C. Correct; dough on target.
2. **Tuesday:** 96 − 22 − 25 − 6 − 27 = 16 °C. Ice for 16 °C from 25 °C tap: 3,456 × 9 ÷ 105 ≈ 296 g. Correct.
3. **Wednesday:** should have been 96 − 23 − 26 − 7 − 27 = 13 °C (ice ≈ 3,456 × 12 ÷ 105 ≈ 395 g). With a 3-factor friction factor of 15 from another product, the calculation gave 25 °C, so tap water went in and the dough came out 3 °C warm (the 4-factor formula predicts (23 + 26 + 7 + 25 + 27) ÷ 4 = 27 °C). At the time: pointage about 45 ÷ 1.23 ≈ 37 min, cooler place, divide by the signs. Prevention: one friction factor per product and convention, written on the PC-02 sheet.
4. **Thursday:** water 13 °C and ice 3,456 × 13 ÷ 106 ≈ 424 g: correct, and the dough was on target. The over-proofing came from the cabinet: a display of 25 °C does not prove 25 °C. At the time: poke-test from the early end, bake as soon as ready. Prevention: check the cabinet with a probe in a glass of water; report the display fault.
5. **Friday:** water should be 96 − 24 − 28 − 6 − 27 = 11 °C, ice 3,456 × 16 ÷ 107 ≈ 517 g, **and 2,939 g of tap water**. The ice was added on top of the full 3,456 g, so the dough had 3,973 g of water: about 74 % hydration instead of 64 %. Temperature was fine; the dough was far too soft. Prevention: the ice is part of the water weight.

</details>

## You need

- Scale (1 g, ideally 0.1 g), checked probe thermometer, oven thermometer, bowls, scraper, lidded containers, kettle, ice and a bottle of water in the fridge, baking paper, trays, a metal steam tray, oven gloves, lame, wire rack, calculator.
- Templates: [temperature log](../templates/temperature-log.md) (one per bake), [bake log](../templates/bake-log.md), [production sheet](../templates/production-sheet.md), [quality rubric](../templates/quality-rubric.md), [non-conformity report](../templates/non-conformity-report.md).
- Your lesson [05.1](../lessons/module-05/lesson-01.md) audit and your friction factor from lesson 05.3.
- Time: about 45 minutes for Part A; three bakes of about 4 hours each (mostly waiting) on three different days, one with an overnight retard; about 45 minutes for Part C.
- In Israel: flour as in [Flour in Israel](../references/flour-in-israel.md); in summer plan at least one bake in the warmest part of the day with fridge water or ice, and keep the fridge at 5 °C or below for the retarded dough.

> [!WARNING]
> You bake at 240 °C with steam on three days. Use dry oven gloves; steam only into a preheated metal tray (never a glass dish), pour and stand back. Score with the blade moving away from your fingers. Never use water above 40 °C on yeast, and never use the hot tap for dough water.

## Steps

### Part A — audit the bakery's week (about 45 minutes)

1. For each day, calculate the water and, when it is below the tap, the ice and tap water weights. Use lessons [05.2](../lessons/module-05/lesson-02.md) and [05.3](../lessons/module-05/lesson-03.md).
2. Compare with the "water used" and the dough temperature. For each problem day, write four lines: **what you see → cause (with the evidence) → what to do at the time → prevention**.
3. Fill in one non-conformity report for the worst day as if you were sending it to the owner.
4. Only then open the reference answers and mark your own.

### Part B — three bakes on target (three different days)

5. **Plan.** Choose three bakes from PD-01 (lesson [01.7](../lessons/module-01/lesson-07.md)) or the bâtards of lesson [04.3](../lessons/module-04/lesson-03.md):
   - **Bake 1:** at the coolest time of day, TPV 24 °C.
   - **Bake 2:** at the warmest time of day (or in your warmest room), TPV 24 °C, with fridge water or ice as needed.
   - **Bake 3:** an overnight pointage retardé in the fridge (lesson [04.6](../lessons/module-04/lesson-06.md)), TPV 21-22 °C, fresh yeast 0.6 %.
6. **Before each mix**, fill the calculation part of the temperature log: target, base, flour, room, friction factor, water; ice and tap weights if needed.
7. **Mix and measure.** Record the dough temperature. If it is off by more than 1 °C, adapt pointage with the 7 % rule and write the reason. Update your friction factor after each bake.
8. **Follow the temperature through the process** as in lesson [05.4](../lessons/module-05/lesson-04.md): end of pointage, after shaping, apprêt place, oven thermometer at loading, core of the bread, after cooling. For bake 3 add the fridge temperature and the dough temperature when it comes out.
9. **Evaluate** each bread with the quality rubric after full cooling.

### Part C — your kitchen temperature card (about 45 minutes)

10. Write a one-page card with: your thermometer's offset; flour, room and tap water by time of day (and by season if you have the data); fridge middle shelf; your oven's real preheat time to 240 °C and its dial error; your hand friction factor (and stand mixer, if any) with the kneading time; your best proofing places for summer and winter with their temperatures.
11. From your friction factor, write the **TB of your kitchen** for PD-01 by hand at TPV 24 °C (TB = 3 × 24 − friction factor) and the quick water rule it gives: water = TB − flour − room.
12. Write a corrected production sheet for one of your three bakes, with the water temperature or ice line you would now use.

## Deliverables

- Part A: five water calculations, three four-line diagnoses, one non-conformity report, marked against the reference.
- Part B: three complete temperature logs and three bake logs.
- A results table:

| | Bake 1 (cool) | Bake 2 (warm) | Bake 3 (retarded) |
|---|---|---|---|
| Date and time of mixing | | | |
| Flour / room / water (°C) | | | |
| Ice and tap water (g), if used | | | |
| Friction factor used / measured | | | |
| Target / actual dough temperature (°C) | | | |
| Pointage time (and rule-of-thumb adjustment) | | | |
| Apprêt place temperature and time | | | |
| Oven thermometer at loading (°C) | | | |
| Core at the end of baking (°C) | | | |
| Quality rubric score | | | |

- Part C: the kitchen temperature card and one corrected production sheet.

## Self-evaluation rubric

| Criterion | Meets standard | Needs work |
|---|---|---|
| Bakery audit (Part A) | All five waters and the ice weights correct; the three problem days explained from the evidence (convention, cabinet, ice weight) with an action and a prevention | Calculations wrong, or causes guessed from the symptom only |
| Calculations at home | Every log shows the full calculation before mixing; ice and tap weights add up to the formula's water | Water chosen by feel or calculated after the fact |
| Hitting the target | At least two of three doughs within ±1 °C of their target; any miss explained and corrected | Misses not explained, or targets changed to fit the result |
| Temperature through the process | Eight or more timed readings per bake, including oven and core | Only the dough temperature recorded |
| Adapting to readings | Pointage or apprêt adapted with the 7 % rule and confirmed by the dough's signs | Times followed blindly, or changed without a reason written |
| Temperature card | Card complete, with offset, friction factor, oven error and the kitchen's TB | Card missing items or using book values instead of your measurements |
| Safety and hygiene | Oven, steam and lame used safely; dough covered; fridge at 5 °C or below for the retarded dough | Unsafe steam method or uncontrolled fridge |

Remember: the Academy cannot grade your bread. Compare your results honestly with these criteria and the [quality rubric](../templates/quality-rubric.md); self-assessment helps you learn but does not replace the official practical exam.

## Links back

- [05.1 · Temperatures That Matter in a Bakery](../lessons/module-05/lesson-01.md)
- [05.2 · The Base Temperature Method](../lessons/module-05/lesson-02.md)
- [05.3 · Friction, Pre-ferments and Ice](../lessons/module-05/lesson-03.md)
- [05.4 · Temperature Through the Whole Process](../lessons/module-05/lesson-04.md)
- [03.4 · Oxidation, Dough Temperature and Mixing](../lessons/module-03/lesson-04.md) and [04.2 · Pointage: Bulk Fermentation](../lessons/module-04/lesson-02.md)
- [Base formulas](../references/formulas.md) and [troubleshooting](../references/troubleshooting.md)
