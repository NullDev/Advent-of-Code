"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt")));

const pStart = performance.now();

let COUNT = 0;
const CONTENT = CONTENT_READ.replace(/\n\r/g, "\n")
    .replace(/\r/g, "\n")
    .split(/\n{2,}/g)
    .map(element => element.replace(/\n/g, ""))
    .filter(e => !!e)
    .forEach(e => (COUNT += new Set(e).size));

const pEnd = performance.now();

console.log("TOTAL COUNT: " + COUNT);
console.log(pEnd - pStart);
