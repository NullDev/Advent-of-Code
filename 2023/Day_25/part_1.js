import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable one-var, no-sequences */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const G = new Map(), E = [];
INPUT.map(l => l.split((/:?\s+/))).forEach(([f, ...n]) => n.forEach(t => (E.push([f, t]) && (G.has(f) || G.set(f, new Set())))
    && (G.get(f).add(t) && (G.has(t) || G.set(t, new Set()))) && G.get(t).add(f)));

// https://en.wikipedia.org/wiki/Karger%27s_algorithm

const ck = (a, b) => a < b ? a + ":" + b : b + ":" + a, res = ( // @ts-ignore
    (f, n = 1000, c = 3) => [...Array(n)].map(() => f()).find(([cut]) => (cut <= c))?.[1]
)((
    g = new Map([...G].map(([k, v]) => [k, new Set(v)])), e = E.slice(),
    m = new Map(e.map(([a, b]) => [ck(a, b), 1])), nc = new Map([...G.keys()].map(n => [n, 1])),
) => {
    while (g.size > 2){
        const [u, v] = ((i = Math.floor(Math.random() * e.length), ed = e[i], l = e.pop()) => (((i < e.length) && (e[i] = l)), ed))(); // @ts-ignore
        ((!(!g.has(u) || !g.has(v))) && (((g.get(v) || []).forEach(vt => (vt !== u) && ((e.push(u < vt ? [u, vt] : [vt, u]) || 1)
        && (g.get(u)?.add(vt) || 1) && (g.get(vt)?.delete(v) || 1) && (g.get(vt)?.add(u) || 1)
            && m.set(ck(u, vt), (m.get(ck(u, vt)) || 0) + Number(m.get(ck(vt, v)))))) || 1)
            && (g.get(u)?.delete(v) || 1) && (g.get(u)?.delete(u) || 1) && (g.delete(v) || 1) && (m.delete(ck(u, v)) || 1)
        && (nc.set(u, Number(nc.get(u)) + Number(nc.get(v))) || 1) && nc.delete(v)));
    }
    return [m.get(ck(...g.keys())), [...nc.values()]]; // @ts-ignore
})?.reduce((x, y) => x * y, 1);

const pEnd = performance.now();

console.log("PRODUCT OF GROUP SIZES: " + res);
console.log(pEnd - pStart);
