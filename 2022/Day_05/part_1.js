"use strict";

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n"); // change this if necessary

const pStart = performance.now();

//
// YOUR CODE HERE
//
const result = "...";

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
