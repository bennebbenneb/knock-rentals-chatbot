import React from 'react';
import {connect} from 'react-redux'
import {addToChatHistory, setActiveQuestionIndex, setErrorMessage} from "../../../actions/ChatScript/ChatScript";
import {
    setUserFirstName,
    setUserLastName,
    setUserEmail,
    setUserPhone,
    setUserMovingDate,
    setUserMovingReasons,
    setUserMovingReasonOther,
    setUserBedrooms,
    setUserAmenities,

} from "../../../actions/User/User";

class ChatInput extends React.Component {

    handleFormSubmit(event) {
        event.preventDefault();
        if (this._isValid()) {
            this._addToHistory();
            this._saveUserInfo();
            this.props.setErrorMessage("");
            this.props.setActiveQuestionIndex(this.props.activeQuestionIndex + 1);
        }
        window.scrollTo(0, document.body.scrollHeight);
        console.dir(    this.refs.chatForm.getElementsByTagName("input")[0]);
    }

    render() {
        const isCompleted = this.props.activeQuestionIndex === this.props.questionOrder.length;
        const currentQuestion = this._getCurrentQuestion();
        let inputFields = [];
        if (currentQuestion) {
            const answers = currentQuestion.answers;

            if (answers)
                inputFields = answers.map((answer, index) => {
                    if (answer.elementTag === "input") {
                        return <div className="chat-input-group" key={answer.key}>
                            <label htmlFor={answer.key}>{answer.text}</label>
                            <input autoFocus={index===0} ref={answer.key} id={answer.key} type={answer.inputType}/>
                        </div>
                    } else if (answer.elementTag === "textarea") {
                        return <div className="chat-input-group" key={answer.key}>
                            <label htmlFor={answer.key}>{answer.text}</label>
                            <textarea autoFocus={index===0} ref={answer.key} id={answer.key} type={answer.inputType}/>
                        </div>
                    } else if (answer.elementTag === "select") {
                        const options = answer.options.map((option) => {
                            return <option key={option.value} value={option.value}>{option.text}</option>
                        });
                        const attr = answer.attr;
                        return <div className="chat-input-group" key={answer.key}>
                            <label htmlFor={answer.key}>{answer.text}</label>
                            <select autoFocus={index===0} ref={answer.key} id={answer.key} type={answer.inputType} {...attr}>
                                {options}
                            </select>
                        </div>
                    }
                })
        }

        return (
            <div className="chat-input">
                <form ref="chatForm" onSubmit={this.handleFormSubmit.bind(this)}>
                    { inputFields ? inputFields : ""}
                    {
                        !isCompleted
                            ? <input type="submit" value="Send"/>
                            : ""
                    }
                </form>
            </div>
        );
    }

    _getCurrentQuestion() {
        const qIndex = this.props.activeQuestionIndex;
        const currentQuestionId = this.props.questionOrder[qIndex];
        const currentQuestion = this.props.questions[currentQuestionId];
        return currentQuestion;
    }

    _isValid() {
        let isValid = true;
        const currentQuestion = this._getCurrentQuestion();
        currentQuestion.answers.forEach((answer) => {
            if (answer.required && this.refs[answer.key].value === "") {
                const botHistoryItem = (
                    <div className="bot-error-message">
                        <p>An answer for {answer.text} is required.</p>
                    </div>
                );
                this.props.setErrorMessage(botHistoryItem);
                isValid = false;
            }
        });
        return isValid;
    }

    _saveUserInfo() {
        const currentQuestion = this._getCurrentQuestion();
        currentQuestion.answers.forEach((answer) => {
            const methodKey = "setUser" + this._capitalize(answer.key);
            this.props[methodKey](this.refs[answer.key].value);
        });
    }

    _addToHistory() {
        const qIndex = this.props.activeQuestionIndex;
        const currentQuestionId = this.props.questionOrder[qIndex];
        const currentQuestion = this.props.questions[currentQuestionId];

        const botHistoryItem = (
            <div key={currentQuestionId + new Date().getTime()} className="bot-message">
                <p>{currentQuestion.text}</p>
            </div>
        );
        this.props.addToChatHistory(botHistoryItem);

        const userHistoryItems = currentQuestion.answers.map((answer) => {

            return (
                <div key={answer.key} className="user-message">
                    <p>{answer.text}</p>
                    <p>{this.refs[answer.key].value}</p>
                </div>
            );
        });
        this.props.addToChatHistory(userHistoryItems);
    }

    _capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

function mapStateToProps(state) {
    return {
        questionOrder: state.ChatScript.questionOrder,
        questions: state.ChatScript.questions,
        activeQuestionIndex: state.ChatScript.activeQuestionIndex,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addToChatHistory: (chatObject) => dispatch(addToChatHistory(chatObject)),
        setActiveQuestionIndex: (activeIndex) => dispatch(setActiveQuestionIndex(activeIndex)),
        setErrorMessage: (errorMessage) => dispatch(setErrorMessage(errorMessage)),
        setUserFirstName: (firstName) => dispatch(setUserFirstName(firstName)),
        setUserLastName: (lastName) => dispatch(setUserLastName(lastName)),
        setUserEmail: (email) => dispatch(setUserEmail(email)),
        setUserPhone: (phone) => dispatch(setUserPhone(phone)),
        setUserMovingDate: (date) => dispatch(setUserMovingDate(date)),
        setUserBedrooms: (bedrooms) => dispatch(setUserBedrooms(bedrooms)),
        setUserMovingReasons: (reasons) => dispatch(setUserMovingReasons(reasons)),
        setUserMovingReasonOther: (otherReason) => dispatch(setUserMovingReasonOther(otherReason)),
        setUserAmenities: (amenities) => dispatch(setUserAmenities(amenities)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);