// @ts-nocheck
import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-return-assign, no-sequences, no-nested-ternary */

const [r] = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim().split("\n\n");

const pStart = performance.now();

const res = r
    .split("\n")
    .map(l => l.trim())
    .filter(l => l.trim().length > 0)
    .map((l, _, __, [start, end] = l.split("-").map(Number)) => ([start, end]))
    .sort((a, b) => a[0] - b[0])
    .reduce((
        acc, [start, end], _, __, last = acc[acc.length - 1],
    ) => (((!acc.length)
        ? (acc.push([start, end]), acc)
        : ((start <= last[1] + 1)
            ? last[1] = Math.max(last[1], end)
            : acc.push([start, end]))), acc), [])
    .reduce((sum, [start, end]) => sum + (end - start + 1), 0);

const pEnd = performance.now();

console.log("FRESH UNIQUE ID COUNT: " + res);
console.log(pEnd - pStart);
