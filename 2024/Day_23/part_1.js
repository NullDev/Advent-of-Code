import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-sequences */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const res = [
    ...new Set(
        (adj => Object.keys(adj).flatMap(n =>
            [...adj[n]].flatMap((nx1, i, nxList) =>
                nxList.slice(i + 1).filter(nx2 => adj[nx1].has(nx2))
                    .map(nx2 => [n, nx1, nx2].sort().join(",")),
            ))
        )(INPUT.filter((x, i, arr) => !arr.some((y, j) =>
            i > j && y.split("-").reverse().join("-") === x,
        )).map(l => l.split("-")).reduce((acc, [a, b]) => (
            ((acc[a] = (acc[a] || new Set()).add(b)) || 1) &&
            (acc[b] = (acc[b] || new Set()).add(a)),
            acc
        ), {})),
    ),
].filter(e => e.split(",").some(n => n.startsWith("t"))).length;

const pEnd = performance.now();

console.log("SETS WITH AT LEAST ONE T-NODE: " + res);
console.log(pEnd - pStart);
