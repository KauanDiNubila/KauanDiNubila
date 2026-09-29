import { writeFileSync, mkdirSync } from "node:fs";

const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const MONO = "'SFMono-Regular', Consolas, 'Liberation Mono', monospace";

const projects = [
  {
    file: "project-astra.svg",
    name: "Astra",
    sub: "Ecossistema de estudos · monólito modular",
    host: "astra-app.dev",
    left: [
      "Sessões de foco (Pomodoro ou manual) e metas",
      "Heatmap, streak, ranking social e roadmaps",
      "Chat em tempo real entre amigos",
      "Cruza a atividade do GitHub com o tempo estudado",
    ],
    right: [
      "Monólito modular por feature, PostgreSQL e Flyway",
      "Tudo derivado por agregação sobre a sessão",
      "JWT curto, refresh com rotação e login OAuth2",
      "CSP, auditoria OWASP ZAP e testes com Testcontainers",
    ],
    chips: ["Java 21", "Spring Boot 4", "React", "PostgreSQL", "Neon", "Vercel", "Cloudflare"],
  },
  {
    file: "project-lexo.svg",
    name: "Lexo",
    sub: "SaaS jurídico · 9 microsserviços",
    host: "lexo-kauan1.duckdns.org",
    left: [
      "Gestão de escritórios de advocacia, multi-tenant",
      "Processos, clientes, agenda e honorários",
      "IA com Gemini: resumo, assistente e petições",
      "Portal público do cliente por magic link",
    ],
    right: [
      "API Gateway, Eureka e banco isolado por serviço",
      "Eventos no Kafka e filas RabbitMQ com dead-letter",
      "Circuit breaker, rate limiting e tracing com Zipkin",
      "Identidade assinada entre serviços, na Oracle Cloud",
    ],
    chips: ["Java 21", "Spring Cloud", "Kafka", "RabbitMQ", "Redis", "PostgreSQL", "Docker"],
  },
];

const W = 830;
const H = 292;
const PAD = 28;
const COL = (W - PAD * 2 - 36) / 2;

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function chip(x, y, text) {
  const w = Math.round(text.length * 6.9 + 22);
  return {
    w,
    svg: `<rect x="${x}" y="${y}" width="${w}" height="24" rx="12" fill="none" stroke="#3a3a3a"/><text x="${x + w / 2}" y="${y + 16}" font-size="11" text-anchor="middle" fill="#cfcfcf" font-family="${MONO}">${esc(text)}</text>`,
  };
}

function column(x, title, items) {
  const rows = items
    .map(
      (t, i) =>
        `<circle cx="${x + 3}" cy="${120 + i * 24}" r="2" fill="#8c8c8c"/><text x="${x + 14}" y="${124 + i * 24}" font-size="12.5" fill="#d0d0d0">${esc(t)}</text>`
    )
    .join("");
  return `<text x="${x}" y="99" font-size="10.5" letter-spacing="1.6" fill="#8c8c8c" font-family="${MONO}">${title}</text>${rows}`;
}

for (const p of projects) {
  let cx = PAD;
  const chips = p.chips
    .map((t) => {
      const c = chip(cx, H - 56, t);
      cx += c.w + 8;
      return c.svg;
    })
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(p.name)}: ${esc(p.sub)}" font-family="${FONT}">
<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="14" fill="#0a0a0a" stroke="#3a3a3a"/>
<text x="${PAD}" y="46" font-size="24" font-weight="700" fill="#f5f5f5">${esc(p.name)}</text>
<text x="${PAD}" y="66" font-size="13" fill="#8c8c8c">${esc(p.sub)}</text>
<rect x="${W - PAD - 190}" y="26" width="190" height="30" rx="15" fill="none" stroke="#3a3a3a"/>
<text x="${W - PAD - 95}" y="46" font-size="12" text-anchor="middle" fill="#f0f0f0" font-family="${MONO}">${esc(p.host)}</text>
<line x1="${PAD}" y1="78" x2="${W - PAD}" y2="78" stroke="#242424"/>
${column(PAD, "O QUE É", p.left)}
<line x1="${PAD + COL + 18}" y1="90" x2="${PAD + COL + 18}" y2="${H - 70}" stroke="#242424"/>
${column(PAD + COL + 36, "COMO FOI FEITO", p.right)}
<line x1="${PAD}" y1="${H - 68}" x2="${W - PAD}" y2="${H - 68}" stroke="#242424"/>
${chips}
</svg>`;
  mkdirSync("assets", { recursive: true });
  writeFileSync(`assets/${p.file}`, svg);
}
console.log("ok");
