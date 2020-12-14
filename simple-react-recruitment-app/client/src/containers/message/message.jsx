import React,{useState} from 'react'
import {connect} from 'react-redux'

function Message(props){
  return (
      <div>Message</div>
  )
}

export default connect(
    state =>({}),
    {}
)(Message)