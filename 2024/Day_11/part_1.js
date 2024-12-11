import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-nested-ternary */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split(" ").map(Number);

const pStart = performance.now();

const mem = {};
const run = (
    s, steps, key = `${s}|${steps}`,
) => ((steps === 0) ? 1 : ((key in mem)
    ? mem[key]
    : (mem[key] = (s === 0)
        ? run(1, steps - 1)
        : (String(s).length % 2 === 0)
            ? run(Number(String(s).substring(0, String(s).length / 2)), steps - 1)
                + run(Number(String(s).substring(String(s).length / 2)), steps - 1)
            : run(s * 2024, steps - 1)), mem[key]));

const res = INPUT.map(s => run(s, 25)).reduce((acc, x) => acc + x);

const pEnd = performance.now();

console.log("STONES AFTER BLINKING 25 TIMES: " + res);
console.log(pEnd - pStart);
