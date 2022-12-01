"use strict";

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL.repeat(2)).map(e => e.split(require("os").EOL).map(Number));

const pStart = performance.now();

const result = INPUT.map(e => e.reduce((a, b) => a + b)).sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b);

const pEnd = performance.now();

console.log("Calories of Top 3 elves: " + result);
console.log(pEnd - pStart);
