import React,{useState} from 'react'
import {connect} from 'react-redux'
import {Result,List, WhiteSpace, Button,Modal} from "antd-mobile";
import Cookies from 'js-cookie'

import {resetUser} from '@/redux/actions';

function Personal(props){
  const Item = List.Item
  const Brief = Item.Brief

  const {username,avatar,company,desiredPosition,salary,personalInfo} = props.user

  const handleLogout = () => {
    Modal.alert('Logout','Do you want to logout?',[
      {text:'No'},
      {
        text:'Yes',
        onPress: () => {
          Cookies.remove('userid')
          props.resetUser()
        }
      }
    ])
  }
  return (
      <div>
        <Result
            img = { <img src = { require(`@/assets/avatars/${avatar}.png`).default}
                         style={{width:50}} alt='header' />}
            title={username}
            message={company}
        />

        <List renderHeader={()=>'Related Info'}>
          <Item multipleLine>
            <Brief>Post: {desiredPosition}</Brief>
            <Brief>Info: {personalInfo}</Brief>
            {salary ? <Brief>Salary: {salary}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace/>
        <Button type='warning' onClick={handleLogout}>Logout</Button>
      </div>
  )
}

export default connect(
    state =>({user:state.user}),
    {resetUser}
)(Personal)