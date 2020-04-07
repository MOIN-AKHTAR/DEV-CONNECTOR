import React, { Component } from "react";
import PostItem from "./PostItem";

// This Component Will Map All The Posts
export default class Postfeed extends Component {
  render() {
    const { posts } = this.props;
    const postsToDisplay = posts.map((post) => (
      <PostItem key={post._id} post={post} />
    ));
    return <div>{postsToDisplay}</div>;
  }
}
