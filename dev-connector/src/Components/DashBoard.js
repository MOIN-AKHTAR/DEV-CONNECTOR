import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../Redux/Action/Profile";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

class DashBoard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
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
            <div class="btn-group mb-4" role="group">
              <h3>
                Welcome <Link>{user.name}</Link>
              </h3>
              <Link href="edit-profile.html" class="btn btn-light">
                <i class="fas fa-user-circle text-info mr-1"></i> Edit Profile
              </Link>
              <Link href="add-experience.html" class="btn btn-light">
                <i class="fab fa-black-tie text-info mr-1"></i>
                Add Experience
              </Link>
              <Link href="add-education.html" class="btn btn-light">
                <i class="fas fa-graduation-cap text-info mr-1"></i>
                Add Education
              </Link>
              <div style={{ marginBottom: "60px" }}></div>
              <div className="btn btn-danger">Delete Account</div>
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
export default connect(mapStateToProps, { getCurrentProfile })(DashBoard);
