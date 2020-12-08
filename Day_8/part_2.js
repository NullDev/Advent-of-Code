"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL);

const pStart = performance.now();

const OPCODES = ["nop", "jmp"];

const SERIALIZED = CONTENT_READ.filter(e => !!e)
    .map(instruction => instruction.split(" "))
    .map(([ opcode, arg ]) => [ opcode, Number(arg) ]);

// eslint-disable-next-line consistent-return
let runner = function(){
    for (let i = 0; i < SERIALIZED.length; i++){
        const asm = [...SERIALIZED];
        const [ opcode, arg ] = asm[i];
        const completed = new Set();
        let [ index, accumulator ] = [0, 0];

        (OPCODES.includes(String(opcode))) && (asm[i] = [OPCODES[1 - Number(String(opcode).replace(OPCODES[0], "0").replace(OPCODES[1], "1"))], arg]);

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
