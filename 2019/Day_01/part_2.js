import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").filter(e => !!e).map(Number);

const pStart = performance.now();

const calc = function(m){
    const f = Math.max(Math.floor(m / 3) - 2, 0);
    return f === 0 ? f : f + calc(f);
};

const SUM = INPUT.reduce((a, b) => a + calc(b), 0);

const pEnd = performance.now();

console.log("SUM OF FUEL REQUIREMENTS: " + SUM);
console.log(pEnd - pStart);
