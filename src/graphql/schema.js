const {
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");
const chatbot = require("./schema/ChatbotLog/ChatbotLog");
const chatbots = require("./schema/ChatbotLogs/ChatbotLogs");

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        chatbot: chatbot,
        chatbots: chatbots,
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});