import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n");

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
