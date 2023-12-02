"use strict";

/* eslint-disable no-return-assign, no-sequences */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const res = INPUT.filter(n => !!n).map(r => r.split(":")).map(e => ({
    gn: Number(e[0].split("Game ")[1]),
    tn: e[1].split(";").map(x => x.trim()).map(x => x.split(",")
        .map(z => z.trim().split(" "))
        .reduce((acc, y) => (acc[y[1]] = Number(y[0]), acc), {})),
})).filter(row => row.tn.every(t => Object.keys(t).every(col => t[col] <= { red: 12, green: 13, blue: 14 }[col])))
    .reduce((acc, row) => acc + row.gn, 0);

const pEnd = performance.now();

console.log("SUM OF ID's: " + res);
console.log(pEnd - pStart);
