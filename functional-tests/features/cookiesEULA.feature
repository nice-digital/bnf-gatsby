Feature: Cookies and EULA banner
  As a user of BNF
  I can toggle cookies preference option on and off
  I can toggle cookies website usage option on
  I can toggle cookies marketing advertising option on and off
  I want to reject cookies

  Background:
    Given I am using a desktop size browser

  Scenario: User toggle the preference cookies on and close banner
    Given I open the url "/"
    When I click preference cookies and toggle it on
    And I pause for 2000ms
    Then I close cookies banner
    Then I accept EULA banner terms
    Then I expect that element "h1" contains the text "British National Formulary"
    When I delete the cookie "CookieControl"
    When I delete the cookie "BNF-EULA-Accepted"

  Scenario: User toggle the website usage cookies on and close banner
    Given I open the url "/"
    When I click website usage cookies and toggle it on
    Then I close cookies banner
    Then I accept EULA banner terms
    Then I expect that element "h1" contains the text "British National Formulary"
    When I delete the cookie "CookieControl"
    When I delete the cookie "BNF-EULA-Accepted"

  Scenario: User toggle the marketing advertising cookies on and close banner
    Given I open the url "/"
    When I click marketing advertising cookies and toggle it on
    And I pause for 2000ms
    Then I close cookies banner
    Then I accept EULA banner terms
    Then I expect that element "h1" contains the text "British National Formulary"
    When I delete the cookie "CookieControl"
    When I delete the cookie "BNF-EULA-Accepted"

  Scenario: User toggle all cookies on and close banner
    Given I open the url "/"
    And I pause for 2000ms
    When I click preference cookies and toggle it on
    And I click website usage cookies and toggle it on
    When I click marketing advertising cookies and toggle it on
    And I pause for 2000ms
    Then I close cookies banner
    And I pause for 2000ms
    Then I accept EULA banner terms
    Then I expect that element "h1" contains the text "British National Formulary"
    When I delete the cookie "CookieControl"
    When I delete the cookie "BNF-EULA-Accepted"

  Scenario: User reject all cookies
    Given I open the url "/"
    When I reject cookies
    And I pause for 2000ms
    Then I accept EULA banner terms
    Then I expect that element "h1" contains the text "British National Formulary"
    When I delete the cookie "CookieControl"
    When I delete the cookie "BNF-EULA-Accepted"

  Scenario: User toggle cookies on and off
    Given I open the url "/"
    When I click preference cookies and toggle it on
    And I click website usage cookies and toggle it on
    When I click marketing advertising cookies and toggle it on
    And I pause for 2000ms
    When I click preference cookies and toggle it off
    And I click marketing advertising cookies and toggle it off
    And I pause for 2000ms
    Then I close cookies banner
    And I pause for 2000ms
    Then I accept EULA banner terms
    Then I expect that element "h1" contains the text "British National Formulary"
