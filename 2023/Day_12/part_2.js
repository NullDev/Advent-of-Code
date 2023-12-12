"use strict";

/* eslint-disable no-nested-ternary */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const res = INPUT.map(l => l.split(" ")).map(l => ([ l[0], l[1].split(",").map(Number) ])).reduce((
    acc, l, _, __,
    solve = (m, s, recs, si, ri, curr, key = `${si},${ri},${curr}`) => (key in m) ? m[key] : (si === s.length)
        ? (ri === recs.length && curr === 0) ? 1 : (ri === recs.length - 1 && recs[ri] === curr) ? 1 : 0
        : (m[key] = [".", "#"].reduce((ret1, c) => ret1 + ((s[si] === c || s[si] === "?") ? ((c === "." && curr === 0)
            ? solve(m, s, recs, si + 1, ri, 0)
            : (c === "." && curr > 0 && ri < recs.length && recs[ri] === curr)
                ? solve(m, s, recs, si + 1, ri + 1, 0)
                : (c === "#") ? solve(m, s, recs, si + 1, ri, curr + 1) : 0) : 0), 0)),
) => (acc + solve({}, Array(5).fill(l[0]).join("?"), [].concat(...Array(5).fill(l[1])), 0, 0, 0)), 0);

const pEnd = performance.now();

console.log("NEW SUM OF COUNTS: " + res);
console.log(pEnd - pStart);
