import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-loop-func, curly, prefer-const, one-var */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

let seen = new Map(), cache = INPUT;
for (let c = 1; c <= 1000000000; c++){
    for (let i = 0; i < 4; i++)
        cache = [...cache[0]].map((_, idx) => cache.map(row => row[idx]).reverse().join("")) // @ts-ignore
            .map(row => row.replaceAll(/[\.O]+/g, r => r.replaceAll(".", "").padStart(r.length, ".")));

    const state = cache.join("\n"), diff = c - seen.get(state);
    if (seen.has(state)) while (c < 1000000000 - diff) c += diff;
    else seen.set(state, c);
}

// @ts-ignore
const res = cache.reduce((sum, row, idx) => sum + ((row.length - idx) * row.replaceAll(/[^O]/g, "").length), 0);

const pEnd = performance.now();

console.log("NEW LOAD ON SUPPORT BEAMS: " + res);
console.log(pEnd - pStart);
