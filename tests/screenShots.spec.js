const test= require("@playwright/test")
const {expect} = require("@playwright/test");

test("screenShots tests ", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path:"partialScreenshot.png"});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:"screenshot.png"});
    await expect(page.locator("#displayed-text")).toBeHidden();
})

test("Visual Testing with screenshot comparison", async ({page}) => {
    await page.goto("https://Google.com/");
    expect(await page.screenshot()).toMatchSnapshot("landingPage.png");
})