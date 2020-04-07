import React, { Component } from "react";
import PostForm from "./PostForm";
import Postfeed from "./Postfeed";
import Spinner from "../Others/Spinner";
import { connect } from "react-redux";
import { loadPosts } from "../../Redux/Action/Posts";

class Post extends Component {
  componentDidMount() {
    // Show All Posts
    this.props.loadPosts();
  }
  render() {
    const { posts, loading } = this.props.post;
    let itemToDisplay;
    if (posts === null || loading) {
      // If posts Is Equal To Null Or Loading Is True Show Spinner
      itemToDisplay = <Spinner />;
    } else {
      // If Posts Are Loaded Correctly Then Do The Below Action
      itemToDisplay = <Postfeed posts={posts} />;
    }
    return (
      <div className="posts">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {itemToDisplay}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (State) => ({
  post: State.post,
});
export default connect(mapStateToProps, { loadPosts })(Post);
