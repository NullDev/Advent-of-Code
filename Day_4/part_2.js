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
const VALID_EYE_COLORS = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

/**
 * Check if the persons passport is valid
 *
 * @param {Object} element
 * @returns {Boolean} valid/invalid
 */
let isValid = function(element){
    let num = Number((element.hgt).replace(/in/gi, "").replace(/cm/gi, ""));

    let byrValid = (Number(element.byr) >= 1920 && Number(element.byr) <= 2002);
    let iyrValid = (Number(element.iyr) >= 2010 && Number(element.iyr) <= 2020);
    let eyrValid = (Number(element.eyr) >= 2020 && Number(element.eyr) <= 2030);
    let hclValid = (/^#[0-9A-F]{6}$/gi.test(element.hcl));
    let eclValid = (VALID_EYE_COLORS.includes(element.ecl));
    let pidValid = ((element.pid).length === 9 && (typeof Number(element.pid) === "number") && !isNaN(Number(element.pid)));
    let hgtValid = (
        /^([0-9]*)(in|cm)$/gi.test(element.hgt) &&
        element.hgt.toLowerCase().includes("cm") && 
        150 <= num && 193 >= num || 
        element.hgt.toLowerCase().includes("in") && 
        59 <= num && 76 >= num
    );

    return (byrValid && iyrValid && eyrValid && hclValid && eclValid && pidValid && hgtValid);
};

const CONTENT = CONTENT_READ.replace(/\n\r/g, "\n")
    .replace(/\r/g, "\n")
    .split(/\n{2,}/g)
    .map(element => element.replace(/\n/g, " "))
    .map(element => element.split(" ")
        .filter(el => !!el)
        .map(el => el.split(":"))
        .map(el => ({ [el[0]]: el[1] }))
        .reduce((a, c) => ({...a, ...c}))
    ).filter(element => REQUIRED_PROPERTIES.every(prop => prop in element))
    .forEach(element => (isValid(element) && (VALID += 1)));

const pEnd = performance.now();

console.log("VALID PASSPORTS: " + VALID);
console.log(pEnd - pStart);
