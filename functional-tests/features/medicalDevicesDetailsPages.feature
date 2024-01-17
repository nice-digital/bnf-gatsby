Feature: Medical devices details page
  As a user of BNF
  I want to be able to use the BNF medical devices details page

  Background:
    Given I am using a desktop size browser

  Scenario: AS Saliva Orthana® spray left hand nav link
    When I open the AS Saliva Orthana® lozenges page
    And I click the "BioXtra® gel" link
    Then I expect that the path is "/medical-devices/artificial-saliva-products/bioxtra-gel/"

  Scenario: Medical device breadcrumb breadcrumb
    Given I open the AS Saliva Orthana® lozenges page
    When I click the Artificial saliva products breadcrumb
    Then I expect that the path is "/medical-devices/artificial-saliva-products/"

  Scenario: Medical devices index breadcrumb
    Given I open the AS Saliva Orthana® lozenges page
    When I click the Medical devices breadcrumb
    Then I expect that the path is "/medical-devices/"

  Scenario Outline: <pageName> at <screenSize> accessibility issues
    Given I am using a <screenSize> size browser
    When I open the <pageName> page
    Then the page should have no accessibility issues
    Examples:
      | pageName                     | screenSize |
      | artificial saliva products   | mobile     |
      | artificial saliva products   | desktop    |
      | AS Saliva Orthana® lozenges  | mobile     |
      | AS Saliva Orthana® lozenges  | desktop    |
      | spacers                      | mobile     |
      | spacers                      | mobile     |
      | urine protein testing strips | desktop    |
      | urine protein testing strips | desktop    |
