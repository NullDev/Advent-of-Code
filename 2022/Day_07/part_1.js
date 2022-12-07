// @ts-nocheck
"use strict";

/* eslint-disable no-param-reassign, no-nested-ternary */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").slice(0, -1).map(l => l.split(" "));

const pStart = performance.now();

const result = INPUT.reduce(([paths, dir], line) => {
    line?.[2] === ".."
        ? dir = dir.replace(/\/[^\/]+$/, "")
        : line[1] === "cd"
            ? (dir = (dir + "/" + line[2]).replace("//", "/")) && paths.push([dir, 0])
            : line[0].match(/^[0-9]+/) && (paths.find(p => p[0] === dir)[1] += Number(line[0]));
    return [paths, dir];
}, [[], ""])[0]
    .map(([pre], _, a) => a.reduce((sum, [paths, size]) => paths.slice(0, pre.length) === pre ? sum + size : sum, 0))
    .reduce((sum, s) => s <= 100000 ? s + sum : sum, 0);

const pEnd = performance.now();

console.log("SUM OF SIZES: " + result);
console.log(pEnd - pStart);
