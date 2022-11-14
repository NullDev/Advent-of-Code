"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-nested-ternary */
/* eslint-disable key-spacing */

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL);

const pStart = performance.now();

const rotate = ([dx, dy], degrees) => ({
    0:   [ dx,  dy],
    90:  [-dy,  dx],
    180: [-dx, -dy],
    270: [ dy, -dx],
}[(degrees + 360) % 360]);

const directions = CONTENT_READ.reduce((move, line) => {
    const action = line.trim()[0];
    const value = Number(line.trim().slice(1));

    move.XWaypoint += action === "E" ? value : action === "W" ? -value : 0;
    move.YWaypoint += action === "N" ? value : action === "S" ? -value : 0;

    const [XWaypoint, YWaypoint] = rotate(
        [move.XWaypoint, move.YWaypoint],
        action === "L" ? value : action === "R" ? -value : 0,
    );

    move.XWaypoint = XWaypoint;
    move.YWaypoint = YWaypoint;

    move.x += action === "F" ? move.XWaypoint * value : 0;
    move.y += action === "F" ? move.YWaypoint * value : 0;

    return move;
}, { x: 0, y: 0, XWaypoint: 10, YWaypoint: 1 });

const res = Math.abs(directions.x) + Math.abs(directions.y);

const pEnd = performance.now();

console.log("MANHATTAN DISTANCE: " + res);
console.log(pEnd - pStart);
