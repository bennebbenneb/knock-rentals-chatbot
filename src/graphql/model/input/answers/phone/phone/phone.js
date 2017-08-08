const {
    GraphQLInputObjectType,
    GraphQLString
} = require("graphql");

module.exports = new GraphQLInputObjectType ({
    name: "phoneValueTextInput",
    fields: () => ({
        value: {type: GraphQLString},
        text: {type: GraphQLString},
    })
});