import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable one-var, consistent-return */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const map = INPUT.map(i => i.split(""));
let start, end;
out: for (let y = 0; y < INPUT.length; y++){
    for (let x = 0; x < INPUT[0].length; x++){
        if (map[y][x] === "S") (start = { x, y }) && (map[y][x] = ".");
        else if (map[y][x] === "E") (end = { x, y }) && (map[y][x] = ".");
        if (start && end) break out;
    }
}

const res = ((
    p, cLen,
    d = (p1, p2) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y), // @ts-ignore
) => p.flatMap((pp1, p1) => p.slice(p1 + 1).map((pp2, i) => ({
    p1, p2: p1 + i + 1, pp1, pp2,
    dist: d(pp1, pp2),
    cDist: (p1 + i + 1) - p1 - d(pp1, pp2) }),
).filter(({ dist, cDist }) => dist >= 2 && dist <= cLen && cDist > 0) // @ts-ignore
    .map(({ p1_, p2, pp1_, pp2, cDist }) => ({ p1_, p2, pp1_, pp2, saved: cDist }))))(
    ((
        s, e,
        open = [{ ...s, pt: [s] }],
        closed = [],
        eq = (p1, p2) => p1.x === p2.x && p1.y === p2.y,
    ) => {
        while (open.length){
            const curr = open.shift();
            closed.push(curr);
            if (eq(curr, e)) return curr;
            const nx = [
                { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 },
            ].map(n => ({ x: (curr?.x || 0) + n.x, y: (curr?.y || 0) + n.y }))
                .filter(n => map[n.y]?.[n.x] === ".")
                .filter(n => !closed.some((c) => eq(c, n)));
            for (const n of nx) open.unshift({ ...n, pt: [...curr?.pt || [], n] });
        }
    })(start, end)?.pt, 2).filter((x) => x.saved >= 100,
).length;

const pEnd = performance.now();

console.log("CHEATS THAT SAVE AT LEAST 100pS (2): " + res);
console.log(pEnd - pStart);
