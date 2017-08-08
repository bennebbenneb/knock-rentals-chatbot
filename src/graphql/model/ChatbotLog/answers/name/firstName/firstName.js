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
    name: "firstNameValueText",
    fields: () => ({
        value: {type: GraphQLString},
        text: {type: GraphQLString},
    })
});