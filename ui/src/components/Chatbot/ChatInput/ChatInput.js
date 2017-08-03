import React from 'react';
import {connect} from 'react-redux'
import axios from 'axios'
import Promise from 'promise';

import {
    addToChatHistory,
    setActiveQuestionIndex,
    goBack,
    saveState,
    setIsBotTyping,
    setDisableFormInput
} from "../../../actions/ChatScript/ChatScript";

import Checkbox from "./Checkbox/Checkbox";
import Text from "./Text/Text";
import Email from "./Email/Email";
import Phone from "./Phone/Phone";
import Textarea from "./Textarea/Textarea";
import DateInput from "./DateInput/DateInput";
import Select from "./Select/Select";

import validator from "../../../utility/validator/validator"

class ChatInput extends React.Component {

    constructor() {
        super();
        this.inputTypes = {Checkbox, Text, Email, Phone, Textarea, DateInput, Select};
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.props.saveState();
        axios.post(
            "/services/save-chat-state/",
            this.props.ChatScript
        );

        this.props.setDisableFormInput(true);
        this._addUserText();
        const validationObj = this._getValidationObj();

        const startBotTyping = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.props.setIsBotTyping(true);
                    resolve();
                }, 500);
            });
        };

        const stopBotTyping = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.props.setIsBotTyping(false);
                    resolve();
                }, 2000);
            });
        };

        if (validationObj.isValid) {
            const enterBotText = () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        this._addBotText();
                        this.props.setActiveQuestionIndex(this.props.activeQuestionIndex + 1);
                        this.props.setDisableFormInput(false);
                        resolve();
                    }, 500);
                });
            };

            startBotTyping()
                .then(stopBotTyping)
                .then(enterBotText)
                .then(() => {
                    const isCompleted = this.props.activeQuestionIndex === this.props.questionOrder.length;
                    if (!isCompleted) {
                        axios.post(
                            "/services/save-chat-state/",
                            this.props.ChatScript
                        );
                    }
                });
        }
        else {
            const enterBotText = () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        this._addBotErrorText(validationObj);
                        this.props.setDisableFormInput(false);
                        resolve();
                    }, 500);
                });
            };
            startBotTyping()
                .then(stopBotTyping)
                .then(enterBotText)
                .then(() => {
                    axios.post(
                        "/services/save-chat-state/",
                        this.props.ChatScript
                    );
                });
        }

        const isCompleted = (this.props.activeQuestionIndex + 1 ) === this.props.questionOrder.length;
        if (isCompleted) {
            axios.post("/service/save-complete-chat-session/", {
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
            <form className="chat-input" onSubmit={this.handleFormSubmit.bind(this)}>
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
            axios.post(
                "/services/save-chat-state/",
                this.props.ChatScript
            );
        }
    }

    _getValidationObj() {
        let validationObj = {
            isValid: true
        };
        const currentQuestion = this._getCurrentQuestion();
        currentQuestion.answers.forEach((answer) => {
            if (answer.required && this.props.answers[this._getCurrentQuestionId()][answer.key].value === "") {
                validationObj = {
                    isValid: false,
                    messages: [
                        answer.text + " is required.",
                        "Whoops! " + answer.text + " is required.",
                        "Shucks! " + answer.text + " is required."
                    ]
                };
            }

            if (answer.validation && validationObj.isValid) {
                validationObj = validator(answer.validation, this.props.answers[this._getCurrentQuestionId()][answer.key].text);
            }
        });
        return validationObj;
    }

    _addUserText() {
        const currentQuestion = this._getCurrentQuestion();
        const message = currentQuestion.answers.reduce((acc, answer) => {
            let text = "";
            if (answer.type === "Checkbox") {
                text = answer.options.reduce((acc, option) => {
                    const usersAnswer = this.props.answers[this._getCurrentQuestionId()][option.value];

                    if (usersAnswer.checked) {
                        acc += option.text + " ";
                    }
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

    _addBotErrorText(validationObj) {
        const messageIndex = Math.floor(Math.random() * validationObj.messages.length);
        this.props.addToChatHistory({
            text: validationObj.messages[messageIndex],
            isBot: true,
            timestamp: new Date().getTime()
        });
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
        answers: state.ChatScript.present.answers,
        isFormDisabled: state.ChatScript.present.isFormDisabled,
        ChatScript: state.ChatScript
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addToChatHistory: (chatObject) => dispatch(addToChatHistory(chatObject)),
        setIsBotTyping: (isBotTyping) => dispatch(setIsBotTyping(isBotTyping)),
        setActiveQuestionIndex: (activeIndex) => dispatch(setActiveQuestionIndex(activeIndex)),
        setDisableFormInput: (isDisabled) => dispatch(setDisableFormInput(isDisabled)),
        goBack: () => dispatch(goBack()),
        saveState: () => dispatch(saveState()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);