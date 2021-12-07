"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable curly */

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(",").map(Number);
const LIST = [];

const pStart = performance.now();

for (let i = 0; i < Math.max(...INPUT); i++) ((LIST[i] = 0) || 1) && INPUT.forEach((_, j) => (LIST[i] += (1 / 8) * (((2 * Math.abs(INPUT[j] - i)) + 1) ** 2) - (1 / 8)));

const RES = Math.min(...LIST);

const pEnd = performance.now();

console.log("FUEL SPENT: " + RES);
console.log(pEnd - pStart);
