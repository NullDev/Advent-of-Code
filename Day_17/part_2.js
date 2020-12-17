"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-loop-func */
/* eslint-disable curly */

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

let grid = new Set();
let combos;

for (let i = 0; i < CONTENT_READ.length; i++)
    for (let j = 0; j < CONTENT_READ[i].length; j++)
        CONTENT_READ[i][j] === "#" && grid.add([j, i, ...Array(2).fill(0)].join(";"));

for (let i = 0; i < 6; i++){
    const counts = new Map();
    for (const cube of grid) ((combos = (items, length = 4) =>
        length === 1 ? items.map(item => [item]) : items.flatMap((item) => combos(items, length - 1).map(e => [item, ...e]))
    )([-1, 0, 1])
        .filter(e => !e.every(n => n === 0))
        .map(e => e.map((d, curr) => d + cube.split(";")
            .map(Number)[curr])
            .join(";")))
        .forEach(e => counts.set(e, (counts.get(e) || 0) + 1));

    const result = new Set();
    for (const [cube, sum] of counts) ((grid.has(cube) && sum === 2) || sum === 3) && result.add(cube);
    grid = result;
}

const pEnd = performance.now();

console.log("ACTIVE CUBES: " + grid.size);
console.log(pEnd - pStart);
