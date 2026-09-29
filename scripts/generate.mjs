import { writeFileSync, mkdirSync } from "node:fs";

const LOGIN = "KauanDiNubila";
const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;

const C = {
  bg: "#FAFAF8",
  ink: "#111110",
  muted: "#6B6A65",
  line: "#E6E4DE",
  accent: "#E4570E",
  levels: ["#EDEBE6", "#F9D3B8", "#F2A06B", "#E4570E", "#A83A05"],
};

const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const MONO = "'SFMono-Regular', Consolas, 'Liberation Mono', monospace";

const QUERY = `
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
    repositories(ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC, first: 100) {
      totalCount
      nodes { primaryLanguage { name } }
    }
  }
}`;

async function fetchData() {
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
  return json.data.user;
}

function card(width, height, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
<rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="12" fill="${C.bg}" stroke="${C.line}"/>
${inner}
</svg>`;
}

function statsSvg(user) {
  const cc = user.contributionsCollection;
  const items = [
    [cc.contributionCalendar.totalContributions, "contribuições"],
    [cc.totalCommitContributions, "commits"],
    [cc.totalPullRequestContributions, "pull requests"],
    [cc.totalIssueContributions, "issues"],
    [user.repositories.totalCount, "repos públicos"],
  ];
  const W = 830;
  const H = 130;
  const colW = (W - 40) / items.length;
  const cells = items
    .map(([value, label], i) => {
      const cx = 20 + colW * i + colW / 2;
      const divider =
        i > 0
          ? `<line x1="${20 + colW * i}" y1="34" x2="${20 + colW * i}" y2="96" stroke="${C.line}"/>`
          : "";
      return `${divider}
<text x="${cx}" y="72" text-anchor="middle" font-family="${FONT}" font-size="34" font-weight="700" fill="${i === 0 ? C.accent : C.ink}">${value}</text>
<text x="${cx}" y="94" text-anchor="middle" font-family="${FONT}" font-size="12" fill="${C.muted}">${label}</text>`;
    })
    .join("\n");
  const title = `<text x="20" y="26" font-family="${MONO}" font-size="11" letter-spacing="1.5" fill="${C.muted}">ÚLTIMOS 12 MESES</text>`;
  return card(W, H, title + cells);
}

function heatmapSvg(weeks) {
  const cell = 11;
  const gap = 3;
  const left = 20;
  const top = 44;
  const all = weeks.flatMap((w) => w.contributionDays.map((d) => d.contributionCount));
  const max = Math.max(...all, 1);
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
        .map((d, y) => {
          const dt = new Date(d.date + "T00:00:00Z");
          const dow = dt.getUTCDay();
          return `<rect x="${left + x * (cell + gap)}" y="${top + dow * (cell + gap)}" width="${cell}" height="${cell}" rx="2.5" fill="${C.levels[level(d.contributionCount)]}"><title>${d.date}: ${d.contributionCount}</title></rect>`;
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
        `<text x="${left + x * (cell + gap)}" y="38" font-family="${FONT}" font-size="10" fill="${C.muted}">${name}</text>`
      );
      last = m;
    }
  });
  const W = 830;
  const gridW = weeks.length * (cell + gap);
  const H = top + 7 * (cell + gap) + 34;
  const legendY = H - 16;
  const legendX = W - 20 - 5 * (cell + 4) - 60;
  const legend =
    `<text x="${legendX}" y="${legendY + 9}" text-anchor="end" font-family="${FONT}" font-size="10" fill="${C.muted}">menos</text>` +
    C.levels
      .map(
        (c, i) =>
          `<rect x="${legendX + 8 + i * (cell + 4)}" y="${legendY}" width="${cell}" height="${cell}" rx="2.5" fill="${c}"/>`
      )
      .join("") +
    `<text x="${legendX + 8 + 5 * (cell + 4) + 4}" y="${legendY + 9}" font-family="${FONT}" font-size="10" fill="${C.muted}">mais</text>`;
  const title = `<text x="20" y="22" font-family="${MONO}" font-size="11" letter-spacing="1.5" fill="${C.muted}">ATIVIDADE</text>`;
  const offset = Math.max(0, (W - 40 - gridW) / 2);
  return card(
    W,
    H,
    title + `<g transform="translate(${offset},0)">${months.join("")}${rects}</g>` + legend
  );
}

function languagesSvg(user) {
  const counts = new Map();
  for (const r of user.repositories.nodes) {
    const name = r.primaryLanguage?.name;
    if (!name || ["HTML", "CSS"].includes(name)) continue;
    counts.set(name, (counts.get(name) || 0) + 1);
  }
  const entries = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((s, [, n]) => s + n, 0) || 1;
  const palette = [C.accent, C.ink, "#F2A06B", "#8A8983", "#A83A05", "#C9C6BD"];
  const W = 830;
  const barX = 20;
  const barW = W - 40;
  let x = barX;
  const segs = entries
    .map(([, n], i) => {
      const w = (n / total) * barW;
      const seg = `<rect x="${x}" y="40" width="${Math.max(w - 2, 1)}" height="10" rx="5" fill="${palette[i % palette.length]}"/>`;
      x += w;
      return seg;
    })
    .join("");
  const legend = entries
    .map(([name, n], i) => {
      const lx = 20 + i * 150;
      return `<circle cx="${lx + 5}" cy="76" r="5" fill="${palette[i % palette.length]}"/>
<text x="${lx + 16}" y="80" font-family="${FONT}" font-size="12" fill="${C.ink}">${name} <tspan fill="${C.muted}">${Math.round((n / total) * 100)}%</tspan></text>`;
    })
    .join("\n");
  const title = `<text x="20" y="26" font-family="${MONO}" font-size="11" letter-spacing="1.5" fill="${C.muted}">LINGUAGEM PRINCIPAL POR REPOSITÓRIO</text>`;
  return card(W, 100, title + segs + legend);
}

function bannerSvg() {
  const W = 830;
  const H = 240;
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const nodes = [];
  for (let i = 0; i < 46; i++) {
    nodes.push({
      x: 470 + rnd() * 340,
      y: 20 + rnd() * 200,
      accent: rnd() < 0.22,
      r: 1.6 + rnd() * 2.6,
    });
  }
  const links = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (d < 62) {
        const orange = nodes[i].accent || nodes[j].accent;
        links.push(
          `<line x1="${nodes[i].x.toFixed(1)}" y1="${nodes[i].y.toFixed(1)}" x2="${nodes[j].x.toFixed(1)}" y2="${nodes[j].y.toFixed(1)}" stroke="${orange ? C.accent : C.ink}" stroke-opacity="${orange ? 0.45 : 0.16}" stroke-width="1"/>`
        );
      }
    }
  }
  const dots = nodes
    .map(
      (n) =>
        `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${n.r.toFixed(1)}" fill="${n.accent ? C.accent : C.ink}"/>`
    )
    .join("");
  const inner = `
${links.join("\n")}
${dots}
<text x="40" y="78" font-family="${MONO}" font-size="12" letter-spacing="2" fill="${C.accent}">BACK-END · JAVA · SPRING</text>
<text x="40" y="135" font-family="${FONT}" font-size="50" font-weight="700" fill="${C.ink}">Kauan Di Nubila</text>
<text x="40" y="170" font-family="${FONT}" font-size="17" fill="${C.muted}">Sistemas completos, do código ao deploy.</text>
<rect x="40" y="192" width="56" height="4" rx="2" fill="${C.accent}"/>`;
  return card(W, H, inner);
}

const user = await fetchData();
const weeks = user.contributionsCollection.contributionCalendar.weeks;

mkdirSync("assets", { recursive: true });
writeFileSync("assets/banner.svg", bannerSvg());
writeFileSync("assets/stats.svg", statsSvg(user));
writeFileSync("assets/heatmap.svg", heatmapSvg(weeks));
writeFileSync("assets/languages.svg", languagesSvg(user));
console.log("ok");
