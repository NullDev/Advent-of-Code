import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/* eslint-disable one-var */

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("");

const pStart = performance.now();

const res = INPUT
    .flatMap((bc, i) => Array.from({ length: Number(bc) }, () => (i % 2 ? "." : i / 2))) // @ts-ignore
    .reduce((_, __, idx, arr) => {
        if (idx === 0){
            const fileBlockCount = arr.filter((blk) => blk !== ".").length; // @ts-ignore
            let left = arr.indexOf("."), right = arr.findLastIndex(blk => blk !== ".");
            while (left < fileBlockCount){
                if (arr[left] !== "."){
                    left++;
                    continue;
                }
                if (arr[right] === "."){
                    right--;
                    continue;
                } // @ts-ignore
                [arr[left], arr[right]] = [arr[right], arr[left]];
            }
        }
        return arr;
    }, []) // @ts-ignore
    .reduce((total, nxId, i) => total + (nxId === "." ? 0 : nxId * i), 0);

const pEnd = performance.now();

console.log("FS CHECKSUM: " + res);
console.log(pEnd - pStart);
