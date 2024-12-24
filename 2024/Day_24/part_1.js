import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable no-nested-ternary, one-var */

const [w, g] = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n\n");

const pStart = performance.now();

const wMap = new Map(w.split("\n")
        .map(e => e.split(": ")).map(([name, value]) => [name, Boolean(Number(value))])),
    queue = g.split("\n").map(gate => gate.split(" "))
        .map(([a, op, b, , c]) => [a, op, b, c]);

while (queue.length){
    const [a, op, b, c] = queue.shift() || [];
    (wMap.has(a) && wMap.has(b)) // @ts-ignore
        ? wMap.set(c, op === "AND"
            ? (wMap.get(a) && wMap.get(b))
            : op === "OR"
                ? (wMap.get(a) || wMap.get(b))
                : op === "XOR"
                    ? (wMap.get(a) !== wMap.get(b))
                    : wMap.get(a))
        : queue.push([a, op, b, c]);
}

const res = parseInt(Array.from(new Map([...wMap].filter(([key]) => key.startsWith("z"))).keys())
    .map(key => key.substring(1))
    .sort((a, b) => (+b - +a))
    .map((
        key, _, __,
        f = new Map([...wMap].filter(([k]) => k.startsWith("z"))),
    ) => (f.get("z" + key) ? "1" : "0")).join(""), 2);

const pEnd = performance.now();

console.log("Z-WIRES NUMBER: " + res);
console.log(pEnd - pStart);
