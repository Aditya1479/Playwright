const { apiUtils } = require('../utils/apiUtils')
const { test, expect, request } = require("@playwright/test")

const loginPayload = {
    userEmail: "Aditya123@gmail.com",
    userPassword: "Aditya@3098"
}

const orderPayLoad = {
    orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }]
}

let response;
let apiContext;

test.beforeAll(async () => {

    apiContext = await request.newContext();

    const apiUtils1 = new apiUtils(apiContext, loginPayload);

    response = await apiUtils1.createOrder(orderPayLoad);

})

test("Api Test Cases", async ({ page }) => {

    await page.addInitScript((value) => {
        window.localStorage.setItem('token', value);
    }, response.token)

    const ordersBtn = 'ul [routerlink*=myorders]';

    await page.goto("https://rahulshettyacademy.com/client/");

    await page.locator(ordersBtn).click()

    await page.locator("tbody").waitFor()

    const rows = page.locator("tbody tr")

    for (let i = 0; i < await rows.count(); ++i) {

        const rowOrderID = await rows.nth(i).locator("th").textContent()

        if (response.orderID.includes(rowOrderID)) {

            await rows.nth(i).locator("button").first().click()

            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").first().textContent()

    expect(response.orderID.includes(orderIdDetails)).toBeTruthy()

})