# Running BNF functional-tests

## :rocket: Set up

1. Clone the project repository (if possible re-use the same package-lock.json file)
2. Use terminal to install or uninstall npm dependencies via `npm i`
3. Use terminal to run clean install npm dependencies via `npm ci` .
   Read more [npm docs](https://docs.npmjs.com/cli/v10/commands/npm-ci#description)

### Build app in Gatsby folder

4. Create a _.env.development_ file in this _gatsby_ folder and add the required environment variables as defined in [configuration](#configuration).

### Configuration

The following environment variables are used to configure the gatsby site and source plugin when building the app in the gatsby folder:

| Environment variable | Notes                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| FEED_URL             | The absolute base URL of the feed, passed as the `feedURL` config option to custom `gatsby-source-bnf` plugin |
| FEED_USER_KEY        | The API/user key for authentication of the feed.                                                              |
| GATSBY_SITE          | Which site you're building (`bnf` or `bnfc`)                                                                  |
| GATSBY_SEARCH_URL    | The single search endpoint base URL e.g. `https://[env**]-search-api.nice.org.uk/api`                         |

> Note: the variables prefixed with `GATSBY_` are made available to client side scripts so are public values, [see the Gatsby docs](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/#accessing-environment-variables-in-the-browser).

Set these environment variables using _.env_ files.

5. Run `npm run build:bnf` or `npm run build:bnfc` to build a specific site

# .env.development

FEED_URL=https://whatever
FEED_USER_KEY=abcd1234
GATSBY_SITE=bnfc # Or bnf
GATSBY_SEARCH_URL=https://[env**]-search-api.nice.org.uk/api

```

### Search proxy for CORS issue

If you experience issue where the Search-api typeahead functional-tests step fail locally. Check the steps to resolve

1. Rebuild Gatsby site with envrionment variables. Use single search endpoint base URL that support functional-tests docker compose file
   `GATSBY_SEARCH_URL=https://[env**]-search-api.nice.org.uk/api`
   View [configuration](#configuration)



Other Read me to check out [Gatsby README file](https://github.com/nice-digital/bnf-gatsby/tree/main/gatsby#readme)
```
