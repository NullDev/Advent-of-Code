"use strict";

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const MOVES = { "A X": 3, "A Y": 4, "A Z": 8, "B X": 1, "B Y": 5, "B Z": 9, "C X": 2, "C Y": 6, "C Z": 7 };
const score = INPUT.map(e => MOVES[e]).reduce((a, b) => a + b, 0);

const pEnd = performance.now();

console.log("FINAL SCORE (XYZ = END): " + score);
console.log(pEnd - pStart);
