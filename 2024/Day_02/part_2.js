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
    ) => levels.every((level, i, arr) =>
        i === 0 ||
        (Math.abs(level - arr[i - 1]) >= 1 &&
        Math.abs(level - arr[i - 1]) <= 3 &&
        ((arr[1] - arr[0]) < 0 ? level <= arr[i - 1] : level >= arr[i - 1])),
    ) || levels.some((___, i, arr) =>
        arr.filter((____, j) => i !== j).every((level, k, newArr) =>
            k === 0 ||
            (Math.abs(level - newArr[k - 1]) >= 1 &&
            Math.abs(level - newArr[k - 1]) <= 3 &&
            ((newArr[1] - newArr[0]) < 0 ? level <= newArr[k - 1] : level >= newArr[k - 1])),
        ),
    )).length;

const pEnd = performance.now();

console.log("NEW SAFE REPORTS: " + res);
console.log(pEnd - pStart);
