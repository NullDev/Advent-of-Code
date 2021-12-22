"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split(require("os").EOL).map((l, _, __, [cmd, bounds] = l.split(" ")) => ({
    cmd,
    cuboid: bounds.split(",").map(s => s.substring(2).split("..").map(Number))
}));
let splitter;

const pStart = performance.now();

const RES = INPUT.reduce((cub, instr) => [
    ...cub.flatMap(c => (
        (cuboid, other, intersect = cuboid.map((lim, i) => [Math.max(other[i][0], lim[0]), Math.min(other[i][1], lim[1])]).filter(([l, h]) => h >= l)) => (
            (intersect.length === 3)
                ? (splitter = (tmpCuboid, tmpIntersect, tmpC = 0) => [
                    ...[
                        [tmpCuboid[tmpC][0], tmpIntersect[tmpC][0] - 1], [tmpIntersect[tmpC][1] + 1, tmpCuboid[tmpC][1]]
                    ].filter(([b1, b2]) => b2 >= b1).map(lim => Object.assign([...tmpCuboid], { [tmpC]: lim })),
                    ...(tmpC < 2 ? splitter(Object.assign([...tmpCuboid], { [tmpC]: tmpIntersect[tmpC] }), tmpIntersect, tmpC + 1) : [])
                ])(cuboid, intersect)
                : [cuboid]
        )
    )(c, instr.cuboid)), ...(instr.cmd === "on" ? [instr.cuboid] : [])
], []).map(c => c.reduce((r, [l, h]) => r * (h - l + 1), 1)).reduce((r, c) => c + r, 0);

const pEnd = performance.now();

console.log("CUBE COUNT (ALL): " + RES);
console.log(pEnd - pStart);
