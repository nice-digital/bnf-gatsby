#!/bin/bash

# Runs functional tests via Docker

# Prefer the fresh CodeArtifact token from TeamCity (NPM_TOKEN_CODEARTIFACT):
# the root project also injects an env.NPM_TOKEN which is stale, so it must NOT
# take precedence. Locally NPM_TOKEN_CODEARTIFACT is unset and NPM_TOKEN wins.
export NPM_TOKEN="${NPM_TOKEN_CODEARTIFACT:-$NPM_TOKEN}"

# Avoid "Mount denied" errors for Chrome/Firefox containers on Windows
# See https://github.com/docker/for-win/issues/1829#issuecomment-376328022
export COMPOSE_CONVERT_WINDOWS_PATHS=1

function cleanupBeforeStart() {
  # Clean up before we start
  rm -rf docker-output && rm -rf allure-results && rm -rf allure-report
}

function runTests() {
  # --build so the test runner image is (re)built here, where NPM_TOKEN has just
  # been exported above. `docker-compose start` would reuse an image built by the
  # background `up --no-start` step, which may not have had the token in scope.
  # It's a near-instant no-op when the layers are already fresh.
  docker-compose up -d --build --scale bnf-selenium-chrome=2

  # Wait for the web app to be up before running the tests
  docker-compose run -T bnf-test-runner npm run wait-then-test
  # Or for dev mode, uncomment:
  #docker-compose exec bnf-test-runner sh
}

function processTestOutput() {
  # Generate an Allure test report
  docker-compose run -T bnf-test-runner allure generate --clean

  # Copy logs to use as a TeamCity artifact for debugging purposes
  mkdir -p docker-output
  docker cp bnf-test-runner:/bnf-gatsby/tests/allure-report ./docker-output

  docker-compose logs --no-color > ./docker-output/logs.txt
}

function cleanup() {
  # Stop in the background so the script finishes quicker - we don't need to wait
  nohup docker-compose down --remove-orphans --volumes > /dev/null 2>&1 &
}

function exitWithCode()
  {
    echo "exit code is: $1"
    if [ "$1" -gt 0 ]
    then
      exit 1
    else
      exit 0
    fi
  }

error=0
trap 'catch' ERR
catch() {
  error=1
}

cleanupBeforeStart
runTests
processTestOutput
cleanup
exitWithCode $error
