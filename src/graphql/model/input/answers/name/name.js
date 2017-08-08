const {
    GraphQLInputObjectType
} = require("graphql");
const firstName = require("./firstName/firstName");
const lastName = require("./lastName/lastName");

module.exports = new GraphQLInputObjectType ({
    name: "nameInput",
    fields: () => ({
        firstName: {
            type: firstName
        },
        lastName: {
            type: lastName
        }
    })
});