"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const [seedData, ...mapData] = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n\n");

const ps = performance.now();

const paths = ["soil", "fertilizer", "water", "light", "temperature", "humidity", "location"];
const maps = mapData.reduce((acc, m) => {
    const [type, values] = m.split(" map:\n"); // @ts-ignore
    acc[type.split("-to-")[1]] = values.split("\n").map(v => {
        const [ s, i, r ] = v.split(" ").map(Number);
        return { s, e: s + r - 1, o: i - s };
    });
    return acc;
}, Object.fromEntries(paths.map(p => [p, []])));

const solve = function(value, type = 6){
    if (type < 0) return value;
    const found = maps[paths[type]]
        .find(({ s, e }) => value >= s && value <= e); // @ts-ignore
    return solve(found ? value + found.o : value, type - 1);
};

const result = ((seedRanges = seedData.split(": ")[1].split(" ").map(Number).reduce((acc, curr, i, arr) => { // @ts-ignore
    if (i % 2 === 0) acc.push([curr, curr + arr[i + 1] - 1]);
    return acc;
}, [])) => {
    for (let i = 0; ; i++){
        const seed = solve(i);
        if (seedRanges.some(([min, max]) => seed >= min && seed <= max)) return i;
    }
})();

const pe = performance.now();

console.log("LOWEST LOCATION NUMBER: " + result);
console.log(pe - ps);
