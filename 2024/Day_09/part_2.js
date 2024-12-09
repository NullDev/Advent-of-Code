import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-param-reassign, one-var */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("");

const pStart = performance.now();

const raw = INPUT.flatMap((bc, i) => Array.from({ length: Number(bc) }, () => (i % 2 ? "." : i / 2)));

const swapBlk = (size) => (l, r) => Array.from({ length: size }, (_, i) => i) // @ts-ignore
        .forEach(i => ([raw[l + i], raw[r - i]] = [raw[r - i], raw[l + i]])),
    runs = (idx, rev = false, blk = raw[idx], cnt = 0) => {
        for (let i = idx; raw[i] === blk; i += rev ? -1 : 1) cnt += 1;
        return cnt;
    };

// @ts-ignore
const hi = raw.findLast((blk) => blk !== ".");
for (let nxId = hi; nxId >= 0; nxId -= 1){
    const end = raw.lastIndexOf(nxId), len = runs(end, true), gaps = [];
    for (let i = 0; i < end; i += 1){
        if (raw[i] === "."){
            const gLen = runs(i);
            gaps.push({ start: i, length: gLen }) && (i += gLen - 1);
        }
    }

    const pass = gaps.find((gap) => gap.length >= len);
    pass && swapBlk(len)(pass.start, end);
}

// @ts-ignore
const res = raw.reduce((total, nxId, i) => (total + (nxId === "." ? 0 : nxId * i)), 0);

const pEnd = performance.now();

console.log("NEW FS CHECKSUM: " + res);
console.log(pEnd - pStart);
