"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt")))
    .split(require("os").EOL)
    .map((line) => line.trim().split(""));

const pStart = performance.now();

let currentState = [...CONTENT_READ.map(line => [...line])];
let layoutChanged = true;

do {
    layoutChanged = false;
    // eslint-disable-next-line no-loop-func
    let nextState = currentState.map((row, rowIndex) => row.map((seat, index) => {
        const lowHighRate = [
            index === 0 ? index : index - 1,
            index === row.length - 1 ? index + 1 : index + 2
        ];

        // matrix
        const seatMatrix = [
            ...currentState[rowIndex - 1] ? currentState[rowIndex - 1].slice(...lowHighRate) : [],
            index === 0 ? "" : row[index - 1],
            index === row.length - 1 ? "" : row[index + 1],
            ...currentState[rowIndex + 1] ? currentState[rowIndex + 1].slice(...lowHighRate) : []
        ];

        const occupiedCount = seatMatrix.filter((_seat) => _seat === "#").length;

        if (seat === "L" && occupiedCount === 0 || seat === "#" && occupiedCount >= 4){
            layoutChanged = true;
            return seat === "L" ? "#" : "L";
        }

        return seat;
    }));

    currentState = nextState;
}
while (layoutChanged);

const occupiedSeats = currentState.reduce((seats, row) => seats + row.filter((seat) => seat === "#").length, 0);

const pEnd = performance.now();

console.log("OCCUPIED SEATS: " + occupiedSeats);
console.log(pEnd - pStart);
