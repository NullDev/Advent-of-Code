"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL).map(e => Number(e));

const pStart = performance.now();

// eslint-disable-next-line consistent-return
const walker = function(){
    for (let i = 25; i < CONTENT_READ.length; i++){
        const prev = CONTENT_READ.slice(i - 25, i);
        if (!prev.some(n => prev.some(other => other !== n && other + n === CONTENT_READ[i]))) return CONTENT_READ[i];
    }
};

const res = walker();

const pEnd = performance.now();

console.log("FIRST NUMBER: " + res);
console.log(pEnd - pStart);
