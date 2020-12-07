"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL);

const pStart = performance.now();

let TOTAL = -1;

/**
 * Recursive function to count possible bags
 *
 * @param {Array} bags
 * @param {String} bag
 * @param {Number} quantifier
 */
let countBags = (bags, bag, quantifier) => {
    let line = bags.find(row => row.indexOf(`${bag} bags contain `) === 0);
    TOTAL += quantifier;
    if (!line.includes("no other bags")){
        let bagLines = line.replace(`${bag} bags contain `, "").replace(".", "").split(", ");
        bagLines.forEach(bagLine => {
            const [ amount, adjective, color ] = bagLine.split(" ");
            countBags(bags, `${adjective} ${color}`, quantifier * Number(amount));
        });
    }
};
    
countBags(CONTENT_READ, "shiny gold", 1);

const pEnd = performance.now();

console.log("REQUIRED BAG COUNT: " + TOTAL);
console.log(pEnd - pStart);
