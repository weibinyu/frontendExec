import io from 'socket.io-client'

import {
    reqRegister,
    reqLogin,
    reqUserUpdate,
    reqUserInfo,
    reqUserList,
    reqChatMessageList, reqMessageReadUpdate
} from "../api";
import {
    AUTH_SUCCESS,
    ERROR_MSG, MESSAGE_READ, RECEIVE_MESSAGE, RECEIVE_MESSAGE_LIST,
    RECEIVE_USER,
    RECEIVE_USER_LIST,
    RESET_USER,
} from "./action-types";

function initIO(dispatch,userid){
    if(!io.socket){
        io.socket = io('wss://server.thepriceofedu.xyz')
        //io.socket = io('wss://localhost:4000/')
        io.socket.on('receiveMessage',(chatMessage) => {
            console.log('Browser got data: ',chatMessage)
            if(userid === chatMessage.from || userid === chatMessage.to){
                dispatch(receiveMessage(chatMessage,userid))
            }
        })
    }
}

const authSuccess = (user) =>({type: AUTH_SUCCESS, user})
const errorMsg = (msg) =>({type:ERROR_MSG, msg})
const receiveUser = (user) =>({type:RECEIVE_USER,user})
export const resetUser = (msg) =>({type:RESET_USER,msg})
const receiveUserList = (userList) =>({type:RECEIVE_USER_LIST,userList})
const receiveMessageList = ({users,chatMessages,userid}) =>
    ({type:RECEIVE_MESSAGE_LIST, data: {users,chatMessages,userid}})
const receiveMessage = (chatMessage,userid) => ({type:RECEIVE_MESSAGE, data:{chatMessage,userid}})
const messageRead = ({count,from,to}) => ({type:MESSAGE_READ,data:{count,from,to}})

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
            window.sessionStorage.setItem("userid", '1');
            await getMessageList(dispatch,result.data._id)
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
            window.sessionStorage.setItem("userid", '1');
            await getMessageList(dispatch,result.data._id)
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
            window.sessionStorage.setItem("userid", '1');
            await getMessageList(dispatch,result.data._id)
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

export const readMessage =(from,to) => {
    return async dispatch => {
        const response = await reqMessageReadUpdate(from)
        const result = response.data
        if(result.code === 0){
            const count = result.data
            dispatch(messageRead({count,from,to}))
        }
    }
}

async function getMessageList(dispatch,userid){
    initIO(dispatch,userid)
    const response = await reqChatMessageList()
    const result = response.data
    if(result.code === 0 ){
        const {users,chatMessages} = result.data
        dispatch(receiveMessageList({users,chatMessages,userid}))
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

