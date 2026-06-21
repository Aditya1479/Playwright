Q. waitforurl and different types of wait with real example in playwright?
URL changes after action	        waitForURL()
Traditional page navigation	        waitForLoadState('networkidle/domcontentloaded/load')
API call completion	                waitForResponse()
File download	                    waitForEvent('download')
Popup window	                    waitForEvent('popup')

Q.headless: true,
    true- browser will run in background
    false-  browser will visible

Q. frame and framelocator difference in playwright with real world example
									Feature	Frame												FrameLocator
What is it?							Actual iframe object										Locator for iframe
How to get it?						page.frame()												page.frameLocator()
Similar to							Page object													Locator object
Auto-waiting						Less convenient												Full locator auto-waiting
Recommended							When you need frame APIs									For most UI automation
Modern Playwright					Less used													Preferred

Q. different techniques of parallel run in playwright and cross browser
		1. Playwright runs test files in parallel using worker processes playwright.config.js.
		2.Parallel Within a Single Describe Block all test, all test present in single file will run parallely
			e.g test.describe.configure({
				mode: 'parallel'
				});
		workers										Run multiple test files in parallel
		fullyParallel								Run all tests in parallel
		describe.configure({ mode: 'parallel' })	Parallel tests within a describe block
		describe.configure({ mode: 'serial' })		Sequential dependent tests
		--shard=x/y									Split tests across machines
		projects									Cross-browser execution
		--workers=n									Control concurrency from CLI
		Multiple projects + workers					Browser matrix parallel execution

Q what are the different types of locators in playwright?
	1. page.getByRole('button', { name: 'Login' }); (Recommended)
	2. page.getByText('Sign In');
	3. page.getByLabel('Email');
	4. page.getByPlaceholder('Enter username');
	5. page.getByAltText('Company Logo');
	6. page.getByTestId('login-btn');

Q. How do you handle alerts in playwright
Playwright handles browser dialogs using the page.on('dialog') event listener.

I can validate the dialog message using dialog.message() and perform actions using dialog.accept() or dialog.dismiss() depending on the dialog type. For prompt dialogs, I can also pass input values through dialog.accept('value').

await page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept();
});

await page.click('#alertBtn');
This approach supports alert, confirm, prompt, and beforeunload dialogs.

Q. How do you upload files in Playwright?
		await page.locator('#fileInput').setInputFiles('sample.pdf');

Q.   How do you download files in Playwright?
 const downloadPromise = page.waitForEvent('download');
await page.click('Download');

const download =await downloadPromise;

await download.saveAs('file.pdf');

Q. list of assertions
	1. toBe()= exact match
			expect(statusCode).toBe(200);
	2.	toEqual()= Object/Array Comparison
			expect(userDetails).toEqual(expectedUserDetails);
	3.	toContain()= partial match
			expect(message).toContain("Success");
	4.	toBeTruthy
			expect(isDisplayed).toBeTruthy();
	5.  toBeFalsy
			expect(isErrorDisplayed).toBeFalsy();
IMP	6.	toBeVisible = Most Commmonly used.
			await expect(page.getByRole('button',{name:'Login'})).toBeVisib();
	7. 	toBeHidden()
			await expect(locator).toBeHidden();
	8.	toBeEnabled()
			await expect(locator).toBeEnabled();
	9.	toBeDisabled()
			await expect(locator).toBeDisabled();
	10.	toBeChecked()
			await expect(locator).toBeChecked();
IMP	11.	toHaveText()
			await expect(locator).toHaveText("Welcome Aditya");
IMP	12.	toContainText()
			await expect(locator).toContainText("Hello Aditya");
	13. toHaveValue()
			await expect(locator).toHaveValue()
	14. toHaveAttribute()
			await expect(locator).toHaveAttribute("type","submit");
IMP	15.	toHaveURL()
			await expect(page).toHaveURL("xyz)
	16.	toHaveTitle()
			await expect(page).toHaveTitle("abc")
	17.	toHaveCount()
			await expect(page.locator("product")).toHaveCount(6)
	18.	expect(response.status()).toBe(200);
	19.	expect(responseBody.userName).toBe("Aditya");
	20.	expect(responseBody.message).toContain("Success");


Q. how to handle new page in Playwright
	const [newPage]= await Promise.all([
		context.waitForEvent('page')
		page.locator(locator).click()
	]);

Q. How to Handle pop up
	const [popup]= await promise.all([
		page.waitForEvent('popup')
		page.locator(locator).click()
		page.locator(locator).accept()
	])

Q. How to Handle alerts.
	page.on(async dialog => {
		await dialog.accept();
	})

Q. How to download files from browser
	await [download] = await Promise.all([
		page.waitForEvent('download')
		page.click('#download-')
	])
	await download.saveAs('downloads/abc.pdf')

Q.	how to upload the files.
	await page.setInputFile('uploadButton','filePath')

Q. how to you handle excel files.
	import * as XLSX from 'xlsx'
	const workbook= XLSX.readFile('filePath')
	const sheet =	workbook.Sheets[sheetName/sheetIndex]
	const data	=XLSX.utils.sheet_to_json(sheet);
	console.log(data)

Q. How do you handle json file
	using direct import or using fs library
	######Read the JSON########
	import fs from 'fs'
	const data = JSON.parse(fs.readFilesync('data.json'),'utf8')
	######write the JSON######
	const result= {status:'pass', time:'2s'}
	fs.writeFileSync('output/result.json', JSON.stringify(result,null,2));

Q.  How do you handle dynamic and delayed elements?
    1.playwright automatically waits for element to be visible using autowait
    2. waitForURL()
    3.await expect(page.locator('xyz')).toBeVisible();
    4.await page.waitForLoadState('networkIdle')
    5.explicit wait for specific element with state + timeout
        await page.locator('locator').waitFor({state:'visible', timeout:1000});

Q. what are fixtures in playwright?
    1. built in fixtures: page, browser, context.
    2. custome fixture
        creating custome fixture by extending the test 
    e.g 
        import {test as base} from '@playwright/test'
        export const test = base.extend({
            loggedInPage= async ({page},use) => {
            await page.goto('/login')
            await use(page)
        )   

Q.  what is testInfo and testError objects?
    testInfo()=> provides metadata and runtime details of a test 
    testError()=> provides details when a test fails and is accessed via testinfo.error
    testInfo/testError objets use at inside beforeEach and afterEach hooks to get the tests details 
    and for handling error and debugging

Q. How do you share data across your tests?
    how do you handle data driven tests?
    how do you paramterised tests?
    1. using test.describe() with external JSON/Excel testdata files
    2. we can use fixtures and parameterized tests
    3. fixture
    e.g 1
        const dataset= JSON.parse(JSON.stringify(require("../utils/placeOrderTestData.json")));
        for(const data of dataset)
        {
        test(`@Web Client App login ${data.productName}`, async ({page}) => {
        const poManager = new POManager(page);
        const products = page.locator(".card-body");
    e.g 2
        test.describe.each(dataset)

Q	how do you handle table elemenst in playwright.
	e.g
	Employee	Role	Status		Action
	Aditya	QA			Active		Edit
	Rahul	Dev			Active		Edit
	Amit	Manager		Inactive	Edit


	Click Edit for "Rahul"
		const row = page.locator('tr').
		filter({has: page.locator('td', {
			hasText: 'Rahul'
			})
		});

	await row.getByRole('button', {
		name: 'Edit'
	}).click();


/////////////////////////////////////SDET//////////////////////////////

Q. What is common status code in postman?

200 - OK
201 - Created
204 - No Content
400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
500 - Internal Server Error

Q. Jenkins
	Using 2 ways we can provide trigger the jenkins job
		A. WebHooks
		when a developer pushes code to github, webhook can auto trigger the JOB

		B. SCM pooling

	A.1 How to configure WebHOOK?
		select the trigger option as webHook and open github repo> setting>webhook
		and configure the URL( localhots URL wont work we can use ngrock to change the URL)
Q	Jenkins trigger argument (*****)
	MINUTE 		HOUR 		DOM    	MONTH 		DOW
	0-59		0-23		1-31	1-12		0-7