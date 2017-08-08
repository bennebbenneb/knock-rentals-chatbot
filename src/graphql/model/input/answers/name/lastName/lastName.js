const {
    GraphQLInputObjectType ,
    GraphQLString
} = require("graphql");
module.exports = new GraphQLInputObjectType ({
    name: "lastNameValueTextInput",
    fields: () => ({
        value: {type: GraphQLString},
        text: {type: GraphQLString},
    })
});