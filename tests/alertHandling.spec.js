const {test,expect}= require('@playwright/test')

test("Alert Handling test cases", async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice")

    page.on('dialog',dialog => dialog.accept())
    await page.locator("#confirmbtn").click()
    await page.locator("#mousehover").hover()
})