import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-param-reassign */

const CONTENT_READ = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n\n").map(t => {
    const rows = t.split("\n");
    return {
        id: Number(rows.shift()?.match(/(\d)+/)?.[0]),
        tile: rows.map(row => row.split("")),
    };
});

const pStart = performance.now();

const rotateMatrix = function(matrix){
    const tr = matrix.map(r => r.slice(0)).slice(0);
    for (const r in matrix) for (const c in matrix) tr[c][r] = matrix[r][c];
    return tr.map(r => r.reverse());
};

const generateAllMutations = function({ id, tile }){
    const mutations = [];
    mutations.push(tile) && (tile = rotateMatrix(tile)) && mutations.push(tile) && (tile = rotateMatrix(tile)) && mutations.push(tile) && (tile = rotateMatrix(tile)) &&
    mutations.push(tile) && (tile = tile.map(r => r.slice(0).reverse()).slice(0)) && mutations.push(tile) && (tile = rotateMatrix(tile)) && mutations.push(tile) &&
    (tile = rotateMatrix(tile)) && mutations.push(tile) && (tile = rotateMatrix(tile)) && mutations.push(tile);
    return mutations.map(t => ({ id, tile: t, top: t[0].join(""), bottom: t[t.length - 1].join(""), left: t.map(r => r[0]).join(""), right: t.map(r => r[r.length - 1]).join("") }));
};

let allVariants = [];
for (const tile of CONTENT_READ) (allVariants = allVariants.concat(generateAllMutations(tile)));
const op = { top: "bottom", bottom: "top", left: "right", right: "left" };

const findMatch = function(tile, edge){
    for (const other of allVariants){
        if (other.id === tile.id) continue;
        if (tile[edge] === other[op[edge]]) return other;
    }
    return false;
};

const topLeft = allVariants.find(tile => (findMatch(tile, "right") && findMatch(tile, "bottom") && !findMatch(tile, "top") && !findMatch(tile, "left")));
allVariants = allVariants.filter(tile => tile.id !== topLeft.id);

const img = [...Array(Math.sqrt(CONTENT_READ.length))].map(() => [...Array(Math.sqrt(CONTENT_READ.length))]);
img[0][0] = topLeft;

let row = 0;
while (true){
    let column = 0;
    while (true){
        const next = findMatch(img[row][column], "right");
        if (!next) break;
        allVariants = allVariants.filter(tile => tile.id !== next.id);
        column++;
        img[row][column] = next;
    }
    const next = findMatch(img[row][0], "bottom");
    if (!next) break;
    (allVariants = allVariants.filter(tile => tile.id !== next.id)) && row++;
    img[row][0] = next;
}

for (const r in img){
    for (const column in img[r]){
        const { tile } = img[r][column];
        tile.pop() && tile.shift();
        img[r][column] = tile.map(r_ => r_.slice(1, -1));
    }
}

let fullImg = "";
for (const row1 in img){
    for (const row2 in img[row1][0]){
        for (const column in img[row1]) fullImg += img[row1][column][row2].join("");
        fullImg += "\n";
    }
}

const f = fullImg.trim().split("\n").map(r => r.split(""));
const monster = [
    /..................#./,
    /#....##....##....###/,
    /.#..#..#..#..#..#.../,
];

let highest = 0;
for (const poss of generateAllMutations({ id: -1, tile: f }).map(i => i.tile)){
    let count = 0;
    for (let r = 0; r < poss.length - 2; r++){
        for (let column = 0; column < poss[r].length - 19; column++) // eslint-disable-next-line curly
            if (poss[r].slice(column, column + 20).join("").match(monster[0])
                && poss[r + 1].slice(column, column + 20).join("").match(monster[1])
                && poss[r + 2].slice(column, column + 20).join("").match(monster[2])) count++;
    }
    highest = count > highest ? count : highest;
}

const RES = (f.map(r => r.join("")).join("").match(/#/g)?.length || 0) - highest * 15;

const pEnd = performance.now();

console.log("COUNT OF #: " + RES);
console.log(pEnd - pStart);
