"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL).map(e => e.split("-"));

const pStart = performance.now();

const HEAP = {};
for (const [a, b] of INPUT){
    if (!(a in HEAP)) HEAP[a] = new Set();
    if (!(b in HEAP)) HEAP[b] = new Set();
    (HEAP[a].add(b)) && (HEAP[b].add(a));
}

let traverse = function(s = "start", traversed = new Set()){
    if (s === "end") return 1;

    let seen = traversed;
    if (s === s.toLowerCase()) seen = new Set([...traversed, s]);

    let c = 0;
    HEAP[s].forEach(e => ((!traversed.has(e)) && (c += traverse(e, seen))));
    return c;
};

const RES = traverse();

const pEnd = performance.now();

console.log("PATH COUNT (1X SMALL CAVE): " + RES);
console.log(pEnd - pStart);
