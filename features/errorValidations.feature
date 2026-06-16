Feature: Ecommerce Validation

  @validation
  Scenario Outline: Placing the orders
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then verify Error message is displayed.
    Examples:
    |username                   | password|
    |Aditya123@gmail.com        |Aditya@3098|
    |Aditya1234@gmail.com       |aaaa@123   |