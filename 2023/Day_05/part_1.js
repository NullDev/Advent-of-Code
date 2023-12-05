"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const { maps } = INPUT.slice(1)
    .reduce((acc, line) => {
        if (line.trim() === "") return acc;
        if (line.includes("map:")) (acc.currMap = line.split(":")[0]) && (acc.maps[acc.currMap] = []);
        else {
            const [dS, sS, rangeLen] = line.split(" ").map(Number);
            acc.maps[acc.currMap].push({ dS, sS, rangeLen });
        }
        return acc;
    }, { maps: {}, currMap: "" });

const result = Math.min(
    ...INPUT[0].split(": ")[1].split(" ").map(Number).map(seed => Object.keys(maps).reduce((number, mapName) => {
        const mapping = maps[mapName].find(({ sS, rangeLen }) => number >= sS && number < sS + rangeLen);
        return mapping ? mapping.dS + (number - mapping.sS) : number;
    }, seed)),
);

const pEnd = performance.now();

console.log("LOWEST LOCATION NUMBER: " + result);
console.log(pEnd - pStart);
