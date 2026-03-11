const excelJs = require("exceljs");

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
writeExcelTest("Mango", 350,{rowChange:0,colChange:2}, "c:\\Users\\akunjir\\Downloads\\TestExcel.xlsx");