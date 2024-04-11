# Gatsby source plugin for BNF and BNFC

> Custom source plugin for Gatsby to retrieve data from the BNF feed and turn it into Gatsby nodes

- [:rocket: Quick setup](#rocket-quick-setup)
- [What is a source plugin?](#what-is-a-source-plugin)
- [BNF source plugin](#bnf-source-plugin)
  - [Plugin usage](#plugin-usage)
  - [Configuration](#configuration)
  - [Data fetching](#data-fetching)
    - [Authentication](#authentication)
  - [GraphQL node types](#graphql-node-types)
  - [GraphQL queries](#graphql-queries)

## :rocket: Quick setup

This readme contains background and useful information for the source plugin. This is recommended to read before working on BNF, however if you're impatient:

Follow these steps to start querying the data:

- Run the Gatsby site following the instructions in the root
- Open http://localhost:8000/\_\_\_graphql in a browser to view the GraphiQL explorer.

GraphiQL is an browser-based IDE for GraphQL queries that's built in to Gatsby. Read the [_Introducing GraphiQL_](https://www.gatsbyjs.org/docs/running-queries-with-graphiql/) page on the Gatsby documentation for more information.

## What is a source plugin?

Gatsby sites get their data via source plugins. Source plugins fetch data from somewhere (e.g. an API, database, filesystem etc) and turn them into Gatsby nodes. These nodes can then be queried via GraphQL inside Gatsby React components. Follow [part 5 of the Gatsby tutorial ('Source Plugins')](https://www.gatsbyjs.org/tutorial/part-five/) if you're new to sourcing data in Gatsby and see [GraphQL & Gatsby](https://www.gatsbyjs.org/docs/graphql/) if you're new to GraphQL.

## BNF source plugin

The source plugin for BNF is a custom one (_gatsby-source-bnf_). The Gatsby docs has a useful section on ['Sourcing from Private APIs'](https://www.gatsbyjs.org/docs/sourcing-from-private-apis/) which describes how to write a custom plugin to source data from an API.

Our custom source plugin handles data fetching (from the BNF JSON feed) and mapping this data to Gatsby nodes (for querying via GraphQL). It _doesn't_ create pages: this gives a very clear separation of the two main components of the Gatsby build:

- data loading logic (via this plugin: gatsby-source-bnf)
- website page generation logic (via the Gatsby site - see the _gatsby_ folder in the repo root).

### Plugin usage

Add the plugin to _gatsby-config.js_ in the parent Gatsby project:

```diff
module.exports = {
	plugins: [
+		"gatsby-source-bnf",
	],
};
```

> Note: this is already configured, this is just showing you how it gets referenced, for info!

There's no need to install anything else. Gatsby loads local plugins automatically, see [Loading Plugins from Your Local Plugins Folder](https://www.gatsbyjs.org/docs/loading-plugins-from-your-local-plugins-folder/) in the Gatsby docs.

The plugin gets its dependencies from the parent gatsby folder. This because it makes installing dependencies easier - you don't have to run `npm i` in both folders, just the parent folder. This works because of the way that Node resolves modules (see [Loading from node_modules Folders](https://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders) in the Node docs).

### Configuration

The plugin has the following configuration options. These should be passed in via gatsby-config.js.

- `feedURL` {String} The absolute base URL of the JSON feed e.g. "https://api.somurl.io/v9/"
- `userKey` {String} The user/API key for authenticating against the feed
- `site` {"bnf" | "bnfc"} Which site we're currently building

An example configuration might look like this:

```diff
module.exports = {
	plugins: [
+		{
+			resolve: `gatsby-source-bnf`,
+			options: {
+				feedURL: process.env.FEED_URL,
+				userKey: process.env.FEED_USER_KEY,
+				site: "bnf",
+			},
+		},
	],
};
```

> Note: it's the responsibility of the parent Gatsby site to pass in the correct values. See [configuration](../../README.md#configuration) in the parent readme.

### Data fetching

In the case of BNF, the source data comes from the JSON feed. This is fetched using [axios](https://axios-http.com/), a 'Promise based HTTP client for the browser and node.js'.

> Note: this is a public repository so **be careful** not to commit or expose the URL and/or API key for the live BNF feed.

#### Authentication

TODO

### GraphQL node types

The plugin downloads all the data from the BNF feed and creates various nodes like `BnfDrug`, `BnfInteraction` etc. Each node type is documented so use the [GraphQL explorer](http://localhost:8000/___graphql) for help.

### GraphQL queries

These nodes can then be [queried in GraphQL in Gatsby](https://www.gatsbyjs.org/docs/running-queries-with-graphiql/). For example run the following query to select all drugs with a few key fields:

```graphql
{
  allBnfDrug {
    nodes {
      title
      slug
    }
  }
}
```

Or [open this 'grouped drugs' query in GraphiQL](<http://localhost:8000/___graphql?query=query%20MyQuery%20%7B%0A%20%20allBnfDrug%20%7B%0A%20%20%20%20group(field%3A%20initial)%20%7B%0A%20%20%20%20%20%20fieldValue%0A%20%20%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20%20%20slug%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&operationName=MyQuery>) to explore.

> Note: these nodes and their fields are all documented via our custom GraphQL schema, so descriptions show up in the GraphiQL explorer.
