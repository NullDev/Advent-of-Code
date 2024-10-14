import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt")));

const pStart = performance.now();

const UNIQUE = CONTENT_READ.replace(/\n\r/g, "\n")
    .replace(/\r/g, "\n")
    .split(/\n{2,}/g)
    .map(l => l.trim())
    .reduce((count, group) => {
        const p = group.split(/\s+/).map((x) => [...x]);
        return count + p[0].filter((a) => p.every((as) => as.includes(a))).length;
    }, 0);

const pEnd = performance.now();

console.log("TOTAL COUNT: " + UNIQUE);
console.log(pEnd - pStart);
