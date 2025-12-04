// @ts-nocheck
import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim()
    .split("\n").map((line) => line.split(""));

const pStart = performance.now();

const res = INPUT.reduce((t, row, y) => t + row.reduce(
    (rt, c, x) => ((c !== "@")
        ? rt : rt + (
            [
                [-1, -1], [-1,  0], [-1, 1], [0, -1],
                [ 0,  1], [ 1, -1], [ 1, 0], [1,  1],
            ].reduce((cnt, [dx, dy]) => (
                cnt + (INPUT[y + dy]?.[x + dx] === "@" ? 1 : 0)
            ), 0) < 4 ? 1 : 0
        )), 0,
), 0);

const pEnd = performance.now();

console.log("ACCESSIBLE ROLLS: " + res);
console.log(pEnd - pStart);
