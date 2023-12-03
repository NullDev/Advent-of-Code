"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const [ nPos, sPos ] = [/[0-9]+/g, /\*/g] // @ts-ignore
    .map(reg => INPUT.reduce((data, str, l) => [
        ...data,
        ...([...str.matchAll(reg)].map(s => ({ l, z: s[0], pos: s.index }))),
    ], []));

const res = /** @type {any} */ (sPos).reduce((sum, { l: sL, pos: sP }) => {
    const n = /** @type {any} */ (nPos).filter(({ l: nL, pos: nP, z }) =>
        (nL === sL ||
            (!!(nL - 1) && sL === (nL - 1))
            || (!!(nL + 1) && sL === (nL + 1))
        ) && ((sP <= (nP + z.length)) && (sP >= (nP - 1))),
    ).map(nbData => +nbData.z);
    return n.length === 2 ? n.reduce((pr, nb) => nb * pr, 1) + sum : sum;
}, 0);

const pEnd = performance.now();

console.log("SUM OF GEAR RATIOS: " + res);
console.log(pEnd - pStart);
