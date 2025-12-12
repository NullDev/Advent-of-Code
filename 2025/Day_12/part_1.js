// @ts-nocheck
import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-param-reassign, no-sequences */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split(/\n\s*\n/);

const pStart = performance.now();

const normal = (
    cs,
    minX = Math.min(...cs.map(c => c[0])),
    minY = Math.min(...cs.map(c => c[1])),
    cells = cs.map(([x, y]) => [x - minX, y - minY]),
    w = Math.max(...cells.map(c => c[0])) + 1,
    h = Math.max(...cells.map(c => c[1])) + 1,
    key = cells.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1])
        .map(([x, y]) => `${x},${y}`).join(";"),
) => ({ cells, w, h, key });

const mOrient = (
    rawCells, baseBox = normal(rawCells).cells,
    seen = new Set(), orients = [],
) => {
    for (let r = 0; r < 4; r++){
        for (let f = 0; f < 2; f++){
            const { cells, w, h, key } = normal(
                baseBox.map(([x, y]) => {
                    for (let i = 0; i < r; i++) [x, y] = [-y, x];
                    if (f) x = -x;
                    return [x, y];
                }),
            );
            if (!seen.has(key)) seen.add(key), orients.push({ cells, w, h });
        }
    }
    return { orients, area: baseBox.length };
};

const shapes = [];
INPUT.slice(0, -1).forEach((block, _, __, l = block.trim().split("\n")) =>
    (shapes[+l[0].replace(":", "")] = mOrient(
        l.slice(1).flatMap(
            (row, y) => [...row].map((ch, x) => (ch === "#" ? [x, y] : null)).filter(Boolean),
        ),
    )),
);

const res = INPUT.at(-1)?.trim().split("\n").filter(Boolean).filter((
    line, _, __,
    [dim, rest] = line.split(":"),
    [W, H] = dim.match(/(\d+)x(\d+)/).slice(1).map(Number),
    cnts = rest.trim().split(/\s+/).map(Number),
) => {
    if (cnts.reduce((s, c, i) => s + c * (shapes[i]?.area || 0), 0) > W * H) return false;

    const pl = shapes.map(() => []);
    for (let i = 0; i < shapes.length; i++){
        if (!cnts[i]) continue;
        const masks = [];
        shapes[i].orients.forEach(o => {
            if (o.w > W || o.h > H) return;
            for (let y0 = 0; y0 <= H - o.h; y0++){
                for (let x0 = 0; x0 <= W - o.w; x0++){
                    let m = 0n;
                    for (const [dx, dy] of o.cells) m |= 1n << BigInt((y0 + dy) * W + x0 + dx);
                    masks.push(m);
                }
            }
        });
        if (!masks.length) return false;
        pl[i] = masks;
    }

    const pieces = cnts
        .flatMap((c, i) => (c ? Array(c).fill(i) : []))
        .sort((a, b) => pl[a].length - pl[b].length);

    const dfs = (k, occ) => {
        if (k === pieces.length) return true;
        for (const m of pl[pieces[k]]) if (!(m & occ) && dfs(k + 1, occ | m)) return true;
        return false;
    };

    return dfs(0, 0n);
}).length;

// This sht takes about 15s to run but whatever

const pEnd = performance.now();

console.log("REGIONS THAT FIT PRESENTS: " + res);
console.log(pEnd - pStart);
