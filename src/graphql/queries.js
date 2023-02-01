//imoprt types from graphql
const { GraphQLList, GraphQLID } = require('graphql');
//import our own created type
const { UserType } = require('./types');
//import model so we can get data from mongodb
const{ User } = require('../models');


const users = {
    type: new GraphQLList(UserType),
    description: 'get all users from the database',
    resolve(parent, args){
        return User.find()
    }
};

const user = {
    type: UserType,
    description: 'query single user from database by id',
    args: {
        id:{ type: GraphQLID},
    },
    resolve(parents, args){
        return User.findById(args.id)
    }
};

module.exports = {
    users,
    user
};

