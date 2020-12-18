import React, {useState} from 'react'
import {connect} from 'react-redux'
import {InputItem, List, NavBar} from "antd-mobile";
import {sendMessage} from "../../redux/actions";

const Item = List.Item

function Chat(props){
  const {user} = props
  const {users,chatMessages} = props.chat
  const [content,setContent] = useState(" ")

  const handleSend = () =>{
    const from = user._id
    const to = props.match.params.userid
    if(content){
      props.sendMessage({from,to,content})
    }
    setContent('')
  }

  const meId = user._id
  if(!users[meId]){
    return null
  }
  const targetId = props.match.params.userid
  const chatId = [meId,targetId].sort().join('_')

  const messages = chatMessages.filter(message => message.chat_id === chatId)

  const targetAvatar =
      users[targetId].avatar ? require(`@/assets/avatars/${users[targetId].avatar}.png`).default : null

  return (
      <div id='chat-page'>
        <NavBar>aa</NavBar>
        <List>
          {
            messages.map(message => {
              if(meId === message.to){
                return (
                    <Item
                        key={message._id}
                        thumb={targetAvatar}
                    >
                      {message.content}
                    </Item>
                )
              }else{
                return (
                    <Item
                        key={message._id}
                        className='chat-me'
                        extra='me'
                    >
                      {message.content}
                    </Item>
                )
              }
            })
          }


        </List>

        <div className='am-tab-bar'>
          <InputItem
              placeholder="input bar"
              value={content}
              onChange={value => {setContent(value)}}
              extra={
                <span onClick={handleSend}>Send</span>
              }
          />
        </div>
      </div>
  )
}

export default connect(
  state =>({user: state.user, chat: state.chat}),
    {sendMessage}
)(Chat)