import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable curly */

let YEARS = [process.argv[2]].filter(e => !!e);
let DAY = process.argv[3] || "";

if (YEARS[0] === "today"){
    YEARS = [String(new Date().getFullYear())];
    DAY = String(new Date().getDate());
}

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

    const dirs = fs.readdirSync(path.join(__dirname, y), { withFileTypes: true })
        .filter(dirEnt => dirEnt.isDirectory() && String(dirEnt.name).toLowerCase().includes("day_"))
        .map(dirEnt => dirEnt.name);

    const DIRECTORIES = !!DAY
        ? dirs.filter(d => {
            const dayNum = Number(d.replace("Day_", ""));
            return dayNum === Number(DAY);
        })
        : dirs;

    DIRECTORIES.forEach(element => {
        const day = element.replace("Day_", "");

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
