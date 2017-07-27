import React from 'react';
import {connect} from 'react-redux'
import {addToChatHistory, setActiveQuestionIndex} from "../../../actions/ChatScript/ChatScript";

class ChatDisplay extends React.Component {
    componentWillReceiveProps(props) {
        setTimeout(() => {
            this.refs.chatDisplay.scrollTop = 1000000000;
        }, 1)
    }

    render() {
        const allMessageDisplay = this.props.history.map((message, index) => {
            return <div key={"message" + index} className={message.isBot ? "bot-message" : "user-message" }>
                <p>{message.text}</p>
            </div>
        });

        return (
            <div ref="chatDisplay" className="chat-display">
                <div className="message-history">{allMessageDisplay}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        questionOrder: state.ChatScript.present.questionOrder,
        history: state.ChatScript.present.history,
        questions: state.ChatScript.present.questions,
        activeQuestionIndex: state.ChatScript.present.activeQuestionIndex,
        completedMessage: state.ChatScript.present.completedMessage,
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