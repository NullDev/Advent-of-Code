"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(",").map(Number);
const F = new Array(9).fill(0);

const pStart = performance.now();

INPUT.forEach(f => (F[f]++));

for (let d = 0; d < 80; d++){
    const f = F.shift();
    F.push(f);
    F[6] += f;
}

const RES = F.reduce((a, b) => a + b, 0);

const pEnd = performance.now();

console.log("LANTERNFISH COUNT (80 DAYS): " + RES);
console.log(pEnd - pStart);
