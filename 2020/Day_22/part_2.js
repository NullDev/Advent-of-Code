import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trimEnd();

const pStart = performance.now();

/**
 * Recursive function to walk through each move
 *
 * @param {*} d1 Deck 1
 * @param {*} d2 Deck 2
 * @param {boolean} [first=false] Initial run of the function
 * @returns {Number | Boolean} Score or Exit-condition
 */
const walker = function(d1, d2, first = false){
    const computed = new Set();
    let gameWinner = null;

    while (d1.length !== 0 && d2.length !== 0){
        const hash = d1.reduce((sum, c, i) => sum + c * (i + 1), 0) + 100000 * d2.reduce((sum, c, i) => sum + c * (i + 1), 0);

        if (computed.has(hash)) return (gameWinner = false);
        computed.add(hash);

        const s = [].concat(d1.pop(), d2.pop());
        (s[0] <= d1.length && s[1] <= d2.length ? walker(d1.slice(-s[0]), d2.slice(-s[1])) : s[1] > s[0])
            ? d2.unshift(...s)
            : d1.unshift(...s.reverse());
    }

    (gameWinner === null) && (gameWinner = d1.length === 0);
    return first ? (gameWinner ? d2 : d1).reduce((sum, c, i) => sum + c * (i + 1), 0) : gameWinner;
};

const cardDecks = CONTENT_READ.match(/(\n\d+)+/g)?.map(s => s.trim().split("\n").map(n => Number(n)).reverse());
const RES = walker(cardDecks?.[0], cardDecks?.[1], true);

const pEnd = performance.now();

console.log("WINNING SCORE: " + RES);
console.log(pEnd - pStart);
