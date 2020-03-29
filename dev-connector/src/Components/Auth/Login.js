import React, { Component } from "react";
import classnames from "classnames";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: {}
    };
  }
  OnChnage = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  Submit = e => {
    e.preventDefault();
    axios
      .post("/api/user/login", this.state)
      .then(res => console.log(res.data))
      .catch(err =>
        this.setState({
          error: err.response.data.error
        })
      );
  };

  render() {
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
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.error.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.OnChnage}
                  />
                  <div className="invalid-feedback">
                    {this.state.error.email}
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.error.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.OnChnage}
                  />
                  <div className="invalid-feedback">
                    {this.state.error.password}
                  </div>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
