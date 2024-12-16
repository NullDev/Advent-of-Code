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
    dist = new Map(),
    key = (x, y, d) => x + "|" + y + "|" + d,
    heap = [],
    minCost = Infinity,
) => {
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++)
        (grid[y][x] === "S") && (start = [x, y]) || (grid[y][x] === "E") && (end = [x, y]);
    dist.set(key(start[0], start[1], 1), 0) && heap.push([0, start[0], start[1], 1]);

    while (heap.length){
        heap.sort((a, b) => a[0] - b[0]);
        const [cost, x, y, d] = heap.shift();
        if (dist.get(key(x, y, d)) !== cost) continue;
        if (x === end[0] && y === end[1]){
            minCost = cost;
            break;
        }

        const nx = x + dirs[d][0], ny = y + dirs[d][1];
        if (nx >= 0 && ny >= 0 && nx < W && ny < H && grid[ny][nx] !== "#"){
            const nc = cost + 1, k = key(nx, ny, d);
            if (!dist.has(k) || dist.get(k) > nc) dist.set(k, nc) && heap.push([nc, nx, ny, d]);
        }

        for (const nd of [(d + 3) % 4, (d + 1) % 4]){
            const nc = cost + 1000, k = key(x, y, nd);
            if (!dist.has(k) || dist.get(k) > nc) dist.set(k, nc) && heap.push([nc, x, y, nd]);
        }
    }

    if (minCost === Infinity) return 0;

    const bestStates = new Set(), queue = [];
    for (let d = 0, k = key(end[0], end[1], d); d < 4; d++)
        (dist.has(k) && dist.get(k) === minCost) && bestStates.add(k) && queue.push([end[0], end[1], d]);

    while (queue.length){
        const [x, y, d] = queue.shift(), c = dist.get(key(x, y, d)),
            px = x - dirs[d][0], py = y - dirs[d][1];

        if (px >= 0 && py >= 0 && px < W && py < H && grid[py][px] !== "#"){
            const pk = key(px, py, d);
            if (dist.has(pk) && dist.get(pk) === c - 1 && !bestStates.has(pk)) bestStates.add(pk) && queue.push([px, py, d]);
        }

        for (const nd of [(d + 1) % 4, (d + 3) % 4]){
            const pk = key(x, y, nd);
            if (dist.has(pk) && dist.get(pk) === c - 1000 && !bestStates.has(pk)) bestStates.add(pk) && queue.push([x, y, nd]);
        }
    }

    const tiles = new Set();
    let count = 0;
    for (const s of bestStates){
        const [X, Y] = s.split("|").map(Number);
        tiles.add(Y + "|" + X);
    }

    for (const t of tiles){
        const [Y, X] = t.split("|").map(Number);
        if (grid[Y][X] !== "#"){ grid[Y][X] = "O"; count++; }
    }

    return count;
})(INPUT);

const pEnd = performance.now();

console.log("BEST PATHS TILE COUNT: " + res);
console.log(pEnd - pStart);
