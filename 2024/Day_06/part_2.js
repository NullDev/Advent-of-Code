import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-param-reassign */

const INPUT = String(fs.readFileSync(path.join(__dirname, "INPUT.txt"))).trim().split("\n");

const pStart = performance.now();

const res = ((
    rows = INPUT.length, cols = INPUT[0].length, dir = [[-1, 0], [0, 1], [1, 0], [0, -1]],
    [sRow, sCol, sDir] = INPUT.flatMap((row, r) => row.split("").map((cell, c) => "^>v<".includes(cell)
        ? [r, c, "^>v<".indexOf(cell)] : null)).find(Boolean) || [],
) =>
    Array.from({ length: rows * cols }, (_, idx) => [
        Math.floor(idx / cols),
        idx % cols,
    ]).filter(([r, c]) => INPUT[r][c] !== "#" && !(r === sRow && c === sCol)).reduce((
        count, [oRow, oCol], _, __, gRow = sRow, gCol = sCol, gDir = sDir, visited = new Set([`${gRow},${gCol},${gDir}`]),
    ) => {
        while (true){
            const [nRow, nCol] = [gRow +  dir[gDir][0], gCol +  dir[gDir][1]];
            if (nRow < 0 || nRow >= rows || nCol < 0 || nCol >= cols) break;

            (((nRow === oRow && nCol === oCol) ? "#" : INPUT[nRow][nCol]) === "#")
                ? (gDir = (gDir + 1) % 4)
                : ((gRow = nRow) || 1) && (gCol = nCol);

            const state = `${gRow},${gCol},${gDir}`;
            if (visited.has(state)) return count + 1;
            visited.add(state);
        }
        return count;
    }, 0)
)();

const pEnd = performance.now();

console.log("VALID POSITIONS: " + res);
console.log(pEnd - pStart);
