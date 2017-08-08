const {
    GraphQLObjectType
} = require("graphql");
const AddChatbotLog = require("./ChatbotLog/AddChatbotLog");

module.exports = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        addChatbotLog: AddChatbotLog
    }
});
