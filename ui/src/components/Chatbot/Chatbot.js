import React from 'react';
import {connect} from 'react-redux'
import axios from 'axios'
import {setActiveQuestionIndex, setQuestions, setQuestionOrder,setCompletedMessage, addToChatHistory} from "../../actions/ChatScript/ChatScript";

import ChatDisplay from './ChatDisplay/ChatDisplay';
import ChatInput from './ChatInput/ChatInput';

class Chatbot extends React.Component {
    componentDidMount() {
        axios.get('/stubs/chat-script.json')
            .then((response) => {
                this.props.setQuestions(response.data.questions);
                this.props.setQuestionOrder(response.data.questionOrder);
                this.props.setCompletedMessage(response.data.completedMessage);

                const currentQuestionId = response.data.questionOrder[0];
                const currentQuestion = response.data.questions[currentQuestionId];

                this.props.addToChatHistory({...currentQuestion, isBot: true, timestamp:new Date().getTime()});
            })
            .catch((error) => {
            });
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

function mapStateToProps(state) {
    return {
        questionOrder: state.ChatScript.questionOrder,
        questions: state.ChatScript.questions,
        activeQuestionIndex: state.ChatScript.activeQuestionIndex,
        firstName: state.User.firstName,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setActiveQuestionIndex: (questionIndex) => dispatch(setActiveQuestionIndex(questionIndex)),
        setQuestions: (questions) => dispatch(setQuestions(questions)),
        setQuestionOrder: (questionOrder) => dispatch(setQuestionOrder(questionOrder)),
        setCompletedMessage: (message) => dispatch(setCompletedMessage(message)),
        addToChatHistory: (chatObject) => dispatch(addToChatHistory(chatObject)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Chatbot);