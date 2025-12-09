import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim().split(/\s+/).map(l => l.split(",").map(Number));

const pStart = performance.now();

const res = INPUT.flatMap((pA, iA) =>
    INPUT.slice(iA + 1).map((
        pB, _, __, [x1, y1] = pA, [x2, y2] = pB,
    ) => ((Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1))),
).reduce((maxA, curA) => Math.max(maxA, curA), 0);

const pEnd = performance.now();

console.log("LARGEST AREA OF RECTANGLES: " + res);
console.log(pEnd - pStart);
