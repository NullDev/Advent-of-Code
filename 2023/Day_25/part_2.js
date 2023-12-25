"use strict";

const { performance } = require("node:perf_hooks");

const pStart = performance.now();

const result = "Merry Christmas c:";

const pEnd = performance.now();

console.log("WE ARE DONE: " + result);
console.log(pEnd - pStart);
