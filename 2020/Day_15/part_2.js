"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL)[0].split(",").map(Number);

const pStart = performance.now();

const mem = new Uint32Array(30000000);
let curr = 0;

for (let i = 0; i < 30000000; i++){
    if (i < CONTENT_READ.length) mem[curr = CONTENT_READ[i]] = i + 1;
    else {
        const prev = mem[curr] || -1;
        mem[curr] = i;
        curr = prev === -1 ? 0 : i - prev;
    }
}

const pEnd = performance.now();

console.log("30000000TH NUMBER SPOKEN: " + curr);
console.log(pEnd - pStart);
