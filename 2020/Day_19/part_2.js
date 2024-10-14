import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n\n");

const pStart = performance.now();

const rules = [];
const sets = [];

CONTENT_READ[0].split("\n").forEach(rawRule => {
    const [id, raw] = rawRule.split(": ");
    raw[0] === '"'
        ? (rules[id] = raw[1]) && (sets[id] = raw[1])
        : rules[id] = raw.split(" | ").map(g => g.split(" ").map(n => Number(n)));
});

const r = new RegExp("^" + (function defineRules(ruleSet, s, id = 0){
    if (s[id]) return s[id];
    if (id === 0){
        const ruleStr = [];
        for (let n = 1; n <= 9; n++) ruleStr.push(`(?:${defineRules(ruleSet, s, 42)}{${n + 1},}${defineRules(ruleSet, s, 31)}{${n}})`);
        return (sets[id] = `(?:${ruleStr.join("|")})`);
    }
    return (s[id] = "(?:" + ruleSet[id].map(g => "(?:" + g.map(i => defineRules(ruleSet, s, i)).join("") + ")").join("|") + ")");
})(rules, sets) + "$");

const RES = CONTENT_READ[1].split("\n").filter(s => r.test(s)).length;

const pEnd = performance.now();

console.log("MATCHING MESSAGES: " + RES);
console.log(pEnd - pStart);
