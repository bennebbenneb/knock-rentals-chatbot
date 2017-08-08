const {
    GraphQLInputObjectType
} = require("graphql");
const email = require("./email/email");

module.exports = new GraphQLInputObjectType ({
    name: "emailInput",
    fields: () => ({
        email: {type:email}
    })
});