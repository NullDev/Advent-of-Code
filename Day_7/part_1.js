"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL);

const pStart = performance.now();

/**
 * Curried recursive function to count the possible bags
 *
 * @param {Array} bags
 * @param {Object} [colors={}]
 * @returns {function(string): number }
 */
let countBags = (bags, colors = {}) => bag => {
    bags.filter(line => line.indexOf(bag) > 0)
        .map(line => {
            const [ color ] = line.split(" bags contain ");
            colors[color] = 1;
            return color;
        })
        .forEach(countBags(bags, colors));
  
    return Object.keys(colors).length;
};

const RES = countBags(CONTENT_READ, [])("shiny gold");

const pEnd = performance.now();

console.log("BAG COUNT: " + RES);
console.log(pEnd - pStart);
