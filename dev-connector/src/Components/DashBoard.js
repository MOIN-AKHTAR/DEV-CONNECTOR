import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../Redux/Action/Profile";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

class DashBoard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  DeleteAccount = e => {
    this.props.deleteAccount();
  };
  render() {
    let dashboardContent;
    const { user } = this.props.auth;
    const { loading, profile } = this.props.profile;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check LoggedIn User Do Have Profiel
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <h3>
              Welcome <Link to="/my-info">{user.name}</Link>
            </h3>
            <div className="btn-group mb-4" role="group">
              <Link to="/edit-profile" className="btn btn-light">
                <i className="fas fa-user-circle text-info mr-1"></i> Edit
                Profile
              </Link>
              <Link to="/add-experience" className="btn btn-light">
                <i className="fab fa-black-tie text-info mr-1"></i>
                Add Experience
              </Link>
              <Link to="/add-education" className="btn btn-light">
                <i className="fas fa-graduation-cap text-info mr-1"></i>
                Add Education
              </Link>
            </div>
            <div
              style={{
                marginBottom: "60px"
              }}
            ></div>
            <div className="btn btn-danger" onClick={this.DeleteAccount}>
              Delete Account
            </div>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <h3>Welcome {user.name}</h3>
            <p>You Don't Have Any Profile Yet :(</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = State => {
  return {
    auth: State.auth,
    profile: State.profile
  };
};
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  DashBoard
);
