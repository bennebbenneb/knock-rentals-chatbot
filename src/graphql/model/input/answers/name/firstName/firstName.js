const {
    GraphQLInputObjectType,
    GraphQLString
} = require("graphql");

module.exports = new GraphQLInputObjectType ({
    name: "firstNameValueTextInput",
    fields: () => ({
        value: {type: GraphQLString},
        text: {type: GraphQLString},
    })
});