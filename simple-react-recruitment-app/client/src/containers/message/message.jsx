import React from 'react'
import {connect} from 'react-redux'
import {Badge, List} from "antd-mobile";

const Item = List.Item
const Brief = Item.Brief

function Message(props){
  const {user} = props
  const {users,chatMessages} = props.chat

  const getLastMessageOfChats = (chatMessages) => {
    const lastMessageOfChats = {}

    chatMessages.forEach(message =>{
      const chatId = message.chat_id
      const lastMessage = lastMessageOfChats[chatId]
      if(!lastMessage){
        lastMessageOfChats[chatId] = message
      }else{
        if(message.create_time > lastMessage.create_time){
          lastMessageOfChats[chatId] = message
        }
      }
    })

    const lastMessages = Object.values(lastMessageOfChats)
    lastMessages.sort(function (m1,m2){
      return  m2.create_time - m1.create_time
    })

    return lastMessages
  }

  const lastMessages = getLastMessageOfChats(chatMessages)

  return (
      <List className='lists'>
        {
          lastMessages.map((message) => {
            const targetUserId = message.to === user._id ?message.from:message.to
            const targetUser =  users[targetUserId]
            return(
                <Item key={message.chat_id}
                      extra={<Badge text={0}/>}
                      thumb={targetUser.avatar ? require(`@/assets/avatars/${targetUser.avatar}.png`).default : null}
                      arrow='horizontal'
                      onClick={() => props.history.push(`/chat/${targetUserId}`)}
                >{message.content}
                  <Brief>{targetUser.username}</Brief>
                </Item>
            )
          })
        }
      </List>
  )
}

export default connect(
    state =>({user:state.user,chat: state.chat}),
    {}
)(Message)