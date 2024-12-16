// @ts-nocheck
import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-param-reassign, curly, one-var */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(r => r.split(""));

const pStart = performance.now();

const res = ((
    grid,
    H = grid.length, W = grid[0].length,
    start, end,
    dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]],
    startDir = 1,
    dist = new Map(),
    key = (x, y, d) => x + "|" + y + "|" + d,
) => {
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++)
        (grid[y][x] === "S") && (start = [x, y]) || (grid[y][x] === "E") && (end = [x, y]);
    const heap = [[0, start[0], start[1], startDir]];
    dist.set(key(start[0], start[1], startDir), 0);
    while (heap.length){
        heap.sort((a, b) => a[0] - b[0]);
        const [cost, x, y, d] = heap.shift();
        if (x === end[0] && y === end[1]) return cost;
        if (dist.get(key(x, y, d)) !== cost) continue;

        const nx = x + dirs[d][0], ny = y + dirs[d][1];
        if (nx >= 0 && ny >= 0 && nx < W && ny < H && grid[ny][nx] !== "#"){
            const nc = cost + 1, k = key(nx, ny, d);
            if (!dist.has(k) || dist.get(k) > nc) dist.set(k, nc) && heap.push([nc, nx, ny, d]);
        }

        const nd = (d + 3) % 4, nc = cost + 1000, k = key(x, y, nd);
        if (!dist.has(k) || dist.get(k) > nc) dist.set(k, nc) && heap.push([nc, x, y, nd]);
        const nd1 = (d + 1) % 4, nc1 = cost + 1000, k1 = key(x, y, nd1);
        if (!dist.has(k1) || dist.get(k1) > nc1) dist.set(k1, nc1) && heap.push([nc1, x, y, nd1]);
    }
    return 0;
})(INPUT);

const pEnd = performance.now();

console.log("LOWEST POSSIBLE SCORE: " + res);
console.log(pEnd - pStart);
