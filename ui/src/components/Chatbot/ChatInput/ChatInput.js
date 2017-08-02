import React from 'react';
import {connect} from 'react-redux'
import axios from 'axios'
import smoothScroll from 'smoothscroll';
import {
    addToChatHistory,
    setActiveQuestionIndex,
    goBack,
    saveState,
    setIsBotTyping,
    setDisableFormInput
} from "../../../actions/ChatScript/ChatScript";
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
import Checkbox from "./Checkbox/Checkbox";
import Text from "./Text/Text";
import Email from "./Email/Email";
import Phone from "./Phone/Phone";
import Textarea from "./Textarea/Textarea";
import DateInput from "./DateInput/DateInput";
import Select from "./Select/Select";

class ChatInput extends React.Component {

    constructor() {
        super();
        this.inputTypes = {Checkbox, Text, Email, Phone, Textarea, DateInput, Select};
        new Date();
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.props.saveState();
        this.props.setDisableFormInput(true);
        this._addUserText();
        if (this._isValid()) {

            setTimeout(() => {
                this.props.setIsBotTyping(true);
            }, 500);


            setTimeout(() => {
                this.props.setIsBotTyping(false);
                setTimeout(() => {
                    this._addBotText();
                    this.props.setActiveQuestionIndex(this.props.activeQuestionIndex + 1);
                    this.props.setDisableFormInput(false);

                    if (this.refs.continue) {
                        smoothScroll(this.refs.continue)
                    }
                }, 500);
            }, 4000);

        }
        else {
            this.props.setDisableFormInput(false);
        }

        const isCompleted = (this.props.activeQuestionIndex + 1 ) === this.props.questionOrder.length;
        if (isCompleted) {
            axios.post("/service/chatbot/", {
                answers: this.props.answers,
                history: this.props.history
            });
        }
    }

    render() {
        const isCompleted = this.props.activeQuestionIndex === this.props.questionOrder.length;
        const currentQuestion = this._getCurrentQuestion();
        let inputFields = [];
        if (currentQuestion) {
            const answers = currentQuestion.answers;

            if (answers)
                inputFields = answers.map((answer) => {
                    const Answertype = this.inputTypes[answer.type];
                    return (
                        <Answertype key={answer.key} answer={answer} questionId={this._getCurrentQuestionId()}/>
                    );
                })
        }

        return (
            <form className="chat-input" ref="chatForm" onSubmit={this.handleFormSubmit.bind(this)}>
                {
                    !isCompleted
                        ?
                        <button disabled={!this._hasUserHistory() || this.props.isFormDisabled}
                                onClick={this._goBack.bind(this)} type="button">
                            Rewind Time</button>
                        : ""
                }
                <div className="input-fields">{inputFields ? inputFields : ""}</div>
                {
                    !isCompleted
                        ? <input ref="continue" disabled={this.props.isFormDisabled} type="submit" value="Continue"/>
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


    _isValid() {
        let isValid = true;
        const currentQuestion = this._getCurrentQuestion();
        currentQuestion.answers.forEach((answer) => {
            if (answer.required && this.props.answers[this._getCurrentQuestionId()][answer.key].value === "") {
                let randomizer = Math.random() * 3;
                if (randomizer > 2) {
                    this.props.addToChatHistory({
                        text: " " + answer.text + " " + "is required.",
                        isBot: true,
                        isError: true,
                        timestamp: new Date().getTime()
                    });
                }
                else if (randomizer > 1) {
                    this.props.addToChatHistory({
                        text: "Whoops! " + answer.text + " is required.",
                        isBot: true,
                        isError: true,
                        timestamp: new Date().getTime()
                    });
                }
                else {
                    this.props.addToChatHistory({
                        text: "Shucks! " + answer.text + " is required.",
                        isBot: true,
                        isError: true,
                        timestamp: new Date().getTime()
                    });
                }

                isValid = false;
            }

            if (answer.validation) {
                isValid = isValid && this._validator(answer.validation, this.props.answers[this._getCurrentQuestionId()][answer.key].text);
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
                        isError: true,
                        timestamp: new Date().getTime()
                    });
                }
                else if (randomizer > 1) {
                    this.props.addToChatHistory({
                        text: "I think you're missing some numbers",
                        isBot: true,
                        isError: true,
                        timestamp: new Date().getTime()
                    });
                }
                else {
                    this.props.addToChatHistory({
                        text: "Whoops! You're missing some numbers",
                        isBot: true,
                        isError: true,
                        timestamp: new Date().getTime()
                    });
                }
                return false;
            }
            else if ((rawNumbers + "").indexOf("555") === 0) {
                if (randomizer > 2) {
                    this.props.addToChatHistory({
                        text: "A 555 number? I see...",
                        isBot: true,
                        isError: true,
                        timestamp: new Date().getTime()
                    });
                }
                else if (randomizer > 1) {
                    this.props.addToChatHistory({
                        text: "Did you get this number from a movie by chance?",
                        isBot: true,
                        isError: true,
                        timestamp: new Date().getTime()
                    });
                }
                else {
                    this.props.addToChatHistory({
                        text: "We need a valid phone number",
                        isBot: true,
                        isError: true,
                        timestamp: new Date().getTime()
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
                        isError: true,
                        timestamp: new Date().getTime()
                    });
                }
                else if (randomizer > 1) {
                    this.props.addToChatHistory({
                        text: "Are you sure that's your email?",
                        isBot: true,
                        isError: true,
                        timestamp: new Date().getTime()
                    });
                }
                else {
                    this.props.addToChatHistory({
                        text: "Fix the issue with your email before we go on.",
                        isBot: true,
                        isError: true,
                        timestamp: new Date().getTime()
                    });
                }
                return false;
            }
        }
        if (validationKey === "date") {
            const movingDate = new Date(value);
            if (movingDate.toString() === "Invalid Date") {
                this.props.addToChatHistory({
                    text: "That's not a valid date. Try this format, MM/DD/YYYY",
                    isBot: true,
                    isError: true,
                    timestamp: new Date().getTime()
                });
                return false;
            }

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
                        isError: true,
                        timestamp: new Date().getTime()
                    });
                }

                else if (randomizer > 1) {
                    this.props.addToChatHistory({
                        text: "That's too soon.",
                        isBot: true,
                        isError: true,
                        timestamp: new Date().getTime()
                    });
                }
                else {
                    this.props.addToChatHistory({
                        text: "We need more notice.",
                        isBot: true,
                        isError: true,
                        timestamp: new Date().getTime()
                    });
                }
                return false;
            }
        }
        return true;
    }

    _addUserText() {
        const currentQuestion = this._getCurrentQuestion();
        const message = currentQuestion.answers.reduce((acc, answer) => {
            let text = "";
            if (answer.type === "Checkbox") {
                text = answer.options.reduce((acc, option) => {
                    acc += option.text + " ";
                    return acc;
                }, "") + " ";
            }
            else {
                text = this.props.answers[this._getCurrentQuestionId()][answer.key].text + " ";
            }
            acc += text;
            return acc;
        }, "");

        this.props.addToChatHistory({
            text: message,
            isBot: false,
            timestamp: new Date().getTime()
        });
    }

    _addBotText() {
        const qIndex = this.props.activeQuestionIndex;

        if ((qIndex + 1) !== this.props.questionOrder.length) {
            const nextQuestionId = this.props.questionOrder[qIndex + 1];
            const nextQuestion = this.props.questions[nextQuestionId];

            this.props.addToChatHistory({...nextQuestion, isBot: true, timestamp: new Date().getTime()});
        }
        else {
            this.props.addToChatHistory({
                text: this.props.completedMessage,
                isBot: true,
                timestamp: new Date().getTime()
            });
        }
    }

    _getCurrentQuestion() {
        const currentQuestionId = this._getCurrentQuestionId();
        const currentQuestion = this.props.questions[currentQuestionId];
        return currentQuestion;
    }

    _getCurrentQuestionId() {
        const qIndex = this.props.activeQuestionIndex;
        const currentQuestionId = this.props.questionOrder[qIndex];
        return currentQuestionId;
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
        answers: state.ChatScript.present.answers,
        isFormDisabled: state.ChatScript.present.isFormDisabled
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addToChatHistory: (chatObject) => dispatch(addToChatHistory(chatObject)),
        setIsBotTyping: (isBotTyping) => dispatch(setIsBotTyping(isBotTyping)),
        setActiveQuestionIndex: (activeIndex) => dispatch(setActiveQuestionIndex(activeIndex)),
        setDisableFormInput: (isDisabled) => dispatch(setDisableFormInput(isDisabled)),
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