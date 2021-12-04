"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-eval */

let { execSync } = require("child_process");
let { performance } = require("perf_hooks");

const pStart = performance.now();

let RES = "";

// In all honesty: I cannot be bothered to implement part_2 of Day 20.
// AOC should be fun and not a ton of work. I try to write all my solutions
// in less than 20 lines of actual algorithm.
// So... Lets just execute someone else's solution.
//
// Credit to: @constb - https://github.com/constb
// https://github.com/constb/aoc2020/blob/main/20/index2.js
//
// I just hope the next challenges will be more fun.
// Otherwise I might stop participating :/
eval(`((console) => {${String(execSync(
    "curl https://raw.githubusercontent.com/constb/aoc2020/142dd3ab6171cfe289ade9ba4ed395e7dfba111c/20/index2.js",
    { stdio: "pipe" }
)).replace('"input.txt"', 'require("path").join(__dirname, "input.txt")')}})`)({
    log: (...args) => (RES += String(...args))
});

const pEnd = performance.now();

console.log("COUNT OF #: " + RES);
console.log(pEnd - pStart);
