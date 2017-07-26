import React from 'react';
import {connect} from 'react-redux'
import {addToChatHistory, setActiveQuestionIndex} from "../../../actions/ChatScript/ChatScript";

class ChatDisplay extends React.Component {

    render() {
        const qIndex = this.props.activeQuestionIndex;

        if (qIndex === this.props.questionOrder.length) {
            return (
                <div className="chat-display">
                    <div className="message-history">{this.props.history}</div>
                    <p className="current-message">{this.props.completedMessage}</p>
                    {
                        this.props.errorMessage
                            ? <p className="error-message">{this.props.errorMessage}</p>
                            : ""
                    }
                </div>

            )
        }
        const currentQuestionId = this.props.questionOrder[qIndex];
        const currentQuestion = this.props.questions[currentQuestionId];
        return (
            <div className="chat-display">
                <div className="message-history">{this.props.history}</div>
                <p className="current-message">{currentQuestion.text}</p>
                {
                    this.props.errorMessage
                        ? <p className="error-message">{this.props.errorMessage}</p>
                        : ""
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        questionOrder: state.ChatScript.questionOrder,
        history: state.ChatScript.history,
        questions: state.ChatScript.questions,
        errorMessage: state.ChatScript.errorMessage,
        activeQuestionIndex: state.ChatScript.activeQuestionIndex,
        completedMessage: state.ChatScript.completedMessage,
        firstName: state.User.firstName,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setActiveQuestionIndex: (questionIndex) => dispatch(setActiveQuestionIndex(questionIndex)),
        addToChatHistory: (chatObject) => dispatch(addToChatHistory(chatObject)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatDisplay);