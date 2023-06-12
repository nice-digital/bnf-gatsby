Feature: Interactions A to Z page
  As a use of BNF I can use the interactions A to Z list page

  Background:
    Given I open the interactions A to Z page
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
    Then I expect that element "h1" contains the text "Interactions"

  Scenario: Click letter C
    When I click the "C" link
    Then I expect that the path is "/interactions/#c"

  Scenario: Link to Cabazitaxel interaction
    When I click the "Cabazitaxel [Specialist drug]" link
    Then I expect that the path is "/interactions/cabazitaxel-specialist-drug/"

