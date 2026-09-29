import { writeFileSync, mkdirSync } from "node:fs";

const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const MONO = "'SFMono-Regular', Consolas, 'Liberation Mono', monospace";

const projects = [
  { file: "card-astra.svg", name: "Astra", sub: "Ecossistema de estudos" },
  { file: "card-lexo.svg", name: "Lexo", sub: "SaaS jurídico com IA" },
];

const H = 68;
const PAD = 28;

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

for (const p of projects) {
  const nameW = Math.round(p.name.length * 17.5 + 18);
  const W = PAD + nameW + Math.round(p.sub.length * 10.6) + PAD;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(p.name)}, ${esc(p.sub)}" font-family="${FONT}">
<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="14" fill="#0a0a0a" stroke="#3a3a3a"/>
<text x="${PAD}" y="45" font-size="34" font-weight="700" fill="#f5f5f5">${esc(p.name)}</text>
<text x="${PAD + nameW}" y="44" font-size="23" fill="#b0b0b0">${esc(p.sub)}</text>
</svg>`;
  mkdirSync("assets", { recursive: true });
  writeFileSync(`assets/${p.file}`, svg);
}
function button(file, label, w, primary) {
  const stroke = primary ? "#f5f5f5" : "#4a4a4a";
  const dot = primary ? `<circle cx="22" cy="22" r="4" fill="#f5f5f5"/>` : "";
  const tx = primary ? w / 2 + 8 : w / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="44" viewBox="0 0 ${w} 44" role="img" aria-label="${esc(label)}" font-family="${FONT}">
<rect x="0.5" y="0.5" width="${w - 1}" height="43" rx="22" fill="#0a0a0a" stroke="${stroke}"/>
${dot}
<text x="${tx}" y="28" font-size="16" font-weight="600" text-anchor="middle" fill="#f5f5f5">${esc(label)}</text>
</svg>`;
  writeFileSync(`assets/${file}`, svg);
}

button("botao-demo.svg", "Demo ao vivo ↗", 168, true);
button("botao-codigo.svg", "Código ↗", 124, false);
console.log("ok");
