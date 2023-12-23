"use strict";

/* eslint-disable one-var, no-param-reassign */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(l => l.split(""));

const pStart = performance.now();

const sol = (g, s, x, y, d, m) => y === s.length - 1
        ? Math.max(m, d) : (g[y][x].forEach(e => (
            (!s[e[1]][e[0]]) && (s[e[1]][e[0]] = true) && (m = sol(g, s, e[0], e[1], d + e[2], m)) && (s[e[1]][e[0]] = false)),
        ), m), g = Array.from({ length: INPUT.length }, (_, y) => Array.from({ length: INPUT[0].length }, (__, x) => INPUT[y][x] !== "#" ? // @ts-ignore
        [[0, 1], [0, -1], [1, 0], [-1, 0]].reduce((acc, [dx, dy]) => {
            const [nx, ny] = [x + dx, y + dy];
            return nx >= 0 && nx < INPUT[0].length && ny >= 0 && ny < INPUT.length && INPUT[ny][nx] !== "#"
                ? [...acc, [nx, ny, 1]]
                : acc;
        }, [])
        : null),
    );

g.forEach((row, y) => row.forEach((c, x) => ( // @ts-ignore
    c?.length === 2 && c.forEach(([xi, yi, di], i, _, ni = g[yi][xi].findIndex(e => e[0] === x && e[1] === y)) => (ni !== -1 // @ts-ignore
        && (g[yi][xi][ni] = [c[1 - i][0], c[1 - i][1], di + c[1 - i][2]])))
)));

const res = sol(g, Array.from({ length: INPUT.length }, () => Array.from({ length: INPUT[0].length }, () => false)), 1, 0, 0, 0);

const pEnd = performance.now();

console.log("NEW STEPS OF LONGEST HIKE: " + res);
console.log(pEnd - pStart);
