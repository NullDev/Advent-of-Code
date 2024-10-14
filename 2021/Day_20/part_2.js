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
    .trim()
    .split("\n")
    .map((e, i) => (i === 0)
        ? e.split("").map(c => Number(c === "#"))
        : e.split("\n").map(r => r.split("").map(c => Number(c === "#"))),
    );

const pStart = performance.now();

for (let t = 0; t < 50; t++){
    const store = [];
    for (let i = -1; i < INPUT[1].length + 1; i++){
        const nr = [];
        for (let j = -1; j < INPUT[1].length + 1; j++){
            const lit = [];
            for (let di = -1; di <= 1; di++) // @ts-ignore
                for (let k = -1; k <= 1; k++) lit.push(INPUT[1][i + di]?.[j + k] ?? INPUT[0][0] & t % 2);
            nr.push(INPUT[0][parseInt(lit.join(""), 2)]);
        }
        store.push(nr);
    } // @ts-ignore
    INPUT[1] = store;
}
const RES = INPUT[1].flat().filter(Boolean).length;

const pEnd = performance.now();

console.log("LIT PIXELS (50): " + RES);
console.log(pEnd - pStart);
