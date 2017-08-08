const {
    GraphQLObjectType
} = require("graphql");
const chatbotLogQuery = require("../query/ChatbotLog/ChatbotLog");
const chatbotLogsQuery = require("../query/ChatbotLogs/ChatbotLogs");

module.exports = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        chatbotLog: chatbotLogQuery,
        chatbotLogs: chatbotLogsQuery,
    }
});
