import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable one-var */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(l => l.split(""));

const pStart = performance.now();

const sol = [], solve = function(pos, pt = [], depth = 0, pc = [...pt], endPos = { x: INPUT[0].length - 2, y: INPUT.length - 1 }){
    if (pos.x === endPos.x && pos.y === endPos.y) sol.push(pc);
    if (pc.find((p) => p.x === pos.x && p.y === pos.y)) return;
    pc.push(pos) && [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }].forEach((d) => {
        const nX = pos.x + d.x, nY = pos.y + d.y;
        if (!(
            nX < 0 || nY < 0 || nX >= INPUT[0].length || nY >= INPUT.length || (INPUT[nY][nX] === "#"
            || (INPUT[nY][nX] === ">" && d.x !== 1) || (INPUT[nY][nX] === "v" && d.y !== 1))
        )) solve({ x: nX, y: nY }, pc, depth + 1);
    });
};
// @ts-ignore
const res = solve({ x: 1, y: 0 }) || sol.reduce((acc, p) => Math.max(acc, p.length - 1), 0);

const pEnd = performance.now();

console.log("STEPS OF LONGEST HIKE: " + res);
console.log(pEnd - pStart);
