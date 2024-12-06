import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-return-assign, no-nested-ternary, no-sequences, no-param-reassign */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const res = new Set(
    ((
        rows = INPUT.length, cols = INPUT[0].length, dir = [[-1, 0], [0, 1], [1, 0], [0, -1]],
        [gRow, gCol, gDir] = INPUT
            .flatMap((row, r) => row.split("")
                .map((cell, c) => "^>v<".includes(cell) ? [r, c, "^>v<".indexOf(cell)] : null))
            .find(Boolean) || [],
    ) => Array.from({ length: rows * cols }).reduce((
        done, _, __, ___,
        [nRow, nCol] = [gRow + dir[gDir][0], gCol + dir[gDir][1]],
    ) => ((nRow < 0 || nRow >= rows || nCol < 0 || nCol >= cols)
        ? done
        : (INPUT[nRow][nCol] === "#")
            ? gDir = (gDir + 1) % 4
            : ((gRow = nRow) || 1) && ((gCol = nCol) || 1) && done.add(`${gRow},${gCol}`), done
    ), new Set([`${gRow},${gCol}`])))(),
).size;

const pEnd = performance.now();

console.log("DISTINCT POSITIONS: " + res);
console.log(pEnd - pStart);
