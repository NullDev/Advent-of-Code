import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-param-reassign, no-nested-ternary, one-var, consistent-return */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n\n");

const pStart = performance.now();

// honestly too lazy to come up with a short functional approach...

const res = (([fir, sec]) => {
    const dmap = new Map([["v", [1, 0]], [">", [0, 1]], ["^", [-1, 0]], ["<", [0, -1]]]);
    const arr = fir.split("\n");
    sec = sec.split("\n").join("");

    const narr = arr.map(row => row.split("").reduce((acc, ch) =>
        acc + (ch === "O" ? "[]" : ch === "@" ? "@." : ch + ch), ""),
    ).map(r=>r.split(""));

    let r, c;
    narr.forEach((row, i) => row.forEach((v, j) => ((v === "@") && (r = i) && (c = j) && (narr[i][j] = "."))));

    const dfs = (rr, cc, dr, boxes) => {
        if(narr[rr][cc] === "#") return false;
        if(narr[rr][cc] === ".") return true;
        const nr = rr + dr, nc = cc;
        if (boxes.has(nr + "," + nc)) return true;
        boxes.add(nr + "," + nc);
        if (!dfs(nr, nc, dr, boxes)) return false;
        return narr[rr][cc] === "[" ? dfs(rr, cc + 1, dr, boxes) : dfs(rr, cc - 1, dr, boxes);
    };

    [...sec].forEach(ch => { // @ts-ignore
        const [dr, dc] = dmap.get(ch);
        const nr = r + dr, nc = c + dc;
        if (narr[nr][nc] === "#") return;
        if (narr[nr][nc] === ".") return (r = nr) && (c = nc);
        if (ch === "<" || ch === ">"){
            const cr = nr;
            let cc = nc;
            while (narr[cr][cc] === "[" || narr[cr][cc] === "]") cc += dc;
            if (narr[cr][cc] !== ".") return;
            while (cr !== nr || cc !== nc) (narr[cr][cc] = narr[cr - dr][cc - dc]) && (cc -= dc);
            (narr[cr][cc] = ".") && (c = nc);
        }
        else {
            const boxes = new Set();
            if (!dfs(nr, nc, dr, boxes)) return;
            const barr = [...boxes].map(a=>a.split(",").map(Number))
                .sort((a, b)=>ch === "^" ? a[0] - b[0] : b[0] - a[0]); // @ts-ignore
            (barr.forEach((
                [rb, cb], _, __, pr = rb - dr, pc = cb,
            ) => ((narr[rb][cb] = narr[pr][pc]) && (narr[pr][pc] = "."))) || 1) && (r = nr);
        }
    });

    return narr.reduce((sum, row, r1) =>
        sum + row.reduce((s, v, c1) => s + (v === "[" ? r1 * 100 + c1 : 0), 0), 0,
    );
})(INPUT);

const pEnd = performance.now();

console.log("FINAL SUM OF COORDINATES: " + res);
console.log(pEnd - pStart);
