import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable curly */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim().split("\n").map(x => x.split(" ")).map(x => ({ dir: x[0], n: Number(x[1]) }));

const pStart = performance.now();

const MM = {
    L: [1, -1],
    R: [1, 1],
    U: [0, -1],
    D: [0, 1],
};
const kn = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];

const seen = {};
seen[kn[kn.length - 1][0] + "," + kn[kn.length - 1][1]] = true;

INPUT.forEach(m => {
    for (let j = 0; j < m.n; j++){
        kn[0][MM[m.dir][0]] += MM[m.dir][1];
        for (let k = 1; k < kn.length; k++)
            if (Math.abs(kn[k][0] - kn[k - 1][0]) > 1 || Math.abs(kn[k][1] - kn[k - 1][1]) > 1)
                ((kn[k][0] += Math.sign(kn[k - 1][0] - kn[k][0])) || 1) && (kn[k][1] += Math.sign(kn[k - 1][1] - kn[k][1]));
        seen[kn[kn.length - 1][0] + "," + kn[kn.length - 1][1]] = true;
    }
});

const result = Object.keys(seen).length;

const pEnd = performance.now();

console.log("POSITIONS: " + result);
console.log(pEnd - pStart);
