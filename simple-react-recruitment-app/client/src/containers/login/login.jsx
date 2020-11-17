import React, {useState} from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from "antd-mobile";

import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from "../../components/logo/logo";
import {login} from "../../redux/actions";

function Login(props){

    const [userInfo,setUserInfo] = useState({
        username:'',
        password:''
    })

    const handleChange = (stateName,value)=>{
        setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            [stateName]: value
        }));
    }

    const tryLogin = () =>{
        props.login(userInfo)
    }

    const toRegister = () =>{
        props.history.replace('/register')
    }

    const {msg,redirectTo} = props.user
    if(redirectTo){
        return <Redirect to={redirectTo}/>
    }

    return(
        <>
            <NavBar>Recruitment App</NavBar>
            <Logo/>
            <WingBlank>
                <List>
                    {msg?<div className='error-msg'>{msg}</div>:null}
                    <InputItem placeholder='Please enter username'
                               onChange={value => {handleChange('username',value)}}>
                        Username:
                    </InputItem>
                    <WhiteSpace/>
                    <InputItem placeholder='Please enter password' type="password"
                               onChange={value => {handleChange('password',value)}}>
                        Password:
                    </InputItem>
                    <WhiteSpace/>
                    <Button type="primary" onClick={tryLogin}>Login</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={toRegister}>Register new user</Button>
                </List>
            </WingBlank>
        </>
    )
}
export default connect(
    state =>({user:state.user}),
    {login}
)(Login)