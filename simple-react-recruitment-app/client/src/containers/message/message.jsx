import React from 'react'
import {connect} from 'react-redux'
import {Badge, List} from "antd-mobile";

const Item = List.Item
const Brief = Item.Brief

function Message(props){

  return (
      <List className='lists'>
        <Item
            extra={<Badge text={3}/>}
            thumb={require(`@/assets/avatars/Avatar1.png`).default}
            arrow='horizontal'
        >Hello
          <Brief>nr2</Brief>
        </Item>
        <Item
            extra={<Badge text={3}/>}
            thumb={require(`@/assets/avatars/Avatar2.png`).default}
            arrow='horizontal'
        >Hello2
          <Brief>nr2</Brief>
        </Item>
      </List>
  )
}

export default connect(
    state =>({}),
    {}
)(Message)