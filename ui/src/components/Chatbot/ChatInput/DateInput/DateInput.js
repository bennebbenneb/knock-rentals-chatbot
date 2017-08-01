import React from 'react';
import {connect} from 'react-redux'
import {addToChatHistory, setAnswer} from "../../../../actions/ChatScript/ChatScript";

class DateInput extends React.Component {
    componentWillMount() {
        if (this.props.answers[this.props.questionId] && this.props.answers[this.props.questionId][this.props.answer.key]) {
            return;
        }
        this.props.setAnswer({
            key: this.props.questionId,
            answer: {
                key: this.props.answer.key,
                value: "",
                text: ""
            }
        });
    }

    handleChange(event) {
        this.props.setAnswer({
            key: this.props.questionId,
            answer: {
                key: this.props.answer.key,
                value: event.target.value,
                text: event.target.value
            }
        });
    }

    render() {
        const answer = this.props.answer;
        const text = this.props.answers[this.props.questionId][answer.key] ? this.props.answers[this.props.questionId][answer.key].text : "";
        return (
            <div className="chat-input-group" key={answer.key}>
                <label htmlFor={answer.key}>{answer.text}</label>
                <input onChange={this.handleChange.bind(this)}
                       id={answer.key}
                       value={text}
                       disabled={this.props.isFormDisabled}
                       type="date"/>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addToChatHistory: (chatObject) => dispatch(addToChatHistory(chatObject)),
        setAnswer: (answer) => dispatch(setAnswer(answer))
    }
}


function mapStateToProps(state) {
    return {
        isFormDisabled: state.ChatScript.present.isFormDisabled,
        answers: state.ChatScript.present.answers
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DateInput);