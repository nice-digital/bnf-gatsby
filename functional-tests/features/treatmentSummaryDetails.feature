Feature: Treatment summary details page
  As a use of BNF I can use treatment summary details pages

  Background:
    Given I open the dementia treatment summary page
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

  Scenario: Treatment summaries breadcrumb
    When I click the Treatment summaries breadcrumb
    Then I expect that the path is "/treatment-summaries/"

  Scenario: Heading text
    Then I expect that element "h1" matches the text "Dementia"

  Scenario: On this page jump link to section
    When I click the "Useful resources" link
    Then I expect that element "h2#useful-resources" matches the text "Useful resources"

