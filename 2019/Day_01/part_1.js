"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").filter(e => !!e).map(Number);

const pStart = performance.now();

const SUM = INPUT.reduce((a, b) => (Math.floor(b / 3) - 2) + a, 0);

const pEnd = performance.now();

console.log("SUM OF FUEL REQUIREMENTS: " + SUM);
console.log(pEnd - pStart);
