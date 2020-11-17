import {
    reqRegister,
    reqLogin,
    reqUserUpdate
} from "../api";
import {
    AUTH_SUCCESS,
    ERROR_MSG
} from "./action-types";

const authSuccess = (user) =>({type: AUTH_SUCCESS, user})
const errorMsg = (msg) =>({type:ERROR_MSG, msg})

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

