"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable curly, no-loop-func */

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL).map(e => e.split("").map(Number));

const pStart = performance.now();

let RES = 0;

for (let step = 0; step < 100; step++){
    const HEAP = [];
    INPUT.forEach((e, x) => ((HEAP[x] = []) && e.forEach((_, y) => (e[y]++))));

    let lock = 1;
    while (lock){
        lock = 0;
        INPUT.forEach((l, x) => l.forEach((e, y) => {
            if (e > 9 && !HEAP[x][y]){
                (RES++ || 1) && (HEAP[x][y] = 1) && (lock = 1) && (l[y] = 0);
                for (let row = x - 1; row <= x + 1; row++)
                    for (let col = y - 1; col <= y + 1; col++)
                        if ((row !== x || col !== y) && INPUT[row] && !!INPUT[row][col] && !HEAP[row][col])
                            INPUT[row][col]++;
            }
        }));
    }
}

const pEnd = performance.now();

console.log("FLASH COUNT: " + RES);
console.log(pEnd - pStart);
