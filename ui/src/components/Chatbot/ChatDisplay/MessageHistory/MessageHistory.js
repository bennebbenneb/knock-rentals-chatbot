import React from 'react';
import {connect} from 'react-redux'
import Message from "./Message/Message";

class MessageHistory extends React.Component {
    render() {
        const allMessageDisplay = this.props.history.map((message, index) => {
            let templatedMessage = message;
            Object.keys(this.props.answers).forEach((questionId) => {
                Object.keys(this.props.answers[questionId]).forEach((answerId) => {
                    const wrappedKey = "{" + answerId + "}";
                    templatedMessage.text = templatedMessage.text.replace(wrappedKey, this.props.answers[questionId][answerId].text);
                });
            });
            return <Message key={"message" + index} id={"message" + index} isBot={message.isBot} text={templatedMessage.text}/>
        });

        return (
            <div className="message-history">
                {allMessageDisplay}
                {this.props.isBotTyping ? <Message key="botTypingKey" isBot={true} text="..."/> : ""}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        history: state.ChatScript.present.history,
        isBotTyping: state.ChatScript.present.isBotTyping,
        answers: state.ChatScript.present.answers,
    }
}
export default connect(mapStateToProps)(MessageHistory);