import ajax from './ajax'

export const reqRegister = (user) => ajax('/register',user,'POST')

export const reqLogin = (user) => ajax('/login',user,'POST')

export const reqUserUpdate = (user) => ajax('/userUpdate',user,'POST')

export const reqUserInfo = () => ajax('/userInfo')

export const reqUserList = (userType) => ajax('/userList',{userType})

export const reqChatMessageList = () => ajax('/messageList')

export const reqMessageReadUpdate = (from) => ajax('/readMessage',{from},'POST')