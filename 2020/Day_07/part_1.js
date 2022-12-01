"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n");

const pStart = performance.now();

/**
 * Curried recursive function to count the possible bags
 *
 * @param {Array} bags
 * @param {Object} [colors={}]
 * @returns {function(string): number }
 */
const countBags = (bags, colors = {}) => bag => {
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
