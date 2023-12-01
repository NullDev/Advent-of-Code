"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n"); // change this if necessary

const pStart = performance.now();

const result = INPUT.map(e => Number(e.replace(/\D/g, "")[0] + e.replace(/\D/g, "").slice(-1))).reduce((a, b) => a + b);

const pEnd = performance.now();

console.log("SUM OF CALIBRATION VALUES: " + result);
console.log(pEnd - pStart);
