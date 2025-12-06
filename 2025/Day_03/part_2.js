// @ts-nocheck
import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-param-reassign, no-sequences */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

// Should be O(n) methinks
const result = INPUT.reduce((
    acc, line, _, __, digits = line.trim().split("").map(Number),
    rem = digits.length - 12,
) => acc + Number(
    ((stack) => Array.from({ length: rem })
        .reduce(s => (s.pop(), s), stack)
        .slice(0, 12)
        .join("")
    )(digits.reduce((stk, d) => (
        ((f) => f(f))((f) => (
            rem > 0 && stk.length && stk.at(-1) < d
                ? (stk.pop(), rem--, f(f))
                : 0
        )), stk.push(d), stk
    ), [])),
), 0);

const pEnd = performance.now();

console.log("OUTPUT JOLTAGE (12): " + result);
console.log(pEnd - pStart);
