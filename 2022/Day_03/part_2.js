"use strict";

/* eslint-disable curly */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const priorities = [];
for (let i = 2; i < INPUT.length; i += 3)
    priorities.push(INPUT[i].split("").filter((el) => INPUT[i - 1].indexOf(el) !== -1 && INPUT[i - 2].indexOf(el) !== -1)[0]);

const result = priorities.reduce((p, c) => p + (c.charCodeAt(0) - (c.charCodeAt(0) >= 97 ? 96 : 38)), 0);

const pEnd = performance.now();

console.log("SUM OF PRIORITIES (three-elf): " + result);
console.log(pEnd - pStart);
