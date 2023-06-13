Feature: Wound management taxonomy page
  As a user of BNF
  I want to be able to use the BNF Wound management taxonomy page

  Background:
    Given I am using a desktop size browser
    And I open the advanced wound dressings page

  Scenario: Wound management root breadcrumb
    When I click the "Wound management products and elasticated garments" link
    Then I expect that the path is "/wound-management/"

  Scenario: Heading text
    Then I expect that element "h1" matches the text "Advanced wound dressings"

  Scenario: Sub-navigation links
    When I click the "Antimicrobial dressings" link
    Then I expect that the path is "/wound-management/antimicrobial-dressings/"

  Scenario: In-page links to product pages
    When I click the "Polyurethane matrix dressings" link
    Then I expect that the path is "/wound-management/advanced-wound-dressings/polyurethane-matrix-dressings/"

  Scenario Outline: <pageName> at <screenSize> accessibility issues
    Given I am using a <screenSize> size browser
    When I open the <pageName> page
    Then the page should have no accessibility issues
    Examples:
      | pageName                  | screenSize |
      | advanced wound dressings  | mobile     |
      | advanced wound dressings  | desktop    |
      | antimicrobial dressings   | mobile     |
      | antimicrobial dressings   | desktop    |
      | complex adjunct therapies | mobile     |
      | complex adjunct therapies | desktop    |
      | bandages                  | mobile     |
      | bandages                  | desktop    |
