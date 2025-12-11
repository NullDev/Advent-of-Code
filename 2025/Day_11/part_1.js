// @ts-nocheck
import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-sequences, no-return-assign, curly, no-param-reassign */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim().split("\n").map(l => l.split(/[\:\s]/).filter(n => !!n));

const pStart = performance.now();

// Basic DFS
const res = ((fromTo, heap = ["you"], visits = {}, top = null) => {
    while (heap.length) (top = heap.pop()) && (
        ((visits[top] = (visits[top] || 0) + 1) || 1) && heap.push(...(fromTo[top] || []))
    );
    return visits.out;
})(INPUT.reduce((m, [from, ...tos]) => (m[from] = tos, m), {}));

const pEnd = performance.now();

console.log("YOU-TO-OUT PATHS: " + res);
console.log(pEnd - pStart);
