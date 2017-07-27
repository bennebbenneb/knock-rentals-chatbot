const User = {
    setUserFirstName: (firstName) => {
        return {
            type: "SET_USER_FIRST_NAME",
            payload: firstName
        }
    },
    setUserLastName: (lastName) => {
        return {
            type: "SET_USER_LAST_NAME",
            payload: lastName
        }
    },
    setUserEmail: (email) => {
        return {
            type: "SET_USER_EMAIL",
            payload: email
        }
    },
    setUserPhone: (phone) => {
        return {
            type: "SET_USER_PHONE",
            payload: phone
        }
    },
    setUserMovingDate: (movingDate) => {
        return {
            type: "SET_USER_MOVING_DATE",
            payload: movingDate
        }
    },
    setUserMovingReasons: (reasons) => {
        return {
            type: "SET_USER_MOVING_REASONS",
            payload: reasons
        }
    },
    setUserBedrooms: (bedrooms) => {
        return {
            type: "SET_USER_BEDROOMS",
            payload: bedrooms
        }
    },
    setUserMovingReasonOther: (otherReason) => {
        return {
            type: "SET_USER_MOVING_REASON_OTHER",
            payload: otherReason
        }
    },
    setUserAmenities: (amenities) => {
        return {
            type: "SET_USER_AMENITIES",
            payload: amenities
        }
    },
    setUserPets: (pets) => {
        return {
            type: "SET_USER_PETS",
            payload: pets
        }
    }
};
module.exports = User;