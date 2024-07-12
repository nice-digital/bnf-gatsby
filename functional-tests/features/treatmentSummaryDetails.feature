Feature: Treatment summary details page
  As a use of BNF I can use treatment summary details pages

  Background:
    Given I open the home page
    And I am using a desktop size browser

  Scenario: NICE breadcrumb
    Given I open the dementia treatment summary page
    When I click the NICE breadcrumb
    Then I expect that the url is "https://www.nice.org.uk/"

  Scenario: Homepage breadcrumb
    Given I open the dementia treatment summary page
    When I click the BNF breadcrumb
    Then I expect that the path is "/"

  Scenario: Treatment summaries breadcrumb
    Given I open the dementia treatment summary page
    When I click the Treatment summaries breadcrumb
    Then I expect that the path is "/treatment-summaries/"

  Scenario: Heading text
    Given I open the dementia treatment summary page
    Then I expect that element "h1" matches the text "Dementia"

  Scenario Outline: <pageName> at <screenSize> accessibility issues
    Given I am using a <screenSize> size browser
    When I open the <pageName> page
    Then the page should have no accessibility issues
    Examples:
      | pageName                   | screenSize |
      | acne treatment summary     | mobile     |
      | acne treatment summary     | desktop    |
      | dementia treatment summary | mobile     |
      | dementia treatment summary | desktop    |
      | diabetes treatment summary | mobile     |
      | diabetes treatment summary | desktop    |

