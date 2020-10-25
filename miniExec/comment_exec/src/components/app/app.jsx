import React, {Component} from 'react'
import PubSub from 'pubsub-js'

import CommentAdd from '../comment-add/comment-add'
import CommentList from '../comment-list/comment-list'

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

    addComment =(comment)=>{
        const {comments} = this.state
        comments.unshift(comment)
        this.setState({comments})
    }

    deleteComment = (index) =>{
        const {comments} = this.state
        comments.splice(index,1)
        this.setState({comments})
    }
    componentDidMount() {
        PubSub.subscribe('deleteComment',(msg,index)=>{
            this.deleteComment(index)
        })
        PubSub.subscribe('addComment',(msg,comment)=>{
            this.addComment(comment)
        })
    }

    render() {
        let comments = this.state.comments
    return(
        <div>
            <header className="site-header jumbotron">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h1>Please comment on React</h1>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container">
                <div className="row">
                <CommentAdd />
                <CommentList comments={comments} />
                </div>
            </div>
        </div>

    )
  }
}
