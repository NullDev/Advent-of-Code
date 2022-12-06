"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

// feels a bit like cheating lol
// but yea why not list every possible move with it's exact score
const MOVES = { "A X": 4, "A Y": 8, "A Z": 3, "B X": 1, "B Y": 5, "B Z": 9, "C X": 7, "C Y": 2, "C Z": 6 };
const score = INPUT.map(e => MOVES[e]).reduce((a, b) => a + b, 0);

const pEnd = performance.now();

console.log("FINAL SCORE (XYZ = ME): " + score);
console.log(pEnd - pStart);
