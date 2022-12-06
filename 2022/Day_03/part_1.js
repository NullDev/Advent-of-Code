"use strict";

/* eslint-disable curly */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const result = INPUT.map(l => {
    const a = l.substring(0, l.length / 2);
    const b = l.substring(l.length / 2);
    for (const c in a.split(""))
        if (b.includes(a[c]))
            return (a[c].match(/[A-Z]/)) ? a[c].charCodeAt(0) - 38 : a[c].charCodeAt(0) - 96;
    return 0;
}).reduce((a, b) => a + b);

const pEnd = performance.now();

console.log("SUM OF PRIORITIES: " + result);
console.log(pEnd - pStart);
