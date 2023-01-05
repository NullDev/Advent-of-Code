"use strict";

/* eslint-disable no-loop-func, no-constant-condition, curly, one-var */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const gN = (elf, elves) => {
    const [nw, n, ne, e, se, s, sw, w] = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]]
        .map(([deltaX, deltaY]) => elves.find(({ x, y }) => elf.x + deltaX === x && elf.y + deltaY === y));
    return { nw, n, ne, e, se, s, sw, w };
};

const elves = [];
for (let x = 0; x < INPUT.length; x++)
    for (let y = 0; y < INPUT[x].length; y++)
        (INPUT[x][y] === "#") && elves.push({ x, y });

const mP = ["n", "s", "w", "e"];

for (let round = 1, prop = []; round <= 10; round++){
    for (let elfI = 0; elfI < elves.length; elfI++){
        const elf = elves[elfI], aj = gN(elf, elves);
        if (Object.keys(aj).every((key) => !aj[key])) continue;
        for (const move of mP){
            if (move === "s" || move === "n"){
                if (!aj[`${move}w`] && !aj[move] && !aj[`${move}e`]){
                    prop.push({ elfI, move: { x: elf.x + (move === "s" ? 1 : -1), y: elf.y }});
                    break;
                }
            }
            else if (!aj[`s${move}`] && !aj[move] && !aj[`n${move}`]){
                prop.push({ elfI, move: { x: elf.x, y: elf.y + (move === "e" ? 1 : -1) }});
                break;
            }
        }
    }

    for (const { elfI, move } of prop)
        !prop.find((p) => p.elfI !== elfI && p.move.x === move.x && p.move.y === move.y)
        && (elves[elfI].x = move.x) && (elves[elfI].y = move.y);

    mP.push(mP.shift() || "");
}

const result = (Math.max(...elves.map(({ x }) => x)) - Math.min(...elves.map(({ x }) => x)) + 1)
    * (Math.max(...elves.map(({ y }) => y)) - Math.min(...elves.map(({ y }) => y)) + 1) - elves.length;

const pEnd = performance.now();

console.log("EMPTY GROUND TILES: " + result);
console.log(pEnd - pStart);
