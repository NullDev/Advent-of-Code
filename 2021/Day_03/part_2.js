import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-loop-func */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n");

const pStart = performance.now();

const calc = function(second = false){
    let out = INPUT.slice();
    let i = 0;
    let tmp = "";

    while (out.length > 1){
        tmp = out.reduce((prev, line) => prev + Number(Number(line[i]) === 1), 0) < out.length / 2
            ? "0"
            : "1";

        second && (tmp = tmp.split("").reduce((prev, n) => prev + (n === "1" ? "0" : "1"), ""));

        out = out.filter(line => line[i] === tmp);

        i++;
    }

    return out[0];
};

const RES = parseInt(calc(), 2) * parseInt(calc(true), 2);

const pEnd = performance.now();

console.log("LIFE SUPPORT RATING: " + RES);
console.log(pEnd - pStart);
