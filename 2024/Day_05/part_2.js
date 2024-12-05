import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable one-var, no-sequences */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n\n");

const pStart = performance.now();

// I tried so hard making this a one-liner lmao
// but that barely works when you're constructing a dependency graph with a topological sort...
const orderUpdate = (update, rules, { dGraph, inDeg } = update.reduce((acc, page) => (
    acc.dGraph.set(page, []) && acc.inDeg.set(page, 0), acc
), { dGraph: new Map(), inDeg: new Map() })) => (rules.filter(
    ({ before, after }) => update.includes(before) && update.includes(after),
).forEach(({ before, after }) => (dGraph.get(before).push(after)
        && inDeg.set(after, inDeg.get(after) + 1))), [...inDeg.entries()]
    .filter(([, degree]) => degree === 0)
    .map(([page]) => page)
    .reduce((sorted, page, _, __, queue = [page]) => {
        while (queue.length){
            const curr = queue.shift();
            sorted.push(curr) && dGraph.get(curr)
                ?.forEach((nx, _1, __1, nDeg = inDeg.get(nx) - 1) => (
                    inDeg.set(nx, nDeg) && ((nDeg === 0) && queue.push(nx))),
                );
        }
        return sorted;
    }, []));

const rules = INPUT[0].split("\n").map(
        rule => ({ before: +rule.split("|")[0], after: +rule.split("|")[1] }),
    ), res = INPUT[1].split("\n").map(u => u.split(",").map(Number))
        .reduce((acc, update) => (
            rules.some(({ before, after }) => update.includes(before)
                && update.includes(after)
                && update.indexOf(before) >= update.indexOf(after))
        ) ? acc + orderUpdate(update, rules)[Math.floor(update.length / 2)] : acc, 0);

const pEnd = performance.now();

console.log("FILTERED MIDDLE PAGE NUMBER SUM: " + res);
console.log(pEnd - pStart);
