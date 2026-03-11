const base  = require("@playwright/test");

exports.CustomeTest = base.extend({
    testDataOrder: {
        username: "Aditya123@gmail.com",
        password: "Aditya@3098",
        productName: "ZARA COAT 3",
        url: "https://rahulshettyacademy.com/client"
    },
    testDataOrder1:
{
    username : "akunjir98@gmail.com",
    password: "Sdet@3098",
    productName :"ADIDAS ORIGINAL",
    url: "https://rahulshettyacademy.com/client"
}
});