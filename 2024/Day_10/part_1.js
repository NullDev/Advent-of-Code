import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-sequences */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(v => v.trim().split("").map(e => +e));

const pStart = performance.now();

const res = INPUT.flat().map((v, i)=>[v, i % INPUT[0].length, i / INPUT[0].length | 0])
    .filter(([v]) => v === 0).map(v => v.slice(1)).map(v => ((
        map, pos,
        get = (m, [x, y]) => m[y]?.[x],
        set = (m, [x, y], w) => (m[y][x] = w),
        dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]],
        seen = Array(map.length).fill(0).map((_, i) => Array(map[i].length).fill(0)),
    ) => {
        const dfs = (p, depth) => ((get(map, p) !== depth || get(seen, p))
            ? 0 : set(seen, p, -1) && ((depth === 9) && set(seen, p, 1))
                || dirs.map(w => dfs(p.map((e, i) => e + w[i]), depth + 1)));
        return dfs(pos, 0), seen.flat().filter(w => w === 1).length;
    })(INPUT, v)).reduce((a, b) => a + b);

const pEnd = performance.now();

console.log("SUM OF TRAILHEADS: " + res);
console.log(pEnd - pStart);
