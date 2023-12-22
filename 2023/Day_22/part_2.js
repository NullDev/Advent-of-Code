"use strict";

/* eslint-disable no-sequences, one-var, no-param-reassign */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

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
    return (br.f = fbb + br.b.z - br.a.z) && (br.s = [...s]), e;
}).reduce((acc, _, id, __, fb = new Set([id])) => (
    m.forEach((tbe, tb) => ((!(tbe.s.length === 0 || tbe.s.some((sup) => !fb.has(sup)))) && fb.add(tb))), (acc + (fb.size - 1))
), 0);

const pEnd = performance.now();

console.log("OTHER BRICKS: " + res);
console.log(pEnd - pStart);
