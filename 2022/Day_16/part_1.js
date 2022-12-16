"use strict";

/* eslint-disable no-param-reassign, no-constant-condition, no-cond-assign, one-var */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim()
        .split("\n")
        .map((
            l, _, __, h = l.split(";"), r = Number([...(l.match(/(\d+)/) || [])][1]),
            n = [...(h[0].match(/([A-Z][A-Z])/) || [])][1], ds = [...(h[1].match(/[A-Z][A-Z]/g) || [])],
        ) => ({ n, r, ds, op: n === "AA" || r === 0, costs: {} })),
    vals = INPUT.filter(f => f.r || f.n === "AA");

const pStart = performance.now();

let result = 0;

for (const v of vals){
    for (const w of vals){
        if (v.n !== w.n){ // eslint-disable-next-line prefer-const
            let level = 1, { ds } = v, fin = new Set();
            out: while (1){
                for (const d of ds){
                    if (d === w.n){
                        v.costs[w.n] = level;
                        break out;
                    }
                    INPUT.filter(f => f.n === d)[0].ds.forEach(x => fin.add(x));
                }
                (ds = [...fin]) && level++;
            }
        }
    }
}

const s = (op, r, cur, rem, p = vals.find(f => f.n === cur) || { costs: {}, r: 0 }) => {
    if (rem <= 0) return;
    ((result = Math.max(r, result)) || 1) && !op.includes(cur)
        ? s([...op, cur], r + p.r * rem, cur, rem - 1)
        : Object.keys(p.costs)
            .filter(f => !op.includes(f))
            .forEach(k => s(op, r, k, rem - p.costs[k]));
};

s(["AA"], 0, "AA", 29);

const pEnd = performance.now();

console.log("HIGHEST PRESSURE: " + result);
console.log(pEnd - pStart);
