// @ts-nocheck
import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split(/\n\s*\n/);

const pStart = performance.now();

const normal = (
    cells,
    minX = Math.min(...cells.map(c => c[0])),
    minY = Math.min(...cells.map(c => c[1])),
    norm = cells.map(([x, y]) => [x - minX, y - minY]),
) => ({
    cells: norm,
    key: norm.slice()
        .sort((a, b) => a[0] - b[0] || a[1] - b[1])
        .map(([x, y]) => `${x},${y}`)
        .join(";"),
    w: Math.max(...norm.map(c => c[0])) + 1,
    h: Math.max(...norm.map(c => c[1])) + 1,
});

const mOrient = (
    rawCells, baseBox = normal(rawCells),
    { cells: base, w: w0, h: h0 } = baseBox,
) => {
    const rot = (x, y, w, h, r) => {
        if (r === 0) return [x, y];
        if (r === 1) return [h - 1 - y, x];
        if (r === 2) return [w - 1 - x, h - 1 - y];
        return [y, w - 1 - x];
    };

    const orients = [];
    const seen = new Set();
    for (let r = 0; r < 4; r++){
        const wRot = r % 2 === 0 ? w0 : h0;
        const rt = base.map(([x, y]) => rot(x, y, w0, h0, r));

        for (let f = 0; f < 2; f++){
            const { cells, key, w, h } = normal(
                f ? rt.map(([x, y]) => [wRot - 1 - x, y]) : rt,
            );
            if (!seen.has(key)) seen.add(key) && orients.push({ cells, w, h });
        }
    }

    return { orients, area: base.length };
};

const shapes = [];
INPUT.forEach((block, _, __, l = block.trim().split("\n")) => (
    shapes[Number(l[0].replace(":", ""))] = mOrient(
        l.slice(1).flatMap(
            (row, y) => [...row].map((ch, x) => (ch === "#" ? [x, y] : null)).filter(Boolean),
        ),
    )
));

const res = INPUT.pop()?.trim().split("\n").filter(Boolean).filter((
    line, _, __,
    [dim, rest] = line.split(":"),
    [W, H] = dim.match(/(\d+)x(\d+)/).slice(1).map(Number),
    counts = rest.trim().split(/\s+/).map(Number),
) => {
    if (
        counts.reduce((s, c, i) => s + c * (shapes[i]?.area || 0), 0) > (W * H)
    ) return false;

    const pl = shapes.map(() => []);
    for (let i = 0; i < shapes.length; i++){
        if (!(counts[i] || 0)) continue;
        const masks = [];
        shapes[i].orients.forEach(o => {
            if (o.w > W || o.h > H) return;
            for (let y0 = 0; y0 <= H - o.h; y0++){
                for (let x0 = 0; x0 <= W - o.w; x0++){
                    let mask = 0n;
                    for (const [dx, dy] of o.cells) mask |= 1n << BigInt((y0 + dy) * W + (x0 + dx));
                    masks.push(mask);
                }
            }
        });

        if (!masks.length) return false;
        pl[i] = masks;
    }

    const pieces = counts.flatMap((c, i) => (c ? Array(c).fill(i) : []))
        .sort((a, b) => pl[a].length - pl[b].length);

    const dfs = (idx, occ) => {
        if (idx === pieces.length) return true;
        const opts = pl[pieces[idx]];
        for (let k = 0; k < opts.length; k++){
            const m = opts[k];
            if (m & occ) continue;
            if (dfs(idx + 1, occ | m)) return true;
        }
        return false;
    };

    return dfs(0, 0n);
}).length;

// This sht takes about 15s to run but whatever

const pEnd = performance.now();

console.log("REGIONS THAT FIT PRESENTS: " + res);
console.log(pEnd - pStart);
