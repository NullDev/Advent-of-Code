"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-param-reassign */
/* eslint-disable curly */

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split(require("os").EOL);

const pStart = performance.now();

const r1 = /\(([^()]+)\)/;
const r2 = /(\d+) ([+*]) (\d+)/;

const RES = CONTENT_READ.map(e =>
    (y => y(solve => equation => {
        while (equation.includes(" ")) equation = equation.includes("(")
            ? equation.replace(equation.match(r1)[0], solve(equation.match(r1)[1]))
            : equation.replace(equation.match(r2)[0], equation.match(r2)[2] === "+"
                ? Number(equation.match(r2)[1]) + Number(equation.match(r2)[3])
                : Number(equation.match(r2)[1]) * Number(equation.match(r2)[3]));
        return Number(equation);
    })(e))(le => (f => f(f))(f => le(x => (f(f))(x))))
).reduce((p, c) => p + c);

const pEnd = performance.now();

console.log("SUM OF VALUES: " + RES);
console.log(pEnd - pStart);
