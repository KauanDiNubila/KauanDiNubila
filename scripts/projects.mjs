import { writeFileSync, mkdirSync } from "node:fs";

const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

const projects = [
  { file: "cartao-astra.svg", name: "Astra", sub: "Ecossistema de estudos" },
  { file: "cartao-lexo.svg", name: "Lexo", sub: "SaaS jurídico com IA" },
];

const H = 42;
const PAD = 16;

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

mkdirSync("assets", { recursive: true });

for (const p of projects) {
  const nameW = Math.round(p.name.length * 12.6 + 12);
  const W = PAD + nameW + Math.round(p.sub.length * 7.2) + PAD;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(p.name)}, ${esc(p.sub)}" font-family="${FONT}">
<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="10" fill="#0a0a0a" stroke="#3a3a3a"/>
<text x="${PAD}" y="28" font-size="22" font-weight="700" fill="#f5f5f5">${esc(p.name)}</text>
<text x="${PAD + nameW}" y="27" font-size="15" fill="#b0b0b0">${esc(p.sub)}</text>
</svg>`;
  writeFileSync(`assets/${p.file}`, svg);
}

function button(file, label, w, primary) {
  const stroke = primary ? "#f5f5f5" : "#4a4a4a";
  const dot = primary ? `<circle cx="18" cy="16" r="3" fill="#f5f5f5"/>` : "";
  const tx = primary ? w / 2 + 9 : w / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="32" viewBox="0 0 ${w} 32" role="img" aria-label="${esc(label)}" font-family="${FONT}">
<rect x="0.5" y="0.5" width="${w - 1}" height="31" rx="16" fill="#0a0a0a" stroke="${stroke}"/>
${dot}
<text x="${tx}" y="21" font-size="13" font-weight="600" text-anchor="middle" fill="#f5f5f5">${esc(label)}</text>
</svg>`;
  writeFileSync(`assets/${file}`, svg);
}

button("btn-demo.svg", "Demo ao vivo ↗", 138, true);
button("btn-codigo.svg", "Código ↗", 96, false);
console.log("ok");
