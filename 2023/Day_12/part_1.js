"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "INPUT.txt"))).trim().split("\n");

const pStart = performance.now();

const res = INPUT.reduce((
    acc, e, _, __,
    k = new RegExp("^\\.*#{" + e.split(" ")[1].split(",").join("}\\.+#{") + "}\\.*$", ""),
    solve = (s, idx = s.indexOf("?")) => (!s.includes("?"))
        ? [s]
        : solve(s.substring(0, idx) + "." + s.substring(idx + 1))
            .concat(solve(s.substring(0, idx) + "#" + s.substring(idx + 1))),
) => solve(e.split(" ")[0]).reduce((iAcc, j) => iAcc + (k.test(j) ? 1 : 0), acc), 0);

const pEnd = performance.now();

console.log("SUM OF COUNTS: " + res);
console.log(pEnd - pStart);
