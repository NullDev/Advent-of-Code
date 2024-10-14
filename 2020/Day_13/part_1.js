import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n");

const pStart = performance.now();

const RES = CONTENT_READ[1]
    .split(",")
    .filter(e => e !== "x")
    .map(Number)
    .map(id => [id, id - (Number(CONTENT_READ[0]) % id)])
    .sort((a, b) => a[1] - b[1])[0]
    .reduce((p, c) => p * c);

const pEnd = performance.now();

console.log("PRODUCT OF ID AND MINUTES: " + RES);
console.log(pEnd - pStart);
