const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQNonNull,
    buildSchema
} = require("graphql");

module.exports = new GraphQLObjectType({
    name: "emailValueText",
    fields: () => ({
        value: {type: GraphQLString},
        text: {type: GraphQLString},
    })
});