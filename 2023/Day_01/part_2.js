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

/* It could have been so easy, but no. We got edge cases with overlapping words...
const result = INPUT.map(e => {
    const r = e.replace(/one|two|three|four|five|six|seven|eight|nine/g, m => map[m]).replace(/\D/g, "");
    return Number(r[0] + r.slice(-1));
}).reduce((a, b) => a + b);
*/

const res = INPUT.map(e => {
    const pairMat = [[Number.MAX_SAFE_INTEGER, 0], [-1, 0]];
    ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"].forEach((l, i) => {
        const idxMat = [e.indexOf(String(i + 1)), e.lastIndexOf(String(i + 1)), e.indexOf(l), e.lastIndexOf(l)];
        if (idxMat[0] >= 0 && idxMat[0] < pairMat[0][0]) pairMat[0] = [idxMat[0], i + 1];
        if (idxMat[1] > pairMat[1][0]) pairMat[1] = [idxMat[1], i + 1];
        if (idxMat[2] >= 0 && idxMat[2] < pairMat[0][0]) pairMat[0] = [idxMat[2], i + 1];
        if (idxMat[3] > pairMat[1][0]) pairMat[1] = [idxMat[3], i + 1];
    });
    return Number(`${pairMat[0][1]}${pairMat[1][1]}`);
}).reduce((a, b) => a + b);

const pEnd = performance.now();

console.log("SUM OF CALIBRATION VALUES: " + res);
console.log(pEnd - pStart);
