const User = (state = {
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    moveDate: null,
    moveReasons: [],
    movingReasonOther: null,
    amenities: [],
}, action = {}) => {
    if (action.type === "SET_USER_FIRST_NAME") {
        return {...state, firstName: action.payload};
    }
    if (action.type === "SET_USER_LAST_NAME") {
        return {...state, lastName: action.payload};
    }
    if (action.type === "SET_USER_EMAIL") {
        return {...state, email: action.payload};
    }
    if (action.type === "SET_USER_PHONE") {
        return {...state, phone: action.payload};
    }
    if (action.type === "SET_USER_MOVING_DATE") {
        return {...state, moveDate: action.payload};
    }
    if (action.type === "SET_USER_MOVING_REASONS") {
        return {...state, moveReasons: action.payload};
    }
    if (action.type === "SET_USER_BEDROOMS") {
        return {...state, bedrooms: action.payload};
    }
    if (action.type === "SET_USER_MOVING_REASON_OTHER") {
        return {...state, movingReasonOther: action.payload};
    }
    if (action.type === "SET_USER_AMENITIES") {
        return {...state, amenities: action.payload};
    }
    return {...state};
};

export default User;