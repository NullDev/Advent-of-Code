import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable one-var, no-sequences */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n\n");

const pStart = performance.now();

const mapping = INPUT[1].trim().split("\n")
    .map(e => e.split(" = "))
    .reduce((acc, [key, value]) => ((acc[key.trim()] = value.trim().slice(1, -1).split(", ").map(v => v.trim())), acc), {});

let cur = "AAA", res = 0;
while (cur !== "ZZZ") (cur = mapping[cur][(INPUT[0][res % INPUT[0].length]) === "R" ? 1 : 0]) && res++;

const pEnd = performance.now();

console.log("NUMBER OF STEPS: " + res);
console.log(pEnd - pStart);
