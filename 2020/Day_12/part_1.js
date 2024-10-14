import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-nested-ternary */

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n");

const pStart = performance.now();

const directions = CONTENT_READ.reduce((move, line) => {
    const action = line.trim()[0];
    const value = Number(line.trim().slice(1));
    const { direction } = move;

    move.x += action === "E" ? value : action === "W" ? -value : 0;
    move.y += action === "N" ? value : action === "S" ? -value : 0;

    move.direction = (direction + (action === "L" ? value : action === "R" ? -value : 0) + 360) % 360;

    (action === "F") && (move.x += direction ===  0 ? value : direction === 180 ? -value : 0) &&
                        (move.y += direction === 90 ? value : direction === 270 ? -value : 0);

    return move;
}, { direction: 0, x: 0, y: 0 });


const res = Math.abs(directions.x) + Math.abs(directions.y);

const pEnd = performance.now();

console.log("MANHATTAN DISTANCE: " + res);
console.log(pEnd - pStart);
