Feature: Drug details page
  As a use of BNF I can use drug details pages

  Background:
    Given I am using a desktop size browser

  Scenario: Detect desktop accessibility issues (abacavir)
    When I open the abacavir drug page
    Then the page should have no accessibility issues

  Scenario: Detect mobile accessibility issues (abacavir)
    Given I am using a mobile size browser
    When I open the abacavir drug page
    Then the page should have no accessibility issues

  Scenario: Detect accessibility issues (co-codamol with collapsed indications)
    When I open the co-codamol drug page
    Then the page should have no accessibility issues

  Scenario: NICE breadcrumb
    When I open the abacavir drug page
    And I click the NICE breadcrumb
    Then I expect that the url is "https://www.nice.org.uk/"

  Scenario: Homepage breadcrumb
    When I open the abacavir drug page
    And I click the BNF breadcrumb
    Then I expect that the path is "/"

  Scenario: Drugs breadcrumb
    When I open the abacavir drug page
    And I click the Drugs breadcrumb
    Then I expect that the path is "/drugs/"

  Scenario: Heading text
    When I open the abacavir drug page
    Then I expect that element "h1" matches the text "abacavir"
