import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n").map(e => e.split("-"));

const pStart = performance.now();

const HEAP = {};
for (const [a, b] of INPUT){
    if (!(a in HEAP)) HEAP[a] = new Set();
    if (!(b in HEAP)) HEAP[b] = new Set();
    (HEAP[a].add(b)) && (HEAP[b].add(a));
}

const traverse = function(s = "start", traversed = new Set()){
    if (s === "end") return 1;

    let seen = traversed;
    if (s === s.toLowerCase()) seen = (traversed.has(s)) ? (new Set([...traversed, "2"])) : (new Set([...traversed, s]));

    let c = 0;
    HEAP[s].forEach(e => (!(e === "start" || (seen.has(e) && seen.has("2")))) && (c += traverse(e, seen)));
    return c;
};

const RES = traverse();

const pEnd = performance.now();

console.log("PATH COUNT (2X SMALL CAVE): " + RES);
console.log(pEnd - pStart);
