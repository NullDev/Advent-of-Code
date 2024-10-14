import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n").filter(e => !!e);

const pStart = performance.now();

const mem = {};
let mask;

CONTENT_READ.forEach(line => {
    const match1 = /^mask.=.(\w+)$/.exec(line);
    if (match1) mask = match1[1];
    else { // @ts-ignore
        const [ , m1, m2 ] = /^mem\[(\d+)\].=.(\d+)$/.exec(line);
        let addr = [0n];
        [...mask].forEach((element, index) => {
            addr = addr.map(e => e << 1n);
            if (element === "X") addr = [...addr, ...(addr.map(e => e | 1n))];
            else if (element === "1" || Number(m1).toString(2).padStart(36, "0")[index] === "1") addr = addr.map(e => e | 1n);
        });
        addr.forEach(e => (mem[e] = BigInt(m2)));
    }
});
const sum = Object.values(mem).reduce((p, c) => p + c, 0n);

const pEnd = performance.now();

console.log("SUM OF MEMORY VALUES: " + sum);
console.log(pEnd - pStart);
