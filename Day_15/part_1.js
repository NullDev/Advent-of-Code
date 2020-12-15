"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL)[0].split(",").map(Number);

const pStart = performance.now();

const mem = {};
let move = CONTENT_READ.length + 1;
let curr = CONTENT_READ[CONTENT_READ.length - 1];

CONTENT_READ.forEach((e, i) => (mem[e] = [i + 1]));

while (move <= 2020){
    curr = mem[curr].length < 2 ? 0 : mem[curr][mem[curr].length - 1] - mem[curr][mem[curr].length - 2];
    !mem[curr] && (mem[curr] = []);
    mem[curr].push(move);
    move++;
}

const pEnd = performance.now();

console.log("2020TH NUMBER SPOKEN: " + curr);
console.log(pEnd - pStart);
