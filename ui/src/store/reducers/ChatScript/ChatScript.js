const ChatScript = (state = {
    activeQuestionIndex: 0,
    questions: {0:{text:"Loading...",answers:[]}},
    questionOrder: [0],
    history: [],
    errorMessage:""
}, action = {}) => {
    if (action.type === "SET_ACTIVE_QUESTION_INDEX") {
        return {...state, activeQuestionIndex: action.payload};
    }
    if (action.type === "SET_QUESTIONS") {
        return {...state, questions: action.payload};
    }
    if (action.type === "SET_QUESTION_ORDER") {
        return {...state, questionOrder: action.payload};
    }
    if (action.type === "ADD_TO_CHAT_HISTORY") {
        const history = state.history.concat(action.payload);
        return {...state, history: history};
    }
    if (action.type === "SET_COMPLETED_MESSAGE") {
        return {...state, completedMessage: action.payload};
    }
    if (action.type === "SET_ERROR_MESSAGE") {
        return {...state, errorMessage: action.payload};
    }
    return {...state};
};

export default ChatScript;