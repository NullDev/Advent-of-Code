import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable one-var */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n\n");

const pStart = performance.now();

const rules = INPUT[0].split("\n").map(
        rule => ({ before: +rule.split("|")[0], after: +rule.split("|")[1] }),
    ), res = INPUT[1].split("\n").map(u => u.split(",").map(Number))
        .reduce((acc, update) => (
            !rules.some(({ before, after }) => update.includes(before)
                && update.includes(after)
                && update.indexOf(before) >= update.indexOf(after))
        ) ? acc + update[Math.floor(update.length / 2)] : acc, 0);

const pEnd = performance.now();

console.log("MIDDLE PAGE NUMBER SUM: " + res);
console.log(pEnd - pStart);
