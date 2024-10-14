import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(row => row.split(""));

const pStart = performance.now();

// @ts-ignore
const res = INPUT.reduce(({ idx, gx: g }, row, i) => row.reduce(({ idx: i1, gx: g1 }, cell, j) => cell === "#"
    ? ({ gx: [...g1, { x: j, y: i }], idx: i1 + 1 })
    : ({ idx: i1, gx: g1 }), // @ts-ignore
{ idx, gx: g }), { idx: 0, gx: [] }).gx.flatMap((
    g1, i, _,
    ey = Array.from({ length: INPUT.length }).map((__, i1) => i1).filter(i1 => INPUT[i1].every(v => v === ".")),
    ex = Array.from({ length: INPUT[0].length }).map((__, j) => j).filter(j => Array.from({ length: INPUT.length })
        .map((__, i1) => i1).every(i1 => INPUT[i1][j] === ".")),
) => _.slice(i + 1).map(g2 => Math.abs(g2.x - g1.x)
    + Math.abs(g2.y - g1.y)
    + (
        ex.filter(x => Math.min(g1.x, g2.x) < x && x < Math.max(g1.x, g2.x)).length
        + ey.filter(y => Math.min(g1.y, g2.y) < y && y < Math.max(g1.y, g2.y)).length
    ),
)).reduce((acc, v) => acc + v, 0);

const pEnd = performance.now();

console.log("SUM OF LENGTHS: " + res);
console.log(pEnd - pStart);
