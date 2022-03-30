Feature: Drug medicinal forms page
  As a use of BNF I can use drug medicinal forms pages

  Background:
    Given I open the abacavir medicinal forms page
    And I am using a desktop size browser

  Scenario: Heading text
    Then I expect that element "h1" contains the text "Medicinal forms"

  # Checking for accessiblity issues in awkward edge cases:
  # - Galantamine (no forms, just labels)
  # - Abemaciclib (black triangle, cautionary labels)
  Scenario Outline: <pageName> at <screenSize> accessibility issues
    Given I am using a <screenSize> size browser
    When I open the <pageName> page
    Then the page should have no accessibility issues
    Examples:
      | pageName                    | screenSize |
      | galantamine medicinal forms | mobile     |
      | galantamine medicinal forms | desktop    |
      | abemaciclib medicinal forms | mobile     |
      | abemaciclib medicinal forms | desktop    |
