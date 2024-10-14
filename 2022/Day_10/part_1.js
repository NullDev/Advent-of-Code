import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(e => e.split(" "));

const pStart = performance.now();

let x = 1;
let t = 0;
let result = 0;

INPUT.forEach(([inst, num]) => inst === "noop"
    ? ((t += 1) || 1) && ([20, 60, 100, 140, 180, 220].includes(t)) && (result += x * t)
    : (((t += 1) || 1) && ([20, 60, 100, 140, 180, 220].includes(t)) && (result += x * t) || 1)
    && (((t += 1) || 1) && ([20, 60, 100, 140, 180, 220].includes(t)) && (result += x * t) || 1)
    && (x += Number(num)));

const pEnd = performance.now();

console.log("SUM OF SIGNAL STRENGTHS: " + result);
console.log(pEnd - pStart);
