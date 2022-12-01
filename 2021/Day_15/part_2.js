"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const graph = INPUT.map(line => line.split("").map(e => Number(e)));

let lgraph = Array.from(Array(graph.length * 5), () => Array(graph[graph.length - 1].length * 5));

const scale = function(x, y, n){
    lgraph[x][y] = n <= 9 ? n : n - 9;
    if (x + graph.length < graph.length * 5) scale(x + graph.length, y, n + 1);
    if (y + graph[graph.length - 1].length < graph[graph.length - 1].length * 5) scale(x, y + graph.length, n + 1);
};

graph.map((row, i) => row.map((e, j) => scale(i, j, e)));

lgraph = lgraph.map((line, i) => line.map((e, j) => ({
    w: Number(e),
    a: [[-1, 0], [0, 1], [1, 0], [0, -1]]
        .map(([x, y])=>[x + i, y + j])
        .filter(([x, y]) => (x >= 0 && y >= 0 && x < lgraph.length && y < line.length)),
    p: [i, j],
})));


const queue = [lgraph[0][0]];
const map = Array.from(Array(lgraph.length), () => Array(lgraph[0].length).fill(Number.MAX_SAFE_INTEGER));

map[0][0] = 0;

while (!!queue.length){
    const { a, p } = queue.shift();
    a.forEach(([x, y], _, __, d = (map[p[0]][p[1]] + lgraph[x][y].w)) => (d < map[x][y]) && (map[x][y] = d) && queue.push(lgraph[x][y]));
}

const RES = map[lgraph.length - 1][lgraph[0].length - 1];

const pEnd = performance.now();

console.log("LOWEST TOTAL RISK DIAGONAL: " + RES);
console.log(pEnd - pStart);
