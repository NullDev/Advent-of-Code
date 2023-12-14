"use strict";

/* eslint-disable curly */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const res = [...INPUT[0]].map((_, idx) => INPUT.map(row => row[idx]).reverse().join("")) // @ts-ignore
    .map(row => row.replaceAll(/[\.O]+/g, r => r.replaceAll(".", "").padStart(r.length, ".")))
    .reduce((sum, row) => sum + [...row].reduce((rSum, isRock, idx) => rSum + (isRock === "O" ? idx + 1 : 0), 0), 0);

const pEnd = performance.now();

console.log("LOAD ON SUPPORT BEAMS: " + res);
console.log(pEnd - pStart);
