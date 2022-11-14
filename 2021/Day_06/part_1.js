"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(",").map(Number);
const F = new Array(9).fill(0);

const pStart = performance.now();

/**
 * NOTE:
 * This can also be solved by using this Matrix:
 * 000000101
 * 100000000
 * 010000000
 * 001000000
 * 000100000
 * 000010000
 * 000001000
 * 000000100
 * 000000010
 * and multiplying it with itself 80 times,
 * then multiplying the resulting matrix by the input vector.
 * The matrix-multiplication would run in O(1) instead of O(m²) / O(nm²) if we disregard reading the input.
 * That's because the matrix has a constant size and is independant of the input length.
 * However, while the precalculation is O(1), together with reading the input we're back at O(n).
 */

INPUT.forEach(f => (F[f]++));

for (let d = 0; d < 80; d++){
    const f = F.shift();
    (F.push(f)) && (F[6] += f);
}

const RES = F.reduce((a, b) => a + b, 0);

const pEnd = performance.now();

console.log("LANTERNFISH COUNT (80 DAYS): " + RES);
console.log(pEnd - pStart);
