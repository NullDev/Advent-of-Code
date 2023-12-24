"use strict";

/* eslint-disable one-var */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const res = INPUT.map(x => (x.match(/-?\d+/g) || []).map(Number)).map(l => ({
    m: l[4] / l[3], b: l[1] - (l[4] / l[3]) * l[0], sx: l[0], xd: l[3] > 0 ? 1 : -1,
})).reduce((acc, l1, i, a) => acc + a.slice(i + 1).reduce((
    acc2, l2, _, __, d = l1.m - l2.m, x = (l2.b - l1.b) / d, y = l1.m * x + l1.b,
) => ((d === 0) ? acc2 : acc2 + (
    (x >= 200000000000000 && x <= 400000000000000 && y >= 200000000000000 && y <= 400000000000000)
        && (l1.xd > 0 ? x >= l1.sx : x <= l1.sx)
        && (l2.xd > 0 ? x >= l2.sx : x <= l2.sx) ? 1 : 0
)), 0), 0);

const pEnd = performance.now();

console.log("NUMBER OF INTERSECTIONS: " + res);
console.log(pEnd - pStart);
