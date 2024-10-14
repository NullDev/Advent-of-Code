import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable one-var, no-param-reassign, no-sequences */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(v => v.split(""));

const pStart = performance.now();

const solve = function(br, bc, bd){
    const seen = new Set(), rep = new Set(), b = [[br, bc, bd]];
    while (b.length){
        const [r, c, d, pos = `${r}-${c}`, state = pos + d] = b.shift() || [];
        (!rep.has(state)) && rep.add(state) && seen.add(pos) && {
            ".": [[[-1, 0, 0]], [[0, 1, 1]], [[1, 0, 2]], [[0, -1, 3]]],
            "/": [[[0, 1, 1]], [[-1, 0, 0]], [[0, -1, 3]], [[1, 0, 2]]],
            "\\": [[[0, -1, 3]], [[1, 0, 2]], [[0, 1, 1]], [[-1, 0, 0]]],
            "-": [[[0, -1, 3], [0, 1, 1]], [[0, 1, 1]], [[0, -1, 3], [0, 1, 1]], [[0, -1, 3]]],
            "|": [[[-1, 0, 0]], [[-1, 0, 0], [1, 0, 2]], [[1, 0, 2]], [[-1, 0, 0], [1, 0, 2]]],
        }[INPUT[r][c]][d].forEach(([nr, nc, nd]) => (
            (r + nr >= 0 && r + nr < INPUT.length && c + nc >= 0 && c + nc < INPUT[0].length) && b.push([r + nr, c + nc, nd])),
        );
    }
    return seen.size;
};

const res = INPUT.reduce((t, l, r, g) => l.reduce((b, _, col) => (((r === 0) && (b = Math.max(b, solve(r, col, 2))))
    || ((r === g.length - 1) && (b = Math.max(b, solve(r, col, 0))))
    || ((col === 0) && (b = Math.max(b, solve(r, col, 1))))
    || ((col === l.length - 1) && (b = Math.max(b, solve(r, col, 3)))), b), t), 0);

const pEnd = performance.now();

console.log("NEW NUMBER OF TILES: " + res);
console.log(pEnd - pStart);
