// Rebuilds _sidebar.md: fixed reference links + every module whose status log says "module done".
// Lesson titles come from each lesson's H1; running numbers from curriculum/architecture.md.
import fs from "node:fs";
const manifest = JSON.parse(fs.readFileSync("curriculum/manifest.json", "utf8"));
const head = [
  "- [Home](/)",
  "- [The CAP Boulanger Exam (RNCP42115, checked 2026-10-08)](references/cap-exam.md)",
  "- [Glossary](glossary.md)",
  "- [Base Formulas](references/formulas.md)",
  "- [Flour in Israel](references/flour-in-israel.md)",
  "- [Troubleshooting](references/troubleshooting.md)",
  "- [Templates](templates/README.md)",
];
const stages = { 1: "Part 1 — Foundations", 8: "Part 2 — Bread Production", 11: "Part 3 — Viennoiserie", 13: "Part 4 — Organisation, Quality and Equipment", 17: "Part 5 — Hygiene, Environment and the Workplace", 21: "Part 6 — Exam Practice" };
const out = [...head];
for (const m of manifest.modules) {
  const nn = String(m.number).padStart(2, "0");
  const log = `curriculum/status/module-${nn}.log`;
  if (!fs.existsSync(log) || !/module done/.test(fs.readFileSync(log, "utf8"))) continue;
  if (stages[m.number]) out.push("", `- ${stages[m.number]}`);
  const firstLesson = fs.readFileSync(m.lessons[0].file, "utf8");
  out.push(`- **Module ${m.number} — ${m.title}**`);
  for (const l of m.lessons) {
    const h1 = /^# \d{2}\.\d+ · (.+)$/m.exec(fs.readFileSync(l.file, "utf8"))[1].trim();
    out.push(`  - [${String(l.running).padStart(2, "0")} · ${h1}](${l.file})`);
  }
  out.push(`  - [Module ${m.number} quiz](${m.quiz})`);
}
fs.writeFileSync("_sidebar.md", out.join("\n") + "\n");
console.log("sidebar written");
// The docsify site (index.html, relativePath on) needs root-absolute sidebar links.
fs.writeFileSync("_site_sidebar.md", out.join("\n").replace(/\]\((?!\/|https?:)/g, "](/") + "\n");
