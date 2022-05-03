Feature: Wound management product page
  As a user of BNF
  I want to be able to use the BNF Wound management product page

  Background:
    Given I am using a desktop size browser
    And I open the odour absorbent dressings page

  Scenario: Desktop accessibility issues
    Then the page should have no accessibility issues

  Scenario: Mobile accessibility issues
    Given I am using a mobile size browser
    Then the page should have no accessibility issues

  Scenario: Heading text
    Then I expect that element "h1" matches the text "Odour absorbent dressings"
