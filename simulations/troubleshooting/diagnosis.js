// Troubleshooting simulation: data and pure logic (no DOM).
// Built from references/troubleshooting.md and the decision trees of lessons 16.2-16.5,
// following the five-step method of lesson 16.1. Every cause names the row of
// references/troubleshooting.md it comes from (`row` = the exact "Problem" cell).
// Course numbers only: fermentation about 7 % per °C (04.2); base-temperature water method
// (Module 5: base = TPV × factors, water = base − flour − room (− pre-ferment) − friction factor);
// bread apprêt 24-28 °C, 75-85 % RH; croissant proof 24-26 °C, never above about 27 °C;
// lamination butter about 13 °C (plastic 12-15 °C); home steam: metal tray preheated on the
// lowest shelf, 100-150 mL hot water at loading, fan off, steam out at about 10 minutes (08.4);
// core at least 93 °C, baguettes 96-98 °C.

/** "11.6" → "../../lessons/module-11/lesson-06.md" (relative to the simulation). */
export function lessonPath(id) {
  const [m, l] = String(id).split(".");
  return `../../lessons/module-${m.padStart(2, "0")}/lesson-${l.padStart(2, "0")}.md`;
}
export const REFERENCE_PATH = "../../references/troubleshooting.md";
export const REPORT_PATH = "../../templates/non-conformity-report.md";

export const STAGES = {
  weighing: "Weighing, pre-ferments",
  mixing: "Mixing",
  pointage: "Pointage",
  shaping: "Dividing, shaping",
  appret: "Apprêt",
  scoring: "Scoring, steam",
  baking: "Baking",
  cooling: "Cooling, storing",
  detrempe: "Détrempe",
  butter: "Butter, lock-in",
  tourage: "Tourage",
  cutting: "Cutting, shaping",
  proof: "Proof",
  bake: "Egg wash, bake",
  freezing: "Cooling, freezing",
  fillings: "Creams, fillings",
  fermentation: "First fermentation",
};

export const FAMILIES = {
  bread: {
    label: "Bread",
    chain: ["weighing", "mixing", "pointage", "shaping", "appret", "scoring", "baking", "cooling"],
  },
  viennoiserie: {
    label: "Viennoiserie (laminated)",
    chain: ["detrempe", "butter", "tourage", "cutting", "proof", "bake", "freezing"],
  },
  "pate-levee": {
    label: "Pâte levée, enriched and tin breads",
    chain: ["weighing", "fillings", "mixing", "fermentation", "shaping", "appret", "baking", "cooling"],
  },
};

const C = (o) => o;

export const CAUSES = {
  // ---------- bread: fermentation and temperature ----------
  "overfermented-warm": C({
    title: "Over-fermented: dough too warm, sheet times not adapted",
    row: "Loaf spreads flat",
    stage: "pointage",
    why: "Coarse crumb, large holes under the crust and a sour smell are the marks of an exhausted dough. A dough above its TPV ferments about 7 % faster per °C, so the sheet's times were too long for it.",
    fixNow: "Bake immediately, hotter, no long wait.",
    prevent: "Calculate the water every day (base = TPV × 3; water = base − flour − room − friction factor) and shorten the times by the 7 % rule; judge by the poke test, not the clock.",
    lessons: ["04.7", "05.2", "07.3", "16.2"],
  }),
  "warm-friction": C({
    title: "Dough warmer than calculated: friction factor of another product, method or batch size",
    row: "Dough several degrees warmer than calculated",
    stage: "mixing",
    why: "The water was calculated, yet the dough came out several degrees above the calculation: the friction factor on the sheet does not match this mixer, method or batch size, or the second speed ran too long.",
    fixNow: "Shorten pointage by the 7 % rule.",
    prevent: "One friction factor per product and batch size, measured (3 × dough − flour − room − water) and written on the sheet.",
    lessons: ["13.1", "05.3", "16.2"],
  }),
  "warm-preferment": C({
    title: "Dough far too warm: 3-factor friction factor or no pre-ferment temperature in a 4-factor calculation",
    row: "Dough far too warm in a dough with a pre-ferment",
    stage: "mixing",
    why: "With a pre-ferment the calculation has four factors: base = TPV × 4 and the friction factor is also for four factors. Using the 3-factor friction factor, or leaving out the pre-ferment temperature, gives water that is too warm.",
    fixNow: "Shorter pointage (7 % rule); report.",
    prevent: "One convention per product, written on the sheet: 4 factors whenever a pre-ferment is in the dough.",
    lessons: ["05.3", "16.2"],
  }),
  "overripe-preferment": C({
    title: "Over-ripe poolish or pâte fermentée",
    row: "Weak, sticky dough; flat, sour bread",
    stage: "weighing",
    why: "A collapsed pre-ferment smelling of alcohol or vinegar brings acidity and enzymes that weaken the gluten: the dough is sticky, the bread flat and sour, even at the right dough temperature.",
    fixNow: "Use less of it, mix cooler, shorten pointage.",
    prevent: "Respect the time, yeast and temperature of the pre-ferment; keep pâte fermentée at about 4 °C, dated.",
    lessons: ["04.5", "16.2"],
  }),
  "retarded-overproof": C({
    title: "Retarded dough over-proofed at the set time: dough mixed too warm or too much yeast",
    row: "Retarded or blocked dough over-proofed at the set time",
    stage: "appret",
    why: "The cold held its temperature, so the dough itself carried the excess: mixed above its TPV or with too much yeast, it kept fermenting in the cold.",
    fixNow: "Divide or bake at once; short apprêt.",
    prevent: "Cooler TPV, less yeast; check the cold temperature on the record.",
    lessons: ["04.6", "16.2"],
  }),
  "blocked-cabinet": C({
    title: "Cabinet never reached its blocking temperature",
    row: "Blocked pieces over-proofed in the morning",
    stage: "appret",
    why: "The cabinet's own record shows it above its set point overnight: a dirty condenser, a place next to the oven or an overloaded cabinet. The dough was right; the cold was not.",
    fixNow: "Bake early, or reshape if possible.",
    prevent: "Clean, ventilated condenser away from the oven; read the cabinet record every morning.",
    lessons: ["13.3", "16.2"],
  }),
  "second-load": C({
    title: "Second oven load over-proofed",
    row: "Second oven load over-proofed",
    stage: "appret",
    why: "Same dough, same oven: only the faulty load waited longer in apprêt at the same temperature. Only some pieces → a cause of order or waiting, not of the dough.",
    fixNow: "Bake it at once; note the defect.",
    prevent: "Proof group 2 about 3-4 °C cooler (7 % rule: 1.07^3.5 ≈ 1.27, about a quarter slower) or shape it later; write the poke test for every load.",
    lessons: ["14.1", "16.1", "16.2"],
  }),
  // ---------- bread: dough strength and water ----------
  "soft-dough": C({
    title: "Dough too soft: too much water",
    row: "Dough too soft (pâte trop douce)",
    stage: "weighing",
    why: "The weighing sheet shows more water than the formula: water taken as a % of the dough instead of the flour, or ice weighed on top of the full water weight.",
    fixNow: "Contre-frasage before full development; folds.",
    prevent: "Water from the flour %; ice counted inside the water weight.",
    lessons: ["05.3", "06.1", "16.2"],
  }),
  "flat-tight": C({
    title: "Flat with a tight crumb: dough wet, flour weak or shaping slack (not over-fermentation)",
    row: "Flat loaf with a tight crumb (not coarse, not sour)",
    stage: "shaping",
    why: "The poke test was correct and the crumb is tight, not coarse or sour: the gas was there but the dough could not hold its shape. Hydration, flour and shaping tension decide.",
    fixNow: "Firmer shaping on the next batch.",
    prevent: "Check hydration and flour; more tension in shaping.",
    lessons: ["03.5", "07.3", "16.2"],
  }),
  "salt-forgotten": C({
    title: "Salt forgotten",
    row: "Dough rushes, sticky, slack, bland",
    stage: "weighing",
    why: "Without salt the yeast runs unchecked and the gluten is weaker: the dough rushes, slackens and tastes of nothing. The salt was not ticked on the sheet.",
    fixNow: "If not yet divided, salt can sometimes be worked in; otherwise report.",
    prevent: "Tick the salt at weighing; salt in its own container.",
    lessons: ["04.7", "07.2", "16.2"],
  }),
  "exces-force-dough": C({
    title: "Excès de force: strong or improved flour, firm or cold dough, too many folds",
    row: "Dough springs back, shrinks, tears at shaping (excès de force)",
    stage: "mixing",
    why: "The dough resists every stretch: strong flour or ascorbic acid, a firm or cold dough, many folds or intensive mixing give too much strength for the shaping.",
    fixNow: "Longer détente (10-15 min more); looser pre-shape; shape in two passes.",
    prevent: "Autolyse; 1-2 points more water; fewer folds.",
    lessons: ["03.5", "16.2"],
  }),
  "manque-force": C({
    title: "Manque de force: weak flour, too much water or over-mixed",
    row: "Dough slackens and spreads (manque de force)",
    stage: "mixing",
    why: "The dough stretches with no resistance: weak flour, too much water or a letdown from over-mixing, with the salt ticked and the pre-ferment sound.",
    fixNow: "Fold during pointage; tighter shaping; shorter apprêt; support (couche, banneton).",
    prevent: "Stronger flour; less water; stop mixing at the optimum.",
    lessons: ["03.5", "16.2"],
  }),
  "sticky-warm": C({
    title: "Over-mixed and too warm",
    row: "Dough sticky and slack at the divider, warm",
    stage: "mixing",
    why: "A long second speed heats the dough and breaks the network down: it reaches the divider warm, sticky and slack.",
    fixNow: "Divide quickly; firm shaping; cooler, shorter proof.",
    prevent: "Stop on the windowpane; correct the water temperature.",
    lessons: ["03.4", "05.2", "16.2"],
  }),
  "firm-dough": C({
    title: "Dough too firm: water short for this flour",
    row: "Dough too firm (pâte trop ferme)",
    stage: "mixing",
    why: "Dough at the right temperature but hard, the mixer labouring and the dough tearing: a thirstier flour or a water error left it short of water, and a firm dough cannot rise.",
    fixNow: "Bassinage in small additions.",
    prevent: "Hold back 2-3 % water and finish by feel.",
    lessons: ["03.5", "07.2", "16.2"],
  }),
  "exces-force": C({
    title: "Excès de force (strong or improved flour, short détente), not under-proofing",
    row: "Burst side with a correct poke test, dough shrank at shaping",
    stage: "mixing",
    why: "The poke test was correct, so the piece was not young; it shrank and tore at shaping. A stronger flour (often a new bag with ascorbic acid) resists the oven spring and bursts at its weakest point.",
    fixNow: "Longer détente, looser pre-shape.",
    prevent: "+1-2 points water; autolyse; check the flour sheet. One change at a time.",
    lessons: ["03.5", "16.2"],
  }),
  faconneuse: C({
    title: "Baguettes torn by the façonneuse",
    row: "Baguettes torn by the façonneuse",
    stage: "shaping",
    why: "The tears were there before the oven, from the first piece out of the moulder: too much strength, too short a détente or rollers too tight.",
    fixNow: "Longer détente; open the gap one notch.",
    prevent: "Moulder settings matched to each dough.",
    lessons: ["07.3", "13.2"],
  }),
  // ---------- bread: young dough ----------
  underproofed: C({
    title: "Under-proofed",
    row: "Tears on the side (pain cintré, bursting)",
    stage: "appret",
    why: "The poke test sprang back at once: the piece still had too much power and burst along its weakest line in the oven.",
    fixNow: "Bake the rest later: wait for the dent to fill slowly.",
    prevent: "Longer apprêt, judged by the poke test; deeper, more horizontal blade; steam at loading.",
    lessons: ["07.4", "04.4", "16.2"],
  }),
  "burst-scoring": C({
    title: "Scores too shallow or no steam: the piece burst instead of opening at the cuts",
    row: "Tears on the side (pain cintré, bursting)",
    stage: "scoring",
    why: "Proof was right, but the cuts were too shallow or closed and the skin set too early without steam, so the gas found its own exit along the side.",
    fixNow: "Steam and deeper cuts for the next load.",
    prevent: "Blade at 30-45°, about 5 mm deep; steam at loading (home: preheated metal tray on the lowest shelf, 100-150 mL hot water, fan off).",
    lessons: ["07.4", "08.4", "16.2"],
  }),
  "cold-dough": C({
    title: "Under-fermented: dough too cold",
    row: "Dense crumb, low volume",
    stage: "mixing",
    why: "Dough read below its TPV: about 7 % slower per °C (4 °C under is about 1.07^4 ≈ 1.3 times slower), so the sheet's times left it young: small, heavy, tight crumb, often a reddish crust.",
    fixNow: "Extend apprêt if not yet baked.",
    prevent: "Hit the target dough temperature (base-temperature method, Module 5); judge fermentation by the dough, not the clock.",
    lessons: ["04.4", "05.2", "16.2"],
  }),
  "yeast-short": C({
    title: "Under-fermented: yeast short, old or killed by hot water",
    row: "Dense crumb, low volume",
    stage: "weighing",
    why: "Dough at the right temperature but the tub barely rose: too little yeast, an old one, or yeast that met water above about 40 °C.",
    fixNow: "Extend apprêt if not yet baked.",
    prevent: "Check yeast weight, type and date at weighing; never pour water above about 40 °C onto yeast.",
    lessons: ["04.1", "06.1", "16.2"],
  }),
  // ---------- bread: scoring ----------
  "scores-overproofed": C({
    title: "Over-proofed: no power left to open the cuts",
    row: "Scores do not open",
    stage: "appret",
    why: "The dent of the poke test stayed: the piece had no power left, so the cuts stayed flat and the loaf spread.",
    fixNow: "Bake at once; nothing else to save.",
    prevent: "Shorter apprêt, judged by the poke test.",
    lessons: ["07.4", "04.4", "16.2"],
  }),
  "scores-skin": C({
    title: "Skin dried before loading (pâte croûtée)",
    row: "Scores do not open",
    stage: "appret",
    why: "A dry, dull skin cannot stretch: the cuts open poorly even when the proof is right.",
    fixNow: "Mist lightly before loading.",
    prevent: "Cover the dough while proofing; 75-85 % RH.",
    lessons: ["07.4", "16.3"],
  }),
  grooves: C({
    title: "Blade held upright or cut too deep",
    row: "Cuts open as flat grooves, no ear",
    stage: "scoring",
    why: "Symmetrical grooves with no ear: the blade went straight down instead of flat.",
    fixNow: "—",
    prevent: "Blade flat at about 30°, about 5 mm deep.",
    lessons: ["08.4", "16.2"],
  }),
  fused: C({
    title: "Cuts too short or not overlapping; too much steam",
    row: "Cuts flat and fused",
    stage: "scoring",
    why: "Short cuts that do not overlap join up in the oven; heavy steam left too long fuses them further.",
    fixNow: "Open the ouras or the door earlier.",
    prevent: "Cuts overlapping by a third; steam only at loading.",
    lessons: ["07.4", "16.2"],
  }),
  barber: C({
    title: "Cuts across the loaf instead of along the midline",
    row: "Cuts like a barber's pole",
    stage: "scoring",
    why: "The cuts spiral round the loaf because they were made across it.",
    fixNow: "—",
    prevent: "Cuts nearly parallel to the length, close to the midline.",
    lessons: ["08.4", "16.2"],
  }),
  // ---------- bread: oven ----------
  "oven-below-dial": C({
    title: "Oven below its dial",
    row: "Pale bread, weak spring at the right bake time",
    stage: "baking",
    why: "The thermometer reads below the dial: home ovens are often 10-20 °C off. Fermentation was right, so the colour and spring were lost in the oven.",
    fixNow: "Bake longer.",
    prevent: "Check with an oven thermometer; real preheat time (45-60 min) on the sheet.",
    lessons: ["05.1", "13.4", "16.3"],
  }),
  "no-steam-spring": C({
    title: "No steam: the skin set before the spring",
    row: "Weak oven spring",
    stage: "scoring",
    why: "Oven at temperature, dough right, but no steam: the crust set in the first minutes and held the loaf down; colour dull, volume low.",
    fixNow: "—",
    prevent: "Steam at loading (home: metal tray preheated on the lowest shelf, 100-150 mL hot water, fan off, steam out at about 10 min); preheat 45-60 min.",
    lessons: ["07.5", "08.4", "13.4", "16.2"],
  }),
  "pale-overfermented": C({
    title: "Over-fermented: sugars used up",
    row: "Pale crust",
    stage: "pointage",
    why: "Sour smell, flat cuts and a long or warm fermentation: the yeast ate the sugars the crust needed for colour. A longer bake will not bring it back.",
    fixNow: "Bake longer.",
    prevent: "Shorter fermentation or a cooler dough (7 % rule); check the oven with a thermometer.",
    lessons: ["04.7", "16.3"],
  }),
  "pale-short-bake": C({
    title: "Bake too short",
    row: "Pale crust",
    stage: "baking",
    why: "Fermentation normal and the oven on its dial by the thermometer, but the log shows the bake stopped before the sheet's time.",
    fixNow: "Bake longer.",
    prevent: "Bake to the sheet's time and the core temperature (at least 93 °C, baguettes 96-98 °C).",
    lessons: ["07.5", "16.3"],
  }),
  "pale-first-load": C({
    title: "First load in at the oven's \"ready\" signal, before the real temperature",
    row: "Pale first load only",
    stage: "baking",
    why: "Only the first load is pale; later loads are normal. The ready light came on before the oven, sole and stone were really at temperature.",
    fixNow: "Longer bake for colour.",
    prevent: "Preheat by the thermometer, 45-60 min, not by the signal.",
    lessons: ["13.4", "16.3"],
  }),
  ferre: C({
    title: "Pain ferré: sole too hot for the voûte, or tray too low",
    row: "Burnt base, pale top (pain ferré)",
    stage: "baking",
    why: "Only the base burnt, top normal or pale, on one deck or shelf: too much heat from below.",
    fixNow: "Move to a cooler zone or slide a second tray underneath.",
    prevent: "Real readings per deck; lower sole power; middle shelf at home.",
    lessons: ["07.5", "13.4", "16.3"],
  }),
  "dark-under": C({
    title: "Under-fermented: much sugar left",
    row: "Dark reddish crust, small dense loaf",
    stage: "pointage",
    why: "Dark reddish all over on a small, dense loaf: a young dough still holds sugars that colour fast.",
    fixNow: "—",
    prevent: "Full pointage and apprêt; hit the target dough temperature.",
    lessons: ["04.1", "04.4", "16.3"],
  }),
  "dark-hot": C({
    title: "Oven too hot or bake too long",
    row: "Crust too dark or burnt",
    stage: "baking",
    why: "Normal volume and crumb, dark all over: the oven thermometer reads above the setting or the bake ran past the sheet's time.",
    fixNow: "—",
    prevent: "Check the oven with a thermometer and the timer; lower the setting.",
    lessons: ["07.5", "16.3"],
  }),
  "dark-gummy": C({
    title: "Oven too hot for the size, taken out on colour",
    row: "Dark crust, gummy centre",
    stage: "baking",
    why: "The crust coloured long before the centre was baked: core below 93 °C.",
    fixNow: "Lower the oven, bake on.",
    prevent: "Probe the core of a test loaf (at least 93 °C).",
    lessons: ["05.4", "10.3", "16.4"],
  }),
  "uneven-colour": C({
    title: "Hot spots, pieces too close, tray not turned",
    row: "Uneven colour across a load",
    stage: "baking",
    why: "The dark pieces sit in one place of the oven: a hot zone, not a dough fault.",
    fixNow: "Turn the tray halfway (home).",
    prevent: "Even spacing; know the oven's hot spots.",
    lessons: ["07.4", "13.4", "16.3"],
  }),
  croutee: C({
    title: "Pâte croûtée: pieces uncovered, low humidity",
    row: "Dull, cracked crust with pale marks",
    stage: "appret",
    why: "A dry skin was felt before loading: it cannot stretch or colour evenly and cracks with pale marks.",
    fixNow: "Mist lightly before loading.",
    prevent: "Cover at every rest; 75-85 % RH (home: a box or a damp towel).",
    lessons: ["04.3", "04.4", "16.3"],
  }),
  "terne-steam": C({
    title: "Croûte terne: no or too little steam, fan on",
    row: "Dull crust (croûte terne)",
    stage: "scoring",
    why: "Skin fine at loading, but no effective steam (water on a cold tray, fan on, steam vented): the starch on the surface could not gelatinise and shine.",
    fixNow: "—",
    prevent: "Steam at loading. Home: metal tray preheated on the lowest shelf, 100-150 mL hot water at loading, fan off, steam out at about 10 min.",
    lessons: ["07.5", "08.4", "16.3"],
  }),
  "terne-overproof": C({
    title: "Croûte terne from over-fermentation",
    row: "Dull crust (croûte terne)",
    stage: "appret",
    why: "Steam was normal but the pieces were over-proofed: flat, pale and dull together point to the fermentation.",
    fixNow: "—",
    prevent: "Shorter apprêt, judged by the poke test; cover the dough while proofing.",
    lessons: ["04.4", "16.3"],
  }),
  cloque: C({
    title: "Pain cloqué: too much steam or a wet surface",
    row: "Blisters on crust (pain cloqué)",
    stage: "scoring",
    why: "Fresh dough (not retarded) with small bubbles on the crust: steam too heavy or left too long, or a very wet surface.",
    fixNow: "—",
    prevent: "Less steam, vented at about 10 minutes.",
    lessons: ["07.5", "16.3"],
  }),
  "cloque-retard": C({
    title: "Condensation on cold pieces: warming phase too humid, loaded wet",
    row: "Blisters on retarded or blocked bread",
    stage: "appret",
    why: "Retarded or blocked pieces with droplets at loading: warm, humid air condensed on the cold dough and the water blistered in the oven.",
    fixNow: "Let the surface dry before loading.",
    prevent: "Warming humidity 75-80 %; out 10-15 min before loading.",
    lessons: ["04.6", "13.3", "16.3"],
  }),
  // ---------- bread: crumb ----------
  "gummy-underbaked": C({
    title: "Under-baked",
    row: "Gummy crumb",
    stage: "baking",
    why: "Core below about 93 °C (or not measured, so it cannot be ruled out): the starch near the centre did not set.",
    fixNow: "Return to the oven.",
    prevent: "Bake to a core of at least 93 °C (baguettes 96-98 °C); cool fully before cutting.",
    lessons: ["05.4", "07.5", "16.4"],
  }),
  "gummy-cut-warm": C({
    title: "Cut warm: crumb not set",
    row: "Gummy crumb",
    stage: "cooling",
    why: "Baked through, but cut within the hour (rye-rich bread within 2 hours): the crumb was still setting and steam was leaving.",
    fixNow: "Let the rest cool fully.",
    prevent: "Cool at least 1 hour, rye-rich bread 1-2 hours or more, before cutting; probe the core.",
    lessons: ["07.5", "10.3", "16.4"],
  }),
  "gummy-wet": C({
    title: "Too much free water: very wet, wholemeal or rye-rich dough",
    row: "Gummy crumb",
    stage: "weighing",
    why: "Baked through and cooled, still gummy: the dough held more water than the bake could drive off.",
    fixNow: "—",
    prevent: "Bake longer at a lower temperature; check the hydration of the sheet.",
    lessons: ["10.3", "10.4", "16.4"],
  }),
  "white-pc": C({
    title: "Over-oxidised: long second speed, salt late",
    row: "Very white, cottony, bland crumb",
    stage: "mixing",
    why: "Only oxidation bleaches the crumb: long, fast mixing with the salt added late destroys the flour's pigments and aroma.",
    fixNow: "—",
    prevent: "Shorter or slower mixing; salt in during frasage; autolyse.",
    lessons: ["03.4", "16.4"],
  }),
  "white-tradition": C({
    title: "Tradition over-oxidised: mixed fast or long without autolyse",
    row: "White, bland, regular crumb in tradition",
    stage: "mixing",
    why: "A white, not cream, crumb in a tradition comes from the mixing record: no autolyse, second speed, salt late.",
    fixNow: "—",
    prevent: "Autolyse and first speed only; stop before the full windowpane.",
    lessons: ["09.2", "16.4"],
  }),
  "tight-tradition": C({
    title: "Tradition degassed: punched or tightly pre-shaped",
    row: "Tight, regular crumb in tradition (cream-coloured)",
    stage: "shaping",
    why: "Tight but still cream-coloured: the colour rules out oxidation; the handling crushed the irregular holes.",
    fixNow: "—",
    prevent: "Let the dough spread by itself; fingertips only; loose pre-shape.",
    lessons: ["09.3", "16.4"],
  }),
  tunnel: C({
    title: "Air pocket or flour trapped at shaping",
    row: "Large irregular holes or tunnels",
    stage: "shaping",
    why: "One tunnel along the seam or a fold, crumb otherwise normal: the shaping left air or flour inside.",
    fixNow: "—",
    prevent: "Even shaping; brush off excess flour; seal the seam.",
    lessons: ["07.3", "08.3", "16.4"],
  }),
  "holes-overfermented": C({
    title: "Over-fermented or over-proofed",
    row: "Loaf spreads flat",
    stage: "appret",
    why: "Large holes just under the top crust with a coarse, sour crumb and a flat loaf: the dough was exhausted.",
    fixNow: "Bake immediately, hotter, no long wait.",
    prevent: "Shorter pointage or a cooler dough; judge by the poke test.",
    lessons: ["04.7", "16.4"],
  }),
  specks: C({
    title: "Contre-frasage too late",
    row: "Dry flour specks in the crumb",
    stage: "mixing",
    why: "Specks spread through the whole crumb, not along the folds: flour added after the dough was developed.",
    fixNow: "Mix a little longer in first speed.",
    prevent: "Correct the consistency at the end of frasage.",
    lessons: ["03.5", "16.4"],
  }),
  lumps: C({
    title: "Pâte fermentée added late or in one cold block",
    row: "Lumps of old dough in the crumb",
    stage: "mixing",
    why: "Lumps of old dough in the crumb: it never blended in.",
    fixNow: "Knead 1-2 minutes more.",
    prevent: "Cut it into pieces, add it at the end of frasage.",
    lessons: ["08.1", "16.4"],
  }),
  "stale-fridge": C({
    title: "Stored in the fridge",
    row: "Bread stales fast",
    stage: "cooling",
    why: "Starch stales fastest at fridge temperature.",
    fixNow: "Refresh in the oven.",
    prevent: "Room temperature for the day, freeze the rest.",
    lessons: ["07.5", "16.4"],
  }),
  "stale-seeds": C({
    title: "Seeds added dry",
    row: "Seeded bread dry, stales fast",
    stage: "weighing",
    why: "Dry seeds draw water from the crumb.",
    fixNow: "—",
    prevent: "Soak at least 4 hours (overnight in the fridge).",
    lessons: ["10.7", "16.4"],
  }),
  mould: C({
    title: "Bagged warm",
    row: "Soft crust, mould after a day",
    stage: "cooling",
    why: "Bagged before it was cold, in plastic, in a warm room: the steam softened the crust and fed the mould.",
    fixNow: "Unbag, dry on a rack.",
    prevent: "Bag only when cold; paper for crusty bread; freeze.",
    lessons: ["07.5", "16.4"],
  }),
  "sour-levain": C({
    title: "Over-ripe levain",
    row: "Campagne slack and very sour",
    stage: "weighing",
    why: "The levain was past its peak: acid weakens the dough and sharpens the taste.",
    fixNow: "Shape gently, banneton, bake at once.",
    prevent: "Use the levain at its peak.",
    lessons: ["10.3", "04.5", "16.4"],
  }),
  rancid: C({
    title: "Rancid wholemeal flour",
    row: "Bitter, \"paint\" taste in wholemeal bread",
    stage: "weighing",
    why: "The oil of the germ oxidised: smell the flour.",
    fixNow: "—",
    prevent: "Fresh flour, small lots, cool storage, first in first out.",
    lessons: ["10.4", "16.4"],
  }),
  // ---------- viennoiserie ----------
  "warm-proof": C({
    title: "Proofed too warm: the butter melted before the oven",
    row: "Butter leaks during baking",
    stage: "proof",
    why: "The probe read above about 27 °C in the proof: the butter layers melted and ran out, leaving flat, greasy croissants with fried bottoms.",
    fixNow: "Bake at once; move the rest somewhere cooler.",
    prevent: "Proof at 24-26 °C, never above about 27 °C; give the full proof; keep dough and butter cold during the turns.",
    lessons: ["11.6", "16.5"],
  }),
  "shared-cabinet": C({
    title: "Cabinet set warmer for bread",
    row: "Croissants leaking after a shared proof",
    stage: "proof",
    why: "Croissants went into a cabinet set for bread, above 27 °C: the butter melted.",
    fixNow: "Bake at once; set the rest somewhere cooler.",
    prevent: "One setting for the cabinet when it holds croissants (24-26 °C); proof bread elsewhere or at another time.",
    lessons: ["14.3", "16.5"],
  }),
  "tray-waiting": C({
    title: "Second tray kept warm while the first baked",
    row: "Butter leaks during baking",
    stage: "proof",
    why: "Only the tray that waited in a warm place (on top of the oven, near the deck) leaked: far above 27 °C, its butter melted before baking.",
    fixNow: "Bake it at once.",
    prevent: "Keep the second tray in a cool place (24-26 °C or the fridge) while the first bakes.",
    lessons: ["11.7", "14.2", "16.5"],
  }),
  "underproof-croissant": C({
    title: "Under-proofed (not a warm proof)",
    row: "Butter leaks, croissants small and tight, split along a turn",
    stage: "proof",
    why: "Proof temperature correct by the probe, but the time was short and the pieces were not almost doubled: small, tight croissants split along a turn and lost some butter.",
    fixNow: "Wait for the next trays to be ready, not for the oven to be free.",
    prevent: "Wait for almost double, a wobble and visible layers (about 1 h 30-2 h 30 at 24-26 °C).",
    lessons: ["11.6", "16.5"],
  }),
  "torn-layers": C({
    title: "Layers torn during lamination",
    row: "Butter leaks during baking",
    stage: "tourage",
    why: "Proof temperature and time correct, but the butter ran out through torn layers: dough and butter were not kept cold during the turns.",
    fixNow: "—",
    prevent: "Keep dough and butter cold during the turns (butter about 13 °C, plastic 12-15 °C); chill between turns.",
    lessons: ["11.4", "16.5"],
  }),
  "butter-breaks": C({
    title: "Butter too cold and hard for the dough",
    row: "Butter breaks into pieces",
    stage: "butter",
    why: "Butter much colder than the détrempe (brittle below about 10 °C) cracks into flakes instead of spreading: thick, uneven layers and greasy patches.",
    fixNow: "Rest the dough a few minutes at room temperature before the next turn.",
    prevent: "Butter and dough at similar firmness: butter about 12-15 °C (about 13 °C at the lock-in).",
    lessons: ["11.3", "11.4", "16.5"],
  }),
  "butter-melts": C({
    title: "Butter or room too warm, too long between turns",
    row: "Butter melts into the dough",
    stage: "tourage",
    why: "Butter above about 15 °C or a room above 24 °C: the butter blends into the dough, no distinct layers.",
    fixNow: "Chill 20-30 min before continuing.",
    prevent: "Work cold; chill between turns.",
    lessons: ["11.4", "16.5"],
  }),
  bready: C({
    title: "Too many turns",
    row: "Bready crumb throughout",
    stage: "tourage",
    why: "Four single turns give 81 butter layers, too thin to stay separate: the crumb looks like brioche.",
    fixNow: "—",
    prevent: "Keep to the sheet's turns (three single turns); mark each turn.",
    lessons: ["11.1", "16.5"],
  }),
  "uneven-layers": C({
    title: "Uneven rolling, butter not square",
    row: "Uneven layers",
    stage: "butter",
    why: "Butter at a good temperature but thick and thin areas in the cut: the plaque was not square or the rolling uneven.",
    fixNow: "—",
    prevent: "Roll evenly in both directions; square the butter plaque.",
    lessons: ["11.3", "11.4", "16.5"],
  }),
  streaks: C({
    title: "Flour not brushed off during tourage",
    row: "White dry streaks between layers",
    stage: "tourage",
    why: "The streaks follow the folds: flour was folded in.",
    fixNow: "—",
    prevent: "Brush every fold.",
    lessons: ["11.4", "16.5"],
  }),
  crushed: C({
    title: "Sheeter gap reduced in big jumps",
    row: "Croissant layers crushed",
    stage: "tourage",
    why: "Layers smeared after a sheeter pass with big gap steps.",
    fixNow: "Rest the block in the cold; continue in small steps.",
    prevent: "Small gap steps; butter at about 13 °C.",
    lessons: ["13.2", "16.5"],
  }),
  shrink: C({
    title: "Sheet not rested before cutting",
    row: "Triangles shrink after cutting",
    stage: "cutting",
    why: "The triangles shrank right after cutting: the sheet was still elastic.",
    fixNow: "Chill the triangles 10 min before rolling.",
    prevent: "Rest the sheet before cutting.",
    lessons: ["11.5", "16.5"],
  }),
  unroll: C({
    title: "Tip not underneath",
    row: "Croissants unroll",
    stage: "cutting",
    why: "The tip was on top or at the side and lifted in the oven.",
    fixNow: "—",
    prevent: "Tip underneath, touching the tray.",
    lessons: ["11.5", "16.5"],
  }),
  distorted: C({
    title: "Dough not rested before cutting; uneven cutting",
    row: "Distorted shapes",
    stage: "cutting",
    why: "Croissants shrink or bend: the sheet pulled back after cutting, or the triangles were crooked.",
    fixNow: "—",
    prevent: "Rest the sheet before cutting; use a template.",
    lessons: ["11.5", "16.5"],
  }),
  "pac-seam": C({
    title: "Seam not underneath",
    row: "Pain au chocolat unrolled, seam on the side",
    stage: "cutting",
    why: "The last edge was on the side, so it opened in the oven.",
    fixNow: "Turn the next pieces seam down before proofing.",
    prevent: "Last edge underneath, in the middle.",
    lessons: ["12.1", "16.5"],
  }),
  "choc-ends": C({
    title: "Rectangle narrower than the batons",
    row: "Chocolate showing at the ends",
    stage: "cutting",
    why: "The batons stuck out of the rectangle.",
    fixNow: "Pinch the ends lightly.",
    prevent: "Width = baton length + a few mm.",
    lessons: ["12.1", "16.5"],
  }),
  "pale-creases": C({
    title: "Under-baked: oven too hot so taken out early",
    row: "Pale creases, collapse on cooling",
    stage: "bake",
    why: "Top coloured, creases pale: taken out on the top colour before the inside was set.",
    fixNow: "Lower 10 °C, bake 2-3 minutes more.",
    prevent: "Oven thermometer; colour the creases (about 190-200 °C, fan 175-180 °C).",
    lessons: ["11.6", "16.5"],
  }),
  "pale-patchy": C({
    title: "Egg wash missing or uneven; oven too cool",
    row: "Pale or patchy colour",
    stage: "bake",
    why: "Pale patches where the egg wash missed, or pale all over in a cool oven.",
    fixNow: "—",
    prevent: "Two thin coats of egg wash; check the temperature.",
    lessons: ["11.6", "16.5"],
  }),
  glued: C({
    title: "Egg wash brushed into the cut edges",
    row: "Layers glued at the edges",
    stage: "bake",
    why: "Brush marks on the edges: the egg sealed the layers together.",
    fixNow: "—",
    prevent: "Brush the top surfaces only.",
    lessons: ["11.6", "16.5"],
  }),
  "poor-lift": C({
    title: "Under-proofed: dense interior",
    row: "Poor lift, dense interior",
    stage: "proof",
    why: "Turns correct, but the pieces went in before almost doubling: little lift, dense centre.",
    fixNow: "—",
    prevent: "Full proof: almost double, wobble, visible layers.",
    lessons: ["11.7", "11.6", "16.5"],
  }),
  "frozen-flat": C({
    title: "Slow freezing, long storage, or fermentation before freezing",
    row: "Frozen croissants flat",
    stage: "freezing",
    why: "Ice crystals damage the gluten and kill part of the yeast, more with every week of storage.",
    fixNow: "Longer proof; bake as a lower-grade product.",
    prevent: "Freeze straight after shaping, fast; respect the storage limit; thaw slowly in the cold.",
    lessons: ["12.5", "16.5"],
  }),
  "freezer-burn": C({
    title: "Freezer burn: bag not airtight",
    row: "Freezer burn",
    stage: "freezing",
    why: "Pale, dry patches: the surface dried in the freezer air.",
    fixNow: "Bake and judge; discard if very dry.",
    prevent: "Bag as soon as hard, air pressed out.",
    lessons: ["12.5", "16.5"],
  }),
  // ---------- pâte levée ----------
  "greasy-early": C({
    title: "Butter added before the gluten was developed",
    row: "Rich dough greasy, will not come together",
    stage: "mixing",
    why: "Butter at the start coats the flour and stops the gluten forming: the dough stays greasy.",
    fixNow: "Fridge 15-20 min, then knead again.",
    prevent: "Gluten first; butter at 15-18 °C in parts.",
    lessons: ["12.3", "16.5"],
  }),
  "greasy-warm": C({
    title: "Butter or dough too warm",
    row: "Rich dough greasy, will not come together",
    stage: "mixing",
    why: "Butter added at the right moment, but soft and warm or into a warm dough: it melts out instead of blending in.",
    fixNow: "Fridge 15-20 min, then knead again.",
    prevent: "Butter at 15-18 °C, added in parts; cool water so the dough stays on its TPV.",
    lessons: ["12.3", "16.5"],
  }),
  "braid-split": C({
    title: "Braided tight; under-proofed",
    row: "Braid split along the strands",
    stage: "shaping",
    why: "Strands pulled tight or a short apprêt: the braid tore along the strands in the oven.",
    fixNow: "—",
    prevent: "Lay strands without pulling; full apprêt.",
    lessons: ["12.4", "16.5"],
  }),
  "braid-uneven": C({
    title: "Braided from one end",
    row: "Braid uneven end to end",
    stage: "shaping",
    why: "Thick at one end, thin at the other: braided from one end or strands of different weights.",
    fixNow: "Re-tuck the thin end.",
    prevent: "Braid from the middle; strands weighed.",
    lessons: ["12.4", "16.5"],
  }),
  "mie-caved": C({
    title: "Unmoulded late or under-baked",
    row: "Pain de mie sides caved in",
    stage: "cooling",
    why: "Steam trapped in the tin softens the sides, which cave in.",
    fixNow: "—",
    prevent: "Unmould at once; at least about 90 °C at the core.",
    lessons: ["10.5"],
  }),
  "mie-weight": C({
    title: "Dough weight not matched to the tin",
    row: "Pain de mie rounded corners, or lid forced",
    stage: "shaping",
    why: "Too little dough leaves rounded corners; too much forces the lid.",
    fixNow: "—",
    prevent: "Pâton = tin volume × 0.35; lid on at 1-1.5 cm below the rim.",
    lessons: ["10.5"],
  }),
  "mie-dark": C({
    title: "Too hot for a sugar-and-milk dough",
    row: "Dark top and corners, pale sides (pain de mie)",
    stage: "baking",
    why: "Sugar and milk colour fast: strong top heat darkens the top and corners before the sides colour.",
    fixNow: "Lower to 180-190 °C, bake on.",
    prevent: "190-200 °C conventional; middle shelf.",
    lessons: ["10.5", "16.3"],
  }),
  "viennois-dull": C({
    title: "Steam on an egg-washed dough; egg wash thick",
    row: "Viennois streaky, dull crust",
    stage: "baking",
    why: "Steam washes the egg wash into streaks and dulls it.",
    fixNow: "—",
    prevent: "No steam; two thin coats.",
    lessons: ["10.6", "16.3"],
  }),
  "creme-runny": C({
    title: "Crème pâtissière not boiled",
    row: "Crème pâtissière runny the next day",
    stage: "fillings",
    why: "Without a full boil the yolk amylase stays active and breaks the starch down overnight.",
    fixNow: "Do not use it; make a new batch.",
    prevent: "Full boil, then about 1 min more.",
    lessons: ["12.2", "16.5"],
  }),
  "raisins-wet": C({
    title: "Under-baked; cream too thick",
    row: "Pains aux raisins pale, wet bases",
    stage: "baking",
    why: "A thick cream layer keeps the base wet; taken out too early it stays pale.",
    fixNow: "Back in the oven on a lower shelf.",
    prevent: "Bake until golden underneath; about 2 mm of cream.",
    lessons: ["12.2", "16.5"],
  }),
};

// ---------- symptoms and their decision trees ----------
// Each node: { q, check, options: [{ label, to } | { label, cause }] }. `to` names another node.
// The first question of most trees is the 16.1 shortcut: how many pieces?

const HOW_MANY = "How many pieces show the fault?";
const HOW_MANY_CHECK = "Step 1 of 16.1: every piece points to the whole dough; only some pieces point to order, place or waiting.";

export const SYMPTOMS = {
  // ===== bread =====
  flat: {
    family: "bread",
    label: "Flat, wide loaf, cuts barely open",
    fr: "pain plat",
    lesson: "16.2",
    start: "many",
    nodes: {
      many: {
        q: HOW_MANY,
        check: HOW_MANY_CHECK,
        options: [
          { label: "Every piece of the batch", to: "crumb" },
          { label: "Only the second oven load (same dough)", to: "load2" },
        ],
      },
      load2: {
        q: "Compare the apprêt of the two loads.",
        check: "Apprêt place, temperature and time per load; poke test per load.",
        options: [
          { label: "Same cabinet and temperature; load 2 waited about 25-30 minutes longer", cause: "second-load" },
          { label: "Same apprêt; load 2 baked in a cooler oven by the thermometer", cause: "oven-below-dial" },
        ],
      },
      crumb: {
        q: "Cut a loaf. What does the crumb look like?",
        check: "Crumb, smell, and the dough notes from shaping.",
        options: [
          { label: "Coarse, large holes under the crust, sour smell", to: "retard" },
          { label: "Tight or normal; the dough was sticky or slack", to: "water" },
          { label: "Normal; crust pale, volume low", to: "oven" },
        ],
      },
      retard: {
        q: "Was the dough retarded or blocked overnight?",
        check: "Production sheet: direct, retarded or blocked.",
        options: [
          { label: "Yes", to: "cold" },
          { label: "No, direct process", to: "tpv" },
        ],
      },
      cold: {
        q: "What does the cold room or cabinet record show?",
        check: "The cabinet's own temperature record, then the TPV of the batch.",
        options: [
          { label: "Above its set point overnight", cause: "blocked-cabinet" },
          { label: "At its set point; the dough was mixed above its TPV", cause: "retarded-overproof" },
        ],
      },
      tpv: {
        q: "Dough temperature after mixing against the TPV?",
        check: "The reading on the log against the sheet's target (TPV).",
        options: [
          { label: "Several °C above the TPV", to: "water-calc" },
          { label: "On target; the pre-ferment had collapsed and smelled of alcohol", cause: "overripe-preferment" },
        ],
      },
      "water-calc": {
        q: "Was the water temperature calculated for that day?",
        check: "Module 5: base = TPV × factors; water = base − flour − room (− pre-ferment) − friction factor.",
        options: [
          { label: "No: tap water, and the sheet's times were kept", cause: "overfermented-warm" },
          { label: "Yes, with 3 factors, but a poolish was in the dough", cause: "warm-preferment" },
          { label: "Yes, correctly, but the dough still came out several °C above it", cause: "warm-friction" },
        ],
      },
      water: {
        q: "What do the weighing sheet and the dough notes show?",
        check: "Water weight against flour %, ice, salt tick, flour bag, poke test at loading.",
        options: [
          { label: "More water than the formula (water as % of dough, or ice on top)", cause: "soft-dough" },
          { label: "Salt not ticked; dough rushed and tasted bland", cause: "salt-forgotten" },
          { label: "Weights right, poke test correct; weak flour or slack shaping", cause: "flat-tight" },
        ],
      },
      oven: {
        q: "Oven thermometer against the dial, and the steam record?",
        check: "Read an oven thermometer, not the dial; steam at loading.",
        options: [
          { label: "Thermometer 10-20 °C below the dial", cause: "oven-below-dial" },
          { label: "Oven right; no steam, or fan on at loading", cause: "no-steam-spring" },
        ],
      },
    },
  },
  "small-dense": {
    family: "bread",
    label: "Small, heavy loaf, tight crumb",
    fr: "manque de volume",
    lesson: "16.2",
    start: "burst",
    nodes: {
      burst: {
        q: "Is the side burst or torn?",
        check: "Side of the loaf; poke test at loading; shaping notes.",
        options: [
          { label: "Yes, and the poke test sprang back at once", cause: "underproofed" },
          { label: "Yes, poke test fine; the dough shrank and tore at shaping", cause: "exces-force" },
          { label: "No, heavy all over, often a dark reddish crust", to: "tpv" },
        ],
      },
      tpv: {
        q: "Dough temperature after mixing against the TPV?",
        check: "Dough reading on the log; 7 % slower per °C under target.",
        options: [
          { label: "Several °C below the TPV", cause: "cold-dough" },
          { label: "On target, but the tub barely rose", cause: "yeast-short" },
          { label: "On target, but the dough was hard and the mixer laboured", cause: "firm-dough" },
        ],
      },
    },
  },
  "burst-side": {
    family: "bread",
    label: "Torn or burst along the side",
    fr: "pain cintré, éclaté",
    lesson: "16.2",
    start: "when",
    nodes: {
      when: {
        q: "When did the tear appear?",
        check: "Look at the pieces before loading, or the first piece out of the moulder.",
        options: [
          { label: "Already torn after the façonneuse, before the oven", cause: "faconneuse" },
          { label: "In the oven", to: "poke" },
        ],
      },
      poke: {
        q: "Poke test at loading?",
        check: "The dent: springs back at once (young), fills slowly (ready), stays (over).",
        options: [
          { label: "Sprang back at once", cause: "underproofed" },
          { label: "Filled slowly (ready)", to: "cuts" },
        ],
      },
      cuts: {
        q: "Cuts, steam and the dough at shaping?",
        check: "Cut depth and angle; steam record; shaping notes; flour bag.",
        options: [
          { label: "Cuts shallow or closed, little or no steam", cause: "burst-scoring" },
          { label: "Cuts and steam normal; dough springy, shrank at shaping, new flour", cause: "exces-force" },
        ],
      },
    },
  },
  scores: {
    family: "bread",
    label: "Cuts do not open well",
    fr: "grignes",
    lesson: "16.2",
    start: "look",
    nodes: {
      look: {
        q: "How do the cuts look?",
        check: "Cut shape, poke test and the skin at loading.",
        options: [
          { label: "Flat, no lift; loaf flat", to: "poke" },
          { label: "Open as symmetrical grooves, no ear", cause: "grooves" },
          { label: "Short, fused together", cause: "fused" },
          { label: "Spiral round the loaf", cause: "barber" },
        ],
      },
      poke: {
        q: "Poke test and skin at loading?",
        check: "The dent of the poke test; touch the skin.",
        options: [
          { label: "Dent stayed; piece fragile", cause: "scores-overproofed" },
          { label: "Proof right; skin dry and dull to the touch", cause: "scores-skin" },
        ],
      },
    },
  },
  pale: {
    family: "bread",
    label: "Pale crust",
    fr: "croûte pâle",
    lesson: "16.3",
    start: "many",
    nodes: {
      many: {
        q: HOW_MANY,
        check: HOW_MANY_CHECK,
        options: [
          { label: "Every piece, every load", to: "ferm" },
          { label: "Only the first load; later loads normal", cause: "pale-first-load" },
        ],
      },
      ferm: {
        q: "Sour smell, flat cuts, long or warm fermentation?",
        check: "Smell, cuts, dough temperature and times on the log.",
        options: [
          { label: "Yes", cause: "pale-overfermented" },
          { label: "No; dough rushed, bland, salt not ticked", cause: "salt-forgotten" },
          { label: "No; fermentation normal", to: "oven" },
        ],
      },
      oven: {
        q: "Oven thermometer and bake time?",
        check: "Oven thermometer against the dial; bake time against the sheet.",
        options: [
          { label: "Thermometer below the dial", cause: "oven-below-dial" },
          { label: "Oven right; bake stopped before the sheet's time", cause: "pale-short-bake" },
        ],
      },
    },
  },
  dark: {
    family: "bread",
    label: "Crust too dark or burnt",
    fr: "croûte trop foncée",
    lesson: "16.3",
    start: "where",
    nodes: {
      where: {
        q: "Where is it dark, and on how many pieces?",
        check: "Position of the dark pieces in the oven; base or top; crumb.",
        options: [
          { label: "Base only (top normal or pale), on one deck or shelf", cause: "ferre" },
          { label: "Only some pieces, by their place in the oven", cause: "uneven-colour" },
          { label: "All over, reddish, small dense loaf", cause: "dark-under" },
          { label: "All over, normal volume", to: "core" },
        ],
      },
      core: {
        q: "Core temperature of a test loaf?",
        check: "Probe the centre: at least 93 °C, baguettes 96-98 °C.",
        options: [
          { label: "Below 93 °C, centre gummy", cause: "dark-gummy" },
          { label: "93 °C or more; oven above its setting or bake too long", cause: "dark-hot" },
        ],
      },
    },
  },
  dull: {
    family: "bread",
    label: "Dull, matte crust",
    fr: "croûte terne",
    lesson: "16.3",
    start: "skin",
    nodes: {
      skin: {
        q: "Was the skin dry or cracked before baking?",
        check: "Skin felt at loading; were the pieces covered?",
        options: [
          { label: "Yes, pieces left uncovered", cause: "croutee" },
          { label: "No", to: "steam" },
        ],
      },
      steam: {
        q: "Steam record and proof?",
        check: "Steam at loading (home: preheated tray, 100-150 mL hot water, fan off); poke test.",
        options: [
          { label: "No or little steam, fan on, or water on a cold tray", cause: "terne-steam" },
          { label: "Steam normal; pieces over-proofed, flat and pale", cause: "terne-overproof" },
        ],
      },
    },
  },
  blisters: {
    family: "bread",
    label: "Blisters on the crust",
    fr: "pain cloqué",
    lesson: "16.3",
    start: "process",
    nodes: {
      process: {
        q: "Was the dough retarded or blocked?",
        check: "Production sheet; surface of the pieces at loading.",
        options: [
          { label: "Yes, and the pieces had droplets at loading", cause: "cloque-retard" },
          { label: "No, direct process; heavy steam left long", cause: "cloque" },
        ],
      },
    },
  },
  gummy: {
    family: "bread",
    label: "Gummy, sticky crumb",
    fr: "mie collante",
    lesson: "16.4",
    start: "core",
    nodes: {
      core: {
        q: "Core temperature at the end of the bake?",
        check: "Probe the core: at least 93 °C.",
        options: [
          { label: "Below about 93 °C, crust dark", cause: "dark-gummy" },
          { label: "Below about 93 °C or not measured, crust normal", cause: "gummy-underbaked" },
          { label: "93 °C or more", to: "cut" },
        ],
      },
      cut: {
        q: "Cut how long after the oven?",
        check: "Time between oven and knife.",
        options: [
          { label: "Under 1 hour (rye-rich: under 2 hours)", cause: "gummy-cut-warm" },
          { label: "After full cooling; very wet, wholemeal or rye-rich dough", cause: "gummy-wet" },
        ],
      },
    },
  },
  "crumb-colour": {
    family: "bread",
    label: "Crumb white or tight and regular, bland",
    fr: "mie blanche, serrée",
    lesson: "16.4",
    start: "colour",
    nodes: {
      colour: {
        q: "Colour of the crumb?",
        check: "Cut beside a good loaf: cream or white?",
        options: [
          { label: "White, cottony", to: "product" },
          { label: "Cream, but tight and regular (tradition)", cause: "tight-tradition" },
        ],
      },
      product: {
        q: "Which bread, and what does the mixing record show?",
        check: "Mixing times and speeds; salt timing; autolyse.",
        options: [
          { label: "Pain courant; long second speed, salt late", cause: "white-pc" },
          { label: "Tradition; no autolyse, second speed", cause: "white-tradition" },
        ],
      },
    },
  },
  holes: {
    family: "bread",
    label: "Holes, specks or lumps in the crumb",
    fr: "défauts de mie",
    lesson: "16.4",
    start: "what",
    nodes: {
      what: {
        q: "What exactly, and where?",
        check: "Position in the cut section: along a fold or seam, or everywhere.",
        options: [
          { label: "Large holes just under the top crust, coarse and sour", cause: "holes-overfermented" },
          { label: "One tunnel along the seam or a fold", cause: "tunnel" },
          { label: "Dry flour specks spread through the crumb", cause: "specks" },
          { label: "Lumps of old dough", cause: "lumps" },
        ],
      },
    },
  },
  "dough-shaping": {
    family: "bread",
    label: "Dough fights or slumps at shaping",
    fr: "excès / manque de force",
    lesson: "16.2",
    start: "feel",
    nodes: {
      feel: {
        q: "How does the dough behave?",
        check: "Feel at dividing and shaping.",
        options: [
          { label: "Springs back, shrinks, tears", cause: "exces-force-dough" },
          { label: "Slackens and spreads", to: "slack" },
          { label: "Hard, the mixer laboured", cause: "firm-dough" },
        ],
      },
      slack: {
        q: "What do the sheet and records show?",
        check: "Salt tick, pre-ferment state, dough temperature and mixing time, flour and water.",
        options: [
          { label: "Salt not ticked; dough rushed, bland", cause: "salt-forgotten" },
          { label: "Pre-ferment collapsed, alcohol or vinegar smell", cause: "overripe-preferment" },
          { label: "Dough warm at the divider after a long mixing", cause: "sticky-warm" },
          { label: "Records normal; weak flour or extra water", cause: "manque-force" },
        ],
      },
    },
  },
  keeping: {
    family: "bread",
    label: "Off taste or keeps badly",
    fr: "goût, conservation",
    lesson: "16.4",
    start: "what",
    nodes: {
      what: {
        q: "What is wrong?",
        check: "Taste, smell the flour, storage place and time of bagging.",
        options: [
          { label: "Stales in a day", to: "stale" },
          { label: "Soft crust, mould after a day", cause: "mould" },
          { label: "Campagne slack and very sour", cause: "sour-levain" },
          { label: "Bitter, \"paint\" taste in wholemeal bread", cause: "rancid" },
          { label: "Bland, and the dough rushed", cause: "salt-forgotten" },
        ],
      },
      stale: {
        q: "Storage and seeds?",
        check: "Where it was kept; soaker record.",
        options: [
          { label: "Kept in the fridge", cause: "stale-fridge" },
          { label: "Seeded bread, seeds added dry", cause: "stale-seeds" },
        ],
      },
    },
  },
  // ===== viennoiserie =====
  "butter-leak": {
    family: "viennoiserie",
    label: "Butter on the tray, flat or greasy croissants",
    fr: "le beurre coule",
    lesson: "16.5",
    start: "many",
    nodes: {
      many: {
        q: HOW_MANY,
        check: HOW_MANY_CHECK,
        options: [
          { label: "Every tray of the batch", to: "probe" },
          { label: "Only the first trays, baked earliest", to: "probe" },
          { label: "Only the tray that waited while another baked", to: "waited" },
        ],
      },
      waited: {
        q: "Where did that tray wait?",
        check: "Its place during the wait: on the oven, near the deck, in the cool?",
        options: [
          { label: "On top of the oven or next to the deck", cause: "tray-waiting" },
          { label: "In a cool place; it went in before almost doubling", cause: "underproof-croissant" },
        ],
      },
      probe: {
        q: "Proof temperature, read with a probe?",
        check: "Probe in a glass of water in the cabinet: 24-26 °C, never above about 27 °C.",
        options: [
          { label: "Above about 27 °C", to: "where" },
          { label: "24-26 °C", to: "time" },
        ],
      },
      where: {
        q: "Why was the proof warm?",
        check: "Cabinet setting and who else uses it.",
        options: [
          { label: "Cabinet set warmer for bread proofing at the same time", cause: "shared-cabinet" },
          { label: "Warm kitchen or cabinet, croissants only", cause: "warm-proof" },
        ],
      },
      time: {
        q: "Proof time and look at loading?",
        check: "Proof time against 1 h 30-2 h 30; almost doubled, wobble, visible layers?",
        options: [
          { label: "Short; not yet doubled; small, tight, split along a turn", cause: "underproof-croissant" },
          { label: "Full proof; the sheet tore during the turns", cause: "torn-layers" },
        ],
      },
    },
  },
  layers: {
    family: "viennoiserie",
    label: "Layers wrong in the cut section",
    fr: "feuilletage",
    lesson: "16.5",
    start: "cut",
    nodes: {
      cut: {
        q: "Cut a croissant lengthwise after 30-60 min of cooling. What do you see?",
        check: "Cut section with a serrated knife.",
        options: [
          { label: "No distinct layers: greasy or bready", to: "nolayers" },
          { label: "Thick, uneven layers, butter patches", to: "butter" },
          { label: "White dry streaks following the folds", cause: "streaks" },
        ],
      },
      nolayers: {
        q: "Lamination log: temperatures, turns, sheeter?",
        check: "Butter and room temperature; turn marks; sheeter steps.",
        options: [
          { label: "Butter above about 15 °C or room above 24 °C", cause: "butter-melts" },
          { label: "Temperatures fine; 4 single turns marked", cause: "bready" },
          { label: "Sheeter gap reduced in big jumps", cause: "crushed" },
        ],
      },
      butter: {
        q: "Butter temperature at the lock-in and turns?",
        check: "Probe the butter: about 13 °C, plastic 12-15 °C, brittle below about 10 °C.",
        options: [
          { label: "Well below 12 °C; brittle, edges cracked", cause: "butter-breaks" },
          { label: "12-15 °C; plaque not square, rolled unevenly", cause: "uneven-layers" },
        ],
      },
    },
  },
  "v-shape": {
    family: "viennoiserie",
    label: "Shape faults: shrink, unroll, bend",
    fr: "façonnage",
    lesson: "16.5",
    start: "when",
    nodes: {
      when: {
        q: "When did the shape go wrong?",
        check: "Watch the pieces right after cutting and in the oven.",
        options: [
          { label: "Triangles shrank right after cutting", cause: "shrink" },
          { label: "Croissants bent or twisted", cause: "distorted" },
          { label: "Unrolled in the oven", to: "product" },
          { label: "Chocolate showing at the ends", cause: "choc-ends" },
        ],
      },
      product: {
        q: "Which product, and where was the end?",
        check: "Position of the tip or the last edge.",
        options: [
          { label: "Croissant; tip on top or at the side", cause: "unroll" },
          { label: "Pain au chocolat; seam on the side", cause: "pac-seam" },
        ],
      },
    },
  },
  "v-colour": {
    family: "viennoiserie",
    label: "Colour or finish faults",
    fr: "dorure, cuisson",
    lesson: "16.5",
    start: "look",
    nodes: {
      look: {
        q: "What do you see?",
        check: "Crease colour, egg-wash marks, oven thermometer.",
        options: [
          { label: "Top coloured, creases pale, collapse on cooling", cause: "pale-creases" },
          { label: "Pale or patchy all over", cause: "pale-patchy" },
          { label: "Layers glued at the edges, uneven rise", cause: "glued" },
        ],
      },
    },
  },
  "v-volume": {
    family: "viennoiserie",
    label: "Poor lift, dense or flat",
    fr: "manque de développement",
    lesson: "16.5",
    start: "what",
    nodes: {
      what: {
        q: "Fresh or frozen, and what do the records show?",
        check: "Turn marks, proof time, freezing record and dates.",
        options: [
          { label: "Fresh; turns correct, proof short", cause: "poor-lift" },
          { label: "Fresh; bready crumb, 4 single turns", cause: "bready" },
          { label: "Frozen pieces flat and slack", cause: "frozen-flat" },
          { label: "Frozen pieces with pale, dry patches", cause: "freezer-burn" },
        ],
      },
    },
  },
  // ===== pâte levée =====
  greasy: {
    family: "pate-levee",
    label: "Rich dough greasy, will not come together",
    fr: "pâte grasse",
    lesson: "16.5",
    start: "when",
    nodes: {
      when: {
        q: "Mixing record: when did the butter go in, and at what temperature?",
        check: "Mixing record; butter and dough temperatures.",
        options: [
          { label: "At the start, before the gluten developed", cause: "greasy-early" },
          { label: "After the gluten, but soft or into a warm dough", cause: "greasy-warm" },
        ],
      },
    },
  },
  braid: {
    family: "pate-levee",
    label: "Braid faults",
    fr: "tresse",
    lesson: "16.5",
    start: "what",
    nodes: {
      what: {
        q: "What is wrong with the braid?",
        check: "Strand tension, apprêt time, strand weights.",
        options: [
          { label: "Split along the strands", cause: "braid-split" },
          { label: "Thick at one end, thin at the other", cause: "braid-uneven" },
        ],
      },
    },
  },
  tin: {
    family: "pate-levee",
    label: "Pain de mie shape or colour",
    fr: "pain de mie",
    lesson: "16.3",
    start: "what",
    nodes: {
      what: {
        q: "What is wrong?",
        check: "Unmoulding time, core temperature, pâton against tin volume, oven setting.",
        options: [
          { label: "Sides caved in", cause: "mie-caved" },
          { label: "Rounded corners, or the lid forced up", cause: "mie-weight" },
          { label: "Dark top and corners, pale sides", cause: "mie-dark" },
        ],
      },
    },
  },
  "enriched-crust": {
    family: "pate-levee",
    label: "Fillings or finish: wet bases, runny cream, streaky crust",
    fr: "garnitures, dorure",
    lesson: "16.5",
    start: "what",
    nodes: {
      what: {
        q: "What do you see?",
        check: "Cooking record of the cream; bake time; steam record.",
        options: [
          { label: "Crème pâtissière runny the next day", cause: "creme-runny" },
          { label: "Pains aux raisins pale, wet bases", cause: "raisins-wet" },
          { label: "Viennois streaky, dull crust", cause: "viennois-dull" },
        ],
      },
    },
  },
};

/** Causes reachable from a node of a symptom's tree. */
export function reachable(symptomId, nodeId) {
  const s = SYMPTOMS[symptomId];
  const out = new Set();
  const seen = new Set();
  const walk = (id) => {
    if (seen.has(id)) return;
    seen.add(id);
    for (const o of s.nodes[id].options) {
      if (o.cause) out.add(o.cause);
      else walk(o.to);
    }
  };
  walk(nodeId ?? s.start);
  return [...out];
}

/** Every complete path of a tree: [{ path: [{node, option}], cause }]. */
export function allPaths(symptomId) {
  const s = SYMPTOMS[symptomId];
  const paths = [];
  const walk = (id, trail) => {
    if (trail.some((t) => t.node === id)) throw new Error(`loop at ${symptomId}/${id}`);
    s.nodes[id].options.forEach((o, i) => {
      const t = [...trail, { node: id, option: i }];
      if (o.cause) paths.push({ path: t, cause: o.cause });
      else walk(o.to, t);
    });
  };
  walk(s.start, []);
  return paths;
}

/** Lessons for a diagnosis: the cause's lessons, then the module 16 lesson of the symptom. */
export function lessonsFor(causeId, symptomId) {
  const ids = [...CAUSES[causeId].lessons];
  const s = symptomId && SYMPTOMS[symptomId];
  if (s && !ids.includes(s.lesson)) ids.push(s.lesson);
  return ids;
}

// ---------- case drill ----------
// Each case: production records, the learner picks the cause; `answer` is an option id and
// `cause` the CAUSES entry it matches (for fix, prevention and lessons).

export const CASES = [
  {
    id: "second-load",
    family: "bread",
    title: "Six bâtards back from the shop",
    lessonOf: "16.1",
    story: "Saturday. The shop sends back 6 of the 30 bâtards of pain courant (PC-02) baked this morning: about 2 cm lower and 1.5 cm wider than the others, pale and dull on top, cuts flat with no ear, large holes just under the top crust, slightly sour. The other 24 are fine. Load 1: 18 bâtards at 6:15; load 2: 12 at 6:40, the 6 faulty ones from the top shelf of the trolley.",
    cols: ["Record", "Load 1", "Load 2"],
    records: [
      ["Dough after mixing", "24 °C (TPV 24 °C)", "same dough"],
      ["Shaped", "5:00-5:20", "5:00-5:20"],
      ["Apprêt", "cabinet 25 °C", "cabinet 25 °C, top shelf"],
      ["Apprêt time", "55 min", "1 h 20"],
      ["Poke test", "fills slowly", "not written"],
      ["Oven (thermometer)", "250 °C", "250 °C"],
    ],
    options: [
      { id: "oven", text: "Oven too cool for load 2", feedback: "Both loads read 250 °C on the thermometer: the oven is ruled out." },
      { id: "soft", text: "Dough too soft or weak", feedback: "Load 1 came from the same dough and was fine: a dough fault would show on every piece." },
      { id: "second", text: "Second load over-proofed", feedback: "" },
      { id: "warm", text: "Dough mixed too warm", feedback: "The dough read 24 °C on a 24 °C TPV, and load 1 was fine." },
    ],
    answer: "second",
    cause: "second-load",
    evidence: "Only some pieces → order or waiting. Same dough, same oven; load 2 waited 25 minutes longer at the same 25 °C, and flat, pale, flat cuts, holes under the crust and sour smell all point to over-proofing. The top shelf is the warmest place in the cabinet, so those 6 were worst.",
  },
  {
    id: "new-flour",
    family: "bread",
    title: "Every baguette burst since Monday",
    lessonOf: "16.2",
    story: "Since Monday all 72 PC-02 baguettes of both days are torn along one side, round in section (6.5 cm high instead of 5.5 cm), cuts opened only 3-4 mm. Shaping note: \"pâte nerveuse, se rétracte\" (springy, shrinks back). Last week's were fine.",
    cols: ["Record", "Last week", "Monday-Tuesday"],
    records: [
      ["Flour", "T55, mill A", "T55, mill B: wheat flour, ascorbic acid, enzymes"],
      ["Hydration", "64 %", "64 %"],
      ["Dough temperature", "24 °C", "24 °C"],
      ["Détente", "20 min", "20 min"],
      ["Poke test at loading", "fills slowly", "fills slowly"],
      ["Steam, oven", "normal, 250 °C", "normal, 250 °C"],
    ],
    options: [
      { id: "under", text: "Under-proofed", feedback: "The poke test filled slowly at loading: the pieces were ready, not young." },
      { id: "force", text: "Excès de force from the new improved flour", feedback: "" },
      { id: "steam", text: "Too little steam", feedback: "Steam and oven are recorded as unchanged." },
      { id: "cold", text: "Dough too cold", feedback: "The dough read 24 °C both weeks." },
    ],
    answer: "force",
    cause: "exces-force",
    evidence: "Every piece, two days → a cause shared by the whole dough. The only change in the records is the flour: an improved flour with ascorbic acid, stronger and thirstier. With a correct poke test, a burst side and a dough that shrank at shaping, it is excès de force. One change at a time: +2 points of water first, then an autolyse.",
  },
  {
    id: "blisters-blocked",
    family: "bread",
    title: "Blisters on the first load of blocked traditions",
    lessonOf: "16.3",
    story: "Traditions shaped on Sunday, blocked in the cabinet (4 °C overnight, warming from 3:00, ready at 5:30). First load of 24: many small blisters (2-4 mm), crust matte; volume and cuts normal. Second load of 24, 25 minutes later: clean and shiny.",
    cols: ["Record", "Load 1", "Load 2"],
    records: [
      ["Out of the cabinet", "5:30", "5:30"],
      ["Loaded", "5:32", "5:57"],
      ["Surface at loading", "\"humide, gouttelettes\" (droplets)", "\"sèche au toucher\" (dry)"],
      ["Cabinet at 5:30", "25 °C, 92 % RH", "same"],
      ["Steam", "normal", "normal"],
    ],
    options: [
      { id: "steam", text: "Too much steam", feedback: "Both loads had the same steam; only load 1 blistered." },
      { id: "over", text: "Over-fermented", feedback: "Volume and cuts are normal, and load 2 waited longer and was fine." },
      { id: "cond", text: "Condensation from a too-humid warming phase, loaded wet", feedback: "" },
      { id: "hot", text: "Oven too hot", feedback: "Nothing in the records separates the loads by oven, and the colour is not the fault." },
    ],
    answer: "cond",
    cause: "cloque-retard",
    evidence: "One load only, same dough → a cause at the moment of loading. Droplets on load 1 only; 92 % RH is above the usual 75-85 %. Warm, humid air condensed on the cold pieces; load 2 dried during its 25-minute wait.",
  },
  {
    id: "white-tradition",
    family: "bread",
    title: "Traditions that \"taste of nothing\"",
    lessonOf: "16.4",
    story: "All 40 traditions of Thursday: crumb white instead of cream, fine regular holes, cottony, little aroma; volume normal, crust a little paler. Wednesday's: cream crumb, irregular holes.",
    cols: ["Record", "Wednesday", "Thursday"],
    records: [
      ["Mixed by", "head baker", "new apprentice"],
      ["Autolyse", "30 min", "none"],
      ["Mixing", "1st speed only, 8 min", "1st speed 4 min + 2nd speed 6 min"],
      ["Salt", "at the start", "at the end"],
      ["Shaping", "head baker", "head baker"],
      ["Dough temperature", "23 °C", "25.5 °C"],
    ],
    options: [
      { id: "degas", text: "Degassed at shaping", feedback: "Same baker shaped both days, and degassing leaves a tight but still cream crumb: it does not bleach it." },
      { id: "oxid", text: "Over-oxidised by intensive mixing, no autolyse, salt late", feedback: "" },
      { id: "over", text: "Over-fermented", feedback: "Volume is normal and the crumb is fine and regular, not coarse and sour." },
      { id: "additive", text: "An additive in the flour", feedback: "Same flour both days; the mixing record is what changed." },
    ],
    answer: "oxid",
    cause: "white-tradition",
    evidence: "Every piece → the whole dough. Only oxidation bleaches the crumb. Second speed for 6 minutes, no autolyse and late salt are the recipe for over-oxidation; the warmer dough (friction) agrees.",
  },
  {
    id: "croissant-underproof",
    family: "viennoiserie",
    title: "Butter on the first croissant trays",
    lessonOf: "16.5",
    story: "Trays 1-2 (30 croissants): a thin ring of butter around each piece, croissants about 20 % shorter, several split along a turn, cut section dense in the centre. Trays 3-4, baked 40 minutes later: normal. The tourier says: \"the cabinet is too hot again\".",
    cols: ["Record", "Trays 1-2", "Trays 3-4"],
    records: [
      ["Cabinet (probe in water)", "25 °C", "25 °C"],
      ["Into the cabinet", "4:30", "4:30"],
      ["Out to the oven", "5:30 (1 h)", "6:10 (1 h 40)"],
      ["Proof note", "\"pas encore doublés\" (not yet doubled)", "\"presque doublés, tremblent\""],
      ["Oven", "ready at 5:30", "same"],
    ],
    options: [
      { id: "warm", text: "Cabinet too warm", feedback: "The probe read 25 °C, inside 24-26 °C, and trays 3-4 in the same cabinet were fine. Cooling the cabinet would make the next batch even more under-proofed." },
      { id: "under", text: "Under-proofed", feedback: "" },
      { id: "cold", text: "Butter too cold at lamination", feedback: "Same block for all four trays; trays 3-4 had normal layers." },
      { id: "turns", text: "Too many turns", feedback: "Same block for all trays; too many turns would show on every croissant." },
    ],
    answer: "under",
    cause: "underproof-croissant",
    evidence: "Only the first trays → time or order. One hour against the sheet's 1 h 30-2 h 30, \"not yet doubled\", small, tight croissants split along a turn: they went in because the oven was free, not because they were ready.",
  },
  {
    id: "january-cold",
    family: "bread",
    title: "January baguettes: small and reddish",
    lessonOf: "16.1",
    story: "Pain courant in January. Baguettes small, dark reddish crust, torn along the side, tight crumb. All pieces.",
    cols: ["Record", "Sheet", "Today"],
    records: [
      ["Dough temperature", "TPV 24 °C", "20 °C"],
      ["Pointage and apprêt", "sheet times", "sheet times, not adapted"],
      ["Water", "calculated", "tap water"],
      ["Oven (thermometer)", "250 °C", "250 °C"],
    ],
    options: [
      { id: "cold", text: "Under-fermented by a cold dough", feedback: "" },
      { id: "over", text: "Over-proofed", feedback: "Over-proofed bread is flat and pale, not small and reddish." },
      { id: "force", text: "Excès de force", feedback: "Possible for the torn side alone, but it does not explain the reddish crust and the cold dough on the log." },
      { id: "hot", text: "Oven too hot", feedback: "The thermometer reads the setting, and a hot oven does not make the loaf small with a tight crumb." },
    ],
    answer: "cold",
    cause: "cold-dough",
    evidence: "4 °C under target is about 1.07^4 ≈ 1.3 times slower: the sheet's times left the dough young. Small, reddish (sugars left), burst side and tight crumb on every piece all point to it. Calculate the water (Module 5) and judge by the poke test.",
  },
  {
    id: "tray-on-oven",
    family: "viennoiserie",
    title: "Croissant tray 2 in a pool of butter",
    lessonOf: "16.1",
    story: "Croissants, two trays from the same block. Tray 1 fine. Tray 2: pool of butter on the paper, flat croissants.",
    cols: ["Record", "Tray 1", "Tray 2"],
    records: [
      ["Block, turns", "same block, 3 single turns", "same"],
      ["Proof", "24-26 °C, almost doubled", "same, then 20 min on top of the oven while tray 1 baked"],
      ["Oven", "190-200 °C", "190-200 °C"],
    ],
    options: [
      { id: "under", text: "Under-proofed", feedback: "Tray 2 had the same proof as tray 1 and then waited longer: it was not young." },
      { id: "waiting", text: "Butter melted while the tray waited on the oven", feedback: "" },
      { id: "turns", text: "Too many turns", feedback: "Same block for both trays; tray 1 is fine." },
      { id: "oven", text: "Oven too cool", feedback: "Same oven for both trays." },
    ],
    answer: "waiting",
    cause: "tray-waiting",
    evidence: "Only one tray → a place or waiting cause. The top of the oven is far above 27 °C: the butter melted before the bake. Keep the second tray cool (24-26 °C or the fridge) while the first bakes.",
  },
  {
    id: "campagne-cut-warm",
    family: "bread",
    title: "Sticky campagne",
    lessonOf: "16.1",
    story: "Pain de campagne with rye. Crust well coloured; crumb sticky and dense near the base.",
    cols: ["Record", "Value"],
    records: [
      ["Bake", "sheet time, good colour"],
      ["Core temperature", "not recorded"],
      ["Cut", "15 minutes after leaving the oven"],
    ],
    options: [
      { id: "warm", text: "Cut warm (under-baking not ruled out)", feedback: "" },
      { id: "water", text: "Too much water in the dough", feedback: "Possible only after full cooling; this loaf was cut after 15 minutes, which explains the stickiness first." },
      { id: "under", text: "Under-fermented", feedback: "Nothing in the records points to fermentation; the crust coloured well." },
      { id: "oven", text: "Oven too cool", feedback: "The crust is well coloured at the sheet's time." },
    ],
    answer: "warm",
    cause: "gummy-cut-warm",
    evidence: "A rye-containing crumb sets slowly: cut after 15 minutes it is sticky whatever the bake. The missing core reading means under-baking cannot be ruled out. Probe the core (at least 93 °C) and cool 1-2 hours before cutting.",
  },
  {
    id: "summer-kitchen",
    family: "bread",
    title: "August at home: flat, pale, sour",
    lessonOf: "16.1",
    story: "Home kitchen in Tel Aviv, August. Bâtards kneaded by hand for 10 minutes, tap water straight from the tap. All pieces flat, pale, sour, with large holes under the top crust.",
    cols: ["Record", "Value"],
    records: [
      ["Kitchen", "30 °C"],
      ["Flour", "29 °C"],
      ["Tap water", "28 °C, used as it came"],
      ["Friction factor (hand kneading, 3 factors)", "about 2 °C × 3 = 6"],
      ["TPV / dough after mixing", "24 °C / 31 °C"],
      ["Pointage and apprêt", "sheet times"],
      ["Salt", "ticked"],
      ["Oven", "240 °C dial, 240 °C thermometer; steam tray preheated, 150 mL hot water"],
    ],
    options: [
      { id: "oven", text: "Oven too cool", feedback: "The thermometer reads the dial and steam was given." },
      { id: "weak", text: "Weak flour or too much water", feedback: "That gives a flat loaf with a tight crumb, not coarse and sour." },
      { id: "warm", text: "Over-fermented: dough too warm, times not adapted", feedback: "" },
      { id: "salt", text: "Salt forgotten", feedback: "The salt is ticked." },
    ],
    answer: "warm",
    cause: "overfermented-warm",
    evidence: "Water needed: base 24 × 3 = 72; 72 − 29 − 30 − 6 = 7 °C, not 28 °C. The dough came out 7 °C over target, about 1.07^7 ≈ 1.6 times faster, so the sheet's times over-fermented it: flat, pale (sugars used up), coarse and sour on every piece.",
  },
  {
    id: "home-oven-dial",
    family: "bread",
    title: "Pale bread from a new oven",
    lessonOf: "16.3",
    story: "Home baguettes, all pieces: pale, weak spring, cuts open a little. Fermentation looked right.",
    cols: ["Record", "Value"],
    records: [
      ["Dough after mixing", "24 °C (TPV 24 °C)"],
      ["Poke test at loading", "fills slowly"],
      ["Smell, crumb", "normal, not sour"],
      ["Oven", "dial 240 °C; new oven thermometer 220 °C"],
      ["Preheat", "until the light went off, 20 min"],
      ["Steam", "metal tray preheated on the lowest shelf, 150 mL hot water, fan off"],
    ],
    options: [
      { id: "over", text: "Over-fermented", feedback: "The dough was on target, the poke test was right and the bread is not sour." },
      { id: "dial", text: "Oven below its dial", feedback: "" },
      { id: "steam", text: "No steam", feedback: "The home steam method was followed." },
      { id: "under", text: "Under-proofed", feedback: "The poke test filled slowly: ready." },
    ],
    answer: "dial",
    cause: "oven-below-dial",
    evidence: "The thermometer reads 20 °C under the dial (home ovens are often 10-20 °C off), and 20 minutes is short: preheat 45-60 minutes by the thermometer, not the light.",
  },
  {
    id: "home-steam",
    family: "bread",
    title: "Matte grey crust at home",
    lessonOf: "16.3",
    story: "Home bâtards, all pieces: crust matte and greyish, cuts barely open, volume a little low; colour fairly even.",
    cols: ["Record", "Value"],
    records: [
      ["Dough, poke test", "on target; fills slowly"],
      ["Pieces during apprêt", "covered with a damp towel; skin soft at loading"],
      ["Oven", "250 °C by the thermometer, fan on"],
      ["Steam", "cold tray slid in at loading, water poured on it"],
    ],
    options: [
      { id: "over", text: "Over-proofed", feedback: "The poke test was right." },
      { id: "steam", text: "No effective steam", feedback: "" },
      { id: "skin", text: "Pâte croûtée", feedback: "The pieces were covered and the skin was soft at loading." },
      { id: "cool", text: "Oven too cool", feedback: "250 °C by the thermometer." },
    ],
    answer: "steam",
    cause: "terne-steam",
    evidence: "Water on a cold tray makes little steam, and the fan blows it away. Home method: metal tray preheated on the lowest shelf, 100-150 mL hot water at loading, fan off, steam out at about 10 minutes.",
  },
  {
    id: "butter-cold",
    family: "viennoiserie",
    title: "Croissants with butter patches",
    lessonOf: "16.5",
    story: "Croissants, whole batch: cut section with thick, uneven layers, greasy patches and pale streaks of butter. Log note at the first turn: \"beurre cassant, bords fendus\" (butter brittle, edges cracked).",
    cols: ["Record", "Value"],
    records: [
      ["Détrempe", "20 °C"],
      ["Butter at the lock-in", "6 °C, straight from the fridge"],
      ["Turns", "3 single turns"],
      ["Proof", "25 °C, 2 h, almost doubled"],
      ["Oven", "195 °C"],
    ],
    options: [
      { id: "cold", text: "Butter too cold and hard for the dough", feedback: "" },
      { id: "warm", text: "Butter too warm, melted into the dough", feedback: "Melted butter gives a greasy dough with no layers, not thick patches; the butter was at 6 °C." },
      { id: "turns", text: "Too many turns", feedback: "Three single turns is the sheet." },
      { id: "proof", text: "Proof too warm", feedback: "25 °C is inside 24-26 °C." },
    ],
    answer: "cold",
    cause: "butter-breaks",
    evidence: "Butter at 6 °C is far below the plastic 12-15 °C (about 13 °C at the lock-in) and brittle: it cracked into flakes instead of spreading, as the log note says.",
  },
  {
    id: "shared-cabinet",
    family: "viennoiserie",
    title: "Every croissant tray leaking",
    lessonOf: "16.5",
    story: "Bakery, Saturday rush. All four trays of croissants: pool of butter, flat greasy croissants, fried bottoms.",
    cols: ["Record", "Value"],
    records: [
      ["Cabinet", "set to 30 °C for the bread apprêt"],
      ["Croissants in", "same cabinet, 1 h 45"],
      ["Proof note", "almost doubled"],
      ["Lamination", "butter 13 °C, 3 single turns"],
    ],
    options: [
      { id: "under", text: "Under-proofed", feedback: "1 h 45 and almost doubled: the proof time was right." },
      { id: "shared", text: "Cabinet set warmer for bread", feedback: "" },
      { id: "broke", text: "Butter broke at lamination", feedback: "Butter at 13 °C is right; broken butter gives thick patches, not a pool." },
      { id: "egg", text: "Egg wash in the edges", feedback: "That glues the layers; it does not melt the butter." },
    ],
    answer: "shared",
    cause: "shared-cabinet",
    evidence: "30 °C is above the 27 °C limit for croissants: the butter melted in the proof. One setting for the cabinet when it holds croissants (24-26 °C).",
  },
  {
    id: "brioche-greasy",
    family: "pate-levee",
    title: "Brioche dough that will not come together",
    lessonOf: "16.5",
    story: "Brioche, summer. After 15 minutes of mixing the dough is greasy, shiny and will not come off the bowl.",
    cols: ["Record", "Value"],
    records: [
      ["Butter", "22 °C, soft, all added at the start with the other ingredients"],
      ["Dough after mixing", "29 °C"],
      ["Water", "tap water"],
    ],
    options: [
      { id: "early", text: "Butter added before the gluten developed", feedback: "" },
      { id: "water", text: "Too much water", feedback: "Nothing in the weighing points to water; the mixing record does." },
      { id: "salt", text: "Salt forgotten", feedback: "A salt fault makes a dough rush and taste bland; it does not stop it coming together." },
      { id: "flour", text: "Weak flour", feedback: "The record shows the butter's timing and temperature first." },
    ],
    answer: "early",
    cause: "greasy-early",
    evidence: "Butter in at the start coats the flour before the gluten forms, and at 22 °C into a dough at 29 °C it is too warm as well. Gluten first; butter at 15-18 °C in parts; fridge 15-20 min, then knead again.",
  },
  {
    id: "mie-caved",
    family: "pate-levee",
    title: "Pain de mie with caved-in sides",
    lessonOf: "16.3",
    story: "Pain de mie, lidded tins. Square corners, good colour, but the sides caved in after cooling.",
    cols: ["Record", "Value"],
    records: [
      ["Pâton", "tin volume × 0.35"],
      ["Core at the end of the bake", "95 °C"],
      ["Unmoulded", "30 minutes after leaving the oven"],
    ],
    options: [
      { id: "under", text: "Under-baked", feedback: "The core read 95 °C, above the 90 °C needed." },
      { id: "late", text: "Unmoulded late", feedback: "" },
      { id: "weight", text: "Too much dough for the tin", feedback: "The pâton matches the tin, and the corners are square." },
      { id: "hot", text: "Oven too hot", feedback: "Colour is good." },
    ],
    answer: "late",
    cause: "mie-caved",
    evidence: "Baked through (95 °C), but 30 minutes in the tin kept the steam in and softened the sides. Unmould at once.",
  },
];

// ---------- presets ----------

export const PRESETS = {
  bread: {
    title: "Diagnose: a flat bread (16.2)",
    mode: "diagnose",
    family: "bread",
    symptom: "flat",
    note: "A flat, wide loaf has five possible stages behind it. Answer the evidence questions from your records, not from the look.",
  },
  viennoiserie: {
    title: "Diagnose: butter on the croissant tray (16.5)",
    mode: "diagnose",
    family: "viennoiserie",
    symptom: "butter-leak",
    note: "Butter on the paper has two causes with opposite fixes: a warm proof or an under-proof. Read the probe before you change the cabinet.",
  },
  "pate-levee": {
    title: "Diagnose: pâte levée and tin breads",
    mode: "diagnose",
    family: "pate-levee",
    symptom: "greasy",
    note: "Enriched doughs: the butter's timing and temperature decide most mixing faults.",
  },
  drill: {
    title: "Case drill: production records",
    mode: "drill",
    case: CASES[0].id,
    note: "Read the records, choose the probable cause, then check. The feedback shows the evidence that decides.",
  },
};
export const DEFAULT_PRESET = "bread";
