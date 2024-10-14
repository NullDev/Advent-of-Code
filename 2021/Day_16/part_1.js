import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-param-reassign, curly, no-cond-assign */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .trim()
    .split("\n")[0]
    .split("")
    .map(e => parseInt(e, 16)
        .toString(2)
        .padStart(4, "0"),
    ).join("");

const pStart = performance.now();

let RES = 0;
let cur;

const solver = function(element = 0){
    (RES += parseInt(INPUT.slice(element, element + 3), 2)) && (element += 3) && (element += 3);
    if (parseInt(INPUT.slice(element - 3, element), 2) === 4)
        for (;;){
            if (((cur = INPUT.slice(element, element + 5)) || 1) && ((element += 5) || 1) && (cur[0] === "0")) break;
        }
    else {
        let l;
        let store;
        const TMP = INPUT[element++];
        if (TMP === "0" && (l = parseInt(INPUT.slice(element, element + 15), 2)) && (element += 15))
            while (l > 0) (store = solver(element)) && ((l -= (store - element)) || 1) && (element = store);
        else if (TMP !== "0" && (l = parseInt(INPUT.slice(element, element + 11), 2)) && (element += 11))
            while (l > 0) (l--) && (element = solver(element));
    }
    return element;
};

solver();

const pEnd = performance.now();

console.log("SUM OF VERSION NUMBERS: " + RES);
console.log(pEnd - pStart);
