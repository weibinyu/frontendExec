import React, {Component} from 'react'
import PropType from 'prop-types'

import './comment-item.css'

export default class CommentItem extends Component{

    static propTypes = {
        comment: PropType.object.isRequired
    }

    render() {
        const {comment} = this.props
    return(
        <li className="list-group-item">
            <div className="handle">
                <a href= "javascript:;">delete</a>
            </div>
            <p className="user"><span>{comment.username}</span><span>said:</span></p>
            <p className="sentence">{comment.content}</p>
        </li>
    )
  }
}