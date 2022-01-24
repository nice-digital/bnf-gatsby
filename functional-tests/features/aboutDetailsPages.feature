Feature: About details pages
  As a user of BNF
  I want to be able to use the pages within the 'about' section

  Background:
    Given I am using a desktop size browser

  Scenario: See label on labels page
    When I open the labels page
    Then I expect to see label 1 (Warning: This medicine may make you sleepy)

  # TODO: remove this comment and @pending when there isn't duplicate content in the feed
  @pending
  Scenario: 'Changes' page desktop accessibility
    When I open the changes page
    Then the page should have no accessibility issues

  # TODO: remove this comment and @pending when there isn't duplicate content in the feed
  @pending
  Scenario: 'Changes' page mobile accessibility
    Given I am using a mobile size browser
    When I open the changes page
    Then the page should have no accessibility issues

  Scenario: 'Labels' page desktop accessibility
    When I open the labels page
    Then the page should have no accessibility issues

  Scenario: 'Labels' page mobile accessibility
    Given I am using a mobile size browser
    When I open the labels page
    Then the page should have no accessibility issues

  # TODO: remove this comment and @pending when there isn't duplicate content in the feed
  @pending
  Scenario: 'Approximate conversions and units' page desktop accessibility
    When I open the approximate conversions and units page
    Then the page should have no accessibility issues

  # TODO: remove this comment and @pending when there isn't duplicate content in the feed
  @pending
  Scenario: 'Approximate conversions and units' page mobile accessibility
    Given I am using a mobile size browser
    When I open the approximate conversions and units page
    Then the page should have no accessibility issues

  # TODO: remove this comment and @pending when we have sorted images: BNF-1195
  @pending
  Scenario: 'Abbreviations and symbols' page desktop accessibility
    When I open the abbreviations and symbols page
    Then the page should have no accessibility issues

  # TODO: remove this comment and @pending when we have sorted images: BNF-1195
  @pending
  Scenario: 'Abbreviations and symbols' page mobile accessibility
    Given I am using a mobile size browser
    When I open the abbreviations and symbols page
    Then the page should have no accessibility issues
