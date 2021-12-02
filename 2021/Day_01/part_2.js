"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL).map(Number);

const pStart = performance.now();

const count = INPUT
    .map((_, i) => INPUT[i - 2] + INPUT[i - 1] + INPUT[i])
    .filter((e, i, a) => e > a[i - 1])
    .length;

const pEnd = performance.now();

console.log("SUMS LARGER THAN THE PREVIOUS: " + count);
console.log(pEnd - pStart);
