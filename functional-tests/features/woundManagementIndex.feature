Feature: Wound management index page
  As a user of BNF
  I want to be able to use the BNF Wound management index page

  Background:
    Given I am using a desktop size browser
    And I open the wound management page

  Scenario: Desktop accessibility issues
    Then the page should have no accessibility issues

  Scenario: Mobile accessibility issues
    Given I am using a mobile size browser
    Then the page should have no accessibility issues

  Scenario: Heading text
    Then I expect that element "h1" matches the text "Wound management products and elasticated garments"

  Scenario: Sub-navigation links
    When I click the "Antimicrobial dressings" link
    Then I expect that the path is "/wound-management/antimicrobial-dressings/"

  Scenario: In-page links adapted from the feed
    When I click the "Vapour-permeable films and membranes" link
    Then I expect that the path is "/wound-management/advanced-wound-dressings/#vapour-permeable-films-and-membranes"
