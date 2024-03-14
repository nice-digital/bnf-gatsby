Feature: Borderline substance page
  As a user of BNF
  I want to be able to use a BNF borderline substance page

  Background:
    Given I am using a desktop size browser
    And I open the cystic fibrosis page

  # These throw up false positives for colour contrast on the accordion, there seems to be some interaction with the footer with the automatic scrolling. Or possibly related to https://github.com/dequelabs/axe-core/issues/2958 although that's for nesting an anchor inside a summary, rather than nested details elements.

  # Scenario: Desktop accessibility issues
  #   Then the page should have no accessibility issues

  # Scenario: Mobile accessibility issues
  #   Given I am using a mobile size browser
  #   Then the page should have no accessibility issues

  Scenario: NICE breadcrumb
    When I open the cystic fibrosis page
    And I click the NICE breadcrumb
    Then I expect that the url is "https://www.nice.org.uk/"

  Scenario: Homepage breadcrumb
    When I open the cystic fibrosis page
    And I click the BNF breadcrumb
    Then I expect that the path is "/"

  Scenario: Borderline substances breadcrumb
    When I open the cystic fibrosis page
    And I click the Borderline substances breadcrumb
    Then I expect that the path is "/borderline-substances/"

  Scenario: Heading text
    Then I expect that element "h1" contains the text "Cystic fibrosis"

  Scenario: Link to other vitamin and mineral supplements page
    When I click the "View other vitamin and mineral supplements" link
    Then I expect that the path is "/borderline-substances/vitamin-and-mineral-supplements/"
