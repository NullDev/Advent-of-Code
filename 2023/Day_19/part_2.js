"use strict";

/* eslint-disable one-var, no-constant-condition, no-eval, no-nested-ternary */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(l => l.trim());

const pStart = performance.now();

const solve = function(wfs, r, cWf, cWfS){
    if (cWf === "A") return [..."xmas"].map(x => r[x][1] - r[x][0] + 1).reduce((a, b) => a * b, 1);
    else if (cWf === "R") return 0;

    const wf = wfs[cWf];
    if (cWfS >= wf[0].length) return solve(wfs, r, wf[1], 0);

    const [op, o, c, dest] = wf[0][cWfS];
    if ((r[op][0] > c && o === ">") || (r[op][1] < c && o === "<")) return solve(wfs, r, dest, 0);
    else if ((r[op][1] <= c && o === ">") || (r[op][0] >= c && o === "<")) return solve(wfs, r, cWf, cWfS + 1);

    const lo = { ...r }, hi = { ...r };
    if (o === "<"){
        ((lo[op] = [r[op][0], c - 1]) || 1) && (hi[op] = [c, r[op][1]]);
        return solve(wfs, lo, dest, 0) + solve(wfs, hi, cWf, cWfS + 1);
    }
    ((lo[op] = [r[op][0], c]) || 1) && (hi[op] = [c + 1, r[op][1]]);
    return solve(wfs, lo, cWf, cWfS + 1) + solve(wfs, hi, dest, 0);
};

const wfs = {}, pts = [];
let dWf = false;
for (const l of INPUT){
    if (l === ""){
        dWf = true;
        continue;
    }
    if (!dWf){
        const wfN = l.split("{")[0], wfRs = l.slice(wfN.length + 1, -1).split(","), nWf = [[], wfRs.pop()];
        for (const wfR of wfRs){
            if (wfR.includes(":")){
                const [cond, dest] = wfR.split(":"), o = cond.includes(">") ? ">" : "<", [op, cV] = cond.split(o); // @ts-ignore
                nWf[0]?.push([op, o, Number(cV), dest]);
            }
        }
        wfs[wfN] = nWf;
    }
    else {
        const nPts = {};
        (l.slice(1, -1).split(",").map(x => x.split("=")).map(([k, v]) => (nPts[k] = Number(v))) || 1) && pts.push(nPts);
    }
}

const res = solve(wfs, Object.fromEntries([..."xmas"].map(x => [x, [1, 4000]])), "in", 0);

const pEnd = performance.now();

console.log("DISTINC COMBINATIONS: " + res);
console.log(pEnd - pStart);
