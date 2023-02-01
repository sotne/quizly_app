// Import Types from graphql
const { GraphQLList, GraphQLID } = require('graphql');
// Import our own created type
const { UserType } = require('./types');
// Import model so we can get data from MongoDB
const { User } = require('../models');


const users = {
    type: new GraphQLList(UserType),
    description: 'Get all users from the database',
    resolve(parent, args){
        return User.find()
    }
}


const user = {
    type: UserType,
    description: 'Query single user from database by ID',
    args: {
        id: { type: GraphQLID }
    },
    resolve(parent, args){
        return User.findById(args.id)
    }
}

module.exports = {
    users,
    user
}