import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n").map(e => Number(e));

const pStart = performance.now();

// eslint-disable-next-line consistent-return
const walker = function(){
    for (let i = 25; i < CONTENT_READ.length; i++){
        const prev = CONTENT_READ.slice(i - 25, i);
        if (!prev.some(n => prev.some(other => other !== n && other + n === CONTENT_READ[i]))) return CONTENT_READ[i];
    }
};

const res = walker();

const pEnd = performance.now();

console.log("FIRST NUMBER: " + res);
console.log(pEnd - pStart);
