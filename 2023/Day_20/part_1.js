import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable one-var, no-nested-ternary, no-sequences */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const ms = INPUT.map((l, _, __, split = l.split(" -> "), m = {}) => ((m.o = split[1].split(",").map(o => o.trim()) || 1)
    && ((m.s = false) || 1) && ((m.n = split[0]) || 1)
    && ((l.charAt(0) === "%")
        ? (m.t = "FLIP") && (m.n = split[0].substring(1))
        : (l.charAt(0) === "&")
            ? (m.t = "CONJ") && (m.i = []) && (m.n = split[0].substring(1))
            : (m.t = "")), m));

ms.filter(m => m.t !== "CONJ")
    .forEach(m => m.o.filter(oN => ms.find(mod => mod.n === oN)?.t === "CONJ")
        .map(oN => ms.find(mod => mod.n === oN)).forEach(mod => (mod.i[m.n] = 0)));

ms.forEach(m => m.o.forEach((_, i) => (m.o[i] = ms.find(mod => mod.n === m.o[i]))));

const q = [], pc = [0, 0];
for (let i = 0; i < 1000; i++){
    q.push([0, ms.find(m => m.n === "broadcaster"), 0]);
    while (q.length){
        const [pr, m, p] = q.shift() || [];
        ((pc[p ? 1 : 0]++) || 1) && !!m && ((m.t === "")
            ? m.o.forEach(o => q.push([m, o, p]))
            : (m.t === "FLIP")
                ? (!p) && ((m.s = !m.s) || 1) && (m.o.forEach(o => q.push([m, o, m.s])))
                : ((m.i[pr?.n] = p) || 1) && (m.o.forEach(o => q.push([m, o, !Object.keys(m.i).every(key => m.i[key])]))));
    }
}

const res = pc[0] * pc[1];

const pEnd = performance.now();

console.log("NUMBER OF LOW PULSES: " + res);
console.log(pEnd - pStart);
