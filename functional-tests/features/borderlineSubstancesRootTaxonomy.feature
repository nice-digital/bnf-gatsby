Feature: Borderline substances root taxonomy page
  As a user of BNF
  I want to be able to use a BNF borderline substances root taxonomy page

  Background:
    Given I am using a desktop size browser
    And I open the feed supplements page

  Scenario: Desktop accessibility issues
    Then the page should have no accessibility issues

  Scenario: Mobile accessibility issues
    Given I am using a mobile size browser
    Then the page should have no accessibility issues

  Scenario: Heading text
    Then I expect that element "h1" matches the text "Feed supplements"

  Scenario: Link to high-fibre supplements page
    When I click the "High-fibre supplements" link
    Then I expect that the path is "/borderline-substances/high-fibre-supplements/"
