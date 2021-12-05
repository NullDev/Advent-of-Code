"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split(require("os").EOL).filter(e => !!e).map(Number);

const pStart = performance.now();

let calc = function(m){
    const f = Math.max(Math.floor(m / 3) - 2, 0);
    return f === 0 ? f : f + calc(f);
};

const SUM = INPUT.reduce((a, b) => a + calc(b), 0);

const pEnd = performance.now();

console.log("SUM OF FUEL REQUIREMENTS: " + SUM);
console.log(pEnd - pStart);
