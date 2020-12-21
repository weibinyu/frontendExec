import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {InputItem, List, NavBar, Icon, Grid} from "antd-mobile";
import {sendMessage} from "../../redux/actions";

const Item = List.Item

function Chat(props){
  //console.log("hello")
  const {user} = props
  const {users,chatMessages} = props.chat
  const [content,setContent] = useState(" ")
  const [emojiShow,setEmojiShow] = useState(false)
  const emojis = ['😀','😀','😀','😀','😀','😀','😀','😀','😀','😀','😀','😀', '😀','😀','😀',
    '😀','😀','😀','😀','😀','😀','😀','😀','😀','😀','😀','😀','😀','😀','😀',
    '😀','😀','😀','😀','😀','😀','😀','😀','😀','😀','😀','😀','😀','😀','😀']
  const antdEmoji = emojis.map(emoji => ({text: emoji}))

  useEffect(() => {
    window.scrollTo(0,document.body.scrollHeight)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  const handleSend = () =>{
    const from = user._id
    const to = props.match.params.userid
    if(content){
      props.sendMessage({from,to,content})
    }
    setContent('')
    setEmojiShow(false)
  }

  const toggleEmoji = () => {
    const isShow = !emojiShow
    setEmojiShow(isShow)
    //sending a async resize event to solve the emoji display bug with antd grid
    if(isShow){
      setTimeout(() =>{
        window.dispatchEvent(new Event('resize'))
      },0)
    }
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
        <NavBar
            icon={<Icon type='left'/>}
            onLeftClick={()=> props.history.goBack()}
            className='stick-at-top'
        >
          {users[targetId].username}
        </NavBar>
        <List className='lists'>
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
              onFocus={() => setEmojiShow(false)}
              extra={
                <span>
                  <span onClick={toggleEmoji} style={{marginRight:10}}>😀</span>
                  <span onClick={handleSend}>Send</span>
                </span>

              }
          />
         { emojiShow ? (
              <Grid
                  data={antdEmoji}
                  columnNum={8}
                  onClick={item => {
                    setContent(content + item.text)
                  }}
              />
          ) : null }

        </div>
      </div>
  )
}

export default connect(
  state =>({user: state.user, chat: state.chat}),
    {sendMessage}
)(Chat)