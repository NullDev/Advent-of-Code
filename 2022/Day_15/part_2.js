"use strict";

/* eslint-disable no-loop-func, curly */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim().split("\n")
    .map(e => e.match(/-?\d+/g)?.map(Number))
    .map(([sx, sy, bx, by] = [], _, __, mD = Math.abs(sx - bx) + Math.abs(sy - by)) => {
        const area = (y, center = Math.abs(sy - y)) => {
            if (center > mD) return undefined;
            return { xS: sx + center - mD, xE: sx - center + mD };
        };
        return { sx, sy, bx, by, mD, area };
    });

const pStart = performance.now();

let poss = /** @type {null | { y: number, x: number }} */ (null);
let result = 0;
for (let y = 0; y < 4000000; y++){
    INPUT.map(e => e.area(y))
        .filter(e => !!e)
        .sort((a, b) => (a?.xS || 0) - (b?.xS || 0))
        .reduce((acc, e = { xS: -1, xE: -1}) => {
            if (!acc) return { count: 0, xS: e.xS, xE: e.xE };
            if (poss && e.xS <= poss.x) poss = null;
            if (e.xS > acc.xE + 1){
                poss = { y, x: e.xS - 1 };
                return { count: acc.count + (acc.xE - acc.xS), xS: e.xS, xE: e.xE };
            }
            (acc.xS = Math.min(acc.xS, e.xS)) && (acc.xE = Math.max(acc.xE, e.xE));
            return acc;
        }, undefined);

    if (poss){
        result = poss.x * 4000000 + poss.y;
        break;
    }
}

const pEnd = performance.now();

console.log("TUNING FREQUENCY: " + result);
console.log(pEnd - pStart);
