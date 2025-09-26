# BNF and BNFC

> Website for NICE British National Formulary (BNF) and British National Formulary for Children (BNFC) built with Gatsby and using the NICE Design System

[**:rocket: Jump straight to getting started**](#rocket-set-up)

## What is it?

The BNF, or British National Formulary, provides guidance to health practitioners on prescribing, dispensing and administering medicines.

It's a microsite, updated once a month from a feed. It's built with Gatsby, a React-based static site generator, and is styled using components from the NICE Design System.

This project produces website for both the BNF (standard formulary) and BNFc (the version for children).

## Project structure

| Folder                                      | Purpose                                       |
| ------------------------------------------- | --------------------------------------------- |
| [gatsby](gatsby#readme)                     | Static site built with React and Gatsby       |
| [functional-tests](functional-tests#readme) | Browser-based functional tests in WebdriverIO |

> Note: Each of these folders has its own readme with detailed setup steps etc

## Stack

This is the high level stack. Each of the sub-projects (gatsby/functional-tests) has its own readme with more detailed stack.

### Software

- [VS Code IDE](https://code.visualstudio.com/)
  - With recommended extensions (VS Code will prompt you to install these automatically)
- [Gatsby v4](https://www.gatsbyjs.org/) and [React](https://reactjs.org/) for static site generation
- [WebdriverIO v7](https://webdriver.io/) for browser-based functional tests
- [NICE Design System](https://design-system.nice.org.uk/)

## :rocket: Set up

The easiest way to get the project running is:

1. Use [Volta](https://volta.sh/) to automatically use the correct version of Node pinned in package.json; or install the correct version of Node manually if you're not using Volta
2. Clone this repository
3. Open the root of the repository in VS Code
   1. Install recommended extensions when prompted
4. Install dependencies:
   1. Run `npm ci` in each folder with a package.json manually.
5. Go to the 'Run and Debug' panel (_Ctrl+Shift+D_) in VS Code
6. Run `LAUNCH BNF/BNFC`

Launching the app via `LAUNCH BNF/BNFC` runs the Gatsby site in dev mode on <http://localhost:8000/>, and launches it in Chrome for debugging once it's built and running.

> Note: there are more granular ways to run each part of the project, either via an IDE or via the command line. See each sub-folders's readme for more details.
