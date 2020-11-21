export function getRedirectTo(userType,avatar){
    let path = ''
    if(userType==='employee'){
        path = '/employee'
    }else {
        path = '/employer'
    }
    if(!avatar){
        path += '_info'
    }

    return path
}