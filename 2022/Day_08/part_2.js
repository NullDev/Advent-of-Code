"use strict";

/* eslint-disable no-cond-assign */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n").map(row => row.split("").map(Number));

const pStart = performance.now();

const scores = INPUT.map(row => row.map(() => 1));
INPUT.forEach((e, i) => e.forEach((e2, j) => {
    outer: // was wondering when I'm gonna use labels again :D
    for (const [di, dj] of [[0, 1], [1, 0], [0, -1], [-1, 0]]){
        if (di){
            for (let i2 = i + di; i2 >= 0 && i2 < INPUT.length; i2 += di) if (e2 <= INPUT[i2][j] && (scores[i][j] *= Math.abs(i - i2))) continue outer;
            scores[i][j] *= Math.abs(i - (di > 0 ? INPUT.length - 1 : 0));
        }
        else {
            for (let j2 = j + dj; j2 >= 0 && j2 < e.length; j2 += dj) if (e2 <= e[j2] && (scores[i][j] *= Math.abs(j - j2))) continue outer;
            scores[i][j] *= Math.abs(j - (dj > 0 ? e.length - 1 : 0));
        }
    }
}));
const result = Math.max(...scores.flat());

const pEnd = performance.now();

console.log("HIGHEST SCENIC SCORE: " + result);
console.log(pEnd - pStart);
