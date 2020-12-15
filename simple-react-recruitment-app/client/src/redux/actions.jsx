import {
    reqRegister,
    reqLogin,
    reqUserUpdate,
    reqUserInfo
} from "../api";
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER
} from "./action-types";

const authSuccess = (user) =>({type: AUTH_SUCCESS, user})
const errorMsg = (msg) =>({type:ERROR_MSG, msg})
const receiveUser = (user) =>({type:RECEIVE_USER,user})
export const resetUser = (msg) =>({type:RESET_USER,msg})

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
            dispatch(receiveUser(result.data))
        }else {
            dispatch(resetUser(result.msg))
        }
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

