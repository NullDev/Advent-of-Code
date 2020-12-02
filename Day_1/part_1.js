"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");

let contentArr = String(fs.readFileSync(path.join(".", "input.txt"))).split("\n").map(Number);

/**
 * Get the two array entries that sum to target
 *
 * @param {Array} arr
 * @param {Number} tar
 * @returns {Array | Undefined} res
 */
let twoSum = function(arr, tar){
    let numObject = {};
	for (let i = 0; i < arr.length; i++){
		let thisNum = arr[i];
		numObject[thisNum] = i;
	}
	for (var i = 0; i < arr.length; i++){
		let diff = tar - arr[i];
		if (numObject.hasOwnProperty(diff) && numObject[diff] !== i) return [i, numObject[diff]];
	}
};

let res = twoSum(contentArr, 2020);
console.log(!res ? "No match" : contentArr[res[0]] * contentArr[res[1]]);