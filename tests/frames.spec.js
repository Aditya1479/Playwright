const {test,expect}= require("@playwright/test");

test("Frames tests", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice");
    const framePage= page.frameLocator("#courses-iframe")
    await framePage.locator("li a[href*='lifetime-access']:visible").click();

})