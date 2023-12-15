"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim();

const pStart = performance.now();

const res = INPUT.split(",").reduce((a, c) => a + [...c].reduce((v, s) => ((v + s.charCodeAt(0)) * 17) % 256, 0), 0);

const pEnd = performance.now();

console.log("SUM OF RESULTS: " + res);
console.log(pEnd - pStart);
