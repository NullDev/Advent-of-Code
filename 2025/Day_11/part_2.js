// @ts-nocheck
import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-sequences, no-return-assign, no-loop-func, no-param-reassign */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim().split("\n").map(l => l.split(/[\:\s]/).filter(n => !!n));

const pStart = performance.now();

// Modified DFS
const res = (fromTo => {
    const fp = (
        from, to, result = 0, heap = [from], visits = { [from]: 1 },
        top = null, vc = 0,
    ) => {
        while (heap.length){
            (top = heap.pop()) && (vc = visits[top]);
            delete visits[top];
            if (top === to) result += vc;
            (fromTo[top] || []).forEach(t => (
                (visits[t])
                    ? visits[t] += vc
                    : ((visits[t] = vc) || 1) && heap.unshift(t)
            ));
        }
        return result;
    };
    return (fp("svr", "dac") * fp("dac", "fft") * fp("fft", "out"))
         + (fp("svr", "fft") * fp("fft", "dac") * fp("dac", "out"));
})(INPUT.reduce((m, [from, ...tos]) => (m[from] = tos, m), {}));

const pEnd = performance.now();

console.log("PATHS THAT VISIT DAC AND FFT: " + res);
console.log(pEnd - pStart);
