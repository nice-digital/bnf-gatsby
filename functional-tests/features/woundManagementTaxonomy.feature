Feature: Wound management taxonomy page
  As a user of BNF
  I want to be able to use the BNF Wound management taxonomy page

  Background:
    Given I am using a desktop size browser
    And I open the advanced wound dressings page

  Scenario: Desktop accessibility issues
    Then the page should have no accessibility issues

  Scenario: Mobile accessibility issues
    Given I am using a mobile size browser
    Then the page should have no accessibility issues

  Scenario: Heading text
    Then I expect that element "h1" matches the text "Advanced wound dressings"