import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-sequences */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const res = INPUT.reduce((
    a, b, _, __, [tar, nStr] = b.split(": "), num = nStr.split(" ").map(Number),
    gen = (
        length, ops = ["+", "*"], r = [],
        g = (combo) => combo.length === length ? r.push(combo) : ops.forEach(op => g(combo + op)),
    ) => (g(""), r),
) => gen(num.length - 1)
    .some(ops => ops.split("").reduce(
        (a_, b_, i) => b_ === "+" ? a_ + num[i + 1] : a_ * num[i + 1], num[0],
    ) === Number(tar)) ? a + Number(tar) : a, 0);

const pEnd = performance.now();

console.log("TOTAL CALIBRATIONS: " + res);
console.log(pEnd - pStart);
