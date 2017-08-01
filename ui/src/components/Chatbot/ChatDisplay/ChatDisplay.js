import React from 'react';
import {connect} from 'react-redux'
import {addToChatHistory, setActiveQuestionIndex} from "../../../actions/ChatScript/ChatScript";

class ChatDisplay extends React.Component {
    componentWillReceiveProps(props) {
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
        }, 1)
    }

    render() {
        const allMessageDisplay = this.props.history.map((message, index, fullHistory) => {
            let templatedMessage = message;
            Object.keys(this.props.answers).forEach((questionId) => {
                Object.keys(this.props.answers[questionId]).forEach((answerId) => {
                    const wrappedKey = "{" + answerId + "}";
                    templatedMessage.text = templatedMessage.text.replace(wrappedKey, this.props.answers[questionId][answerId].text);
                });
            });
            return <div key={"message" + index} className={message.isBot ? "bot-message" : "user-message"}>
                <p>{templatedMessage.text}</p>
            </div>
        });
        return (
            <div ref="chatDisplay" className="chat-display">
                <div className="message-history">{allMessageDisplay}
                    {
                        this.props.isBotTyping
                            ? <div key="botTypingKey" className="bot-message">
                                <p>...</p>
                            </div>
                            : ""
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        questionOrder: state.ChatScript.present.questionOrder,
        history: state.ChatScript.present.history,
        isBotTyping: state.ChatScript.present.isBotTyping,
        questions: state.ChatScript.present.questions,
        activeQuestionIndex: state.ChatScript.present.activeQuestionIndex,
        completedMessage: state.ChatScript.present.completedMessage,
        User: state.User,
        firstName: state.User.firstName,
        answers: state.ChatScript.present.answers,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setActiveQuestionIndex: (questionIndex) => dispatch(setActiveQuestionIndex(questionIndex)),
        addToChatHistory: (chatObject) => dispatch(addToChatHistory(chatObject)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatDisplay);