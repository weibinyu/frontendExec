import React,{useState} from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from "antd-mobile";
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from "../../components/logo/logo";
import {register} from "../../redux/actions";

const ListItem = List.Item

function Register(props){
    const [regInfo,setRegInfo] = useState({
        username:'',
        password:'',
        confirmPassword:'',
        userType:''
    })

    const submitRegister = () => {
        props.register(regInfo)
    }

    const handleChange = (stateName,value) =>{
        setRegInfo(prevRegInfo => ({
            ...prevRegInfo,
            [stateName]:value
        }))
    }

    const toLogin = () =>{
        props.history.replace('/login')
    }
    const {userType} = regInfo
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
                    <InputItem placeholder='Please confirm password' type="password"
                               onChange={value => {handleChange('confirmPassword',value)}}>
                        Confirm:
                    </InputItem>
                    <WhiteSpace/>
                    <ListItem>
                        <span>User type:</span>
                        &nbsp;&nbsp;&nbsp;
                        <Radio
                            checked={userType ==='employee'}
                            onChange={value => {handleChange('userType','employee')}}>
                            Employee
                        </Radio>
                        &nbsp;&nbsp;&nbsp;
                        <Radio
                            checked={userType ==='employer'}
                            onChange={value => {handleChange('userType','employer')}}>
                            Employer
                        </Radio>
                    </ListItem>
                    <WhiteSpace/>
                    <Button type="primary" onClick={submitRegister}>Register</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={toLogin}>Login</Button>
                </List>
            </WingBlank>
        </>
    )


}

export default connect(
    state=>({user:state.user}),
    {register}
)(Register)