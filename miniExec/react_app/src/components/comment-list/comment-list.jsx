import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CommentItem from "../comment-item/comment-item";
export default class CommentList extends Component{

    static propTypes = {
        comments:PropTypes.array.isRequired
    }

    render() {
        const {comments} = this.props
    return(
        <div className="col-md-8">
            <h3 className="reply">Comments:</h3>
            <h2 style={ {display: 'none' } }>No comment yet</h2>
            <ul className="list-group">{
                comments.map((comment,index) => <CommentItem comment={comment} key={index}/>)
            }
            </ul>
        </div>
    )
  }
}

/*
    commentList.propTypes = {
        comments:PropTypes.array.isRequired
    }
*/