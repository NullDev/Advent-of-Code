import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable array-callback-return, consistent-return, no-nested-ternary */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const solver = function(cards, map = new Map()){
    cards.forEach(c => map.set(c, (map.get(c) ?? 0) + 1));
    const vals = [...map.values()].sort();
    return vals.length === 1 ? 6 :
        vals.length === 2 ? (vals[0] === 1 ? 5 : 4) :
            vals.length === 3 ? (vals[0] === 1 ? (vals[1] === 1 ? 3 : 2) : 2) :
                vals.length === 4 ? 1 : 0;
};

const res = INPUT.map(line => ({
    h: line.split(" ")[0].split(""),
    b: Number(line.split(" ")[1]), // @ts-ignore
})).sort((a, b, cardsMap = [ "A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2" ]) => {
    const [tA, tB] = [solver(a.h), solver(b.h)];
    if (tA !== tB) return (tA || 0) - (tB || 0);
    for (let i = 0; i < 5; i++) if (a.h[i] !== b.h[i]) return cardsMap.indexOf(b.h[i]) - cardsMap.indexOf(a.h[i]);
}).reduce((prev, curr, i) => prev + curr.b * (i + 1), 0);

const pEnd = performance.now();

console.log("TOTAL WINNINGS: " + res);
console.log(pEnd - pStart);
