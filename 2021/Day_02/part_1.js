import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-return-assign, no-nested-ternary */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n").map(e => e.split(" "));

const pStart = performance.now();

let x = 0;
let y = 0;

INPUT.forEach(e => e[0][0] === "f"
    ? x += Number(e[1])
    : e[0] === "down"
        ? y += Number(e[1])
        : e[0] === "up" && (y -= Number(e[1])),
);

const res = x * y;

/*
// Array only approach. (Way slower)
let res = INPUT.map(e => {
    let r = [0,0];
    e[0][0] === "f"
        ? r[0] += Number(e[1])
        : e[0][0] === "d"
            ? r[1] += Number(e[1])
            : e[0][0] === "u" && (r[1] -= Number(e[1]));
    return r;
}).reduce((a, b) => [a[0] + b[0], a[1] + b[1]]).reduce((a, b) => a * b);
*/

const pEnd = performance.now();

console.log("PRODUCT OF X-POSITION AND DEPTH: " + res);
console.log(pEnd - pStart);
