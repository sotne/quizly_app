// Import built-in graphql types
const { GraphQLObjectType, GraphQLInputObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');
//import the user model
const { User, Quiz, Question } = require('../models');



const UserType = new GraphQLObjectType(
    {
        name: 'User',
        description: 'User Type',
        fields: () => ({
            id: { type: GraphQLID },
            username: { type: GraphQLString },
            email: { type: GraphQLString },
            quizzes: {
                type: new GraphQLList(QuizType),
                resolve(parent,args){
                    return Quiz.find({ userId: parent.id })
                }
            }
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

//create a question type for queries
const QuestionType = new GraphQLObjectType(
    {
        name: 'Question',
        description: 'Question Type',
        fields: () => ({
            id: {type: GraphQLID},
            title: {type: GraphQLString},
            correctAnswer: {type: GraphQLString},
            order: { type: GraphQLInt},
            quizId: {type: GraphQLID},
            quiz: {
                type:QuizType,
                resolve(parent, args){
                    return Quiz.findById(parent.quizId)
                }
            },
            questions: {
                type: GraphQLList(QuestionType),
                resolve(parent, args){
                    return Question.find({ quizId: parent.id})
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