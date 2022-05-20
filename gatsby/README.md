# Gatsby site for BNF and BNFC

> Static website for NICE British National Formulary (BNF/C) built with Gatsby and React

[**:rocket: Jump straight to getting started**](#rocket-set-up)

<details>
<summary><strong>Table of contents</strong></summary>
<!-- START doctoc -->

- [Stack](#stack)
  - [Software](#software)
- [:rocket: Set up](#rocket-set-up)
  - [Slow start](#slow-start)
  - [Other commands](#other-commands)
- [Source plugin](#source-plugin)
  - [Configuration](#configuration)

<!-- END doctoc -->
</details>

## Stack

### Software

- [VS Code IDE](https://code.visualstudio.com/)
  - With recommended extensions (VS Code will prompt you to install these automatically)
- [Gatsby](https://www.gatsbyjs.org/) and React for static site generation
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Prettier](https://prettier.io/) for code formatting
- [ESLint](https://eslint.org/) for JavaScript/TypeScripting linting
- [Jest](https://jestjs.io/) for JS unit testing
  - With [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [axios](https://axios-http.com/) for loading data

> If you're new to Gatsby, don't worry: it's a well used static site generator build with React and its [documentation](https://www.gatsbyjs.org/docs/) and community is superb.

## :rocket: Set up

1. Install npm dependencies via `npm i` in each folder with a package.json
2. Create a _.env.development_ file in this _gatsby_ folder and add the required environment variables as defined in [configuration](#configuration).
3. Run the _LAUNCH BNF/BNFC_ debug command in VS Code. See the readme in the repository root for more info.

### Slow start

To run the the Gatsby site on its own from the command line:

1. Use [Volta](https://volta.sh/) to automatically use the correct version of Node pinned in package.json; or install the correct version of Node manually if you're not using Volta
2. Clone this repository
3. Open the root of the repository in VS Code
4. Install dependencies from npm:
   1. Run 'npm: Install Dependencies' from the VS Code command palette (_Ctrl+Shift+P_)
   2. Or run `cd gatsby && npm ci` on the command line
5. Press _F5_ to build the gatsby site and debug in Chrome
   1. This uses the debugging built into VS Code
   2. Alternatively:
      1. run `npm start` from the _gatsby_ folder
      2. open http://localhost:8000 in a browser

### Other commands

There are various other commands you can run in a terminal from the _gatsby_ folder:

| Script               | What does it do                                                              |
| -------------------- | ---------------------------------------------------------------------------- |
| `npm start`          | Runs the Gatsby site in development mode                                     |
| `npm run build`      | Builds the production build of the Gatsby site into the _public_ folder      |
| `npm run build:bnf`  | Builds the production build of the BNF site                                  |
| `npm run build:bnfc` | Builds the production build of the BNFC site                                 |
| `npm run serve`      | Serves the built Gatsby files from `npm run build` on http://localhost:9000/ |
| `npm run clean`      | Cleans out the .gatsby and public folders                                    |

## Source plugin

Gatsby sites get their data via source plugins. Source plugins fetch data from somewhere (e.g. an API, database, filesystem etc) and turn them into Gatsby nodes. These nodes can then be queried via GraphQL inside Gatsby React components. Follow ['Creating a Source Plugin
' in the Gatsby docs](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/creating-a-source-plugin/) if you're new to sourcing data in Gatsby.

In the case of BNF, the source data comes from the feed. The data fetching and mapping to Gatsby nodes is handled via a custom source plugin, called `gatsby-source-bnf`. This gives a nice separation of the data loading logic from the page generation logic. The Gatsby docs has a useful section on ['Sourcing from Private APIs'](https://www.gatsbyjs.org/docs/sourcing-from-private-apis/).

**View the [custom source plugin (_gatsby-source-bnf_)](plugins/gatsby-source-bnf) folder for more information.**

### Configuration

The following environment variables are used to configure the gatsby site and source plugin:

| Environment variable | Notes                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| FEED_URL             | The absolute base URL of the feed, passed as the `feedURL` config option to custom `gatsby-source-bnf` plugin |
| FEED_USER_KEY        | The API/user key for authentication of the feed.                                                              |
| GATSBY_SITE          | Which site you're building (`bnf` or `bnfc`)                                                                  |
| GATSBY_SEARCH_URL    | The single search endpoint base URL e.g. `https://alpha-search-api.nice.org.uk/api`                           |

> Note: the variables prefixed with `GATSBY_` are made available to client side scripts so are public values, [see the Gatsby docs](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/#accessing-environment-variables-in-the-browser).

Set these environment variables using _.env_ files. Create a _.env.development_ file (for local development with `npm run develop`) or _.env.production_ file (for the production build with `npm run build`) in this _gatsby_ folder to set these environment variables. These _.env_ files are deliberately ignored from git.

For example, create a _.env.production_ file to create a live-like production build via `npm run build`:

```
# .env.production
FEED_URL=https://whatever
FEED_USER_KEY=abcd1234
GATSBY_SITE=bnfc # Or bnf
GATSBY_SEARCH_URL=https://alpha-search-api.nice.org.uk/api
```

Alternatively, run `npm run build:bnf` or `npm run build:bnfc` to build a specific site and skip setting the `GATSBY_SITE` variable.

> Note: you can get the live values from the TeamCity build parameters or ask a team member.

### Search proxy

By default, local calls to the search service will fail due to CORS limitations. Setting up a proxy will help us to get around this for local dev.

The Gatsby config contains a `developMiddleware` property, which proxies a relative path (/api) to the alpha search service. This relative path can be specified as the search URL in your `.env.development` file, like so:

`GATSBY_SEARCH_URL=/api`

More information can be found in the [advanced proxying section of the Gatsby API docs](https://www.gatsbyjs.com/docs/api-proxy/#advanced-proxying).
