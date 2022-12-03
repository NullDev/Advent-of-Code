"use strict";

/* eslint-disable curly */

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const priorities = [];
for (let i = 2; i < INPUT.length; i += 3)
    priorities.push(INPUT[i].split("").filter((el) => INPUT[i - 1].indexOf(el) !== -1 && INPUT[i - 2].indexOf(el) !== -1)[0]);

const result = priorities.reduce((p, c) => p + (c.charCodeAt(0) - (c.charCodeAt(0) >= 97 ? 96 : 38)), 0);

const pEnd = performance.now();

console.log("SUM OF PRIORITIES (three-elf): " + result);
console.log(pEnd - pStart);
