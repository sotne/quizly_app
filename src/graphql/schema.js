//import schema from graphql
const { GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');
const queries = require('./queries');
const mutations = require('./mutations')


const queryType = new GraphQLObjectType(
    {
        name: 'QueryType',
        description: 'Queries',
        fields: queries
    }
)

const MutationType = new GraphQLObjectType(
    {
        name: 'MutationType',
        description: 'Mutatons',
        fields: mutations
    }
)

module.exports = new GraphQLSchema({
    query: queryType,
    mutation: MutationType
})