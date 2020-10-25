const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const removeOldBundle = (sandboxDir) => {
  const sandboxFiles = fs.readdirSync(sandboxDir);
  const unremovable = ["index.html", "prepare.js"];
  sandboxFiles.forEach((file) => {
    if (!unremovable.includes(file)) {
      const filepath = path.resolve(__dirname, `./${file}`);
      fs.unlinkSync(filepath);
    }
  });
};

const prepare = () => {
  const distPath = path.resolve(__dirname, "../dist");
  const htmlPath = path.resolve(__dirname, "./index.html");
  const sandboxPath = path.resolve(__dirname);
  removeOldBundle(sandboxPath);
  const bundleName = fs
    .readdirSync(distPath)
    .filter((filename) => filename.slice(-3) === ".js")[0];
  const sandboxHtml = fs.readFileSync(htmlPath, "utf-8");
  const $ = cheerio.load(sandboxHtml);
  $(".wrapper").empty();
  $(".wrapper").append(`<script id="widget" src="${bundleName}"></script>`);
  fs.writeFileSync(htmlPath, $.html());
  fs.copyFileSync(`${distPath}/${bundleName}`, `${sandboxPath}/${bundleName}`);
};

prepare();
