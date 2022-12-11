"use strict";

/* eslint-disable no-eval */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim().split("\n\n").map(e => e.split("\n")).map(([, items, op, check, yes, no]) => [
        items.match(/\d+/g)?.map(Number),
        eval(`old => ${op.split("=").at(-1)}`), // lol
        Number(check.match(/\d+/)?.[0]),
        Number(yes.match(/\d+/)?.[0]),
        Number(no.match(/\d+/)?.[0]),
    ]);

const pStart = performance.now();

const done = INPUT.map(() => 0);
Array(20).fill(0).forEach(() => INPUT.forEach(([items, op, check, yes, no], i) => {
    done[i] += items.length;
    while (items.length){
        const lvl = Math.floor(op(items.shift()) / 3);
        INPUT[lvl % check === 0 ? yes : no][0].push(lvl);
    }
}));
done.sort((a, b) => a > b ? -1 : 1);
const result = done[0] * done[1];

const pEnd = performance.now();

console.log("MONKEY BUSINESS LEVEL (20): " + result);
console.log(pEnd - pStart);
