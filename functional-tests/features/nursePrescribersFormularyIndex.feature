Feature: Nurse prescribers formulary index page
  As a user of BNF
  I want to be able to use the BNF nurse prescribers formulary index page

  Background:
    Given I am using a desktop size browser
    And I open the nurse prescribers formulary page

  Scenario: Desktop accessibility issues
    Then the page should have no accessibility issues

  Scenario: Mobile accessibility issues
    Given I am using a mobile size browser
    Then the page should have no accessibility issues

  Scenario: Heading text
    Then I expect that element "h1" matches the text "Nurse Prescribers' Formulary"

  Scenario: Link to approved drugs list on index page
    When I click the "Approved list for prescribing by Community Practitioner Nurse Prescribers (NPF)" link
    Then I expect that the path is "/nurse-prescribers-formulary/approved-list-for-prescribing-by-community-practitioner-nurse-prescribers-npf/"

  Scenario: Link to analgesics treatment summary on index page
    When I click the "Analgesics" link
    Then I expect that the path is "/nurse-prescribers-formulary/analgesics/"
