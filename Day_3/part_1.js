"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let readline = require("readline");

let TREES_COUNT = 0;
let CURRENT_LINE = 0;
let CURRENT_CHAR = 0;

/**
 * Calculate overflow 
 *
 * @param {Number} num
 * @param {Number} maxima
 * @returns {Number} num
*/
let overflow = (num, maxima) => (num > maxima) ? (num - maxima) - 1 : num;

/**
 * Perform step
 *
 * @param {String} line
 */
let step = function(line){
    if (line[CURRENT_CHAR] === "#") TREES_COUNT += 1;
    CURRENT_CHAR = overflow(CURRENT_CHAR + 3, line.length - 1);
    CURRENT_LINE += 1;
};

// @ts-ignore
let readInterface = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "input.txt")),
    console: false
});

readInterface.on("line", step);
readInterface.on("close", () => console.log(`TREES COUNT: ${TREES_COUNT}`));
