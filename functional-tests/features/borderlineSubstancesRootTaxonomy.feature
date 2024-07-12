Feature: Borderline substances root taxonomy page
  As a user of BNF
  I want to be able to use a BNF borderline substances root taxonomy page

  Background:
    Given I open the home page
    Given I am using a desktop size browser
    And I open the flavour additives page

  Scenario: Desktop accessibility issues
    Then the page should have no accessibility issues

  Scenario: Mobile accessibility issues
    Given I am using a mobile size browser
    Then the page should have no accessibility issues

  Scenario: Heading text
    Then I expect that element "h1" matches the text "Flavour additives"

  Scenario: Link to flavour-additive-powders page
    When I click the "Flavour additive powders" link
    Then I expect that the path is "/borderline-substances/flavour-additives/flavour-additive-powders/"
