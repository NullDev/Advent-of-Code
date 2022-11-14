"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-loop-func, curly */

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");
const { EOL } = require("os");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim()
    .split(EOL.repeat(2))
    .map(e => e.split(EOL).filter((x) => x).slice(1).map((x) => x.split(",").map(Number)));
const STORE = [{ loc: [0, 0, 0], processed: INPUT.shift(), passed: false }];

const pStart = performance.now();

while (INPUT.length) STORE.forEach(e => {
    if (!e.passed){
        e.passed = true; // I literally never use labels
        upperLoop: for (let j = INPUT.length - 1; j >= 0; j--) for (let k = 0, store = {}; k < 24; k++){
            const rotated = INPUT[j].map(beacon => [ // This matrix is stolen from reddit c: (see link below <3)
                ([x, y, z]) => [x, y, z],   ([x, y, z]) => [x, -y, -z],  ([x, y, z]) => [x, z, -y],
                ([x, y, z]) => [x, -z, y],  ([x, y, z]) => [-x, -y, z],  ([x, y, z]) => [-x, y, -z],
                ([x, y, z]) => [-x, z, y],  ([x, y, z]) => [-x, -z, -y], ([x, y, z]) => [y, z, x],
                ([x, y, z]) => [y, -z, -x], ([x, y, z]) => [y, x, -z],   ([x, y, z]) => [y, -x, z],
                ([x, y, z]) => [-y, -z, x], ([x, y, z]) => [-y, z, -x],  ([x, y, z]) => [-y, -x, -z],
                ([x, y, z]) => [-y, x, z],  ([x, y, z]) => [z, x, y],    ([x, y, z]) => [z, -x, -y],
                ([x, y, z]) => [z, y, -x],  ([x, y, z]) => [z, -y, x],   ([x, y, z]) => [-z, -x, y],
                ([x, y, z]) => [-z, x, -y], ([x, y, z]) => [-z, y, x],   ([x, y, z]) => [-z, -y, -x], // @ts-ignore
            ][k](beacon)); // https://www.reddit.com/r/adventofcode/comments/rk0fyk/2021_day19_question_can_somebeody_tell_me_if_my/
            for (let l = 0; l < e.processed.length; l++) for (let m = 0; m < rotated.length; m++){
                const d = [e.processed[l][0] - rotated[m][0], e.processed[l][1] - rotated[m][1], e.processed[l][2] - rotated[m][2]];
                store[d] = store[d] + 1 || 1;
                if (store[d] >= 12){
                    INPUT.splice(j, 1) && STORE.push({
                        loc: [e.loc[0] + d[0], e.loc[1] + d[1], e.loc[2] + d[2]], processed: rotated, passed: false,
                    });
                    continue upperLoop;
                }
            }
        }
    }
});

const set = new Set();
STORE.forEach(e => e.processed.forEach(f => set.add(`${f[0] + e.loc[0]}, ${f[1] + e.loc[1]}, ${f[2] + e.loc[2]}`)));
const RES = set.size;

const pEnd = performance.now();

console.log("BEACON COUNT: " + RES);
console.log(pEnd - pStart);
