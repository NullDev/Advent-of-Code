"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-nested-ternary */

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim()
    .split("\n")
    .map(line => line.split(" -> ").map(coord => coord.split(",").map(Number)));

const pStart = performance.now();

let RES = 0;
const points = {};

const check = point => !points[point] ? (points[point] = 1) : (((points[point] === 1) && (RES++)) && points[point]++);

INPUT.forEach(([[x1, y1], [x2, y2]]) => {
    for (
        let x = x1, y = y1;
        x !== x2 || y !== y2;
        x === x2 ? null : x < x2 ? x++ : x--, y === y2 ? null : y < y2 ? y++ : y-- // lol
    ) check(x + "," + y);
    check(x2 + "," + y2);
});

const pEnd = performance.now();

console.log("OVERLAPPING POINTS: " + RES);
console.log(pEnd - pStart);
