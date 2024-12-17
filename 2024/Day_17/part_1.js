import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-nested-ternary, curly, one-var */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n\n");

const pStart = performance.now();

const regs = INPUT[0].split("\n").reduce((
        acc, line, _, __, m = /^Register ([ABC]): ([0-9]+)$/.exec(line) || [],
    ) => ({ ...acc, [m[1]]: Number(m[2]) }), { A: 0, B: 0, C: 0, t: 0 }),
    buff = [],
    p = INPUT[1].replace("Program: ", "").split(",").map(Number),
    combo = op => ((op === 4) ? regs.A : (op === 5) ? regs.B : (op === 6) ? regs.C : op);

const ops = {
    adv: op => ((regs.A = Math.floor(regs.A / Math.pow(2, combo(op)))) || 1) && (regs.t += 2),
    bxl: op => ((regs.B = Number(BigInt(regs.B) ^ BigInt(op))) || 1) && (regs.t += 2),
    bst: op => ((regs.B = combo(op) % 8) || 1) && (regs.t += 2),
    jnz: op => (regs.t = (regs.A !== 0) ? op : (regs.t + 2)),
    out: op => (buff.push(combo(op) % 8)) && (regs.t += 2),
    bdv: op => ((regs.B = Math.floor(regs.A / Math.pow(2, combo(op)))) || 1) && (regs.t += 2),
    cdv: op => ((regs.C = Math.floor(regs.A / Math.pow(2, combo(op)))) || 1) && (regs.t += 2),
    bxc: () => ((regs.B = Number(BigInt(regs.B) ^ BigInt(regs.C))) || 1) && (regs.t += 2),
};

while (regs.t < p.length)[
    ops.adv, ops.bxl, ops.bst, ops.jnz, ops.bxc, ops.out, ops.bdv, ops.cdv,
][p[regs.t]](p[regs.t + 1]);

const res = buff.join(",");

const pEnd = performance.now();

console.log("SINGLE STRING: " + res);
console.log(pEnd - pStart);
