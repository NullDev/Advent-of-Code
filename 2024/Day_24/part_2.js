import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const [, gates] = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n\n");

const pStart = performance.now();

const sw = [];
for (
    let i = 0, c0, m1, n1, r1, z1, c1,
        fG = (a, b, op) => gates.split("\n")
            .find(g => (g.startsWith(`${a} ${op} ${b}`) || g.startsWith(`${b} ${op} ${a}`)))
            ?.split(" -> ")
            .pop();
    i <= 44; i++
){
    ((m1 = fG(`x${i.toString().padStart(2, "0")}`, `y${i.toString().padStart(2, "0")}`, "XOR"))
        && (n1 = fG(`x${i.toString().padStart(2, "0")}`, `y${i.toString().padStart(2, "0")}`, "AND")) || 1)
    && (c0 && (((r1 = fG(c0, m1, "AND")) || 1)
        && (!r1) && ([n1, m1] = [m1, n1]) && sw.push(m1, n1) && (r1 = fG(c0, m1, "AND")) || 1)
    && ((z1 = fG(c0, m1, "XOR")) || 1)
        && ((m1?.startsWith("z")) && (([m1, z1] = [z1, m1]) && sw.push(m1, z1)) || 1)
        && ((n1?.startsWith("z")) && (([n1, z1] = [z1, n1]) && sw.push(n1, z1)) || 1)
        && ((r1?.startsWith("z")) && (([r1, z1] = [z1, r1]) && sw.push(r1, z1)) || 1)
        && (c1 = fG(r1, n1, "OR")) || 1)
    && ((c1?.startsWith("z") && c1 !== "z45") && (([c1, z1] = [z1, c1]) && sw.push(c1, z1)) || 1)
        && (c0 = c0 ? c1 : n1);
}

const res = sw.sort().join(",");

const pEnd = performance.now();

console.log("JOINT WIRE NAMES: " + res);
console.log(pEnd - pStart);
