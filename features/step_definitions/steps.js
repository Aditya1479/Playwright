const {When,Then, Given }
    =require("@cucumber/cucumber")

const {expect} = require("@playwright/test")
//const { chromium } = require("@playwright");

Given('a login to Ecommerce application with {string} and {string}',{timeout:100*1000},async function (username,password) {
    // Write code here that turns the phrase above into concrete actions


    const products = this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo("https://rahulshettyacademy.com/client");
    await loginPage.validLogin(username, password);
});

When('Add {string} to cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
     this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in Cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions

    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});

When('Enter Valid Details and Place the Order', async function () {
    // Write code here that turns the phrase above into concrete actions
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});

Then('Verify Order is present in Order History',async function () {
    // Write code here that turns the phrase above into concrete actions
     await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
        await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await this.page.title())
        const userName=this.page.locator('#username')
        const passWord=this.page.locator('#password')
        const signInBtn=this.page.locator('#signInBtn')
        await userName.fill(username)
        await passWord.fill(password)
        await signInBtn.click()
});

Then('verify Error message is displayed.', async function () {
    // Write code here that turns the phrase above into concrete actions
        console.log(await this.page.locator("[style*='block']").textContent())
         await expect(this.page.locator("[style*='block']")).toContainText("Incorrect")
    });