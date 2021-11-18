# :christmas_tree: Advent-of-Code-2020

<p align="center"><img height="250" width="auto" src="https://i.imgur.com/1zABhbB.png" /></p>
<p align="center"><b>My solutions for the Advent of Code 2020 in NodeJS</b></p>
<hr>

## :information_source: About Advent of Code

Each day consists of two puzzles. <br>
I added a README.md file to each Day, which contains the instructions exactly as they were displayed on https://adventofcode.com/

<hr>

## :trophy: Goal

I attempted to solve every problem as functional as possible and with as little code as possible while still being performant. <br>
Some solutions could be one-liners but I left them splitted up for the sake of readability. 

I also tried to experiment with a couple of different things:

**2020**:

- Solution with logical XOR-ing in [Day_02/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2020/Day_02/part_2.js)
- Theoretical single-liner (single chain function) in [Day_04/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2020/Day_04/part_1.js)
- Completely branchless approach in [Day_04/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2020/Day_04/part_2.js)
- Another theoretical single-liner in [Day_06/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2020/Day_06/part_1.js) and [Day_06/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2020/Day_06/part_2.js)
- Recursive curried function in [Day_07/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2020/Day_07/part_1.js)
- Another theoretical one-liner in [Day_10/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2020/Day_10/part_1.js)
- More branchless solutions in [Day_12/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2020/Day_12/part_1.js) and [Day_12/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2020/Day_12/part_2.js)
- Yet another single-liner in [Day_13/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2020/Day_13/part_1.js)
- Experiment with bit-shift, bitwise operations and bigint numbers in [Day_14/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2020/Day_14/part_2.js)
- Another theoretical one-liner in [Day_16/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2020/Day_16/part_1.js)
- Recursive [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) arrow function to minimize code in [Day_17/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2020/Day_17/part_1.js)
- Theoretical one-liner by utilizing the [Lambda calculus Y-combinator](https://en.wikipedia.org/wiki/Fixed-point_combinator#Fixed-point_combinators_in_lambda_calculus) with an [recursive anonymous arrow function](http://kestas.kuliukas.com/YCombinatorExplained/) in [Day_18/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2020/Day_18/part_1.js)
- Theoretical (_almost_) one-liner in [Day_20/part_1](https://github.com/NullDev/Advent-of-Code/blob/master/2020/Day_20/part_1.js)
- The final one-liner in [Day_25/part_1](https://github.com/NullDev/Advent-of-Code/blob/master/2020/Day_25/part_1.js)

**2021**:

_TBA_

<hr>

## :rocket: Launching all solutions with benchmark

Each script can be run stand-alone / separatly but I've also created a `start_all.js` script to launch all days in order, and display the solutions along with an approximated benchmark (the benchmark uses [`performance.now()`](https://nodejs.org/api/perf_hooks.html#perf_hooks_performance_now) to measure the execution time and **does not include the actual reading of the file** except when the file is read line-by-line).

No dependencies needed. Just launch the script by executing `npm start:2020`, `npm start:2021` or `npm start:all`.

Preview:

<p align="center"><img height="auto" width="100%" src="https://i.imgur.com/Z5ci7OS.png" /></p>

<hr>
