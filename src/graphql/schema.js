const {
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");
const chatbot = require("./model/chatbot/chatbot");

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        chatbot: chatbot
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});