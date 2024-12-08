import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-return-assign, no-sequences */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim().split("\n").map(l => l.split(""));

const pStart = performance.now();

const res = ((
    [ ps, rows, cols ] = INPUT.reduce((acc, row, y) => (
        row.forEach((v, x) => ((v === ".")
            ? true : (acc[0][v] === undefined
                ? acc[0][v] = [] : 0, acc[0][v].push([x, y]), 0))), acc
    ), [{}, INPUT.length, INPUT[0].length]),
) => Object.keys(
    Object.entries(ps).reduce((pts, [, locs]) => (
        locs.forEach((loc1, i) => locs.slice(i + 1).forEach((
            loc2, _, __, d = [loc1[0] - loc2[0], loc1[1] - loc2[1]],
        ) => [-1, 1].forEach((dir) =>
            Array.from(
                { length: Math.max(cols, rows) }, (___, step) => loc1.map((v, k) => v + dir * step * d[k]),
            ).filter(([x, y]) => x >= 0 && y >= 0 && x < cols && y < rows).forEach(p => pts[p.join("_")] = 1),
        ))), pts
    ), {}),
))().length;

const pEnd = performance.now();

console.log("NEW UNIQUE LOCATIONS: " + res);
console.log(pEnd - pStart);
