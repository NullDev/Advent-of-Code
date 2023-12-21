"use strict";

/* eslint-disable one-var, no-sequences, no-param-reassign, no-loop-func */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

let pos = {};
const vl = [], mod = (n, m) => ((n % m) + m) % m, k = (x, y) => x + "_" + y, map = INPUT.map((line, y) => line.split("").map((v, x) => (v === "S")
    ? ((pos[k(x, y)] = [x, y, 1]), ".") : v));

const st = (26501365 - 65) / 131, s = (p, np = {}) => (Object.values(p).forEach(([x, y]) => ([[1, 0], [0, 1], [-1, 0], [0, -1]].forEach(([dx, dy]) => (
    (map[mod(y + dy, map.length)][mod(x + dx, map.length)] === ".") && (np[k(x + dx, y + dy)] = [x + dx, y + dy])))
)), np);

const r = arr => arr.map(step => {
    while (step.some(v => v !== 0)) ((step = (step.map((v1, i) => (v1 - step[i - 1])).slice(1))) || 1) && arr.push(step);
    return arr.map(v => v[0]);
});

for (let i = 0; i <= 131 * 2 + 64; i++) (((pos = s(pos))) || 1) && ((i % 131 === 64) && vl.push(Object.keys(pos).length));

const c = r([vl])[0], res = c[0] + c[1] * st + st * (st - 1) * c[2] / 2;

const pEnd = performance.now();

console.log("GARDEN PLOTS (26501365): " + res);
console.log(pEnd - pStart);
