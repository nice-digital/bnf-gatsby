Feature: Search Page
  As a user of BNF
  I want to be able to use the BNF Search Page

  Background:
    Given I have a screen that is 1366 by 768 pixels


  Scenario: Search for cancer from the homepage
    Given I open the home page
    When I search for cancer
    Then I expect to see search results for cancer

  Scenario: Detect accessibility issues
    When I open the search page
    Then the page should have no accessibility issues

  Scenario: Detect mobile accessibility issues
    Given I have a screen that is 320 by 568 pixels
    And I open the search page
    Then the page should have no accessibility issues

  Scenario: 15 search results per page
    When I view the search results page for cancer
    Then I expect to see a list of 15 search results

  Scenario: Total number of results
    When I view the search results page for cancer
# Then I expect to see 544 total search results for cancer
