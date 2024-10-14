import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-param-reassign, no-loop-func */

// @ts-ignore
const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(JSON.parse);

const pStart = performance.now();

const get = (sf, p) => p.reduce((s, i) => s[i], sf);

const set = function(sf, p, val){
    while (p.length > 1) sf = sf[p.shift()];
    sf[p[0]] = val;
};

const explode = function(sf, paths, i = paths.findIndex(p => p.length > 4), tp = paths[i]){
    tp.pop();
    const [ leftPath, rightPath ] = [paths?.[i - 1], paths?.[i + 2]]; // @ts-ignore
    ((leftPath) && (set(sf, leftPath, get(sf, [...tp, 0]) + get(sf, leftPath))) && 0) || ((rightPath) && (set(sf, rightPath, get(sf, [...tp, 1]) + get(sf, rightPath))));
    set(sf, tp, 0);
    return sf;
};

const split = function(sf, paths, i = paths.findIndex(p => get(sf, p) > 9), n = get(sf, paths[i])){
    set(sf, paths[i], [Math.floor(n / 2), Math.ceil(n / 2)]);
    return sf;
};

const reduce = function(sx, sf = JSON.parse(JSON.stringify(sx))){
    for (;;){
        const p = [0];
        const paths = [];
        while (p.length > 0){
            if (Array.isArray(get(sf, p))) p.push(0);
            else {
                paths.push([...p]);
                while (p.at(-1) === 1) p.pop();
                p[p.length - 1] = 1;
            }
        }
        if (paths.find(_p => _p.length > 4)) sf = explode(sf, paths);
        else if (paths.find(_p => get(sf, _p) > 9)) sf = split(sf, paths);
        else return sf;
    }
};

const magnitude = sf => !Array.isArray(sf) ? sf : 3 * magnitude(sf[0]) + 2 * magnitude(sf[1]);

const RES = magnitude(INPUT.reduce((s1, s2) => reduce([s1, s2])));

const pEnd = performance.now();

console.log("MAGNITUDE OF FINAL SUM: " + RES);
console.log(pEnd - pStart);
