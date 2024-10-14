import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trimEnd().split("\n");

const pStart = performance.now();

const entries = [];
const problematic = new Map();
const known = new Map();

CONTENT_READ.forEach(line => { // @ts-ignore
    const { i, a } = line.match(/(?<i>(?:\w+\s?)+)( \(contains (?<a>.+)\))?$/)?.groups;
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

const RES = entries.reduce((prev, entry) => prev + entry.ingredients.filter(e => !known.has(e)).length, 0);

const pEnd = performance.now();

console.log("INGREDIENTS COUNT: " + RES);
console.log(pEnd - pStart);
