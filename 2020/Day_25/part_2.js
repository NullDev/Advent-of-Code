import { performance } from "node:perf_hooks";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const pStart = performance.now();

const MSG = "WE DID IT!!! HAPPY HOLIDAYS! :)";

const pEnd = performance.now();

console.log(MSG);
console.log(pEnd - pStart);
