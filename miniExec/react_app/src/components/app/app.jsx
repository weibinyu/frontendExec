import React, {Component} from 'react';
import '../../stylesheet/App.css';
import CommentAdd from '../comment-add/comment-add';
import CommentList from '../comment-list/comment-list';

export default class App extends  Component{

    constructor(props) {
        super(props);

        this.state ={
            comments: [
                {username:'Tom',content:'React is great'},
                {username:'Jack',content:'React is hard'},
            ]
        }
    }

    render() {
        let comments = this.state.comments
    return(
        <div>
            <h1>Please comment on React</h1>
            <CommentAdd />
            <CommentList comments={comments}/>
        </div>
    )
  }
}
