"use strict";

/* eslint-disable no-param-reassign, no-unused-vars */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim().split("\n").filter(x => x).map(x => x.split(""));

const pStart = performance.now();

let end = [];
const start = [];

const graph = INPUT.map((x, i) => x.map((
    y, j, _, __ = (((y === "S") && (y = "a")) || ((y === "E") && ((end = [i, j]) && (y = "z")))),
    ___ = ((y === "a") && start.push([i, j])),
) => parseInt(y, 36)));

const steps = graph.map(x => x.map(() => -1));
start.forEach(x => (steps[x[0]][x[1]] = 0));

const seen = start;
while (seen.length > 0){
    const pos = seen.pop() || [];
    [[-1, 0], [1, 0], [0, -1], [0, 1]]
        .map(x => [pos[0] + x[0], pos[1] + x[1]])
        .filter(x => x[0] >= 0 && x[0] < graph.length && x[1] >= 0 && x[1] < graph[0].length)
        .filter(x => graph[x[0]][x[1]] - graph[pos[0]][pos[1]] <= 1)
        .filter(x => steps[x[0]][x[1]] === -1)
        .forEach(opt => (((steps[opt[0]][opt[1]] = (steps[pos[0]][pos[1]] + 1)) || 1) && seen.unshift(opt)));
    if (pos[0] === end[0] && pos[1] === end[1]) break;
}

const result = steps[end[0]][end[1]];

const pEnd = performance.now();

console.log("FEWEST STEPS (ANY POS): " + result);
console.log(pEnd - pStart);
