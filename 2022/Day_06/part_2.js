"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("");

const pStart = performance.now();

const result = INPUT.findIndex((_, i, l) => l.slice(i, i + 14).filter((x, y, z) => z.indexOf(x) === y).length === 14) + 14;

const pEnd = performance.now();

console.log("CHARS PROCESSED UNTIL FIRST START-OF-PACKET: " + result);
console.log(pEnd - pStart);
