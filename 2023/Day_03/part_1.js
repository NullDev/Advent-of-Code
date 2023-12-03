"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const [ nPos, sPos ] = [/[0-9]+/g, /[^0-9,\.]/g] // @ts-ignore
    .map(reg => INPUT.reduce((data, str, l) => [
        ...data,
        ...([...str.matchAll(reg)].map(s => ({ l, t: s[0], pos: s.index }))),
    ], []));

const res = /** @type {any} */ (nPos).reduce((sum, { l: nL, pos: nP, t: nb }) =>
    !! /** @type {any} */ (sPos).find(({ l: sL, pos: sP }) =>
        (sL === nL ||
          (!!(nL - 1) && sL === (nL - 1))
          || (!!(nL + 1) && sL === (nL + 1))
        ) && (sP <= nP + nb.length && sP >= (nP - 1)),
    ) ? sum + (+nb) : sum, 0,
);

const pEnd = performance.now();

console.log("SUM OF PART NUMBERS: " + res);
console.log(pEnd - pStart);
