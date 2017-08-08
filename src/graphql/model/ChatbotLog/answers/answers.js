const {
    GraphQLObjectType
} = require("graphql");
const name = require("./name/name");
const email = require("./email/email");
const phone = require("./phone/phone");

module.exports = new GraphQLObjectType({
    name: "answer",
    fields: () => ({
        name: {
            type: name
        },
        email: {
            type: email
        },
        phone: {
            type: phone
        },
    })
});