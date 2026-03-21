Feature: Ecommerce Validation

  Scenario: Placing the orders
    Given a login to Ecommerce application with "Aditya123@gmail.com" and "Aditya@3098"
    When Add "ADIDAS ORIGINAL 1" to cart
    Then Verify "ADIDAS ORIGINAL 1" is displayed in Cart
    When Enter Valid Details and Place the Order
    Then Verify Order is present in Order History