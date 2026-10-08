// Builds curriculum/manifest.json from curriculum/architecture.md (planning file, not imported).
import fs from "node:fs";
const arch = fs.readFileSync("curriculum/architecture.md", "utf8");
const modules = [];
let cur = null;
for (const line of arch.split("\n")) {
  const m = /^## Module (\d+) — (.+?)\s+\(project: ([\w-]+)\)/.exec(line);
  if (m) { cur = { number: +m[1], title: m[2], project: `projects/${m[3]}.md`, quiz: `assessments/module-${m[1].padStart(2, "0")}-quiz.md`, lessons: [] }; modules.push(cur); continue; }
  const l = /^\| (\d+) \| (\d{2}\.\d+) \| (.+?) \| (.+?) \| (.+?) \|$/.exec(line);
  if (l && cur) {
    const [nn, mm] = l[2].split(".");
    cur.lessons.push({ running: +l[1], id: l[2], file: `lessons/module-${nn}/lesson-${mm.padStart(2, "0")}.md`, title: l[3], competencies: l[4].split(/,\s*/), practice: l[5] });
  }
}
const manifest = {
  certification: "CAP Boulanger",
  rncp: "RNCP42115",
  level: 3,
  certifier: "Ministère de l'Éducation nationale",
  framework: { text: "Arrêté du 21 février 2014, modified by arrêté du 22 juillet 2019", rncp_pathways_from: "2026-09-01", rncp_registration_until: "2028-08-31", checked: "2026-10-08" },
  official_sources: ["https://www.francecompetences.fr/recherche/rncp/42115", "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000028699556", "https://referentiels-professionnels.eduscol.education.fr/"],
  blocks_covered: ["BC01", "BC02"],
  blocks_not_covered: ["BC03", "BC04", "BC05", "BC06", "BC07 (partly)"],
  competencies: ["C1.1","C1.2","C1.3","C2.1","C2.2","C2.3","C2.4","C2.5","C2.6","C2.7","C2.8","C3.1","C3.2","C4.1","C4.2","C4.3","C4.4"],
  assessments: { lesson_quiz: "3-5 MCQ", module_quiz: "8-10 MCQ scenarios", pass_mark: 0.7, ep1_mocks: "module 21", ep2_production_day: "module 22 + projects/m22-production-day.md" },
  practical_requirements: "see curriculum/physical-practice.md",
  modules,
};
fs.writeFileSync("curriculum/manifest.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(modules.length, "modules", modules.reduce((a, m) => a + m.lessons.length, 0), "lessons");
