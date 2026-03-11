const {expect} = require("@playwright/test");

class OrderPage {

    constructor(page){
        this.page = page;
        this.creditCardNo = page.locator("div.field:has(> div:has-text('Credit Card Number')) > input");
        this.cvvCode = page.locator("div:has-text('CVV Code') + input");
        this.selectCountry = page.locator("[placeholder='Select Country']");
        this.userEmail = page.locator(".user__name input");
        this.placeOrderBtn = page.locator(".action__submit");
        this.dropDownResults = page.locator(".ta-results");
    }

    async fillOrderDetails(page,creditCardNo, cvvCode, countryName,userEmail){

        await this.creditCardNo.fill(creditCardNo);
        await this.cvvCode.fill(cvvCode);

        await this.selectCountry.pressSequentially("ind");

        await this.dropDownResults.waitFor();

        const optionsCount = await this.dropDownResults.locator("button").count();

        for(let i=0;i<optionsCount;i++){

            const text = await this.dropDownResults.locator("button").nth(i).textContent();

            if(text.trim() === countryName.trim()){
                await this.dropDownResults.locator("button").nth(i).click();
                break;
            }
        }

        // Wait for overlay to disappear
        //await this.page.locator(".ta-backdrop").waitFor({ state: "hidden" });
        await this.userEmail.first().fill(userEmail)
        await  expect(page.locator(".user__name label")).toHaveText(userEmail);
    }

    async submitOrder(){
        await this.placeOrderBtn.click();
    }
}

module.exports = { OrderPage };