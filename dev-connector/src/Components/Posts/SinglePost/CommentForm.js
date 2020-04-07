import React, { Component } from "react";
import TextArea from "../../../Share/TextArea";
import { addComment } from "../../../Redux/Action/Posts";
import { connect } from "react-redux";
// This Component Will Let You To Add Comment For A Specific Post
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      error: {},
    };
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { user } = this.props.auth;
    const { postId } = this.props;
    const newComment = {
      name: user.name,
      avatar: user.avatar,
      text: this.state.text,
    };
    // Calling Add Comment Action
    this.props.addComment(postId, newComment);
    this.setState({
      text: "",
    });
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        error: nextProps.error,
      });
    }
  }
  render() {
    const { error } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextArea
                  name="text"
                  onChange={this.onChange}
                  placeholder="Add a comment"
                  value={this.state.text}
                  error={error.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (State) => ({
  auth: State.auth,
  error: State.error,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
