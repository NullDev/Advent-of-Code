import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(l => l.split(""));

const pStart = performance.now();

const res = INPUT.flatMap((row, i) => row.flatMap((_, j) => [
    [INPUT[i][j], INPUT[i][j + 1], INPUT[i][j + 2], INPUT[i][j + 3]],
    INPUT[i + 3] ? [INPUT[i][j], INPUT[i + 1][j], INPUT[i + 2][j], INPUT[i + 3][j]] : null,
    INPUT[i + 3] ? [INPUT[i][j], INPUT[i + 1][j + 1], INPUT[i + 2][j + 2], INPUT[i + 3][j + 3]] : null,
    INPUT[i + 3] ? [INPUT[i][j], INPUT[i + 1][j - 1], INPUT[i + 2][j - 2], INPUT[i + 3][j - 3]] : null,
].filter(Boolean))).filter(word => (word?.join("") === "XMAS" || word?.join("") === "SAMX")).length;

const pEnd = performance.now();

console.log("XMAS COUNT: " + res);
console.log(pEnd - pStart);
