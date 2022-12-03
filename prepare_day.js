"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

const fs = require("node:fs");

const fetch = require("node-fetch").default;
const cheerio = require("cheerio");
const {exec} = require("child_process");

let year;
let day;
let session;

// get session from args in case we run via GH action
if (!!process.argv[3]) session = process.argv[3];
else {
    try {
        session = require("./config.json").session;
    }
    catch (e) {
        console.log("No config.json found! Copy-paste config.template.json to config.json and fill in your session cookie!");
        process.exit(1);
    }

    if (!session){
        console.log("No session cookie found! Fill in your session cookie in config.json!");
        process.exit(1);
    }
}

const date = process.argv[2];
if (!date || date === "today"){
    const now = new Date();
    const y = now.getFullYear();
    const d = now.getDate();

    year = String(y);
    day = String(d);
}

else {
    [year, day] = date.split("-");
}

if ((!year || !day) || (isNaN(Number(year)) || isNaN(Number(day)))){
    console.error("Invalid year-day specified!");
    process.exit(1);
}

console.log(`Preparing ${year}-${day}...`);

const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
    cookie: `session=${session};`,
};

(async() => {
    const markup = await fetch(`https://adventofcode.com/${year}/day/${day}`, { headers }).then(res => res.text());

    const $ = cheerio.load(markup);

    $("span").remove();
    $("pre em, pre code").each((_, el) => {
        $(el).replaceWith($(el).text());
    });

    $("a").each((_, el) => {
        $(el).removeAttr("target");
        $(el).removeAttr("class");
        $(el).removeAttr("style");
        $(el).removeAttr("id");
    });

    const res = [...$("body > main > article.day-desc")].map(el => {
        const article = $(el).html()?.trim() ?? "";

        let sanitized = article.replace(/(<\/li>)|(<ul>)|(<\/ul>)/g, "")
            .replace(/<li>/g, "- ")
            .replace(/(<h2>)|(<h2 id="part2">)/g, "## ")
            .replace(/<\/h2>/g, "\n")
            .replace(/<code><em>/g, "**`")
            .replace(/<\/em><\/code>/g, "`**")
            .replace(/(<code>)|(<\/code>)/g, "`")
            .replace(/<pre>/g, "```\n")
            .replace(/<\/pre>/g, "```")
            .replace(/(<em>)|(<em class=".*">)|(<\/em>)/g, "**")
            .replace(/(<p>)|(<\/p>)/g, "\n")
            .replace(/\n{3,}/g, "\n\n");

        sanitized.match(/<a href=".*?">.*?<\/a>/g)?.forEach(link => {
            const [, href, text] = link.match(/<a href="(.+?)">(.+?)<\/a>/) ?? [];
            const regex = new RegExp(String(link.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")).trim(), "gi");

            sanitized = sanitized.replace(regex, `[${text}](${href.replace(/&amp;/g, "&")})`);
        });

        return sanitized;
    });

    const result = `Link: <https://adventofcode.com/${year}/${day}/2> <br>
Author: Eric Wastl ([@ericwastl](https://twitter.com/ericwastl)) (${year})

---

` + res[0] + (!!res[1] ? ("\n---\n\n" + res[1]) : "");

    const dir = `./${year}/Day_${day.padStart(2, "0")}`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(`${dir}/README.md`, result, { flag: "w" });

    const input = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, { headers }).then(res => res.text());

    fs.writeFileSync(`${dir}/input.txt`, input, { flag: "w" });

    const CODE = `"use strict";

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\\n"); // change this if necessary

const pStart = performance.now();

//
// YOUR CODE HERE
//
const result = "...";

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
`;

    if (!fs.existsSync(`${dir}/part_1.js`)) fs.writeFileSync(`${dir}/part_1.js`, CODE);
    if (!fs.existsSync(`${dir}/part_2.js`)) fs.writeFileSync(`${dir}/part_2.js`, CODE);
    exec(`git add ${dir}/*`)
})();
