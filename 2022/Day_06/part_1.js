"use strict";

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("");

const pStart = performance.now();

const result = INPUT.findIndex((_, i, l) => l.slice(i, i + 4).filter((x, y, z) => z.indexOf(x) === y).length === 4) + 4;

const pEnd = performance.now();

console.log("CHARS UNTIL FIRST START-OF-PACKET: " + result);
console.log(pEnd - pStart);
