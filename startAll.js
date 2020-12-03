"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { execSync } = require("child_process");
let { performance } = require("perf_hooks");

const BC = "\x1b[42m\x1b[30m ✓ \x1b[0m\x1b[32m ";
const MC = "\x1b[32m - \x1b[33m(took ";

const DIRECTORIES = fs.readdirSync(path.join(__dirname), { withFileTypes: true })
    .filter(dirEnt => dirEnt.isDirectory() && String(dirEnt.name).toLowerCase().includes("day_"))
    .map(dirEnt => dirEnt.name);

console.log(
`\x1b[32m █████╗  ██████╗  ██████╗
██╔══██╗██╔═══██╗██╔════╝
███████║██║   ██║██║     
██╔══██║██║   ██║██║     
██║  ██║╚██████╔╝╚██████╗
╚═╝  ╚═╝ ╚═════╝  ╚═════╝
\x1b[33m---= \x1b[36mAdvent of Code\x1b[33m =---
- \x1b[0mSolutions by \x1b[32mNullDev\x1b[33m -
------------------------\x1b[0m\n`
);

DIRECTORIES.forEach((element, index) => {
    let day = String(++index).padStart(2, "0");

    const PART1 = path.join(__dirname, element, "part_1.js");
    const PART2 = path.join(__dirname, element, "part_2.js");

    console.log(`\x1b[36m---====[ DAY ${day} ]====---\x1b[0m\n`);

    let part1S = performance.now();
    let part1Out = execSync("node " + PART1);
    let part1E = performance.now();

    let part2S =  performance.now();
    let part2Out = execSync("node " + PART2);
    let part2E = performance.now();

    console.log(`${BC}PART 1: \x1b[0m${String(part1Out).replace(/\r?\n|\r/g, "")}${MC}\x1b[31m${Math.round(part1E - part1S)}\x1b[33m ms)\x1b[0m`);
    console.log(`${BC}PART 2: \x1b[0m${String(part2Out).replace(/\r?\n|\r/g, "")}${MC}\x1b[31m${Math.round(part2E - part2S)}\x1b[33m ms)\x1b[0m\n`);
});
