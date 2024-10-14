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

const mem = new Map();
let mask;

CONTENT_READ.forEach(line => {
    if (line.startsWith("mask")) [ , mask ] = line.split(" = ");
    else { // @ts-ignore
        const [ , address, value ] = line.match(/mem\[(\d+)\] = (\d+)/);
        mem.set(address, parseInt(Number(value)
            .toString(2)
            .padStart(36, "0")
            .split("")
            .map((bit, i) => (mask[i] === "X" ? bit : mask[i]))
            .join(""), 2,
        ));
    }
});

const res = Array.from(mem.values()).reduce((p, c) => p + c);

const pEnd = performance.now();

console.log("SUM OF MEMORY VALUES: " + res);
console.log(pEnd - pStart);
