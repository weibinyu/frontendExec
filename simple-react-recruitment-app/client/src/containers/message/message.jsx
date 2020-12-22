import React from 'react'
import {connect} from 'react-redux'
import {Badge, List} from "antd-mobile";
import RcQueueAnim from "rc-queue-anim";

const Item = List.Item
const Brief = Item.Brief

function Message(props){
  const {user} = props
  const {users,chatMessages} = props.chat

  const getLastMessageOfChats = (chatMessages,userid) => {
    const lastMessageOfChats = {}

    chatMessages.forEach(message =>{

      if(message.to === userid && !message.read){
        message.unReadMessages = 1
      }else {
        message.unReadMessages = 0
      }

      const chatId = message.chat_id
      const lastMessage = lastMessageOfChats[chatId]
      if(!lastMessage){
        lastMessageOfChats[chatId] = message
      }else{
        const unReadMessages = lastMessage.unReadMessages
        if(message.create_time > lastMessage.create_time){
          lastMessageOfChats[chatId] = message
        }
        lastMessageOfChats[chatId].unReadMessages = message.unReadMessages + unReadMessages
      }
    })

    const lastMessages = Object.values(lastMessageOfChats)
    lastMessages.sort(function (m1,m2){
      return  m2.create_time - m1.create_time
    })

    return lastMessages
  }

  const lastMessages = getLastMessageOfChats(chatMessages,user._id)

  return (
      <List className='lists'>
        <RcQueueAnim type='bottom' delay={100}>
          {
            lastMessages.map((message) => {
              const targetUserId = message.to === user._id ?message.from:message.to
              const targetUser =  users[targetUserId]
              return(
                  <Item key={message.chat_id}
                        extra={<Badge text={message.unReadMessages}/>}
                        thumb={targetUser.avatar ? require(`@/assets/avatars/${targetUser.avatar}.png`).default : null}
                        arrow='horizontal'
                        onClick={() => props.history.push(`/chat/${targetUserId}`)}
                  >{message.content}
                    <Brief>{targetUser.username}</Brief>
                  </Item>
              )
            })
          }
        </RcQueueAnim>

      </List>
  )
}

export default connect(
    state =>({user:state.user,chat: state.chat}),
    {}
)(Message)