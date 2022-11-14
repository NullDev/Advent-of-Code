"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL);

const pStart = performance.now();

const OPCODES = ["nop", "jmp"];

const SERIALIZED = CONTENT_READ.filter(e => !!e)
    .map(instruction => instruction.split(" "))
    .map(([ opcode, arg ]) => [ opcode, Number(arg) ]);

// eslint-disable-next-line consistent-return
const runner = function(){
    for (let i = 0; i < SERIALIZED.length; i++){
        const asm = [...SERIALIZED];
        const [ opcode, arg ] = asm[i];
        const completed = new Set();
        let [ index, accumulator ] = [0, 0];

        if (OPCODES.includes(String(opcode))) asm[i] = [opcode === OPCODES[0] ? OPCODES[1] : OPCODES[0], arg];

        while (!completed.has(index) && index !== asm.length){
            completed.add(index);
            const [ opcode_, arg_ ] = asm[index];
            accumulator += opcode_ === "acc" ? Number(arg_) : 0;
            index += opcode_ === OPCODES[1] ? Number(arg_) : 1;
        }

        if (index === asm.length) return accumulator;
    }
};

const pEnd = performance.now();

console.log("ACCUMULATOR VALUE: " + runner());
console.log(pEnd - pStart);
