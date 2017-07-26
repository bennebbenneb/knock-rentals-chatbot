import {applyMiddleware, createStore, combineReducers} from 'redux'
import {createLogger} from "redux-logger";
import thunk from "redux-thunk"
import ChatScript from './reducers/ChatScript/ChatScript'
import User from './reducers/User/User'

const reducer = combineReducers({
    ChatScript: ChatScript,
    User: User
});
const middleware = applyMiddleware(thunk, createLogger());
const store = createStore(reducer, middleware);

export default store;