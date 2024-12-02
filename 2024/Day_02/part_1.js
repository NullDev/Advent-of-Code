import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").filter(Boolean);

const pStart = performance.now();

const res = INPUT.filter(
    (line, _, __, levels = line.split(" ").map(str => Number(str)),
    ) => levels.every(
        (level, i, arr, dir = levels[1] - levels[0]) => i === 0 ||
            (Math.abs(level - arr[i - 1]) >= 1 &&
                Math.abs(level - arr[i - 1]) <= 3 &&
                (dir < 0 ? level <= arr[i - 1] : level >= arr[i - 1])),
    )).length;

const pEnd = performance.now();

console.log("SAFE REPORTS: " + res);
console.log(pEnd - pStart);
