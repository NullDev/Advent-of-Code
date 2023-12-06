"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n")
    .map(x => x.split(/\s+/).slice(1).map(Number));

const pStart = performance.now();

const result = INPUT[0].map((e, i) => Array.from({ length: e }, (_, c) => c + 1)
    .filter(c => (e - c) * c > INPUT[1][i]).length)
    .reduce((acc, curr) => acc * curr, 1);

const pEnd = performance.now();

console.log("PRODUCT OF WAYS: " + result);
console.log(pEnd - pStart);
