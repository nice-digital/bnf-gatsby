Feature: Interactions details page
  As a use of BNF I can use interactions details pages

  Background:
    Given I open the abacavir interactions page
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

  Scenario: Interactions breadcrumb
    When I click the Interactions breadcrumb
    Then I expect that the path is "/interactions/"

  Scenario: Heading text
    Then I expect that element "h1" contains the text "Interactions"

  Scenario: Link to matching drug monograph
    When I click the "View Abacavir monograph page" link
    Then I expect that the path is "/drugs/abacavir/"

  Scenario: Link to interactant
    When I click the "Carbamazepine" link
    Then I expect that the path is "/drugs/carbamazepine/"

  Scenario: Link to introduction page
    When I click the "Find out more about BNF interactions information" link
    Then I expect that the path is "/interactions/appendix-1-interactions/"
