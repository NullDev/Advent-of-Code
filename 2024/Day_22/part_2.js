import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable curly, no-sequences, one-var */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(Number);

const pStart = performance.now();

const res = Math.max(...Object.values((
    (m, gM = {}) => m.reduce((g, b) => Object.entries(b).reduce((acc, [k, v]) => ((acc[k] = (
        !Object.prototype.hasOwnProperty.call(acc, k)
    ) ? v : acc[k] + v), acc), g), gM)
)(INPUT.map((
    init, _, __,
    p = v => (v % (1 << 24)), // % 2^24 = 16777216 -> [0..16777215]
    s = new Array(2000 + 1),
    ch = new Array(2000),
) => {
    s[0] = init;
    for (let i = 0; i < 2000; i++) s[i + 1] = (s[i] = p(s[i] ^ p(s[i] * 64))) // mul / floor-div by n (64, 32, 2048), XOR, prune
            && (s[i] = p(s[i] ^ p(Math.floor(s[i] / 32)))) && (s[i] = p(s[i] ^ p(s[i] * 2048)));
    const pr = s.map(val => val % 10);
    for (let i = 0; i < 2000; i++) ch[i] = pr[i + 1] - pr[i];
    return { pr, ch };
}).map(({ pr, ch }) =>
    (( p, c, map = {}, len = c.length) => {
        for (let i = 0; i <= len - 4; i++){
            const c1 = c[i], c2 = c[i + 1], c3 = c[i + 2], c4 = c[i + 3];
            if (!map[`${c1},${c2},${c3},${c4}`]) map[`${c1},${c2},${c3},${c4}`] = p[i + 4];
        }
        return map;
    })(pr, ch),
))));

const pEnd = performance.now();

console.log("MOST BANANAS: " + res);
console.log(pEnd - pStart);
