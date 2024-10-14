import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-eval */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim().split("\n\n").map(e => e.split("\n")).map(([, items, op, check, yes, no]) => [
        items.match(/\d+/g)?.map(Number),
        eval(`old => ${op.split("=").at(-1)}`), // lol
        Number(check.match(/\d+/)?.[0]),
        Number(yes.match(/\d+/)?.[0]),
        Number(no.match(/\d+/)?.[0]),
    ]);

const pStart = performance.now();

const done = INPUT.map(() => 0);
Array(10000).fill(0).forEach((
    _, __, ___, mod = INPUT.map(a => a[2]).reduce((a, b) => a * b, 1),
) => INPUT.forEach(([items, op, check, yes, no], i) => {
    done[i] += items.length;
    while (items.length){
        const lvl = op(items.shift()) % mod;
        INPUT[lvl % check === 0 ? yes : no][0].push(lvl);
    }
}));
done.sort((a, b) => a > b ? -1 : 1);
const result = done[0] * done[1];

const pEnd = performance.now();

console.log("MONKEY BUSINESS LEVEL (10000): " + result);
console.log(pEnd - pStart);
