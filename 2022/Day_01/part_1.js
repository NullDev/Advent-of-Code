"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .split("\n\n").map(e => e.split("\n").map(Number));

const pStart = performance.now();

const result = Math.max(...INPUT.map(e => e.reduce((a, b) => a + b)));

const pEnd = performance.now();

console.log("CALORIES OF ELF CARRYING THE MOST: " + result);
console.log(pEnd - pStart);
