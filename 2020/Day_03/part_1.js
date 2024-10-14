import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const pStart = performance.now();

let TREES_COUNT = 0;
let CURRENT_CHAR = 0;

/**
 * Perform step
 *
 * @param {String} line
 */
const step = function(line){
    if (line[CURRENT_CHAR] === "#") TREES_COUNT += 1;
    CURRENT_CHAR = (CURRENT_CHAR + 3) % line.length;
};

// @ts-ignore
const readInterface = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "input.txt")),
    console: false,
});

readInterface.on("line", step);
readInterface.on("close", () => {
    const pEnd = performance.now();
    console.log(`TREES COUNT: ${TREES_COUNT}`);
    console.log(pEnd - pStart);
});
