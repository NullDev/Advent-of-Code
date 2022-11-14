"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable consistent-return, no-param-reassign, curly */

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

/*
#############
#...........#
###B#C#A#B###
  #C#D#D#A#
  #########

A:1 , B:2 , C:3 , D:4

Could be solved by hand but it's Advent of CODE after all
*/

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL)
    .filter((_, i) => (i === 2 || i === 3))
    .map(e => e.trim()
        .replaceAll("#", "")
        .replaceAll("A", "1")
        .replaceAll("B", "2")
        .replaceAll("C", "3")
        .replaceAll("D", "4")
        .split("")
        .map(Number),
    )
    .map((e, i, a) => ((i === 0) ? e.map((e1, i1) => ([e1, a[1][i1]])) : null))
    .filter(e => !!e)
    .flat();

const pStart = performance.now();

// As you may have guessed, we're brute forcing.
let RES = Number.MAX_SAFE_INTEGER;
const STORE = {};

const solver = function(room, hall, point, tmp = room + "|" + hall, found = true){
    if (point >= RES) return;
    outer1: for (let i = 0; i < room.length; i++){ // Second day where I have to use a label >.>
        for (let j = 0; j < 2; j++) if (room[i][j] !== i + 1){
            found = false;
            break outer1;
        }
    }
    if (found && RES > point) return (RES = point);
    if (STORE[tmp] && STORE[tmp] <= point) return;
    STORE[tmp] = point;
    for (let i = 0; i < room.length; i++){
        const roomId = room[i].findIndex(x => (x !== 0));
        if (roomId === -1) continue;
        const val = room[i][roomId];
        if (val === i + 1 && room[i].every(x => (x === val || x === 0))) continue;
        let targetRoom = roomId;
        for (let j = i + 1; j >= 0; j--){
            if (hall[j] !== 0) break;
            ((targetRoom++) || 1) && ((j !== 0) && targetRoom++);
            const curRoom = [...(room.map(x => [...x]))];
            const hallPoints = [...hall];
            ((hallPoints[j] = curRoom[i][roomId]) && (curRoom[i][roomId] = 0) || 1) && solver(
                curRoom, hallPoints,
                point + targetRoom * (10 ** (val - 1)),
            );
        }
        targetRoom = roomId;
        for (let j = i + 2; j < hall.length; j++){
            if (hall[j] !== 0) break;
            ((targetRoom++) || 1) && ((j !== hall.length - 1) && targetRoom++);
            const curRoom = [...(room.map(x => [...x]))];
            const hallPoints = [...hall];
            ((hallPoints[j] = curRoom[i][roomId]) && (curRoom[i][roomId] = 0) || 1) && solver(
                curRoom, hallPoints,
                point + targetRoom * (10 ** (val - 1)),
            );
        }
    }
    outer2: for (let i = 0; i < hall.length; i++){
        if (hall[i] === 0) continue;
        const val = hall[i];
        if (!room[val - 1].every(x => (x === val || x === 0))) continue;
        let targetRoom = 2;
        if (i < val) for (let j = i + 1; j <= val; j++, targetRoom++){
            if (hall[j] !== 0) continue outer2;
            (j !== 1) && targetRoom++;
        }
        else if (i > val + 1) for (let j = i - 1; j >= val + 1; j--, targetRoom++){
            if (hall[j] !== 0) continue outer2;
            (j !== hall.length - 2) && targetRoom++;
        }
        let roomId = room[val - 1].findIndex(x => (x !== 0));
        ((roomId === -1) && (roomId = 2) || 1) && roomId--;
        const curRoom = [...(room.map(x => [...x]))];
        const hallPoints = [...hall];
        ((targetRoom += roomId) && (curRoom[val - 1][roomId] = val) && (hallPoints[i] = 0) || 1) && solver(
            curRoom, hallPoints,
            point + targetRoom * (10 ** (val - 1)),
        );
    }
};

solver(INPUT, [0, 0, 0, 0, 0, 0, 0], 0);

const pEnd = performance.now();

console.log("LEAST ENERGY REQUIRED: " + RES);
console.log(pEnd - pStart);
