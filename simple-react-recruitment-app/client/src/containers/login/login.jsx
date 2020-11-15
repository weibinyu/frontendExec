import React, {useState} from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from "antd-mobile";
import Logo from "../../components/logo/logo";

export default function Login(props){

    const [info,setInfo] = useState({
        username:'',
        password:''
    })

    const handleChange = (stateName,value)=>{
        setInfo(prevState => ({
            ...prevState,
            [stateName]: value
        }));
    }

    const tryLogin = () =>{
        console.log(info)
    }

    const toRegister = () =>{
        props.history.replace('/register')
    }

    return(
        <>
            <NavBar>Recruitment App</NavBar>
            <Logo/>
            <WingBlank>
                <List>
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