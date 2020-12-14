"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-nested-ternary */

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL);

const pStart = performance.now();

const TIMESTAMP = Number(CONTENT_READ[0]);
const RES = CONTENT_READ[1]
    .split(",")
    .filter(e => e !== "x")
    .map(Number)
    .reduce((prev, value) => [].concat(prev, [[value, TIMESTAMP % value, value - (TIMESTAMP % value)]]), [])
    .sort((a, b) => b[2] - a[2])
    .pop()
    .filter((_, i) => i !== 1)
    .reduce((p, c) => p * c);

const pEnd = performance.now();

console.log("PRODUCT OF ID AND MINUTES: " + RES);
console.log(pEnd - pStart);
