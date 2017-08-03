const ChatScript = (state = {
    present: {
        activeQuestionIndex: 0,
        questions: {0: {text: "Loading...", answers: []}},
        questionOrder: [0],
        history: [],
        answers: {},
        isBotTyping: false
    },
    past: []
}, action = {}) => {
    if (action.type === "SET_ACTIVE_QUESTION_INDEX") {
        const present = {...state.present, activeQuestionIndex: action.payload};
        return {...state, present};
    }
    if (action.type === "SET_QUESTIONS") {
        const present = {...state.present, questions: action.payload};
        return {...state, present};
    }
    if (action.type === "SET_QUESTION_ORDER") {
        const present = {...state.present, questionOrder: action.payload};
        return {...state, present};
    }
    if (action.type === "ADD_TO_CHAT_HISTORY") {
        const present = {...state.present, history: state.present.history.concat(action.payload)};
        return {...state, present};
    }
    if (action.type === "SET_COMPLETED_MESSAGE") {
        const present = {...state.present, completedMessage: action.payload};
        return {...state, present};
    }
    if (action.type === "SET_DISABLE_FORM_INPUT") {
        const present = {...state.present, isFormDisabled: action.payload};
        return {...state, present};
    }
    if (action.type === "SET_IS_BOT_TYPING") {
        const present = {...state.present, isBotTyping: action.payload};
        return {...state, present};
    }
    if (action.type === "SET_ANSWER") {

        state.present.answers[action.payload.key] = state.present.answers[action.payload.key] || {};

        let answerObj = {};
        if (typeof action.payload.answer.checked === "boolean") {
            answerObj.checked = action.payload.answer.checked;
        }
        if (typeof action.payload.answer.value !== "undefined") {
            answerObj.value = action.payload.answer.value;
        }
        answerObj.text = action.payload.answer.text;

        const present = {
            ...state.present,
            answers: {
                ...state.present.answers,
                [action.payload.key]: {
                    ...state.present.answers[action.payload.key],
                    [action.payload.answer.key]: answerObj
                }
            }
        };
        return {...state, present};
    }
    if (action.type === "SAVE_STATE") {
        const past = [{...state.present}].concat(state.past.concat());
        return {...state, past};
    }
    if (action.type === "SET_STATE") {
        return action.payload;
    }
    if (action.type === "GO_BACK") {
        const past = state.past.slice(1);
        const present = state.past.slice(0, 1)[0];
        return {...state, past, present};
    }
    return {...state};
};

export default ChatScript;