Feature: Ecommerce Validation

  @Regression
  Scenario: Placing the orders
    Given a login to Ecommerce application with "Aditya123@gmail.com" and "Aditya@3098"
    When Add "ADIDAS ORIGINAL" to cart
    Then Verify "ADIDAS ORIGINAL" is displayed in Cart
    When Enter Valid Details and Place the Order
    Then Verify Order is present in Order History

  @validation
  Scenario Outline: Placing the orders
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then verify Error message is displayed.
    Examples:
      |username                   | password|
      |Aditya123@gmail.com        |Aditya@3098|
      |Aditya1234@gmail.com       |aaaa@123   |