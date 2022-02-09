Feature: Google Tag Manager
  Tag Manager loads with the correct container id

  Scenario: Tag Manager is loaded
    Given I open the home page
    Then I expect that the BNF GTM container is available
