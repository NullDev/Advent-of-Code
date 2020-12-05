"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt")));

const pStart = performance.now();

const IDS = [];

/**
 * Decode the binary space partitioning string
 *
 * @param {String} str - current array element
 * @param {String} lo - low value; either F (front for row) or L (left for column)
 * @returns {Number} offset
 */
let decode = function(str, lo){
    let len = str.length;
    let value = 2 ** len - 1;
    for (let i = 0; i < len; i++) (str[i] === lo) && (value -= 2 ** (len - 1 - i));
    return value;
};

const CONTENT = CONTENT_READ.split("\n").filter(e => !!e).forEach(e => {
    let rowCode = e.substring(0, 7);
    let colCode = e.substring(7, 10); 
    
    let row = decode(rowCode, "F");
    let col = decode(colCode, "L");

    IDS.push(row * 8 + col);
});

let res = Math.max(...IDS);

const pEnd = performance.now();

console.log("HIGHEST SEAT ID: " + res);
console.log(pEnd - pStart);
