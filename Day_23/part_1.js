"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

let r = [...String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim()].map(Number);

const pStart = performance.now();

for (let i = 0, c = 0; i < 100; i++){
    const left = [r[0]].concat(r.slice(4));
    c = r[0] - 1;
    while (c !== -1){
        c === 0 && (c += r.length);
        if (left.indexOf(c) !== -1){
            r = left.slice(0, left.indexOf(c) + 1).concat(r.slice(1, 4)).concat(left.slice(left.indexOf(c) + 1));
            break;
        }
        c--;
    }
    r.push(r.shift());
}

let RES = r.concat(r).slice(r.concat(r).indexOf(1) + 1, r.concat(r).indexOf(1) + r.length).join("");

const pEnd = performance.now();

console.log("LABELS: " + RES);
console.log(pEnd - pStart);
