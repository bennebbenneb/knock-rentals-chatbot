const {
    GraphQLObjectType,
    GraphQLString
} = require("graphql");
const Promise = require("promise");
const mongoDBPromise = require("../../../database/mongodb");
const {name, email, phone} = require("./answers/answers");

const ChatbotLogType = new GraphQLObjectType({
    name: "ChatbotLog",
    fields: () => ({
        _id: {type: GraphQLString},
        // answers: {type: GraphQLObjectType},
        // history: {type: GraphQLList},
        ipAddress: {type: GraphQLString},
        userAgent: {type: GraphQLString},
        answers: {
            type: new GraphQLObjectType({
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
            })
        }
    })
});

module.exports = {
    type: ChatbotLogType,
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
                    })
            });
        });
    }
};