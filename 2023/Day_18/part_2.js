"use strict";

/* eslint-disable one-var */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

let r = 0, c = 0, a = 0, p = 0;
INPUT.forEach((l, _, __, dnc = l.split(/[ ()]+/g)) => { // @ts-ignore
    (dnc[0] = ["R", "D", "L", "U"][(dnc[2].at(-1) || 0)]) && (dnc[1] = parseInt(dnc[2].slice(1, -1), 16));
    const [dr, dc] = { U: [-1, 0], D: [1, 0], L: [0, -1], R: [0, 1] }[dnc[0]], r0 = r, c0 = c;
    ((((r += dr * Number(dnc[1])) || 1) && (c += dc * Number(dnc[1])) || 1)
        && (a += (r * c0 - r0 * c) / 2) || 1) && (p += Number(dnc[1]));
});

const res = a + p / 2 + 1;

const pEnd = performance.now();

console.log("NEW CUBIC METERS OF LAVA: " + res);
console.log(pEnd - pStart);
