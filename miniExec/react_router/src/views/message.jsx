import React, {Component} from 'react'
import {Route} from "react-router";

import messageDetail from "./message-detail";
import {NavLink} from "react-router-dom";
export default class Message extends Component{

    state = {
        messages: []
    }

    componentDidMount() {
        //use setTime out to simulate ajax request
        setTimeout(()=>{
            const messages = [
                {id:1,title:'m1'},
                {id:2,title:'m2'},
                {id:3,title:'m3'},
            ]
            this.setState({messages})
        },1000)
    }

    showDetailUsingPush = (id) =>{
        this.props.history.push('/home/message/message_detail/'+id)
    }

    showDetailUsingReplace = (id) =>{
        this.props.history.replace('/home/message/message_detail/'+id)
    }

    render() {
        return(
            <div>
                <ul>
                    {
                        this.state.messages.map((message,index)=>(
                            <li key={index}>
                                <NavLink to={'/home/message/message_detail/'+message.id}>{message.title}</NavLink>
                                &nbsp;&nbsp;
                                <button onClick={()=>{this.showDetailUsingPush(message.id)}}>history push</button>
                                &nbsp;&nbsp;
                                <button onClick={()=>{this.showDetailUsingReplace(message.id)}}>history replace</button>
                            </li>
                        ))
                    }
                </ul>
                <Route path='/home/message/message_detail/:id' component={messageDetail}/>
            </div>
        )
      }
}