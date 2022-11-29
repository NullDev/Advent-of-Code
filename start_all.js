"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("node:fs");
const path = require("node:path");

const { execSync } = require("node:child_process");

/* eslint-disable curly */

let YEARS = [process.argv[2]].filter(e => !!e);

if (!YEARS.length) YEARS = fs.readdirSync(__dirname, { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name.startsWith("2"))
    .map(d => d.name);

const BC = "\x1b[42m\x1b[30m ✓ \x1b[0m\x1b[32m ";
const MC = "\x1b[32m - \x1b[0m(took ";

YEARS.forEach(y => {
    console.log(`\n\x1b[32m    █████╗  ██████╗  ██████╗
   ██╔══██╗██╔═══██╗██╔════╝
   ███████║██║   ██║██║     
   ██╔══██║██║   ██║██║     
   ██║  ██║╚██████╔╝╚██████╗
   ╚═╝  ╚═╝ ╚═════╝  ╚═════╝
\x1b[33m -----------------------------\n ---= \x1b[36mAdvent of Code ${y}\x1b[33m =---
 -----------------------------\x1b[0m\n`,
    );

    const DIRECTORIES = fs.readdirSync(path.join(__dirname, y), { withFileTypes: true })
        .filter(dirEnt => dirEnt.isDirectory() && String(dirEnt.name).toLowerCase().includes("day_"))
        .map(dirEnt => dirEnt.name);

    DIRECTORIES.forEach((element, index) => {
        const day = String(index + 1).padStart(2, "0");

        const PART1 = path.join(__dirname, y, element, "part_1.js");
        const PART2 = path.join(__dirname, y, element, "part_2.js");

        console.log(`\x1b[36m---====[ DAY ${day} ]====---\x1b[0m\n`);

        const part1Out = fs.existsSync(PART1)
            ? String(execSync("node " + PART1 + " t", { stdio: "pipe" })).split("\n").filter(e => !!e)
            : ["PART 1 NOT IMPLEMENTED YET", 0];
        const part2Out = fs.existsSync(PART2)
            ? String(execSync("node " + PART2 + " t", { stdio: "pipe" })).split("\n").filter(e => !!e)
            : ["PART 2 NOT IMPLEMENTED YET", 0];

        console.log(`${BC}PART 1: \x1b[0m${String(part1Out[0]).replace(/\r?\n|\r/g, "")}${MC}\x1b[32m${Number(part1Out[1]).toFixed(4)}\x1b[0m ms)`);
        console.log(`${BC}PART 2: \x1b[0m${String(part2Out[0]).replace(/\r?\n|\r/g, "")}${MC}\x1b[32m${Number(part2Out[1]).toFixed(4)}\x1b[0m ms)\n`);
    });
});
