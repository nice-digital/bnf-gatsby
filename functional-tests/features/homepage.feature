Feature: Home page
  As a use of BNF I can use the homepage

  Background:
    Given I open the home page

  Scenario: User can see page title
    Then I expect that element "h1" contains the text "British National Formulary"
