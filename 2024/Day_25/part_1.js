import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-nested-ternary, no-sequences */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim().split(/\n\s*\n/).map(e => e.split("\n"));

const pStart = performance.now();

const res = (([locks, keys]) => locks.reduce(
    (acc, lock) => acc + keys.filter( // @ts-ignore
        key => lock.every((l, i) => (Number(l + key[i]) <= 5)),
    ).length, 0,
))(
    INPUT.reduce((
        acc, pat, _, __,
        arr = Array.from({ length: 5 }, (___, c) =>
            (pat[0] === "#####" ? [1, 2, 3, 4, 5] : [5, 4, 3, 2, 1]).reduce((o, r) => (
                o.sp ? o : pat[r][c] === "#" ? { ct: o.ct + 1, sp: 0 } : { ct: o.ct, sp: 1 }
            ), { ct: 0, sp: 0 }).ct,
        ), // @ts-ignore
    ) => (pat[0] === "#####" ? acc[0].push(arr) : acc[1].push(arr), acc), [[], []]),
);


const pEnd = performance.now();

console.log("UNIQUE LOCK/KEY PAIRS: " + res);
console.log(pEnd - pStart);
