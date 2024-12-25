import { performance } from "node:perf_hooks";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const pStart = performance.now();

const result = "Merry Christmas c:";

const pEnd = performance.now();

console.log("WE ARE DONE: " + result);
console.log(pEnd - pStart);
