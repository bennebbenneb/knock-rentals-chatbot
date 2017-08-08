const {
    GraphQLSchema
} = require("graphql");

const RootQuery = require("./query/RootQuery");
const RootMutation = require("./mutation/RootMutation");

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});