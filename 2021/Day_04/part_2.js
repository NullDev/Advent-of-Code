import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

// LOT of pre-setup

const INPUT = [];
INPUT[0] = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n\n");
INPUT[1] = (INPUT[0].shift())?.split(",").map(Number);
INPUT[2] = INPUT[0].map(board => board.trim().split("\n").map(row => row.trim().split(/\ +/).map(Number)));

const pStart = performance.now();

const won = function(board, last){
    for (let col = 0; col < board[0].length; col++) if (board.every(row => last.has(row[col]))) return true;
    return (board.some(row => row.every(val => last.has(val))));
};

const win = new Set();
const last = new Set();
let RES;

// @ts-ignore
for (const number of INPUT[1]){
    last.add(number);
    for (let i = 0; i < INPUT[2].length; i++){
        if (win.has(i) || !won(INPUT[2][i], last)) continue;
        win.add(i);
        if (win.size === INPUT[2].length){
            let sum = 0;
            for (const row of INPUT[2][i]) for (const n of row) (!last.has(n)) && (sum += n);
            RES = sum * number;
            break;
        }
    }
}

const pEnd = performance.now();

console.log("LAST FINAL SCORE: " + RES);
console.log(pEnd - pStart);
