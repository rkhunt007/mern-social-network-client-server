import PropTypes from 'prop-types'
import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPost } from '../../actions/post'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({ getPost, post: { post, loading }, match }) => {

    useEffect(() => {
        getPost(match.params.id)
    }, [getPost, match.params.id]);

    return loading || post === null ? <Spinner /> : (
        <Fragment>
            <Link to='/posts' className='btn '>Back to Posts</Link>
            <PostItem post={post} showActions={false}></PostItem>
            <CommentForm postId={post._id}></CommentForm>
            <div className="comments">
                {post.comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id}></CommentItem>
                ))}
            </div>
        </Fragment>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})


export default connect(mapStateToProps, { getPost })(Post)
