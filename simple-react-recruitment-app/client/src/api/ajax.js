/*
    Use axios to perform ajax action.
    Returns promise instance.
*/
import axios from 'axios'

export default function ajax(url, data={}, type='GET'){
    const instance = axios.create({
        //baseURL:'https://localhost:4000',
        //baseURL:'https://infinite-reef-37663.herokuapp.com',
        baseURL:'https://server.thepriceofedu.xyz',
        timeout:5000,
        withCredentials:true
    })

    if(type==='GET'){
        return instance({
            url,
            method:type,
            params: {
                ...data
            }
        })
    }else {
        return instance({
            url,
            method:'POST',
            data:{
                ...data
            }
        })
    }


}