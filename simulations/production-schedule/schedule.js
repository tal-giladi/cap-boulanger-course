// Production schedule (organigramme) as taught in Module 14 (pure functions, no DOM).
//   - every stage of every product on one timeline; hands time vs dough time (14.1)
//   - backward planning from the deadline: cooling, baking load by load, apprêt, shaping... (14.1)
//   - one pair of hands, one mixer, oven loads, preheat and temperature changes, one cabinet setting (14.2, 14.3)
//   - fermentation about 7 % faster or slower per °C (04.2): expected time × 1.07^(reference − actual)
//   - a waiting group is slowed by proofing cooler: ΔT = ln(t2 ÷ t1) ÷ ln 1.07 (14.1)
// Times are minutes after midnight of the production day (negative = the evening before).

export const RATE = 1.07;
export const LOAD_GAP = 5; // minutes between loads to unload, score, load and steam (14.1)
export const TEMP_TOLERANCE = 5; // °C: an oven within 5 °C of the setting is "at temperature"
export const LAMINATED_MAX = 27; // °C: laminated dough proofs below about 27 °C (11.6)
export const SPARE_WANTED = 15; // minutes spare before the deadline (organigramme template)
const COLD_START = 20; // °C of a cold oven

// ---------- time helpers ----------

/** "6:35" → 395; "-1 19:40" or "eve 19:40" → 19:40 the evening before (−260). */
export function parseTime(t) {
  if (typeof t === "number") return t;
  let s = String(t).trim();
  let day = 0;
  const m0 = s.match(/^(eve|-1)\s+/i);
  if (m0) {
    day = -1;
    s = s.slice(m0[0].length);
  }
  const m = s.match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return NaN;
  return day * 1440 + Number(m[1]) * 60 + Number(m[2]);
}

/** 395 → "6:35"; −260 → "eve 19:40"; 1470 → "+1 0:30". */
export function fmtTime(min) {
  if (!Number.isFinite(min)) return "—";
  const r = Math.round(min);
  const day = Math.floor(r / 1440);
  const m = r - day * 1440;
  const hm = `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;
  if (day === 0) return hm;
  return day < 0 ? `eve ${hm}` : `+${day} ${hm}`;
}

/** 65 → "1 h 05", 40 → "40 min". */
export function fmtDur(min) {
  const r = Math.round(min);
  if (Math.abs(r) < 60) return `${r} min`;
  const h = Math.floor(r / 60);
  return `${h} h ${String(r - h * 60).padStart(2, "0")}`;
}

const round5 = (x) => Math.max(5, Math.round(x / 5) * 5);
const round1 = (x) => Math.round(x * 10) / 10;
export const fmtNum = (x) => {
  const r = round1(x);
  return (r < 0 ? "−" : "") + Math.abs(r).toLocaleString("en-US", { maximumFractionDigits: 1 });
};

// ---------- equipment ----------

/** Deck figures are Au Pain de la Halle's own records (14.3): 60 min from cold, 250→180 °C about 40 min, 180→250 °C about 25 min. */
const DECK = { preheat: 60, down: 70 / 40, up: 70 / 25 };
export const OVEN_SETS = {
  bakery: [
    { id: "top", name: "Top deck", ...DECK },
    { id: "bottom", name: "Bottom deck", ...DECK },
    // Fan oven: 20 min to 175 °C (14.4); the model assumes it changes temperature at the same rate.
    { id: "fan", name: "Fan oven", preheat: 20, down: 155 / 20, up: 155 / 20 },
  ],
  // Home oven, one tray: 45 min from cold to 250 °C; about 6 min from 250 to 200 °C with the door open (14.3, 14.4).
  home: [{ id: "home", name: "Home oven (one tray)", preheat: 45, down: 50 / 6, up: 230 / 45 }],
};

export const PLACES = {
  dough: { label: "dough at its target temperature" },
  cabinet: { label: "proofing cabinet" },
  room: { label: "fournil / kitchen" },
  ac: { label: "air-conditioned room" },
  cold: { label: "cold room 3 °C", temp: 3, cold: true },
  fridge: { label: "fridge 5 °C", temp: 5, cold: true },
};
export function placeLabel(plan, place) {
  if (place === "room") return plan.equipment === "home" ? "kitchen" : "fournil";
  return PLACES[place]?.label || place;
}
export function placesFor(plan) {
  return plan.equipment === "home" ? ["ac", "room", "fridge"] : ["cabinet", "room", "cold"];
}

/** Temperature a stage ferments at. */
export function stageTemp(plan, s) {
  switch (s.place) {
    case "dough":
      return s.ref + (plan.doughOff || 0);
    case "cabinet":
      return plan.cabinet ? plan.cabinet.temp : plan.kitchen;
    case "room":
      return plan.kitchen;
    case "ac":
      return plan.ac ?? plan.kitchen;
    default:
      return PLACES[s.place]?.temp ?? plan.kitchen;
  }
}

/** Expected window of an elastic (dough-time) stage at its real temperature. */
export function expectedWindow(plan, s) {
  const base = s.range || [s.dur, s.dur];
  if (s.ferment) {
    if (PLACES[s.place]?.cold) return { lo: 0, hi: Infinity, T: stageTemp(plan, s), factor: null, cold: true };
    const T = stageTemp(plan, s);
    const factor = RATE ** (s.ref - T);
    return { lo: base[0] * factor, hi: base[1] * factor, plan: s.dur * factor, T, factor };
  }
  return { lo: s.min ?? 0, hi: s.max ?? Infinity, plan: s.dur, T: null, factor: 1 };
}

/** Planned length of an elastic stage, for backward and forward planning. */
function nominal(plan, s) {
  const w = expectedWindow(plan, s);
  if (w.cold) return s.dur;
  return Math.round(w.plan);
}

// ---------- course sheets (times from the lessons) ----------

// Stage builders. Templates give durations; presets give clock times for the non-elastic stages.
const st = (id, name, kind, o = {}) => ({ id, name, kind, ...o });
const hands = (id, name, dur, o = {}) => st(id, name, "hands", { res: ["hands"], dur, ...o });
const mix = (id, name, dur, o = {}) => st(id, name, "hands", { res: ["hands"], mix: true, dur, ...o });
const dough = (id, name, dur, o = {}) => st(id, name, "dough", { elastic: true, dur, ...o });
const event = (id, name, during, offset, dur = 5) => st(id, name, "hands", { res: ["hands"], small: true, during, offset, dur });

/**
 * Each sheet: name, piece, laminated?, and per equipment the chain before shaping (pre),
 * small events, shaping (minutes for refQty pieces), proof, bake and cooling.
 */
export const SHEETS = {
  "TR-01": {
    name: "Tradition",
    piece: "baguettes 300 g",
    lessons: "09.2-09.4, 14.1",
    bakery: {
      refQty: 40,
      pre: [
        hands("weigh", "Weighing, water temperature, pâte fermentée out", 15),
        mix("automix", "Autolyse mix", 5),
        dough("autorest", "Autolyse rest", 30, { min: 20 }),
        mix("mix", "Final mixing, bassinage", 15),
        dough("pointage", "Pointage, folds at about 40 and 80 min", 120, { ferment: true, ref: 23, place: "dough" }),
        hands("divide", "Dividing and pre-shaping", 20, { scale: true }),
        dough("detente", "Détente", 30, { min: 20 }),
      ],
      events: [event("fold1", "Fold", "pointage", 40), event("fold2", "Fold", "pointage", 80)],
      shape: { name: "Shaping", dur: 20, refQty: 24 },
      proof: { name: "Apprêt", dur: 50, ref: 25, place: "cabinet", perLevel: 12 },
      bake: { units: ["top", "bottom"], temp: 250, dur: 25, perLoad: 24, steam: true },
      cool: 30,
    },
    home: {
      refQty: 3,
      piece: "baguettes 270 g",
      pre: [
        hands("weigh", "Weighing", 10),
        mix("automix", "Autolyse mix", 5),
        dough("autorest", "Autolyse rest", 30, { min: 20 }),
        mix("mix", "Final mixing and bassinage", 15),
        dough("pointage", "Pointage, folds at 30, 60, 90 min", 120, { ferment: true, ref: 23, place: "dough" }),
        hands("divide", "Dividing and pre-shaping", 10, { scale: true }),
        dough("detente", "Détente", 30, { min: 20 }),
      ],
      events: [event("fold1", "Fold", "pointage", 30), event("fold2", "Fold", "pointage", 60), event("fold3", "Fold", "pointage", 90)],
      shape: { name: "Shaping", dur: 10, refQty: 3 },
      proof: { name: "Apprêt", dur: 45, ref: 25, place: "ac" },
      bake: { units: ["home"], temp: 250, dur: 25, perLoad: 3, steam: true },
      cool: 60,
    },
  },
  "PC-02": {
    name: "Pain courant",
    piece: "baguettes 350 g",
    lessons: "01.6, 08.1, 14.3",
    bakery: {
      refQty: 24,
      pre: [
        hands("weigh", "Weighing", 15),
        mix("mix", "Mixing", 15),
        dough("pointage", "Pointage", 45, { ferment: true, ref: 24, place: "dough", range: [45, 55] }),
        hands("divide", "Dividing", 15, { scale: true }),
        dough("detente", "Détente", 20, { min: 15 }),
      ],
      events: [],
      shape: { name: "Shaping", dur: 20, refQty: 24 },
      proof: { name: "Apprêt", dur: 75, ref: 25, place: "cabinet", range: [60, 75], perLevel: 12 },
      bake: { units: ["top", "bottom"], temp: 250, dur: 22, perLoad: 24, steam: true },
      cool: 30,
    },
    home: {
      refQty: 3,
      piece: "baguettes 270 g",
      pre: [
        hands("weigh", "Weighing, water temperature", 10),
        mix("mix", "Mixing by hand", 20),
        dough("pointage", "Pointage, one fold", 50, { ferment: true, ref: 24, place: "dough", range: [45, 55] }),
        hands("divide", "Dividing and pre-shaping", 10, { scale: true }),
        dough("detente", "Détente", 20, { min: 15 }),
      ],
      events: [event("fold1", "Fold", "pointage", 30)],
      shape: { name: "Shaping", dur: 10, refQty: 3 },
      proof: { name: "Apprêt", dur: 60, ref: 25, place: "room", range: [60, 75] },
      bake: { units: ["home"], temp: 250, dur: 25, perLoad: 3, steam: true },
      cool: 30,
    },
  },
  "VI-01": {
    name: "Pain viennois",
    piece: "baguettes viennoises 280 g",
    lessons: "10.6, 14.4",
    bakery: {
      refQty: 8,
      pre: [
        mix("mix", "Weighing and mixing, butter late, 25 °C", 20),
        dough("pointage", "Pointage", 35, { ferment: true, ref: 25, place: "dough", range: [30, 45] }),
        hands("divide", "Dividing and pre-shaping", 10, { scale: true }),
        dough("detente", "Détente", 20, { min: 15 }),
      ],
      events: [],
      shape: { name: "Shaping, first egg wash", dur: 10, refQty: 8 },
      proof: { name: "Apprêt", dur: 75, ref: 27, place: "cabinet", range: [60, 90], perLevel: 4 },
      bake: { units: ["fan"], temp: 175, dur: 16, perLoad: 20 },
      cool: 20,
    },
    home: {
      refQty: 3,
      pre: [
        mix("mix", "Mixing by hand, butter late, 25 °C", 20),
        dough("pointage", "Pointage", 35, { ferment: true, ref: 25, place: "dough", range: [30, 45] }),
        hands("divide", "Dividing and pre-shaping", 15, { scale: true }),
        dough("detente", "Détente", 20, { min: 15 }),
      ],
      events: [],
      shape: { name: "Shaping, first egg wash", dur: 10, refQty: 3 },
      proof: { name: "Apprêt", dur: 75, ref: 27, place: "room", range: [60, 90] },
      bake: { units: ["home"], temp: 190, dur: 16, perLoad: 3 },
      cool: 20,
    },
  },
  "CO-01": {
    name: "Pain complet",
    piece: "loaves 500 g",
    lessons: "10.4",
    bakery: {
      refQty: 8,
      pre: [
        hands("weigh", "Weighing", 10),
        mix("restmix", "Flour and 95 % of the water", 5),
        dough("rest", "Rest before kneading", 25, { min: 20 }),
        mix("mix", "Gentle mixing, 25 °C", 12),
        dough("pointage", "Pointage, one fold", 40, { ferment: true, ref: 25, place: "dough", range: [30, 45] }),
        hands("divide", "Dividing and pre-shaping", 10, { scale: true }),
        dough("detente", "Détente", 15, { min: 15 }),
      ],
      events: [event("fold1", "Fold", "pointage", 20)],
      shape: { name: "Shaping (tins, bâtards)", dur: 10, refQty: 8 },
      proof: { name: "Apprêt", dur: 50, ref: 25, place: "cabinet", range: [45, 60], perLevel: 8 },
      bake: { units: ["top", "bottom"], temp: 235, dur: 35, perLoad: 20, steam: true },
      cool: 30,
    },
    home: {
      refQty: 2,
      pre: [
        hands("weigh", "Weighing", 10),
        mix("restmix", "Flour and 95 % of the water", 5),
        dough("rest", "Rest before kneading", 25, { min: 20 }),
        mix("mix", "Gentle kneading by hand, 25 °C", 15),
        dough("pointage", "Pointage, one fold", 40, { ferment: true, ref: 25, place: "dough", range: [30, 45] }),
        hands("divide", "Dividing and pre-shaping", 10, { scale: true }),
        dough("detente", "Détente", 15, { min: 15 }),
      ],
      events: [event("fold1", "Fold", "pointage", 20)],
      shape: { name: "Shaping (tin, bâtard)", dur: 10, refQty: 2 },
      proof: { name: "Apprêt", dur: 50, ref: 25, place: "room", range: [45, 60] },
      bake: { units: ["home"], temp: 235, dur: 35, perLoad: 2, steam: true },
      cool: 30,
    },
  },
  "CR-01": {
    name: "Croissant dough, standard chain",
    piece: "croissants, pains au chocolat, pains aux raisins",
    lessons: "11.2-11.6, 14.4, 22.2",
    laminated: true,
    bakery: {
      refQty: 30,
      pre: [
        hands("weigh", "Weighing, cold liquids", 10),
        mix("detrempe", "Détrempe (4 + 3 min), 20 °C, flatten, wrap", 10),
        dough("chill", "Chill in the cold room (at least 2 h)", 120, { min: 120, place: "cold" }),
        hands("turn1", "Lock-in and turn 1", 20),
        dough("rest1", "Rest", 30, { min: 30, place: "cold" }),
        hands("turn2", "Turn 2", 10),
        dough("rest2", "Rest", 30, { min: 30, place: "cold" }),
        hands("turn3", "Turn 3", 10),
        dough("final", "Final rest (at least 1 h)", 60, { min: 60, place: "cold" }),
      ],
      events: [],
      shape: { name: "Sheet, cut and shape, first egg wash", dur: 35, refQty: 30 },
      proof: { name: "Proof", dur: 120, ref: 25, place: "cabinet", range: [90, 150], perLevel: 12 },
      bake: { units: ["fan"], temp: 175, dur: 18, perLoad: 60 },
      cool: 20,
    },
    home: {
      refQty: 12,
      pre: [
        mix("detrempe", "Weigh; détrempe by hand, 20 °C; flatten, film, fridge", 15),
        dough("chill", "Chill in the fridge (at least 2 h)", 120, { min: 120, place: "fridge" }),
        hands("turn1", "Lock-in and turn 1", 15),
        dough("rest1", "Rest", 30, { min: 30, place: "fridge" }),
        hands("turn2", "Turn 2", 10),
        dough("rest2", "Rest", 30, { min: 30, place: "fridge" }),
        hands("turn3", "Turn 3", 10),
        dough("final", "Final rest (at least 1 h)", 60, { min: 60, place: "fridge" }),
      ],
      events: [],
      shape: { name: "Roll, cut and shape, first egg wash", dur: 35, refQty: 12 },
      proof: { name: "Proof", dur: 120, ref: 25, place: "ac", range: [90, 150] },
      bake: { units: ["home"], temp: 200, dur: 18, perLoad: 8 },
      cool: 20,
    },
  },
  "CR-01-short": {
    name: "Croissant dough, shortened chain",
    piece: "croissants, pains au chocolat, pains aux raisins",
    lessons: "22.2",
    laminated: true,
    bakery: {
      refQty: 30,
      pre: [
        hands("weigh", "Weighing, cold liquids", 10),
        mix("detrempe", "Détrempe, 20 °C, flatten 2 cm, film", 10),
        dough("chill", "Blast chiller 40 min, then cold room", 60, { min: 40, place: "cold" }),
        hands("turn1", "Lock-in and single turn", 15),
        dough("rest1", "Rest", 45, { min: 30, place: "cold" }),
        hands("turn2", "Double turn", 10),
        dough("final", "Final rest (40-55 min)", 55, { min: 40, place: "cold" }),
      ],
      events: [],
      shape: { name: "Sheet 3.5 mm, cut and shape, first egg wash", dur: 35, refQty: 30 },
      proof: { name: "Proof", dur: 120, ref: 25, place: "cabinet", range: [90, 150], perLevel: 12 },
      bake: { units: ["fan"], temp: 175, dur: 20, perLoad: 60 },
      cool: 20,
    },
    home: {
      refQty: 12,
      pre: [
        mix("detrempe", "Weigh; détrempe by hand, 20 °C; flatten, film", 15),
        dough("chill", "Freezer about 40 min, then fridge", 60, { min: 40, place: "fridge" }),
        hands("turn1", "Lock-in and single turn", 15),
        dough("rest1", "Rest", 45, { min: 30, place: "fridge" }),
        hands("turn2", "Double turn", 10),
        dough("final", "Final rest (40-55 min)", 55, { min: 40, place: "fridge" }),
      ],
      events: [],
      shape: { name: "Roll, cut and shape, first egg wash", dur: 35, refQty: 12 },
      proof: { name: "Proof", dur: 120, ref: 25, place: "ac", range: [90, 150] },
      bake: { units: ["home"], temp: 200, dur: 18, perLoad: 8 },
      cool: 20,
    },
  },
  "PL-01": {
    name: "Pain au lait",
    piece: "rolls 50 g",
    lessons: "12.3, 12.4, 14.2",
    bakery: {
      refQty: 19,
      pre: [
        hands("weigh", "Weighing", 10),
        mix("mix", "Mixing, butter once the dough is smooth, 24 °C", 20),
        dough("pointage", "Pointage", 45, { ferment: true, ref: 24, place: "dough" }),
        dough("cold1", "Flattened, cold room", 30, { min: 0, place: "cold" }),
        hands("divide", "Dividing cold", 15, { scale: true }),
        dough("cold2", "Rest in the cold (30 min at 4 °C)", 30, { min: 30, place: "cold" }),
      ],
      events: [],
      shape: { name: "Shaping, first egg wash", dur: 30, refQty: 19 },
      proof: { name: "Apprêt", dur: 75, ref: 25, place: "cabinet", range: [60, 105], perLevel: 10 },
      bake: { units: ["bottom"], temp: 180, dur: 15, perLoad: 40 },
      cool: 30,
    },
    home: {
      refQty: 8,
      pre: [
        hands("weigh", "Weighing", 10),
        mix("mix", "Mixing with the butter by hand (about 28 min)", 28),
        dough("pointage", "Pointage, fold at 20 min", 45, { ferment: true, ref: 24, place: "dough" }),
        hands("divide", "Dividing", 10, { scale: true }),
        dough("rest", "Rest", 25, { min: 15 }),
      ],
      events: [event("fold1", "Fold", "pointage", 20)],
      shape: { name: "Shaping and first egg wash", dur: 10, refQty: 8 },
      proof: { name: "Apprêt", dur: 75, ref: 25, place: "ac" },
      bake: { units: ["home"], temp: 190, dur: 15, perLoad: 12 },
      cool: 30,
    },
  },
  "PB-01": {
    name: "Pain brioché (pointage différé)",
    piece: "pieces 50-60 g",
    lessons: "12.3, 12.4",
    bakery: {
      refQty: 44,
      pre: [
        hands("weigh", "Weighing, ice-cold liquids (the evening before)", 10),
        mix("mix", "Mixing, butter late, 23 °C", 25),
        dough("pointage", "Pointage, one fold", 30, { ferment: true, ref: 23, place: "dough" }),
        dough("night", "Pointage différé at +4 °C (12-15 h)", 720, { min: 720, max: 900, place: "cold" }),
        hands("divide", "Dividing cold", 15, { scale: true }),
        dough("cold2", "Rest in the cold (30 min at 4 °C)", 30, { min: 30, place: "cold" }),
      ],
      events: [event("fold1", "Fold", "pointage", 15)],
      shape: { name: "Shaping, first egg wash", dur: 30, refQty: 44 },
      proof: { name: "Apprêt", dur: 75, ref: 25, place: "cabinet", range: [60, 105], perLevel: 10 },
      bake: { units: ["bottom"], temp: 180, dur: 15, perLoad: 40 },
      cool: 30,
    },
    home: {
      refQty: 8,
      pre: [
        hands("weigh", "Weighing, fridge-cold liquids (the evening before)", 10),
        mix("mix", "Mixing by hand, butter late, 23 °C", 30),
        dough("pointage", "Pointage, one fold", 30, { ferment: true, ref: 23, place: "dough" }),
        dough("night", "Pointage différé in the fridge (12-15 h)", 720, { min: 720, max: 900, place: "fridge" }),
        hands("divide", "Dividing cold", 10, { scale: true }),
        dough("cold2", "Rest in the fridge (30 min)", 30, { min: 30, place: "fridge" }),
      ],
      events: [event("fold1", "Fold", "pointage", 15)],
      shape: { name: "Shaping, first egg wash", dur: 15, refQty: 8 },
      proof: { name: "Apprêt", dur: 75, ref: 25, place: "ac", range: [60, 105] },
      bake: { units: ["home"], temp: 180, dur: 15, perLoad: 12 },
      cool: 30,
    },
  },
  "CP-01": {
    name: "Crème pâtissière",
    piece: "g of milk",
    lessons: "12.2, 14.4",
    cream: true,
    bakery: {
      pre: [
        hands("weigh", "Weighing", 5),
        hands("cook", "Cook to a full boil, 1 min more; 2 cm tray, film", 20),
        st("chill", "Blast chiller: 63 → 10 °C (2 h or less)", "cold", { dur: 60, follows: true, max: 120 }),
      ],
      events: [],
    },
    home: {
      pre: [
        hands("weigh", "Weighing", 5),
        hands("cook", "Cook to a full boil, 1 min more; shallow tray, film", 20),
        st("chill", "Ice bath: 63 → 10 °C (2 h or less), then fridge", "cold", { dur: 45, follows: true, max: 120 }),
      ],
      events: [],
    },
  },
};

export const SHEET_ORDER = ["TR-01", "PC-02", "VI-01", "CO-01", "CR-01", "CR-01-short", "PL-01", "PB-01", "CP-01"];
export const DEFAULT_QTY = { "TR-01": 24, "PC-02": 24, "VI-01": 8, "CO-01": 8, "CR-01": 30, "CR-01-short": 30, "PL-01": 20, "PB-01": 20, "CP-01": 200 };
export const DEFAULT_QTY_HOME = { "TR-01": 3, "PC-02": 3, "VI-01": 3, "CO-01": 2, "CR-01": 12, "CR-01-short": 12, "PL-01": 8, "PB-01": 8, "CP-01": 200 };

const clone = (x) => JSON.parse(JSON.stringify(x));

/** Link each stage to the one before it (after), unless it says otherwise. */
function chain(stages) {
  let prev = null;
  for (const s of stages) {
    if (s.during) continue;
    if (s.after === undefined) s.after = s.noAfter ? null : prev ? prev.id : null;
    if (!s.side) prev = s;
  }
  return stages;
}

let productSeq = 0;

/** Build a product from a course sheet for a quantity and an equipment ("bakery" or "home"). */
export function buildProduct(sheetKey, qty, equipment) {
  const sheet = SHEETS[sheetKey];
  const t = sheet[equipment];
  const id = `p${++productSeq}`;
  const stages = clone(t.pre);
  const events = clone(t.events || []);
  const scale = (dur, ref) => (ref ? round5((dur * qty) / ref) : dur);
  for (const s of stages) if (s.scale) s.dur = scale(s.dur, t.refQty);

  if (!sheet.cream) {
    const loads = Math.max(1, Math.ceil(qty / t.bake.perLoad));
    const sizes = [];
    let left = qty;
    for (let k = 0; k < loads; k++) {
      const n = Math.min(t.bake.perLoad, left);
      sizes.push(n);
      left -= n;
    }
    sizes.forEach((n, k) => {
      const g = loads > 1 ? ` group ${k + 1}` : "";
      const shape = hands(`shape${k + 1}`, `${t.shape.name}${g} (${n})`, round5((t.shape.dur * n) / t.shape.refQty));
      if (k > 0) {
        shape.after = `shape${k}`;
        shape.follows = true;
      }
      const proof = dough(`proof${k + 1}`, `${t.proof.name}${g}`, t.proof.dur, {
        ferment: true,
        ref: t.proof.ref,
        place: t.proof.place,
        range: t.proof.range,
        levels: t.proof.perLevel ? Math.ceil(n / t.proof.perLevel) : 0,
        after: `shape${k + 1}`,
      });
      const bake = st(`bake${k + 1}`, `Bake${g}`, "oven", {
        oven: t.bake.units.slice(),
        temp: t.bake.temp,
        dur: t.bake.dur,
        steam: !!t.bake.steam,
        after: `proof${k + 1}`,
      });
      const cool = st(`cool${k + 1}`, `Cooling${g}`, "cool", { dur: t.cool, follows: true, after: `bake${k + 1}` });
      stages.push(shape, proof, bake, cool);
    });
  }
  chain(stages);
  return {
    id,
    sheet: sheetKey,
    qty,
    label: sheet.cream ? `${sheetKey} ${sheet.name}, ${qty} g milk` : `${sheetKey} ${sheet.name}, ${qty} ${t.piece || sheet.piece}`,
    short: sheetKey,
    laminated: !!sheet.laminated,
    cream: !!sheet.cream,
    fromSheet: true,
    stages: [...stages, ...events],
  };
}

// ---------- resolving stage times ----------

function index(p) {
  const byId = new Map(p.stages.map((s) => [s.id, s]));
  const succ = (s) => {
    const all = p.stages.filter((t) => t.after === s.id && !t.during && !t.side);
    return all.find((t) => !t.follows) || all[0] || null;
  };
  return { byId, succ };
}

/** Clock times of every stage of a product: Map id → {s, e}. Elastic stages run from their predecessor to their successor. */
export function resolveProduct(plan, p) {
  const { byId, succ } = index(p);
  const S = new Map();
  const E = new Map();
  const guard = new Set();
  const start = (s) => {
    if (S.has(s.id)) return S.get(s.id);
    if (guard.has(s.id)) return NaN;
    guard.add(s.id);
    let v;
    if (s.during) v = start(byId.get(s.during)) + s.offset;
    else if (s.elastic) v = s.after ? end(byId.get(s.after)) : -Infinity;
    else if (s.follows || (s.side && s.start === undefined)) v = end(byId.get(s.after));
    else v = s.start;
    guard.delete(s.id);
    S.set(s.id, v);
    return v;
  };
  const end = (s) => {
    if (E.has(s.id)) return E.get(s.id);
    let v;
    if (s.elastic) {
      // An elastic stage runs until the next stage starts; followed by another dough stage
      // (pointage, then a cold hold) it keeps its planned length and the hold absorbs the rest.
      const n = succ(s);
      v = n && !n.elastic ? start(n) : start(s) + nominal(plan, s);
    } else v = start(s) + s.dur;
    E.set(s.id, v);
    return v;
  };
  const out = new Map();
  for (const s of p.stages) out.set(s.id, { s: start(s), e: end(s) });
  return out;
}

// ---------- planning ----------

function bakeStarts(plan, p, latestFinish) {
  // Backward: last load cooled at the deadline; earlier loads sharing an oven end LOAD_GAP before the next one.
  const bakes = p.stages.filter((s) => s.kind === "oven");
  const cools = new Map(p.stages.filter((s) => s.kind === "cool").map((c) => [c.after, c.dur]));
  const res = new Map();
  for (let k = bakes.length - 1; k >= 0; k--) {
    const b = bakes[k];
    let end = latestFinish - (cools.get(b.id) || 0);
    for (let j = k + 1; j < bakes.length; j++) {
      if (bakes[j].oven.some((u) => b.oven.includes(u))) end = Math.min(end, res.get(bakes[j].id) - LOAD_GAP);
    }
    res.set(b.id, end - b.dur);
  }
  return res;
}

/** Plan one product backwards so its last product is cooled at `finish` (rétroplanning, 14.1). */
export function planBackward(plan, p, finish) {
  const { succ } = index(p);
  const bakes = bakeStarts(plan, p, finish);
  const memo = new Map();
  const isFixed = (s) => !s.elastic && !s.follows && !s.during && !s.side;
  // Latest start of a stage: from its oven load, back through each dough stage at its planned length.
  const bstart = (s) => {
    if (memo.has(s.id)) return memo.get(s.id);
    let v;
    if (bakes.has(s.id)) v = bakes.get(s.id);
    else {
      const n = succ(s);
      if (!n) v = finish - s.dur; // a terminal stage (e.g. a cream) is ready by the finish
      else if (n.elastic) {
        // back through one or more dough stages at their planned lengths
        let sum = 0;
        let q = n;
        while (q && q.elastic) {
          sum += nominal(plan, q);
          q = succ(q);
        }
        v = (q ? bstart(q) : finish) - sum - s.dur;
      } else v = bstart(n) - s.dur;
    }
    memo.set(s.id, v);
    return v;
  };
  for (const s of p.stages) if (isFixed(s)) s.start = Math.round(bstart(s));
  for (const s of p.stages) if (s.side) delete s.start;
}

/** Plan one product forwards from a start time, every dough stage at its planned length. */
export function planForward(plan, p, from) {
  const { byId } = index(p);
  const end = new Map();
  const startOf = new Map();
  const bakes = p.stages.filter((s) => s.kind === "oven");
  for (const s of p.stages) {
    if (s.during) continue;
    let v;
    if (s.elastic) {
      const a = s.after ? byId.get(s.after) : null;
      v = a ? end.get(a.id) : from;
      startOf.set(s.id, v);
      end.set(s.id, v + nominal(plan, s));
      continue;
    }
    const a = s.after ? byId.get(s.after) : null;
    if (!a) v = from;
    else v = end.get(a.id);
    if (s.kind === "oven") {
      for (const b of bakes) {
        if (b === s) break;
        if (b.oven.some((u) => s.oven.includes(u))) v = Math.max(v, end.get(b.id) + LOAD_GAP);
      }
    }
    if (!s.follows && !s.side) s.start = Math.round(v);
    startOf.set(s.id, v);
    end.set(s.id, v + s.dur);
  }
  for (const s of p.stages) if (s.side) delete s.start;
}

/** Plan every product (backwards from the deadline or forwards from the start), then the oven switch-on times. */
export function planAll(plan, mode = "backward") {
  const creams = plan.products.filter((p) => p.cream);
  const others = plan.products.filter((p) => !p.cream);
  for (const p of others) {
    if (mode === "forward") planForward(plan, p, plan.start);
    else planBackward(plan, p, plan.deadline);
  }
  for (const p of creams) {
    if (mode === "forward") {
      planForward(plan, p, plan.start);
      continue;
    }
    // The cream must be cold before the laminated dough is shaped (14.4): plan it to be ready 30 min before.
    const shapes = shapingStarts(plan);
    const by = shapes.length ? Math.min(...shapes) - 30 : plan.deadline;
    planBackward(plan, p, by);
  }
  setOvensOn(plan);
}

/** Plan one product backwards from the deadline (a cream: ready 30 min before the laminated dough is shaped). */
export function planProduct(plan, p) {
  if (p.cream) {
    const shapes = shapingStarts(plan);
    planBackward(plan, p, shapes.length ? Math.min(...shapes) - 30 : plan.deadline);
  } else planBackward(plan, p, plan.deadline);
}

function shapingStarts(plan) {
  const out = [];
  for (const p of plan.products) {
    if (!p.laminated) continue;
    const r = resolveProduct(plan, p);
    for (const s of p.stages) if (/^shape/.test(s.id)) out.push(r.get(s.id).s);
  }
  return out;
}

/** Each oven is switched on its preheat time before its first load. */
export function setOvensOn(plan) {
  const first = new Map();
  for (const p of plan.products) {
    const r = resolveProduct(plan, p);
    for (const s of p.stages)
      if (s.kind === "oven")
        for (const u of s.oven) first.set(u, Math.min(first.get(u) ?? Infinity, r.get(s.id).s));
  }
  for (const o of plan.ovens) if (first.has(o.id)) o.on = first.get(o.id) - o.preheat;
}

// ---------- moving stages ----------

/** Which stages can be moved directly: hands and oven stages with their own clock time, and small tasks. */
export function isMovable(s) {
  return !s.elastic && !s.follows && !(s.side && s.start === undefined) && s.kind !== "cool";
}

/** Move a stage by delta minutes; with `withAfter`, everything that comes after it moves too. */
export function nudge(plan, key, delta, withAfter = true) {
  if (key.startsWith("oven:")) {
    const o = plan.ovens.find((x) => `oven:${x.id}` === key);
    if (o) o.on += delta;
    return;
  }
  const [pid, sid] = key.split(":");
  const p = plan.products.find((x) => x.id === pid);
  if (!p) return;
  const s = p.stages.find((x) => x.id === sid);
  if (!s) return;
  if (s.during) {
    s.offset += delta;
    return;
  }
  if (!isMovable(s)) return;
  s.start += delta;
  if (!withAfter) return;
  const seen = new Set([s.id]);
  const queue = [s.id];
  while (queue.length) {
    const id = queue.shift();
    for (const t of p.stages) {
      if (t.after === id && !seen.has(t.id)) {
        seen.add(t.id);
        queue.push(t.id);
        if (!t.elastic && !t.follows && !t.during && t.start !== undefined) t.start += delta;
      }
    }
  }
}

// ---------- analysis ----------

const overlap = (a, b) => Math.min(a.e, b.e) - Math.max(a.s, b.s);
const key = (p, s) => `${p.id}:${s.id}`;

/** Resolve every product and list the conflicts, warnings and notes of the plan. */
export function analyse(plan) {
  const items = []; // every resolved stage
  for (const p of plan.products) {
    const r = resolveProduct(plan, p);
    for (const s of p.stages) {
      const t = r.get(s.id);
      items.push({ key: key(p, s), p, st: s, s: t.s, e: t.e });
    }
  }
  // Loading and unloading are small hands tasks set by the oven (14.2, rule 3).
  const ovenTasks = [];
  for (const it of items) {
    if (it.st.kind !== "oven") continue;
    ovenTasks.push({ key: it.key, p: it.p, st: { name: "Score and load", small: true, ovenTask: true }, s: it.s - LOAD_GAP, e: it.s });
    ovenTasks.push({ key: it.key, p: it.p, st: { name: "Unload", small: true, ovenTask: true }, s: it.e, e: it.e + 2 });
  }

  const issues = [];
  const add = (kind, lane, at, text, keys) => issues.push({ kind, lane, at, text, keys });
  const nm = (it) => `${it.p.short} ${it.st.name.charAt(0).toLowerCase()}${it.st.name.slice(1)}`;

  // 1. Order inside each product.
  for (const it of items) {
    const s = it.st;
    if (s.during || !s.after) continue;
    const pred = items.find((x) => x.p === it.p && x.st.id === s.after);
    if (!pred) continue;
    if (s.elastic) {
      if (it.e < it.s - 0.5) add("bad", "Order", it.s, `${nm(it)} would last ${fmtDur(it.e - it.s)}: the next stage starts before ${pred.st.name.toLowerCase()} ends.`, [it.key]);
    } else if (!pred.st.elastic && !s.follows && it.s < pred.e - 0.5) {
      add("bad", "Order", it.s, `${nm(it)} starts at ${fmtTime(it.s)}, before ${pred.st.name.toLowerCase()} ends (${fmtTime(pred.e)}).`, [it.key, pred.key]);
    }
  }

  // 2. Hands and mixer: one pair of hands, one mixer (14.2 rule 3, 14.3).
  const blocks = items.filter((x) => x.st.res && x.st.res.includes("hands") && !x.st.small && x.e > x.s);
  const smalls = [...items.filter((x) => x.st.small), ...ovenTasks];
  const usesMixer = (x) => plan.mixer && x.st.mix;
  for (let i = 0; i < blocks.length; i++) {
    for (let j = i + 1; j < blocks.length; j++) {
      const a = blocks[i];
      const b = blocks[j];
      const o = overlap(a, b);
      if (o <= 0) continue;
      const mixer = usesMixer(a) && usesMixer(b);
      const [x, y] = a.s <= b.s ? [a, b] : [b, a];
      add(
        "bad",
        mixer ? "Mixer and you" : "You",
        Math.max(a.s, b.s),
        `${fmtTime(Math.max(a.s, b.s))}-${fmtTime(Math.min(a.e, b.e))}: ${nm(x)} and ${nm(y)} at the same time (${fmtDur(o)} overlap).`,
        [x.key, y.key]
      );
    }
  }
  const mixes = items.filter((x) => usesMixer(x));
  for (let i = 0; i < mixes.length; i++)
    for (let j = i + 1; j < mixes.length; j++) {
      const a = mixes[i];
      const b = mixes[j];
      if (overlap(a, b) > 0 && !(a.st.res.includes("hands") && b.st.res.includes("hands")))
        add("bad", "Mixer", Math.max(a.s, b.s), `${nm(a)} and ${nm(b)} need the mixer at the same time.`, [a.key, b.key]);
    }
  for (const sm of smalls) {
    for (const b of blocks) {
      if (sm.key === b.key || overlap(sm, b) <= 0) continue;
      const handMix = b.st.mix && !plan.mixer;
      const kind = handMix && !sm.st.ovenTask ? "warn" : "note";
      const what = sm.st.ovenTask ? `${sm.st.name.toLowerCase()} ${sm.p.short}` : nm(sm);
      const why = handMix && !sm.st.ovenTask ? " (dough on your hands): slip it a few minutes" : ": a small task can slip a few minutes";
      add(kind, "You", sm.s, `${fmtTime(sm.s)}: ${what} falls during ${nm(b)}${why}.`, sm.st.ovenTask ? [b.key] : [sm.key, b.key]);
    }
  }

  // 3. Oven: loads, preheat and temperature changes (14.3).
  const ovenBars = [];
  const preheats = new Map();
  const busy = new Map();
  for (const o of plan.ovens) {
    const loads = items.filter((x) => x.st.kind === "oven" && x.st.oven.includes(o.id)).sort((a, b) => a.s - b.s);
    if (!loads.length) continue;
    if (!Number.isFinite(o.on)) o.on = loads[0].s - o.preheat;
    ovenBars.push({ oven: o.id, kind: "preheat", s: o.on, e: o.on + o.preheat, text: `heating to ${loads[0].st.temp} °C` });
    let temp = null;
    let setpoint = null;
    for (let k = 0; k < loads.length; k++) {
      const L = loads[k];
      if (k === 0) {
        const had = L.s - o.on;
        if (had < o.preheat - 0.5) {
          // One load on two decks switched on together is one conflict.
          const k = `${L.key}@${o.on}`;
          const prev = preheats.get(k);
          if (prev) {
            prev.names.push(o.name);
            prev.keys.push(`oven:${o.id}`);
          } else preheats.set(k, { names: [o.name], keys: [L.key, `oven:${o.id}`], L, o, had });
        }
        // Each conflict is counted on its own: later loads are checked as if the preheat were right.
        temp = L.st.temp;
        setpoint = L.st.temp;
      } else {
        const P = loads[k - 1];
        if (L.s < P.e - 0.5) {
          const k = `${L.key}|${P.key}`;
          if (busy.has(k)) busy.get(k).names.push(o.name);
          else busy.set(k, { names: [o.name], L, P });
        }
        // During the previous load the oven keeps moving towards that load's setting.
        temp = approach(temp, setpoint, P.e - P.s, o);
        const gap = Math.max(0, L.s - P.e);
        setpoint = L.st.temp;
        const before = temp;
        temp = approach(temp, setpoint, gap, o);
        const change = P.st.temp - L.st.temp;
        if (change !== 0) {
          const rate = change > 0 ? o.down : o.up;
          const need = Math.abs(change) / rate;
          ovenBars.push({ oven: o.id, kind: change > 0 ? "down" : "up", s: P.e, e: P.e + need, text: `${change > 0 ? "down" : "up"} to ${L.st.temp} °C` });
          if (Math.abs(temp - L.st.temp) > TEMP_TOLERANCE)
            add(
              "bad",
              o.name,
              L.s,
              `${fmtTime(L.s)}: ${L.p.short} needs ${L.st.temp} °C ${fmtDur(gap)} after a ${P.st.temp} °C load; the oven is still at about ${Math.round(temp)} °C (${change > 0 ? "cooling" : "heating"} ${P.st.temp} → ${L.st.temp} °C takes about ${Math.round(need)} min).`,
              [L.key, P.key]
            );
        } else if (Math.abs(before - setpoint) > TEMP_TOLERANCE && Math.abs(temp - L.st.temp) > TEMP_TOLERANCE) {
          add("bad", o.name, L.s, `${fmtTime(L.s)}: ${L.p.short} needs ${L.st.temp} °C; the oven is only at about ${Math.round(temp)} °C.`, [L.key]);
        }
        // Idle: time between loads not spent changing temperature.
        const idle = L.s - P.e - (change !== 0 ? Math.abs(change) / (change > 0 ? o.down : o.up) : 0);
        if (idle > 60) add("note", o.name, P.e, `${o.name} idle about ${fmtDur(idle)} (${fmtTime(P.e)}-${fmtTime(L.s)}): switch it off and on again in time (lesson 18.1).`, [P.key, L.key]);
      }
    }
  }

  for (const { names, L, P } of busy.values()) {
    const who = names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names.at(-1).toLowerCase()}` : names[0];
    add("bad", who, L.s, `${who} busy: ${L.p.short} load at ${fmtTime(L.s)} while ${P.p.short} bakes until ${fmtTime(P.e)}.`, [L.key, P.key]);
  }
  for (const { names, keys, L, o, had } of preheats.values()) {
    const who = names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names.at(-1).toLowerCase()}` : names[0];
    add(
      "bad",
      who,
      L.s,
      had < 0
        ? `${who} switched on at ${fmtTime(o.on)}, after the ${fmtTime(L.s)} load of ${L.p.short}: ${o.preheat} min of preheat needed.`
        : `${who} switched on at ${fmtTime(o.on)} for the ${fmtTime(L.s)} load of ${L.p.short}: ${Math.max(0, Math.round(had))} of ${o.preheat} min of preheat.`,
      keys
    );
  }

  // 4. Dough time: each fermentation at its real temperature (7 % rule) and each rest at least its minimum.
  for (const it of items) {
    const s = it.st;
    if (!s.elastic || !Number.isFinite(it.s)) continue;
    const d = it.e - it.s;
    const w = expectedWindow(plan, s);
    if (s.ferment) {
      if (w.cold) continue;
      const tolLo = Math.max(10, 0.15 * w.lo);
      const tolHi = Math.max(10, 0.15 * w.hi);
      const where = `${placeLabel(plan, s.place)}, ${fmtNum(w.T)} °C`;
      const win = Math.round(w.lo) === Math.round(w.hi) ? `about ${fmtDur(w.lo)}` : `about ${fmtDur(w.lo)}-${fmtDur(w.hi)}`;
      if (d > w.hi + tolHi) {
        const dT = Math.log(d / w.hi) / Math.log(RATE);
        add(
          "warn",
          it.p.short,
          it.s,
          `${nm(it)} lasts ${fmtDur(d)} (${fmtTime(it.s)}-${fmtTime(it.e)}) where ${win} is expected (${where}): it will over-ferment. Slow it about ${fmtNum(dT)} °C cooler (ln(${Math.round(d)} ÷ ${Math.round(w.hi)}) ÷ ln 1.07), or move the stage after it earlier.`,
          [it.key]
        );
      } else if (d < w.lo - tolLo) {
        add(
          "warn",
          it.p.short,
          it.s,
          `${nm(it)} lasts only ${fmtDur(d)} where ${win} is expected (${where}): it will reach the next stage under-${/apprêt|proof/i.test(s.name) ? "proofed" : "fermented"}.`,
          [it.key]
        );
      }
      if (it.p.laminated && w.T > LAMINATED_MAX)
        add("bad", plan.cabinet && s.place === "cabinet" ? "Proofing cabinet" : placeLabel(plan, s.place), it.s, `${nm(it)} at ${fmtNum(w.T)} °C: laminated dough must proof below about ${LAMINATED_MAX} °C or the butter melts out (lesson 11.6).`, [it.key]);
    } else {
      if (s.min !== undefined && d < s.min - 5)
        add("warn", it.p.short, it.s, `${nm(it)} lasts ${fmtDur(d)}, less than the sheet's ${fmtDur(s.min)}.`, [it.key]);
      if (s.max !== undefined && d > s.max + 5)
        add("warn", it.p.short, it.s, `${nm(it)} lasts ${fmtDur(d)}, more than the sheet's ${fmtDur(s.max)}.`, [it.key]);
    }
  }

  // 5. Proofing cabinet: one setting, a fixed number of levels (14.3).
  if (plan.cabinet) {
    const inCab = items.filter((x) => x.st.elastic && x.st.place === "cabinet" && x.st.levels && Number.isFinite(x.s));
    const times = [...new Set(inCab.map((x) => x.s))].sort((a, b) => a - b);
    for (const t of times) {
      const here = inCab.filter((x) => x.s <= t && x.e > t);
      const used = here.reduce((a, x) => a + x.st.levels, 0);
      if (used > plan.cabinet.levels) {
        add("bad", "Proofing cabinet", t, `${fmtTime(t)}: ${used} levels needed, the cabinet has ${plan.cabinet.levels}.`, here.map((x) => x.key));
        break;
      }
    }
  }

  // 6. Crème pâtissière cold before the laminated dough is shaped (14.4).
  for (const c of plan.products.filter((p) => p.cream)) {
    const ready = Math.max(...items.filter((x) => x.p === c).map((x) => x.e));
    for (const it of items) {
      if (!it.p.laminated || !/^shape/.test(it.st.id)) continue;
      if (it.s < ready)
        add("bad", c.short, it.s, `${nm(it)} at ${fmtTime(it.s)}, but the crème pâtissière is only cold at ${fmtTime(ready)}.`, [it.key, `${c.id}:chill`]);
    }
    const chill = items.find((x) => x.p === c && x.st.id === "chill");
    if (chill && chill.e - chill.s > 120)
      add("bad", c.short, chill.s, `Crème pâtissière cooling ${fmtDur(chill.e - chill.s)}: it must go from 63 °C to 10 °C in 2 hours or less.`, [chill.key]);
  }

  // 7. Deadline (14.1): every product cooled by the deadline.
  let lastReady = -Infinity;
  let lastProduct = null;
  for (const p of plan.products) {
    const mine = items.filter((x) => x.p === p);
    const cools = mine.filter((x) => x.st.kind === "cool");
    const ready = cools.length ? Math.max(...cools.map((x) => x.e)) : Math.max(...mine.map((x) => x.e));
    const last = cools.length ? cools.find((x) => x.e === ready) : mine.find((x) => x.e === ready);
    if (ready > lastReady) {
      lastReady = ready;
      lastProduct = p;
    }
    if (!p.cream && ready > plan.deadline + 0.5)
      add("bad", "Deadline", ready, `${p.short} cooled at ${fmtTime(ready)}, ${fmtDur(ready - plan.deadline)} after the ${fmtTime(plan.deadline)} deadline.`, [last.key]);
  }
  const spare = plan.deadline - lastReady;
  if (Number.isFinite(spare) && spare >= 0 && spare < SPARE_WANTED)
    add("note", "Deadline", lastReady, `Last product (${lastProduct.short}) cooled at ${fmtTime(lastReady)}: ${fmtDur(spare)} spare, less than the 15 minutes the template asks. Note it.`, []);

  issues.sort((a, b) => (a.at ?? 0) - (b.at ?? 0));

  // Summary: start of the day, the longest chain (critical path), the finish.
  const fixed = items.filter((x) => Number.isFinite(x.s));
  const startDay = Math.min(...fixed.map((x) => x.s), ...plan.ovens.filter((o) => ovenBars.some((b) => b.oven === o.id)).map((o) => o.on));
  let critical = null;
  for (const p of plan.products) {
    const mine = fixed.filter((x) => x.p === p);
    if (!mine.length) continue;
    const len = Math.max(...mine.map((x) => x.e)) - Math.min(...mine.map((x) => x.s));
    if (!critical || len > critical.len) critical = { p, len };
  }
  return {
    items,
    ovenTasks,
    ovenBars,
    issues,
    bad: issues.filter((i) => i.kind === "bad"),
    warn: issues.filter((i) => i.kind === "warn"),
    notes: issues.filter((i) => i.kind === "note"),
    start: startDay,
    finish: lastReady,
    spare,
    critical,
  };
}

/** Oven temperature after `minutes` moving towards `target` at the oven's heating or cooling rate. */
function approach(temp, target, minutes, o) {
  if (temp === target) return temp;
  if (temp > target) return Math.max(target, temp - o.down * minutes);
  return Math.min(target, temp + o.up * minutes);
}

// ---------- presets (clock times exactly as in the lessons) ----------

// Compact builders for presets: clock time strings for stages with their own time.
const H = (id, name, at, dur, o = {}) => hands(id, name, dur, { start: at, ...o });
const M = (id, name, at, dur, o = {}) => mix(id, name, dur, { start: at, ...o });
const D = (id, name, dur, o = {}) => dough(id, name, dur, o);
const P = (id, name, dur, ref, place, o = {}) => dough(id, name, dur, { ferment: true, ref, place, ...o });
const EV = (id, name, during, at, dur = 5) => st(id, name, "hands", { res: ["hands"], small: true, during, at, dur });
const B = (id, name, at, dur, oven, temp, o = {}) => st(id, name, "oven", { start: at, dur, oven, temp, ...o });
const C = (id, dur, after, name = "Cooling") => st(id, name, "cool", { dur, follows: true, after });

function product(id, sheet, label, stages, o = {}) {
  return { id, sheet, label, short: o.short || sheet, laminated: !!SHEETS[sheet]?.laminated, cream: !!SHEETS[sheet]?.cream, stages: chain(stages), ...o };
}

/** Clock strings → minutes; events get their offset inside the stage they fall in. */
function finishPreset(plan) {
  for (const p of plan.products) {
    for (const s of p.stages) if (typeof s.start === "string") s.start = parseTime(s.start);
    const evs = p.stages.filter((s) => s.during && s.at !== undefined);
    for (const e of evs) e.offset = 0;
    const r = resolveProduct(plan, p);
    for (const e of evs) {
      e.offset = parseTime(e.at) - r.get(e.during).s;
      delete e.at;
    }
  }
  for (const o of plan.ovens) if (typeof o.on === "string") o.on = parseTime(o.on);
  if (typeof plan.deadline === "string") plan.deadline = parseTime(plan.deadline);
  if (typeof plan.start === "string") plan.start = parseTime(plan.start);
  return plan;
}

function ovens(set, on = {}, overrides = {}) {
  return OVEN_SETS[set].filter((o) => o.id in on).map((o) => ({ ...o, ...(overrides[o.id] || {}), on: on[o.id] }));
}

const PRESET_BUILDERS = {
  // 14.1 worked example: 40 tradition baguettes for 7:30, two loads.
  "m14-one-bread": () => ({
    title: "40 tradition baguettes for 7:30 (14.1)",
    note: "Lesson 14.1 worked example, built backwards from 7:30: two loads of 24 and 16. Group 2 is shaped straight after group 1 and waits 65 minutes for the oven. It is in the cabinet at 25 °C here: read its warning, then select its apprêt and move it to the fournil (about 4 °C cooler, the 7 % rule).",
    equipment: "bakery",
    mixer: true,
    deadline: "7:30",
    start: "1:00",
    kitchen: 22,
    cabinet: { temp: 25, levels: 16 },
    ovens: ovens("bakery", { top: "5:05", bottom: "5:05" }),
    products: [
      product("tr", "TR-01", "Tradition TR-01, 40 × 300 g", [
        H("weigh", "Weighing, water temperature, pâte fermentée out", "1:00", 15),
        M("automix", "Autolyse mix", "1:15", 5),
        D("autorest", "Autolyse rest", 30, { min: 20 }),
        M("mix", "Final mixing, bassinage", "1:50", 15),
        P("pointage", "Pointage", 120, 23, "dough"),
        H("clean", "Clean the mixer", "2:05", 15, { side: true, after: "mix" }),
        H("divide", "Dividing and pre-shaping 40 pieces", "4:05", 20, { after: "pointage" }),
        D("detente", "Détente", 30, { min: 20 }),
        H("shape1", "Shaping group 1 (24)", "4:55", 20),
        P("proof1", "Apprêt group 1", 50, 25, "cabinet", { levels: 2 }),
        B("bake1", "Bake load 1", "6:05", 25, ["top", "bottom"], 250, { steam: true }),
        C("cool1", 30, "bake1"),
        H("shape2", "Shaping group 2 (16)", "5:15", 15, { after: "shape1", follows: true }),
        P("proof2", "Apprêt group 2", 50, 25, "cabinet", { levels: 2 }),
        B("bake2", "Bake load 2", "6:35", 25, ["top", "bottom"], 250, { steam: true }),
        C("cool2", 30, "bake2"),
        EV("fold1", "Fold", "pointage", "2:45"),
        EV("fold2", "Fold", "pointage", "3:25"),
      ]),
    ],
  }),

  // 14.2 practice: TR-01 and PL-01 at home for 19:00, one tray; each dough planned backwards from its own load.
  "m14-two-products": () => ({
    title: "Two products at home for 19:00 (14.2 practice)",
    note: "Lesson 14.2 practice: tradition and pains au lait on the table at 19:00, one person, one oven tray. Each dough is planned backwards from its own load (baguettes 17:35, rolls 18:15). One clash is left where a fold meets the pain au lait mixing: find it and slip the fold.",
    equipment: "home",
    mixer: false,
    deadline: "19:00",
    start: "13:00",
    kitchen: 25,
    ac: 25,
    cabinet: null,
    // Home oven figures of 14.2: 45 min preheat; allow 15 min to fall from 250 to 190 °C.
    ovens: ovens("home", { home: "16:50" }, { home: { down: 60 / 15 } }),
    products: [
      product("tr", "TR-01", "Tradition TR-01, 3 × 270 g", [
        H("weigh", "Weighing", "13:00", 10),
        M("automix", "Autolyse mix", "13:10", 5),
        D("autorest", "Autolyse rest", 30, { min: 20 }),
        M("mix", "Final mixing and bassinage", "13:45", 15),
        P("pointage", "Pointage", 120, 23, "dough"),
        H("divide", "Dividing and pre-shaping", "16:00", 10),
        D("detente", "Détente", 30, { min: 20 }),
        H("shape1", "Shaping", "16:40", 10),
        P("proof1", "Apprêt", 45, 25, "room"),
        B("bake1", "Bake, steam", "17:35", 25, ["home"], 250, { steam: true }),
        C("cool1", 60, "bake1"),
        EV("fold1", "Fold", "pointage", "14:30"),
        EV("fold2", "Fold", "pointage", "15:00"),
        EV("fold3", "Fold", "pointage", "15:30"),
      ]),
      product("pl", "PL-01", "Pain au lait PL-01, 8 × 60 g", [
        H("weigh", "Weighing", "14:40", 10),
        M("mix", "Mixing with the butter (about 28 min)", "15:00", 28),
        P("pointage", "Pointage", 45, 24, "dough"),
        H("divide", "Dividing", "16:15", 10),
        D("rest", "Rest", 25, { min: 15 }),
        H("shape1", "Shaping and first egg wash", "16:50", 10),
        P("proof1", "Apprêt", 75, 25, "room"),
        B("bake1", "Bake", "18:15", 15, ["home"], 190),
        C("cool1", 30, "bake1"),
        EV("fold1", "Fold", "pointage", "15:50"),
      ]),
    ],
  }),

  // 14.3 worked example: the commis's draft with its five conflicts.
  "m14-conflicts": () => ({
    title: "The commis's Saturday draft (14.3)",
    note: "Lesson 14.3: the draft organigramme for 7:00 (tradition, pain courant, pains au lait from Friday's dough), oven on at 5:30. It has five conflicts. Fix them with the moves of the lesson: shift, slow (move a proof to the fournil), swap the oven order, oven on earlier.",
    equipment: "bakery",
    mixer: true,
    deadline: "7:00",
    start: "1:00",
    kitchen: 22,
    cabinet: { temp: 25, levels: 16 },
    ovens: ovens("bakery", { top: "5:30", bottom: "5:30" }),
    products: [
      product("tr", "TR-01", "Tradition TR-01, 24 × 300 g", [
        H("weigh", "Pesée", "1:45", 15),
        M("automix", "Autolyse mix", "2:00", 5),
        D("autorest", "Autolyse rest", 30, { min: 20 }),
        M("mix", "Final mixing", "2:30", 15),
        P("pointage", "Pointage", 120, 23, "dough"),
        H("divide", "Dividing", "4:45", 15),
        D("detente", "Détente", 30, { min: 20 }),
        H("shape1", "Shaping", "5:30", 20),
        P("proof1", "Apprêt", 50, 25, "cabinet", { levels: 2 }),
        B("bake1", "Bake, both decks", "6:40", 25, ["top", "bottom"], 250, { steam: true }),
        C("cool1", 30, "bake1"),
      ]),
      product("pc", "PC-02", "Pain courant PC-02, 24 × 350 g", [
        H("weigh", "Pesée", "2:15", 15),
        M("mix", "Mixing", "2:30", 15),
        P("pointage", "Pointage", 45, 24, "dough", { range: [45, 55] }),
        H("divide", "Dividing", "3:30", 20),
        D("detente", "Détente", 20, { min: 15 }),
        H("shape1", "Shaping", "4:10", 25),
        P("proof1", "Apprêt", 75, 25, "cabinet", { range: [60, 75], levels: 2 }),
        B("bake1", "Bake, both decks", "5:50", 22, ["top", "bottom"], 250, { steam: true }),
        C("cool1", 30, "bake1"),
      ]),
      product("pl", "PL-01", "Pains au lait PL-01, 40 × 50 g (Friday's dough)", [
        D("night", "Pointage différé at +4 °C (dough from Friday)", 0, { place: "cold", noAfter: true }),
        H("divide", "Dividing", "4:10", 15),
        D("rest", "Détente in the cold", 35, { place: "cold" }),
        H("shape1", "Shaping", "5:00", 25),
        P("proof1", "Apprêt", 80, 25, "cabinet", { levels: 4 }),
        B("bake1", "Bake, bottom deck", "6:15", 12, ["bottom"], 180),
        C("cool1", 30, "bake1"),
      ]),
    ],
  }),

  // 22.2 model answer for practice order 22-A (shortened croissant chain).
  "ep2-22a": () => ({
    title: "Practice order 22-A, one candidate (22.2)",
    note: "Lesson 22.2 model answer: four doughs from 7:00, products presented at 14:00, croissants on the shortened chain (blast chiller, single + double turn). Pâte fermentée and crème pâtissière are supplied. Small tasks in brackets in the lesson show here as notes.",
    equipment: "bakery",
    mixer: true,
    deadline: "14:00",
    start: "7:00",
    kitchen: 22,
    cabinet: { temp: 25, levels: 16 },
    ovens: ovens("bakery", { top: "10:00", bottom: "10:00", fan: "11:05" }),
    products: [
      product("cr", "CR-01-short", "CR-01 laminated, 10 croissants, 10 pains au chocolat, 10 pains aux raisins", [
        H("weigh", "Weigh CR-01, cold liquids", "7:00", 10),
        M("detrempe", "Détrempe 20 °C, flatten 2 cm, film", "7:10", 10),
        D("chill", "Blast chiller 40 min, then cold room", 60, { min: 40, place: "cold" }),
        H("butter", "Butter plaque 450 g; soak raisins", "7:20", 10, { side: true }),
        H("turn1", "Lock-in and single turn", "8:20", 15, { after: "chill" }),
        D("rest1", "Rest", 45, { min: 30, place: "cold" }),
        H("turn2", "Double turn", "9:20", 10),
        D("final", "Final rest", 55, { min: 40, place: "cold" }),
        H("shape1", "Sheet 3.5 mm; pains aux raisins, pains au chocolat, croissants", "10:25", 35),
        H("clean", "Clean sheeter, rolling pin, bench", "11:05", 15, { side: true }),
        P("proof1", "Proof", 120, 25, "cabinet", { range: [90, 150], levels: 3, after: "shape1" }),
        B("bake1", "Bake, fan 175 °C", "12:45", 20, ["fan"], 175),
        C("cool1", 20, "bake1"),
      ], { short: "CR-01" }),
      product("pc", "PC-02", "Pain courant PC-02: 12 baguettes, 4 boules, 4 fendus, 24 rolls", [
        H("weigh", "Readings, water temperatures; weigh PC-02 and PL-01", "7:30", 15),
        M("mix", "Mixing, 24 °C", "7:45", 15),
        P("pointage", "Pointage, one fold", 50, 24, "dough", { range: [45, 55] }),
        H("divide", "Divide 44 pieces, pre-shape", "8:55", 25),
        D("detente", "Détente", 25, { min: 15 }),
        H("shape1", "Shape baguettes", "9:45", 12),
        P("proof1", "Apprêt baguettes", 60, 25, "cabinet", { range: [60, 75], levels: 1 }),
        B("bake1", "Bake baguettes, top deck", "11:00", 25, ["top"], 250, { steam: true }),
        C("cool1", 30, "bake1"),
        H("shape2", "Shape boules and fendus", "9:57", 8, { after: "shape1", follows: true }),
        P("proof2", "Apprêt boules and fendus", 60, 25, "cabinet", { range: [60, 75], levels: 1 }),
        B("bake2", "Bake boules and fendus, bottom deck", "11:00", 30, ["bottom"], 250, { steam: true }),
        C("cool2", 30, "bake2"),
        H("shape3", "Shape 24 rolls", "10:05", 10, { after: "shape2", follows: true }),
        P("proof3", "Apprêt rolls", 60, 25, "room", { range: [60, 75] }),
        B("bake3", "Bake rolls, top deck", "11:30", 16, ["top"], 250, { steam: true }),
        C("cool3", 30, "bake3"),
        EV("fold1", "Fold", "pointage", "8:40"),
      ]),
      product("vi", "VI-01", "Pain viennois VI-01, 6 × 250 g", [
        M("mix", "Weigh and mix VI-01, 25 °C; scrape the mixer", "8:35", 20),
        P("pointage", "Pointage", 35, 25, "dough", { range: [30, 45] }),
        H("divide", "Divide 6 × 250 g, pre-shape; couches and boards", "9:30", 15),
        D("detente", "Détente", 20, { min: 15 }),
        H("shape1", "Shape, first egg wash", "10:15", 10),
        P("proof1", "Apprêt", 75, 27, "cabinet", { range: [60, 90], levels: 2 }),
        B("bake1", "Bake, fan 175 °C", "11:27", 16, ["fan"], 175),
        C("cool1", 20, "bake1"),
      ]),
      product("pl", "PL-01", "Pain au lait PL-01: 1 braid, 10 navettes, 6 hedgehogs", [
        M("mix", "Mixing, 24 °C", "8:00", 20),
        P("pointage", "Pointage", 45, 24, "dough"),
        D("cold1", "Flattened, cold room", 30, { min: 0, place: "cold" }),
        H("divide", "Divide cold: 3 × 100 g, 10 × 50 g, 6 × 60 g", "11:20", 15),
        H("shape1", "Shape braid, navettes, hedgehogs; first egg wash", "11:35", 30),
        P("proof1", "Apprêt", 75, 25, "cabinet", { range: [60, 105], levels: 2 }),
        B("bake1", "Bake, bottom deck 180 °C", "12:55", 23, ["bottom"], 180),
        C("cool1", 30, "bake1"),
        EV("flatten", "Flatten, film, cold room", "cold1", "9:05"),
      ]),
    ],
  }),

  // 22.5 reference plan: the full home production day, one tray, oven queue of seven loads.
  "home-day": () => ({
    title: "Home production day, one tray (22.5)",
    note: "Lesson 22.5 reference plan: kitchen about 24 °C, air-conditioned room 25 °C, oven 45 minutes to 250 °C, seven loads in a queue. The détrempe at 5:30 is the critical path. The oven idles between the viennois and the croissants: the plan switches it off.",
    equipment: "home",
    mixer: false,
    deadline: "14:30",
    start: "5:30",
    kitchen: 24,
    ac: 25,
    cabinet: null,
    ovens: ovens("home", { home: "8:40" }),
    products: [
      product("cr", "CR-01", "CR-01 laminated: 4 croissants, 4 pains au chocolat, 4 pains aux raisins", [
        M("detrempe", "Weigh CR-01; détrempe by hand, 20 °C; flatten, film, fridge", "5:30", 15),
        D("chill", "Chill in the fridge", 120, { min: 120, place: "fridge" }),
        H("butter", "Butter plaque to the fridge; soak raisins", "7:05", 15, { side: true }),
        H("turn1", "Lock-in and turn 1", "8:00", 15, { after: "chill" }),
        D("rest1", "Rest", 30, { min: 30, place: "fridge" }),
        H("turn2", "Turn 2", "8:45", 10),
        D("rest2", "Rest", 30, { min: 30, place: "fridge" }),
        H("turn3", "Turn 3", "9:35", 10),
        D("final", "Final rest", 60, { min: 60, place: "fridge" }),
        H("shape1", "Roll and cut: pains aux raisins, pains au chocolat, croissants; first egg wash", "10:45", 35),
        P("proof1", "Proof croissants and pains au chocolat", 120, 25, "ac", { range: [90, 150] }),
        B("bake1", "Load 5: croissants and pains au chocolat", "12:50", 18, ["home"], 200),
        C("cool1", 20, "bake1"),
        P("proof2", "Proof pains aux raisins", 120, 25, "ac", { range: [90, 150], after: "shape1" }),
        B("bake2", "Load 6: pains aux raisins", "13:12", 20, ["home"], 200),
        C("cool2", 20, "bake2"),
      ]),
      product("cp", "CP-01", "CP-01 crème pâtissière, 200 g milk", [
        H("cook", "Cook CP-01; shallow tray on ice; log 63 °C", "5:45", 20),
        st("chill", "Ice bath to 10 °C, then fridge", "cold", { dur: 45, follows: true, max: 120 }),
      ]),
      product("pc", "PC-02", "PC-02: 2 baguettes + 1 épi, boule + fendu, 6 rolls", [
        H("weigh", "Readings; water and milk temperatures; weigh PC-02, PL-01, VI-01", "6:05", 15),
        M("mix", "PC-02 by hand, 24 °C", "6:20", 20),
        P("pointage", "Pointage, fold at 7:10", 50, 24, "dough", { range: [45, 55] }),
        H("divide", "Divide and pre-shape; 75 g pâte fermentée to the fridge", "7:40", 15),
        D("detente", "Détente", 20, { min: 15 }),
        H("shape1", "Shape baguettes and épi pâton", "8:15", 10),
        P("proof1", "Apprêt baguettes", 60, 25, "room", { range: [60, 75] }),
        B("bake1", "Load 1: baguettes and épi, steam", "9:30", 25, ["home"], 250, { steam: true }),
        C("cool1", 30, "bake1"),
        H("shape2", "Shape boule and fendu", "8:25", 5, { after: "shape1", follows: true }),
        P("proof2", "Apprêt boule and fendu (coolest place)", 60, 25, "room", { range: [60, 75] }),
        B("bake2", "Load 2: boule and fendu, steam", "10:00", 28, ["home"], 250, { steam: true }),
        C("cool2", 30, "bake2"),
        H("shape3", "Shape 6 rolls; fridge", "8:30", 10, { after: "shape2", follows: true }),
        P("proof3", "Rolls held in the fridge, then apprêt", 60, 25, "fridge", { range: [60, 75] }),
        B("bake3", "Load 3: rolls, steam", "10:30", 16, ["home"], 250, { steam: true }),
        C("cool3", 30, "bake3"),
        EV("fold1", "Fold", "pointage", "7:10"),
        EV("rollsout", "Rolls out of the fridge", "proof3", "9:45", 2),
      ]),
      product("vi", "VI-01", "VI-01: 3 baguettes viennoises 280 g", [
        M("mix", "VI-01 by hand, 25 °C", "7:20", 20),
        P("pointage", "Pointage", 35, 25, "dough", { range: [30, 45] }),
        D("cold1", "Flattened in the fridge", 40, { min: 0, place: "fridge" }),
        H("divide", "Divide 3 × 280 g, pre-shape", "8:55", 15),
        D("detente", "Détente", 20, { min: 15 }),
        H("shape1", "Shape, first egg wash", "9:45", 10),
        P("proof1", "Apprêt", 75, 27, "room", { range: [60, 90] }),
        B("bake1", "Load 4: viennois, no steam", "11:00", 16, ["home"], 190),
        C("cool1", 20, "bake1"),
        EV("tofridge", "VI to the fridge", "cold1", "8:15"),
      ]),
      product("pl", "PL-01", "PL-01: braid 3 × 80 g, 2 navettes, 2 hedgehogs", [
        M("mix", "PL-01 by hand, 24 °C", "6:40", 25),
        P("pointage", "Pointage", 45, 24, "dough"),
        D("cold1", "Flattened in the fridge", 60, { min: 0, place: "fridge" }),
        H("divide", "PL divide, back to the fridge; trays and paper", "9:10", 15),
        D("cold2", "In the fridge", 30, { min: 0, place: "fridge" }),
        H("shape1", "Shape braid, navettes, hedgehogs; first egg wash", "12:20", 20),
        P("proof1", "Apprêt", 75, 25, "ac", { range: [60, 105] }),
        B("bake1", "Load 7: pain au lait", "13:37", 22, ["home"], 185),
        C("cool1", 30, "bake1"),
        EV("tofridge", "PL to the fridge", "cold1", "7:50"),
      ]),
    ],
  }),

  // Your own order: pick sheets and quantities.
  custom: () => {
    const plan = {
      title: "Your own order",
      note: "Your own order: choose the equipment, the deadline and the products. Each product is planned backwards from the deadline; then fix the conflicts by moving stages, changing proof places or the oven switch-on times.",
      equipment: "bakery",
      mixer: true,
      deadline: "7:00",
      start: "1:00",
      kitchen: 22,
      ac: 25,
      cabinet: { temp: 25, levels: 16 },
      ovens: OVEN_SETS.bakery.map((o) => ({ ...o, on: NaN })),
      products: [buildProduct("TR-01", 24, "bakery"), buildProduct("PC-02", 24, "bakery")],
      custom: true,
    };
    return plan;
  },
};

export const PRESETS = {
  "m14-one-bread": { title: "40 tradition baguettes for 7:30 (14.1)" },
  "m14-two-products": { title: "Two products at home for 19:00 (14.2)" },
  "m14-conflicts": { title: "Draft with five conflicts (14.3)" },
  "ep2-22a": { title: "Practice order 22-A (22.2)" },
  "home-day": { title: "Home production day (22.5)" },
  custom: { title: "Your own order" },
};
export const DEFAULT_PRESET = "m14-one-bread";

/** A fresh, independent plan for a preset. */
export function loadPreset(name) {
  const build = PRESET_BUILDERS[name] || PRESET_BUILDERS[DEFAULT_PRESET];
  const plan = build();
  plan.preset = PRESET_BUILDERS[name] ? name : DEFAULT_PRESET;
  plan.doughOff = 0;
  finishPreset(plan);
  if (plan.custom) planAll(plan, "backward");
  return plan;
}

/** Switch the equipment of a custom order: ovens, cabinet and every product rebuilt from its sheet. */
export function setEquipment(plan, equipment) {
  plan.equipment = equipment;
  plan.mixer = equipment === "bakery";
  plan.cabinet = equipment === "bakery" ? { temp: 25, levels: 16 } : null;
  plan.ovens = OVEN_SETS[equipment].map((o) => ({ ...o, on: NaN }));
  const table = equipment === "home" ? DEFAULT_QTY_HOME : DEFAULT_QTY;
  plan.products = plan.products.map((p) => buildProduct(p.sheet, table[p.sheet] ?? p.qty, equipment));
  planAll(plan, "backward");
}
