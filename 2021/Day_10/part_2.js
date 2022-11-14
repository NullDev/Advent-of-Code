"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split(require("os").EOL);

const pStart = performance.now();

const SET = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">",
};

const scores = [];

INPUT.forEach((row, _, __, stack = []) => (!row.split("").some(t => (
    (((new Set(Object.keys(SET))).has(t)) && stack.push(t)) || 1) && ((new Set(Object.values(SET))).has(t) && t !== SET[stack.pop()]),
)) && stack.reverse() && scores.push(stack.reduce((p, c) => p * 5 + ({ "(": 1, "[": 2, "{": 3, "<": 4 })[c], 0)));

const RES = scores[Math.floor(scores.sort((a, b) => a - b).length / 2)];

const pEnd = performance.now();

console.log("MIDDLE SCORE: " + RES);
console.log(pEnd - pStart);
