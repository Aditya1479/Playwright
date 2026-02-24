const test= require('@playwright/test');
const {expect} = require("@playwright/test");
test("Rahul Shetty Login", async ({page})=> {
    await page.goto("https://rahulshettyacademy.com/client/")
    const ordersBtn='ul [routerlink*=myorders]';
    const email='Aditya123@gmail.com';
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    const cartBtn = page.locator("[routerlink*='cart']");
    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder('enter your passsword').fill('Aditya@3098');
    await page.getByRole('button',{name:'login'}).click();
    await page.waitForLoadState('networkidle') //will wait for all network call till idle state
    await page.locator(".card-body b").first().waitFor()
    const title = await page.locator('.card-body b').allTextContents()
    console.log(title)
    const addToCart = page.locator("button:has-text('Add To Cart')")
    const count = await products.count()
    await page.locator(".card-body").filter({hasText:productName}).getByRole("button",{name:'Add To Cart'}).click()
    await page.getByRole("listitem").getByRole('button',{name:'Cart'}).click()
    await expect(page.getByText('ZARA COAT 3')).toBeVisible();
    await page.getByRole("button",{name:"Checkout"}).click()
    const creditCard = await page.locator("div.field:has(> div:has-text('Credit Card Number')) > input")
    await creditCard.fill('4542 9931 9292 1111');
    await page.locator("div:has-text('CVV Code') + input").fill('306')
    await page.getByPlaceholder("Select Country").pressSequentially("ind")

    await page.getByRole("button",{name:"India"}).nth(1).click()


    await page.locator(".user__name input").first().fill(email)

    // const actualName= await page.locator(".user__name label").textContent()
    await  expect(page.locator(".user__name label")).toHaveText(email);
    await page.getByText("PLACE ORDER").click()
    await expect(page.getByText("Thankyou for the order.")).toBeVisible()


    //This needs to be updated according to getBy locator methods
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