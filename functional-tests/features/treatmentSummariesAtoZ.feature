Feature: Treatment summaries A to Z page
  As a use of BNF I can use the treatment summaries A to Z list page

  Background:
    Given I open the treatment summaries A to Z page
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
    Then I expect that element "h1" contains the text "Treatment summaries"

  Scenario: Click letter C
    When I click the "C" link
    Then I expect that the path is "/treatment-summaries/#c"

  Scenario: Link to Dementia treatment summary
    When I click the "Dementia" link
    Then I expect that the path is "/treatment-summaries/dementia/"

