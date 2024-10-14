import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable one-var, no-eval, no-nested-ternary */

const [wf, rt] = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n\n");

const pStart = performance.now();

const wfs = wf.split("\n").reduce((acc, w) => {
    const [n, rst] = w.split("{");
    acc[n] = rst.slice(0, -1).split(",").map(ins => {
        const [con, nx] = ins.includes(":") ? ins.split(":") : [null, ins];
        return { k: con ? 0 : 1, nx, con };
    });
    return acc;
}, {});

let s = 0;
rt.split("\n").forEach(rr => {
    const r = rr.slice(1, -1).split(",").reduce((acc, r1) => {
        const [k, v] = r1.split("=");
        acc[k] = Number(v);
        return acc;
    }, {});

    // @ts-ignore
    let w = wfs.in, acc = false;
    while (true){
        let int = false;
        for (const ins of w){
            let mov = ins.k === 1;
            if (ins.k === 0){
                let { con } = ins;
                (Object.entries(r).map(([k, v]) => (con = con.replace(k, v.toString()))) || 1) && (mov = eval(con));
            }
            if (mov){
                (ins.nx === "A") ? (acc = true) && (int = true) : (ins.nx === "R") ? int = true : w = wfs[ins.nx];
                break;
            }
        }
        if (int) break;
    }
    if (acc) s += Object.values(r).reduce((a, b) => a + b, 0);
});

const pEnd = performance.now();

console.log("SUM OF RATING NUMBERS: " + s);
console.log(pEnd - pStart);
