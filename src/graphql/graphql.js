const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const app = require("../app/app");

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

module.exports = graphqlHTTP;