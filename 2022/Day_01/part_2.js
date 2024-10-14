import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .split("\n\n").map(e => e.split("\n").map(Number));

const pStart = performance.now();

const result = INPUT.map(e => e.reduce((a, b) => a + b)).sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b);

const pEnd = performance.now();

console.log("CALORIES OF TOP 3 ELVES: " + result);
console.log(pEnd - pStart);
