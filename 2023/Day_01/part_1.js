import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const result = INPUT.map(e => Number(e.replace(/\D/g, "")[0] + e.replace(/\D/g, "").slice(-1))).reduce((a, b) => a + b);

const pEnd = performance.now();

console.log("SUM OF CALIBRATION VALUES: " + result);
console.log(pEnd - pStart);
