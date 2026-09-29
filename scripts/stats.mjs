import { writeFileSync, mkdirSync } from "node:fs";

const LOGIN = "KauanDiNubila";
const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;

const QUERY = `
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      contributionCalendar { totalContributions }
    }
    repositories(ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC) { totalCount }
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

const user = json.data.user;
const cc = user.contributionsCollection;
const items = [
  [cc.contributionCalendar.totalContributions, "contribuições"],
  [cc.totalCommitContributions, "commits"],
  [cc.totalPullRequestContributions, "pull requests"],
  [cc.totalIssueContributions, "issues"],
  [user.repositories.totalCount, "repos públicos"],
];

const W = 830;
const H = 120;
const colW = (W - 40) / items.length;
const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

const cells = items
  .map(([value, label], i) => {
    const cx = 20 + colW * i + colW / 2;
    const divider =
      i > 0
        ? `<line class="line" x1="${20 + colW * i}" y1="34" x2="${20 + colW * i}" y2="92"/>`
        : "";
    return `${divider}
<text class="ink" x="${cx}" y="68" text-anchor="middle" font-size="32" font-weight="700">${value}</text>
<text class="muted" x="${cx}" y="90" text-anchor="middle" font-size="12">${label}</text>`;
  })
  .join("\n");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" font-family="${FONT}">
<style>
.box{fill:#ffffff;stroke:#d0d7de}
.ink{fill:#24292f}
.muted{fill:#57606a}
.line{stroke:#d0d7de}
@media (prefers-color-scheme:dark){
.box{fill:#0d1117;stroke:#30363d}
.ink{fill:#e6edf3}
.muted{fill:#8b949e}
.line{stroke:#30363d}
}
</style>
<rect class="box" x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="12"/>
<text class="muted" x="20" y="24" font-size="11" letter-spacing="1.5">ÚLTIMOS 12 MESES</text>
${cells}
</svg>`;

mkdirSync("assets", { recursive: true });
writeFileSync("assets/stats.svg", svg);
console.log("ok");
