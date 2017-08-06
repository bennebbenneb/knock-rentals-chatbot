const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQNonNull,
    buildSchema
} = require("graphql");
const email = require("./email/email");

module.exports = new GraphQLObjectType({
    name: "email",
    fields: () => ({
        email: {type:email}
    })
});