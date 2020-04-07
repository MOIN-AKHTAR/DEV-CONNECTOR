import React, { Component } from "react";
import TextArea from "../../Share/TextArea";
import { addPost } from "../../Redux/Action/Posts";
import { connect } from "react-redux";

// This Component Will Allow You To Post
class PostForm extends Component {
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
    const newPost = {
      name: user.name,
      avatar: user.avatar,
      text: this.state.text,
    };
    // Calling AddPost Action
    this.props.addPost(newPost);
    this.setState({
      text: "",
    });
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      // If Any Error Occur Set Error Property And Show Error On PostForm
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
                  placeholder="Create Post"
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

export default connect(mapStateToProps, { addPost })(PostForm);
