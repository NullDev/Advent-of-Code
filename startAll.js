"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let cp = require("child_process");
let { performance } = require("perf_hooks");

const BC = "\x1b[42m\x1b[30m ✓ \x1b[0m\x1b[32m ";
const MC = "\x1b[32m - \x1b[33m(took ";

const DIRECTORIES = fs.readdirSync(path.join("."), { withFileTypes: true })
    .filter(dirEnt => dirEnt.isDirectory() && String(dirEnt.name).toLowerCase().includes("day_"))
    .map(dirEnt => dirEnt.name);

/**
 * Calculate MS from HR-Time
 *
 * @param {[number, number]} hrtime
 * @returns {Number} ms
 */
let hrt2ms = (hrtime) => Math.round(((hrtime[0] * 1e9) + hrtime[1]) / 1e6);

DIRECTORIES.forEach((element, index) => {
    let day = String(++index).padStart(2, "0");

    const PART1 = path.join(__dirname, element, "part_1.js");
    const PART2 = path.join(__dirname, element, "part_2.js");

    console.log(`\x1b[36m---====[ DAY ${day} ]====---\x1b[0m\n`);

    let part1StartTime = process.hrtime();
    let part1Out = cp.execSync("node " + PART1);
    let part1Time = hrt2ms(process.hrtime(part1StartTime));

    let part2StartTime = process.hrtime();
    let part2Out = cp.execSync("node " + PART2);
    let part2Time = hrt2ms(process.hrtime(part2StartTime));

    console.log(BC + "PART 1: \x1b[0m" + String(part1Out).replace(/\r?\n|\r/g, "") + MC + "\x1b[31m" + part1Time + "\x1b[33m ms)\x1b[0m");
    console.log(BC + "PART 2: \x1b[0m" + String(part2Out).replace(/\r?\n|\r/g, "") + MC + "\x1b[31m" + part2Time + "\x1b[33m ms)\x1b[0m\n");
});
