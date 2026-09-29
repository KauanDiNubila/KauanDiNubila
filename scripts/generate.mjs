import { writeFileSync, mkdirSync } from "node:fs";

const LOGIN = "KauanDiNubila";
const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;

const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const MONO = "'SFMono-Regular', Consolas, 'Liberation Mono', monospace";
const BG = "#0a0a0a";
const EDGE = "#3a3a3a";
const INK = "#f5f5f5";
const MUTED = "#8c8c8c";

const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

async function gql(query, variables) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "profile-readme-generator",
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`GraphQL HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

const PROFILE = `
query($login: String!) {
  user(login: $login) {
    createdAt
    repositories(ownerAffiliations: OWNER, privacy: PUBLIC, first: 100) {
      totalCount
      nodes { stargazerCount }
    }
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
    }
  }
}`;

const CALENDAR = `
query($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}`;

async function allDays(createdAt) {
  const start = new Date(createdAt);
  const now = new Date();
  const days = new Map();
  let from = start;
  while (from < now) {
    let to = new Date(from);
    to.setUTCFullYear(to.getUTCFullYear() + 1);
    to.setUTCDate(to.getUTCDate() - 1);
    if (to > now) to = now;
    const data = await gql(CALENDAR, {
      login: LOGIN,
      from: from.toISOString(),
      to: to.toISOString(),
    });
    for (const w of data.user.contributionsCollection.contributionCalendar.weeks) {
      for (const d of w.contributionDays) days.set(d.date, d.contributionCount);
    }
    from = new Date(to);
    from.setUTCDate(from.getUTCDate() + 1);
  }
  return [...days.entries()]
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .filter((d) => new Date(d.date) >= new Date(createdAt.slice(0, 10)));
}

function fmtDay(iso) {
  const [, m, d] = iso.split("-");
  return `${Number(d)} ${MONTHS[Number(m) - 1]}`;
}

function fmtFull(iso) {
  const [y, m, d] = iso.split("-");
  return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
}

function streaks(days) {
  let best = { len: 0, start: null, end: null };
  let run = { len: 0, start: null };
  for (const d of days) {
    if (d.count > 0) {
      if (run.len === 0) run.start = d.date;
      run.len++;
      if (run.len > best.len) best = { len: run.len, start: run.start, end: d.date };
    } else {
      run = { len: 0, start: null };
    }
  }
  let cur = { len: 0, start: null, end: null };
  let i = days.length - 1;
  if (i >= 0 && days[i].count === 0) i--;
  let end = i >= 0 ? days[i].date : null;
  while (i >= 0 && days[i].count > 0) {
    cur.len++;
    cur.start = days[i].date;
    i--;
  }
  cur.end = end;
  return { current: cur, longest: best };
}

function shell(w, h, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" font-family="${FONT}">
<rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="10" fill="${BG}" stroke="${EDGE}"/>
${inner}
</svg>`;
}

function statsCard(user) {
  const cc = user.contributionsCollection;
  const stars = user.repositories.nodes.reduce((s, r) => s + r.stargazerCount, 0);
  const rows = [
    ["Estrelas recebidas", stars],
    ["Commits (12 meses)", cc.totalCommitContributions],
    ["Pull requests", cc.totalPullRequestContributions],
    ["Issues", cc.totalIssueContributions],
    ["Repositórios públicos", user.repositories.totalCount],
  ];
  const W = 390;
  const H = 190;
  const body = rows
    .map(
      ([label, value], i) =>
        `<text x="26" y="${66 + i * 26}" font-size="13" fill="${MUTED}">${label}</text>
<text x="${W - 26}" y="${66 + i * 26}" font-size="14" font-weight="700" text-anchor="end" fill="${INK}">${value}</text>`
    )
    .join("\n");
  return shell(
    W,
    H,
    `<text x="26" y="34" font-size="15" font-weight="700" fill="${INK}">Estatísticas de Kauan</text>
<line x1="26" y1="44" x2="${W - 26}" y2="44" stroke="${EDGE}"/>
${body}`
  );
}

function streakCard(days) {
  const total = days.reduce((s, d) => s + d.count, 0);
  const { current, longest } = streaks(days);
  const W = 430;
  const H = 190;
  const col = W / 3;
  const range = (s) =>
    s.start ? (s.start === s.end ? fmtDay(s.start) : `${fmtDay(s.start)} - ${fmtDay(s.end)}`) : "sem sequência";
  const cx = (i) => col * i + col / 2;
  const ring = `<circle cx="${cx(1)}" cy="82" r="34" fill="none" stroke="${EDGE}" stroke-width="5"/>
<circle cx="${cx(1)}" cy="82" r="34" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${Math.min(current.len / Math.max(longest.len, 1), 1) * 213.6} 213.6" transform="rotate(-90 ${cx(1)} 82)"/>`;
  const dividers = [1, 2]
    .map((i) => `<line x1="${col * i}" y1="34" x2="${col * i}" y2="156" stroke="${EDGE}"/>`)
    .join("");
  const inner = `${dividers}${ring}
<text x="${cx(0)}" y="88" font-size="30" font-weight="700" text-anchor="middle" fill="${INK}">${total}</text>
<text x="${cx(0)}" y="116" font-size="12" text-anchor="middle" fill="${INK}">Total de contribuições</text>
<text x="${cx(0)}" y="136" font-size="10.5" text-anchor="middle" fill="${MUTED}">${fmtFull(days[0].date)} - Hoje</text>
<text x="${cx(1)}" y="92" font-size="28" font-weight="700" text-anchor="middle" fill="${INK}">${current.len}</text>
<text x="${cx(1)}" y="142" font-size="12" font-weight="700" text-anchor="middle" fill="${INK}">Sequência atual</text>
<text x="${cx(1)}" y="160" font-size="10.5" text-anchor="middle" fill="${MUTED}">${range(current)}</text>
<text x="${cx(2)}" y="88" font-size="30" font-weight="700" text-anchor="middle" fill="${INK}">${longest.len}</text>
<text x="${cx(2)}" y="116" font-size="12" text-anchor="middle" fill="${INK}">Maior sequência</text>
<text x="${cx(2)}" y="136" font-size="10.5" text-anchor="middle" fill="${MUTED}">${range(longest)}</text>`;
  return shell(W, H, inner);
}

function graphCard(days) {
  const last = days.slice(-31);
  const W = 830;
  const H = 260;
  const px = 64;
  const pr = 30;
  const pt = 58;
  const pb = 44;
  const pw = W - px - pr;
  const ph = H - pt - pb;
  const rawMax = Math.max(...last.map((d) => d.count), 4);
  const step = Math.ceil(rawMax / 4);
  const max = step * 4;
  const xAt = (i) => px + (pw * i) / (last.length - 1);
  const yAt = (v) => pt + ph - (ph * v) / max;
  const grid = [0, 1, 2, 3, 4]
    .map((k) => {
      const v = k * step;
      return `<line x1="${px}" y1="${yAt(v)}" x2="${W - pr}" y2="${yAt(v)}" stroke="${EDGE}" stroke-dasharray="2 4"/>
<text x="${px - 12}" y="${yAt(v) + 4}" font-size="11" text-anchor="end" fill="${MUTED}">${v}</text>`;
    })
    .join("\n");
  const xl = last
    .map((d, i) =>
      i % 3 === 0
        ? `<text x="${xAt(i)}" y="${H - pb + 20}" font-size="10.5" text-anchor="middle" fill="${MUTED}">${Number(d.date.slice(8))}</text>`
        : ""
    )
    .join("");
  const pts = last.map((d, i) => `${xAt(i).toFixed(1)},${yAt(d.count).toFixed(1)}`).join(" ");
  const dots = last
    .map(
      (d, i) =>
        `<circle cx="${xAt(i).toFixed(1)}" cy="${yAt(d.count).toFixed(1)}" r="3" fill="${BG}" stroke="${INK}" stroke-width="1.6"><title>${fmtDay(d.date)}: ${d.count}</title></circle>`
    )
    .join("");
  const area = `<polygon points="${px},${yAt(0)} ${pts} ${xAt(last.length - 1)},${yAt(0)}" fill="${INK}" fill-opacity="0.06"/>`;
  return shell(
    W,
    H,
    `<text x="${W / 2}" y="32" font-size="15" font-weight="700" text-anchor="middle" fill="${INK}">Gráfico de contribuições · últimos 30 dias</text>
${grid}
${area}
<polyline points="${pts}" fill="none" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
${dots}
${xl}
<text x="${W / 2}" y="${H - 8}" font-size="10.5" text-anchor="middle" fill="${MUTED}">dia do mês</text>`
  );
}

mkdirSync("assets", { recursive: true });

const profile = (await gql(PROFILE, { login: LOGIN })).user;
const days = await allDays(profile.createdAt);
writeFileSync("assets/stats.svg", statsCard(profile));
writeFileSync("assets/streak.svg", streakCard(days));
writeFileSync("assets/graph.svg", graphCard(days));
console.log("ok", days.length, "dias");
