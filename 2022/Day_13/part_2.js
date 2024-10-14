import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-eval, no-nested-ternary, consistent-return */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n")
    .filter(e => e.trim() !== "").map(eval);

const pStart = performance.now();

const check = (a, b) => {
    if (typeof a === "number" && typeof b === "object") return check([a], b);
    if (typeof a === "object" && typeof b === "number") return check(a, [b]);
    if (typeof a === "number" && typeof b === "number") return (a > b) ? -1 : (a < b) ? 1 : 0;
    if (typeof a === "object" && typeof b === "object"){
        for (let i = 0; i < Math.min(a.length, b.length); i++){
            const c = check(a[i], b[i]);
            if (c !== 0) return c;
        }
        return (a.length < b.length) ? 1 : (a.length > b.length) ? -1 : 0;
    }
};

INPUT.push([[2]], [[6]]);

const result = (INPUT.sort((a, b) => check(b, a)).findIndex((p) => check(p, [[2]]) === 0) + 1)
    * (INPUT.findIndex((p) => check(p, [[6]]) === 0) + 1);

const pEnd = performance.now();

console.log("DECODER KEY: " + result);
console.log(pEnd - pStart);
