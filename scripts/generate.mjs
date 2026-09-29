import { writeFileSync, mkdirSync } from "node:fs";

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

function card(width, height, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
<rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="12" fill="${C.bg}" stroke="${C.line}"/>
${inner}
</svg>`;
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
          `<line ${orange ? 'class="glow" ' : ""}x1="${nodes[i].x.toFixed(1)}" y1="${nodes[i].y.toFixed(1)}" x2="${nodes[j].x.toFixed(1)}" y2="${nodes[j].y.toFixed(1)}" stroke="${orange ? C.accent : C.ink}" stroke-opacity="${orange ? 0.45 : 0.16}" stroke-width="1"/>`
        );
      }
    }
  }
  const dots = nodes
    .map((n, i) => {
      const delay = ((i * 0.37) % 4).toFixed(2);
      const cx = n.x.toFixed(1);
      const cy = n.y.toFixed(1);
      const core = `<circle class="${n.accent ? "hot" : "cold"}" style="animation-delay:-${delay}s" cx="${cx}" cy="${cy}" r="${n.r.toFixed(1)}" fill="${n.accent ? C.accent : C.ink}"/>`;
      const halo = n.accent
        ? `<circle class="halo" style="animation-delay:-${delay}s" cx="${cx}" cy="${cy}" r="${n.r.toFixed(1)}" fill="none" stroke="${C.accent}" stroke-width="1"/>`
        : "";
      return halo + core;
    })
    .join("");
  const style = `<style>
.drift{animation:drift 14s ease-in-out infinite alternate}
.hot{transform-box:fill-box;transform-origin:center;animation:pulse 4s ease-in-out infinite}
.cold{animation:twinkle 6s ease-in-out infinite}
.halo{transform-box:fill-box;transform-origin:center;animation:ring 4s ease-out infinite}
.glow{animation:glow 5s ease-in-out infinite}
@keyframes drift{from{transform:translate(-4px,2px)}to{transform:translate(4px,-3px)}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.5)}}
@keyframes twinkle{0%,100%{opacity:1}50%{opacity:.45}}
@keyframes ring{0%{transform:scale(1);opacity:.7}100%{transform:scale(4.5);opacity:0}}
@keyframes glow{0%,100%{stroke-opacity:.25}50%{stroke-opacity:.7}}
@media (prefers-reduced-motion:reduce){.drift,.hot,.cold,.halo,.glow{animation:none}.halo{opacity:0}}
</style>`;
  const inner = `${style}
<g class="drift">
${links.join("\n")}
${dots}
</g>
<text x="40" y="78" font-family="${MONO}" font-size="12" letter-spacing="2" fill="${C.accent}">BACK-END · JAVA · SPRING</text>
<text x="40" y="135" font-family="${FONT}" font-size="50" font-weight="700" fill="${C.ink}">Kauan Di Nubila</text>
<text x="40" y="170" font-family="${FONT}" font-size="17" fill="${C.muted}">Sistemas completos, do código ao deploy.</text>
<rect x="40" y="192" width="56" height="4" rx="2" fill="${C.accent}"/>`;
  return card(W, H, inner);
}

mkdirSync("assets", { recursive: true });
writeFileSync("assets/banner.svg", bannerSvg());
console.log("ok");
