import {combineReducers} from "redux";
import {AUTH_SUCCESS, ERROR_MSG} from "./action-types";

const initUser = {
    username:'',
    userType:'',
    msg:'',
    redirectTo:''
}

function user(state= initUser,action){
    switch (action.type){
        case AUTH_SUCCESS:
            return {...action.user,redirectTo: '/'}
        case ERROR_MSG:
            return {...state, msg: action.msg}
        default:
            return state
    }
}

export default combineReducers({
    user
});