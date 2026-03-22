const {POManager} = require("../../pageObjects/POManager");
const playwright=require("@playwright/test")
const {After, Before, BeforeStep, AfterStep} =require( "@cucumber/cucumber");

Before(async function () {
    const browser = await playwright.chromium.launch({headless:false})
    const context = await browser.newContext()
     this.page = await context.newPage();
    this.poManager = new POManager(this.page);
})

After(function (){
    console.log("I am last to execute")
})

BeforeStep(function (){

})

AfterStep(async function ({result}){
    if(result.status ===  'FAILED'){
      await  this.page.screenshot({path:"failed.png"})
    }
})