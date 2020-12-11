import {combineReducers} from "redux";
import {AUTH_SUCCESS, ERROR_MSG,RESET_USER,RECEIVE_USER} from "./action-types";
import {getRedirectTo} from "../utils";

const initUser = {
    username:'',
    userType:'',
    msg:'',
    redirectTo:''
}

function user(state= initUser,action){
    console.log(action)
    switch (action.type){
        case AUTH_SUCCESS:
            const {userType,avatar} = action.user
            return {...action.user,redirectTo: getRedirectTo(userType,avatar)}
        case ERROR_MSG:
            return {...state, msg: action.msg}
        case RECEIVE_USER:
            return action.user
        case RESET_USER:
            return {...initUser, msg: action.msg}
        default:
            return state
    }
}

export default combineReducers({
    user
});