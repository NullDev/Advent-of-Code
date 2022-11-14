"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-nested-ternary */

const fs = require("fs");
const path = require("path");
const { EOL } = require("os");

const { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(EOL.repeat(2));

const pStart = performance.now();

let RES = 0;

const rules = new Map();

CONTENT_READ[0].split(EOL).map(e => rules.set(Number(e.split(": ")[0]), e.split(": ")[1]));

const r = new RegExp("^" + (function defineRules(ruleSet, rule, n = 0){
    return n > 4 ? "" : rule.startsWith('"')
        ? rule.slice(1, -1)
        : "(?:" + rule.split(" | ").map(e => e.split(" ")
            .map(f => defineRules(ruleSet, ruleSet.get(Number(f)), ruleSet.get(Number(f)) === rule ? n + 1 : 0))
            .join(""),
        ).join("|") + ")";
})(rules, rules.get(0), 0) + "$");

// This could literally be a two-liner by just inserting "r"
// directly here. However due to the additional computations,
// the total execution time increases from about ~13ms to ~365ms!
// Thus, I left it split up...
CONTENT_READ[1].split(EOL).forEach(e => (r.test(e) && (RES++)));

const pEnd = performance.now();

console.log("MATCHING MESSAGES: " + RES);
console.log(pEnd - pStart);
