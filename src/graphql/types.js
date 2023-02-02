// Import built-in graphql types
const { GraphQLObjectType, GraphQLInputObjectType, GraphQLID, GraphQLString, GraphQLInt } = require('graphql');
//import the user model
const { User } = require('../models');



const UserType = new GraphQLObjectType(
    {
        name: 'User',
        description: 'User Type',
        fields: () => ({
            id: { type: GraphQLID },
            username: { type: GraphQLString },
            email: { type: GraphQLString }
        })
    }
)


const QuizType = new GraphQLObjectType(
    {
        name: 'Quiz',
        description: 'Quiz Type',
        fields: () => ({
            id: {type: GraphQLID},
            slug: {type: GraphQLString},
            title: {type: GraphQLString},
            description: {type: GraphQLString},
            userId: {type: GraphQLID},
            user: {
                type: UserType,
                resolve(parents, args){
                    return User.findById(parent.userId)
                }
            }
        })
    }
)


//create a question type (input) for mutation of creating a quiz
const QuestionInputType = new GraphQLInputObjectType(
    {
        name:'Question',
        description:'Question input type',
        fields: () => ({
            title:{GraphQLString},
            correctAnswer: {GraphQLInt},
            order:{GraphQLString},
        })
    }
)


module.exports = {
    UserType,
    QuizType,
    QuestionInputType
}