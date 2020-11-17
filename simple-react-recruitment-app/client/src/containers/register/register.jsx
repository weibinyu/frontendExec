import React, {Component} from 'react'
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
class Register extends Component{

    state = {
        username:'',
        password:'',
        confirmPassword:'',
        userType:''
    }

    submitRegister = () => {
        this.props.register(this.state)
    }

    handleChange = (stateName,value) =>{
        this.setState({
            [stateName] : value
        })
    }

    toLogin = () =>{
        this.props.history.replace('/login')
    }

    render() {
        const {userType} = this.state
        const {msg,redirectTo} = this.props.user
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
                                   onChange={value => {this.handleChange('username',value)}}>
                            Username:
                        </InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='Please enter password' type="password"
                                   onChange={value => {this.handleChange('password',value)}}>
                            Password:
                        </InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='Please confirm password' type="password"
                                   onChange={value => {this.handleChange('confirmPassword',value)}}>
                            Confirm:
                        </InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>User type:</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio
                                checked={userType ==='employee'}
                                onChange={value => {this.handleChange('userType','employee')}}>
                                Employee
                            </Radio>
                            &nbsp;&nbsp;&nbsp;
                            <Radio
                                checked={userType ==='employer'}
                                onChange={value => {this.handleChange('userType','employer')}}>
                                Employer
                            </Radio>
                        </ListItem>
                        <WhiteSpace/>
                        <Button type="primary" onClick={this.submitRegister}>Register</Button>
                        <WhiteSpace/>
                        <Button type="primary" onClick={this.toLogin}>Login</Button>
                    </List>
                </WingBlank>
            </>
        )
    }


}

export default connect(
    state=>({user:state.user}),
    {register}
)(Register)