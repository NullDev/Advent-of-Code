import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(",").map(Number);
const LIST = [];

const pStart = performance.now();

for (let i = 0; i < Math.max(...INPUT); i++) ((LIST[i] = 0) || 1) && INPUT.forEach((_, j) => (LIST[i] += Math.abs(INPUT[j] - i)));

const RES = Math.min(...LIST);

const pEnd = performance.now();

console.log("FUEL COUNT: " + RES);
console.log(pEnd - pStart);
