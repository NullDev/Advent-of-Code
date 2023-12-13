"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n\n");

const pStart = performance.now();

const res = INPUT.map(x => x.split("\n").map(y => y.split("").map(z => z === "#" ? 1 : 0)))
    .map(g => [
        g.map(x => parseInt(x.join(""), 2)),
        g[0].map((_, i) => parseInt(g.map(x => x[i]).join(""), 2)),
    ].map(x => x.findIndex((_, i) => i !== 0 && x.slice(0, i).reverse().map((y, j) => !x[i + j]
        ? 0
        : (y ^ x[i + j]).toString(2).split("").filter(z => z === "1").length).reduce((a, b) => a + b) === 1)),
    ).map(([x, y]) => x === -1 ? y : x * 100).reduce((a, b) => a + b);

const pEnd = performance.now();

console.log("SUM OF NEW REFLECTIONS: " + res);
console.log(pEnd - pStart);
