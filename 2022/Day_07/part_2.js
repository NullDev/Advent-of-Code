// @ts-nocheck
"use strict";

/* eslint-disable no-param-reassign */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").slice(0, -1).map(l => l.split(" "));

const pStart = performance.now();

const result = INPUT.reduce(([paths, dir], line) => {
    if (line?.[2] === "..") dir = dir.replace(/\/[^\/]+$/, "");
    else if (line[1] === "cd") (dir = (dir + "/" + line[2]).replace("//", "/")) && paths.push([dir, 0]);
    else if (line[0].match(/^[0-9]+/)) paths.find(p => p[0] === dir)[1] += Number(line[0]);
    return [paths, dir];
}, [[], ""])[0]
    .map(([pre], _, a) => a.reduce((sum, [paths, size]) => paths.slice(0, pre.length) === pre ? sum + size : sum, 0))
    .sort((a, b) => a - b).find((x, _, a) => 70000000 - Math.max(...a) + x >= 30000000);

const pEnd = performance.now();

console.log("TOTAL DIR SIZE: " + result);
console.log(pEnd - pStart);
