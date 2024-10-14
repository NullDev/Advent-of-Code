// @ts-nocheck
import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const r = [...String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim()].map(Number);

const pStart = performance.now();

// This lil move is going to cost us ~5500ms

for (let i = Math.max(...r) + 1; i <= 1000000; i++) r.push(i);
r.forEach((v, i) => (r[i] = { v }));
r.forEach((_, i) => (r[i].n = i < r.length - 1 ? r[i + 1] : r[0]));

const vMap = new Map(r.map(e => [e.v, e]));

let init = r[0];

for (let i = 0; i < 10000000; i++){
    const c1 = init.n;
    const c2 = [c1.v, c1.n.v, c1.n.n.v];
    init.n = c1.n.n.n;
    let cur = init.v - 1;
    while (cur !== -1){
        while (c2.includes(cur)) cur--;
        cur === 0 && (cur += r.length);
        while (c2.includes(cur)) cur--;
        const pos = vMap.get(cur);
        if (pos){
            c1.n.n.n = pos.n;
            pos.n = c1;
            break;
        }
        cur--;
    }
    init = init.n;
}

const RES = vMap.get(1).n.v * vMap.get(1).n.n.v;

const pEnd = performance.now();

console.log("LABELS: " + RES);
console.log(pEnd - pStart);
