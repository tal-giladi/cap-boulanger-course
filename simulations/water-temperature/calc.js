// Base-temperature method, exactly as taught in lessons 05.2 and 05.3 (pure functions, no DOM).
//   base  = TPV × n            (n = 3, or 4 with a pre-ferment)
//   water = base − flour − room (− pre-ferment) − friction factor
//   friction factor = heating of the dough × n
//   printed TB already excludes friction: water = TB − room − flour (− pre-ferment)
//   ice   = total water × (tap − wanted) ÷ (tap + 80), counted inside the water weight
//   blend = total water × (tap − wanted) ÷ (tap − cold)
//   fermentation ≈ 7 % faster or slower per °C (lesson 04.2), pointage ÷ or × 1.07^Δ

export const ICE_HEAT = 80; // melting 1 g of ice ≈ cooling 80 g of water by 1 °C
export const COLD_LIMIT = 1; // coldest water you can count on in practice
export const COLD_WARN = 2; // "about 1-2 °C": at or below this the water alone is at its limit
export const HOT_LIMIT = 40; // water above this should not meet yeast
export const RATE = 1.07; // fermentation speed per °C

// Heating of the dough per mixing method (lesson 05.3 table; hand = 2 °C gives the course's 6 / 8).
export const METHODS = {
  "hand-folds": { label: "By hand, gentle folds in the bowl", heating: 1, range: "about 0-1 °C" },
  hand: { label: "By hand, 10 minutes of kneading", heating: 2, range: "about 1-3 °C" },
  "stand-mixer": { label: "Home stand mixer, about 7 minutes", heating: 4.5, range: "about 4-5 °C" },
  "spiral-slow": { label: "Spiral, slow mixing (first speed)", heating: 3, range: "about 2-4 °C" },
  "spiral-improved": { label: "Spiral, improved mixing", heating: 5, range: "about 4-7 °C" },
  "spiral-intensive": { label: "Spiral, intensive mixing", heating: 10, range: "10 °C or more" },
  custom: { label: "My measured friction factor", heating: null, range: "" },
};

const round1 = (x) => Math.round(x * 10) / 10;
// Two decimals via three, as the lessons round: 1.07² = 1.1449 → 1.145 → 1.15 (lesson 05.4).
const round2 = (x) => Math.round(Math.round(x * 1000) / 10) / 100;

/** Number as the lessons write it: 1 decimal at most, thousands comma, true minus sign. */
export function fmt(x) {
  const r = round1(x);
  const abs = Math.abs(r);
  const s = Number.isInteger(abs)
    ? abs.toLocaleString("en-US")
    : abs.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  return (r < 0 ? "−" : "") + s;
}
/** A term inside a calculation: negatives in brackets so "72 − (−2)" stays readable. */
const term = (x) => (round1(x) < 0 ? `(${fmt(x)})` : fmt(x));

export function frictionFactor(method, n, custom) {
  if (method === "custom") return Number(custom);
  const m = METHODS[method] || METHODS.hand;
  return m.heating * n;
}

/**
 * input: { mode: "tpv"|"tb", tpv, tb, flour, room, preferment: bool, prefermentTemp,
 *          method, friction (custom), waterWeight, tap, cold, reading, pointage }
 */
export function compute(input) {
  const i = input;
  const n = i.preferment ? 4 : 3;
  const steps = [];
  const flags = [];
  let water;
  let friction = null;

  if (i.mode === "tb") {
    const parts = [i.room, i.flour];
    if (i.preferment) parts.push(i.prefermentTemp);
    water = round1(i.tb - parts.reduce((a, b) => a + b, 0));
    steps.push({
      title: "Water temperature from the printed TB",
      expr: `${fmt(i.tb)} − (${parts.map(term).join(" + ")}) = ${fmt(water)} °C`,
      note: `Fournil, flour${i.preferment ? " and pre-ferment" : ""} only: the friction is already inside the TB. Never subtract it again.`,
    });
  } else {
    friction = round1(frictionFactor(i.method, n, i.friction));
    const m = METHODS[i.method] || METHODS.hand;
    steps.push({
      title: "Friction factor",
      expr:
        i.method === "custom"
          ? `your measured friction factor (${n} factors) = ${fmt(friction)}`
          : `about ${fmt(m.heating)} °C of heating × ${n} factors = ${fmt(friction)}`,
      note:
        i.method === "custom"
          ? `It must be measured with ${n} factors too: never use a ${n === 4 ? 3 : 4}-factor value here.`
          : `${m.label}: heating ${m.range}. Your own measurement always wins (lesson 05.3).`,
    });
    const base = round1(n * i.tpv);
    steps.push({
      title: "Base",
      expr: `${n} × ${fmt(i.tpv)} = ${fmt(base)}`,
      note: i.preferment ? "4 factors: flour, room, pre-ferment and water." : "3 factors: flour, room and water.",
    });
    const minus = [i.flour, i.room];
    if (i.preferment) minus.push(i.prefermentTemp);
    minus.push(friction);
    water = round1(base - minus.reduce((a, b) => a + b, 0));
    const tb = round1(base - friction);
    const inputs = [i.flour, i.room];
    if (i.preferment) inputs.push(i.prefermentTemp);
    steps.push({
      title: "Water temperature",
      expr: `${fmt(base)} − ${minus.map(term).join(" − ")} = ${fmt(water)} °C`,
      note: `Same answer from the TB: ${fmt(base)} − ${term(friction)} = ${fmt(tb)}; ${fmt(tb)} − (${inputs.map(term).join(" + ")}) = ${fmt(water)}.`,
    });
  }

  // Practical limits of the water (lesson 05.2) and what can actually go into the mixer.
  let usable = water;
  if (water > HOT_LIMIT) {
    usable = HOT_LIMIT;
    flags.push({
      kind: "bad",
      id: "hot",
      text: `${fmt(water)} °C is above about 40 °C: too hot where it meets yeast. Use 40 °C at most and warm the room or the flour instead, or accept a cooler dough and a longer pointage.`,
    });
  } else if (water < COLD_WARN) {
    if (water < COLD_LIMIT) usable = COLD_LIMIT;
    flags.push({
      kind: "bad",
      id: "cold-limit",
      text: `${fmt(water)} °C is ${water < COLD_LIMIT ? "below" : "at"} the practical limit of about 1-2 °C: the water alone (even all ice) cannot reach the target. Other levers: chill the flour (cold room overnight), cool the mixing room, pre-ferment straight from the cold, less second speed without under-mixing, or accept a warmer dough (shorter pointage, less yeast, report it).`,
    });
  }

  // Deviation of the dough if the water had to be capped.
  const deviation = round1((usable - water) / n);
  if (deviation !== 0) {
    steps.push({
      title: "Dough you will actually get",
      expr: `(${fmt(usable)} − ${term(water)}) ÷ ${n} ≈ ${deviation > 0 ? "+" : ""}${fmt(deviation)} °C off target`,
      note: `Water at ${fmt(usable)} °C instead of ${fmt(water)} °C moves the dough by the difference divided by the ${n} factors.`,
    });
  }

  // Getting that water from the supply.
  const supply = { usable, ice: null, tapWater: null, coldWater: null, blendTap: null, need: "none" };
  const W = i.waterWeight;
  if (usable < i.tap) {
    supply.need = "colder";
    const ice = Math.round((W * (i.tap - usable)) / (i.tap + ICE_HEAT));
    supply.ice = ice;
    supply.tapWater = W - ice;
    steps.push({
      title: "Ice (tap is too warm)",
      expr: `${fmt(W)} × (${fmt(i.tap)} − ${term(usable)}) ÷ (${fmt(i.tap)} + 80) = ${fmt(W)} × ${fmt(round1(i.tap - usable))} ÷ ${fmt(round1(i.tap + ICE_HEAT))} ≈ ${fmt(ice)} g of ice + ${fmt(W)} − ${fmt(ice)} = ${fmt(W - ice)} g of tap water`,
      note: "The ice is part of the water: the total weight stays the same. Crushed ice or small cubes, in with the water at the start of frasage.",
    });
    if (i.cold <= usable) {
      const coldW = Math.round((W * (i.tap - usable)) / (i.tap - i.cold));
      supply.coldWater = coldW;
      supply.blendTap = W - coldW;
      steps.push({
        title: "Or blend with cold water",
        expr: `${fmt(W)} × (${fmt(i.tap)} − ${term(usable)}) ÷ (${fmt(i.tap)} − ${term(i.cold)}) = ${fmt(W)} × ${fmt(round1(i.tap - usable))} ÷ ${fmt(round1(i.tap - i.cold))} ≈ ${fmt(coldW)} g of ${fmt(i.cold)} °C water + ${fmt(W - coldW)} g of tap water`,
        note: "Water cooler, or a bottle kept in the fridge (about 4-5 °C).",
      });
    } else {
      steps.push({
        title: "Or blend with cold water",
        expr: `not possible: the cold water (${fmt(i.cold)} °C) is not colder than the ${fmt(usable)} °C you need`,
        note: "Use ice, or the other levers.",
      });
    }
  } else if (usable > i.tap) {
    supply.need = "warmer";
    steps.push({
      title: "Warmer than the tap",
      expr: `${fmt(usable)} °C wanted, tap ${fmt(i.tap)} °C`,
      note: "Warm part of the water in a kettle (not from the hot tap) and blend, checking with the probe.",
    });
  } else {
    steps.push({ title: "Supply", expr: `tap water at ${fmt(i.tap)} °C is right`, note: "" });
  }

  if (usable < 20) {
    flags.push({
      kind: "cold",
      id: "yeast",
      text: "Water below about 20 °C: mix instant yeast into the flour first, never straight into the cold water.",
    });
  }
  if (!flags.some((f) => f.kind === "bad")) {
    flags.unshift({ kind: "good", id: "ok", text: `${fmt(water)} °C is within the practical range of the water (about 1-2 °C to 40 °C).` });
  }

  const predicted = round1(i.tpv + deviation);
  return { n, friction, water, usable, deviation, predicted, steps, flags, supply };
}

/** 7 % per °C rule: how the pointage on the sheet changes for a dough read off target. */
export function fermentation(tpv, reading, minutes) {
  const delta = round1(reading - tpv);
  if (delta === 0) {
    return { delta, factor: 1, percent: 0, minutes, direction: "on", expr: `pointage ${fmt(minutes)} min, as on the sheet` };
  }
  const factor = round2(RATE ** Math.abs(delta));
  const percent = Math.round((factor - 1) * 100);
  const faster = delta > 0;
  const newMin = Math.round(faster ? minutes / factor : minutes * factor);
  return {
    delta,
    factor,
    percent,
    minutes: newMin,
    direction: faster ? "faster" : "slower",
    expr: `1.07^${fmt(Math.abs(delta))} ≈ ${factor.toFixed(2)}: pointage ${fmt(minutes)} ${faster ? "÷" : "×"} ${factor.toFixed(2)} ≈ ${fmt(newMin)} min`,
  };
}

export const PRESETS = {
  "pd01-hand": {
    title: "PD-01 by hand (lesson 05.2 practice)",
    note: "PD-01 at home, kneaded by hand for 10 minutes: 3 factors, friction factor 6.",
    values: { mode: "tpv", tpv: 24, tb: 57, flour: 20, room: 21, preferment: false, prefermentTemp: 6, method: "hand", friction: 6, waterWeight: 325, tap: 20, cold: 5, reading: 24, pointage: 45 },
  },
  "marche-direct": {
    title: "Direct dough on the spiral (05.2 worked example)",
    note: "Boulangerie du Marché, pâte fermentée run out: 5,400 g T55, water 3,456 g, improved mixing (heating about 5 °C), water cooler at 4 °C.",
    values: { mode: "tpv", tpv: 24, tb: 57, flour: 21, room: 23, preferment: false, prefermentTemp: 6, method: "spiral-improved", friction: 15, waterWeight: 3456, tap: 19, cold: 4, reading: 24.5, pointage: 45 },
  },
  pc02: {
    title: "PC-02 with pâte fermentée, July (05.3 worked example)",
    note: "PC-02 in July, water cooler out of order: pâte fermentée 6 °C from the cold room is the fourth factor; friction factor 26 measured last week with 4 factors; 3,456 g of water, tap 26 °C, so ice (or water from a fridge, if there is any).",
    values: { mode: "tpv", tpv: 24, tb: 70, flour: 22, room: 25, preferment: true, prefermentTemp: 6, method: "custom", friction: 26, waterWeight: 3456, tap: 26, cold: 5, reading: 24.6, pointage: 45 },
  },
  "summer-israel": {
    title: "Summer kitchen in Israel (05.2 In Israel)",
    note: "30 °C kitchen, flour at 29 °C, hand kneading, tap water at 28 °C: tap water cannot do it.",
    values: { mode: "tpv", tpv: 24, tb: 66, flour: 29, room: 30, preferment: false, prefermentTemp: 6, method: "hand", friction: 6, waterWeight: 325, tap: 28, cold: 5, reading: 24, pointage: 45 },
  },
  "winter-israel": {
    title: "Winter kitchen in Israel (05.2 In Israel)",
    note: "18 °C kitchen, flour at 17 °C, hand kneading: the water must be warmer than the tap.",
    values: { mode: "tpv", tpv: 24, tb: 66, flour: 17, room: 18, preferment: false, prefermentTemp: 6, method: "hand", friction: 6, waterWeight: 325, tap: 16, cold: 5, reading: 24, pointage: 45 },
  },
  "ep1-brioche": {
    title: "EP1 2019 brioche sheet: TB 48 °C",
    note: "EP1 2019 paper: \"TB 48 °C, fournil 22 °C, farine 22 °C\". Use the TB the paper gives. Water weight and tap are example values; the TPV (brioche 22-24 °C) is only for the fermentation hint.",
    values: { mode: "tb", tpv: 23, tb: 48, flour: 22, room: 22, preferment: false, prefermentTemp: 6, method: "spiral-intensive", friction: 15, waterWeight: 300, tap: 18, cold: 4, reading: 23, pointage: 45 },
  },
};
export const DEFAULT_PRESET = "pd01-hand";
