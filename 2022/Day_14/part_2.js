"use strict";

/* eslint-disable curly, no-constant-condition */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").reduce((set, line) => {
    const p = line.split(" -> ").map(element => element.split(",").map(Number));
    for (let i = 1; i < p.length; i++)
        for (let y = Math.min(p[i - 1][1], p[i][1]); y <= Math.max(p[i - 1][1], p[i][1]); y++)
            for (let x = Math.min(p[i - 1][0], p[i][0]); x <= Math.max(p[i - 1][0], p[i][0]); x++)
                set.add(`${x},${y}`);
    return set;
}, new Set());

const pStart = performance.now();

let cur = { x: 500, y: 0 };
let result = 0;
const lo = [...INPUT].reduce((hi, p) => Math.max(Number(p.split(",")[1]), hi), -Infinity);
while (!INPUT.has("500,0")){
    while (1){
        if (INPUT.has(`${cur.x},${cur.y + 1}`)){
            if (!INPUT.has(`${cur.x - 1},${cur.y + 1}`)) cur.x-- && cur.y++;
            else if (!INPUT.has(`${cur.x + 1},${cur.y + 1}`)) cur.x++ && cur.y++;
            else {
                INPUT.add(`${cur.x},${cur.y}`);
                break;
            }
        }
        else cur.y++;
        if (cur.y === lo + 1){
            INPUT.add(`${cur.x},${cur.y}`);
            break;
        }
    }
    (cur = { x: 500, y: 0 }) && result++;
}

const pEnd = performance.now();

console.log("UNITS OF SAND (FLOOR): " + result);
console.log(pEnd - pStart);
