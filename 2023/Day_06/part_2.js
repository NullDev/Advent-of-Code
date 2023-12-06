"use strict";

/* eslint-disable one-var */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(e => e.replace(/\D+/g, "")).map(Number);

const pStart = performance.now();

let result = 0, c = 0;
while (c++ < INPUT[0]) ((INPUT[0] - c) * c > INPUT[1]) && result++;

const pEnd = performance.now();

console.log("NUMBER OF WAYS: " + result);
console.log(pEnd - pStart);
