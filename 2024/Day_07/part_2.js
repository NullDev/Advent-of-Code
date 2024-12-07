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

const reach = (
    tar, num, idx = 0, curr = num[0], memo = {}, key = `${idx}:${curr}`, nx = num[idx + 1]
) => {
    if (key in memo) return memo[key];
    if (idx === num.length - 1) return (memo[key] = curr === tar), memo[key];
    if (reach(tar, num, idx + 1, curr + nx, memo)) return (memo[key] = true), true;
    if (reach(tar, num, idx + 1, curr * nx, memo)) return (memo[key] = true), true;
    if (reach(tar, num, idx + 1, Number(`${curr}${nx}`), memo)) return (memo[key] = true), true;
    return (memo[key] = false), false;
};

const res = INPUT.reduce((
    acc, line, _, __, [tar, nStr] = line.split(": "), num = nStr.split(" ").map(Number)
) => (acc + (reach(Number(tar), num) ? Number(tar) : 0)), 0);

const pEnd = performance.now();

console.log("NEW TOTAL CALIBRATIONS: " + res);
console.log(pEnd - pStart);
