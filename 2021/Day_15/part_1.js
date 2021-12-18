"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split(require("os").EOL);

const pStart = performance.now();

let graph = INPUT.map((line, i) => line.split("").map((e, j) => ({
    w: Number(e),
    a: [[-1, 0], [0, 1], [1, 0], [0, -1]]
        .map(([x, y]) => [x + i, y + j])
        .filter(([x, y])=> (x >= 0 && y >= 0 && x < INPUT.length && y < line.length)),
    p: [i, j]
})));

let { length } = graph;
let queue = [graph[0][0]];
let map = Array.from(Array(length), () => Array(graph[length - 1].length).fill(Number.MAX_SAFE_INTEGER));

map[0][0] = 0;

while (!!queue.length){
    let { a, p } = queue.shift();
    a.forEach(([x, y], _, __, d = (map[p[0]][p[1]] + graph[x][y].w)) => (d < map[x][y]) && (map[x][y] = d) && queue.push(graph[x][y]));
}

const RES = map[length - 1][graph[length - 1].length - 1];

const pEnd = performance.now();

console.log("LOWEST TOTAL RISK: " + RES);
console.log(pEnd - pStart);
