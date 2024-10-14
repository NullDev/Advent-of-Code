import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable one-var, no-param-reassign */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n\n");

const pStart = performance.now();

const mapping = INPUT[1].trim().split("\n")
    .map(str => /(?<item>\w{3}) = \((?<L>\w{3}), (?<R>\w{3})\)/.exec(str)?.groups) // @ts-ignore
    .reduce((acc, { item, L, R }) => ({...acc, [item]: {L, R}}), {}); // @ts-ignore

const f = (a, b) => a % b === 0 ? b : f(b, a % b), steps = Object.keys(mapping)
        .filter(key => key.endsWith("A"))
        .map(item => ((start, p, i = 0, ins = INPUT[0].split("")) => { // @ts-ignore
            while (!p(start)) start = mapping[start][ins[i++ % ins.length]];
            return i;
        })(item, x => x.endsWith("Z"))), res = steps.slice(1).reduce((acc, v) => acc * v / f(acc, v), steps[0]);

const pEnd = performance.now();

console.log("NUMBER OF STEPS: " + res);
console.log(pEnd - pStart);
