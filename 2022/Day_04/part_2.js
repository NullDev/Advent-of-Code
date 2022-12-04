"use strict";

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(l => l.split(","));

const pStart = performance.now();

const result = INPUT.map(([r1, r2]) => [r1.split("-").map(Number), r2.split("-").map(Number)])
    .filter(([r1, r2]) => (r1[0] <= r2[1] && r1[1] >= r2[0]) || (r2[0] <= r1[1] && r2[1] >= r1[0])).length;

const pEnd = performance.now();

console.log("OVERLAPS: " + result);
console.log(pEnd - pStart);
