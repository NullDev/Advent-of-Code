"use strict";

/* eslint-disable no-return-assign, one-var, curly */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const [mapIn, instIn] = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n\n");
const map = mapIn.split("\n").map(row => row.split("")).map(row => ({
    start: row.findIndex(e => e !== " "),
    end: row.length - 1,
    elm: row.map(e => e === "#"),
}));
const trans = [[0, 1], [1, 0], [0, -1], [-1, 0]];

const pStart = performance.now();

const inst = [];
let num = ""; // @ts-ignore
instIn.split("").forEach(e => ((e === "R" || e === "L")
    ? inst.push({ type: "move", amt: +num })
        && inst.push({ type: "turn", dir: e === "R" ? 1 : -1 })
        && (num = "")
    : num += e)) || (num && inst.push({ type: "move", amt: +num }));

const rMap = [...map].reverse();
let dir = 0, r = 0, c = map[0].start;
for (const instr of inst){
    if (instr.type === "turn"){ // @ts-ignore
        dir = (dir + instr.dir + 4) % 4;
        continue;
    }
    const [dr, dc] = trans[dir];
    for (let d = 0; d < instr.amt; d++){
        let nextR = r + dr, nextC = c + dc;
        if (dir === 0) (nextC > map[r].end) && (nextC = map[r].start);
        else if (dir === 1) (nextR >= map.length || nextC > map[nextR].end || nextC < map[nextR].start)
            && (nextR = map.findIndex(row => nextC >= row.start && nextC <= row.end));
        else if (dir === 2) (nextC < map[r].start) && (nextC = map[r].end);
        else (nextR < 0 || nextC > map[nextR].end || nextC < map[nextR].start)
            && (nextR = map.length - 1 - rMap.findIndex(row => nextC >= row.start && nextC <= row.end));

        if (map[nextR].elm[nextC]) break;
        ((r = nextR) || 1) && (c = nextC);
    }
}

const result = 1000 * (r + 1) + 4 * (c + 1) + dir;

const pEnd = performance.now();

console.log("FINAL PASSWORD: " + result);
console.log(pEnd - pStart);
