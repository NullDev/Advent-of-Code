"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split(",").map(Number);
INPUT[1] = 12;
INPUT[2] = 2;

const pStart = performance.now();

for (let i = 0; i < INPUT.length; i += 4){
    if (INPUT[i] === 99) break;
    if (INPUT[i] === 1) INPUT[INPUT[i + 3]] = INPUT[INPUT[i + 1]] + INPUT[INPUT[i + 2]];
    else if (INPUT[i] === 2) INPUT[INPUT[i + 3]] = INPUT[INPUT[i + 1]] * INPUT[INPUT[i + 2]];
}

const pEnd = performance.now();

console.log("VALUE AT POS 0: " + INPUT[0]);
console.log(pEnd - pStart);
