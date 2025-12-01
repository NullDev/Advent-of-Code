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

const res = INPUT.reduce((
    [pos, count], row, _x, _y,
    num = Number(row.slice(1)) % 100,
    curr = row[0] === "L" ? -num : num,
    xed = ((pos + curr) < 1 && pos !== 0) || ((pos + curr) > 99),
) => [
    (100 + (pos + curr)) % 100, count + (Math.floor(Number(row.slice(1)) / 100)) + Number(xed),
], [50, 0])[1];

const pEnd = performance.now();

// 0 x 43 4C 49 43 4B
//     C  L  I  C  K
console.log("CLICK DOOR PASSWORD: " + res);
console.log(pEnd - pStart);
