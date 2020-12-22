import {combineReducers} from "redux";
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RESET_USER,
    RECEIVE_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MESSAGE,
    RECEIVE_MESSAGE_LIST, MESSAGE_READ
} from "./action-types";
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

const initChat = {
    users:{}, //AttrName userid AttrContent{username,avatar}
    chatMessages:[],
    unReadMessages:0
}

function chat(state=initChat,action){
    switch (action.type){
        case RECEIVE_MESSAGE_LIST:
            const {users,chatMessages,userid} = action.data
            return {
                users,
                chatMessages,
                unReadMessages: chatMessages.reduce((prev,message) =>{
                    if(message.to === userid && !message.read){
                        return prev+1
                    }
                    return prev
                },0)
            }
        case RECEIVE_MESSAGE:
            const {chatMessage} = action.data
            return {
                users:state.users,
                chatMessages:[...state.chatMessages,chatMessage],
                unReadMessages: state.unReadMessages +
                    (!chatMessage.read && chatMessage.to === action.data.userid ? 1:0)
            }
        case MESSAGE_READ:
            const {from,to,count} = action.data
            return {
                users: state.users,
                chatMessages: state.chatMessages.map(message => {
                    if(message.from === from && message.to === to && !message.read){
                        return {...message,read:true}
                    }else{
                        return message
                    }
                }),
                unReadMessages: state.unReadMessages - count
            }
        default:
            return state
    }
}

export default combineReducers({
    user,userList,chat
});