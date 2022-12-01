"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-return-assign, no-nested-ternary */

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n").map(e => e.split(" "));

const pStart = performance.now();

let x = 0;
let y = 0;
let a = 0;

INPUT.forEach(e => e[0][0] === "f"
    ? (x += Number(e[1])) && (y += a * Number(e[1]))
    : e[0] === "down"
        ? a += Number(e[1])
        : e[0] === "up" && (a -= Number(e[1])),
);

const res = x * y;

const pEnd = performance.now();

console.log("PRODUCT OF X-POSITION AND DEPTH: " + res);
console.log(pEnd - pStart);
