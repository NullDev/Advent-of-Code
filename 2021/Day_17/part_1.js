"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim();

const pStart = performance.now();

// (-x - 1) * (-x) / 2
// is equal to
// ((1 / 8) * (((2 * x) + 1) ** 2)) - (1 / 8)
// thus factorizing x, leaving us with a one-liner

const RES = ((1 / 8) * (((2 * INPUT.match(/target area: x=(-?\d+)\.\.(-?\d+), y=(-?\d+)..(-?\d+)/).slice(1).map(Number)[2]) + 1) ** 2)) - (1 / 8);

const pEnd = performance.now();

console.log("HIGHEST Y POSITION: " + RES);
console.log(pEnd - pStart);
