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

const result = INPUT.map(line => line.match(/^Card +\d+:\s+((?:\d+\s+)+)\|((?:\s+\d+)+)$/)
    ?.map(numbers => numbers.trim().split(/\s+/g).map(Number)))
    .map(e => (mc => mc > 0 ? 2 ** (mc - 1) : 0)((e && e[2].filter(f => e[1].includes(f)).length) || 0))
    .reduce((a, b) => a + b, 0);

const pEnd = performance.now();

console.log("TOTAL POINTS: " + result);
console.log(pEnd - pStart);
