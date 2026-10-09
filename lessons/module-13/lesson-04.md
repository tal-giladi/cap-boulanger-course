---
id: "13.4"
module: 13
minutes: 14
practice_minutes: 120
prerequisites: ["07.4", "07.5", "08.4", "05.4"]
objectives:
  - "S4.3 — Explain conduction, convection and radiation in a bakery oven and which one dominates in a deck, convection and rack oven."
  - "S3.1 — Use an oven's characteristics to choose deck, temperature and loading, and diagnose a burnt base or uneven colour."
  - "S4.3 — Apply the energy-saving rules for deck ovens: preheating, temperature, steam, doors, grouped bakes."
  - "C2.5 — Map your home oven's hot spots and real temperature, and load and unload it without burns."
volatility: implementation
sources:
  - title: "Référentiel CAP Boulanger (annexes of the arrêté of 21 February 2014): S3.1.6 les fours (à soles, ventilés, à chariot); S4.3.3.3 production de chaleur pour la cuisson (effet Joule, brûleur, conduction, convection, rayonnement, économie d'énergie)"
    url: https://www.ecoledesmetiers.fr/sites/default/files/ressources-cadrage-officiel/fichiers/2019-06/R%C3%A9f%C3%A9rentiel_CAP_Boulanger.pdf
  - title: "American Society of Baking — Oven heat flux (radiation from elements and walls, rising with the fourth power of absolute temperature; forced and natural convection; conduction through the hearth or pan)"
    url: https://asbe.org/article/oven-heat-flux/
  - title: "CNBPF (boulangerie.org) — Guide d'optimisation de la gestion des fours à soles, December 2025 (baking up to 65 % of a bakery's energy; 5 m² deck empty 2 h a day about 12 kWh/day, over 3,300 kWh a year; adapted preheating saves over 30 %; 250 to 230 °C saves 10 %; steam up to 15 % of baking energy; 1 mm of scale -10 % steam efficiency; door open over 5 min in 4 h at 250 °C +5 %; switch off unused decks; switch off about 10 min before the end of baking)"
    url: https://boulangerie.org/wp-content/uploads/Guide-doptimisation-de-la-gestion-des-fours-a-soles.pdf
  - title: "King Arthur Baking — Identifying oven hot spots (toast test at 350 °F on the usual racks; darkest slices mark the hottest zones; check the real temperature with an oven thermometer)"
    url: https://www.kingarthurbaking.com/blog/2018/05/15/how-to-identify-oven-hot-spots
  - title: "King Arthur Baking — Baking trials: will a baking stone fix my oven's hot spots? (helped in two of three home ovens; preheat about 50 % longer, full effect after about 60 minutes)"
    url: https://www.kingarthurbaking.com/blog/2026/01/21/fix-oven-hot-spots
  - title: "King Arthur Baking — Convection oven baking (the fan circulates hot air evenly; about 25 °F lower for most bakes)"
    url: https://www.kingarthurbaking.com/blog/2025/03/19/convection-oven-baking
  - title: "INRS ED 4473 — TutoPrév' accueil, métiers de bouche (burns: double-wall ovens, a clear dedicated area for loading and unloading, heat-resistant gloves and forearm protection)"
    url: https://inrs.fr/dam/inrs/CataloguePapier/ED/TI-ED-4473.pdf
last_verified: "2026-10-09"
---

# 13.4 · Ovens and Heat Transfer

Two ovens set to the same 230 °C can give two different breads, because what matters is how the heat reaches the dough: through the floor, from the hot walls, or in moving air. This lesson explains the three ways heat travels, how deck, convection and rack ovens use them, how bakeries cut the oven's energy bill, and how to read your own oven. You map your home oven's hot spots and real temperature.

## Why it matters

Lesson [07.5](../module-07/lesson-05.md) compared oven types by their advantages and drawbacks; this lesson explains *why* they behave as they do, which is what the référentiel's applied-science part asks (S4.3: Joule effect, burner, conduction, convection, radiation, energy saving) alongside choosing temperatures and diagnosing a burnt base or a dull crust (S3.1; see [The CAP Boulanger Exam](../../references/cap-exam.md)). The oven is also the biggest energy user in a bakery: the French bakers' confederation puts baking at up to 65 % of a bakery's energy. And it is where most burns happen.

## Key terms

| French | Say it | English meaning |
|---|---|---|
| conduction | *kohn-dük-SYOHN* | heat passing through contact: sole to the base of the loaf |
| convection | *kohn-vek-SYOHN* | heat carried by moving air; forced when a fan blows it |
| rayonnement | *ray-yon-MAHN* | radiation: heat sent by hot surfaces (crown, walls, elements) |
| sole | *SOLL* | the oven floor the bread is baked on |
| voûte | *VOOT* | the crown (ceiling) of a deck |
| inertie thermique | *ee-nair-SEE tair-MEEK* | thermal mass: heat stored in the oven's mass, slow to change |
| générateur de buée | *zhay-nay-rah-TUHR duh bü-AY* | steam generator of a deck oven |
| effet Joule | *eh-FAY ZHOOL* | Joule effect: an electric current heats the resistance it flows through |
| brûleur | *brü-LUHR* | burner of a gas or fuel-oil oven |

## How it works

### Three ways heat travels

![One deck of a deck oven, where the loaf takes heat by conduction from the hot sole, by radiation from the crown and walls, and a little by natural convection, with steam at loading; and a convection oven, where a fan blows hot air across trays so most heat arrives by forced convection](../../assets/m13-oven-heat-transfer.svg)

- **Conduction:** heat passes by contact, from the hot sole or tray into the base of the loaf. It gives the base its colour and drives oven spring from below. Too hot a sole for the voûte, and the base burns before the top is coloured: **pain ferré** (lesson [07.5](../module-07/lesson-05.md)). Other crust and colour faults are diagnosed in lesson [16.3](../module-16/lesson-03.md).
- **Radiation:** every hot surface sends heat as infrared radiation to colder surfaces facing it: the crown, the walls and the elements to the crust. Radiation grows very steeply with temperature (with the fourth power of the absolute temperature, ASBE): a deck that is a little hotter browns noticeably faster.
- **Convection:** moving air carries heat. Still air in a deck carries little; a fan (forced convection) carries much more, so a convection oven bakes faster **at the same setting** and dries the surface. That is why it is set about 15-20 °C lower than a still oven (King Arthur gives 25 °F, about 14 °C, for home ovens) and why it suits viennoiserie better than crusty bread.

Inside the dough, heat travels by conduction from the surface to the core, slowed by the water that must evaporate; the core cannot pass 100 °C while water remains (lesson [07.5](../module-07/lesson-05.md)).

### Where the heat comes from

- **Electric ovens: the Joule effect.** A current through a resistance heats it (P = U × I, lesson [13.5](lesson-05.md)). Electric deck ovens have resistances under the sole and in the voûte, often with a power distributor that alternates them so the bakery's subscribed power stays lower (CNBPF).
- **Gas or fuel-oil ovens: combustion.** A burner heats the decks indirectly; the fumes leave by a flue. Combustion needs air and a flue in good order (lesson [13.5](lesson-05.md)).
- **Wood-fired ovens:** heat stored in the masonry from a fire (lesson [07.5](../module-07/lesson-05.md)).

### What each oven is built for

| Oven | Main heat | Thermal mass | Consequence |
|---|---|---|---|
| Deck (four à sole) | conduction from the sole + radiation from the voûte | high | strong oven spring and crust on the sole; slow to heat and to change: products are planned hottest to coolest, or each deck at its own temperature |
| Convection (four ventilé) | forced convection | low | fast to heat, even on several trays; dries crust; viennoiserie, pain de mie in tins |
| Rack (four à chariot) | forced convection, the rack turns | low to medium | a whole rack in one load; large output; bread baked on trays or nets |
| Wood-fired | radiation and conduction from stored heat | very high | traditional; uneven, needs experience |

Steam belongs with the deck: the steam generator injects steam at loading (lesson [07.4](../module-07/lesson-04.md)); the **ouras** let it out at the end. Its water leaves scale: 1 mm of limescale costs about 10 % of the generator's efficiency, 10 mm about 50 % (CNBPF), so it is descaled as the maker says (water hardness: lesson [02.4](../module-02/lesson-04.md)).

### Energy: the oven bill

The CNBPF guide for deck ovens (December 2025) gives figures every baker can act on:

| Habit | Effect |
|---|---|
| A 5 m² deck left running empty 2 hours a day | about 12 kWh a day, over 3,300 kWh a year wasted |
| Preheating programmed from the real start of baking and the oven's starting temperature | over 30 % saved on preheating |
| Baking at 230 °C instead of 250 °C (where the product allows) | about 10 % less consumption |
| Steam only where needed (none for viennoiserie decks) | steam can be up to 15 % of the energy of a bread bake |
| A door left open more than 5 minutes over 4 hours at 250 °C | about +5 % for that deck |
| Bakes grouped, unused decks switched off, oven off about 10 minutes before the end of the last bake | uses the stored heat |

Ovens are also kept away from refrigeration equipment (lesson [13.3](lesson-03.md)). The whole bakery's energy and water use, ovens included, is the subject of lesson [18.1](../module-18/lesson-01.md).

### Burns

> [!WARNING]
> Decks, trays, peels and racks are at 200-250 °C, and steam scalds. Wear dry heat-resistant gloves that cover the forearms, keep the loading area clear and out of the traffic of the fournil, announce "hot" when you move a tray, stand to the side when you open a steamed deck, and put hot trays only on a surface cleared for them (INRS ED 4473).

## Worked example

Monday, three-deck electric oven, Boulangerie du Marché. The baker starts preheating all three decks at 2:00 for a first load at 5:30, and has burnt bases on the bottom deck.

1. **The burnt bases.** Bottom deck display 250 °C. A test with the oven thermometer on the sole reads 262 °C at the back, 248 °C at the front; the baguettes at the back have black bases and pale tops. Diagnosis: sole too hot for the voûte, worst at the back. Fix now: lower the bottom deck's sole power (or set point) and load the back with a slower product; turn nothing round in a deck (no space). Next time: record each deck's real temperatures and hot zones on a card on the oven.
2. **The preheat.** The oven is at temperature by about 3:30 and runs empty for 2 hours. On a 5 m² oven the CNBPF figure is about 12 kWh a day, over 3,300 kWh a year. At 0.16-0.21 € per kWh (CNBPF's indicative prices) that is about **530-690 € a year**. Decision: programme the preheat to start at 4:00.
3. **Steam.** The top deck bakes croissants from 6:30; its steam generator was left on. Switch it off for that deck.
4. **Grouping.** The rolls planned for 9:00 on a reheated deck are moved to follow the baguettes at 6:00, so the third deck is switched off after the first load.

## Practice

You map where your home oven is hot, measure its real temperature against the display, and time its true preheat.

> [!WARNING]
> The oven reaches 230 °C. Use dry oven gloves on both hands, pull racks out only halfway, and keep children and pets away. Never place the oven thermometer or a tray on the open door's glass.

### You need

- Minimum: an oven thermometer (lesson [01.4](../module-01/lesson-04.md)), oven gloves, timer, a large baking tray or the oven's rack, a phone or paper for a map, a pencil.
- Optional: a baking stone or steel to repeat the test.
- Professional equivalent: a deck oven's probe and temperature record per deck; a thermometer on the sole.

### Ingredients

| Item | Quantity | Why |
|---|---|---|
| Cheap white sliced bread | 9-12 slices (a 3 × 3 or 3 × 4 grid) | browns evenly, so colour differences show the oven, not the bread |

### In Israel

Checked 2026-10-09.

- **Your oven's modes.** Built-in ovens (*tanur banuy*, תנור בנוי) usually offer conventional heat (*chimum elyon ve-tachton*, חימום עליון ותחתון) and fan (*turbo*, טורבו), sometimes a grill. Test in the mode you bake bread in (conventional), then repeat on fan if you use it for viennoiserie. If your oven has a Shabbat mode, make sure it is off for the test: read the manual for what it changes.
- **Gas ovens** in freestanding ranges heat from a burner at the bottom: expect a hotter bottom and a vented, drier oven (lesson [07.4](../module-07/lesson-04.md) gives the cover method for steam).
- **Summer:** a 230 °C oven heats the kitchen; run the test in the cooler morning and plan bakes back to back so the oven preheats once.
- **Oven thermometers** (*madchom tanur*, מדחום תנור) are sold in kitchen shops and online; any dial thermometer reading to 300 °C works.

### Steps

1. **Real preheat.** Place the oven thermometer in the centre of the middle shelf. Set 230 °C, conventional heat. Start a timer. Note when the oven signals "ready" and when the thermometer actually reaches 230 °C (or levels off). Note the reading after 45 minutes.
2. **Three positions.** Move the thermometer (gloves) to the back and then the front of the middle shelf; leave it 5 minutes each; note the readings.
3. **Toast map.** Lower the oven to 180 °C (about 350 °F) and let it settle 10 minutes. Lay the slices in a grid on the rack or tray on the middle shelf. Bake until the centre slices are light golden (about 10-20 minutes). Take them out in order and lay them on the counter in the same grid.
4. **Read the map.** Draw the grid; mark each slice light, golden or dark on top and underneath. The darkest slices are your hot spots.
5. **Optional:** repeat steps 3-4 with a baking stone on the lowest shelf, preheated 60 minutes.
6. **Write your oven card:** real preheat time; real temperature vs display at 230 °C; hot zones; where you will put bread, where you will turn a tray halfway.

### Targets

- Real preheat time and display-vs-thermometer difference recorded.
- Three position readings at 230 °C.
- A toast map with top and bottom colours for every slice; an oven card with three decisions.

### How you know it worked

You can say, with numbers, how long your oven really takes, how far its display is from the truth and where it burns. Most home ovens are hotter at the back and sides and at the top or bottom; many signal "ready" well before the thermometer agrees. From now on every bake starts from your card, and a burnt base or uneven colour has a known cause.

### Self-check

- [ ] I can explain conduction, convection and radiation with a baking example of each.
- [ ] I can say why a deck oven gives strong bottom heat and why a convection oven is set lower.
- [ ] I know four energy-saving rules for a deck oven and the figures behind them.
- [ ] I have an oven card with my oven's real preheat, real temperature and hot zones.

## What goes wrong

| Symptom | Likely cause | Fix now | Prevent next time |
|---|---|---|---|
| Burnt base, pale top (pain ferré) | Sole too hot for the voûte; hot back of the deck; gas oven bottom burner | Move to a cooler zone or a second tray underneath | Real readings per deck; lower sole power; stone on the lowest shelf at home |
| Uneven colour across a load | Hot spots; pieces too close; tray never turned | Turn the tray halfway (home) | Toast map; even spacing; load the hot zone with sturdier products |
| Dry, thick crust on bread in a convection oven | Forced convection dries the surface; no steam | Shorter bake | Bake bread on a deck or with fan off at loading (home) |
| Pale, under-risen first load | Oven "ready" by its signal but not by the thermometer | Longer bake for colour | Preheat by the thermometer; know your real preheat time |
| High energy bill, oven hot for hours empty | Preheat started too early; decks left on | Switch off unused decks | Programmed preheat; grouped bakes; steam off where not needed |

## Review

- Conduction from the sole or tray, radiation from hot surfaces, convection from moving air; the oven type decides the mix.
- Deck: high thermal mass, strong bottom heat, slow to change; convection: fast, even, drying, set about 15-20 °C lower; rack: whole racks, large output.
- Energy (CNBPF 2025): programmed preheat, 230 rather than 250 °C where possible, steam only where needed, doors shut, bakes grouped, scale removed.
- Check every oven with a thermometer and map its hot spots; gloves, a clear loading area and standing aside from steam prevent burns.
- Exam-relevant (S3.1 ovens, S4.3 heat transfer and energy): see [the CAP exam reference](../../references/cap-exam.md).
