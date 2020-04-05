import React, { Component } from "react";
import TextGroup from "../../Share/TextGroup";
import { loginUser } from "../../Redux/Action/LoginUser";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: {},
    };
  }
  OnChnage = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  Submit = (e) => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(user);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    } else if (nextProps.error) {
      this.setState({
        error: nextProps.error,
      });
    }
  }

  render() {
    const { error } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form noValidate onSubmit={this.Submit}>
                <TextGroup
                  type="email"
                  placeholder="Enter Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.OnChnage}
                  error={error.email}
                />
                <TextGroup
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.OnChnage}
                  error={error.password}
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

const mapStateToProps = (State) => ({
  error: State.error,
  auth: State.auth,
});

export default connect(mapStateToProps, { loginUser })(Login);
