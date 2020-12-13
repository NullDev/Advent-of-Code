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
const IDS = CONTENT_READ[1]
    .split(",")
    .filter(e => e !== "x")
    .map(Number);

const times = IDS.map(e => e - (TIMESTAMP % e));
const low = Math.min(...times);
const res = low * IDS[times.findIndex(time => time === low)];

const pEnd = performance.now();

console.log("PRODUCT OF ID AND MINUTES: " + res);
console.log(pEnd - pStart);
