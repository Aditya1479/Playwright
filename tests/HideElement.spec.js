const {test,expect}= require('@playwright/test');

test('Hide Element test case', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice');
    await expect(page.locator('.displayed-class')).toBeVisible()
    await page.locator("#hide-textbox").click()
    await expect(page.locator('.displayed-class')).toBeHidden()

})