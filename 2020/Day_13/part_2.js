"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL);

const pStart = performance.now();

let RES = 0;

const [firstID, ...IDS] = CONTENT_READ[1]
    .split(",")
    .map((id, index) => [Number(id), index])
    .filter(([e]) => Number.isInteger(e));

IDS.forEach(id => {
    while ((RES + id[1]) % id[0] !== 0) RES += firstID[0];
    firstID[0] *= id[0];
});

const pEnd = performance.now();

console.log("EARLIEST TIMSTAMP: " + RES);
console.log(pEnd - pStart);
