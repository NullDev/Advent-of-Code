"use strict";

const fs = require("node:fs");

const fetch = require("node-fetch").default;
const cheerio = require("cheerio");

const date = process.argv[2];
if (!date){
    console.error("No year-day specified!");
    process.exit(1);
}

const [year, day] = date.split("-");
if (!year || !day){
    console.error("Invalid year-day specified!");
    process.exit(1);
}

(async() => {
    const markup = await fetch(`https://adventofcode.com/${year}/day/${day}`, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
        },
    }).then(res => res.text());

    const $ = cheerio.load(markup);

    $("span").remove();
    $("pre em, pre code").each((_, el) => {
        $(el).replaceWith($(el).text());
    });

    const article = String($("body > main > article.day-desc").html()).trim();
    console.log(article);

    const sanitized = article.replace(/(<\/li>)|(<\/h2>)|(<ul>)|(<\/ul>)/g, "")
        .replace(/<li>/g, "- ")
        .replace(/<h2>/g, "## ")
        .replace(/(<code>)|(<\/code>)/g, "`")
        .replace(/(<pre>)|(<\/pre>)/g, "```")
        .replace(/(<em>)|(<\/em>)/g, "**")
        .replace(/(<p>)|(<\/p>)/g, "\n");

    const links = sanitized.match(/<a href="([^"]+)">([^<]+)<\/a>/g);
    if (!!links && links.length){
        links.forEach(link => {
            const res = link.match(/<a href="([^"]+)">([^<]+)<\/a>/);
            if (!res || res.length < 3) return;
            const [, href, text] = res;
            sanitized.replace(link, `[${text}](${href})`);
        });
    }

    const result = `Link: <https://adventofcode.com/${year}/${day}/2> <br>
Author: Eric Wastl ([@ericwastl](https://twitter.com/ericwastl)) (${year})

---

` + sanitized;

    const dir = `./X/${year}/day_${day.padStart(2, "0")}`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(`${dir}/README.md`, result, { flag: "w" });
})();
