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

const n = INPUT.reduce((acc, line) =>
    (acc + [...line.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)].reduce((_acc, m) =>
        (_acc + Number(m[1]) * Number(m[2])), 0)), 0);

const pEnd = performance.now();

console.log("UNCORRUPTED: " + n);
console.log(pEnd - pStart);
