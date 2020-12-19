"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let EOL = require("os").EOL;
let { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(EOL.repeat(2));

const pStart = performance.now();

const rules = [];
const sets = [];

CONTENT_READ[0].split(EOL).forEach(rawRule => {
    let [id, raw] = rawRule.split(": ");
    raw[0] === '"'
        ? (rules[id] = raw[1]) && (sets[id] = raw[1])
        : rules[id] = raw.split(" | ").map(g => g.split(" ").map(n => Number(n)));
});

let r = new RegExp("^" + (function defineRules(ruleSet, s, id = 0){
    if (s[id]) return s[id];
    if (id === 0){
        let ruleStr = [];
        for (let n = 1; n <= 9; n++) ruleStr.push(`(?:${defineRules(ruleSet, s, 42)}{${n + 1},}${defineRules(ruleSet, s, 31)}{${n}})`);
        return (sets[id] = `(?:${ruleStr.join("|")})`);
    }
    return (s[id] = "(?:" + ruleSet[id].map(g => "(?:" + g.map(i => defineRules(ruleSet, s, i)).join("") + ")").join("|") + ")");
})(rules, sets) + "$");

let RES = CONTENT_READ[1].split(EOL).filter(s => r.test(s)).length;

const pEnd = performance.now();

console.log("MATCHING MESSAGES: " + RES);
console.log(pEnd - pStart);
