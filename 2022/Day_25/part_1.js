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

let d = INPUT.reduce((r, s) => (
    [...s].reverse().reduce((r1, c, i) => r1 + {"=": -2, "-": -1, 0: 0, 1: 1, 2: 2}[c] * Math.pow(5, i), 0) + r
), 0);

const res = [];
while (d > 0){
    const r = d % 5;
    res.unshift({0: 0, 1: 1, 2: 2, 3: "=", 4: "-"}[r]) && ((r === 3) && (d += 2)) || (r === 4) && d++;
    d = Math.floor(d / 5);
}

const result = res.join("");

const pEnd = performance.now();

console.log("SNAFU NUMBER: " + result);
console.log(pEnd - pStart);
