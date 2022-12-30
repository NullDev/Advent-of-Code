"use strict";

/* eslint-disable no-eval, one-var, no-param-reassign */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n"); // change this if necessary

const pStart = performance.now();

const m = {}, notConst = new Set(["root"]);

INPUT.forEach((
    line, _, __, tmp = line.split(" "),
) => (m[tmp[0].substr(0, 4)] = tmp.length === 2 ? Number(tmp[1]) : tmp.slice(-3)));

const solve = (mon, mm, part2 = true, res = 0) => {
    if (!isNaN(mm[mon])) return mm[mon];
    res = (mon === "root" && part2)
        ? solve(mm[mon][0], mm) === solve(mm[mon][2], mm)
        : eval(`${solve(mm[mon][0], mm)} ${mm[mon][1]} ${solve(mm[mon][2], mm)}`);
    (!notConst.has(mon)) && (mm[mon] = res);
    return res;
};

const m1 = {...m};
const m2 = {...m};

solve("root", m1);
(m2.humn += 420) && solve("root", m2);
Object.keys(m1).filter(k => m1[k] !== m2[k]).map(k => notConst.add(k)) && solve("root", m);
m.humn = "humn";
let result, n;

isNaN(m[m.root[0]])
    ? (result = m[m.root[2]]) && (n = m[m.root[0]])
    : (result = m[m.root[0]]) && (n = m[m.root[2]]);

while (n !== "humn"){
    if (isNaN(m[n[0]])){
        if (n[1] === "+") result = result - m[n[2]];
        if (n[1] === "-") result = result + m[n[2]];
        if (n[1] === "*") result = result / m[n[2]];
        if (n[1] === "/") result = result * m[n[2]];
        n = m[n[0]];
    }
    else {
        if (n[1] === "+") result = result - m[n[0]];
        if (n[1] === "-") result = -(result - m[n[0]]);
        if (n[1] === "*") result = result / m[n[0]];
        if (n[1] === "/") result = 1 / (result / m[n[0]]);
        n = m[n[2]];
    }
}

const pEnd = performance.now();

console.log("ROOTS EQUALITY TEST: " + result);
console.log(pEnd - pStart);
