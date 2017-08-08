const {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLString,
} = require("graphql");
const Promise = require("promise");
const mongoDBPromise = require("../../../database/mongodb");
const ChatbotLog = require("../../model/ChatbotLog/ChatbotLog");
const answer = require("../../model/input/answers/answers");

module.exports = {
    type: ChatbotLog,
    args: {
        ipAddress: {type: GraphQLString},
        userAgent: {type: GraphQLString},
        answers: {type: new GraphQLList(answer)}
    },
    resolve(parentValue, args) {
        console.log(args);
        return new Promise((resolve, reject) => {
            mongoDBPromise.then((db) => {
                db.collection("chatbot")
                    .insertOne(args)
                    .then((res) => {
                        resolve(res.ops[0]);
                    })
                    .catch(() => {
                        reject();
                    });
            })
                .catch(() => {
                    reject();
                });
        });
    }
};