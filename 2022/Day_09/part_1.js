import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim().split("\n").map(x => x.split(" ")).map(x => ({ dir: x[0], n: Number(x[1]) }));

const pStart = performance.now();

const h = [0, 0];
let t = [0, 0];
const MM = {
    L: [1, -1],
    R: [1, 1],
    U: [0, -1],
    D: [0, 1],
};

const seen = {};
seen[t[0] + "," + t[1]] = true;

INPUT.forEach(m => {
    for (let j = 0; j < m.n; j++){
        const headPrev = h.map(x => x);
        h[MM[m.dir][0]] += MM[m.dir][1];
        if (Math.abs(h[0] - t[0]) > 1 || Math.abs(h[1] - t[1]) > 1) t = headPrev;
        seen[t[0] + "," + t[1]] = true;
    }
});

const result = Object.keys(seen).length;

const pEnd = performance.now();

console.log("POSITIONS: " + result);
console.log(pEnd - pStart);
