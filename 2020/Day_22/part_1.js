"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trimEnd();

const pStart = performance.now();

const cardDecks = CONTENT_READ.match(/(\n\d+)+/g).map(e => e.trim().split("\n").map(n => Number(n)).reverse());
for (let i = 1, s = []; cardDecks[0].length && cardDecks[1].length; i++){
    s = [].concat(cardDecks[0].pop(), cardDecks[1].pop());
    s[0] > s[1] ? cardDecks[0].unshift(...s.reverse()) : cardDecks[1].unshift(...s);
}
const RES = (cardDecks[0].length ? cardDecks[0] : cardDecks[1]).reduce((prev, curr, ind) => prev + curr * (ind + 1), 0);

const pEnd = performance.now();

console.log("WINNING SCORE: " + RES);
console.log(pEnd - pStart);
