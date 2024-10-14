import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable one-var */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(v => v.split(""));

const pStart = performance.now();

const seen = new Set(), rep = new Set(), b = [[0, 0, 1]];
while (b.length){ // @ts-ignore
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

const pEnd = performance.now();

console.log("NUMBER OF TILES: " + seen.size);
console.log(pEnd - pStart);
