import { writeFileSync, mkdirSync } from "node:fs";

const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const MONO = "'SFMono-Regular', Consolas, 'Liberation Mono', monospace";

const projects = [
  { file: "project-astra.svg", name: "Astra", sub: "Ecossistema de estudos", tag: "MONÓLITO MODULAR" },
  { file: "project-lexo.svg", name: "Lexo", sub: "SaaS jurídico com IA", tag: "9 MICROSSERVIÇOS" },
];

const W = 830;
const H = 116;
const PAD = 32;

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

for (const p of projects) {
  const tagW = Math.round(p.tag.length * 10.4 + 36);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(p.name)}, ${esc(p.sub)}, ${esc(p.tag)}" font-family="${FONT}">
<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="16" fill="#0a0a0a" stroke="#3a3a3a"/>
<text x="${PAD}" y="58" font-size="40" font-weight="700" fill="#f5f5f5">${esc(p.name)}</text>
<text x="${PAD}" y="90" font-size="19" fill="#9a9a9a">${esc(p.sub)}</text>
<rect x="${W - PAD - tagW}" y="${H / 2 - 20}" width="${tagW}" height="40" rx="20" fill="none" stroke="#4a4a4a"/>
<text x="${W - PAD - tagW / 2}" y="${H / 2 + 6}" font-size="16" letter-spacing="1.5" text-anchor="middle" fill="#e8e8e8" font-family="${MONO}">${esc(p.tag)}</text>
</svg>`;
  mkdirSync("assets", { recursive: true });
  writeFileSync(`assets/${p.file}`, svg);
}
console.log("ok");
