import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-sequences, one-var */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n\n");

const pStart = performance.now();

const res = ((
    [arr,,, sec], dmap = new Map([["v", [1, 0]], [">", [0, 1]], ["^", [-1, 0]], ["<", [0, -1]]]),
) => {
    let r, c; // @ts-ignore
    arr.forEach((row, i) => row.forEach((val, j) => ((val === "@") && (r = i) && (c = j) && (arr[i][j] = ".")))); // @ts-ignore
    [...sec].forEach((ch) => { // @ts-ignore
        const [dr, dc] = dmap.get(ch);
        const nr = r + dr, nc = c + dc;
        arr[nr][nc] !== "#" && (arr[nr][nc] === "."
            ? (r = nr, c = nc)
            : (() => {
                let cr = nr, cc = nc;
                while (arr[cr][cc] === "O") cr += dr, cc += dc;
                if (arr[cr][cc] === "."){
                    while (cr !== nr || cc !== nc) arr[cr][cc] = "O", cr -= dr, cc -= dc;
                    (arr[cr][cc] = ".") && (r = nr, c = nc);
                }
            })()
        );
    }); // @ts-ignore
    return arr.reduce((sum, row, r1) => sum + row.reduce((s, v, c1) => s + (v === "O" ? r1 * 100 + c1 : 0), 0), 0);
})(((
    [fir, sec], arr = fir.split("\n").map(r => r.split("")),
) => [arr, arr.length, arr[0].length * 2, sec.split("\n").join("")])(INPUT));

const pEnd = performance.now();

console.log("SUM OF COORDINATES: " + res);
console.log(pEnd - pStart);
