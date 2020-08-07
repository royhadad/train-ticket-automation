const sleep = require("./utils/sleep");
const puppeteer = require("puppeteer");

const exportFunc = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://google.com");

    await sleep(6000);
    await browser.close();
};

module.exports = exportFunc;
