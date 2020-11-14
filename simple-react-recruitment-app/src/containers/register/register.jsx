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
  render() {
    return(
        <>
            <NavBar>Recruitment App</NavBar>
            <Logo/>
            <WingBlank>
                <List>
                    <InputItem>Username:</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password">Password:</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password">Confirm:</InputItem>
                    <WhiteSpace/>
                    <ListItem>
                        <span>User type:</span>
                        &nbsp;&nbsp;&nbsp;
                        <Radio>Employee</Radio>
                        &nbsp;&nbsp;&nbsp;
                        <Radio>Employer</Radio>
                    </ListItem>
                    <WhiteSpace/>
                    <Button type="primary">Register</Button>
                    <WhiteSpace/>
                    <Button type="primary">Login</Button>
                </List>
            </WingBlank>
        </>
    )
  }
}