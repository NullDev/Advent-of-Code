import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-param-reassign, no-return-assign */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n").map(row => row.split("").map(Number));

const pStart = performance.now();

const visible = (line, _, __, top = -1) => line.map(tree => (tree > top ? (top = tree, true) : false));
const t = m => m[0].map((_, i) => m.map(r => r[i]));

const GRID = [
    INPUT.map(visible),
    INPUT.map(row => [...visible([...row].reverse())].reverse()),
    t(t(INPUT).map(visible)),
    t(t(INPUT).map(row => [...visible([...row].reverse())].reverse())),
];

const result = GRID[0].reduce(
    (r, lR, rI) => r + lR.reduce(
        (c, _, cI) => c + ((GRID[0][rI][cI] || GRID[1][rI][cI] || GRID[3][rI][cI] || GRID[2][rI][cI]) ? 1 : 0), 0,
    ), 0,
);

const pEnd = performance.now();

console.log("VISIBLE TREES: " + result);
console.log(pEnd - pStart);
