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

let res = -1;
for (
    let i = 0, score = Infinity,
        lcm = (
            a, b,
            gcd = (x, y) => !y ? x : gcd(y, x % y),
        ) => a / gcd(a, b) * b;
    i < lcm(...[101, 103]); i++
){
    const t = ((
        pMap = INPUT.map(r => r[0].map((pc, i1) => (
            ((pc + r[1][i1] * i) % [101, 103][i1]) + [101, 103][i1]) % [101, 103][i1])),
        qs = [101, 103].map(c => Math.floor(c / 2)),
        ac = (
            pos, origin, size, max = origin.map((c, i2) => c + size[i2]),
        ) => pos.reduce((s, p) => s + (p.every((c, i3) => c >= origin[i3] && c < max[i3]) ? 1 : 0), 0),
    ) => (ac(pMap, [0, 0], qs) *
        ac(pMap, [qs[0] + 1, 0], qs) *
        ac(pMap, [0, qs[1] + 1], qs) *
        ac(pMap, qs.map(c => c + 1), qs)
    ))();
    (t < score) && (score = t) && (res = i);
}

const pEnd = performance.now();

console.log("SECONDS TO ELAPSE: " + res);
console.log(pEnd - pStart);
