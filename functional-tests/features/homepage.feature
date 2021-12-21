Feature: Status page
  As a sample test hitting niceorg instead of BNF Gatsby just to prove tests are working

  Background:
    Given I open the home page

  Scenario: User can see page title
    Then I expect that element "h1" contains the text "NICE"
