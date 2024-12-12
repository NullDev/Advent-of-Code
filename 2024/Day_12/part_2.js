import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-param-reassign, one-var, curly */

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
    const findSides = (
        reg,
        pts = [...reg].map(p => p.split(",").map(Number)),
        is = new Set(pts.map(([i])=>i)),
        js = new Set(pts.map(([, j])=>j)),
        minI = Math.min(...is), maxI = Math.max(...is),
        minJ = Math.min(...js), maxJ = Math.max(...js),
        corners = new Set(),
        double = 0,
    ) => {
        for (let i = minI; i <= maxI + 1; i++)
            for (let j = minJ; j <= maxJ + 1; j++){
                const idx = (reg.has(`${i - 1},${j - 1}`) * 1) + (reg.has(`${i - 1},${j}`) * 2)
                            + (reg.has(`${i},${j - 1}`) * 4) + (reg.has(`${i},${j}`) * 8);
                (((![0, 3, 5, 10, 12, 15].includes(idx)) && corners.add(`${i},${j}`)) || 1)
                    && ([6, 9].includes(idx)) && double++;
            }
        return corners.size + double;
    };
    const calc = (
        di, dj, g,
        reg = new Set(),
        area = 0,
    ) => {
        for (const stack = [[di, dj]], sym = g.get(`${di},${dj}`); stack.length;){ // @ts-ignore
            const [i, j] = stack.pop();
            if (isInvalid(i, j)) continue;
            if (reg.has(`${i},${j}`)) continue;
            ((reg.add(`${i},${j}`) && area++) || 1) && dirs.forEach((
                [x, y], _, __, ni = i + x, nj = j + y,
            ) => !isInvalid(ni, nj) && g.get(`${ni},${nj}`) === sym && stack.push([ni, nj]));
        }
        return [area, reg];
    };
    return [...grid.entries()].reduce((acc, [pos]) => {
        if (seen.has(pos)) return acc;
        const [i, j] = pos.split(",").map(Number), [area, reg] = calc(i, j, grid); // @ts-ignore
        reg.forEach(p => seen.add(p)); // @ts-ignore
        return acc + area * findSides(reg);
    }, 0);
})();

const pEnd = performance.now();

console.log("NEW TOTAL PRICE: " + res);
console.log(pEnd - pStart);
