import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim()
    .split("\n")
    .map(line => line.split(" -> ").map(coord => coord.split(",").map(Number)));

const pStart = performance.now();

let RES = 0;
const points = {};

const check = point => !points[point] ? (points[point] = 1) : (((points[point] === 1) && (RES++)) && points[point]++);

INPUT.forEach(([[x1, y1], [x2, y2]]) => { // destructoring go brrr
    if (x1 === x2 && y1 === y2) check(x1 + "," + y1);
    else if (x1 === x2) for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) check(x1 + "," + y);
    else if (y1 === y2) for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) check(x + "," + y1);
});

const pEnd = performance.now();

console.log("POINTS: " + RES); // 6666 >:)
console.log(pEnd - pStart);
