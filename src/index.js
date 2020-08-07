const sleep = require("./utils/sleep");
const puppeteer = require("puppeteer");

const exportFunc = async () => {
    // consts
    const trainWebsiteUrl = "https://www.rail.co.il/";
    const yavneWestText = "יבנה מערב";
    const telAvivSvidorCenterText = "תל אביב - סבידור מרכז";
    const dateText = "09/08/2020";
    const timeRangeText = "08:00";

    // launce
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(trainWebsiteUrl);

    // logic

    // search
    await page.focus('[aria-label="בחר תחנת מוצא"]');
    await page.keyboard.type(yavneWestText);
    // await sleep(2000);
    await page.keyboard.press("Enter");

    await page.focus('[aria-label="בחר תחנת יעד"]');
    await page.keyboard.type(telAvivSvidorCenterText);
    // await sleep(2000);
    await page.keyboard.press("Enter");

    await page.click('[aria-label="בחר תאריך ושעת יציאה לרכבת הלוך"]');

    await page.focus("#elemId_15");
    await page.keyboard.type(dateText);

    await page.click('[aria-label="בחר שעת יציאה"]');

    await page.evaluate(() => {
        const list = document.querySelector("#hoursSelectList-1");
        const listItems = Array.from(list.querySelectorAll("li > a"));
        const selectedTimeRangeElement = listItems.find(
            (item) => item.innerText === "08:00"
        );
        selectedTimeRangeElement.click();
    });

    await page.click(".CloseBtn");

    await page.evaluate(() => {
        const buttonsList = Array.from(document.querySelectorAll("button"));
        const searchButton = buttonsList.find(
            (item) => item.innerText === "חיפוש"
        );
        searchButton.click();
    });

    // select specific ride

    await page.evaluate(() => {
        const wrapper = document.querySelectorAll('[role="radiogroup"]');
        console.log(wrapper);
        // const rides = Array.from(
        //     wrapper.querySelectorAll("div.ng-binding.ng-scope")
        // );

        // console.log(rides);
    });

    // close
    // await page.waitFor(6000);
    // await browser.close();
};

module.exports = exportFunc;
