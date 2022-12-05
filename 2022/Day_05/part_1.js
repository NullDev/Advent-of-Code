// @ts-nocheck
/* eslint-disable curly */

"use strict";

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")));

const pStart = performance.now();

const [inst, steps] = INPUT.split("\n\n");
const items = inst.replace(/\n[^\n]+$/, "").split("\n").reduce((prev, curr) => {
    for (const i in curr.split("")){
        const slot = (Number(i) + 3) / 4;
        if (!/^[A-Z]$/.test(curr[i])) continue;
        if (!prev[slot]) prev[slot] = [];
        prev[slot].unshift(curr[i]);
    }
    return prev;
}, []);

for (const [count, from, to] of steps.trim().split("\n").map(line => line.match(/\d+/g)?.map(Number)))
    items[to].push(...items[from].splice(items[from].length - count).reverse());

const result = items.map(slot => slot.at(-1)).join("");

const pEnd = performance.now();

console.log("TOP CRATE IN STACK: " + result);
console.log(pEnd - pStart);
