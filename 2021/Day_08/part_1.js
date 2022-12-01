"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const RES = INPUT.reduce((p, c) => p + c.split(" | ")[1].split(" ").filter(({ length: l }) => ([2, 3, 4, 7].includes(l))).length, 0);

const pEnd = performance.now();

console.log("COUNT: " + RES);
console.log(pEnd - pStart);
