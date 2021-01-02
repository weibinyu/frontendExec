import React from 'react'
import {connect} from 'react-redux'
import {Result,List, WhiteSpace, Button,Modal} from "antd-mobile";

import {resetUser} from '@/redux/actions';

function Personal(props){
  const Item = List.Item
  const {username,avatar,companyName,desiredPosition,offerSalary,personalInfo,positionRequirement,offeringPosition} = props.user

  const handleLogout = () => {
    Modal.alert('Logout','Do you want to logout?',[
      {text:'No'},
      {
        text:'Yes',
        onPress: () => {
          window.sessionStorage.removeItem("userid")
          props.resetUser()
        }
      }
    ])
  }
  return (
      <div style={{marginTop:50}}>
        <Result
            img = { <img src = { require(`@/assets/avatars/${avatar}.png`).default}
                         style={{width:50}} alt='header' />}
            title={username}
            message={companyName}
        />

        <List renderHeader={()=>'Related Info'}>
            {personalInfo ? <Item wrap>Info: {personalInfo}</Item> : null}
            {companyName ? <Item>Company: {companyName}</Item> : null}
            {offeringPosition ? <Item>Offer Position: {offeringPosition}</Item> : null}
            {desiredPosition ? <Item>Desired Position: {desiredPosition}</Item> : null}
            {positionRequirement? <Item wrap>Requirement: {positionRequirement}</Item> : null}
            {offerSalary ? <Item>Offer Salary: {offerSalary}</Item> : null}
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