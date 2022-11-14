"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { performance } = require("perf_hooks");

const pStart = performance.now();

let VALID_COUNT = 0;

/**
 * Validate password and count
 *
 * @param {String} line
 */
const validate = function(line){
    /**
     * Index 0: min-max
     * Index 1: letter
     * Index 2: Password
     */
    const lineArr = line.replace(/\:/g, "").split(" ");
    const minMaxArr = lineArr[0].split("-").map(Number);

    const matcher = new RegExp(lineArr[1], "g");
    const count = (lineArr[2].match(matcher) || []).length;
    if (count >= minMaxArr[0] && count <= minMaxArr[1]) VALID_COUNT += 1;
};

// @ts-ignore
const readInterface = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "input.txt")),
    console: false,
});

readInterface.on("line", validate);
readInterface.on("close", () => {
    const pEnd = performance.now();
    console.log(`VALID PASSWORDS: ${VALID_COUNT}`);
    console.log(pEnd - pStart);
});
