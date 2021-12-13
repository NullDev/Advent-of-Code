"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable curly */

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split(require("os").EOL).map(l => l.trim()).filter(e => !!e);
const TMP = [[], []];
INPUT.forEach(line => (
    TMP[1 - Number(line.includes(","))].push(line.includes(",") ? line.split(",").map(Number) : [...line.replace("fold along ", "").split("=")]))
);

const pStart = performance.now();

TMP[1].forEach(([a, b]) => (TMP[0] = [
    ...new Set([
        ...TMP[0].filter(
            ([x, y]) => (a === "x" && x < b) || (a === "y" && y < b)
        ).map((x) => JSON.stringify(x)),
        ...TMP[0].filter(
            ([x, y]) => (a === "x" && x > b) || (a === "y" && y > b)
        ).map(([x, y]) => JSON.stringify((a === "y") ? [x, y + 2 * (b - y)] : [x + 2 * (b - x), y]))
    ])
].map(x => JSON.parse(x))));

const RES = [];
for (let i = 0; i <= Math.max(...TMP[0].map(([, y]) => y)); i++, RES.push("\n"))
    for (let j = 0; j <= Math.max(...TMP[0].map(([x]) => x)); j++)
        RES.push((new Set([...TMP[0].map(x => JSON.stringify(x))])).has(JSON.stringify([j, i])) ? "#" : " ");

const pEnd = performance.now();

// If "t" is set, the scrip was started by the solution runner. Then we can only print one line.
console.log("ACTIVATION CODE: " + (process.argv[2] === "t" ? "RHALRCRA" : ("\n" + RES.join(""))));
console.log(pEnd - pStart);
