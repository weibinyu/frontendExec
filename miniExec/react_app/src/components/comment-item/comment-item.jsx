import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './comment-item.css'

export default class CommentItem extends Component{

    static propTypes = {
        comment: PropTypes.object.isRequired,
        deleteComment: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired
    }

    handleClick = () =>{
        const {comment,deleteComment,index} = this.props
        if(window.confirm("You sure to delete "+comment.username+"'s comment?"))
            deleteComment(index)
    }
    render() {
        const {comment} = this.props
    return(
        <li className="list-group-item">
            <div className="handle">
                <a href= "javascript:" onClick={this.handleClick}>delete</a>
            </div>
            <p className="user"><span>{comment.username}</span><span> said:</span></p>
            <p className="sentence">{comment.content}</p>
        </li>
    )
  }
}