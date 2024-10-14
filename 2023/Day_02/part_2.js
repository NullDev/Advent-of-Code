import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-param-reassign, no-return-assign, no-sequences */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const res = INPUT.filter(n => !!n).map(r => r.split(":")).map(e => (e[1].split(";").map(x => x.trim())
    .map(x => x.split(",").map(z => z.trim().split(" ")).reduce((acc, y) => (acc[y[1]] = Number(y[0]), acc), {}))))
    .map((tries) => tries.reduce((acc, t) => (Object.keys(t).forEach((c) => (acc[c] = Math.max(acc[c] || 0, t[c]))), acc)))
    .reduce((acc, row) => (acc += Object.values(row).reduce((m, i) => m * i, 1)), 0);

const pEnd = performance.now();

console.log("SUM OF POWERS OF SET: " + res);
console.log(pEnd - pStart);
