const {LoginPage} = require('../pageObjects/LoginPage');
const {DashboardPage} = require('../pageObjects/DashboardPage');
const {OrdersHistoryPage} = require('../pageObjects/OrderHistoryPage');
const {OrdersReviewPage} = require('../pageObjects/OrderReviewPage');
const {CartPage} = require('../pageObjects/CartPage');

class POManager
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.cartPage = new CartPage(this.page);


    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }
    getOrdersHistoryPage()
    {
        return this.ordersHistoryPage;
    }

    getOrdersReviewPage()
    {
        return this.ordersReviewPage;
    }
}
module.exports = {POManager};