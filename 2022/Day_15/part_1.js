"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim().split("\n").map(e => e.split(" "))
    .map(d => ({
        s: [Number(d[2].split("=")[1].split(",")[0]), Number(d[3].split("=")[1].split(":")[0])],
        b: [Number(d[8].split("=")[1].split(",")[0]), Number(d[9].split("=")[1])],
    }));

const pStart = performance.now();

const seen = new Set();

INPUT.forEach((e, _, __, dist = Math.abs(e.s[1] - e.b[1]) + Math.abs(e.s[0] - e.b[0])) => {
    for (
        let i = e.s[0] - (dist - Math.abs(2000000 - e.s[1]));
        i < e.s[0] + (dist - Math.abs(2000000 - e.s[1])) + 1;
        i++
    ) seen.add(i);
    ((e.s[1] === 2000000) && seen.delete(e.s[0]) || 1) && ((e.b[1] === 2000000) && seen.delete(e.b[0]));
});

const pEnd = performance.now();

console.log("POSITIONS COUNT: " + seen.size);
console.log(pEnd - pStart);
