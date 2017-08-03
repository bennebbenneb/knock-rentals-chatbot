const validator = (validationKey, value) => {
    if (validationKey === "tel") {
        const rawNumbers = value.replace(/\D+/g, "");
        if (rawNumbers.length < 10) {
            return {
                isValid: false,
                messages: [
                    "Make sure to enter your full 10 digit phone number",
                    "I think you're missing some numbers",
                    "Whoops! You're missing some numbers"
                ]
            };
        }
    }
    else if (validationKey === "email") {
        if (!value.match(/\S+@\S+/)) {
            return {
                isValid: false,
                messages: [
                    "That email doesn't look quite right.",
                    "Are you sure that's your email?",
                    "Fix the issue with your email before we go on."
                ]
            };
        }
    }
    else if (validationKey === "date") {
        const movingDate = new Date(value);
        if (movingDate.toString() === "Invalid Date") {
            return {
                isValid: false,
                messages: [
                    "That's not a valid date. Try this format, MM/DD/YYYY"
                ]
            };
        }

        let now = new Date();
        now.setMilliseconds(0);
        now.setSeconds(0);
        now.setMinutes(0);
        now.setHours(0);
        const diffInDates = movingDate.getTime() - now.getTime();
        const oneDay = 8.64e+7;

        if (diffInDates < oneDay) {
            return {
                isValid: false,
                messages: [
                    "Please choose a date at least one full day from today.",
                    "That's too soon.",
                    "We need more notice."
                ]
            };
        }
    }
    return {
        isValid: true
    }
};
export default validator;