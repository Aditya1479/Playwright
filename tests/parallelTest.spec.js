
const test= require("@playwright/test")

//test.describe.configure({mode:"parallel"})
test("first test case",async({page}) => {
    await console.log("test1")
})
test("second test case",async({page}) => {
    await console.log("test2")
})
test("third test case",async({page}) => {
    await console.log("test3")
})