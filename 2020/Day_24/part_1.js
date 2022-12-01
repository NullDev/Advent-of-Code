"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable key-spacing */

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trimEnd().split("\n");

const pStart = performance.now();

// Thanks Reddit...
const hMatrix = {
    e:  { dx:  1, dy:  0 },
    ne: { dx:  1, dy: -1 },
    se: { dx:  0, dy:  1 },

    w:  { dx: -1, dy:  0 },
    nw: { dx:  0, dy: -1 },
    sw: { dx: -1, dy:  1 },
};

const tiles = new Set();

CONTENT_READ.forEach(line => {
    let xy = [0, 0]; // @ts-ignore
    [...line.matchAll(/e|se|sw|w|nw|ne/g)].map(e => e[0]).forEach(dir => (xy = [xy[0] + hMatrix[dir].dx, xy[1] + hMatrix[dir].dy]));
    tiles.has(xy[0] + "#" + xy[1]) ? tiles.delete(xy[0] + "#" + xy[1]) : tiles.add(xy[0] + "#" + xy[1]);
});

const pEnd = performance.now();

console.log("TILE COUNT: " + tiles.size);
console.log(pEnd - pStart);
