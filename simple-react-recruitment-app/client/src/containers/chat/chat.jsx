import React from 'react'
import {connect} from 'react-redux'
import {InputItem, List, NavBar} from "antd-mobile";

const Item = List.Item

function Chat(props){
  return (
      <div id='chat-page'>
        <NavBar>aa</NavBar>
        <List>
          <Item
              thumb={require('@/assets/avatars/Avatar1.png').default}
          >
            Hi
          </Item>
          <Item className='chat-me' extra='me'>
            Hi
          </Item>
        </List>

        <div className='am-tab-bar'>
          <InputItem
              placeholder="input bar"
              extra={
                <span>Send</span>
              }
          />
        </div>
      </div>
  )
}

export default connect(
  state =>({}),
    {}
)(Chat)