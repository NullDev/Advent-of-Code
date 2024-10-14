import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .split("\n")
    .map(e => Number(e))
    .sort((a, b) => a - b);

const pStart = performance.now();

const step = [1];
CONTENT_READ.forEach((e, i) => {
    let j = i + 1;
    while (CONTENT_READ[j] <= e + 3) (step[j] = (step[j] || 0) + step[i]) && j++;
});

const res = step[CONTENT_READ.length - 1];

const pEnd = performance.now();

console.log("NUMBER OF ARRANGEMENTS: " + res);
console.log(pEnd - pStart);
