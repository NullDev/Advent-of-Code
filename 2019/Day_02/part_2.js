"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split(",").map(Number);

const pStart = performance.now();

let RES;

let sol = function(n, v){
    const INT = [...INPUT];
    (INT[1] = n) && (INT[2] = v);
    for (let i = 0; i < INT.length; i += 4){
        if (INT[i] === 99) break;
        if (INT[i] === 1) INT[INT[i + 3]] = INT[INT[i + 1]] + INT[INT[i + 2]];
        else if (INT[i] === 2) INT[INT[i + 3]] = INT[INT[i + 1]] * INT[INT[i + 2]];
        else return;
    }
    (INT[0] === 19690720) && (RES = n * 100 + v);
};

for (let i = 0; i < 100; i++) for (let j = 0; j < 100; j++) sol(i, j);

const pEnd = performance.now();

console.log("100 * NOUN + VERB: " + RES);
console.log(pEnd - pStart);
