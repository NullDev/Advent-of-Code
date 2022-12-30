"use strict";

/* eslint-disable no-param-reassign, curly */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim().split("\n").filter(x => x)
    .map(x => x.split(".").filter(a => a)
        .map(b => b.match(/\d+ [a-z]+/g)?.reduce((r, c) => ({ ...r, [c.split(" ")[1]]: Number(c.split(" ")[0]) }), {}))
        .map(z => ["ore", "clay", "obsidian", "geode"].map(y => z?.[y] ?? 0)));

const pStart = performance.now();

const maxG = (
    t, [or, cl, ob, ge], [dOr, dCl, dOb, dGe],
    [, [clCo], [, obCo], [, , geCo]],
) => {
    for (let i = 0; i < t; i++)
        (((or += dOr) && (cl += dCl) && (ob += dOb) && (ge += dGe) && dOr++) || 1)
        && (((or >= clCo) && ((or -= clCo) || 1) && dCl++) || 1)
        && (((cl >= obCo) && ((cl -= obCo) || 1) && dOb++) || 1)
        && (ob >= geCo) && ((ob -= geCo) || 1) && dGe++;
    return ge;
};

const solve = (
    cA, n, max = 0, mC = [...Array(cA.length)].map((_, i) => Math.max(...cA.map(c => c[i]))),
) => {
    const si = (t, res, prod) => {
        if (t === 0) return res[3];
        if (res[3] + maxG(t, res, prod, cA) < max){return 0;}
        const r2b = cA
            .map((c, pr) => ({ c, pr }))
            .filter(({ pr }) => mC[pr] === 0 || prod[pr] < mC[pr])
            .filter(({ c }) => c.every((x, i) => x === 0 || prod[i] > 0))
            .map(({ c, pr }) => ({
                c, pr,
                r: Math.max(...c.map(
                    (x, i) => x <= res[i] ? 0 : Math.ceil((x - res[i]) / prod[i]),
                )) + 1,
            }))
            .filter(({ r }) => t - r >= 0)
            .reverse();

        const result = Math.max(
            ...r2b.map(({ c, pr, r }) => si(
                t - r,
                res.map((x, i) => x + prod[i] * r - c[i]),
                prod.map((x, i) => (i === pr ? x + 1 : x)),
            )),
        );
        if (result > max) max = result;
        return result;
    };
    return si(n, [0, 0, 0, 0], [1, 0, 0, 0]);
};

const result = INPUT.map((c, i) => (i + 1) * solve(c, 24)).reduce((s, x) => s + x);

const pEnd = performance.now();

console.log("SUM OF QUALITY LEVELS: " + result);
console.log(pEnd - pStart);
