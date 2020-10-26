import React, {Component} from 'react'
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
            <ul>
                Hello
                {
                    this.state.messages.map((message,index)=>(
                        <li key={index}>
                            <a href='?'>{message.title}</a>
                        </li>
                    ))
                }
            </ul>
        )
      }
}