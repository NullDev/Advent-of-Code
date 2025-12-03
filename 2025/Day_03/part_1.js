// @ts-nocheck
import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

// Should be O(n) methinks
const result = INPUT.reduce((
    acc, line, _, __, digits = line.trim().split("").map(Number),
) => {
    let rem = digits.length - 2;
    const stack = digits.reduce((stk, d) => {
        while (rem > 0 && stk.length && stk[stk.length - 1] < d) stk.pop() && rem--;
        stk.push(d);
        return stk;
    }, []);
    while (rem > 0) stack.pop() && rem--;
    return acc + Number(stack.slice(0, 2).join(""));
}, 0);

const pEnd = performance.now();

console.log("OUTPUT JOLTAGE (2): " + result);
console.log(pEnd - pStart);
