import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const { n } = INPUT.reduce((acc, l) => [...l.matchAll(/(mul\((\d{1,3}),(\d{1,3})\)|(do\(\))|(don't\(\)))/g)] // eslint-disable-next-line no-cond-assign
    .reduce((state, m) => ((((m[1] === "don't()") && (state.on = 0)) || 1) && (m[1] === "do()") // eslint-disable-next-line no-sequences
        ? (state.on = 1) : ((state.on) && (state.n += Number(m[2]) * Number(m[3]))), state), acc), { n: 0, on: 1 });

const pEnd = performance.now();

console.log("ENABLED MULS: " + n);
console.log(pEnd - pStart);
