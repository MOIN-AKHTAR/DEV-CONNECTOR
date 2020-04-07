import React, { Component } from "react";
import Spinner from "../../Others/Spinner";
import PostItem from "../PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import { connect } from "react-redux";
import { getPost } from "../../../Redux/Action/Posts";
import { Link } from "react-router-dom";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;

    let contentToDisplay;
    if (post === null || loading || Object.keys(post).length === 0) {
      // If Post Is NOt Set Or Loading Is True Or Post Objevt Don't Have Keys Or equal To {}
      // Show Spinner
      contentToDisplay = <Spinner />;
    } else {
      // If Post Is Loaded Correctly And Have Keys Then Do The Below Action
      contentToDisplay = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }
    return (
      <div className="post">
        <div className="row">
          <div className="col-md-10 m-auto">
            <Link to="/feed" className="btn btn-light mb-3">
              Back To Feed
            </Link>
            {contentToDisplay}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (State) => ({
  post: State.post,
});
export default connect(mapStateToProps, { getPost })(Post);
