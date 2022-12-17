"use strict";

/* eslint-disable no-loop-func, no-constant-condition, no-sequences, one-var */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim();

const ROCKS = [
        new Uint32Array([2, 3, 4, 5]),
        new Uint32Array([3, 9, 10, 11, 17]),
        new Uint32Array([2, 3, 4, 11, 18]),
        new Uint32Array([2, 9, 16, 23]),
        new Uint32Array([2, 3, 9, 10]),
    ], done = [], seen = new Map(), blocked = new Set([0, 1, 2, 3, 4, 5, 6]);

let count = 1000000000000, result = 0;

const pStart = performance.now();

let i = 0;
let j = 0;
out: while (count--){
    const r = ROCKS[i].map(v => (v + (result + 4) * 7));
    while (1){
        INPUT[j] === "<"
            ? (r.every(v => v % 7 !== 0) && r.every(v => !blocked.has(v - 1)))
                && r.forEach((v, x, arr) => (arr[x] = v - 1))
            : (r.every(v => v % 7 !== 6) && r.every(v => !blocked.has(v + 1)))
                && r.forEach((v, x, arr) => (arr[x] = v + 1)),
        (j++ >= INPUT.length) && (j -= INPUT.length);

        if (r.every(v => !blocked.has(v - 7))) r.forEach((v, x, arr) => (arr[x] = v - 7));
        else { // @ts-ignore
            r.forEach(v => blocked.add(v)) || done.push(
                Math.max(0, (Math.floor(r[r.length - 1] / 7)) - result),
            ), result += done[done.length - 1];

            const s = j * ROCKS.length + i;
            if (seen.has(s)){
                const old = seen.get(s).concat([done.length - 1]), cl = [0];
                for (let k = 0, l = 0, prev = old[old.length - 1], TMP = prev - old[k]; k < old.length - 1; k++){
                    if (old[k] + 1 < TMP) continue;
                    while (l < TMP) if (done[prev - l] !== done[old[k] - l++]) break;
                    if (l === TMP) cl[0] = TMP;
                }
                if (cl[0]){
                    result += Math.floor(count / cl[0])
                        * done.slice(-cl[0]).reduce((p, v) => p + v, 0)
                        + done.slice(-cl[0], -cl[0] + (count % cl[0])).reduce((p, v) => p + v, 0);
                    break out;
                }
            }
            else seen.set(s, [done.length - 1]);
            break;
        }
    }
    if (++i >= ROCKS.length) i -= ROCKS.length;
}

const pEnd = performance.now();

console.log("UNITS TALL (1000000000000): " + result);
console.log(pEnd - pStart);
