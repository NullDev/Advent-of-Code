import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable curly */

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
let result = -1;
let done = false;
const lo = [...INPUT].reduce((hi, p) => Math.max(Number(p.split(",")[1]), hi), -Infinity);
while (!done){
    while (!done){
        if (INPUT.has(`${cur.x},${cur.y + 1}`)){
            if (!INPUT.has(`${cur.x - 1},${cur.y + 1}`)) cur.x-- && cur.y++;
            else if (!INPUT.has(`${cur.x + 1},${cur.y + 1}`)) cur.x++ && cur.y++;
            else {
                INPUT.add(`${cur.x},${cur.y}`);
                break;
            }
        }
        else cur.y++;
        if (cur.y > lo) done = true;
    }
    (cur = { x: 500, y: 0 }) && result++;
}

const pEnd = performance.now();

console.log("UNITS OF SAND: " + result);
console.log(pEnd - pStart);
