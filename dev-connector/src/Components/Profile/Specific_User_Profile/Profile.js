import React, { Component } from "react";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
// import ProfileGithub from "./ProfileGithub";
import ProfileHeader from "./ProfileHeader";
import Spinner from "../../Others/Spinner";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProfileByHandle } from "../../../Redux/Action/Profile";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle)
      this.props.getProfileByHandle(this.props.match.params.handle);
  }

  render() {
    const { profile, loading } = this.props.profile;
    let displayItem;
    if (profile === null || loading) {
      displayItem = <Spinner />;
    } else {
      displayItem = (
        <div>
          <Link to="/profile-list" className="btn btn-light mb-3">
            Go Back
          </Link>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
          {/* {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null} */}
        </div>
      );
    }
    return (
      <div className="conatiner">
        <div className="row">
          <div className="col-md-10 m-auto">{displayItem}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (State) => ({
  profile: State.profile,
});
export default connect(mapStateToProps, { getProfileByHandle })(Profile);
