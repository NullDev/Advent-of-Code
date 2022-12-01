"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n").map(Number);

const pStart = performance.now();

const count = INPUT.filter((e, i, a) => e > a[i - 1]).length;

const pEnd = performance.now();

console.log("MEASUREMENTS LARGER THAN THE PREVIOUS: " + count);
console.log(pEnd - pStart);
