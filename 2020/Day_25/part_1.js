import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const [ cardKey, doorKey ] = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trimEnd().split("\n").map(Number);

const pStart = performance.now();

const RES = [1, 1];
while (RES[1] !== doorKey) (RES[1] = (RES[1] * 7) % 20201227) && (RES[0] = (RES[0] * cardKey) % 20201227);

const pEnd = performance.now();

console.log("ENCRYPTION KEY: " + RES[0]);
console.log(pEnd - pStart);
