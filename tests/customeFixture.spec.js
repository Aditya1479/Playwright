const{expect}=require("@playwright/test")
const { CustomeTest} = require("../utils/test-base");
const {POManager} = require('../pageobjects/POManager');

CustomeTest(" Client App login ", async ({page,testDataOrder}) => {
        const poManager = new POManager(page);
        const products = page.locator(".card-body");

        const loginPage = poManager.getLoginPage();
        await loginPage.goTo(testDataOrder.url);
        await loginPage.validLogin(testDataOrder.username, testDataOrder.password);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(testDataOrder.productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(testDataOrder.productName);
        await cartPage.Checkout();

        const ordersReviewPage = poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");
        const orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);

        await dashboardPage.navigateToOrders();

        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

    });








