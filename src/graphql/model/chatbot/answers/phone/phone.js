const {
    GraphQLObjectType
} = require("graphql");
const phone = require("./phone/phone");
module.exports = new GraphQLObjectType({
    name: "phone",
    fields: () => ({
        phone: {type: phone}
    })
});