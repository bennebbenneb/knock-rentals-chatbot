const ChatScript = {
    setActiveQuestionIndex: (activeQuestionIndex) => {
        return {
            type: "SET_ACTIVE_QUESTION_INDEX",
            payload: activeQuestionIndex
        }
    },
    addToChatHistory: (chatObject) => {
        return {
            type: "ADD_TO_CHAT_HISTORY",
            payload: chatObject
        }
    },
    setQuestions: (questions) => {
        return {
            type: "SET_QUESTIONS",
            payload: Object.assign({0: {text: "Loading...", answers: []}}, questions)
        }
    },
    setQuestionOrder: (questionOrder) => {
        return {
            type: "SET_QUESTION_ORDER",
            payload: questionOrder
        }
    },
    setCompletedMessage: (completedMessage) => {
        return {
            type: "SET_COMPLETED_MESSAGE",
            payload: completedMessage
        }
    },
    setIsBotTyping: (isBotTypig) => {
        return {
            type: "SET_IS_BOT_TYPING",
            payload: isBotTypig
        }
    },
    setDisableFormInput: (isDisabled) => {
        return {
            type: "SET_DISABLE_FORM_INPUT",
            payload: isDisabled
        }
    },
    setAnswer: (answer) => {
        return {
            type: "SET_ANSWER",
            payload: answer
        }
    },
    goBack: () => {
        return {
            type: "GO_BACK"
        }
    },
    saveState: () => {
        return {
            type: "SAVE_STATE"
        }
    }
};
module.exports = ChatScript;