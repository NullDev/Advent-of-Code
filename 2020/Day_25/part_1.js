"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const [ cardKey, doorKey ] = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trimEnd().split(require("os").EOL).map(Number);

const pStart = performance.now();

let RES = [1, 1];
while (RES[1] !== doorKey) (RES[1] = (RES[1] * 7) % 20201227) && (RES[0] = (RES[0] * cardKey) % 20201227);

const pEnd = performance.now();

console.log("ENCRYPTION KEY: " + RES[0]);
console.log(pEnd - pStart);
