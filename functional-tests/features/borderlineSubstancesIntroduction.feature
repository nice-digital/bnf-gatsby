Feature: Borderline substances introduction page
  As a user of BNF
  I want to be able to use the BNF borderline substances introduction page

  Background:
    Given I am using a desktop size browser
    And I open the borderline substances page

  Scenario: Desktop accessibility issues
    Then the page should have no accessibility issues

  Scenario: Mobile accessibility issues
    Given I am using a mobile size browser
    Then the page should have no accessibility issues

  Scenario: Heading text
    Then I expect that element "h1" matches the text "Borderline substances"

  Scenario: Link to feed supplements page
    When I click the "Feed supplements" link
    Then I expect that the path is "/borderline-substances/feed-supplements/"
