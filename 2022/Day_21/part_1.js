import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-eval */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n"); // change this if necessary

const pStart = performance.now();

const monkeyData = {};
INPUT.forEach((
    line, _, __, [monkey, value] = line.split(": "),
) => (monkeyData[monkey] = /\d+/.test(value) ? Number(value) : value));

const solve = mv => {
    if (/\d+/.test(mv)) return mv;
    const [m1, op, m2] = mv.split(" ");
    return eval(`${solve(monkeyData[m1])} ${op} ${solve(monkeyData[m2])}`);
};

const result = solve(monkeyData.root);

const pEnd = performance.now();

console.log("ROOT NUMBER: " + result);
console.log(pEnd - pStart);
