const {
    GraphQLInputObjectType
} = require("graphql");
const phone = require("./phone/phone");
module.exports = new GraphQLInputObjectType({
    name: "phoneInput",
    fields: () => ({
        phone: {type: phone}
    })
});