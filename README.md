# :christmas_tree: Advent-of-Code

<p align="center"><img height="250" width="auto" src="https://i.imgur.com/1zABhbB.png" /></p>
<p align="center"><b>My solutions for the Advent of Code in NodeJS</b></p>
<hr>

## :information_source: About Advent of Code

Each day consists of two puzzles. <br>
I added a README.md file to each Day, which contains the instructions exactly as they were displayed on https://adventofcode.com/

<hr>

## :bulb: How to use this repository

### :wrench: Initial Setup

0. Open up your favourite terminal (and navigate somewhere you want to download the repository to). <br><br>
1. Make sure you have NodeJS installed. Test by entering <br>
$ `node -v` <br>
If this returns a version number, NodeJS is installed. **If not**, get NodeJS <a href="https://nodejs.org/en/download/package-manager/">here</a>. <br><br>
2. Clone the repository and navigate to it.<br>
$ `git clone https://github.com/NullDev/Advent-of-Code.git && cd Advent-of-Code` <br><br>
3. Check out the template branch in your fork from my remote. (IF YOU SEE THIS: YOU ARE ON THE **WRONG** BRANCH)<br>
$ `git checkout -b template origin/template` <br><br>
4. Install all dependencies by typing <br>
$ `npm install`<br><br>
5. Remove all years that weren't made by you (if all: `rm -r "./20*"`) and maybe alter the README<br><br>
6. Copy `config.template.json` and paste it as `config.json`<br><br>
7. Go to https://adventofcode.com/ and login with your account. Then copy the value from the `session` cookie and paste it into the `config.json` file (See [here](https://www.cookieyes.com/blog/how-to-check-cookies-on-your-website-manually/) if you don't know how).<br><br>
8. (OPTIONAL) If you wish to use the GitHub Action for the "Prepare Day automatically at 0:10 workflow" you need to go to your repository settings -> secrets -> actions and add `SESSION_COOKIE` with your session string. <br><br>

### :sunny: Starting a new day

- To automatically setup and prepare the current day, simply type `npm run prepare-today`
  - If you finished part one and want to get the readme updated, simple run the command again.
- Optionally, to prepare a previous day, type `node prepare_day.js YEAR-DAY`- Example: `node prepare_day.js 2020-12`

Both of those commands will create a folder for the day/year, fetch the task from the website & convert it to a README.md, fetch the input and create template files for the solution.

### :rocket: Running benchmarks 

Each script can be run stand-alone / separatly but I've also created a `start_all.js` script to launch all days in order, and display the solutions along with an approximated benchmark (the benchmark uses [`performance.now()`](https://nodejs.org/api/perf_hooks.html#perf_hooks_performance_now) to measure the execution time and **does not include the actual reading of the file** except when the file is read line-by-line).

- Run all years: `npm run start:all`
- Run a specific year: `npm run start:YEAR`- Example: `npm run start:2020`
- Run a specific day & part: `node YEAR/DAY/part_[1 OR 2].js`- Example: `node 2020/01/part_2.js`

<hr>

## :trophy: Goal

I attempted to solve every problem as functional as possible and with as little code as possible while still being performant. <br>
Some solutions could be one-liners but I left them splitted up for the sake of readability. 

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
- Theoretical (almost) SIngle-Liner in [Day_10/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_10/part_2.js)
- Single-Liner in [Day_13/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_13/part_1.js)
- Single-Liner in [Day_17/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_17/part_1.js)
- Singe-Liner in [Day_21/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_21/part_1.js)
- Recursive IIFE in [Day_21/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_21/part_2.js)
- Single-Liners & IIFE's on Day 22 in both [part_1](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_22/part_1.js) and [part_2](https://github.com/NullDev/Advent-of-Code/blob/master/2021/Day_22/part_2.js)

**2022** <a name="best-2022"></a>

- Pretty straight forward one-liners in both [Day_01/part_1.js](https://github.com/NullDev/Advent-of-Code/blob/master/2022/Day_01/part_1.js) and [Day_01/part_2.js](https://github.com/NullDev/Advent-of-Code/blob/master/2022/Day_01/part_2.js)

<hr>

## :rocket: Benchmarks Preview

<p align="center"><img height="auto" width="100%" src="https://i.imgur.com/Z5ci7OS.png" /></p>

<hr>

## :star: Yay

![image](https://user-images.githubusercontent.com/22935000/147389049-3b1c9830-28d8-45e5-968c-7375f133accc.png)

<hr>
