Feature: Ecommerce Validation

  @validation
  Scenario: Placing the orders
    Given a login to Ecommerce2 application with "Aditya123@gmail.com" and "Aditya@3098"
    Then verify Error message is displayed.