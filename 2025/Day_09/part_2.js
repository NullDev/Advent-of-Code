// @ts-nocheck
import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim().split(/\s+/).map(l => l.split(",").map(Number));

const pStart = performance.now();

const xs = [...new Set(INPUT.map(p => p[0]))].sort((a, b) => a - b);
const ys = [...new Set(INPUT.map(p => p[1]))].sort((a, b) => a - b);
const xIdx = new Map(xs.map((x, i) => [x, i]));
const yIdx = new Map(ys.map((y, i) => [y, i]));
const reds = INPUT.map(([x, y]) => [xIdx.get(x), yIdx.get(y)]);
const nx = xs.length;
const ny = ys.length;

const W = 2 * nx + 3;
const H = 2 * ny + 3;
const idx = (x, y) => y * W + x;
const wall = new Uint8Array(W * H);

reds.forEach(([rx1, ry1], i) => {
    const [rx2, ry2] = reds[(i + 1) % reds.length];
    const x1 = 2 * rx1 + 1;
    const y1 = 2 * ry1 + 1;
    const x2 = 2 * rx2 + 1;
    const y2 = 2 * ry2 + 1;
    if (x1 === x2){
        const s = y2 > y1 ? 1 : -1;
        for (let y = y1; ; y += s){
            wall[idx(x1, y)] = 1;
            if (y === y2) break;
        }
    }
    else {
        const s = x2 > x1 ? 1 : -1;
        for (let x = x1; ; x += s){
            wall[idx(x, y1)] = 1;
            if (x === x2) break;
        }
    }
});

const out = new Uint8Array(W * H);
const q = [0];
out[0] = 1;
while (q.length){
    const p = q.pop();
    const x = p % W;
    const y = (p / W) | 0;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]){
        const nx1 = x + dx;
        const ny1 = y + dy;
        if (nx1 < 0 || ny1 < 0 || nx1 >= W || ny1 >= H) continue;
        const ni = idx(nx1, ny1);
        if (out[ni] || wall[ni]) continue;
        out[ni] = 1;
        q.push(ni);
    }
}

const colored = Array.from({ length: ny }, () => new Uint8Array(nx));
for (let ry = 0; ry < ny; ry++) for (let rx = 0; rx < nx; rx++) colored[ry][rx] = out[idx(2 * rx + 1, 2 * ry + 1)] ? 0 : 1;

const pref = Array.from({ length: ny + 1 }, () => new Int32Array(nx + 1));
for (let y = 0; y < ny; y++) for (let x = 0, run = 0; x < nx; x++) ((run += colored[y][x]) || 1) && (pref[y + 1][x + 1] = run + pref[y][x + 1]);

const res = INPUT.flatMap((pA, iA) =>
    INPUT.slice(iA + 1).map((
        pB, j, _,
        rectSum = (x1, y1, x2, y2) => pref[y2 + 1][x2 + 1] - pref[y1][x2 + 1] - pref[y2 + 1][x1] + pref[y1][x1],
        [x1, y1] = pA,
        [x2, y2] = pB,
        [rx1, ry1] = reds[iA],
        [rx2, ry2] = reds[iA + 1 + j],
        xl = Math.min(Number(rx1), Number(rx2)),
        xr = Math.max(Number(rx1), Number(rx2)),
        yt = Math.min(Number(ry1), Number(ry2)),
        yb = Math.max(Number(ry1), Number(ry2)),
        cells = (xr - xl + 1) * (yb - yt + 1),
        ok = rectSum(xl, yt, xr, yb) === cells,
    ) => ok ? ((Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1)) : 0),
).reduce((maxA, curA) => Math.max(maxA, curA), 0);

const pEnd = performance.now();

console.log("LARGEST AREA OF RECTANGLES (RED & GREEN): " + res);
console.log(pEnd - pStart);
