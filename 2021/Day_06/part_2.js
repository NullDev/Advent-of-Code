import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(",").map(Number);
const F = new Array(9).fill(0);

const pStart = performance.now();

INPUT.forEach(f => (F[f]++));

for (let d = 0; d < 256; d++){
    const f = F.shift();
    (F.push(f)) && (F[6] += f);
}

const RES = F.reduce((a, b) => a + b, 0);

const pEnd = performance.now();

console.log("LANTERNFISH COUNT (256 DAYS): " + RES);
console.log(pEnd - pStart);
