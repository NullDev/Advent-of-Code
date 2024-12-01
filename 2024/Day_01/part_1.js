import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(e => e.split(/\s+/).map(Number));

const pStart = performance.now();

const lists = [[], []]; // @ts-ignore
for (const [left, right] of INPUT) lists[0].push(left) && lists[1].push(right);
lists[0].sort((a, b) => a - b) && lists[1].sort((a, b) => a - b);
const result = lists[0].reduce((acc, curr, i) => acc + Math.abs(curr - lists[1][i]), 0);

const pEnd = performance.now();

console.log("TOTAL DISTANCE: " + result);
console.log(pEnd - pStart);
