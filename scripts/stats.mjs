import { writeFileSync, mkdirSync } from "node:fs";

const LOGIN = "KauanDiNubila";
const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;

const QUERY = `
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}`;

const res = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
    "User-Agent": "profile-readme-generator",
  },
  body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
});
if (!res.ok) throw new Error(`GraphQL HTTP ${res.status}`);
const json = await res.json();
if (json.errors) throw new Error(JSON.stringify(json.errors));

const calendar = json.data.user.contributionsCollection.contributionCalendar;
const weeks = calendar.weeks;

const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const cell = 11;
const gap = 3;
const left = 20;
const top = 46;
const W = 830;

const max = Math.max(
  ...weeks.flatMap((w) => w.contributionDays.map((d) => d.contributionCount)),
  1
);
const level = (n) => {
  if (n === 0) return 0;
  const r = n / max;
  if (r > 0.75) return 4;
  if (r > 0.5) return 3;
  if (r > 0.25) return 2;
  return 1;
};

const rects = weeks
  .map((w, x) =>
    w.contributionDays
      .map((d) => {
        const dow = new Date(d.date + "T00:00:00Z").getUTCDay();
        return `<rect class="l${level(d.contributionCount)}" x="${left + x * (cell + gap)}" y="${top + dow * (cell + gap)}" width="${cell}" height="${cell}" rx="2.5"><title>${d.date}: ${d.contributionCount}</title></rect>`;
      })
      .join("")
  )
  .join("\n");

const months = [];
let last = -1;
weeks.forEach((w, x) => {
  const dt = new Date(w.contributionDays[0].date + "T00:00:00Z");
  const m = dt.getUTCMonth();
  if (m !== last && dt.getUTCDate() <= 7) {
    const name = dt.toLocaleString("pt-BR", { month: "short", timeZone: "UTC" }).replace(".", "");
    months.push(
      `<text class="muted" x="${left + x * (cell + gap)}" y="40" font-size="10">${name}</text>`
    );
    last = m;
  }
});

const gridW = weeks.length * (cell + gap);
const H = top + 7 * (cell + gap) + 36;
const offset = Math.max(0, (W - 40 - gridW) / 2);
const legendY = H - 20;
const legendX = W - 20 - 5 * (cell + 4) - 70;
const legend =
  `<text class="muted" x="${legendX}" y="${legendY + 9}" text-anchor="end" font-size="10">menos</text>` +
  [0, 1, 2, 3, 4]
    .map(
      (i) =>
        `<rect class="l${i}" x="${legendX + 8 + i * (cell + 4)}" y="${legendY}" width="${cell}" height="${cell}" rx="2.5"/>`
    )
    .join("") +
  `<text class="muted" x="${legendX + 8 + 5 * (cell + 4) + 4}" y="${legendY + 9}" font-size="10">mais</text>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" font-family="${FONT}">
<style>
.box{fill:#ffffff;stroke:#d0d7de}
.muted{fill:#57606a}
.l0{fill:#ebedf0}
.l1{fill:#9be9a8}
.l2{fill:#40c463}
.l3{fill:#30a14e}
.l4{fill:#216e39}
@media (prefers-color-scheme:dark){
.box{fill:#0d1117;stroke:#30363d}
.muted{fill:#8b949e}
.l0{fill:#161b22}
.l1{fill:#0e4429}
.l2{fill:#006d32}
.l3{fill:#26a641}
.l4{fill:#39d353}
}
</style>
<rect class="box" x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="12"/>
<text class="muted" x="20" y="24" font-size="12">${calendar.totalContributions} contribuições no último ano</text>
<g transform="translate(${offset},0)">${months.join("")}${rects}</g>
${legend}
</svg>`;

mkdirSync("assets", { recursive: true });
writeFileSync("assets/activity.svg", svg);
console.log("ok");
