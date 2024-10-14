import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n")[0].split(",").map(Number);

const pStart = performance.now();

const mem = new Uint32Array(2020);
let curr = 0;

for (let i = 0; i < 2020; i++){
    if (i < CONTENT_READ.length) mem[curr = CONTENT_READ[i]] = i + 1;
    else {
        const prev = mem[curr] || -1;
        mem[curr] = i;
        curr = prev === -1 ? 0 : i - prev;
    }
}

const pEnd = performance.now();

console.log("2020TH NUMBER SPOKEN: " + curr);
console.log(pEnd - pStart);
