Feature: Wound management product page
  As a user of BNF
  I want to be able to use the BNF Wound management product page

  Background:
    Given I open the home page
    Given I am using a desktop size browser
    And I open the odour absorbent dressings page

  Scenario: Wound management root breadcrumb
    When I click the "Wound management products and elasticated garments" link
    Then I expect that the path is "/wound-management/"

  Scenario: Wound management taxonomy breadcrumb
    When I click the "Advanced wound dressings" link
    Then I expect that the path is "/wound-management/advanced-wound-dressings/"

  Scenario: Wound management taxonomy title link
    When I click the "View other advanced wound dressings" link
    Then I expect that the path is "/wound-management/advanced-wound-dressings/"

  Scenario: Heading text
    Then I expect that element "h1" matches the text "Odour absorbent dressings"

  Scenario Outline: <pageName> at <screenSize> accessibility issues
    Given I am using a <screenSize> size browser
    When I open the <pageName> page
    Then the page should have no accessibility issues
    Examples:
      | pageName                             | screenSize |
      | odour absorbent dressings            | mobile     |
      | odour absorbent dressings            | desktop    |
      | protease-modulating matrix dressings | mobile     |
      | protease-modulating matrix dressings | desktop    |
      | medicated bandages                   | mobile     |
      | medicated bandages                   | desktop    |
