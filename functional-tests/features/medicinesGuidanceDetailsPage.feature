Feature: Medicines guidance details pages
  As a user of BNF
  I want to be able to use the BNF medicines guidance pages

  Background:
    Given I am using a desktop size browser

  Scenario: Prescription writing heading
    When I open the prescription writing page
    Then I expect that element "h1" matches the text "Prescription writing"

  Scenario: Prescription writing left hand nav link
    When I open the prescription writing page
    And I click the "Guidance on prescribing" link
    Then I expect that the path is "/medicines-guidance/guidance-on-prescribing/"

  Scenario: Prescription writing medicines guidance breadcrumb
    Given I open the prescription writing page
    When I click the Medicines guidance breadcrumb
    Then I expect that the path is "/medicines-guidance/"

  Scenario Outline: <pageName> at <screenSize> accessibility issues
    Given I am using a <screenSize> size browser
    When I open the <pageName> page
    Then the page should have no accessibility issues
    Examples:
      | pageName                       | screenSize |
      | guidance on prescribing        | mobile     |
      | guidance on prescribing        | desktop    |
      | prescription writing           | mobile     |
      | prescription writing           | desktop    |
      | prescribing in dental practice | mobile     |
      | prescribing in dental practice | desktop    |
