Feature: About details pages
  As a user of BNF
  I want to be able to use the pages within the 'about' section

  Background:
    Given I am using a desktop size browser

  Scenario: See label on labels page
    When I open the labels page
    Then I expect to see label 1 (Warning: This medicine may make you sleepy)

  Scenario: Changes heading
    When I open the changes page
    Then I expect that element "h1" matches the text "Changes"

  Scenario: Changes left hand nav link
    When I open the changes page
    And I click the "Publication information" link
    Then I expect that the path is "/about/publication-information/"

  Scenario: Changes about breadcrumb
    Given I open the changes page
    When I click the About breadcrumb
    Then I expect that the path is "/about/"

  Scenario Outline: <pageName> at <screenSize> accessibility issues
    Given I am using a <screenSize> size browser
    When I open the <pageName> page
    When I wait on element "h1" to exist
    Then the page should have no accessibility issues
    Examples:
      | pageName                                    | screenSize |
      | abbreviations and symbols                   | mobile     |
      | abbreviations and symbols                   | desktop    |
      | approximate conversions and units           | mobile     |
      | approximate conversions and units           | desktop    |
      | guidance for cautionary and advisory labels | mobile     |
      | guidance for cautionary and advisory labels | desktop    |
      | labels                                      | mobile     |
      | labels                                      | desktop    |
      | changes                                     | mobile     |
      | changes                                     | desktop    |
