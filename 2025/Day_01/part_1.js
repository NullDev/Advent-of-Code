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
    nPos = (100 + pos + (row[0] === "L" ? -num : num)) % 100,
) => [
    nPos, count + Number(nPos === 0),
], [50, 0])[1];

const pEnd = performance.now();

console.log("DOOR PASSWORD: " + res);
console.log(pEnd - pStart);
