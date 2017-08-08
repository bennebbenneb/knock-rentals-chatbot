const {
    GraphQLObjectType,
    GraphQLString
} = require("graphql");

module.exports = new GraphQLObjectType({
    name: "phoneValueText",
    fields: () => ({
        value: {type: GraphQLString},
        text: {type: GraphQLString},
    })
});