import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("");

const pStart = performance.now();

const result = INPUT.findIndex((_, i, l) => l.slice(i, i + 4).filter((x, y, z) => z.indexOf(x) === y).length === 4) + 4;

const pEnd = performance.now();

console.log("CHARS UNTIL FIRST START-OF-PACKET: " + result);
console.log(pEnd - pStart);
