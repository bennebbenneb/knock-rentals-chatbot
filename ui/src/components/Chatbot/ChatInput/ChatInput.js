import React from 'react';
import {connect} from 'react-redux'
import axios from 'axios'
import {addToChatHistory, setActiveQuestionIndex, goBack, saveState} from "../../../actions/ChatScript/ChatScript";
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
    setUserPets

} from "../../../actions/User/User";

class ChatInput extends React.Component {
    handleFormSubmit(event) {
        event.preventDefault();
        this.props.saveState()
        if (this._isValid()) {
            this._addToHistory();
            this._saveUserInfo();
            this.props.setActiveQuestionIndex(this.props.activeQuestionIndex + 1);
        }

        const isCompleted = (this.props.activeQuestionIndex + 1) === this.props.questionOrder.length;
        if (isCompleted) {
            setTimeout(() => {
                const isCompleted = this.props.activeQuestionIndex === this.props.questionOrder.length;
                if (isCompleted) {
                    axios.post("/service/chatbot/", {
                        user: this.props.User,
                        history: this.props.history
                    });
                }
            }, 1);
        }
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
                        if (answer.inputType === "checkbox") {
                            return answer.options.map((option) => {
                                return <div className="chat-input-group" key={option.value}>
                                    <label htmlFor={option.value}>{option.text}</label>
                                    <input ref={option.value} key={option.value} id={option.value} name={option.value}
                                           value={option.text}
                                           type={answer.inputType}/>
                                </div>
                            });
                        }
                        else {
                            return <div className="chat-input-group" key={answer.key}>
                                <label htmlFor={answer.key}>{answer.text}</label>
                                <input autoFocus={index === 0} ref={answer.key} id={answer.key}
                                       type={answer.inputType}/>
                            </div>
                        }
                    } else if (answer.elementTag === "textarea") {
                        return <div className="chat-input-group" key={answer.key}>
                            <label htmlFor={answer.key}>{answer.text}</label>
                            <textarea autoFocus={index === 0} ref={answer.key} id={answer.key} type={answer.inputType}/>
                        </div>
                    } else if (answer.elementTag === "select") {
                        const options = answer.options.map((option) => {
                            return <option key={option.value} value={option.value}>{option.text}</option>
                        });
                        return <div className="chat-input-group" key={answer.key}>
                            <label htmlFor={answer.key}>{answer.text}</label>
                            <select autoFocus={index === 0} ref={answer.key} id={answer.key}
                                    type={answer.inputType}>
                                {options}
                            </select>
                        </div>
                    }
                })
        }

        return (
            <form className="chat-input" ref="chatForm" onSubmit={this.handleFormSubmit.bind(this)}>
                {
                    !isCompleted
                        ?
                        <button disabled={!this._hasUserHistory()} onClick={this._goBack.bind(this)} type="button">
                            Rewind Time</button>
                        : ""
                }
                <div className="input-fields">{ inputFields ? inputFields : ""}</div>
                {
                    !isCompleted
                        ? <input type="submit" value="Continue"/>
                        : ""
                }
            </form>
        );
    }

    _hasUserHistory() {
        let onlyBotMessages = true;
        this.props.history.forEach((message) => {
            if (message.isBot === false) {
                onlyBotMessages = false;
            }
        });
        return !onlyBotMessages;
    }

    _goBack() {
        if (this._hasUserHistory()) {
            this.props.goBack();
        }
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
                let randomizer = Math.random() * 3;
                if (randomizer > 2) {
                    this.props.addToChatHistory({
                        text: " " + answer.text + " " + "is required.",
                        isBot: true,
                        isError: true
                    });
                }
                else if (randomizer > 1) {
                    this.props.addToChatHistory({
                        text: "Whoops! " + answer.text + " is required.",
                        isBot: true,
                        isError: true
                    });
                }
                else {
                    this.props.addToChatHistory({
                        text: "Shucks! " + answer.text + " is required.",
                        isBot: true,
                        isError: true
                    });
                }

                isValid = false;
            }

            if (answer.validation) {
                isValid = isValid && this._validator(answer.validation, this.refs[answer.key].value);
            }
        });
        return isValid;
    }

    _validator(validationKey, value) {
        if (validationKey === "tel") {
            const rawNumbers = value.replace(/\D+/g, "");
            const randomizer = Math.random() * 3;

            if (rawNumbers.length < 10) {
                if (randomizer > 2) {
                    this.props.addToChatHistory({
                        text: "Make sure to enter your full 10 digit phone number",
                        isBot: true,
                        isError: true
                    });
                }
                else if (randomizer > 1) {
                    this.props.addToChatHistory({
                        text: "I think you're missing some numbers",
                        isBot: true,
                        isError: true
                    });
                }
                else {
                    this.props.addToChatHistory({
                        text: "Whoops! You're missing some numbers",
                        isBot: true,
                        isError: true
                    });
                }
                return false;
            }
            else if ((rawNumbers + "").indexOf("555") === 0) {
                if (randomizer > 2) {
                    this.props.addToChatHistory({
                        text: "A 555 number? I see...",
                        isBot: true,
                        isError: true
                    });
                }
                else if (randomizer > 1) {
                    this.props.addToChatHistory({
                        text: "Did you get this number from a movie by chance?",
                        isBot: true,
                        isError: true
                    });
                }
                else {
                    this.props.addToChatHistory({
                        text: "We need a valid phone number",
                        isBot: true,
                        isError: true
                    });
                }
                return false;
            }
        }
        if (validationKey === "email") {
            if (!value.match(/\S+@\S+/)) {
                const randomizer = Math.random() * 3;
                if (randomizer > 2) {
                    this.props.addToChatHistory({
                        text: "That email doesn't look quite right.",
                        isBot: true,
                        isError: true
                    });
                }
                else if (randomizer > 1) {
                    this.props.addToChatHistory({
                        text: "Are you sure that's your email?",
                        isBot: true,
                        isError: true
                    });
                }
                else {
                    this.props.addToChatHistory({
                        text: "Fix the issue with your email before we go on.",
                        isBot: true,
                        isError: true
                    });
                }
                return false;
            }
        }
        if (validationKey === "date") {

            const movingDate = new Date(value);
            let now = new Date();
            now.setMilliseconds(0);
            now.setSeconds(0);
            now.setMinutes(0);
            now.setHours(0);
            const diffInDates = movingDate.getTime() - now.getTime();
            const oneDay = 8.64e+7;

            if (diffInDates < oneDay) {
                const randomizer = Math.random() * 3;
                if (randomizer > 2) {
                    this.props.addToChatHistory({
                        text: "Please choose a date at least one full day from today.",
                        isBot: true,
                        isError: true
                    });
                }

                else if (randomizer > 1) {
                    this.props.addToChatHistory({
                        text: "That's too soon.",
                        isBot: true,
                        isError: true
                    });
                }
                else {
                    this.props.addToChatHistory({
                        text: "We need more notice.",
                        isBot: true,
                        isError: true
                    });
                }
                return false;
            }
        }
        return true;
    }

    _saveUserInfo() {
        const currentQuestion = this._getCurrentQuestion();
        currentQuestion.answers.forEach((answer) => {
            const methodKey = "setUser" + this._capitalize(answer.key);
            let paramValue = "";
            if (answer.inputType === "checkbox") {
                paramValue = answer.options.reduce((acc, option) => {
                    console.log(option, acc)
                    if (this.refs[option.value].checked) {
                        acc = acc.concat(this.refs[option.value].value)
                    }
                    return acc;
                }, []);
            }
            else {
                paramValue = this.refs[answer.key].value;
            }
            this.props[methodKey](paramValue);
        });
    }

    _addToHistory() {
        const qIndex = this.props.activeQuestionIndex;
        const currentQuestionId = this.props.questionOrder[qIndex];
        const currentQuestion = this.props.questions[currentQuestionId];

        currentQuestion.answers.forEach((answer) => {
            if (answer.inputType === "checkbox") {
                let message = answer.text + ":";
                answer.options.forEach((option) => {
                    if (this.refs[option.value].checked) {
                        message += " " + this.refs[option.value].value
                    }
                });
                this.props.addToChatHistory({
                    text: message,
                    isBot: false
                });
            }
            else {
                if (this.refs[answer.key].value) {
                    this.props.addToChatHistory({
                        text: answer.text + " " + this.refs[answer.key].value,
                        isBot: false
                    });
                }
            }
        });

        if ((qIndex + 1) !== this.props.questionOrder.length) {
            const nextQuestionId = this.props.questionOrder[qIndex + 1];
            const nextQuestion = this.props.questions[nextQuestionId];
            this.props.addToChatHistory({
                text: nextQuestion.text,
                isBot: true
            });
        }
        else {
            this.props.addToChatHistory({
                text: this.props.completedMessage,
                isBot: true
            });
        }
    }

    _capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

function mapStateToProps(state) {
    return {
        questionOrder: state.ChatScript.present.questionOrder,
        questions: state.ChatScript.present.questions,
        history: state.ChatScript.present.history,
        activeQuestionIndex: state.ChatScript.present.activeQuestionIndex,
        completedMessage: state.ChatScript.present.completedMessage,
        User: state.User,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addToChatHistory: (chatObject) => dispatch(addToChatHistory(chatObject)),
        setActiveQuestionIndex: (activeIndex) => dispatch(setActiveQuestionIndex(activeIndex)),
        setUserFirstName: (firstName) => dispatch(setUserFirstName(firstName)),
        setUserLastName: (lastName) => dispatch(setUserLastName(lastName)),
        setUserEmail: (email) => dispatch(setUserEmail(email)),
        setUserPhone: (phone) => dispatch(setUserPhone(phone)),
        setUserMovingDate: (date) => dispatch(setUserMovingDate(date)),
        setUserBedrooms: (bedrooms) => dispatch(setUserBedrooms(bedrooms)),
        setUserMovingReasons: (reasons) => dispatch(setUserMovingReasons(reasons)),
        setUserMovingReasonOther: (otherReason) => dispatch(setUserMovingReasonOther(otherReason)),
        setUserAmenities: (amenities) => dispatch(setUserAmenities(amenities)),
        setUserPets: (pets) => dispatch(setUserPets(pets)),
        goBack: () => dispatch(goBack()),
        saveState: () => dispatch(saveState()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);