import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable curly */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(Number);

const pStart = performance.now();

const m = (num, d) => {
    for (let time = 0; time < 10; time++)
        d.forEach((
            n, p, _, curr = num.findIndex(x => x.p === p),
        ) => (num.splice(curr, 1) && num.splice((n + curr) % num.length, 0, { n, p })));
    return num;
};

const result = [1000, 2000, 3000]
    .map((
        p, _, __, mx = m(
            INPUT.map((n, i) => ({ n: n * 811589153, p: i })),
            INPUT.map(num => num * 811589153),
        ),
        zi = mx.findIndex(num => num.n === 0),
    ) => mx[(p + zi) % mx.length].n)
    .reduce((p, c) => p + c, 0);

const pEnd = performance.now();

console.log("SUM OF THREE GROVE COORDINATES (KEY): " + result);
console.log(pEnd - pStart);
