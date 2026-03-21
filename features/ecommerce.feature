Feature: Ecommerce Validation

  Scenario: Placing the orders
    Given a login to Ecommerce application with "Aditya123@gmail.com" and "Aditya@3098"
    When Add "ADIDAS ORIGINAL" to cart
    Then Verify "ADIDAS ORIGINAL" is displayed in Cart
    When Enter Valid Details and Place the Order
    Then Verify Order is present in Order History