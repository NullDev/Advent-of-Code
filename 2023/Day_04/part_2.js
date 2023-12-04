"use strict";

/* eslint-disable no-sequences */

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const result = INPUT
    .map(line => ({
        e: line.match(/^Card +\d+:\s+((?:\d+\s+)+)\|((?:\s+\d+)+)$/)
            ?.map(numbers => numbers.trim().split(/\s+/g).map(Number)),
        cc: 1,
    })).map(({e, cc}, index, cards) => (mc => (cards.slice(index + 1, index + 1 + mc)
        .forEach(card => (card.cc += cc)), cc))((e && e[2].filter(f => e[1].includes(f)).length) || 0),
    ).reduce((a, b) => a + b, 0);

const pEnd = performance.now();

console.log("NUMBER OF SCRATCHCARDS: " + result);
console.log(pEnd - pStart);
