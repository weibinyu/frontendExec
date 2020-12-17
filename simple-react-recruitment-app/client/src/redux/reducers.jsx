import {combineReducers} from "redux";
import {AUTH_SUCCESS, ERROR_MSG, RESET_USER, RECEIVE_USER, RECEIVE_USER_LIST} from "./action-types";
import {getRedirectTo} from "../utils";

const initUser = {
    username:'',
    userType:'',
    msg:'',
    redirectTo:''
}

function user(state= initUser,action){
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

const initUserList = []

function userList(state = initUserList,action){
    switch (action.type){
        case RECEIVE_USER_LIST:
            return action.userList
        default:
            return state
    }
}

export default combineReducers({
    user,userList
});