Feature: Nurse prescribers formulary treatment summaries pages
  As a user of BNF
  I want to be able to use the BNF nurse prescribers treatment summaries pages

  Background:
    Given I am using a desktop size browser

  Scenario: Laxatives heading
    When I open the laxatives page
    Then I expect that element "h1" matches the text "Laxatives"

  Scenario: Laxatives left hand nav link
    When I open the laxatives page
    And I click the "Local anaesthetics" link
    Then I expect that the path is "/nurse-prescribers-formulary/local-anaesthetics/"

  Scenario: Laxatives breadcrumb
    Given I open the laxatives page
    When I click the Nurse Prescribers' Formulary breadcrumb
    Then I expect that the path is "/nurse-prescribers-formulary/"

  Scenario Outline: <pageName> at <screenSize> accessibility issues
    Given I am using a <screenSize> size browser
    When I open the <pageName> page
    Then the page should have no accessibility issues
    Examples:
      | pageName           | screenSize |
      | laxatives          | mobile     |
      | laxatives          | desktop    |
      | general guidance   | mobile     |
      | general guidance   | desktop    |
      | local anaesthetics | mobile     |
      | local anaesthetics | desktop    |
