const sleep = require("./utils/sleep");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const exportFunc = async () => {
    // consts
    const trainWebsiteUrl = "https://www.rail.co.il/";
    const yavneWestText = "יבנה מערב";
    const telAvivSvidorCenterText = "תל אביב - סבידור מרכז";
    const dateText = "09/08/2020";
    const timeRangeText = "08:00";
    const idNumber = "314620006";
    const email = "royhadad98@gmail.com";
    const phoneNumber = "0544970131";
    const gmailUrl = "https://mail.google.com/mail/u/0/#inbox";
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_PASSWORD;

    // launce
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(trainWebsiteUrl);

    // logic

    // search
    await page.focus('[aria-label="בחר תחנת מוצא"]');
    await page.keyboard.type(yavneWestText);
    await page.keyboard.press("Enter");

    await page.focus('[aria-label="בחר תחנת יעד"]');
    await page.keyboard.type(telAvivSvidorCenterText);
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
        document
            .querySelector('[ng-click="SetHourFrom(hoursFrom.select);"]')
            .click();
    });

    await page.evaluate(() => {
        const buttonsList = Array.from(document.querySelectorAll("button"));
        const searchButton = buttonsList.find(
            (item) => item.innerText === "חיפוש"
        );
        searchButton.click();
    });
    await page.waitForNavigation({ waitUntil: "networkidle0" });
    // select specific ride

    await page.evaluate(() => {
        const results = Array.from(
            document.querySelectorAll('[id^="railRadio_"]')
        );
        const selectedTrain = results.find((result) => {
            const exactTimeText = "08:12";

            const time = result.querySelector('[id^="timegoing_fwd_"]');
            const innerTimeHTML = Array.from(time.querySelectorAll(".hours"))[0]
                .innerHTML;
            const startIndex = innerTimeHTML.indexOf("</span>") + 7;
            const timeText = innerTimeHTML.slice(startIndex, startIndex + 5);
            return timeText === exactTimeText;
        });
        selectedTrain.querySelector("button.jerusalem-voucher").click();
    });
    await page.waitForNavigation({ waitUntil: "networkidle0" });

    // fill ticket order form
    await page.focus("input#card-number");
    await page.keyboard.type(`${idNumber}`);

    await page.focus("input#email-address");
    await page.keyboard.type(`${email}`);

    await page.focus("input#mobile");
    await page.keyboard.type(`${phoneNumber}`);

    await page.click("input#agree");

    await page.click('[ng-click="submitted=true;acceptInvitationFunc()"]');

    // get code from SMS

    const gmailPage = await browser.newPage();
    await gmailPage.goto(gmailUrl);

    await gmailPage.focus("input#identifierId");
    await gmailPage.keyboard.type(gmailUser);
    await page.keyboard.press("Enter");

    // // close
    // // await page.waitFor(6000);
    // // await browser.close();
};

module.exports = exportFunc;

// id mom 059269035
// email mom osih11@walla.co.il
