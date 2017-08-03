import React from 'react';
import {connect} from 'react-redux'
import axios from 'axios'
import {
    setQuestions,
    setQuestionOrder,
    setCompletedMessage,
    addToChatHistory,
    setState,
} from "../../actions/ChatScript/ChatScript";

import ChatDisplay from './ChatDisplay/ChatDisplay';
import ChatInput from './ChatInput/ChatInput';

class Chatbot extends React.Component {
    componentDidMount() {
        axios.get('/services/load-chat-state/').then((response) => {
            if (!response.data) {
                axios.get('/stubs/chat-script.json')
                    .then((response) => {
                        const firstQuestionId = response.data.questionOrder[0];
                        const firstQuestion = response.data.questions[firstQuestionId];
                        this.props.addToChatHistory({...firstQuestion, isBot: true, timestamp: new Date().getTime()});
                        this.props.setQuestions(response.data.questions);
                        this.props.setQuestionOrder(response.data.questionOrder);
                        this.props.setCompletedMessage(response.data.completedMessage);
                    })
                    .catch((error) => {
                    });
            }
            else {
                this.props.setState(response.data);
            }
        })

    }

    render() {
        return (
            <main className="chatbot">
                <ChatDisplay/>
                <ChatInput/>
            </main>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setQuestions: (questions) => dispatch(setQuestions(questions)),
        setQuestionOrder: (questionOrder) => dispatch(setQuestionOrder(questionOrder)),
        setCompletedMessage: (message) => dispatch(setCompletedMessage(message)),
        addToChatHistory: (chatObject) => dispatch(addToChatHistory(chatObject)),
        setState: (state) => dispatch(setState(state)),
    }
}

export default connect(null, mapDispatchToProps)(Chatbot);