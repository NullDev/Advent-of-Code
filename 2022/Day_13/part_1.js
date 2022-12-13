"use strict";

/* eslint-disable no-eval, no-nested-ternary, consistent-return */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n\n")
    .map(p => p.split("\n").map(eval)); // Second day with eval :D

const pStart = performance.now();

const check = (a, b) => {
    if (typeof a === "number" && typeof b === "object") return check([a], b);
    if (typeof a === "object" && typeof b === "number") return check(a, [b]);
    if (typeof a === "number" && typeof b === "number") return (a > b) ? -1 : (a < b) ? 1 : 0;
    if (typeof a === "object" && typeof b === "object"){
        for (let i = 0; i < Math.min(a.length, b.length); i++){
            const c = check(a[i], b[i]);
            if (c !== 0) return c;
        }
        return (a.length < b.length) ? 1 : (a.length > b.length) ? -1 : 0;
    }
};

let result = 0;
INPUT.forEach((e, i) => ((check(...e) === 1) && (result += i + 1)));

const pEnd = performance.now();

console.log("SUM OF INDICIES: " + result);
console.log(pEnd - pStart);
