import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n\n").map(m => m.match(/\d+/g));

const pStart = performance.now();

const res = INPUT.reduce(( // @ts-ignore
    tok, [ax, ay, bx, by, tx1, ty1], _, __,
    [tx, ty] = [tx1, ty1].map(e => Number(e) + 10000000000000),
    a = (by * tx - bx * ty) / (ax * by - ay * bx),
    b = (ax * ty - ay * tx) / (ax * by - ay * bx),
) => (tok + ( !(a % 1 || b % 1) ? a * 3 + b : 0 )), 0);

const pEnd = performance.now();

console.log("NEW FEWEST POSSIBLE TOKENS: " + res);
console.log(pEnd - pStart);
