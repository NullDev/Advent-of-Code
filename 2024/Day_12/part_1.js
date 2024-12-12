import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-loop-func, no-param-reassign, one-var */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const res = ((
    cols = INPUT.length,
    rows = INPUT[0].length,
    dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]],
    grid = new Map(INPUT.flatMap((line, i)=>[...line].map((c, j)=>[`${i},${j}`, c]))),
    isInvalid = (i, j) => i < 0 || i >= cols || j < 0 || j >= rows,
    seen = new Set(),
) => {
    const calc = (
        di, dj,
        reg = new Set(),
        area = 0, per = 0,
    ) => {
        for (const stack = [[di, dj]], sym = grid.get(`${di},${dj}`); stack.length;){ // @ts-ignore
            const [i, j] = stack.pop();
            if (isInvalid(i, j)) continue;
            if (reg.has(`${i},${j}`)) continue;
            ((reg.add(`${i},${j}`) && area++) || 1) && dirs.forEach((
                [x, y], _, __, ni = i + x, nj = j + y,
            ) => isInvalid(ni, nj)
                ? per++
                : (grid.get(`${ni},${nj}`) === sym && stack.push([ni, nj])) || per++);
        }
        return [area, per, reg];
    };
    return [...grid.keys()].reduce((acc, pos) => {
        if (seen.has(pos)) return acc;
        const [i, j] = pos.split(",").map(Number), [area, per, reg] = calc(i, j); // @ts-ignore
        reg.forEach(p => seen.add(p)); // @ts-ignore
        return acc + area * per;
    }, 0);
})();

const pEnd = performance.now();

console.log("TOTAL PRICE: " + res);
console.log(pEnd - pStart);
