import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-return-assign, no-sequences */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim().split("\n").map(l => l.split(""));

const pStart = performance.now();

const res = ((
    [ ps, rows, cols ] = INPUT.reduce((acc, row, y) => (
        row.forEach((v, x) => ((v === ".")
            ? true : (acc[0][v] === undefined
                ? acc[0][v] = [] : 0, acc[0][v].push([x, y]), 0))), acc
    ), [{}, INPUT.length, INPUT[0].length]),
) => Object.keys(
    Object.entries(ps).reduce((acc, [, locs]) => (
        locs.forEach((loc1, i) => locs.forEach((
            loc2, j, _, onG = ([x, y]) => x >= 0 && y >= 0 && x < cols && y < rows,
            d = [0, 1].map(i1 => loc1[i1] - loc2[i1]),
            p1 = [0, 1].map(i1 => loc1[i1] + d[i1]), p2 = [0, 1].map(i1 => loc2[i1] - d[i1]), // @ts-ignore
        ) => (!(j <= i) && (onG(p1) && (acc[p1.join("_")] = 1), onG(p2) && (acc[p2.join("_")] = 1))))), acc
    ), {}),
))().length;

const pEnd = performance.now();

console.log("UNIQUE LOCATIONS: " + res);
console.log(pEnd - pStart);
