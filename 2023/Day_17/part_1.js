import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable one-var */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(l => l.split("").map(Number));

const pStart = performance.now();

let res = 0;
const q = [{ c: 0, row: 0, col: 0, dR: 0, dC: 0, m: 0 }], seen = new Set();
while (q.length){ // @ts-ignore
    const { c, row, col, dR, dC, m } = q.sort((p, n) => n.c - p.c).pop();
    (row === (INPUT.length - 1) && col === (INPUT[0].length - 1) && m >= 1) && (res = c);
    if (res !== 0) break;

    if (seen.has(JSON.stringify([row, col, dR, dC, m]))) continue;
    seen.add(JSON.stringify([row, col, dR, dC, m]));

    ((m < 3 && !(dR === 0 && dC === 0))
        && (row + dR >= 0 && row + dR < INPUT.length && col + dC >= 0 && col + dC < INPUT[0].length)
        && q.push( { c: c + INPUT[row + dR][col + dC], row: row + dR, col: col + dC, dR, dC, m: m + 1 }) || 1)
    && ((m >= 1 || (dR === 0 && dC === 0)) && [[0, 1], [1, 0], [0, -1], [-1, 0]].forEach(([nDR, nDC]) => (
        (JSON.stringify([nDR, nDC]) !== JSON.stringify([dR, dC])) && (JSON.stringify([nDR, nDC]) !== JSON.stringify([-dR, -dC])))
        && (row + nDR >= 0 && row + nDR < INPUT.length && col + nDC >= 0 && col + nDC < INPUT[0].length)
        && q.push({ c: c + INPUT[row + nDR][col + nDC], row: row + nDR, col: col + nDC, dR: nDR, dC: nDC, m: 1 }),
    ));
}

const pEnd = performance.now();

console.log("LEAST HEAT LOSS: " + res);
console.log(pEnd - pStart);
