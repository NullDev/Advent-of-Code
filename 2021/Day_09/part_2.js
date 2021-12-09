"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable curly, no-param-reassign */

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL).map((line) => line.split("").map(Number));
const LOWS = [];

const pStart = performance.now();

function* r(end){
    for (let i = 0; i <= end; i++) yield i;
}

const calc = (a, b) => {
    if ([9, undefined].includes(INPUT[b]?.[a])) return 0;
    INPUT[b][a] = 9;
    return (1 + ([[a + 1, b], [a - 1, b], [a, b + 1], [a, b - 1]].map(([x, y]) => calc(x, y))).reduce((p, c) => p + c, 0));
};

for (const y of r(INPUT.length - 1)){
    for (const x of r(INPUT[0].length - 1))(
        [INPUT[y + 1]?.[x], INPUT[y - 1]?.[x], INPUT[y]?.[x + 1], INPUT[y]?.[x - 1]]
            .filter(n => isNaN(n) || n > INPUT[y][x]).length === 4
    ) && LOWS.push([x, y]);
}

const RES = LOWS.map(([x, y]) => calc(x, y))
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((prod, n) => (prod *= n));

const pEnd = performance.now();

console.log("PRODUCT OF THREE LARGEST BASINS: " + RES);
console.log(pEnd - pStart);
