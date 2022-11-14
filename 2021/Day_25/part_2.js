"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const { performance } = require("perf_hooks");

const pStart = performance.now();

const MSG = "WE DID IT!!! HAPPY HOLIDAYS! :)";

const pEnd = performance.now();

console.log(MSG);
console.log(pEnd - pStart);
