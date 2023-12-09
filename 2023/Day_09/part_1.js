"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const res = INPUT.map(l => l.trim().split(" ").map(Number)).reduce((sum, h) => sum + ((seqA = []) => {
    for (let seq = h; !seq.every(val => val === 0); seq = seq.slice(1).map((v, i) => v - seq[i])) seqA.push(seq);
    return seqA.reduceRight((next, seq) => seq[seq.length - 1] + next, 0);
})(), 0);

const pEnd = performance.now();

console.log("SUM OF VALUES: " + res);
console.log(pEnd - pStart);
