"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-param-reassign */

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split(require("os").EOL);

const pStart = performance.now();

const r1 = /\(([^()]+)\)/;
const r2 = /(\d+) (\+) (\d+)/;
const r3 = /(\d+) (\*) (\d+)/;

const RES = CONTENT_READ.map(e =>
    (y => y(solve => equation => {
        while (equation.includes(" ")){
            if (equation.includes("(")) equation = equation.replace(equation.match(r1)[0], solve(equation.match(r1)[1]));
            else {
                // The conditional destructoring prevents the solution from being a one-liner =(
                let [ s, o1, op, o2 ] = equation.match(r2) || equation.match(r3);
                equation = equation.replace(s, op === "+" ? Number(o1) + Number(o2) : Number(o1) * Number(o2));
            }
        }
        return Number(equation);
    })(e))(le => (f => f(f))(f => le(x => (f(f))(x))))
).reduce((p, c) => p + c, 0);

const pEnd = performance.now();

console.log("SUM OF VALUES: " + RES);
console.log(pEnd - pStart);
