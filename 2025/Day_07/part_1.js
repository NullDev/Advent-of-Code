// @ts-nocheck
import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable prefer-const, no-param-reassign, one-var */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const res = ((
    [rs, cs] = INPUT
        .map((row, i) => [i, row.indexOf("S")]).find(([, j]) => j !== -1),
    q = [[rs, cs]],
    vis = new Set(), cnt = 0,
) => { // BFS Step to traverse Manifold
    for (let i = 0; i < q.length; i++){
        let [r, c] = q[i], k = r + "," + c;
        (!vis.has(k)) && (((vis.add(k) && r++) || 1) && (r < INPUT.length) && ((INPUT[r][c] === "^")
            ? ((cnt++) || 1) && (c > 0)
                && q.push([r, c - 1])
                && (c + 1 < INPUT[0].length)
                && q.push([r, c + 1])
            : q.push([r, c])));
    }
    return cnt;
})();

const pEnd = performance.now();

console.log("BEAM SPLITS: " + res);
console.log(pEnd - pStart);
