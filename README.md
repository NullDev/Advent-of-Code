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
3. Check out the template branch in your fork from my remote. (IF YOU SEE THIS: YOU ARE ON THE **CORRECT** BRANCH)<br>
$ `git checkout -b template origin/template` <br><br>
4. Push your newly created branch and make sure to set it as your default branch on GitHub (`REPO/settings/branches`). <br><br>
5. Install all dependencies by typing <br>
$ `npm install`<br><br>
6. Remove all years that weren't made by you (if all: `rm -r "./20*"`) and maybe alter the README<br><br>
7. Copy `config.template.json` and paste it as `config.json`<br><br>
8. Go to https://adventofcode.com/ and login with your account. Then copy the value from the `session` cookie and paste it into the `config.json` file (See [here](https://www.cookieyes.com/blog/how-to-check-cookies-on-your-website-manually/) if you don't know how).<br><br>
9. (OPTIONAL) If you wish to use the GitHub Action for the "Prepare Day automatically at 0:10 workflow" you need to go to your repository settings -> secrets -> actions and add `SESSION_COOKIE` with your session string. <br><br>

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

## :rocket: Benchmarks Preview

<p align="center"><img height="auto" width="100%" src="https://i.imgur.com/Z5ci7OS.png" /></p>

<hr>
