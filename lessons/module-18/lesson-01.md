---
id: "18.1"
module: 18
minutes: 14
practice_minutes: 240
prerequisites: ["13.4", "13.5", "14.3", "07.4", "02.4"]
objectives:
  - "C2.7 — Apply the company's energy and water directives at the workstation: preheat from the real time, bakes grouped hottest first, steam and cold only where needed, taps and leaks under control."
  - "S4.3 — Name the main energy uses of a bakery and calculate the energy and money saved by a change of practice with E = P × t."
  - "S4.3 — Propose solutions for a reasoned use of water in the fournil and measure a tap's flow and a leak."
  - "C1.2 — Plan a home bake day that uses one preheat and the oven's falling heat."
volatility: implementation
sources:
  - title: "Référentiel CAP Boulanger (annexes of the arrêté of 21 February 2014): C2.7 utilisation raisonnée et conforme des énergies, des fluides et des produits d'entretien, consignes de l'entreprise (fluides, énergies); S1.1.3 développement durable (gestion des matières premières, des déchets et des fluides); S4.3.2.4 eau, proposer des solutions pour une utilisation raisonnée de l'eau; S4.3.3.3 économie d'énergie"
    url: https://www.ecoledesmetiers.fr/sites/default/files/ressources-cadrage-officiel/fichiers/2019-06/R%C3%A9f%C3%A9rentiel_CAP_Boulanger.pdf
  - title: "CNBPF (boulangerie.org) — Guide d'optimisation de la gestion des fours à soles, December 2025 (5 m² deck empty 2 h a day about 12 kWh/day, over 3,300 kWh a year; 250 to 230 °C saves 10 %; steam up to 15 % of the energy of a bread bake, switch the steam off on viennoiserie decks; start with the hottest bakes and use the falling heat; switch unused decks off; off about 10 min before the end)"
    url: https://boulangerie.org/wp-content/uploads/Guide-doptimisation-de-la-gestion-des-fours-a-soles.pdf
  - title: "CNBPF (boulangerie.org) — Guide de sobriété énergétique en boulangerie-pâtisserie (2022): preheat test at 250 °C, over 30 % saved; door open over 5 min in 4 h +5 %; 1 mm of scale -10 % steam efficiency; -18 °C and +4 °C, each degree colder over 5 % more; slow proof about 35 % less energy than blocked proof; raw-frozen croissants 2.5 times the energy of direct; equipment in a 30 °C room about 40 % more; heating 19 °C max, 7 % per degree; hot water stored at 55 °C; flow limiters about 2.5 L/min on washbasins; shop doors closed when heating or air conditioning run"
    url: https://boulangerie.org/wp-content/uploads/Guide-sobriete-Web-PaP.pdf
  - title: "CNBPF (boulangerie.org) — Guide des bonnes pratiques RSE à destination des artisans boulangers-pâtissiers (2024): energy use of a bakery, heat production 65 %, cold 22 %, mechanical equipment 8 %, lighting 5 %; illuminated signs off 1:00-6:00 under the decree of 5 October 2022; measure water use, find leaks, aerators and mixer taps"
    url: https://boulangerie.org/wp-content/uploads/Guide_RSE_boulangerie-artisanale_web.pdf
  - title: "CCI (Vendée / Gers) — Fiche pratique développement durable: L'eau (2021): aerators 30-50 % savings, 6-8 L/min instead of 12; leak table (dripping tap 1.5 L/h = 15 m³ a year; running toilet 30 L/h = 250 m³ a year); read the meter at night when nothing runs"
    url: https://www.paysdelaloire.cci.fr/sites/default/files/files/fp-dd-eau.pdf
  - title: "King Arthur Baking — What to do with stale bread (croutons at 350 °F for 7-10 min; breadcrumbs dried at 300 °F for 5-15 min)"
    url: https://www.kingarthurbaking.com/blog/2022/06/17/what-to-do-with-stale-bread
last_verified: "2026-10-09"
---

# 18.1 · Energy and Water

A bakery turns electricity or gas into heat and cold all night, and water into dough, steam and clean equipment. This lesson shows where that energy and water go, which habits of the baker change the bill, and how to calculate a saving with the same E = P × t you used for rating plates. You then plan and run a home bake day on one preheat, using the oven's falling heat, and measure your own tap and meter.

## Why it matters

The référentiel asks every CAP candidate to follow the company's environmental directives (C2.7): a reasoned use of energy, fluids and cleaning products that conforms to the house instructions. It also asks you to identify sustainable-development actions in a bakery (S1.1) and to propose solutions for a reasoned use of water (S4.3); see [The CAP Boulanger Exam](../../references/cap-exam.md) for how these are assessed. In the shop the stakes are plain: baking is the largest energy use of a bakery, and a deck oven left running empty two hours a day wastes about 3,300 kWh a year (CNBPF). Most savings cost nothing; they come from the order of the bakes and the habits of the person at the oven, which is you.

## Key terms

| French | Say it | English meaning |
|---|---|---|
| démarche environnementale | *day-MARSH ahn-vee-ron-mahn-TAL* | the company's environmental approach and its written instructions |
| sobriété énergétique | *so-bree-ay-TAY ay-nair-zhay-TEEK* | energy sufficiency: using only the energy the job needs |
| fluides | *flü-EED* | the "fluids" of a building: water, electricity, gas, heating, compressed air |
| préchauffage / mise en route du four | *pray-sho-FAHZH* | preheating / switching the oven on |
| chaleur tombante | *sha-LUHR tom-BAHNT* | falling heat: the stored heat of an oven used for cooler bakes after it is turned down or off |
| consigne (de température) | *kohn-SEEN-yuh* | set point (of a thermostat) |
| compteur | *kohnt-UHR* | meter (electricity, gas, water) |
| mousseur / limiteur de débit | *moo-SUHR / lee-mee-TUHR duh day-BEE* | tap aerator / flow limiter |
| fuite | *FWEET* | leak |
| eau chaude sanitaire (ECS) | *oh SHOHD sa-nee-TAIR* | domestic hot water (sinks, hand basins, showers) |

## How it works

### Where a bakery's energy goes

The CNBPF's survey of craft bakeries splits energy use like this: **heat production 65 %** (mainly the ovens), **cold production 22 %** (cold rooms, retarders, freezers, water cooler), **mechanical equipment 8 %** (mixers, dividers, moulders), **lighting 5 %**. So the priority order of savings is oven, then cold, then motors and light. Every number in this lesson comes back to one formula from lesson [13.5](../module-13/lesson-05.md): $E = P \times t$, energy in kWh = power in kW × hours.

![Bar of a bakery's energy use (heat 65 %, cold 22 %, mechanical 8 %, lighting 5 %) above a bake-day timeline from 2:00 to 9:00 showing the levers: preheat started from the real preheat time, hottest bakes first, steam only on bread decks, decks switched off when free, oven off about 10 minutes before the end of the last bake, falling heat used for low-temperature products](../../assets/m18-bake-day-energy.svg)

### The oven: six levers

These are the CNBPF figures already met in lesson [13.4](../module-13/lesson-04.md), now as a working method.

| Lever | What you do | Figure (CNBPF) |
|---|---|---|
| Preheat from the real time | Start the oven so it reaches temperature just before the first load, using its measured preheat time and its starting temperature (a deck still warm from yesterday heats faster) | 5 m² deck running empty 2 h a day: about 12 kWh a day, over 3,300 kWh a year; a matched preheat saved over 30 % in a test at 250 °C |
| Lower temperature where the product allows | Bake at 230 °C rather than 250 °C when the product's colour and bake still come out right (lesson [07.5](../module-07/lesson-05.md)) | about 10 % less consumption |
| Steam only where needed | Steam for bread at loading (lesson [07.4](../module-07/lesson-04.md)); steam generator off on decks baking viennoiserie; generator descaled | steam up to 15 % of a bread bake's energy; 1 mm of scale costs about 10 % of the generator's efficiency |
| Hottest first, then down | Group the bakes and order them from the highest temperature to the lowest, so cooler products use stored heat (the same rule as the oven lane of lesson [14.3](../module-14/lesson-03.md)) | the cooler the oven at the end, the larger the saving |
| Doors shut, decks off | Watch through clean door glass; switch unused decks and their lights off; oven off about 10 minutes before the end of the last bake | a door open over 5 min in 4 h at 250 °C: about +5 % for that deck |
| Thaw before baking | Frozen products thawed (by the hygiene rules) before they go in | the oven otherwise spends energy melting ice |

### Cold: the expensive kilowatt-hours

Producing cold takes three to four times more energy than producing the same amount of heat with an electric resistance, says the CNBPF sobriety guide. Its rules:

- **Right set points:** about −18 °C for freezers and +4 °C for positive cold. Setting 1 °C colder than needed adds **more than 5 %**.
- **Cool before you chill:** freezing products straight from the oven costs about 40 % more than freezing them once at room temperature (the fast cooling of cooked foods is a hygiene matter: [Module 17](../module-17/lesson-08.md)).
- **Doors:** group what goes in and out; 20 openings instead of 10 add about 6 % a day. Check the door seals (a sheet of paper that slides out easily means a worn seal).
- **Position:** a cold unit in a 30 °C room uses about 40 % more than in an 18 °C room; keep it away from the oven (lesson [13.3](../module-13/lesson-03.md)) and its condenser clean.
- **Method:** cold proofing has an energy price. In the CNBPF comparison, slow proofing (pousse lente) used about 35 % less energy than blocked proofing (pousse bloquée), and direct work less again; raw-frozen croissants used 2.5 times the energy of croissants made direct. Retarding is still often the right choice for the organisation and the quality (lesson [04.6](../module-04/lesson-06.md)); the point is to choose it, not to default to it.

### Heating, light and the shop

Many fournils need no heating once the oven is on. Where there is heating: 19 °C at most (about 7 % saved per degree lower) and 2 °C lower when the premises are empty; air conditioning in the shop not set below 26 °C; **shop doors kept closed while heating or air conditioning run**. Light: LEDs, presence detectors in stores and cold rooms, and illuminated signs off between 1:00 and 6:00, as the decree of 5 October 2022 requires (CNBPF).

### Water: an ingredient, a utility, a cost

Water in a bakery is weighed into the dough (lesson [02.4](../module-02/lesson-04.md)), cooled or iced to hit the dough temperature, turned into steam, and used to wash hands, tools, floors and the plonge. The dough water is never "saved": it is weighed to the gram. The rest can be:

| Use | Reasoned practice | Figure |
|---|---|---|
| Taps at the plonge and hand basins | aerators or flow limiters; tap closed while scraping or soaping | an aerator brings a 12 L/min tap to 6-8 L/min, 30-50 % less (CCI); CNBPF targets about 2.5 L/min at hand basins |
| Leaks | find and fix them; read the meter at night when nothing runs | a dripping tap about 1.5 L/h, 15 m³ a year; a running toilet about 30 L/h, 250 m³ a year (CCI) |
| Cleaning | scrape and vacuum dry first, then wash (lesson [13.6](../module-13/lesson-06.md)); wash in a filled sink, not under a running tap; dishwasher full, eco cycle | — |
| Hot water | stored at about 55 °C (CNBPF), pipes insulated | — |
| Hard water | descale the steam generator and kettle; scale costs energy as well as water quality | 1 mm of scale: about −10 % steam efficiency |

Never pour dough, flour paste, fat or oil down the drain: it sets in the pipes. What happens to waste water and solid waste beyond the sink is the subject of lesson [18.2](lesson-02.md).

> [!NOTE]
> A saving is never taken from food safety. Cold rooms stay cold enough, hot water stays hot enough for cleaning, and cooked products are cooled by the hygiene rules ([Module 17](../module-17/lesson-08.md)). Energy rules decide how, not whether.

## Worked example

Boulangerie du Marché, Tuesday. Three-deck electric oven of 5 m² per deck, a cold room, a plonge. The owner asks the apprentice to draw up an energy and water plan. Electricity price used by the CNBPF in its own example: 0.20 € per kWh.

1. **Preheat.** The oven is switched on at 2:00; the first load is at 5:30; its card (lesson [13.4](../module-13/lesson-04.md)) says a real preheat of 1 h 30. So it runs empty about 2 hours. CNBPF figure: about 12 kWh a day. Over a year: about 3,300 kWh × 0.20 € = **about 660 €**. Decision: programme the start for 4:00.
2. **Order of the bakes.** Today: baguettes 250 °C with steam, campagne loaves, pains au lait 180 °C, croissants in the convection oven. The campagne loaves are tested at 230 °C instead of 250 °C: colour and bake still meet the quality rubric, so they move to 230 °C (about 10 % less for that deck). Order: baguettes, then campagne, then the pains au lait on the falling heat of the deck that has finished; steam generator off on that deck.
3. **Decks.** The third deck is used only for one small load at 9:00. The load is moved to follow the campagne at 6:30 and the third deck is switched off after 7:00.
4. **Cold.** The cold room display reads 0 °C; its set point is −1 °C. The house sheet asks for 0-4 °C. Set to +3 °C: four degrees warmer, more than 5 % saved per degree. Seal checked with a sheet of paper: it grips. Condenser grille: dusty; reported to the owner for the technician.
5. **Water.** The plonge tap gives 1 L in 5 seconds: 12 L/min. It runs about an hour a day while trays are rinsed: about 720 L. With an aerator at 6-8 L/min the same hour uses 360-480 L: 240-360 L a day saved. The hand-basin tap drips: about 1.5 L/h, 15 m³ a year. Both go on the owner's list; the apprentice switches to rinsing in a filled sink today.
6. **Report.** One line per action on the non-conformity and improvement sheet: what, figure, who decides. The apprentice changes the order and set points the house sheet allows him to change; the oven programme and the plumbing are the owner's decisions (C4.4).

## Practice

You plan and run a home bake day on one preheat, estimate its energy and cost, and measure your kitchen's water.

> [!WARNING]
> The oven reaches 230-250 °C and the steam tray is hot: dry oven gloves on both hands, face turned away when you open the door after steaming, and a preheated metal tray only (never cold water on a hot glass dish). Cut stale bread on a board with the knife moving away from your hand.

### You need

- Your oven card (lesson [13.4](../module-13/lesson-04.md)) with its real preheat time and your safety card with its rating plate (lesson [13.5](../module-13/lesson-05.md)); your last electricity bill (price per kWh); oven thermometer; timer.
- A 1 L measuring jug, your water meter's location, a notebook or the [bake log](../../templates/bake-log.md).
- Professional equivalent: the oven's programmable preheat and per-deck switches, the energy and water readings in the bakery's monthly log, the house energy sheet.

### Ingredients

| Item | Quantity | Why |
|---|---|---|
| Your planned bread (any formula from Modules 8-10, e.g. PD-01, 500 g-1 kg flour) | as in its sheet | the main bake, at the highest temperature |
| Stale bread | about 200 g | croutons and crumbs on the falling heat |
| Oil or melted butter | about 15 g | croutons |
| Salt | about 1-2 g | croutons |

### In Israel

Checked 2026-10-09.

- **Price per kWh:** read it on your own electricity bill (*cheshbon chashmal*, חשבון חשמל), in agorot per kWh, and use that figure rather than any national average; tariffs change during the year. If your supplier offers cheaper hours in your plan, note them: a bake day planned inside them is a real-world version of the CNBPF advice to bake in the cheaper periods.
- **Summer kitchens:** a 230 °C oven in a 30 °C kitchen also makes the air conditioning work harder. Bake early in the morning, back to back, and keep the kitchen door shut while the air conditioner (*mazgan*, מזגן) runs, the home version of the closed shop door.
- **Water:** find your water meter (*mad mayim*, מד מים), usually in a box by the building entrance or the stairwell. Aerators are sold as *chaskam mayim* (חסכם מים) in hardware shops. Hard water is common in Israel: descale your steam tray and kettle when deposits show (lesson [02.4](../module-02/lesson-04.md)).
- **Flour and dough water:** see [Flour in Israel](../../references/flour-in-israel.md); dough water stays weighed to the gram.

### Steps

1. **Plan the day on paper.** List your bakes with temperatures and times, hottest first: bread at 230-250 °C with steam; then, oven turned down, croutons at about 175 °C (7-10 min) and breadcrumbs drying at about 150 °C (5-15 min), as King Arthur Baking gives them. Mark where the oven can be turned off early.
2. **Set the preheat from your card,** not from habit: switch on your real preheat time (plus 10 minutes with a stone or tray) before the bread goes in. Write the switch-on time.
3. **Bake the bread** with your usual steam method. Steam only for the bread; none for the croutons.
4. **Use the falling heat.** After the bread, turn the oven down to about 175 °C and bake the croutons (stale bread cubed about 1.5 cm, tossed with the oil and salt); then switch the oven off and dry the crumbs in the residual heat, checking every 5 minutes with the oven thermometer.
5. **Record:** switch-on and switch-off times, total oven-on minutes, the plate power (kW). Estimate the energy: $E = P \times t$ gives a maximum, since the thermostat cycles; a practical estimate is about half to two thirds of it once the oven is hot (or read the electricity meter before and after if you can). Multiply by your price per kWh.
6. **Compare** with your usual day: same products baked on separate days, each with its own preheat. How much oven-on time did you save?
7. **Water.** Time how long your kitchen tap takes to fill the 1 L jug at full flow: flow (L/min) = 60 ÷ seconds. Wash up the bake-day equipment once in a filled basin and once under a running tap (another day), and note the litres each time (jug counts or the meter).
8. **Leak check.** Last thing at night, with every tap and appliance off, note the meter reading; read it again in the morning before any water is used.

### Targets

- One preheat for the whole day, started from your measured preheat time; at least one product baked on falling heat; oven off before the last product is done.
- Oven-on time and estimated kWh and cost written down, with the saving against separate bakes.
- Tap flow in L/min, litres for basin vs running-tap washing, overnight meter difference recorded.

### How you know it worked

The bread meets its usual targets (the bake log shows the same oven temperature at loading as on a normal day), the croutons are golden and crisp, the crumbs are dry and snap, and the oven was on for one block of time instead of two or three. For example, an oven plate of 3.5 kW switched on for 1 h 50 min gives at most 3.5 × 1.83 ≈ 6.4 kWh; two separate bake days of 1 h 30 each would have been up to 10.5 kWh. If the overnight meter moved, you have a leak to find.

### Self-check

- [ ] I can give the energy split of a bakery and the oven, cold and water figures behind each saving.
- [ ] I plan bakes hottest first, preheat from the real time and switch off early to use the falling heat.
- [ ] I can calculate a saving in kWh and euros with E = P × t and a price per kWh.
- [ ] I can measure a tap's flow and test for a leak with the meter.

## What goes wrong

| Symptom | Likely cause | Fix now | Prevent next time |
|---|---|---|---|
| Oven hot for hours before the first load | Switch-on time set by habit, not by the real preheat | Note the empty-running time and its kWh | Preheat from the oven card; programmed start |
| Pale first load after "saving" on the preheat | Preheat cut below the real time | Bake longer for colour | Measure the real preheat with a thermometer; never cut below it |
| Viennoiserie deck still steaming | Generator left on for all decks | Switch it off on that deck | Steam on bread decks only, written on the oven plan |
| Cold room colder than the house sheet asks | Set point lowered "to be safe" | Reset to the house value; check with a probe | Set points on the sheet; more than 5 % per degree colder |
| Water bill rises with no change in production | A leak (tap, toilet, steam generator feed) | Read the meter overnight; find and report | Monthly meter reading in the log; aerators; repair drips at once |

## Review

- Energy in a bakery: heat 65 %, cold 22 %, motors 8 %, light 5 % (CNBPF); the oven and the cold are where habits pay.
- Oven: preheat from the real time (12 kWh a day on a 5 m² deck running empty 2 hours), 230 rather than 250 °C where the product allows (−10 %), steam only for bread (up to 15 % of the bake), hottest first and falling heat, decks off, doors shut.
- Cold: right set points (−18 °C, +4 °C; over 5 % per degree colder), cool before chilling, few door openings, clean condensers, cold proofing chosen, not defaulted.
- Water: dough water weighed exactly; aerators, filled sinks, dry cleaning first and leaks found with the meter.
- Exam-relevant (C2.7 environmental directives, S4.3 energy and water): see [the CAP exam reference](../../references/cap-exam.md).
