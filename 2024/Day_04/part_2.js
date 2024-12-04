import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(l => l.split(""));

const pStart = performance.now();

const res = INPUT.reduce((count, row, i, grid) => count + row.reduce((innerCount, cell, j) =>
    cell === "A" && grid[i - 1] && grid[i + 1]
        ? innerCount + (
            (
                (grid[i - 1][j - 1] + grid[i - 1][j + 1] === "MS" && grid[i + 1][j - 1] + grid[i + 1][j + 1] === "MS") ||
                (grid[i - 1][j - 1] + grid[i - 1][j + 1] === "SM" && grid[i + 1][j - 1] + grid[i + 1][j + 1] === "SM") ||
                (grid[i - 1][j - 1] + grid[i - 1][j + 1] === "SS" && grid[i + 1][j - 1] + grid[i + 1][j + 1] === "MM") ||
                (grid[i - 1][j - 1] + grid[i - 1][j + 1] === "MM" && grid[i + 1][j - 1] + grid[i + 1][j + 1] === "SS")
            ) ? 1 : 0
        ) : innerCount, 0)
, 0);

const pEnd = performance.now();

console.log("X-MAS COUNT: " + res);
console.log(pEnd - pStart);
