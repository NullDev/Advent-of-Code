import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n")
    .map(l => l.split(" ").map(p => p.substring(2).split(",").map(Number)));

const pStart = performance.now();

const res = ((
    pMap = INPUT.map(r => r[0].map((pc, i) => ((
        (pc + r[1][i] * 100) % [101, 103][i]) + [101, 103][i]) % [101, 103][i])),
    qs = [101, 103].map(c => Math.floor(c / 2)),
    ac = (
        pos, origin, size, max = origin.map((c, i) => c + size[i]),
    ) => pos.reduce((s, p) => s + (p.every((c, i) => c >= origin[i] && c < max[i]) ? 1 : 0), 0),
) => (ac(pMap, [0, 0], qs) *
    ac(pMap, [qs[0] + 1, 0], qs) *
    ac(pMap, [0, qs[1] + 1], qs) *
    ac(pMap, qs.map(c => c + 1), qs)
))();

const pEnd = performance.now();

console.log("SAFETY FACTOR AFTER 100S: " + res);
console.log(pEnd - pStart);
