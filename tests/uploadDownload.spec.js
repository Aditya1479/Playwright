const excelJs = require("exceljs");
const test= require("@playwright/test")
const {expect} = require("@playwright/test");

async function writeExcelTest(searchText, replaceText,change, filePath) {
    const workbook = new excelJs.Workbook();
    await workbook.xlsx.readFile(filePath);

    const workSheet = workbook.getWorksheet("Sheet1");

    const output = await readExcel(workSheet, searchText);

    if (output.row === -1 || output.column === -1) {
        console.log("Search text not found in Excel:", searchText);
        return;
    }

    const cell = workSheet.getCell(output.row, output.column+change.colChange);
    cell.value = replaceText;

    await workbook.xlsx.writeFile(filePath);

    console.log("Excel updated successfully");
}

async function readExcel(workSheet, searchText) {
    let output = { row: -1, column: -1 };

    workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        });
    });

    return output;
}

//update the price to 350.
//writeExcelTest("Mango", 350,{rowChange:0,colChange:2}, "c:\\Users\\akunjir\\Downloads\\TestExcel.xlsx");

test("Upload download excel validation", async({page}) =>{
    const textSearch='Mango';
    const updateValue='350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downLoadPromise= page.waitForEvent('download');
    await page.locator("#downloadButton").click();
    await downLoadPromise;
    await writeExcelTest(textSearch, updateValue,{rowChange:0,colChange:2}, "c:\\Users\\akunjir\\Downloads\\download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("c:\\Users\\akunjir\\Downloads\\download.xlsx")
    const textLocator=page.getByText(textSearch);
    const desiredRow=await page.getByRole('row').filter({has:textLocator});
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
})