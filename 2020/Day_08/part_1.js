"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL);

const pStart = performance.now();

const completed = new Set();
let [ index, accumulator ] = [0, 0];

const SERIALIZED = CONTENT_READ.filter(e => !!e)
    .map(instruction => instruction.split(" "))
    .map(([ opcode, arg ]) => [ opcode, arg ]);

while (!completed.has(index)){
    completed.add(index);
    const [ opcode, arg ] = SERIALIZED[index];
    accumulator += opcode === "acc" ? Number(arg) : 0;
    index += opcode === "jmp" ? Number(arg) : 1;
}

const pEnd = performance.now();

console.log("ACCUMULATOR VALUE: " + accumulator);
console.log(pEnd - pStart);
