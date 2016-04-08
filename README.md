# Relay Node ID Tutorial

## Goals

This is the accompanying code for the article on 'Relay/GraphQL: De-mistifying
Node ID' (https://medium.com/@khor/relay-graphql-de-mystifying-node-id-38757121b9c).

The purpose of the article is to help readers understand why the default
implementation of nodeInterface 'just works' with little to no-tweaks, and when 
it won't 'just work'.

This piece of code is derived from the excellent relay-starter-kit available
here: https://github.com/relayjs/relay-starter-kit

## Installation

```
npm install
```

## Running

Start a local server:

```
npm start
```

## Developing

Any changes you make to files in the `js/` directory will cause the server to
automatically rebuild the app and refresh your browser.

If at any time you make changes to `data/schema.js`, stop the server,
regenerate `data/schema.json`, and restart the server:

```
npm run update-schema
npm start
```

## License

Relay Starter Kit is [BSD licensed](./LICENSE). We also provide an additional [patent grant](./PATENTS).
