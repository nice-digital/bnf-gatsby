Feature: Drug medicinal forms page
  As a use of BNF I can use drug medicinal forms pages

  Background:
    Given I open the abacavir medicinal forms page
    And I am using a desktop size browser

  Scenario: Detect desktop accessibility issues
    Then the page should have no accessibility issues

  Scenario: Detect mobile accessibility issues
    Given I am using a mobile size browser
    Then the page should have no accessibility issues

  Scenario: Heading text
    Then I expect that element "h1" contains the text "Medicinal forms"
