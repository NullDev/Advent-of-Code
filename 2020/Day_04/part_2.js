import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

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
const isValid = function(element){
    const num = Number((element.hgt).replace(/in/gi, "").replace(/cm/gi, ""));

    const byrValid = (Number(element.byr) >= 1920 && Number(element.byr) <= 2002);
    const iyrValid = (Number(element.iyr) >= 2010 && Number(element.iyr) <= 2020);
    const eyrValid = (Number(element.eyr) >= 2020 && Number(element.eyr) <= 2030);
    const hclValid = (/^#[0-9A-F]{6}$/gi.test(element.hcl));
    const eclValid = (VALID_EYE_COLORS.includes(element.ecl));
    const pidValid = ((element.pid).length === 9 && (typeof Number(element.pid) === "number") && !isNaN(Number(element.pid)));
    const hgtValid = (
        /^([0-9]*)(in|cm)$/gi.test(element.hgt) &&
        element.hgt.toLowerCase().includes("cm") &&
        num >= 150 && num <= 193 ||
        element.hgt.toLowerCase().includes("in") &&
        num >= 59 && num <= 76
    );

    return (byrValid && iyrValid && eyrValid && hclValid && eclValid && pidValid && hgtValid);
};

CONTENT_READ.replace(/\n\r/g, "\n")
    .replace(/\r/g, "\n")
    .split(/\n{2,}/g)
    .map(element => element.replace(/\n/g, " "))
    .map(element => element.split(" ")
        .filter(el => !!el)
        .map(el => el.split(":"))
        .map(el => ({ [el[0]]: el[1] }))
        .reduce((a, c) => ({...a, ...c})),
    ).filter(element => REQUIRED_PROPERTIES.every(prop => prop in element))
    .forEach(element => (isValid(element) && (VALID += 1)));

const pEnd = performance.now();

console.log("VALID PASSPORTS: " + VALID);
console.log(pEnd - pStart);
