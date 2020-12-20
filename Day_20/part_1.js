"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trimEnd().split("\n\n");

const pStart = performance.now();

const RES = Object.values(CONTENT_READ.reduce((acc, tile) => {
    let tileGrid = tile.split("\n").slice(1).map(w => w.split(""));
    [tileGrid[0], tileGrid.map(r => r[0]), tileGrid.map(r => r[tileGrid.length - 1]), tileGrid[tileGrid.length - 1]].forEach(b => {
        let t = [b, ([...b].reverse())].sort()[0];
        acc[t] = typeof(acc[t]) === "undefined" 
            ? [].concat(Number(tile.match(/^Tile (\d+):\n/)[1]))
            : acc[t].concat(Number(tile.match(/^Tile (\d+):\n/)[1]));
    });

    return acc;
}, {})).filter(ids => ids.length === 1) // @ts-ignore
    .flat()
    .filter((id, index, ids) => ids.indexOf(id) !== index)
    .reduce((a, b) => a * b, 1);

const pEnd = performance.now();

console.log("PRODUCT OF IDS: " + RES);
console.log(pEnd - pStart);
