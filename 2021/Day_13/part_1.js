"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split(require("os").EOL).map(l => l.trim()).filter(e => !!e);
const TMP = [[], []];
INPUT.forEach(line => (
    TMP[1 - Number(line.includes(","))].push(line.includes(",") ? line.split(",").map(Number) : [...line.replace("fold along ", "").split("=")])),
);

const pStart = performance.now();

const RES = [
    ...new Set([
        ...TMP[0].filter(
            ([x, y]) => (TMP[1][0][0] === "x" && x < TMP[1][0][1]) || (TMP[1][0][0] === "y" && y < TMP[1][0][1]),
        ).map(x => JSON.stringify(x)),
        ...TMP[0].filter(
            ([x, y]) => (TMP[1][0][0] === "x" && x > TMP[1][0][1]) || (TMP[1][0][0] === "y" && y > TMP[1][0][1]),
        ).map(([x, y]) => JSON.stringify((TMP[1][0][0] === "y") ? [x, y + 2 * (TMP[1][0][1] - y)] : [x + 2 * (TMP[1][0][1] - x), y])),
    ]),
].map(x => JSON.parse(x)).length;

const pEnd = performance.now();

console.log("DOT COUNT: " + RES);
console.log(pEnd - pStart);
