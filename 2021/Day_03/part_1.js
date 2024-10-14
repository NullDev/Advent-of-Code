import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n");

const pStart = performance.now();

let γ = "";

for (let i = 0; i < INPUT[0].length; i++){
    γ += (INPUT.reduce((prev, line) => prev + Number(Number(line[i]) === 1), 0) < INPUT.length / 2 ? "0" : "1");
}

const RES = parseInt(γ, 2) * parseInt(γ.split("").reduce((prev, n) => prev + (n === "1" ? "0" : "1"), ""), 2);

const pEnd = performance.now();

console.log("POWER CONSUMPTION: " + RES);
console.log(pEnd - pStart);
