import profileReducer from "./profile";
import authReducer from './auth';
import { postReducer } from "./post";
import { combineReducers } from "redux";
import {alertReducer} from "./alert";

const root =combineReducers({
    postReducer,
    authReducer,
    profileReducer,
    alertReducer
})

export default root
