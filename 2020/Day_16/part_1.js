import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n\n");

const pStart = performance.now();

let RES = 0;

CONTENT_READ[2].split("\n")
    .slice(1)
    .map(e => e.split(",").map(Number))
    .forEach(t =>
        (t.forEach(val =>
            (!CONTENT_READ[0].split("\n")
                .map(e => [e.split(":")[0], e.split(":")[1].match(/(\d+)/g)?.map(Number)]) // @ts-ignore
                .some(rule => (val >= rule[1][0] && val <= rule[1][1]) || (val >= rule[1][2] && val <= rule[1][3])) && (RES += val)),
        )),
    );

const pEnd = performance.now();

console.log("ERROR RATE: " + RES);
console.log(pEnd - pStart);
