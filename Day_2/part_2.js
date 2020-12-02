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
    let posArr = lineArr[0].split("-").map(Number);

    let xorL = (lineArr[2][posArr[0] - 1] === lineArr[1]);
    let xorR = (lineArr[2][posArr[1] - 1] === lineArr[1]);

    if (xorL !== xorR) VALID_COUNT += 1;
};

// @ts-ignore
let readInterface = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "input.txt")),
    console: false
});

readInterface.on("line", validate);
readInterface.on("close", () => console.log(`VALID PASSWORDS: ${VALID_COUNT}`));
