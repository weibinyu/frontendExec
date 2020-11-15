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

import Logo from "../../components/logo/logo";

const ListItem = List.Item
export default class Register extends Component{

    state = {
        username:'',
        password:'',
        confirmPassword:'',
        userType:''
    }

    submitRegister =()=> {
        console.log(this.state)
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

        return(
            <>
                <NavBar>Recruitment App</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
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