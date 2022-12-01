"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable key-spacing */
/* eslint-disable no-nested-ternary */

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

let minMax = { minX: 0, maxX: 0, minY: 0, maxY: 0 };
let field = [];

CONTENT_READ.forEach(line => {
    let xyi = [0, 0, 0];
    while (xyi[2] < line.length){
        let tmp = line[xyi[2]];
        xyi[2]++;
        if (tmp === "n" || tmp === "s") (tmp += line[xyi[2]]) && (xyi[2]++);
        xyi = [xyi[0] + hMatrix[tmp].dx, xyi[1] + hMatrix[tmp].dy, xyi[2]];
    }

    (field[xyi[0]] = field[xyi[0]] || []) && (field[xyi[0]][xyi[1]] = !field[xyi[0]][xyi[1]]);

    minMax = {
        minX: Math.min(xyi[0], minMax.minX), maxX: Math.max(xyi[0], minMax.maxX),
        minY: Math.min(xyi[1], minMax.minY), maxY: Math.max(xyi[1], minMax.maxY),
    };
});

// This is prob more complicated than it actually needs to be
for (let i = 0; i < 100; i++){
    const tmpField = [];
    for (let x = minMax.minX - 1; x <= minMax.maxX + 1; x++){
        tmpField[x] = tmpField[x] ?? [];
        for (let y = minMax.minY - 1; y <= minMax.maxY + 1; y++){
            let c = 0;
            for (const tmp in hMatrix) (field[x + hMatrix[tmp].dx] && field[x + hMatrix[tmp].dx][y + hMatrix[tmp].dy]) && c++;

            (field[x] && field[x][y]) && c !== 1 && c !== 2
                ? tmpField[x][y] = false : (!(field[x] && field[x][y]) && c === 2)
                    ?  tmpField[x][y] = true : tmpField[x][y] = (field[x] && field[x][y]);

            tmpField[x][y] && (minMax = {
                minX: Math.min(x, minMax.minX), maxX: Math.max(x, minMax.maxX),
                minY: Math.min(y, minMax.minY), maxY: Math.max(y, minMax.maxY),
            });
        }
    }
    field = tmpField;
}

let RES = 0;

for (let x = minMax.minX; x <= minMax.maxX; x++) if (field[x]) for (let y = minMax.minY; y <= minMax.maxY; y++) (field[x][y]) && RES++;

const pEnd = performance.now();

console.log("TILE COUNT: " + RES);
console.log(pEnd - pStart);
