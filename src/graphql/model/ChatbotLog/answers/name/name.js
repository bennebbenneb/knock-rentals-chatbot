const {
    GraphQLObjectType
} = require("graphql");
const firstName = require("./firstName/firstName");
const lastName = require("./lastName/lastName");

module.exports = new GraphQLObjectType({
    name: "name",
    fields: () => ({
        firstName: {
            type: firstName
        },
        lastName: {
            type: lastName
        }
    })
});