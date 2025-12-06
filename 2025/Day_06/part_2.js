// @ts-nocheck
import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-sequences */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .replace(/\n$/, "").split(/\n/);

const pStart = performance.now();

const res = ((
    width = Math.max(...INPUT.map(l => l.length)),
    grid = INPUT.map(l => l.padEnd(width, " ")),
) => Array.from({ length: width }, (_, c) =>
    grid.some(row => row[c] !== " "),
).reduce((acc, isContent, idx, arr) => (
    ((isContent && (idx === 0 || !arr[idx - 1]))
        ? acc.push([idx, idx])
        : (acc[acc.length - 1][1] = idx)), acc
), []).map((
    [start, end], _, __,
    cols = Array.from({
        length: end - start + 1,
    }, (_n, i) => start + i),
    op = grid[INPUT.length - 1].slice(start, end + 1).includes("+") ? "+" : "*",
) => cols.slice()
    .reverse()
    .map(c => Array.from({
        length: INPUT.length - 1,
    }, (_n, r) => grid[r][c]).join("").trim())
    .filter(Boolean)
    .map(Number)
    .reduce((acc, n) => (op === "+" ? acc + n : acc * n), op === "+" ? 0 : 1),
).reduce((a, b) => a + b, 0))();

const pEnd = performance.now();

console.log("TOTAL OF ANSWERS (RTL): " + res);
console.log(pEnd - pStart);
