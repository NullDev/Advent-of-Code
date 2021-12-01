"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL).map(Number);

const pStart = performance.now();

const count = CONTENT_READ
    .map((a, i) => CONTENT_READ[i - 2] + CONTENT_READ[i - 1] + CONTENT_READ[i])
    .filter((e, i, a) => e > a[i - 1])
    .length;

const pEnd = performance.now();

console.log("SUMS LARGER THAN THE PREVIOUS: " + count);
console.log(pEnd - pStart);
