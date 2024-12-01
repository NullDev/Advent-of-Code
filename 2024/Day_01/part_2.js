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
const f = lists[0].reduce((acc, curr) => ({ ...acc, [curr]: (acc[curr] || 0) + 1 }), {});
const result = lists[1].reduce((acc, curr) => acc + curr * (f[curr] || 0), 0);

const pEnd = performance.now();

console.log("SIMILARITY SCORE: " + result);
console.log(pEnd - pStart);
