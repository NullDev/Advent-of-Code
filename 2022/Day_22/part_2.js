"use strict";

/* eslint-disable no-return-assign, one-var, curly, no-param-reassign */

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
const gem = [[-1, 0, 5], [-1, 1, -1], [4, 2, -1], [3, -1, -1]];

const pStart = performance.now();

const inst = [];
let num = ""; // @ts-ignore
instIn.split("").forEach(e => ((e === "R" || e === "L")
    ? inst.push({ type: "move", amt: +num })
        && inst.push({ type: "turn", dir: e === "R" ? 1 : -1 })
        && (num = "")
    : num += e)) || (num && inst.push({ type: "move", amt: +num }));

const rng = (n1, n2) => {
    if (!n2) ((n2 = n1) || 1) && (n1 = 0);
    return Array.from(new Array(n2 - n1), (_, i) => i + n1);
};

const [maxR, maxC] = [map.length - 1, Math.max(...map.map(row => row.end))],
    cH = (maxR + 1) / gem.length, cW = (maxC + 1) / gem[0].length;

const coordToFace = rng(maxR + 1).map(r => rng(maxC + 1)
    .map(c => gem[Math.floor(r / (maxR + 1) * gem.length)][Math.floor(c / (maxC + 1) * gem[0].length)]),
);

const pos = {
    0: {
        0: (r, c) => [r, c, 0],
        1: (r, c) => [r, c, 1],
        2: (r   ) => [cH * 2 - (r - cW) - 1, 0, 0],
        3: (_, c) => [c + cH * 2, 0, 0],
    }, 1: {
        0: (r   ) => [cH - 1, cW * 2 + r - cH, 3],
        1: (r, c) => [r, c, 1],
        2: (r   ) => [cH * 2, (r - cH), 1],
        3: (r, c) => [r, c, 3],
    }, 2: {
        0: (r   ) => [cH - (r - cH * 2) - 1, cW * 3 - 1, 2],
        1: (_, c) => [cH * 2 + c, cW - 1, 2],
        2: (r, c) => [r, c, 2],
        3: (r, c) => [r, c, 3],
    }, 3: {
        0: (r   ) => [cH * 3 - 1, cW + (r - cH * 3), 3],
        1: (_, c) => [0, c + cH * 2, 1],
        2: (r   ) => [0, cW + (r - cH * 3), 1],
        3: (r, c) => [r, c, 3],
    }, 4: {
        0: (r, c) => [r, c, 0],
        1: (r, c) => [r, c, 1],
        2: (r   ) => [cH - (r - cH * 2) - 1, cW, 0],
        3: (_, c) => [cH + c, cW, 0],
    }, 5: {
        0: (r   ) => [cH * 2 + (cH - r - 1), cW * 2 - 1, 2],
        1: (_, c) => [(c - cW), cW * 2 - 1, 2],
        2: (r, c) => [r, c, 2],
        3: (_, c) => [cH * 4 - 1, c - cH * 2, 3],
    },
};

let dir = 0, r = 0, c = map[0].start;
for (const instr of inst){
    if (instr.type === "turn"){ // @ts-ignore
        dir = (dir + instr.dir + 4) % 4;
        continue;
    }
    for (let d = 0, [dr, dc] = trans[dir]; d < instr.amt; d++){
        let [nextR, nextC] = [r + dr, c + dc];
        const thisFace = coordToFace[r][c];
        let nextDir = dir, nextDc = dc, nextDr = dr;
        if (thisFace !== (coordToFace[nextR] || [])[nextC]) (([nextR, nextC, nextDir] = pos[thisFace][dir](nextR, nextC)) || 1)
            && ([nextDr, nextDc] = trans[nextDir]);

        if (map[nextR].elm[nextC]) break;
        ((r = nextR) || 1) && ((c = nextC) || 1) && ((dc = nextDc) || 1)
        && ((dr = nextDr) || 1) && (dir = nextDir);
    }
}

const result = 1000 * (r + 1) + 4 * (c + 1) + dir;

const pEnd = performance.now();

console.log("FINAL PASSWORD (CUBE): " + result);
console.log(pEnd - pStart);
