"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim();

const pStart = performance.now();

const res = Array(256).fill(0).map((_, n) => INPUT.split(",").reduce((d, e, __, ___, l = e.match(/^[a-z]+/)?.[0]) => (
    [...(l || [])].reduce((v, s) => ((v + s.charCodeAt(0)) * 17) % 256, 0) !== n
        ? d : (e.includes("-") ? d.delete(l) : d.set(l, Number(e.split("=")[1])), d)
), new Map())).reduce((s, b, bI) => s + Array.from(b.entries())
    .map(x => x[1])
    .reduce((t, v, i) => t + (bI + 1) * (i + 1) * v, 0),
0);

const pEnd = performance.now();

console.log("FOCUSING POWER: " + res);
console.log(pEnd - pStart);
