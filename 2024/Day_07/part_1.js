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

const res = INPUT.reduce((
    a, b, _, __, [tar, nStr] = b.split(": "), num = nStr.split(" ").map(Number),
    gen = (
        length, ops = ['+', '*'], res = [],
        g = (combo) => combo.length === length ? res.push(combo) : ops.forEach(op => g(combo + op))
    ) => (g(''), res)
) => gen(num.length - 1)
    .some(ops => ops.split('').reduce((a, b, i) => b === '+' ? a + num[i + 1] : a * num[i + 1], num[0]) === Number(tar))
        ? a + Number(tar)
        : a, 0);

const pEnd = performance.now();

console.log("TOTAL CALIBRATIONS: " + res);
console.log(pEnd - pStart);
