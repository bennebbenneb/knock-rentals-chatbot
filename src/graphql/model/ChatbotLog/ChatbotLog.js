const {
    GraphQLObjectType,
    GraphQLString
} = require("graphql");
const answer = require("./answers/answers");

module.exports = new GraphQLObjectType({
    name: "ChatbotLog",
    fields: () => ({
        _id: {type: GraphQLString},
        // history: {type: GraphQLList},
        ipAddress: {type: GraphQLString},
        userAgent: {type: GraphQLString},
        answers: {
            type: answer
        }
    })
});