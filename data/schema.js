/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  // Import Denim database methods that your schema can interact with
  Denim,
  DenimList,
  getDenims,
  getDenimList,
} from './database';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    console.log("NodeDefinitions (globalId), id:", id);
    console.log("NodeDefinitions (globalId), type:", type);

    if (type === 'DenimList') {
      // Return your list of denims
      // NOTE: we did not utilize id in this simple example
      // but we could have used it to retrieve a specific
      // database object
      return getDenimList();
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof DenimList) {
      // Return the GraphQL Schema type definition
      // See GraphQL code below
      return denimListType;
    } else {
      return null;
    }
  }
);

/**
 * Define your own types here
 */

var denimType = new GraphQLObjectType({
  name: 'Denim',
  description: 'Details of a pair of denim',
  fields: () => ({
    id: globalIdField('Denim'),
    brand: {
      type: GraphQLString,
      description: 'Brand of denim',
    },
    model: {
      type: GraphQLString,
      description: 'Model of the brand',
    },
    size: {
      type: GraphQLInt,
      description: 'Size of denim',
    },
  }),
  interfaces: [nodeInterface],
});

var denimListType = new GraphQLObjectType({
  name: 'DenimList',
  description: 'List of denims',
  fields: () => ({
    id: globalIdField('DenimList'),
    denims: {
      type: denimConnection,
      description: 'List of denims',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getDenims(), args),
    },
  }),
  interfaces: [nodeInterface],
});

/**
 * Define your own connection types here
 */
var {connectionType: denimConnection} =
  connectionDefinitions({name: 'Denim', nodeType: denimType});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    // Add your own root fields here
    denimList: {
      type: denimListType,
      resolve: () => getDenimList(),
//ABCD      resolve: () => {
//ABCD        const _getDenims = getDenims();
//ABCD        var denimList = new DenimList();
//ABCD        denimList.id = 1;
//ABCD        return denimList;
//ABCD      }
    },
  }),
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // Add your own mutations here
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export var Schema = new GraphQLSchema({
  query: queryType,
  // Uncomment the following after adding some mutation fields:
  // mutation: mutationType
});
