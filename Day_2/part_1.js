"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let readline = require("readline");

let VALID_COUNT = 0;

/**
 * Validate password and count
 *
 * @param {String} line
 */
let validate = function(line){
    /**
     * Index 0: min-max
     * Index 1: letter
     * Index 2: Password
     */
    let lineArr = line.replace(/\:/g, "").split(" ");
    let minMaxArr = lineArr[0].split("-").map(Number);

    let matcher = new RegExp(lineArr[1], "g");
    let count = (lineArr[2].match(matcher) || []).length;
    if (count >= minMaxArr[0] && count <= minMaxArr[1]) VALID_COUNT += 1;
};

// @ts-ignore
let readInterface = readline.createInterface({
    input: fs.createReadStream(path.join(".", "input.txt")),
    console: false
});

readInterface.on("line", validate);
readInterface.on("close", () => console.log(`VALID PASSWORDS: ${VALID_COUNT}`));
