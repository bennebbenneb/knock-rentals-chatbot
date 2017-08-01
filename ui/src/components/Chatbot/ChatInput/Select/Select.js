import React from 'react';
import {connect} from 'react-redux'
import {addToChatHistory, setAnswer} from "../../../../actions/ChatScript/ChatScript";

class Select extends React.Component {

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
                text: event.target.options[event.target.selectedIndex].text
            }
        });
    }

    render() {
        const answer = this.props.answer;
        const options = answer.options.map((option) => {
            return <option key={option.value} value={option.value}>{option.text}</option>
        });
        const value = this.props.answers[this.props.questionId][answer.key] ? this.props.answers[this.props.questionId][answer.key].value : "";
        return <div className="chat-input-group" key={answer.key}>
            <label htmlFor={answer.key}>{answer.text}</label>
            <select onChange={this.handleChange.bind(this)}
                    id={answer.key}
                    value={value}
                    disabled={this.props.isFormDisabled}
                    type="select">
                {options}
            </select>
        </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(Select);