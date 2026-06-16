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
		1. Playwright runs test files in parallel using worker processes 	playwright.config.js.
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
