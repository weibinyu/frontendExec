import io from 'socket.io-client'

import {
    reqRegister,
    reqLogin,
    reqUserUpdate,
    reqUserInfo,
    reqUserList,
    reqChatMessageList
} from "../api";
import {
    AUTH_SUCCESS,
    ERROR_MSG, RECEIVE_MESSAGE_LIST,
    RECEIVE_USER,
    RECEIVE_USER_LIST,
    RESET_USER,
} from "./action-types";

function initIO(){
    if(!io.socket){
        io.socket = io('ws://localhost:4000')
        io.socket.on('receiveMessage',(data) => {
            console.log('Browser got data: ',data)
        })
    }
}

const authSuccess = (user) =>({type: AUTH_SUCCESS, user})
const errorMsg = (msg) =>({type:ERROR_MSG, msg})
const receiveUser = (user) =>({type:RECEIVE_USER,user})
export const resetUser = (msg) =>({type:RESET_USER,msg})
export const receiveUserList = (userList) =>({type:RECEIVE_USER_LIST,userList})
export const receiveMessageList = ({users,chatMessages}) =>({type:RECEIVE_MESSAGE_LIST, data: {users,chatMessages}})

export const register = (user) =>{

    //validateUserInfo(user)
    //TODO:check out redux again, ask on stackoverflow if can't figure out
    const {username,password,confirmPassword,userType} = user
    if(!username){
        return errorMsg('Username is missing')
    }
    if(password !==confirmPassword){
        return errorMsg('Password needs to be consistent')
    }
    if(!userType){
        return errorMsg('User type needs to be selected')
    }

    return async dispatch =>{
        const response = await reqRegister({username,password,userType})
        const result = response.data
        if(result.code === 0){
            getMessageList(dispatch)
            dispatch(authSuccess(result.data))
        }else {
            dispatch(errorMsg(result.msg))
        }
    }
}
export const login = (user) =>{
    const {username} = user
    if(!username){
        return errorMsg('Username is missing')
    }

    return async dispatch =>{
        const response = await reqLogin(user)
        const result = response.data
        if(result.code === 0){
            getMessageList(dispatch)
            dispatch(authSuccess(result.data))
        }else {
            dispatch(errorMsg(result.msg))
        }
    }
}
export const updateUser = (user) =>{
    return async dispatch =>{
        const response = await reqUserUpdate(user)
        const result = response.data
        if(result.code===0){
            console.log(result.data)
            dispatch(receiveUser(result.data))
        }else {
            dispatch(resetUser(result.msg))
        }
    }
}
export const getUserInfo = () =>{
    return async dispatch =>{
        const response = await reqUserInfo()
        const result = response.data
        if(result.code===0){
            getMessageList(dispatch)
            dispatch(receiveUser(result.data))
        }else {
            dispatch(resetUser(result.msg))
        }
    }
}
export const getUserList = (userType) => {
    return async dispatch => {
        const response = await reqUserList(userType)
        const result = response.data
        if(result.code === 0){
            dispatch(receiveUserList(result.data))
        }
    }
}
export const sendMessage = ({from,to,content}) => {
    return dispatch => {
        io.socket.emit('sendMessage',{from,to,content})
    }
}

async function getMessageList(dispatch){
    initIO()
    const response = await reqChatMessageList()
    const result = response.data
    if(result.code ===0 ){
        const {users,chatMessages} = result.data
        dispatch(receiveMessageList({users,chatMessages}))
    }
}

/*
function validateUserInfo({username,password,confirmPassword,userType}){
    if(!username){
        return errorMsg('Username is missing')
    }
    if(password !==confirmPassword){
        return errorMsg('Password needs to be consistent')
    }
    if(!userType){
        return errorMsg('User type needs to be selected')
    }

}
*/

