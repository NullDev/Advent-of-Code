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

const res = ((rem => rem(rem, INPUT))(
    (rem, grid, rm = grid.reduce((t, row, y) => t.concat(row.reduce(
        (rt, c, x) => ((c !== "@")
            ? rt : rt.concat(
                [
                    [-1, -1], [-1,  0], [-1, 1], [0, -1],
                    [ 0,  1], [ 1, -1], [ 1, 0], [1,  1],
                ].reduce((cnt, [dx, dy]) => (
                    cnt + (grid[y + dy]?.[x + dx] === "@" ? 1 : 0)
                ), 0) < 4 ? [[x, y]] : [],
            )
        ), [],
    )), [])) => (rm.length === 0) ? 0 : (
        rm.forEach(([x, y]) => (grid[y][x] = ".")), rm.length + rem(rem, grid)
    ),
));

const pEnd = performance.now();

console.log("REMOVABLE ROLLS: " + res);
console.log(pEnd - pStart);
