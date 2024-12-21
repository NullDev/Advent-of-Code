import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-sequences, no-nested-ternary, no-param-reassign, one-var */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const getPos = (arr, code) => arr.map((row, i) => [i, row.indexOf(code)]).find(([, j]) => j !== -1),
    sCache = new Map(),
    N = 3;

const best = (
    start,
    end,
    layers,
    arrPads = [[null, "^", "A"], ["<", "v", ">"]],
    sdc = (dir, dist) => (
        best("A", dir, layers - 1) + (dist - 1) * best(dir, dir, layers - 1) + best(dir, "A", layers - 1)
    ),
    tdc = (d1, d2, dist1, dist2) => (
        best("A", d1, layers - 1) + (dist1 - 1) * best(d1, d1, layers - 1) + best(d1, d2, layers - 1)
            + (dist2 - 1) * best(d2, d2, layers - 1) + best(d2, "A", layers - 1)
    ),
) => {
    if (typeof start === "string") start = getPos(arrPads, start);
    if (typeof end === "string") end = getPos(arrPads, end);

    const key = JSON.stringify([start, end, layers]);
    if (sCache.has(key)) return sCache.get(key);
    if (layers === 0) return sCache.set(key, 1), 1;

    const [sr, sc] = start, [er, ec] = end;

    const vert = er < sr ? "^" : er > sr ? "v" : null,
        hori = ec < sc ? "<" : ec > sc ? ">" : null;

    let res;
    if (!vert && !hori) res = best("A", "A", layers - 1);
    else if (!hori) res = sdc(vert, Math.abs(er - sr));
    else if (!vert) res = sdc(hori, Math.abs(ec - sc));
    else {
        const distV = Math.abs(er - sr);
        const distH = Math.abs(ec - sc);
        if (layers < N){
            if (sc === 0) res = tdc(hori, vert, distH, distV);
            else if (ec === 0) res = tdc(vert, hori, distV, distH);
            else res = Math.min(tdc(hori, vert, distH, distV), tdc(vert, hori, distV, distH));
        }
        else {
            if (sc === 0 && er === 3) res = tdc(hori, vert, distH, distV);
            else if (ec === 0 && sr === 3) res = tdc(vert, hori, distV, distH);
            else res = Math.min(tdc(hori, vert, distH, distV), tdc(vert, hori, distV, distH));
        }
    }
    sCache.set(key, res);
    return res;
};

const res = INPUT.reduce(
    (
        acc, inputval, _, __,
        posi = [
            ["7", "8", "9"],
            ["4", "5", "6"],
            ["1", "2", "3"],
            [null, "0", "A"],
        ],
    ) => (!inputval ? acc
        : (
            acc + Number(inputval.slice(0, 3)) * "A".concat(inputval.slice(0, 3)).split("")
                .reduce((total, ___, i, startSeq) => (
                    total + best(getPos(posi, startSeq[i]), getPos(posi, inputval[i]), N)
                ), 0)
        )), 0,
);

const pEnd = performance.now();

console.log("SUM OF COMPLEXITIES (2): " + res);
console.log(pEnd - pStart);
