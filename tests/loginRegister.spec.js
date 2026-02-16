const test= require('@playwright/test');
const {expect} = require("@playwright/test");
test("Rahul Shetty Login", async ({page})=> {
    // const context=await browser.newContext()
    // const page= await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/")
    // await page.locator('a.btn1').click()
    // await page.locator('#firstName').fill('Aditya')
    // await page.locator('#lastName').fill('kunjir')
    // await page.locator('#userEmail').fill('Aditya123@gmail.com')
    // await page.locator('#userMobile').fill('8080987205')
    // await page.locator('#userPassword').fill('Aditya@3098')
    // await page.locator('#confirmPassword').fill('Aditya@3098')
    // await page.locator('input[type="checkbox"]').check()
    // await page.locator('#login').click()
    const ordersBtn='ul [routerlink*=myorders]';
    const email='Aditya123@gmail.com';
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    const cartBtn = page.locator("[routerlink*='cart']");
    await page.locator('#userEmail').fill(email)
    await page.locator('#userPassword').fill('Aditya@3098')
    await page.locator('#login').click()
    await page.waitForLoadState('networkidle') //will wait for all network call till idle state
    await page.locator(".card-body b").first().waitFor()
    const title = await page.locator('.card-body b').allTextContents()
    console.log(title)
    const addToCart = page.locator("button:has-text('Add To Cart')")
    const count = await products.count()
    for (let i = 0; i < count; ++i) {

        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click()
            break;
        }

    }
    await cartBtn.click()
    await page.locator("div li").first().waitFor()
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click()
    const creditCard = await page.locator("div.field:has(> div:has-text('Credit Card Number')) > input")
    await creditCard.fill('4542 9931 9292 1111');
    await page.locator("div:has-text('CVV Code') + input").fill('306')
    await page.locator("[placeholder='Select Country']").pressSequentially("ind")
    const dropdown = await page.locator(".ta-results")
    await dropdown.waitFor()
    const optionsCount =await dropdown.locator("button").count()
    for (let i = 0; i < optionsCount; ++i)
    {
        const text= await dropdown.locator("button").nth(i).textContent()
            if(text ===' India'){
               await dropdown.locator("button").nth(i).click()
                break;
            }
    }
    await page.locator(".user__name input").first().fill(email)

    // const actualName= await page.locator(".user__name label").textContent()
    await  expect(page.locator(".user__name label")).toHaveText(email);
    await page.locator('.action__submit').click()
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
    const orderID=await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    console.log(orderID)
    await page.locator(ordersBtn).click()
    await page.locator("tbody").waitFor()
    const rows = await page.locator("tbody tr")


    for(let i=0;i<await rows.count();++i)
    {
        const rowOrderID= await rows.nth(i).locator("th").textContent()
        if(orderID.includes(rowOrderID)){
            await rows.nth(i).locator("button").first().click()
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").first().textContent()
    expect(orderID.includes(orderIdDetails)).toBeTruthy();
})