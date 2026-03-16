const { apiUtils } = require('../utils/apiUtils')
const { test, expect, request } = require("@playwright/test")
const {json} = require("node:stream/consumers");
const fakePayLoadOrders={
    data:[],
    message:"No Product in Cart"
}
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

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/698475bcc941646b7ad6cef5",
        async route =>{
            //Intercepting the API- response>{Plawright->FakeResponse} browser>render the data in frontend
            const response= await page.request.fetch(route.request())
            //(page.request it is API testing Helper will go into API mode and fetch(route.request()) will fetch the response

            let body= JSON.stringify(fakePayLoadOrders);
            //converted JS object in JSON using JSON method.
           await route.fulfill({
                response,
                body,
                //In the body variable we stored our fakePayLoadOrders and it will be override.
            })
        })

    await page.locator(ordersBtn).click()
    console.log(await page.locator(".mt-4").textContent())
    //await page.locator("button[routerlink*='myoders']").click()

})