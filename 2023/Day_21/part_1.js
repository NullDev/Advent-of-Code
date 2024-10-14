import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable one-var, no-sequences */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

let pos = {}, res = 0;
const mod = (n, m) => ((n % m) + m) % m, k = (x, y) => x + "_" + y, map = INPUT.map((line, y) => line.split("").map((v, x) => (v === "S")
    ? ((pos[k(x, y)] = [x, y, 1]), ".") : v));

const s = (p, np = {}) => (Object.values(p).forEach(([x, y]) => ([[1, 0], [0, 1], [-1, 0], [0, -1]].forEach(([dx, dy]) => (
    (map[mod(y + dy, map.length)][mod(x + dx, map.length)] === ".") && (np[k(x + dx, y + dy)] = [x + dx, y + dy])))
)), np);

for (let i = 0; i <= 64; i++) ((pos = s(pos)) || 1) && ((i === 63) && (res = Object.keys(pos).length));

const pEnd = performance.now();

console.log("GARDEN PLOTS (64): " + res);
console.log(pEnd - pStart);
