const {
    GraphQLString
} = require("graphql");
const Promise = require("promise");
const mongoDBPromise = require("../../../database/mongodb");
const ChatbotLog = require("../../model/ChatbotLog/ChatbotLog");

module.exports = {
    type: ChatbotLog,
    args: {
        id: {type: GraphQLString}
    },
    resolve(parentValue, args) {
        return new Promise((resolve, reject) => {
            mongoDBPromise.then((db) => {
                const ObjectID = require('mongodb').ObjectID;
                db.collection("chatbot")
                    .findOne({"_id": new ObjectID(args.id)})
                    .then((result) => {
                        resolve(result);
                    });
            });
        });
    }
};