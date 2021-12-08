"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split(require("os").EOL);

const pStart = performance.now();

const diff = (a, b) => (new Set([...a].filter((x) => !b.has(x)))).size;

const RES = (INPUT.map(l => l.split(" | ").map(s => s.split(" "))).map(([patterns, digits]) => {
    // 0: one; 1: four; 2: seven; 3: eight; 4: l0; 5: l1;
    // 0; six
    // 0: nine; 1: five;
    // 0: zero; 1: two; 2: three;
    const val0 = patterns.map(p => new Set(p.split("")));
    const val1 = [val0.find(e => e.size === 2), val0.find(e => e.size === 4), val0.find(e => e.size === 3), val0.find(e => e.size === 7), val0.filter(e => e.size === 6), val0.filter(e => e.size === 5)]; // @ts-ignore
    const val2 = [val1[4].find(e => diff(val1[0], e) === 1)]; // @ts-ignore
    const val3 = [val1[4].find(e => diff(e, val1[1]) === 2), val1[5].find(e => diff(e, val2[0]) === 0)]; // @ts-ignore
    const val4 = [val1[4].find(e => diff(e, val3[1]) === 2), val1[5].find(e => diff(e, val3[0]) === 1), val1[5].find(e => diff(e, val3[1]) === 1)];

    return Number(digits.map(d => [val4[0], val1[0], val4[1], val4[2], val1[1], val3[1], val2[0], val1[2], val1[3], val3[0]]
        .map(e => [...e].sort().join(""))
        .findIndex(e => e === d.split("").sort().join(""))
        .toString()
    ).join(""));
}).flat()).reduce((p, c) => p + c, 0);

const pEnd = performance.now();

console.log("SUM OF VALUES: " + RES);
console.log(pEnd - pStart);
