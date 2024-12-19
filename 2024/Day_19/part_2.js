import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-return-assign */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split(/\n\s*\n/)
    .map(s => s.split("\n").map(e => e.trim()));

const pStart = performance.now();

const res = INPUT[1].reduce((
    acc, m, _, __,
    pts = INPUT[0].flatMap(p => p.split(", ")),
) => acc + m.split("")
    .reduce((dp, ___, i) => (
        (dp[i + 1] = pts.reduce((sum, str) => sum + (
            i + 1 >= str.length && m.slice(i + 1 - str.length, i + 1) === str
                ? dp[i + 1 - str.length] : 0
        ), 0), dp) && dp
    ), [1])[m.length], 0);

const pEnd = performance.now();

console.log("NUMBER OF DESIGN PERMUTATIONS: " + res);
console.log(pEnd - pStart);
