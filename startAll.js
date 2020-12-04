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

    let part1Out = String(execSync("node " + PART1, { stdio: "pipe" })).split("\n").filter(e => !!e);
    let part2Out = String(execSync("node " + PART2, { stdio: "pipe" })).split("\n").filter(e => !!e);

    console.log(`${BC}PART 1: \x1b[0m${String(part1Out[0]).replace(/\r?\n|\r/g, "")}${MC}\x1b[31m${Number(part1Out[1]).toFixed(4)}\x1b[33m ms)\x1b[0m`);
    console.log(`${BC}PART 2: \x1b[0m${String(part2Out[0]).replace(/\r?\n|\r/g, "")}${MC}\x1b[31m${Number(part2Out[1]).toFixed(4)}\x1b[33m ms)\x1b[0m\n`);
});
