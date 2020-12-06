"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt")));

const pStart = performance.now();

const UNIQUE = CONTENT_READ.split(require("os").EOL)
    .map(l => l.trim())
    .reduce((temp, person) => (person.length ? temp[temp.length - 1].push(person) && temp : [...temp, []]), [[]])
    .map(group => {
        const answers = {};
        Array.from(group.join("")).forEach(answer => (answers[answer] = answers[answer] ? answers[answer] + 1 : 1));
        return Object.keys(answers).filter(a => answers[a] === group.length).length;
    });

const RES = UNIQUE.reduce((temp, group) => (temp += group), 0);

const pEnd = performance.now();

console.log("TOTAL COUNT: " + RES);
console.log(pEnd - pStart);
