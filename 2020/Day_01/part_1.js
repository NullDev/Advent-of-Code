"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const contentArr = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL).map(Number);

const pStart = performance.now();

/**
 * Get the two array entries that sum to target
 *
 * @param {Array} arr
 * @param {Number} tar
 * @returns {Array | Undefined} res
 */
const twoSum = function(arr, tar){
    const numObject = {};
    let res;
    arr.forEach((e, i) => (numObject[e] = i));
    arr.forEach((e, i) => ((Object.prototype.hasOwnProperty.call(numObject, tar - e) && numObject[tar - e] !== i) && (res = [i, numObject[tar - e]])));
    return res;
};

const res = twoSum(contentArr, 2020);

const pEnd = performance.now();

console.log(!res ? "No match" : "PRODUCT OF RESULTS: " + contentArr[res[0]] * contentArr[res[1]]);
console.log(pEnd - pStart);
