const test= require('@playwright/test');
const {expect} = require("@playwright/test");
test.only("Rahul Shetty Login", async ({page})=> {
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
    const productName='ZARA COAT 3';
    const products= page.locator(".card-body");
    const cartBtn=page.locator("[routerlink*='cart']");
    await page.locator('#userEmail').fill('Aditya123@gmail.com')
    await page.locator('#userPassword').fill('Aditya@3098')
    await page.locator('#login').click()
    await page.waitForLoadState('networkidle') //will wait for all network call till idle state
    await page.locator(".card-body b").first().waitFor()
    const title= await page.locator('.card-body b').allTextContents()
    console.log(title)
    const addToCart= page.locator("button:has-text('Add To Cart')")
    const count= await products.count()
    for(let i=0;i<count; ++i){

             if(await products.nth(i).locator("b").textContent() === productName){
                 await  products.nth(i).locator("text= Add To Cart").click()
                 break;
             }

    }
    await cartBtn.click()
    await page.pause()
})