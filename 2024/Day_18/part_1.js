import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-nested-ternary, no-shadow */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const res = ((
    grid = Array.from({ length: 71 }, () => Array(71).fill(false)),
    pos = INPUT.map(line => line.split(",").map(Number)),
    dir = [[0, 1], [0, -1], [1, 0], [-1, 0]],
    seen = Array.from({ length: 71 }, () => Array(71).fill(false)),
) => { // @ts-ignore
    pos.forEach(([x, y], i) => i < 1024 && (grid[y][x] = true)) && (seen[0][0] = true);
    const bfs = front =>
        front.some(({x, y}) => x === 71 - 1 && y === 71 - 1)
            ? front.find(({x, y}) => x === 71 - 1 && y === 71 - 1).dist
            : front.length === 0 ? 0 : bfs(
                front.flatMap(({x, y, dist}) =>
                    dir.map(([dx, dy]) => ({ nx: x + dx, ny: y + dy, dist: dist + 1}))
                        .filter(({ nx, ny }) => (
                            nx >= 0 && nx < 71 && ny >= 0 && ny < 71
                                && !grid[ny][nx] && !seen[ny][nx] && (seen[ny][nx] = true)
                        )).map(({ nx, ny, dist }) => ({ x: nx, y: ny, dist })),
                ),
            );
    return bfs([{ x: 0, y: 0, dist: 0 }]);
})();

const pEnd = performance.now();

console.log("COORDINATES OF FIRST BLOCKED EXIT: " + res);
console.log(pEnd - pStart);
