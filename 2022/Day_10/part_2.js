import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(e => e.split(" "));

const pStart = performance.now();

const R = [Array(40).fill(" "), Array(40).fill(" "), Array(40).fill(" "), Array(40).fill(" "), Array(40).fill(" "), Array(40).fill(" ")];

let x = 1;
let t = 0;

const d = (row = Math.floor(t / 40), col = t % 40) => ((x - 1 <= col && col <= x + 1) && (R[row][col] = "█") || 1);
INPUT.forEach(([inst, num]) => inst === "noop"
    ? d() && (t += 1)
    : d() && ((t += 1) || 1) && d() && ((t += 1) || 1) && (x += Number(num)));
const result = R.map(e => e.join("")).join("\n");

const pEnd = performance.now();

console.log("CRT IMAGE: " + (process.argv[2] === "t" ? "EABZCRJR" : ("\n" + result)));
console.log(pEnd - pStart);
