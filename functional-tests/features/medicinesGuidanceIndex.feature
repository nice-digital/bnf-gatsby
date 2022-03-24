Feature: Medicines guidance index page
  As a user of BNF
  I want to be able to use the BNF medicines guidance idnex page

  Background:
    Given I am using a desktop size browser
    And I open the medicines guidance page

  Scenario: Desktop accessibility issues
    Then the page should have no accessibility issues

  Scenario: Mobile accessibility issues
    Given I am using a mobile size browser
    Then the page should have no accessibility issues

  Scenario: Heading text
    Then I expect that element "h1" matches the text "Medicines guidance"

  Scenario: Link to guidance on prescribing details page
    When I click the "Guidance on prescribing" link
    Then I expect that the path is "/medicines-guidance/guidance-on-prescribing/"
