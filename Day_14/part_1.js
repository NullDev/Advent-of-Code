"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL).filter(e => !!e);

const pStart = performance.now();

const mem = new Map();
let mask;

CONTENT_READ.forEach(line => {
    if (line.startsWith("mask")) [ , mask ] = line.split(" = ");
    else {
        const [ , address, value ] = line.match(/mem\[(\d+)\] = (\d+)/);
        mem.set(address, parseInt(Number(value)
            .toString(2)
            .padStart(36, "0")
            .split("")
            .map((bit, i) => (mask[i] === "X" ? bit : mask[i]))
            .join(""), 2
        ));
    }
});

let res = Array.from(mem.values()).reduce((p, c) => p + c);

const pEnd = performance.now();

console.log("SUM OF MEMORY VALUES: " + res);
console.log(pEnd - pStart);
