import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable curly, one-var */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n"),
    MAP = {}, PTS = [], M = [100000, -10000, 100000, -10000, 100000, -10000];

const pStart = performance.now();

INPUT.forEach((
    e, _, __, p = e.split(",").map(x => +x),
) => (PTS.push(p) && (MAP[`${p[0]}x${p[1]}x${p[2]}`] = 1)));

PTS.forEach(p => ((M[0] = Math.min(p[0], M[0])) || 1)
    && ((M[1] = Math.max(p[0], M[1])) || 1)
    && ((M[2] = Math.min(p[1], M[2])) || 1)
    && ((M[3] = Math.max(p[1], M[3])) || 1)
    && ((M[4] = Math.min(p[2], M[4])) || 1)
    && ((M[5] = Math.max(p[2], M[5])) || 1),
);

(function f(x, y, z){
    if (x < M[0] - 1 || x > M[1] + 1 || y < M[2] - 1 || y > M[3] + 1 || z < M[4] - 1 || z > M[5] + 1) return;
    if (!MAP[`${x}x${y}x${z}`]) (
        (MAP[`${x}x${y}x${z}`] = -1) || 1
    ) && ( // @ts-ignore
        f(x + 1, y, z) || f(x - 1, y, z) || f(x, y + 1, z)
        || f(x, y - 1, z) || f(x, y, z + 1) || f(x, y, z - 1)
    );
})(M[0], M[2], M[4]);

const result = PTS.map(p => Number(MAP[`${p[0] + 1}x${p[1]}x${p[2]}`] === -1)
    + Number(MAP[`${p[0] - 1}x${p[1]}x${p[2]}`] === -1)
    + Number(MAP[`${p[0]}x${p[1] + 1}x${p[2]}`] === -1)
    + Number(MAP[`${p[0]}x${p[1] - 1}x${p[2]}`] === -1)
    + Number(MAP[`${p[0]}x${p[1]}x${p[2] + 1}`] === -1)
    + Number(MAP[`${p[0]}x${p[1]}x${p[2] - 1}`] === -1),
).reduce((a, b) => a + b, 0);

const pEnd = performance.now();

console.log("EXTERIOR SURFACE AREA: " + result);
console.log(pEnd - pStart);
