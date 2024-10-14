import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable one-var, no-constant-condition, no-shadow */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").filter(row => row.trim());

const pStart = performance.now();

const mp = [INPUT.reduce((acc, row, y) => row.indexOf("S") !== -1 ? { y, x: row.indexOf("S") } : acc, {})];
let result = 0, tmp = mp;
while(1){ // @ts-ignore
    const checked = tmp.flatMap(({ y, x }) => [
        { y: y - 1, x, v: y !== 0 && ["L", "J", "|", "S"].includes(INPUT[y][x]) && ["7", "F", "|"].includes(INPUT[y - 1][x]) },
        { y: y + 1, x, v: y + 1 !== INPUT.length && ["F", "7", "|", "S"].includes(INPUT[y][x]) && ["J", "L", "|"].includes(INPUT[y + 1][x]) },
        { y, x: x - 1, v: x !== 0 && ["J", "7", "-", "S"].includes(INPUT[y][x]) && ["F", "L", "-"].includes(INPUT[y][x - 1]) },
        { y, x: x + 1, v: x + 1 !== INPUT[y].length && ["7", "J", "-"].includes(INPUT[y][x + 1]) && ["F", "L", "-", "S"].includes(INPUT[y][x]) }, // @ts-ignore
    ].filter(({ v }) => v).map(({ y, x }) => ({ y, x }))).filter(m => !mp.some(v => v.y === m.y && v.x === m.x));
    if (!checked.length) break;
    ++result && mp.push(...checked) && (tmp = checked);
}

const pEnd = performance.now();

console.log("STEPS: " + result);
console.log(pEnd - pStart);
