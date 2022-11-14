"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-loop-func */

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

// LOT of pre-setup

const INSTR = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL.repeat(2));
const INPUT = [INSTR, INSTR[0].split(/\W/).map(n => Number(n)), INSTR.slice(1).map(board => ({
    r: board.split(/\n\W*/).map(row => row.split(/\W+/).map(n => Number(n))),
    c: { x: [0, 0, 0, 0, 0], y: [0, 0, 0, 0, 0] },
}))];

const pStart = performance.now();

let win;
let prev;

INPUT[1].some((_, i) => {
    INPUT[2].forEach(board => {
        board.r.forEach((e, row) => {
            if (e.includes(INPUT[1][i])){
                const column = e.indexOf(INPUT[1][i]);
                (board.c.x[column]++) && (board.c.y[row]++);
                delete e[column];
            }
        });

        const next = board;

        (next.c.x.includes(5) || next.c.y.includes(5)) && (next.r = next.r.flat()) && (win = next) && (prev = INPUT[1][i]);
    });
    return !!win;
});

// @ts-ignore
const RES = win.r.flat().reduce((a, b)=> a + b, 0) * Number(prev);

const pEnd = performance.now();

console.log("FINAL SCORE: " + RES);
console.log(pEnd - pStart);
