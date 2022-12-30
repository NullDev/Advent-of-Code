"use strict";

/* eslint-disable one-var, consistent-return */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(l => l.split(""));

const pStart = performance.now();

const bMaps = [], dirs = [[-1,  0], [ 0, -1], [ 0,  0], [ 1,  0], [ 0,  1]];
const gM = (t, sM = (a, b) => (a + b * 100000000) % b) => {
    if (bMaps[t]) return bMaps[t];

    const h = INPUT.length - 2, w = INPUT[0].length - 2, bmap = INPUT.map(l => l.map(v => v === "#" ? 1 : 0 ));
    INPUT.forEach((l, y) => l.forEach((v, x) => {
        if (v === "^") bmap[sM(y - 1 - t, h) + 1][x] = 1;
        if (v === "v") bmap[((y - 1 + t) % h) + 1][x] = 1;
        if (v === ">") bmap[y][((x - 1 + t) % w) + 1] = 1;
        if (v === "<") bmap[y][sM(x - 1 - t, w) + 1] = 1;
    }));

    return (bMaps[t] = bmap);
};

const solve = (
    start, end, t0, key = p => p.x + "_" + p.y + "_" + p.t,
    paths = [{x: start.x, y: start.y, t: t0}], seen = new Set(),
) => {
    while (paths.length){
        const p = paths.shift(); const k = key(p);
        if (seen.has(k)) continue;
        seen.add(k);
        if (p?.y === end.y && p?.x === end.x) return p?.t;
        const bmap = gM(p?.t + 1);
        dirs.forEach(([dx, dy]) => bmap[p?.y + dy] && bmap[p?.y + dy][p?.x + dx] === 0
        && paths.push({ y: p?.y + dy, x: p?.x + dx, t: p?.t + 1 }));
    }
};

const result = solve(
    { x: INPUT[0].indexOf("."), y: 0 },
    { x: INPUT[INPUT.length - 1].indexOf("."), y: INPUT.length - 1 }, 0,
);

const pEnd = performance.now();

console.log("FEWEST NUMBER OF MINUTES TO AVOID BLIZZARDS: " + result);
console.log(pEnd - pStart);
