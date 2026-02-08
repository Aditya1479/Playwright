const {test,expect}= require('@playwright/test');

test('Browser context Test Case ',async ({browser}) =>
    {
        //JS is asynchronous so for each steps you need to call await to wait for current step
        //should be executed completely then next step should be start.
        //await will be only activated when you set the async keyword before function()
        //{browser} it is fixture to interact with browser, fixture are nothing but global variables which are
        // accessible throughout in your project
        const context= await browser.newContext() //it will open fresh browser it wont share cookies/cache to other browsers
        const page= await context.newPage(); //launches fresh page/tab in browser
        //await will be only activated when you set the async keyword before function)
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title())
        const username=page.locator('#username')
        const password=page.locator('#password')
        const signInBtn=page.locator('#signInBtn')
        const cardTitle=page.locator(".card-body a")
        await username.fill("AdityaKunjir")
        await password.fill("Adk@223@123")
        await signInBtn.click()
        console.log(await page.locator("[style*='block']").textContent())
        await expect(page.locator("[style*='block']")).toContainText("Incorrect")
        await username.fill("") //will remove written statement
        await username.fill("rahulshettyacademy")
        await password.fill("Learning@830$3mK2")
        await signInBtn.click()
        // console.log(await cardTitle.nth(0).textContent());
        // console.log(await cardTitle.first().textContent());
        const allTitle= await cardTitle.allTextContents()
        console.log(allTitle)
       await expect(page.locator(".card-body a")).toContainText(allTitle)
        
    }
);

test('Page test case ', async ({page}) => {
    await page.goto("https://google.com");
    //get a title of web page and pu a assertion
    await page.title()
    console.log(await page.title())

})

test('Handled ALl UI Controls' , async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const username=page.locator('#username')
    const password=page.locator('#password')
    const signInBtn=page.locator('#signInBtn')
    const blinkingText= page.locator("a[href*='documents']");
    const dropdown= page.locator('select[class=\'form-control\']')
    await dropdown.selectOption('consult');
    //await page.pause()
    await page.locator('#usertype').last().check()
    console.log(page.locator('#usertype').last().isChecked())
    await page.locator('#okayBtn').click()
    await  expect(page.locator('#usertype').last()).toBeChecked()
    await page.locator('#terms').click()
    await  expect(page.locator('#terms')).toBeChecked()
    await page.locator('#terms').uncheck()
    expect( await page.locator('#terms').isChecked()).toBeFalsy()
    await expect(blinkingText).toHaveAttribute("class","blinkingText")


})

test('Child window Handling' , async ({browser}) => {
    const context= await browser.newContext() //it will open fresh browser it wont share cookies/cache to other browsers
    const page= await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const username=page.locator('#username');
    const blinkingText= page.locator("a[href*='documents']");
    const [newPage] =await Promise.all([
        context.waitForEvent('page'),
        blinkingText.click(),
    ])
    const text= await newPage.locator("[class='im-para red']").textContent()
    const arrayText= text.split("@")
    const domainName = arrayText[1].split(" ")[0]
    //console.log(domainName)

    await page.locator("#username").fill(domainName);
    //await page.pause()
    console.log(await page.locator("#username").inputValue());
})