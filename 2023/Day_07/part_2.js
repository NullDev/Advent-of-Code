"use strict";

/* eslint-disable array-callback-return, consistent-return, no-nested-ternary, no-param-reassign */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const solver = function(cards, map = new Map()){
    cards.forEach(c => map.set(c, (map.get(c) ?? 0) + 1));
    const hi = [...map.entries()].filter(x => x[0] !== "J").sort((a, b) => b[1] - a[1]);
    (map = new Map() || 1) && cards.map(c => (c === "J" ? (hi.length ? hi[0][0] : cards[0]) : c)).forEach(c => map.set(c, (map.get(c) ?? 0) + 1));
    const vals = [...map.values()].sort();
    return vals.length === 1 ? 6 :
        vals.length === 2 ? (vals[0] === 1 ? 5 : 4) :
            vals.length === 3 ? (vals[0] === 1 ? (vals[1] === 1 ? 3 : 2) : 2) :
                vals.length === 4 ? 1 : 0;
};

const res = INPUT.map(line => ({
    h: line.split(" ")[0].split(""),
    b: Number(line.split(" ")[1]), // @ts-ignore
})).sort((a, b, cardsMap = [ "A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J" ]) => {
    const [tA, tB] = [solver(a.h), solver(b.h)];
    if (tA !== tB) return (tA || 0) - (tB || 0);
    for (let i = 0; i < 5; i++) if (a.h[i] !== b.h[i]) return cardsMap.indexOf(b.h[i]) - cardsMap.indexOf(a.h[i]);
}).reduce((prev, curr, i) => prev + curr.b * (i + 1), 0);

const pEnd = performance.now();

console.log("NEW TOTAL WINNINGS: " + res);
console.log(pEnd - pStart);
