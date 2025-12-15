# :christmas_tree: Advent-of-Code

<p align="center"><img height="250" width="auto" src="https://i.imgur.com/1zABhbB.png" /></p>
<p align="center"><b>My solutions for the Advent of Code in JS (Bun)</b></p>
<p align="center"><sub>And some of my [Codewars](./codewars) solutions I really like :3</sub></p>
<hr>

## :information_source: About Advent of Code

Each day consists of two puzzles. <br>
I added a README.md file to each Day, which contains the instructions exactly as they were displayed on https://adventofcode.com/

<hr>

## :bulb: How to use this repository

### :wrench: Initial Setup

0. Open up your favourite terminal (and navigate somewhere you want to download the repository to). <br><br>
1. Make sure you have Bun installed (>= v1.3.0). Test by entering <br>
$ `bun -v` <br>
If this returns a version number, Bun is installed. **If not**, get Bun <a href="https://bun.sh/">here</a>. <br><br>
2. Clone the repository and navigate to it.<br>
$ `git clone https://github.com/NullDev/Advent-of-Code.git && cd Advent-of-Code` <br><br>
3. Install all dependencies by typing <br>
$ `bun install`<br><br>
4. Remove all years that weren't made by you (if all: `rm -r "./20*"`) and maybe alter the README<br><br>
5. Copy `config.template.json` and paste it as `config.json`<br><br>
6. Go to https://adventofcode.com/ and login with your account. Then copy the value from the `session` cookie and paste it into the `config.json` file (See [here](https://www.cookieyes.com/blog/how-to-check-cookies-on-your-website-manually/) if you don't know how).<br><br>
7. (OPTIONAL) If you wish to use the GitHub Action for the "Prepare Day automatically at 0:10 workflow" you need to go to your repository settings -> secrets -> actions and add `SESSION_COOKIE` with your session string. <br><br>

### :sunny: Starting a new day

- To automatically setup and prepare the current day, simply type `bun run prepare-today`
  - If you finished part one and want to get the readme updated, simple run the command again.
- Optionally, to prepare a previous day, type `bun prepare_day.js YEAR-DAY`- Example: `bun prepare_day.js 2020-12`

Both of those commands will create a folder for the day/year, fetch the task from the website & convert it to a README.md, fetch the input and create template files for the solution.

### :rocket: Running benchmarks 

Each script can be run stand-alone / separatly but I've also created a `start_all.js` script to launch all days in order, and display the solutions along with an approximated benchmark (the benchmark uses [`performance.now()`](https://nodejs.org/api/perf_hooks.html#perf_hooks_performance_now) to measure the execution time and **does not include the actual reading of the file** except when the file is read line-by-line).

- Run all years: `bun run start:all`
- Run a specific year: `bun run start:YEAR`- Example: `bun run start:2020`
- Run a specific year and day: `bun run start:YEAR DAY`- Example: `bun run start:2020 3`
- Run todays parts: `bun run start:today`
- Run a specific day & part: `bun YEAR/DAY/part_[1 OR 2].js`- Example: `bun 2020/01/part_2.js`

<hr>

## :scroll: License

- All Puzzles & Inputs (`Day_XX/README.md`'s and `Day_XX/input.txt`'s) Copyright (c) Eric Wastl ([@ericwastl](https://twitter.com/ericwastl))
- All Puzzle Solutions[^1] (`Day_XX/part_1.js`'s and `Day_XX/part_2.js`'s) Copyright (c) NullDev ([nulldev.org](https://nulldev.org))

[^1]: Unless otherwise noted in the Code

<hr>

## :trophy: Goal

I attempted to solve every problem as functional as possible and with as little code as possible while still being performant. <br>
Some solutions could be one-liners¹ but I left them splitted up for the sake of readability. 

<sub>¹: One-Liner as in one semantical instruction (e.g. chained higher order functions. putting semicolons in one line does not count)</sub>

I also tried to experiment with a couple of different things:

**2019**: <a name="best-2019"></a>

- Single-Liner in [Day_01/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2019/Day_01/part_1.js)
- Single-Liner on Day 04 in both [part_1](https://github.com/NullDev/Advent-of-Code/blob/master/2019/Day_04/part_1.js) and [part_2](https://github.com/NullDev/Advent-of-Code/blob/master/2019/Day_04/part_2.js)

**2020**: <a name="best-2020"></a>

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
- Theoretical (_almost_) one-liner in [Day_20/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2020/Day_20/part_1.js)
- The final one-liner in [Day_25/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2020/Day_25/part_1.js)

**2021**: <a name="best-2021"></a>

- Single-Liner on Day 01 in both [part_1](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_01/part_1.js) and [part_2](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_01/part_2.js)
- Solution in `O(n)` on Day 06 in both [part_1](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_06/part_1.js) and [part_2](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_06/part_2.js) (See the [Note](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_06/part_1.js#L16-L33))
- Single-Liner on Day 07 in both [part_1](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_07/part_1.js) and [part_2](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_07/part_2.js) by using a [formula transformation](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_07/part_2.js#L18-L21)
- Single-Liner in [Day_08/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_08/part_1.js)
- Another Single-Liner in [Day_09/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_09/part_1.js)
- Theoretical (almost) Single-Liner in [Day_10/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_10/part_2.js)
- Single-Liner in [Day_13/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_13/part_1.js)
- Single-Liner in [Day_17/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_17/part_1.js)
- Singe-Liner in [Day_21/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_21/part_1.js)
- Recursive IIFE in [Day_21/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_21/part_2.js)
- Single-Liners & IIFE's on Day 22 in both [part_1](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_22/part_1.js) and [part_2](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_22/part_2.js)

**2022** <a name="best-2022"></a>

- Pretty straight forward one-liners in both [Day_01/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2022/Day_01/part_1.js) and [Day_01/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2022/Day_01/part_2.js)
- Another one-liner in both [Day_04/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2022/Day_04/part_1.js) and [Day_04/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2022/Day_04/part_2.js)
- Yet another one-line solution in both [Day_06/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2022/Day_06/part_1.js) and [Day_06/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2022/Day_06/part_2.js)

**2023** <a name="best-2023"></a>

- One-Liner in [Day_01/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2023/Day_01/part_1.js)
- One-Liner in both [Day_02/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2023/Day_02/part_1.js) and [Day_02/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2023/Day_02/part_2.js)
- One-Liner in both [Day_04/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2023/Day_04/part_1.js) and [Day_04/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2023/Day_04/part_2.js)
- One-Liner in [Day_06/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2023/Day_06/part_1.js)
- One-Liner in both [Day_11/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2023/Day_11/part_1.js) and [Day_11/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2023/Day_11/part_2.js)
- One-Liner in both [Day_12/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2023/Day_12/part_1.js) and [Day_12/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2023/Day_12/part_2.js)
- One-Liner in both [Day_13/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2023/Day_13/part_1.js) and [Day_13/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2023/Day_13/part_2.js) - both using Binary Matrices
- One-Liner in [Day_14/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2023/Day_14/part_1.js)
- One-Liner in both [Day_15/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2023/Day_15/part_1.js) and [Day_15/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2023/Day_15/part_2.js)
- One-Liner in [Day_24/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2023/Day_24/part_1.js)
- Sending a system of linear equations to SageMath because I'm lazy in [Day_24/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2023/Day_24/part_2.js)

**2024** <a name="best-2024"></a>

- One-Liner in both [Day_02/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_02/part_1.js) and [Day_02/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_02/part_2.js)
- One-Liner in both [Day_03/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_03/part_1.js) and [Day_03/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_03/part_2.js)
- One-Liner in both [Day_04/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_04/part_1.js) and [Day_04/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_04/part_2.js)
- One-Liner in [Day_05/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_05/part_1.js)
- Dependency Graph with topological sorting _almost_ One-Liner in [Day_05/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_05/part_2.js)
- One-Liner in [Day_06/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_06/part_1.js)
- One-Liner in [Day_07/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_07/part_1.js)
- [DFS](https://en.wikipedia.org/wiki/Depth-first_search) with Memoization in [Day_07/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_07/part_2.js)
- One-Liner in both [Day_08/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_08/part_1.js) and [Day_08/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_08/part_2.js)
- _Almost_ One-Liner [DFS](https://en.wikipedia.org/wiki/Depth-first_search) in both [Day_10/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_10/part_1.js) and [Day_10/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_10/part_2.js)
- Recursive memoized _almost_ One-Liner in [Day_11/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_11/part_1.js) and [Day_11/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_11/part_2.js)
- One-Liner in both [Day_13/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_13/part_1.js) and [Day_13/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_13/part_2.js)
- One-Liner in [Day_14/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_14/part_1.js)
- Sloppy, hacky, small, quick & dirty dijkstra in [Day_16/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_16/part_1.js)
- _Almost_ One-Liner [BFS](https://en.wikipedia.org/wiki/Breadth-first_search) in [Day_18/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_18/part_1.js)
- [DP](https://en.wikipedia.org/wiki/Dynamic_programming) One-Liner with memoization in both [Day_19/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_19/part_1.js) and [Day_19/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_19/part_2.js)
- One-Liner in [Day_23/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_23/part_1.js)
- Single-Line [Bron–Kerbosch algorithm](https://en.wikipedia.org/wiki/Bron%E2%80%93Kerbosch_algorithm) in [Day_23/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_23/part_2.js)
- Final One-Liner in [Day_25/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2024/Day_25/part_1.js)

**2025** <a name="best-2025"></a>

- One-Liner in both [Day_01/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2025/Day_01/part_1.js) and [Day_01/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2025/Day_01/part_2.js)
- One-Liner in both [Day_02/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2025/Day_02/part_1.js) and [Day_02/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2025/Day_02/part_2.js)
- One-Liner in both [Day_03/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2025/Day_03/part_1.js) and [Day_03/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2025/Day_03/part_2.js)
- Cursed One-Liners in both [Day_04/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2025/Day_04/part_1.js) and [Day_04/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2025/Day_04/part_2.js) ([Curried](https://en.wikipedia.org/wiki/Currying) recursive anonymous [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE))
- One-Liner in both [Day_05/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2025/Day_05/part_1.js) and [Day_05/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2025/Day_05/part_2.js)
- Very cursed One-Liner in both [Day_06/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2025/Day_06/part_1.js) and [Day_06/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2025/Day_06/part_2.js)
- One-Liner in both [Day_08/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2025/Day_08/part_1.js) and [Day_08/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2025/Day_08/part_2.js)
- One-Liner in [Day_09/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2025/Day_09/part_1.js)

<hr>

## :rocket: Benchmarks Preview

<p align="center"><img height="auto" width="100%" src="https://i.imgur.com/Z5ci7OS.png" /></p>

<hr>

## :star: Yay

![image](https://user-images.githubusercontent.com/22935000/147389049-3b1c9830-28d8-45e5-968c-7375f133accc.png)

<hr>
