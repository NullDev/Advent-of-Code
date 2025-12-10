import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-param-reassign */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim();

const pStart = performance.now();

const res = INPUT.split(/\r?\n/).filter(Boolean).map((
    line, _, __, pattern = line.match(/\[([.#]+)\]/)?.[1] || [],
) => ({
    target: [...pattern].reduce((mask, ch, i) => ch === "#" ? mask | (1 << i) : mask, 0),
    buttons: [...line.matchAll(/\(([0-9,]+)\)/g)].map(
        m => m[1].split(",").map(Number).reduce((mask, idx) => mask | (1 << idx), 0),
    ),
    n: pattern.length,
})).map((
    { target, buttons, n }, _, __,
    size = 1 << n,
    dist = new Int16Array(size).fill(-1),
    queue = new Uint32Array(size),
    head = 0, tail = 0,
) => {
    (dist[0] = 0) || (queue[tail++] = 0);
    while (head < tail){
        const cur = queue[head++];
        for (const b of buttons){
            const next = cur ^ b;
            if (dist[next] !== -1) continue;
            if (next === target) return (dist[cur] + 1);
            (dist[next] = (dist[cur] + 1)) && (queue[tail++] = next);
        }
    }

    return -1;
}).reduce((sum, x) => (Number(sum) + Number(x)), 0);

const pEnd = performance.now();

console.log("FEWEST BUTTON PRESSES (LIGHTS): " + res);
console.log(pEnd - pStart);
