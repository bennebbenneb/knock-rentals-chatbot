const {
    GraphQLList,
    GraphQLInt
} = require("graphql");
const Promise = require("promise");
const mongoDBPromise = require("../../../database/mongodb");
const ChatbotLog = require("../../model/ChatbotLog/ChatbotLog");

module.exports = {
    type: new GraphQLList(ChatbotLog),
    args: {
        skip: {type: GraphQLInt},
        limit: {type: GraphQLInt}
    },
    resolve(parentValue, args) {
        args.skip = args.skip || 0;
        args.limit = args.limit || 10;
        return new Promise((resolve, reject) => {
            mongoDBPromise.then((db) => {
                db.collection("chatbot")
                    .find()
                    .skip(args.skip)
                    .limit(args.limit)
                    .toArray()
                    .then((arr) => {
                        resolve(arr);
                    });
            })
            .catch((e, r) => {
                console.log(e, r);
                reject();
            });
        });
    }
};