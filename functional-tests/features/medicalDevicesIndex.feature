Feature: Medical devices index page
  As a user of BNF
  I want to be able to use the BNF medical devices index page

  Background:
    Given I am using a desktop size browser
    And I open the medical devices page

  Scenario: Desktop accessibility issues
    Then the page should have no accessibility issues

  Scenario: Mobile accessibility issues
    Given I am using a mobile size browser
    Then the page should have no accessibility issues

  Scenario: Heading text
    Then I expect that element "h1" matches the text "Medical devices"

  Scenario: Link to artificial saliva products details page
    When I click the "Artificial saliva products" link
    Then I expect that the path is "/medical-devices/artificial-saliva-products/"
