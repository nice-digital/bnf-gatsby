Feature: Dental Practitioners’ Formulary page
  As a user of BNF
  I want to be able to use the BNF Dental Practitioners’ Formulary page

  Background:
    Given I open the Dental Practitioners’ Formulary page
    And I am using a desktop size browser

  Scenario: Detect desktop accessibility issues
    Then the page should have no accessibility issues

  Scenario: Detect mobile accessibility issues
    Given I am using a mobile size browser
    Then the page should have no accessibility issues

  Scenario: NICE breadcrumb
    When I click the NICE breadcrumb
    Then I expect that the url is "https://www.nice.org.uk/"

  Scenario: Homepage breadcrumb
    When I click the BNF breadcrumb
    Then I expect that the path is "/"

  Scenario: Heading text
    Then I expect that element "h1" matches the text "Dental Practitioners’ Formulary"
