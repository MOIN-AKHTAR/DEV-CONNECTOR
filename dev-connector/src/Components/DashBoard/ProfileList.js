import React, { Component } from "react";
import ProfileItem from "./ProfileItem";
import Spinner from "../Others/Spinner";
import { getProfiles, getCurrentProfile } from "../../Redux/Action/Profile";
import { connect } from "react-redux";

class ProfileList extends Component {
  componentDidMount() {
    //   Getting All Users Profiles
    this.props.getProfiles();
    // Getting Current Users Profile
    // this.props.getCurrentProfile();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItem;
    if (loading || profiles === null) {
      // If Profiles Are Not Set Or Loading Show Spinner
      profileItem = <Spinner />;
    } else {
      if (profiles.length > 0) {
        // If Profiles Loaded The Show All Profiles
        profileItem = profiles.map((profile) => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        // If Profile Array Is Empty
        profileItem = <h1>No Profile Found :(</h1>;
      }
    }
    return (
      <div className="profile_list">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <h1 className="display-4 text-center">Developers Profiles</h1>
              <p className="lead text-center">
                Browse and Connect To Developers
              </p>
              {profileItem}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (State) => ({
  profile: State.profile,
});
export default connect(mapStateToProps, { getProfiles, getCurrentProfile })(
  ProfileList
);
