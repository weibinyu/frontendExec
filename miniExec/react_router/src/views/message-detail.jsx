import React from 'react'

const Messages = [
    {id:1,title:'m1',content:'some content'},
    {id:2,title:'m2',content:'some content'},
    {id:3,title:'m3',content:'some content'}
]

export default function messageDetail(props){
    const {id} = props.match.params
    const message = Messages.find((m) => m.id === id*1)
    return(
        <ul>
            <li>ID: {message.id}</li>
            <li>Title: {message.title}</li>
            <li>Content: {message.content}</li>
        </ul>
    )
}