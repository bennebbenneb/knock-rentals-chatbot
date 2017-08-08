const {
    GraphQLInputObjectType
} = require("graphql");
const name = require("./name/name");
const email = require("./email/email");
const phone = require("./phone/phone");

module.exports = new GraphQLInputObjectType ({
    name: "answerInput",
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