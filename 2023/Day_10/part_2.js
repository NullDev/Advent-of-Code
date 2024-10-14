import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable one-var, prefer-const, no-param-reassign */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n").filter(Boolean);

const pStart = performance.now();

// guess who had to start from scratch again ...

const mp = INPUT.map(line => line.split("")),
    inv = { n: "s", s: "n", e: "w", w: "e" },
    ar = mp.map(row => row.map(x => ({ "|": "ns", "-": "ew", L: "ne", J: "nw", 7: "sw", F: "se", ".": null, S: "??" }[x]))),
    [y0, x0] = [INPUT.findIndex(line => line.includes("S")), mp[INPUT.findIndex(line => line.includes("S"))].indexOf("S")],
    s = ["n", "s", "w", "e"].filter(d => ar[y0 + Number(d === "s") - Number(d === "n")]?.[x0 + Number(d === "e") - Number(d === "w")]?.includes(inv[d])).join("");

let [y, x, ent] = [y0, x0, s[0]], t = mp.map(row => row.map(() => ""));
ar[y][x] = s;

do {
    t[y][x] = "P";
    const ext = ar[y][x].replace(ent, ""); // @ts-ignore
    ([y, x] = [y + Number(ext === "s") - Number(ext === "n"), x + Number(ext === "e") - Number(ext === "w")] || 1) && (ent = inv[ext]);
} while (mp[y][x] !== "S");

ar.forEach((_, y1, __, corner = "O") => ar[y1].forEach((_1, x1, __1, tRow = t[y1], sRow = ar[y1]) =>
    (!!tRow[x1] ? (sRow[x1].includes("n")) && (corner = corner === "O" ? "I" : "O") : (tRow[x1] = corner))));

const res = t.flat().filter(value => value === "I").length;

const pEnd = performance.now();

console.log("NUMBER OF TILES: " + res);
console.log(pEnd - pStart);
