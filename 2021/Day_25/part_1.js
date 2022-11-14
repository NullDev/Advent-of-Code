"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable curly */

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim()
    .split(require("os").EOL)
    .map(l => l.trim().split(""));

const { length: height } = INPUT;
const [{ length: width }] = INPUT;
const MAP = [[">", 0, 1], ["v", 1, 0]];

const pStart = performance.now();

let step = 0;
let mov = false;
do {
    (step++) && (mov = false);
    for (let i = 0; i < 2; i++){
        const g = INPUT.map(r => r.map(c => c));
        for (let r = 0; r < height; r++)
            for (let c = 0; c < width; c++)
                (g[r][c] === MAP[i][0] && g[(r + Number(MAP[i][1])) % height][(c + Number(MAP[i][2])) % width] === ".") // @ts-ignore
                && (mov = true) && (INPUT[(r + MAP[i][1]) % height][(c + MAP[i][2]) % width] = MAP[i][0])
                && (INPUT[r][c] = ".");
    }
} while (mov);

const RES = step;

const pEnd = performance.now();

console.log("FIRST STEP WITHOUT SEA CUCUMBER: " + RES);
console.log(pEnd - pStart);
