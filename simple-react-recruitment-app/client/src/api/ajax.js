/*
    Use axios to perform ajax action.
    Returns promise instance.
*/
import axios from 'axios'

export default function ajax(url, data={}, type='GET'){
    if(type==='GET'){
        const paramStr = createParamString(data)
        return axios.get(url+'?'+paramStr)
    }else {
        return axios.post(url,data)
    }
}

function createParamString(data){
    let paramStr = ''
    Object.keys(data).forEach(key =>{
        paramStr += key+'='+data[key]+'&'
    })
    if(paramStr){
        paramStr = paramStr.substring(0,paramStr.length-1)
    }
    return paramStr
}