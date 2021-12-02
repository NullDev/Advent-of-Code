"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL).map(e => e.split(" "));

const pStart = performance.now();

let x = 0;
let y = 0;

INPUT.forEach(e => e[0][0] === "f"
    ? x += Number(e[1])
    : e[0][0] === "d"
        ? y += Number(e[1])
        : e[0][0] === "u" && (y -= Number(e[1]))
);

const res = x * y;

/*
// Array only approach. (Way slower)
let res = INPUT.map(e => {
    let r = [0,0];
    e[0][0] === "f"
        ? r[0] += Number(e[1])
        : e[0][0] === "d"
            ? r[1] += Number(e[1])
            : e[0][0] === "u" && (r[1] -= Number(e[1]));
    return r;
}).reduce((a, b) => [a[0] + b[0], a[1] + b[1]]).reduce((a, b) => a * b);
*/

const pEnd = performance.now();

console.log("PRODUCT OF X-POSITION AND DEPTH: " + res);
console.log(pEnd - pStart);
