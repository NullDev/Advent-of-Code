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
 * Get the sum of three array elements
 *
 * @param {Array} array
 * @param {Number} target
 * @returns {Array} elements
 */
const threeSum = function(array, target){
    array.sort((a, b) => a - b);
    const triplets = [];

    for (let i = 0; i < array.length - 2; i++){
        if (array[i] !== array[i - 1]){
            let left = i + 1;
            let right = array.length - 1;

            while (left < right){
                const currentSum = array[i] + array[left] + array[right];
                if (currentSum === target){
                    triplets.push([array[i], array[left], array[right]]);
                    while (array[left] === array[left + 1]) left++;
                    while (array[right] === array[right - 1]) right--;
                    left ++;
                    right --;
                }
                else if (currentSum < target) left++;
                else if (currentSum > target) right--;
            }
        }
    }
    return triplets;
};

const res = threeSum(contentArr, 2020);

const pEnd = performance.now();

console.log("PRODUCT OF RESULTS: " + res[1].reduce((p, c) => p * c));
console.log(pEnd - pStart);
