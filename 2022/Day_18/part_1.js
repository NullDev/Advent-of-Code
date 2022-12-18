"use strict";

/* eslint-disable curly, one-var */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n"),
    MAP = {}, PTS = [];

const pStart = performance.now();

INPUT.forEach((
    e, _, __, p = e.split(",").map(x => +x),
) => (PTS.push(p) && (MAP[`${p[0]}x${p[1]}x${p[2]}`] = 1)));

const result = PTS.map(p => Number(!MAP[`${p[0] + 1}x${p[1]}x${p[2]}`])
    + Number(!MAP[`${p[0] - 1}x${p[1]}x${p[2]}`])
    + Number(!MAP[`${p[0]}x${p[1] + 1}x${p[2]}`])
    + Number(!MAP[`${p[0]}x${p[1] - 1}x${p[2]}`])
    + Number(!MAP[`${p[0]}x${p[1]}x${p[2] + 1}`])
    + Number(!MAP[`${p[0]}x${p[1]}x${p[2] - 1}`]),
).reduce((a, b) => a + b, 0);

const pEnd = performance.now();

console.log("SURFACE AREA: " + result);
console.log(pEnd - pStart);
