"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL);

const pStart = performance.now();

let RES = 0;

let [firstID, ...IDS] = CONTENT_READ[1]
    .split(",")
    .map((id, index) => [Number(id), index])
    .filter(([e]) => Number.isInteger(e));

IDS.forEach(([id, index]) => {
    for (;;){
        if ((RES + index) % id === 0) return (firstID[0] *= id);
        RES += firstID[0];
    }
});

const pEnd = performance.now();

console.log("EARLIEST TIMSTAMP: " + RES);
console.log(pEnd - pStart);
