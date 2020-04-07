import React from "react";
import CommentItem from "./CommentItem";

// This Component Will Take Array Of Comments And Will Map All Those
export default function CommentFeed(props) {
  const { comments, postId } = props;
  return (
    <div className="comment_feed">
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} postId={postId} />
      ))}
    </div>
  );
}
