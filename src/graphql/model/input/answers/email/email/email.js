const {
    GraphQLInputObjectType,
    GraphQLString
} = require("graphql");

module.exports = new GraphQLInputObjectType ({
    name: "emailValueTextInput",
    fields: () => ({
        value: {type: GraphQLString},
        text: {type: GraphQLString},
    })
});