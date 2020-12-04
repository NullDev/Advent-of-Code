"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let readline = require("readline");
let { performance } = require("perf_hooks");

const pStart = performance.now();

let TREES_COUNT = 0;
let CURRENT_LINE = 0;
let CURRENT_CHAR = 0;

/**
 * Perform step
 *
 * @param {String} line
 */
let step = function(line){
    if (line[CURRENT_CHAR] === "#") TREES_COUNT += 1;
    CURRENT_CHAR = (CURRENT_CHAR + 3) % line.length;
    CURRENT_LINE += 1;
};

// @ts-ignore
let readInterface = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "input.txt")),
    console: false
});

readInterface.on("line", step);
readInterface.on("close", () => {
    const pEnd = performance.now();
    console.log(`TREES COUNT: ${TREES_COUNT}`);
    console.log(pEnd - pStart);
});
