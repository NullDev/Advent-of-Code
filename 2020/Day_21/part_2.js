"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trimEnd().split("\n");

const pStart = performance.now();

const entries = [];
const problematic = new Map();
const known = new Map();

CONTENT_READ.forEach(line => {
    const { i, a } = line.match(/(?<i>(?:\w+\s?)+)( \(contains (?<a>.+)\))?$/).groups;
    const ingredients = i.trim().split(" ");
    const allergens = a.trim().split(", ");
    entries.push({ingredients, allergens});
    allergens.forEach(e => problematic.set(e, (problematic.get(e) || ingredients).filter(_i => ingredients.includes(_i))));
});

while (problematic.size){
    iterator:
    for (const [a, i] of problematic.entries()){
        const t = i.filter(_i => !known.has(_i));
        if (t.length === 1){
            known.set(t[0], a) && problematic.delete(a);
            break iterator;
        }
    }
}

const RES = [...known.keys()].sort((a, b) => known.get(a).localeCompare(known.get(b))).join(",");

const pEnd = performance.now();

console.log("INGREDIENTS COUNT: " + RES);
console.log(pEnd - pStart);
