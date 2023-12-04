"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const result = INPUT.map(line => line.match(/^Card +\d+:\s+((?:\d+\s+)+)\|((?:\s+\d+)+)$/)
    ?.map(numbers => numbers.trim().split(/\s+/g).map(Number)))
    .map(e => (mc => mc > 0 ? 2 ** (mc - 1) : 0)((e && e[2].filter(f => e[1].includes(f)).length) || 0))
    .reduce((a, b) => a + b, 0);

const pEnd = performance.now();

console.log("TOTAL POINTS: " + result);
console.log(pEnd - pStart);
