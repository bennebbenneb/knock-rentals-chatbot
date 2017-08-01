import React from 'react';
import {connect} from 'react-redux'
import {addToChatHistory, setAnswer} from "../../../../actions/ChatScript/ChatScript";

class Checkbox extends React.Component {
    componentDidMount() {
        this.props.answer.options.forEach((option) => {
            if (this.props.answers[this.props.questionId] && this.props.answers[this.props.questionId][option.value]) {
                return;
            }
            this.props.setAnswer({
                key: this.props.questionId,
                answer: {
                    key: option.value,
                    checked: false,
                    text: option.text
                }
            });
        });
    }

    handleChange(value, text, event) {
        this.props.setAnswer({
            key: this.props.questionId,
            answer: {
                key: value,
                checked: event.target.checked,
                text: text
            }
        });
    }

    render() {
        const options = this.props.answer.options.map((option) => {

                const isChecked = this.props.answers[this.props.questionId]
                    ? this.props.answers[this.props.questionId][option.value]
                        ? this.props.answers[this.props.questionId][option.value].checked === true
                        : false : false;

                return (
                    <div className="chat-input-group" key={option.value}>
                        <label htmlFor={option.value}>{option.text}</label>
                        <input onChange={this.handleChange.bind(this, option.value, option.text)}
                               key={option.value} id={option.value} name={option.value}
                               value={option.text}
                               checked={isChecked}
                               disabled={this.props.isFormDisabled}
                               type="checkbox"/>
                    </div>
                )
            }
        );
        return (
            <div>
                {options}
            </div>
        )
    }

}

function mapDispatchToProps(dispatch) {
    return {
        addToChatHistory: (chatObject) => dispatch(addToChatHistory(chatObject)),
        setAnswer: (answer) => dispatch(setAnswer(answer)),
    }
}


function mapStateToProps(state) {
    return {
        isFormDisabled: state.ChatScript.present.isFormDisabled,
        answers: state.ChatScript.present.answers
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);