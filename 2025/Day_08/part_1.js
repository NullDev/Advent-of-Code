// @ts-nocheck
import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-sequences */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim().split("\n").map((x, xi) => [xi, x.split(",").map(Number)]);

const pStart = performance.now();

const res = ((
    dx = ([x1, y1, z1], [x2, y2, z2]) => (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2,
    circs = Array(INPUT.length).fill(".").map((x, xi) => new Set([xi])),
    dist = {},
) => (((INPUT.values().forEach(
    ([xi, xv]) => INPUT.filter((l, li) => li > xi).values().forEach(
        ([ri, rv]) => (dist[dx(xv, rv)] = new Set([xi, ri])),
    ),
) || 1) && Object.values(dist)
    .slice(0, 1000)
    .forEach((
        c, _, __,
        cInds = [...c].map(x => circs.findIndex(y => y.has(x))),
        cMin = cInds[0] < cInds[1] ? cInds[0] : cInds[1],
        cMax = cMin === cInds[0] ? cInds[1] : cInds[0],
    ) => (
        (cInds[0] !== cInds[1]) && (
            (circs[cMin] = circs[cMin].union(circs[cMax])) & circs.splice(cMax, 1)
        )
    ))), circs.map(x => x.size).sort((a, b) => b - a).slice(0, 3).reduce((a, c) => a * c, 1)
))();

const pEnd = performance.now();

console.log("PRODUCT OF 3 LARGEST CIRCUITS: " + res);
console.log(pEnd - pStart);
