import React, { Component } from "react";
import classnames from "classnames";
import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      conform_password: "",
      error: {}
    };
  }
  OnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  Submit = e => {
    e.preventDefault();
    console.log(this.state);
    axios
      .post("/api/user/register/", this.state)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => this.setState({ error: err.response.data.error }));
  };
  render() {
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
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.error.name
                    })}
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.OnChange}
                    name="name"
                  />
                  <div className="invalid-feedback">
                    {this.state.error.name}
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.error.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.OnChange}
                  />
                  <div className="invalid-feedback">
                    {this.state.error.email}
                  </div>
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
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
                    onChange={this.OnChange}
                  />
                  <div className="invalid-feedback">
                    {this.state.error.password}
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.error.conform_password
                    })}
                    placeholder="Confirm Password"
                    name="conform_password"
                    value={this.state.conform_password}
                    onChange={this.OnChange}
                  />
                  <div className="invalid-feedback">
                    {this.state.error.conform_password}
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
