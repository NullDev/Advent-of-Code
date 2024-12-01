#!/usr/bin/node
import fs from "node:fs/promises";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

if (await fs.stat("./config/config.custom.js").catch(() => false)){
    console.log("Config file already exists. Skipping...");
    process.exit(0);
}
await fs.copyFile("./config/config.template.js", "./config/config.custom.js");
