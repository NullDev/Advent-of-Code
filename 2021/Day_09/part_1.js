"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n");
const LEN = READ[0].length;
const INPUT = READ.join("").split("").map(Number);

const pStart = performance.now();

const RES = INPUT.filter((e, i) => e < (INPUT[i - LEN] ?? 99)
    && (i % LEN === LEN - 1 ? true : e < INPUT[i + 1])
    && e < (INPUT[i + LEN] ?? 99)
    && (i % LEN === 0 ? true : e < INPUT[i - 1]),
).reduce((p, c) => p + c + 1, 0);

const pEnd = performance.now();

console.log("SUM OF RISK LEVELS: " + RES);
console.log(pEnd - pStart);
