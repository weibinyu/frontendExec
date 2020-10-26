import React, {Component} from 'react'
import {Route} from "react-router";

import messageDetail from "./message-detail";
export default class Message extends Component{

    state = {
        messages: []
    }

    componentDidMount() {
        setTimeout(()=>{
            const messages = [
                {id:1,title:'m1'},
                {id:2,title:'m2'},
                {id:3,title:'m3'},
            ]
            this.setState({messages})
        },1000)
    }

    render() {
        return(
            <div>
                <ul>
                    {
                        this.state.messages.map((message,index)=>(
                            <li key={index}>
                                <a href={'/home/message/message_detail/'+message.id} >{message.title}</a>
                            </li>
                        ))
                    }
                </ul>
                <Route path='/home/message/message_detail/:id' component={messageDetail}/>
            </div>
        )
      }
}