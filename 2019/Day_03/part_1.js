import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const [A, B] = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim()
    .split("\n")
    .map(a => a.split(","))
    .map(p => p.map(dir => /(.)(\d+)/g.exec(dir)?.slice(1, 3)));

const pStart = performance.now();

const dir = [{ U: 0, D: 0, R: +1, L: -1 }, { U: +1, D: -1, R: 0, L: 0 }];

const gP = function(p){
    const pointsMap = {};
    let x = 0;
    let y = 0;
    let len = 0;

    p.forEach(([d0, d1]) => {
        for (let i = 0; i < d1; i++) (len += 1) && (x += dir[0][d0]) && (y += dir[1][d0]) && (pointsMap[`${x},${y}`] = len);
    });
    return pointsMap;
};

const pA = gP(A);
const pB = gP(B);

const RES = Math.min(
    ...Object.keys(pA)
        .filter(k => pB[k])
        .map(p => p.split(",")
            .map(Number)
            .map(Math.abs)
            .reduce((a, b) => a + b),
        ),
);

const pEnd = performance.now();

console.log("MANHATTAN DISTANCE: " + RES);
console.log(pEnd - pStart);
