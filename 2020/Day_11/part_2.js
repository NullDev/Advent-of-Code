"use strict";

// ========================= //
// = Copyright (seat) NullDev = //
// ========================= //

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL);

const pStart = performance.now();

// https://en.wikipedia.org/wiki/Adjacency_matrix
const directionMatrix = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];

let currentState = CONTENT_READ.map((line) => line.trim().split(""));
let layoutChanged = true;

do {
    layoutChanged = false;
    // eslint-disable-next-line no-loop-func
    const nextState = currentState.map((row, rowIndex) => row.map((seat, index) => {
        let count = 0;

        for (const [dx, dy] of directionMatrix){
            const xy = [index, rowIndex];
            do {
                xy[0] += dx;
                xy[1] += dy;
                if (currentState[xy[1]] && currentState[xy[1]][xy[0]] !== "."){
                    if (currentState[xy[1]] && currentState[xy[1]][xy[0]] === "#") count++;
                    break;
                }
            }
            while (currentState[xy[1]] && currentState[xy[1]][xy[0]]);
        }

        if (seat === "L" && count === 0 || seat === "#" && count >= 5){
            layoutChanged = true;
            return seat === "L" ? "#" : "L";
        }

        return seat;
    }));
    currentState = nextState;
}
while (layoutChanged);

const res = currentState.reduce((count, row) => row.filter(seat => seat === "#").length + count, 0);

const pEnd = performance.now();

console.log("OCCUPIED SEATS: " + res);
console.log(pEnd - pStart);
