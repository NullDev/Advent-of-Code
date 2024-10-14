import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable one-var, no-param-reassign, no-sequences, no-loop-func, no-constant-condition */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const ms = {}, seen = [];
let bt = [], f = [];

// @ts-ignore
INPUT.forEach((line, _, __, [one, two] = line.split(" -> "), m = { // @ts-ignore
    n: one.slice(1), type: one[0], o: two.replaceAll(" ", "").split(","),
}) => ((one === "broadcaster") // @ts-ignore
    ? (bt = two.replaceAll(" ", "").split(","))
    : (((((one[0] === "%") && (m.mem = "off")) || 1) && (one[0] === "&")
        && (m.mem = {})) || 1) && (ms[one.slice(1)] = m)))
|| Object.values(ms).forEach(({ n, o }) => o.forEach(op => (
    ms[op] && ms[op].type === "&") && (ms[op].mem[n] = "lo")),
) || Object.values(ms).forEach(({ n, o }) => (o.includes("rx") && (f = n)))
    || Object.values(ms).forEach(({ n, o }) => (o.includes(f) && (seen[n] = 0)));

const cl = {};
let p = 0, og, q;
lp: while (1){
    p += 1, q = bt.map(t => ["broadcaster", t, "lo"]);
    while (q.length > 0){
        const [org, t, ps] = q.shift() || [];
        if (!Object.keys(ms).includes(t)) continue;
        if (ms[t].n === f && ps === "hi") ((seen[org] += 1) || 1) && (!Object.keys(cl).includes(org)) && (cl[org] = p);
        if (Object.values(seen).every(v => v > 0)) break lp;
        (ms[t].type === "%")
            ? (ps === "lo") && ((ms[t].mem === "off")
                ? ((ms[t].mem = "on") || 1) && (og = "hi")
                : ((ms[t].mem = "off") || 1) && (og = "lo") || 1)
                && ms[t].o.forEach(x => q.push([ms[t].n, x, og]))
            : ((ms[t].mem[org] = ps) || 1) && ms[t].o.forEach(x => q.push([
                ms[t].n, x, (Object.values(ms[t].mem).every(y => y === "hi")) ? "lo" : "hi",
            ]));
    }
}

const res = ((
    numbers, gcd = (a, b)  => (b === 0 ? a : gcd(b, a % b)), l = numbers[0],
) => (numbers.forEach(e => (l = ((l * e) / gcd(l, e)))), l))(Object.values(cl));

const pEnd = performance.now();

console.log("FEWEST BUTTON PRESSES: " + res);
console.log(pEnd - pStart);
