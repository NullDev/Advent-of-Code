import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-sequences, no-param-reassign */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const res = ((
    m, bk = (R, P, X, mat, cliques = [], cList = new Set(P)) => ((P.size === 0 && X.size === 0)
        ? [[...R]] : (cList.forEach(v => (((cliques = cliques.concat(bk(
            new Set([...R, v]),
            new Set([...P].filter(x => (mat[v] || new Set()).has(x))),
            new Set([...X].filter(x => (mat[v] || new Set()).has(x))),
            mat,
        ))) || 1) && P.delete(v) && X.add(v))), cliques)),
) => bk(new Set(), new Set(Object.keys(m)), new Set(), m)
    .reduce((max, clique) => (clique.length > max.length ? clique : max), [])
    .sort()
    .join(","))(
    INPUT
        .filter((x, i, arr) => !arr.some((y, j) => i > j && y.split("-").reverse().join("-") === x))
        .map(l => l.split("-"))
        .reduce((acc, [a, b]) => (
            ((acc[a] = (acc[a] || new Set()).add(b)) || 1) &&
            (acc[b] = (acc[b] || new Set()).add(a)),
            acc
        ), {}),
);

const pEnd = performance.now();

console.log("LAN PARTY PASSWORD: " + res);
console.log(pEnd - pStart);
