import {combineReducers} from "redux";
import {AUTH_SUCCESS, ERROR_MSG} from "./action-types";
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
        default:
            return state
    }
}

export default combineReducers({
    user
});