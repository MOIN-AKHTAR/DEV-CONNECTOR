import React, { Component } from "react";
import TextGroup from "../../Share/TextGroup";
import { connect } from "react-redux";
import { RegisterUserAction } from "../../Redux/Action/RegisterUser";
import { withRouter } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      conform_password: "",
      error: {},
    };
  }
  OnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  Submit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      conform_password: this.state.conform_password,
    };
    // Calling Registration Action
    // This .props.history Is A Parameter Which I'll Be Used By Action Inorder To Redirect To
    // Other Page
    this.props.RegisterUserAction(newUser, this.props.history);
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      // If Any Error Occur Then Set Error Property And Show Errors On Registration Form
      this.setState({ error: nextProps.error });
    }
  }
  render() {
    const { error } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form
                noValidate
                action="create-profile.html"
                onSubmit={this.Submit}
              >
                <TextGroup
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.OnChange}
                  error={error.name}
                />
                <TextGroup
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.OnChange}
                  error={error.email}
                  info="This site uses Gravatar so if you want a profile image, use a
                  Gravatar email"
                />

                <TextGroup
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.OnChange}
                  error={error.password}
                />
                <TextGroup
                  type="password"
                  placeholder="Enter Password To Conform"
                  name="conform_password"
                  value={this.state.conform_password}
                  onChange={this.OnChange}
                  error={error.conform_password}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (State) => {
  return {
    auth: State.auth,
    error: State.error,
  };
};
// Here withRouter Is A Function Which Allows You To Send history As A Parameter To Action So
// That You Can Redirect To Any Page From Action
export default connect(mapStateToProps, { RegisterUserAction })(
  withRouter(Register)
);
