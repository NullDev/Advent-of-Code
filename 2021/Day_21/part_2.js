"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-param-reassign, curly */

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim()
    .split("\n")
    .flatMap(l => l.split(/\D+/).slice(-1).map(a => Number(a[0])));
const STORE = {};

const pStart = performance.now();

const solve = (p, cp, np, cs = 0, rs = 0, e = [p, cp, np, cs, rs].join("|"), wins = [0, 0]) => (STORE[e]) ? STORE[e] : (() => {
    for (let i = 1; i <= 3; i++)
        for (let j = 1; j <= 3; j++)
            for (let k = 1; k <= 3; k++) (cs + ((cp + (i + j + k) - 1) % 10) + 1 >= 21) ? wins[p]++ : solve(
                1 - p, np, ((cp + (i + j + k) - 1) % 10) + 1, rs,
                cs + ((cp + (i + j + k) - 1) % 10) + 1).forEach((el, idx) => (wins[idx] += el),
            );
    return (STORE[e] = wins);
})();

const RES = Math.max(...solve(0, ...INPUT, 0, 0));

const pEnd = performance.now();

console.log("WINNING PLAYER'S UNIVERSE COUNT: " + RES);
console.log(pEnd - pStart);
