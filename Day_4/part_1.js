"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt")));

const pStart = performance.now();

let VALID = 0;

const REQUIRED_PROPERTIES = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const CONTENT = CONTENT_READ.replace(/\n\r/g, "\n")
    .replace(/\r/g, "\n")
    .split(/\n{2,}/g)
    .map(element => element.replace(/\n/g, " "))
    .map(element => element.split(" ")
        .filter(el => !!el)
        .map(el => el.split(":"))
        .map(el => ({ [el[0]]: el[1] }))
        .reduce((a, c) => ({...a, ...c}))
    ).forEach(element => REQUIRED_PROPERTIES.every(prop => prop in element) && (VALID += 1));

const pEnd = performance.now();

console.log("VALID PASSPORTS: " + VALID);
console.log(pEnd - pStart);
