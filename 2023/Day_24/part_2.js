import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
import SageCell from "../../utils/SageCell.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

// I aint gonna implement a Z3 Solver in JS, so I'm sending it to SageMath.
const client = new SageCell({ timeoutMs: 20000 });

const [a1, a2] = INPUT[0].split(" @ ").map(x => x.split(", ").map(Number));
const [b1, b2] = INPUT[1].split(" @ ").map(x => x.split(", ").map(Number));
const [c1, c2] = INPUT[2].split(" @ ").map(x => x.split(", ").map(Number));

// We have a system of 9 equations and 9 variables, so we can just solve for x, y and z.
const sage = `
var('u v w x y z a b c')
eq1 = ${a1[0]} + ${a2[0]}*u == x + a*u
eq2 = ${a1[1]} + ${a2[1]}*u == y + b*u
eq3 = ${a1[2]} + ${a2[2]}*u == z + c*u
eq4 = ${b1[0]} + ${b2[0]}*v == x + a*v
eq5 = ${b1[1]} + ${b2[1]}*v == y + b*v
eq6 = ${b1[2]} + ${b2[2]}*v == z + c*v
eq7 = ${c1[0]} + ${c2[0]}*w == x + a*w
eq8 = ${c1[1]} + ${c2[1]}*w == y + b*w
eq9 = ${c1[2]} + ${c2[2]}*w == z + c*w
solve([eq1, eq2, eq3, eq4, eq5, eq6, eq7, eq8, eq9], u, v, w, x, y, z, a, b, c)`.trim();

client.askSage(sage)
    .then(r => {
        const f = r.result["text/plain"].trim();
        const res = Number(f.match(/x == (\d+)/)[1]) + Number(f.match(/y == (\d+)/)[1]) + Number(f.match(/z == (\d+)/)[1]);

        const pEnd = performance.now();

        console.log("SUM OF COORDINATES: " + res);
        console.log(pEnd - pStart);
    }).catch(() => {
        const pEnd = performance.now();

        console.log("SUM OF COORDINATES: " + "NaN");
        console.log(pEnd - pStart);
    });
