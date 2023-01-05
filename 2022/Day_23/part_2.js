"use strict";

/* eslint-disable no-loop-func, no-constant-condition, one-var */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");
const offsets = [
    [[-1, -1], [ 0, -1], [ 1, -1]], [[-1,  1], [ 0,  1], [ 1,  1]],
    [[-1, -1], [-1,  0], [-1,  1]], [[ 1, -1], [ 1,  0], [ 1,  1]],
];

const pStart = performance.now();

let result = 0;
const curPos = new Set();

INPUT.forEach((line, y) => line.split("").forEach((point, x) => ((point === "#") && curPos.add(`${x},${y}`))));

const chk = ([x, y], ofs) => !curPos.has(`${x + ofs[0][0]},${y + ofs[0][1]}`)
    && !curPos.has(`${x + ofs[1][0]},${y + ofs[1][1]}`) && !curPos.has(`${x + ofs[2][0]},${y + ofs[2][1]}`);

const emp = ([x, y]) => !curPos.has(`${x - 1},${y - 1}`) && !curPos.has(`${x},${y - 1}`)
     && !curPos.has(`${x + 1},${y - 1}`) && !curPos.has(`${x - 1},${y}`) && !curPos.has(`${x + 1},${y}`)
     && !curPos.has(`${x - 1},${y + 1}`) && !curPos.has(`${x},${y + 1}`) && !curPos.has(`${x + 1},${y + 1}`);

let i = 0;
while(1){
    const pMov = new Map(), pCnt = new Map();
    curPos.forEach((pos, _, __, [x, y] = pos.split(",").map(Number)) => {
        if (!emp([x, y])){
            for(let j = 0; j < 4; ++j){
                const dir = (j + i) % 4;
                if (chk([x, y], offsets[dir])){
                    const newCoord = `${x + offsets[dir][1][0]},${y + offsets[dir][1][1]}`;
                    pCnt.set(newCoord, (pCnt.get(newCoord) || 0) + 1) && pMov.set(pos, newCoord);
                    break;
                }
            }
        }
    });

    let m = 0;
    pMov.forEach((newPos, oldPos) => ((pCnt.get(newPos) === 1) && ((++m || 1) && curPos.delete(oldPos) && curPos.add(newPos))));
    ++i;
    if (m === 0){
        result = i;
        break;
    }
}

const pEnd = performance.now();

console.log("FIRST ROUND WITHOUT MOVE: " + result);
console.log(pEnd - pStart);
