"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(e => e.split(" "));

const pStart = performance.now();

let x = 1;
let t = 0;
let result = 0;

INPUT.forEach(([inst, num]) => inst === "noop"
    ? ((t += 1) || 1) && ([20, 60, 100, 140, 180, 220].includes(t)) && (result += x * t)
    : (((t += 1) || 1) && ([20, 60, 100, 140, 180, 220].includes(t)) && (result += x * t) || 1)
    && (((t += 1) || 1) && ([20, 60, 100, 140, 180, 220].includes(t)) && (result += x * t) || 1)
    && (x += Number(num)));

const pEnd = performance.now();

console.log("SUM OF SIGNAL STRENGTHS: " + result);
console.log(pEnd - pStart);
