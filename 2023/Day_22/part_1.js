import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-sequences, one-var, no-param-reassign */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const max = { x: -Infinity, y: -Infinity }, m = INPUT.map((
        e, _, __, [, x1, y1, z1, x2, y2, z2] = (e.match(/(\d+),(\d+),(\d+)~(\d+),(\d+),(\d+)/) || []).map(Number),
    ) => ((max.x = Math.max(max.x, x2)) && ( max.y = Math.max(max.y, y2)), {
        a: { x: x1, y: y1, z: z1 }, b: { x: x2, y: y2, z: z2 }, f: 0, s: [], im: false,
    })).sort((a, b) => a.a.z - b.a.z), size = { x: max.x + 1, y: max.y + 1 }, tv = new Array(size.x * size.y).fill(null);

const res = m.map((e, bid, _, br = m[bid], { a, b } = br, fbb = 1, s = new Set()) => {
    for (let { x } = a; x <= b.x; x++){
        for (let { y } = a; y <= b.y; y++){
            const fbi = tv[x + y * size.x]; // @ts-ignore
            (((fbi !== null) && (((m[fbi].f + 1 > fbb) && (fbb = m[fbi].f + 1) && s.clear()) || 1)
                && (m[fbi].f + 1 === fbb) && s.add(fbi)) || 1) && (tv[x + y * size.x] = bid);
        }
    } // @ts-ignore
    return (((br.f = fbb + br.b.z - br.a.z) && (br.s = [...s])) || 1) && (br.s.length === 1) && (m[br.s[0]].im = true), e;
}).filter(b => !b.im).length;

const pEnd = performance.now();

console.log("SAFE BRICKS: " + res);
console.log(pEnd - pStart);
