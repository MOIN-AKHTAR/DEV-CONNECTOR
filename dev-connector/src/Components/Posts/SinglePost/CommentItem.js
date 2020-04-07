import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteComment } from "../../../Redux/Action/Posts";

// This Component Will Map A Single Comment From Comments Array
class CommentItem extends Component {
  deleteComment = (postId, commentId) => {
    // Calling Delete Comment Action
    this.props.deleteComment(postId, commentId);
  };
  render() {
    const { comment, postId, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt="No Preview"
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id && (
              <button
                type="button"
                className="btn btn-danger mr-1"
                onClick={() => this.deleteComment(postId, comment._id)}
              >
                <i className="fas fa-times" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (State) => ({
  auth: State.auth,
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
