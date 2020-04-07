import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost, likePost, dislikePost } from "../../Redux/Action/Posts";

class PostItem extends Component {
  likePost = (id) => {
    // Calling LikePost Action
    this.props.likePost(id);
  };
  dislikePost = (id) => {
    // Calling UnlikePost Action
    this.props.dislikePost(id);
  };

  findUserLike = (likes) => {
    const { auth } = this.props;
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };
  deletePost = (id) => {
    // Calling Delete Post Action
    this.props.deletePost(id);
  };
  render() {
    const { post, auth, showActions = true } = this.props;
    return (
      <div className="posts">
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-md-2">
              <Link to="#">
                <img
                  className="rounded-circle d-none d-md-block"
                  src={post.avatar}
                  alt="No Preview"
                />
              </Link>
              <br />
              <p className="text-center">{post.name}</p>
            </div>
            <div className="col-md-10">
              <p className="lead">{post.text}</p>
              {showActions && (
                <span>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    title="I Like This Post"
                    onClick={() => this.likePost(post._id)}
                  >
                    <i
                      className={classnames("fas fa-thumbs-up", {
                        "text-info": this.findUserLike(post.likes),
                      })}
                    ></i>
                    <span className="badge badge-light">
                      {post.likes.length}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    title="I Dislike This Post"
                    onClick={() => this.dislikePost(post._id)}
                  >
                    <i className="text-secondary fas fa-thumbs-down"></i>
                  </button>
                  <Link className="btn btn-info mr-1" to={`/post/${post._id}`}>
                    Comments
                  </Link>
                  {post.user === auth.user.id && (
                    <button
                      type="button"
                      className="btn btn-danger mr-1"
                      onClick={() => this.deletePost(post._id)}
                    >
                      <i className="fas fa-times" />
                    </button>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = (State) => ({
  auth: State.auth,
});
export default connect(mapStatesToProps, { deletePost, likePost, dislikePost })(
  PostItem
);
