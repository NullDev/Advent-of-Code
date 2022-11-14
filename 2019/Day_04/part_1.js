"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("-").map(Number);

const pStart = performance.now();

const RES = (new Array(INPUT[1] - INPUT[0]))
    .fill(0)
    .map((_, i) => i + INPUT[0])
    .map(String)
    .filter(p => !(!p.match(/(\d)\1/g) || p.split("").sort().join("") !== p))
    .length;

const pEnd = performance.now();

console.log("PASSWORD COUNT: " + RES);
console.log(pEnd - pStart);
