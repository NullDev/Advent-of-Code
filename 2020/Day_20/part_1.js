"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("fs");
const path = require("path");
const { EOL } = require("os");
const { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trimEnd().split(`${EOL}${EOL}`);

const pStart = performance.now();

const RES = Object.values(CONTENT_READ.reduce((prev, tile) => {
    const grid = tile.split("\n").slice(1).map(w => w.split(""));
    [grid[0], grid.map(r => r[0]), grid.map(r => r[grid.length - 1]), grid[grid.length - 1]].forEach(b => {
        const t = [b, ([...b].reverse())].sort()[0]; // @ts-ignore
        prev[t] = typeof(prev[t]) === "undefined" ? [].concat(Number(tile.match(/^Tile (\d+):\n/)[1])) : prev[t].concat(Number(tile.match(/^Tile (\d+):\n/)[1]));
    });

    return prev;
}, {})).filter(ids => ids.length === 1) // @ts-ignore
    .flat()
    .filter((id, index, ids) => ids.indexOf(id) !== index)
    .reduce((a, b) => a * b, 1);

const pEnd = performance.now();

console.log("PRODUCT OF IDS: " + RES);
console.log(pEnd - pStart);
