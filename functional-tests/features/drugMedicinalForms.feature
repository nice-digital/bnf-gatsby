Feature: Drug medicinal forms page
  As a use of BNF I can use drug medicinal forms pages

  Background:
    Given I open the abacavir medicinal forms page
    And I am using a desktop size browser

  Scenario: Detect desktop accessibility issues
    Then the page should have no accessibility issues

  Scenario: Detect mobile accessibility issues
    Given I am using a mobile size browser
    Then the page should have no accessibility issues

  Scenario: Heading text
    Then I expect that element "h1" contains the text "Medicinal forms"

  # Awkward pages/edge cases

  # Galantamine (no forms, just labels)
  Scenario: Detect desktop accessibility issues for galantamine
    When I open the galantamine medicinal forms page
    And I am using a desktop size browser
    Then the page should have no accessibility issues

  Scenario: Detect mobile accessibility issues for galantamine
    Given I am using a mobile size browser
    Then the page should have no accessibility issues

  # Galantamine (no forms, just labels)
  Scenario: Detect desktop accessibility issues for galantamine
    When I open the galantamine medicinal forms page
    And I am using a desktop size browser
    Then the page should have no accessibility issues

  Scenario: Detect mobile accessibility issues for galantamine
    Given I am using a mobile size browser
    Then the page should have no accessibility issues

  # Co-codamol (massive page)
  Scenario: Detect desktop accessibility issues for co-codamol
    When I open the co-codamol medicinal forms page
    And I am using a desktop size browser
    Then the page should have no accessibility issues

  Scenario: Detect mobile accessibility issues for co-codamol
    Given I am using a mobile size browser
    Then the page should have no accessibility issues

  # Abemaciclib (black triangle, cautionary labels)
  Scenario: Detect desktop accessibility issues for abemaciclib
    When I open the abemaciclib medicinal forms page
    And I am using a desktop size browser
    Then the page should have no accessibility issues

  Scenario: Detect mobile accessibility issues for abemaciclib
    Given I am using a mobile size browser
    Then the page should have no accessibility issues
