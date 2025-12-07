// @ts-nocheck
import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-param-reassign, curly */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const res = ((
    [rs, cs] = INPUT
        .map((row, i) => [i, row.indexOf("S")]).find(([, j]) => j !== -1),
    w = INPUT[0].length,
    cur = Array(w).fill(0n),
) => { // BFS Step to traverse Manifold
    cur[cs] = 1n;
    for (let r = rs; r < INPUT.length - 1; r++){
        const nxt = Array(w).fill(0n);
        for (let c = 0; c < w; c++) cur[c] && (INPUT[r + 1][c] === "^")
            ? ((c > 0) && (nxt[c - 1] += cur[c]) || 1)
                && (c + 1 < w) && (nxt[c + 1] += cur[c])
            : nxt[c] += cur[c];
        cur = nxt;
    }
    return cur;
})().reduce((a, b) => a + b, 0n);

const pEnd = performance.now();

console.log("TIMELINES: " + res);
console.log(pEnd - pStart);
