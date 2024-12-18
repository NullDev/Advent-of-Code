import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-nested-ternary, no-sequences */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const res = ((
    grid = Array.from({ length: 71 }, () => Array(71).fill(false)),
    pos = INPUT.map(line => line.split(",").map(s => parseInt(s, 10))),
    dir = [[0, 1], [0, -1], [1, 0], [-1, 0]],
) => {
    const valid = () =>
        grid[0][0] ? false : ((
            seen = Array.from({ length: 71 }, () => Array(71).fill(false)),
        ) => {
            seen[0][0] = true;
            const bfs = front =>
                front.some(({ x, y })=>x === 71 - 1 && y === 71 - 1) ? true : front.length === 0
                    ? false : bfs(
                        front.flatMap(({ x, y }) => dir.map(([dx, dy]) => ({ nx: x + dx, ny: y + dy }))
                            .filter(({ nx, ny }) => (
                                nx >= 0 && nx < 71 && ny >= 0 && ny < 71 &&
                                        !grid[ny][nx] && !seen[ny][nx] && (seen[ny][nx] = true)
                            )).map(({ nx, ny }) => ({ x: nx, y: ny })),
                        ),
                    );
            return bfs([{ x: 0, y: 0 }]);
        })();
    return pos.find(([x, y]) => ((grid[y][x] = true), !valid()))?.join(",");
})();

const pEnd = performance.now();

console.log("MINIMUM NUMBER OF STEPS: " + res);
console.log(pEnd - pStart);
